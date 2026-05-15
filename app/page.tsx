import Image from "next/image";
import Link from "next/link";

import { WaitlistForm } from "./components/WaitlistForm";

const simpleSteps = [
  {
    title: "Post a thought",
    body: "Write one short anonymous thought. Something you watched, felt, wondered, or cannot stop thinking about.",
  },
  {
    title: "Hear a voice back",
    body: "People who relate can send an Echo: a short private voice note that only you receive.",
  },
  {
    title: "Call if it lands",
    body: "If an Echo really feels worth continuing, you can invite that person into a live call.",
  },
];

const responseTypes = [
  {
    title: "Echo first",
    body: "A softer first step than a live call. Hear tone, pauses, and care without needing to be online at the same time.",
  },
  {
    title: "Feel it quietly",
    body: "If a thought stays with you but you are not ready to speak, tap I felt this. Only the poster sees the count.",
  },
  {
    title: "Call rarely",
    body: "Live calls are for the moments that truly land. They are intentional, limited, and never the first pressure.",
  },
];

const discoveryPoints = [
  "People browse fresh anonymous thoughts by topic.",
  "Search helps people find what they are in the mood to hear.",
  "Echoes make Seren work even when people are not online at the same time.",
  "If someone sends an Echo or invites you to call, Seren notifies you.",
  "If no one responds, your thought quietly fades instead of becoming permanent content.",
];

const safetyPoints = [
  {
    title: "Adults only",
    body: "Seren asks for date of birth during signup and blocks under-18 access.",
  },
  {
    title: "Report and block everywhere",
    body: "People can report or block from Sparks, Echoes, calls, and after a call ends.",
  },
  {
    title: "No public identity",
    body: "There are no public profiles, followers, comments, likes, or direct messages.",
  },
  {
    title: "No call recordings",
    body: "Calls are not recorded by default. Safety relies on reports, account signals, device signals, and moderation review.",
  },
  {
    title: "Voice privacy tools",
    body: "Voice Veil can lightly soften live calls for people who want extra privacy.",
  },
  {
    title: "Bad actors lose access",
    body: "Reports can lead to blocks, restrictions, and account removal.",
  },
];

const notSocial = [
  "No popularity score",
  "No public profile to polish",
  "No comment section",
  "No endless DM thread",
  "No pressure to perform",
  "No permanent conversation history",
];

