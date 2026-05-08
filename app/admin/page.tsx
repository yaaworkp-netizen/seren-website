import { redirect } from "next/navigation";

import { getAdminDashboardData } from "./admin-data";
import { isAdminAuthed } from "./auth";

type Row = Record<string, unknown>;

export default async function AdminDashboardPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    redirect("/admin/login");
  }

  const data = await getAdminDashboardData();

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#021F1B]">
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-col gap-6 border-b border-[#021F1B]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#00755F]">
              Seren Console
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
              Admin dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#53605D]">
              Early testing health for users, Sparks, requests, calls, reports,
              notifications, and waitlist growth.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#53605D] shadow-sm">
              Updated {new Date(data.generatedAt).toLocaleString()}
            </p>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-full border border-[#021F1B]/15 bg-white px-4 py-2 text-xs font-bold text-[#021F1B] transition hover:border-[#00755F] hover:text-[#00755F]">
                Log out
              </button>
            </form>
          </div>
        </header>

        {!data.configured ? (
          <div className="mt-8 rounded-[1.5rem] border border-[#E5484D]/20 bg-[#E5484D]/8 p-6">
            <h2 className="font-serif text-3xl">Admin data is not connected.</h2>
            <p className="mt-3 text-sm font-semibold text-[#8B2D31]">
              {data.configError}
            </p>
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </section>

            <section className="mt-8 grid gap-5 xl:grid-cols-2">
              <Panel title="Recent Sparks" rows={data.sparks} />
              <Panel title="Call Requests" rows={data.requests} />
              <Panel title="Call Sessions" rows={data.calls} />
              <Panel title="Call Safety Reports" rows={data.reports} />
              <Panel title="Spark Reports" rows={data.sparkReports} />
              <Panel
                title="Moderation Queue"
                rows={data.moderationProfiles}
                showModerationActions
              />
              <Panel title="Moderation Action Log" rows={data.moderationActionLogs} />
              <Panel title="Waitlist" rows={data.waitlist} />
              <ActionPanel />
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <article className="rounded-[1.4rem] border border-[#021F1B]/8 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00755F]">
        {label}
      </p>
      <p className="mt-4 font-serif text-5xl leading-none">{value}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-[#6B7280]">
        {note}
      </p>
    </article>
  );
}

function Panel({
  title,
  rows,
  showModerationActions = false,
}: {
  title: string;
  rows: Row[];
  showModerationActions?: boolean;
}) {
  return (
    <section className="rounded-[1.5rem] border border-[#021F1B]/8 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-serif text-3xl">{title}</h2>
        <span className="rounded-full bg-[#1D9E75]/10 px-3 py-1 text-xs font-bold text-[#00755F]">
          {rows.length} shown
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl bg-[#F7F7F5] px-4 py-5 text-sm font-semibold text-[#6B7280]">
          Nothing to show yet.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((row, index) => (
            <RowCard
              key={`${title}-${index}`}
              row={row}
              showModerationActions={showModerationActions}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function RowCard({
  row,
  showModerationActions = false,
}: {
  row: Row;
  showModerationActions?: boolean;
}) {
  const primary =
    stringValue(row.body) ||
    stringValue(row.spark_body) ||
    stringValue(row.email) ||
    stringValue(row.reason) ||
    stringValue(row.moderation_reason) ||
    stringValue(row.username) ||
    stringValue(row.first_name) ||
    stringValue(row.id) ||
    "Record";

  const status = stringValue(row.status) || stringValue(row.moderation_status);
  const createdAt =
    stringValue(row.created_at) ||
    stringValue(row.started_at) ||
    stringValue(row.responded_at) ||
    stringValue(row.moderation_updated_at);

  return (
    <article className="rounded-2xl border border-[#021F1B]/7 bg-[#F7F7F5] p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[34rem] text-sm font-bold leading-6 text-[#021F1B]">
          {primary}
        </p>
        {status ? (
          <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#00755F]">
            {status}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {Object.entries(row)
          .filter(([key]) => !["body", "spark_body", "email", "reason"].includes(key))
          .filter(([key]) => !["moderation_reason", "username", "first_name"].includes(key))
          .slice(0, 8)
          .map(([key, value]) => (
            <span
              key={key}
              className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold text-[#53605D]"
            >
              {key}: {formatValue(value)}
            </span>
          ))}
      </div>

      {createdAt ? (
        <p className="mt-3 text-xs font-semibold text-[#8D9693]">
          {formatDate(createdAt)}
        </p>
      ) : null}

      {showModerationActions && typeof row.id === "string" ? (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#021F1B]/8 pt-4">
          <ModerationButton
            userId={row.id}
            status="under_review"
            label="Review"
            reason="Marked for manual review"
          />
          <ModerationButton
            userId={row.id}
            status="restricted"
            label="Restrict"
            reason="Restricted by admin"
          />
          <ModerationButton
            userId={row.id}
            status="banned"
            label="Ban"
            reason="Banned by admin"
            danger
          />
          <ModerationButton
            userId={row.id}
            status="active"
            label="Clear"
            reason=""
          />
        </div>
      ) : null}
    </article>
  );
}

function ModerationButton({
  userId,
  status,
  label,
  reason,
  danger = false,
}: {
  userId: string;
  status: string;
  label: string;
  reason: string;
  danger?: boolean;
}) {
  return (
    <form action="/admin/moderate-user" method="post">
      <input name="userId" type="hidden" value={userId} />
      <input name="status" type="hidden" value={status} />
      <input name="reason" type="hidden" value={reason} />
      <button
        className={`rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] transition ${
          danger
            ? "bg-[#E5484D] text-white hover:bg-[#C9373D]"
            : "border border-[#00755F]/25 bg-white text-[#00755F] hover:border-[#00755F]"
        }`}
      >
        {label}
      </button>
    </form>
  );
}

function ActionPanel() {
  return (
    <section className="rounded-[1.5rem] border border-[#021F1B]/8 bg-[#021F1B] p-5 text-white shadow-sm">
      <h2 className="font-serif text-3xl">What to watch</h2>
      <div className="mt-5 space-y-4 text-sm leading-6 text-white/74">
        <p>
          Watch the request-to-call path first: many Sparks with few requests
          means the feed needs clearer prompts.
        </p>
        <p>
          Watch reports closely. Any repeated safety issue should become a
          moderation rule before public launch.
        </p>
        <p>
          Watch completed calls against call sessions. If requests are accepted
          but sessions do not end cleanly, call cleanup needs attention.
        </p>
      </div>
    </section>
  );
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : "";
}

function formatValue(value: unknown) {
  if (value === null || value === undefined) return "none";
  if (typeof value === "string") {
    if (value.length > 24) return `${value.slice(0, 24)}...`;
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "data";
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}
