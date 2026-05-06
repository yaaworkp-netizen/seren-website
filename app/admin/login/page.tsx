import Link from "next/link";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#021F1B] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <Link
          href="/"
          className="mb-10 text-sm font-semibold text-[#9FE8CD] transition hover:text-white"
        >
          ← Back to Seren
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/20">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-[#9FE8CD]">
            Private
          </p>
          <h1 className="font-serif text-5xl leading-none">Seren Console</h1>
          <p className="mt-5 text-sm leading-6 text-white/70">
            Admin view for early testing, safety, Sparks, calls, and waitlist
            health.
          </p>

          <form action="/api/admin/login" method="post" className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                Admin password
              </span>
              <input
                name="password"
                type="password"
                required
                className="mt-3 h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#9FE8CD]"
                placeholder="Enter password"
              />
            </label>

            {params.error ? (
              <p className="rounded-2xl bg-[#E5484D]/15 px-4 py-3 text-sm font-semibold text-[#FFB7BA]">
                {params.error}
              </p>
            ) : null}

            <button className="h-12 w-full rounded-2xl bg-[#1D9E75] font-bold text-white transition hover:bg-[#147A5A]">
              Open dashboard
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
