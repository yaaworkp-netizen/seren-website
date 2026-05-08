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

  const previousStatus = await getPreviousModerationStatus(userId);

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

  await insertModerationLog({
    userId,
    status,
    reason,
    previousStatus,
  });

  redirect("/admin?moderation=updated");
}

async function getPreviousModerationStatus(userId: string) {
  if (!supabaseUrl || !serviceRoleKey) {
    return "";
  }

  const url = new URL(`${supabaseUrl}/rest/v1/profiles`);
  url.searchParams.set("id", `eq.${userId}`);
  url.searchParams.set("select", "moderation_status");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    headers: adminHeaders(),
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) {
    return "";
  }

  const rows = (await response.json().catch(() => [])) as Array<{
    moderation_status?: string;
  }>;

  return rows[0]?.moderation_status ?? "";
}

async function insertModerationLog({
  userId,
  status,
  reason,
  previousStatus,
}: {
  userId: string;
  status: string;
  reason: string;
  previousStatus: string;
}) {
  if (!supabaseUrl || !serviceRoleKey) {
    return;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/moderation_action_logs`, {
    method: "POST",
    headers: {
      ...adminHeaders(),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      target_user_id: userId,
      actor_label: "admin_dashboard",
      action: "manual_status_change",
      reason: status === "active" ? "Cleared by admin" : reason,
      previous_status: previousStatus || null,
      new_status: status,
      metadata: {
        source: "website_admin",
      },
    }),
    cache: "no-store",
  }).catch(() => null);

  if (response && !response.ok) {
    console.warn("[admin] moderation log insert failed", await response.text());
  }
}

function adminHeaders() {
  return {
    apikey: serviceRoleKey ?? "",
    Authorization: `Bearer ${serviceRoleKey ?? ""}`,
  };
}
