import { redirect } from "next/navigation";

import { isAdminAuthed } from "../auth";

const ALLOWED_PLANS = new Set(["free", "plus", "tester", "admin"]);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  const authed = await isAdminAuthed();

  if (!authed) {
    redirect("/admin/login");
  }

  const formData = await request.formData();
  const userId = String(formData.get("userId") ?? "");
  const plan = String(formData.get("plan") ?? "");

  if (!supabaseUrl || !serviceRoleKey || !userId || !ALLOWED_PLANS.has(plan)) {
    redirect("/admin?entitlement=invalid");
  }

  const now = new Date();
  const testerUntil = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
  const plusActive = plan === "plus" || plan === "tester" || plan === "admin";
  const adminOverride = plan === "tester" || plan === "admin";
  const payload = {
    user_id: userId,
    plan,
    plus_status: plusActive ? "active" : "inactive",
    plan_source: "admin",
    admin_call_override: adminOverride,
    early_testing_free_calls_override: null,
    early_tester_until: plan === "tester" ? testerUntil.toISOString() : null,
    plus_started_at: plusActive ? now.toISOString() : null,
    plus_expires_at: null,
    last_plan_sync_at: now.toISOString(),
    updated_at: now.toISOString(),
  };

  const url = new URL(`${supabaseUrl}/rest/v1/user_entitlements`);
  url.searchParams.set("on_conflict", "user_id");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    console.warn("[admin] entitlement update failed", await response.text());
    redirect("/admin?entitlement=failed");
  }

  redirect("/admin?entitlement=updated");
}
