import Link from "next/link";

const safetyLayers = [
  {
    title: "Visible safety controls",
    body: "Every voice call has a Safety button. Users can report, block, or use the quick “I felt unsafe” action. Severe reports automatically block the other person.",
  },
  {
    title: "No default call recordings",
    body: "Seren is built around temporary conversations. We do not record calls by default, but reports keep non-audio safety records such as call ID, time, report reason, account signals, and block history.",
  },
  {
    title: "Post-call reporting",
    body: "After a call ends, users can still report or block from the closing screen. Safety does not disappear just because the conversation does.",
  },
  {
    title: "Account and device enforcement",
    body: "Reports, blocks, repeated abuse patterns, device signals, and account history can be reviewed. Accounts that break the rules can be limited or removed.",
  },
  {
    title: "Adults only",
    body: "Seren asks for date of birth during signup and blocks under-18 access. Accounts can be reviewed if age or safety rules are violated.",
  },
  {
    title: "Crisis-aware design",
    body: "Seren is not an emergency service. We are designing prompts and support routing for self-harm or urgent safety situations before wider public launch.",
  },
];

const discoveryNotes = [
  "Sparks appear in a time-limited feed so people can discover fresh anonymous thoughts.",
  "People search and filter by topics, not profiles or popularity.",
  "Voice Spark is the main path: someone requests one private 20-minute call.",
  "Group rooms are secondary, timed text spaces for lighter conversations.",
  "If someone requests your Spark, Seren notifies you.",
  "If nobody responds, your Spark fades without becoming permanent content.",
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-8 text-[#021F1B] sm:px-10 lg:px-16">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="font-serif text-3xl text-[#005E4D]">
          seren
        </Link>
        <Link
          href="/"
          className="rounded-full border border-[#1D9E75]/40 px-5 py-2 text-sm font-semibold text-[#005E4D]"
        >
          Back home
        </Link>
      </nav>

      <section className="mx-auto max-w-6xl py-16 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
          Safety model
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] sm:text-7xl">
          Temporary conversations still need accountability.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-[#53605D]">
          Seren is anonymous and temporary by design. That means safety has to
          be handled without turning every conversation into permanent content.
          This is the model we are building around.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {safetyLayers.map((item) => (
          <article
            key={item.title}
            className="rounded-[28px] border border-[#021F1B]/8 bg-white p-7"
          >
            <h2 className="font-serif text-3xl">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#53605D]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-10 rounded-[34px] bg-[#021F1B] p-8 text-white sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A9DCCE]">
            Cold start
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            What happens if nobody answers right away?
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68">
            Seren is not instant roulette. A Spark can wait for the right person
            while you leave the app and carry on with your day. People find it
            in a calm feed by topic, without likes, comments, or follower counts.
          </p>
        </div>

        <div className="grid gap-3">
          {discoveryNotes.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-semibold leading-6 text-white/78"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