const faqs = [
  {
    question: "What is Seren?",
    answer:
      "Seren is a quiet anonymous app where you post one short thought, hear private voice notes from people who relate, and call only when it really lands.",
  },
  {
    question: "What is a Spark?",
    answer:
      "A Spark is the short thought you post. It can receive Echoes, quiet I felt this taps, and sometimes a live call invite.",
  },
  {
    question: "Is Seren just another feed?",
    answer:
      "There is a simple feed so people can discover thoughts by topic. But there are no public likes, comments, shares, profiles, or followers.",
  },
  {
    question: "What if nobody responds?",
    answer:
      "Your Spark stays live for a limited time. You can leave the app. If someone sends an Echo, Seren notifies you. If no one does, it fades.",
  },
  {
    question: "Are calls recorded?",
    answer:
      "No. Seren is built for temporary conversations. Safety is handled through reporting, blocking, device/account signals, and moderation review.",
  },
  {
    question: "Can I reconnect with someone?",
    answer:
      "Not by default. Seren is designed for one moment, not a new follower graph.",
  },
  {
    question: "Who is Seren for?",
    answer:
      "People who want to be heard without turning the moment into social media.",
  },
  {
    question: "Is it safe?",
    answer:
      "Seren is still in early testing, but safety is central: age checks, reporting, blocking, moderation review, and account removal for people who break the rules.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#021F1B]">
      <section className="relative min-h-screen px-6 pb-20 pt-8 sm:px-10 lg:px-16">
        <div className="soft-grid" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(circle_at_50%_18%,rgba(29,158,117,0.18),transparent_54%)]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="font-serif text-3xl text-[#005E4D]">
            seren
          </a>

          <div className="flex items-center gap-3">
            <a
              href="#how"
              className="hidden text-sm font-semibold text-[#53605D] transition hover:text-[#005E4D] sm:inline"
            >
              How it works
            </a>
            <a
              href="#safety"
              className="hidden text-sm font-semibold text-[#53605D] transition hover:text-[#005E4D] sm:inline"
            >
              Safety
            </a>
            <a
              href="#waitlist"
              className="rounded-full border border-[#1D9E75]/40 px-5 py-2 text-sm font-bold text-[#005E4D] transition hover:border-[#1D9E75] hover:bg-[#1D9E75]/10"
            >
              Join waitlist
            </a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D9E75]/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00755F] reveal-up">
              <span className="h-2 w-2 rounded-full bg-[#1D9E75]" />
              early testing
            </div>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.025em] text-[#021F1B] sm:text-7xl lg:text-8xl reveal-up reveal-delay-1">
              Post a thought. Hear a voice back.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#44524F] sm:text-xl reveal-up reveal-delay-2">
              Seren is a calm place for short anonymous thoughts, private voice
              notes, and live calls only when it really lands. No profiles. No
              likes. No performance.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row reveal-up reveal-delay-3">
              <a
                href="#waitlist"
                className="motion-button waitlist-pulse rounded-full bg-[#00755F] px-8 py-4 text-center text-sm font-black text-white shadow-[0_18px_45px_rgba(0,117,95,0.22)] transition hover:bg-[#005E4D]"
              >
                Get early access
              </a>
              <a
                href="#how"
                className="motion-button rounded-full border border-[#1D9E75]/45 bg-white/75 px-8 py-4 text-center text-sm font-black text-[#005E4D] transition hover:bg-white"
              >
                Understand Seren
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px] reveal-up reveal-delay-4">
            <div className="absolute -inset-8 rounded-full bg-[#1D9E75]/12 blur-3xl" />
            <div className="phone-frame relative rounded-[42px] border border-[#021F1B]/10 bg-white/80 p-5 shadow-[0_30px_90px_rgba(2,31,27,0.14)] backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-[#005E4D]">seren</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D9E75]/10 text-[#00755F]">
                  *
                </span>
              </div>

              <div className="mt-8 flex justify-center">
                <Image
                  src="/seren-logo.png"
                  alt="Seren orb"
                  width={260}
                  height={260}
                  priority
                  className="hero-orb h-40 w-40 object-contain"
                />
              </div>

              <div className="mt-7 rounded-[28px] border border-[#021F1B]/8 bg-[#F7F7F5] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00755F]">
                  movies & tv
                </p>
                <p className="mt-4 font-serif text-3xl leading-tight">
                  I just watched something and I need to hear from someone who gets it.
                </p>
                <p className="mt-4 text-sm font-semibold text-[#6B7280]">
                  4m ago - fades later today
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="rounded-full bg-[#00755F] px-4 py-3 text-sm font-black text-white">
                    Send Echo
                  </button>
                  <button className="rounded-full border border-[#1D9E75]/45 bg-white px-4 py-3 text-sm font-black text-[#005E4D]">
                    I felt this
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-full border border-[#1D9E75]/16 bg-[#1D9E75]/8 px-5 py-3 text-sm font-bold text-[#005E4D]">
                3 fresh thoughts nearby
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-[#021F1B]/8 bg-white/64 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl reveal-up">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00755F]">
              In plain English
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              You post a thought. You hear a voice back. You call only if it really lands.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {simpleSteps.map((step, index) => (
              <article
                key={step.title}
                className="motion-card rounded-[30px] border border-[#021F1B]/8 bg-[#F7F7F5] p-7"
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="reveal-up">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00755F]">
              What can happen
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              A live call does not have to be the first step.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Most moments start with an Echo, a short voice note from someone
              who relates. If that voice note feels worth continuing, then a
              live call becomes the next step.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {responseTypes.map((type) => (
              <article
                key={type.title}
                className="motion-card flex gap-5 rounded-[28px] border border-[#021F1B]/8 bg-white p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1D9E75]/10 text-xl text-[#00755F]">
                  *
                </div>
                <div>
                  <h3 className="font-serif text-3xl">{type.title}</h3>
                  <p className="mt-2 text-base leading-7 text-[#53605D]">
                    {type.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#021F1B] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal-up">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#A9DCCE]">
              Discovery
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Yes, people can find your thought.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Seren is not pretending there is no feed. It is a feed with rules:
              short, anonymous, topic-based, time-limited, and built for a real
              voice response instead of public attention.
            </p>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
            <div className="space-y-4">
              {discoveryPoints.map((point) => (
                <div key={point} className="flex gap-4 rounded-2xl bg-white/[0.06] p-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#A9DCCE]" />
                  <p className="text-base leading-7 text-white/78">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="safety" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl reveal-up">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00755F]">
              Safety
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Anonymous does not mean careless.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Seren is built for temporary conversation, so we do not record
              calls by default. That makes reporting, blocking, age checks, and
              moderation review even more important.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {safetyPoints.map((point) => (
              <article
                key={point.title}
                className="motion-card rounded-[28px] border border-[#021F1B]/8 bg-white p-6"
              >
                <h3 className="font-serif text-3xl">{point.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#53605D]">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#021F1B]/8 bg-white/64 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00755F]">
              What Seren is not
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              It is not a place to build an audience.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Seren works best when people stop performing and say the thing
              they actually want to talk about.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {notSocial.map((item) => (
              <div
                key={item}
                className="motion-card rounded-2xl border border-[#1D9E75]/14 bg-white px-5 py-4 text-sm font-bold text-[#083D36]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl reveal-up">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00755F]">
              FAQ
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Clear answers, no mystery.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="motion-card rounded-[24px] border border-[#021F1B]/8 bg-white p-6"
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
            className="hero-orb mx-auto h-36 w-36 object-contain"
          />
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-6xl">
            Help shape the first conversations.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
            We are letting people in slowly so Seren can stay calm, safe, and
            human from the beginning.
          </p>

          <WaitlistForm />

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-white/62">
            <Link href="/safety" className="transition hover:text-white">
              Safety
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <a href="mailto:voiceseren@gmail.com" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
