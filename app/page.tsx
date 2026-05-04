import Image from "next/image";
import Link from "next/link";

import { WaitlistForm } from "./components/WaitlistForm";

const steps = [
  {
    title: "Post a Spark",
    body: "Share one short anonymous thought when you feel like talking.",
  },
  {
    title: "Someone resonates",
    body: "If it moves someone, they can request one live voice call.",
  },
  {
    title: "Twenty minutes",
    body: "If you accept, you talk. When it ends, the Spark disappears.",
  },
];

const promises = [
  "No profiles",
  "No likes",
  "No comments",
  "No followers",
  "No message history",
  "One conversation, then gone",
];

const faqs = [
  {
    question: "What is a Spark?",
    answer:
      "A Spark is a short anonymous thought that can invite one live conversation.",
  },
  {
    question: "Are calls recorded?",
    answer:
      "No. Seren is built around live, temporary conversations, not replay.",
  },
  {
    question: "Can people follow me?",
    answer:
      "No. Seren has no profiles, followers, comments, likes, or DMs.",
  },
  {
    question: "What happens after 20 minutes?",
    answer:
      "The call ends, the Spark is gone, and the conversation stays only in memory.",
  },
  {
    question: "Is Seren anonymous?",
    answer:
      "Yes. Sparks are anonymous and the app avoids public identity by design.",
  },
  {
    question: "Who is Seren for?",
    answer:
      "Seren is for adults who want one calm, real voice conversation without turning it into a social profile.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#021F1B]">
      <section className="relative flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_18%,rgba(29,158,117,0.18),transparent_52%)]" />

        <nav className="relative z-10 flex items-center justify-between">
          <a href="#" className="font-serif text-3xl text-[#005E4D]">
            seren
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#faq"
              className="hidden text-sm font-semibold text-[#53605D] transition hover:text-[#005E4D] sm:inline"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="rounded-full border border-[#1D9E75]/40 px-5 py-2 text-sm font-semibold text-[#005E4D] transition hover:border-[#1D9E75] hover:bg-[#1D9E75]/8"
            >
              Early access
            </a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex flex-1 max-w-5xl flex-col items-center justify-center py-14 text-center">
          <Image
            src="/seren-logo.png"
            alt="Seren orb logo"
            width={620}
            height={620}
            priority
            className="h-72 w-72 object-contain sm:h-88 sm:w-88 lg:h-96 lg:w-96"
          />

          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.34em] text-[#00755F]">
            anonymous voice moments
          </p>

          <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.02em] text-[#021F1B] sm:text-7xl lg:text-8xl">
            Share a thought. Talk once. Let it disappear.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#44524F] sm:text-xl">
            Seren turns short anonymous Sparks into live 20-minute voice calls.
            No profiles, no follow-ups, no performance.
          </p>

          <div className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#waitlist"
              className="rounded-full bg-[#00755F] px-7 py-4 text-center text-sm font-bold text-white shadow-[0_18px_45px_rgba(0,117,95,0.22)] transition hover:bg-[#005E4D]"
            >
              Join the early list
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-[#1D9E75]/45 bg-white/70 px-7 py-4 text-center text-sm font-bold text-[#005E4D] transition hover:bg-white"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-[#021F1B]/8 bg-white/62 px-6 py-20 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              How Seren works
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              One Spark can become one call.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[28px] border border-[#021F1B]/8 bg-[#F7F7F5] p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D9E75]/10 text-sm font-black text-[#00755F]">
                  {index + 1}
                </div>
                <h3 className="mt-8 font-serif text-3xl">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#53605D]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              Built to stay light
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Real conversation without becoming another social feed.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Seren is intentionally small. You can post one active Spark at a
              time. If someone requests to talk and you accept, the Spark leaves
              the feed forever.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {promises.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#1D9E75]/14 bg-white px-5 py-4 text-sm font-semibold text-[#083D36]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="border-y border-[#021F1B]/8 bg-white/62 px-6 py-20 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              Early testing
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Seren is being tested slowly.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              We will add the real TestFlight and Android early access links
              here when you are ready to invite testers.
            </p>
          </div>

          <div className="grid gap-4">
            <a
              href="#waitlist"
              className="rounded-[24px] border border-[#021F1B]/8 bg-[#021F1B] p-6 text-white transition hover:bg-[#083D36]"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9FE8CD]">
                iOS
              </p>
              <h3 className="mt-4 font-serif text-3xl">Join TestFlight</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Placeholder until your public tester link is ready.
              </p>
            </a>
            <a
              href="#waitlist"
              className="rounded-[24px] border border-[#1D9E75]/16 bg-white p-6 transition hover:border-[#1D9E75]/40"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00755F]">
                Android
              </p>
              <h3 className="mt-4 font-serif text-3xl">Android early access</h3>
              <p className="mt-3 text-sm leading-6 text-[#53605D]">
                Placeholder until your Play testing link is ready.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              FAQ
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Small answers for a small social app.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[24px] border border-[#021F1B]/8 bg-white p-6"
              >
                <h3 className="font-serif text-2xl">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[#53605D]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="waitlist"
        className="bg-[#021F1B] px-6 py-20 text-white sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <Image
            src="/seren-logo.png"
            alt=""
            width={240}
            height={240}
            className="mx-auto h-36 w-36 object-contain"
          />
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-6xl">
            Be one of the first people inside Seren.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
            We are testing slowly, with real people, so the app can stay calm,
            safe, and human from the beginning.
          </p>

          <WaitlistForm />

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-white/62">
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <a href="mailto:yaaworkp@gmail.com" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
