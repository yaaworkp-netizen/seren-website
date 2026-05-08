import "server-only";

type CountResult = {
  count: number;
  error?: string;
};

export type AdminMetric = {
  label: string;
  value: number;
  note: string;
};

export type AdminDashboardData = {
  configured: boolean;
  configError?: string;
  metrics: AdminMetric[];
  sparks: Record<string, unknown>[];
  requests: Record<string, unknown>[];
  calls: Record<string, unknown>[];
  reports: Record<string, unknown>[];
  sparkReports: Record<string, unknown>[];
  moderationProfiles: Record<string, unknown>[];
  moderationActionLogs: Record<string, unknown>[];
  waitlist: Record<string, unknown>[];
  generatedAt: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  if (!supabaseUrl || !serviceRoleKey) {
    return {
      configured: false,
      configError:
        "Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to view admin data.",
      metrics: [],
      sparks: [],
      requests: [],
      calls: [],
      reports: [],
      sparkReports: [],
      moderationProfiles: [],
      moderationActionLogs: [],
      waitlist: [],
      generatedAt: new Date().toISOString(),
    };
  }

  const [
    totalUsers,
    totalSparks,
    activeSparks,
    expiredSparks,
    deletedSparks,
    pendingRequests,
    acceptedRequests,
    totalCallSessions,
    completedCallSessions,
    reportsCount,
    sparkReportsCount,
    underReviewProfiles,
    restrictedProfiles,
    bannedProfiles,
    waitlistCount,
    pushTokensCount,
    sparks,
    requests,
    calls,
    reports,
    sparkReports,
    moderationProfiles,
    moderationActionLogs,
    waitlist,
  ] = await Promise.all([
    countRows("profiles"),
    countRows("sparks"),
    countRows("sparks", "status=eq.active"),
    countRows("sparks", "status=eq.expired"),
    countRows("sparks", "status=eq.deleted"),
    countRows("spark_call_requests", "status=eq.pending"),
    countRows("spark_call_requests", "status=eq.accepted"),
    countRows("call_sessions"),
    countRows("call_sessions", "ended_at=not.is.null"),
    countRows("reports"),
    countRows("spark_reports"),
    countRows("profiles", "moderation_status=eq.under_review"),
    countRows("profiles", "moderation_status=eq.restricted"),
    countRows("profiles", "moderation_status=eq.banned"),
    countRows("website_waitlist"),
    countRows("push_tokens"),
    getRows(
      "sparks",
      "id,body,topic,status,author_id,created_at,expires_at,matched_at",
      "created_at.desc",
      12
    ),
    getRows(
      "spark_call_requests",
      "id,status,spark_id,requester_id,author_id,match_id,call_session_id,created_at,expires_at,responded_at,spark_topic,spark_body",
      "created_at.desc",
      12
    ),
    getRows(
      "call_sessions",
      "id,match_id,started_at,ended_at,duration_seconds",
      "started_at.desc",
      12
    ),
    getRows(
      "reports",
      "id,reporter_id,reported_user_id,reason,note,status,created_at",
      "created_at.desc",
      12
    ),
    getRows(
      "spark_reports",
      "id,spark_id,reporter_id,author_id,reason,status,created_at",
      "created_at.desc",
      12
    ),
    getRows(
      "profiles",
      "id,username,first_name,moderation_status,moderation_report_count,moderation_severe_report_count,moderation_risk_score,moderation_trust_score,moderation_reason,moderation_updated_at",
      "moderation_updated_at.desc.nullslast",
      12
    ),
    getRows(
      "moderation_action_logs",
      "id,target_user_id,actor_label,action,reason,previous_status,new_status,created_at",
      "created_at.desc",
      12
    ),
    getRows("website_waitlist", "id,email,source,created_at", "created_at.desc", 12),
  ]);

  const metrics: AdminMetric[] = [
    metric("Users", totalUsers, "Profiles created"),
    metric("Waitlist", waitlistCount, "Website signups"),
    metric("Sparks", totalSparks, "All-time thoughts"),
    metric("Active Sparks", activeSparks, "Visible now"),
    metric("Expired Sparks", expiredSparks, "Faded naturally"),
    metric("Deleted Sparks", deletedSparks, "Removed by authors"),
    metric("Pending Requests", pendingRequests, "Waiting for authors"),
    metric("Accepted Requests", acceptedRequests, "Requests that became calls"),
    metric("Call Sessions", totalCallSessions, "All call rooms"),
    metric("Completed Calls", completedCallSessions, "Ended sessions"),
    metric("Call Reports", reportsCount, "In-call safety signals"),
    metric("Spark Reports", sparkReportsCount, "Reported thoughts"),
    metric("Under Review", underReviewProfiles, "Users needing moderation review"),
    metric("Restricted", restrictedProfiles, "Users blocked from posting/requesting"),
    metric("Banned", bannedProfiles, "Users removed from the experience"),
    metric("Push Tokens", pushTokensCount, "Reachable devices"),
  ];

  return {
    configured: true,
    metrics,
    sparks,
    requests,
    calls,
    reports,
    sparkReports,
    moderationProfiles,
    moderationActionLogs,
    waitlist,
    generatedAt: new Date().toISOString(),
  };
}

function metric(label: string, result: CountResult, note: string): AdminMetric {
  return {
    label,
    value: result.count,
    note: result.error ? `${note} - ${result.error}` : note,
  };
}

async function countRows(table: string, filter?: string): Promise<CountResult> {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/${table}`);
    url.searchParams.set("select", "id");

    if (filter) {
      const [key, value] = filter.split("=");
      if (key && value) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url, {
      headers: adminHeaders({ count: true }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { count: 0, error: await safeError(response) };
    }

    const range = response.headers.get("content-range");
    const count = range?.split("/")?.[1];

    return { count: count && count !== "*" ? Number(count) : 0 };
  } catch (error) {
    return {
      count: 0,
      error: error instanceof Error ? error.message : "Count failed",
    };
  }
}

async function getRows(
  table: string,
  select: string,
  order: string,
  limit: number
) {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/${table}`);
    url.searchParams.set("select", select);
    url.searchParams.set("order", order);
    url.searchParams.set("limit", String(limit));

    const response = await fetch(url, {
      headers: adminHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`[admin] ${table} fetch failed`, await safeError(response));
      return [];
    }

    return (await response.json()) as Record<string, unknown>[];
  } catch (error) {
    console.warn(`[admin] ${table} fetch failed`, error);
    return [];
  }
}

function adminHeaders({ count = false }: { count?: boolean } = {}) {
  return {
    apikey: serviceRoleKey ?? "",
    Authorization: `Bearer ${serviceRoleKey ?? ""}`,
    ...(count ? { Prefer: "count=exact", Range: "0-0" } : {}),
  };
}

async function safeError(response: Response) {
  const text = await response.text().catch(() => "");
  return text || `${response.status} ${response.statusText}`;
}
