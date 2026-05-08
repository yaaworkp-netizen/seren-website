import { redirect } from "next/navigation";

import { isAdminAuthed } from "../auth";

const ALLOWED_STATUSES = new Set([
  "active",
  "under_review",
  "restricted",
  "banned",
]);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  const authed = await isAdminAuthed();

  if (!authed) {
    redirect("/admin/login");
  }

  const formData = await request.formData();
  const userId = String(formData.get("userId") ?? "");
  const status = String(formData.get("status") ?? "");
  const reason = String(formData.get("reason") ?? "");

  if (!supabaseUrl || !serviceRoleKey || !userId || !ALLOWED_STATUSES.has(status)) {
    redirect("/admin?moderation=invalid");
  }

  const url = new URL(`${supabaseUrl}/rest/v1/profiles`);
  url.searchParams.set("id", `eq.${userId}`);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      moderation_status: status,
      moderation_reason: status === "active" ? null : reason,
      moderation_updated_at: new Date().toISOString(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.warn("[admin] moderation update failed", await response.text());
    redirect("/admin?moderation=failed");
  }

  redirect("/admin?moderation=updated");
}
