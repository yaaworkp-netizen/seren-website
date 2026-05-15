import "server-only";

type CountResult = {
  count: number;
  error?: string;
};

export type AdminMetric = {
  label: string;
  value: number | string;
  note: string;
};

export type AdminDashboardData = {
  configured: boolean;
  configError?: string;
  metrics: AdminMetric[];
  monetizationMetrics: AdminMetric[];
  sparks: Record<string, unknown>[];
  requests: Record<string, unknown>[];
  calls: Record<string, unknown>[];
  reports: Record<string, unknown>[];
  sparkReports: Record<string, unknown>[];
  moderationProfiles: Record<string, unknown>[];
  moderationActionLogs: Record<string, unknown>[];
  usageEvents: Record<string, unknown>[];
  callExtensions: Record<string, unknown>[];
  entitlements: Record<string, unknown>[];
  creditLedger: Record<string, unknown>[];
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
      monetizationMetrics: [],
      sparks: [],
      requests: [],
      calls: [],
      reports: [],
      sparkReports: [],
      moderationProfiles: [],
      moderationActionLogs: [],
      usageEvents: [],
      callExtensions: [],
      entitlements: [],
      creditLedger: [],
      waitlist: [],
      generatedAt: new Date().toISOString(),
    };
  }

  const todayStart = startOfDay(new Date()).toISOString();
  const agoraRate = Number(
    process.env.AGORA_VOICE_USD_PER_1000_PARTICIPANT_MINUTES ?? "0"
  );

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
    usageToday,
    usageEvents,
    callExtensions,
    entitlements,
    creditLedger,
    allEntitlements,
    usageThisWeek,
    callMinuteStats,
    monetizationSettings,
    adminMonetizationMetrics,
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
      "usage_events",
      "id,user_id,event_type,spark_id,call_session_id,match_id,metadata,occurred_at",
      "occurred_at.desc",
      5000,
      [`occurred_at=gte.${todayStart}`]
    ),
    getRows(
      "usage_events",
      "id,user_id,event_type,spark_id,call_session_id,match_id,metadata,occurred_at",
      "occurred_at.desc",
      16
    ),
    getRows(
      "call_extensions",
      "id,call_session_id,match_id,requester_id,responder_id,status,extra_seconds,created_at,responded_at,expires_at",
      "created_at.desc",
      16
    ),
    getRows(
      "user_entitlements",
      "user_id,plan,plus_status,credits_balance,live_call_credits,extension_credits,weekly_live_call_limit_override,admin_call_override,early_testing_free_calls_override,monetization_notes,billing_provider,billing_customer_id,plan_source,last_plan_sync_at,early_tester_until,plus_started_at,plus_expires_at,updated_at",
      "updated_at.desc",
      16
    ),
    getRows(
      "user_credit_ledger",
      "id,user_id,credit_type,delta,balance_after,source,created_at",
      "created_at.desc",
      16
    ),
    getRows(
      "user_entitlements",
      "user_id,plan,plus_status,credits_balance,live_call_credits,extension_credits,weekly_live_call_limit_override,admin_call_override,early_testing_free_calls_override,early_tester_until,updated_at",
      "updated_at.desc",
      10000
    ),
    getRows(
      "usage_events",
      "id,user_id,event_type,call_session_id,metadata,occurred_at",
      "occurred_at.desc",
      20000,
      [`occurred_at=gte.${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}`]
    ),
    getCallMinuteStats(),
    getRows(
      "monetization_settings",
      "id,early_testing_free_calls,free_weekly_live_calls,live_call_credit_cost,extension_credit_cost,agora_usd_per_1000_participant_minutes,updated_at",
      "updated_at.desc",
      1
    ),
    getRows(
      "admin_monetization_metrics",
      "early_testing_free_calls,free_weekly_live_calls,live_call_credit_cost,agora_usd_per_1000_participant_minutes,free_users,plus_users,tester_users,admin_users,credits_balance,live_call_credits,sparks_30d,echoes_30d,call_initiations_30d,call_starts_30d,call_completions_30d,room_minutes_30d,estimated_participant_minutes_30d,estimated_agora_cost_30d",
      "free_users.desc",
      1
    ),
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

  const dailyActiveUsers = new Set(
    usageToday.map((row) => stringValue(row.user_id)).filter(Boolean)
  ).size;
  const sparksToday = countUsageEvents(usageToday, "spark_posted");
  const echoesToday = countUsageEvents(usageToday, "echo_sent");
  const requestsToday = countUsageEvents(usageToday, "call_requested");
  const failedCallsToday = countUsageEvents(usageToday, "call_failed");
  const extensionRequestsToday = countUsageEvents(
    usageToday,
    "call_extension_requested"
  );
  const extensionAcceptsToday = countUsageEvents(
    usageToday,
    "call_extension_accepted"
  );
  const estimatedAgoraCost =
    agoraRate > 0
      ? `$${((callMinuteStats.allParticipantMinutes / 1000) * agoraRate).toFixed(
          2
        )}`
      : "Set rate";
  const monetizationSnapshot = buildMonetizationSnapshot(
    allEntitlements,
    usageThisWeek,
    callExtensions
  );
  const monetizationSetting = monetizationSettings[0] ?? {};
  const adminMonetization = adminMonetizationMetrics[0] ?? {};

  const metrics: AdminMetric[] = [
    metric("Users", totalUsers, "Profiles created"),
    metricValue("Daily Active", dailyActiveUsers, "Users active today"),
    metric("Waitlist", waitlistCount, "Website signups"),
    metric("Sparks", totalSparks, "All-time thoughts"),
    metricValue("Sparks Today", sparksToday, "Posted since midnight"),
    metric("Active Sparks", activeSparks, "Visible now"),
    metric("Expired Sparks", expiredSparks, "Faded naturally"),
    metric("Deleted Sparks", deletedSparks, "Removed by authors"),
    metric("Pending Requests", pendingRequests, "Waiting for authors"),
    metricValue("Requests Today", requestsToday, "Call requests today"),
    metricValue("Echoes Today", echoesToday, "Voice notes sent today"),
    metric("Accepted Requests", acceptedRequests, "Requests that became calls"),
    metric("Call Sessions", totalCallSessions, "All call rooms"),
    metric("Completed Calls", completedCallSessions, "Ended sessions"),
    metricValue(
      "Call Minutes",
      callMinuteStats.allMinutes,
      "One-to-one room minutes"
    ),
    metricValue(
      "Minutes Today",
      callMinuteStats.todayMinutes,
      "Room minutes since midnight"
    ),
    metricValue("Failed Calls", failedCallsToday, "Tracked client failures today"),
    metricValue(
      "Extensions",
      `${extensionAcceptsToday}/${extensionRequestsToday}`,
      "Accepted/requested today"
    ),
    metricValue(
      "Agora Estimate",
      estimatedAgoraCost,
      agoraRate > 0
        ? `Using $${agoraRate}/1k participant minutes`
        : "Set AGORA_VOICE_USD_PER_1000_PARTICIPANT_MINUTES"
    ),
    metric("Call Reports", reportsCount, "In-call safety signals"),
    metric("Spark Reports", sparkReportsCount, "Reported thoughts"),
    metric("Under Review", underReviewProfiles, "Users needing moderation review"),
    metric("Restricted", restrictedProfiles, "Users blocked from posting/requesting"),
    metric("Banned", bannedProfiles, "Users removed from the experience"),
    metric("Push Tokens", pushTokensCount, "Reachable devices"),
  ];
  const monetizationMetrics: AdminMetric[] = [
    metricValue(
      "Early Testing Calls",
      boolValue(monetizationSetting.early_testing_free_calls) ? "On" : "Off",
      "Global free-call toggle"
    ),
    metricValue(
      "Free Weekly Calls",
      numberValue(monetizationSetting.free_weekly_live_calls) ?? 1,
      "Default free initiations per user"
    ),
    metricValue(
      "Call Credit Cost",
      `${numberValue(monetizationSetting.live_call_credit_cost) ?? 1} credit`,
      "Credits used after free allowance"
    ),
    metricValue("Free Users", monetizationSnapshot.freeUsers, "Default plan"),
    metricValue("Plus Users", monetizationSnapshot.plusUsers, "Active or trialing"),
    metricValue("Testers", monetizationSnapshot.testerUsers, "Internal/free access"),
    metricValue("Admins", monetizationSnapshot.adminUsers, "Manual admin access"),
    metricValue(
      "Weekly Limit Hit",
      monetizationSnapshot.weeklyLimitReachedUsers,
      "Free users who used their weekly live call"
    ),
    metricValue(
      "Live Credits",
      monetizationSnapshot.liveCallCredits,
      "Outstanding future call credits"
    ),
    metricValue(
      "Extension Credits",
      monetizationSnapshot.extensionCredits,
      "Outstanding future extension credits"
    ),
    metricValue(
      "30d Call Starts",
      numberValue(adminMonetization.call_starts_30d) ?? 0,
      "Actual call room starts"
    ),
    metricValue(
      "30d Call Cost",
      `$${(numberValue(adminMonetization.estimated_agora_cost_30d) ?? 0).toFixed(2)}`,
      "Based on current Agora rate"
    ),
    metricValue(
      "Extension Demand",
      `${monetizationSnapshot.acceptedExtensions}/${monetizationSnapshot.extensionRequests}`,
      "Accepted/requested all time shown"
    ),
    metricValue(
      "Paid Readiness",
      monetizationSnapshot.paidReadiness,
      "Signal from calls, limits, and extension use"
    ),
  ];

  return {
    configured: true,
    metrics,
    monetizationMetrics,
    sparks,
    requests,
    calls,
    reports,
    sparkReports,
    moderationProfiles,
    moderationActionLogs,
    usageEvents,
    callExtensions,
    entitlements,
    creditLedger,
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

function metricValue(
  label: string,
  value: number | string,
  note: string
): AdminMetric {
  return {
    label,
    value,
    note,
  };
}

async function countRows(
  table: string,
  filter?: string | string[]
): Promise<CountResult> {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/${table}`);
    url.searchParams.set("select", "id");

    if (filter) {
      applyFilters(url, filter);
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
  limit: number,
  filters?: string | string[]
) {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/${table}`);
    url.searchParams.set("select", select);
    url.searchParams.set("order", order);
    url.searchParams.set("limit", String(limit));
    applyFilters(url, filters);

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

async function getCallMinuteStats() {
  const rows = await getRows(
    "call_sessions",
    "duration_seconds,started_at,ended_at",
    "started_at.desc",
    10000
  );
  const todayStart = startOfDay(new Date()).getTime();

  let allSeconds = 0;
  let todaySeconds = 0;

  rows.forEach((row) => {
    const durationSeconds = Number(row.duration_seconds ?? 0);
    const startedAt = stringValue(row.started_at);
    const endedAt = stringValue(row.ended_at);
    const fallbackSeconds =
      startedAt && endedAt
        ? Math.max(
            0,
            Math.floor(
              (new Date(endedAt).getTime() - new Date(startedAt).getTime()) /
                1000
            )
          )
        : 0;
    const seconds = durationSeconds > 0 ? durationSeconds : fallbackSeconds;

    allSeconds += seconds;

    if (startedAt && new Date(startedAt).getTime() >= todayStart) {
      todaySeconds += seconds;
    }
  });

  const allMinutes = Math.round(allSeconds / 60);
  const todayMinutes = Math.round(todaySeconds / 60);

  return {
    allMinutes,
    todayMinutes,
    allParticipantMinutes: allMinutes * 2,
    todayParticipantMinutes: todayMinutes * 2,
  };
}

function applyFilters(url: URL, filters?: string | string[]) {
  if (!filters) {
    return;
  }

  const filterList = Array.isArray(filters) ? filters : [filters];

  filterList.forEach((filter) => {
    const separator = filter.indexOf("=");

    if (separator <= 0) {
      return;
    }

    const key = filter.slice(0, separator);
    const value = filter.slice(separator + 1);

    if (key && value) {
      url.searchParams.set(key, value);
    }
  });
}

function countUsageEvents(rows: RowLike[], eventType: string) {
  return rows.filter((row) => row.event_type === eventType).length;
}

function buildMonetizationSnapshot(
  entitlements: RowLike[],
  usageThisWeek: RowLike[],
  callExtensions: RowLike[]
) {
  const activePlusStatuses = new Set(["active", "trialing"]);
  const freeUsers = entitlements.filter(
    (row) => normalizePlan(row.plan) === "free"
  ).length;
  const plusUsers = entitlements.filter(
    (row) =>
      normalizePlan(row.plan) === "plus" &&
      activePlusStatuses.has(stringValue(row.plus_status))
  ).length;
  const testerUsers = entitlements.filter(
    (row) => normalizePlan(row.plan) === "tester"
  ).length;
  const adminUsers = entitlements.filter(
    (row) => normalizePlan(row.plan) === "admin"
  ).length;
  const liveCallCredits = sumNumeric(entitlements, "live_call_credits");
  const extensionCredits = sumNumeric(entitlements, "extension_credits");
  const extensionRequests = callExtensions.length;
  const acceptedExtensions = callExtensions.filter(
    (row) => row.status === "accepted"
  ).length;
  const entitlementByUser = new Map(
    entitlements.map((row) => [stringValue(row.user_id), row])
  );
  const weeklyCallInitiationsByUser = new Map<string, number>();

  usageThisWeek
    .filter((row) => row.event_type === "call_requested")
    .forEach((row) => {
      const userId = stringValue(row.user_id);

      if (!userId) {
        return;
      }

      weeklyCallInitiationsByUser.set(
        userId,
        (weeklyCallInitiationsByUser.get(userId) ?? 0) + 1
      );
    });

  let weeklyLimitReachedUsers = 0;

  weeklyCallInitiationsByUser.forEach((count, userId) => {
    const entitlement = entitlementByUser.get(userId);
    const plan = normalizePlan(entitlement?.plan);
    const plusStatus = stringValue(entitlement?.plus_status);
    const earlyTesterUntil = stringValue(entitlement?.early_tester_until);
    const isEarlyTester =
      earlyTesterUntil && new Date(earlyTesterUntil).getTime() > Date.now();
    const isUnlimited =
      plan === "tester" ||
      plan === "admin" ||
      (plan === "plus" && activePlusStatuses.has(plusStatus)) ||
      isEarlyTester;
    const override = numberValue(entitlement?.weekly_live_call_limit_override);
    const limit = override ?? 1;

    if (!isUnlimited && count >= limit) {
      weeklyLimitReachedUsers += 1;
    }
  });

  const paidReadiness =
    weeklyLimitReachedUsers > 0 || extensionRequests > 0
      ? "Watch closely"
      : "Collecting data";

  return {
    freeUsers,
    plusUsers,
    testerUsers,
    adminUsers,
    weeklyLimitReachedUsers,
    liveCallCredits,
    extensionCredits,
    extensionRequests,
    acceptedExtensions,
    paidReadiness,
  };
}

function normalizePlan(value: unknown) {
  const plan = stringValue(value);

  if (plan === "plus" || plan === "tester" || plan === "admin") {
    return plan;
  }

  return "free";
}

function sumNumeric(rows: RowLike[], key: string) {
  return rows.reduce((total, row) => total + (numberValue(row[key]) ?? 0), 0);
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function boolValue(value: unknown) {
  return value === true || value === "true";
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : "";
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

type RowLike = Record<string, unknown>;

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
