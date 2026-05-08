import Image from "next/image";
import Link from "next/link";

import { WaitlistForm } from "./components/WaitlistForm";

const steps = [
  {
    title: "Post a Voice Spark",
    body: "Share one short anonymous thought when you want one real voice conversation.",
  },
  {
    title: "People browse by topic",
    body: "Your thought appears in a calm, time-limited feed. People can search fresh thoughts by topic without likes or follower counts.",
  },
  {
    title: "Then it disappears",
    body: "If you accept a request, the voice call lasts 20 minutes. After that, the moment is gone.",
  },
];

const conversationTypes = [
  {
    title: "Voice Spark",
    label: "core experience",
    body: "Post a thought. Someone browsing by topic can request a private 20-minute voice call. You choose whether to accept.",
  },
  {
    title: "Group room",
    label: "lighter option",
    body: "When a thought needs a few voices first, open a temporary anonymous text room. It is secondary to voice and closes when its timer ends.",
  },
];

const feedPrinciples = [
  {
    title: "Yes, there is a feed",
    body: "Seren has a feed of fresh anonymous thoughts. The difference is that it is time-limited and built for action, not scrolling forever.",
  },
  {
    title: "Topics, not popularity",
    body: "People find Sparks through search and topics. There are no likes, comments, shares, profiles, or follower counts to perform for.",
  },
  {
    title: "One action matters",
    body: "A Voice Spark invites one private call. A group room invites a temporary text conversation. Both disappear.",
  },
];

const hardParts = [
  {
    title: "Discovery is simple",
    body: "Sparks appear in a public, time-limited feed. People browse recent thoughts by topic, then request one voice call or join a group room. Seren is a feed without social pressure, not a follower feed.",
  },
  {
    title: "No one has to wait on the screen",
    body: "If nobody requests your Spark right away, it stays live until it fades. You can leave the app. If someone asks to talk, Seren notifies you and gives you a short window to accept.",
  },
  {
    title: "No recordings does not mean no accountability",
    body: "Voice calls are not recorded, but Seren still has safety tools: report, block, post-call reporting, account and device signals, rate limits, and moderation review. People who break the rules can lose access.",
  },
  {
    title: "Adults only is part of the product",
    body: "Seren asks for date of birth during signup and blocks under-18 access. Accounts can be reviewed or removed if age or safety rules are violated.",
  },
];

const promises = [
  "No profiles",
  "No likes",
  "No comments",
  "No followers",
  "No message history",
  "Temporary conversations, then gone",
];

const faqs = [
  {
    question: "What is a Spark?",
    answer:
      "A Spark is a short anonymous thought. A Voice Spark can become a private call. A group room is the lighter text option.",
  },
  {
    question: "What is a group room?",
    answer:
      "A group room is a timed anonymous text chat around one thought. It is secondary to the main voice experience and disappears when its timer ends.",
  },
  {
    question: "Are calls recorded?",
    answer:
      "No. Calls are designed to be temporary, not replayed. Safety is handled through reporting, blocking, post-call reports, account/device signals, rate limits, and moderation review rather than public recordings.",
  },
  {
    question: "What if no one requests my Spark?",
    answer:
      "Your Spark stays live until it fades. You do not have to keep the app open. If someone asks to talk, Seren sends a notification. If nobody responds, the Spark quietly disappears.",
  },
  {
    question: "How do people find my Spark?",
    answer:
      "Sparks appear in a simple time-limited feed. People browse fresh anonymous thoughts by topic, then request a call or join a group room. There are no likes, comments, profiles, or follower counts.",
  },
  {
    question: "Can people follow me?",
    answer:
      "No. Seren has no profiles, followers, comments, likes, or DMs.",
  },
  {
    question: "What happens after 20 minutes?",
    answer:
      "A voice call ends. A group room ends when its timer runs out. Seren is designed so conversations do not become permanent content.",
  },
  {
    question: "Is Seren anonymous?",
    answer:
      "Yes. Sparks are anonymous and the app avoids public identity by design.",
  },
  {
    question: "Who is Seren for?",
    answer:
      "Seren is for adults who want one calm, real conversation without turning it into a social profile.",
  },
  {
    question: "How is 18+ enforced?",
    answer:
      "Seren asks for date of birth during signup and does not allow under-18 users to continue. We also reserve the right to restrict or remove accounts that violate age or safety rules.",
  },
  {
    question: "What happens if someone behaves badly?",
    answer:
      "You can block or report from Spark screens, group rooms, calls, and post-call safety prompts. Reports are reviewed, and accounts can be limited or removed. Seren is built to be small, but not careless.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#021F1B]">
      <section className="relative flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_18%,rgba(29,158,117,0.18),transparent_52%)]" />
        <div className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1D9E75]/10 blur-3xl motion-drift" />

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
              href="#safety"
              className="hidden text-sm font-semibold text-[#53605D] transition hover:text-[#005E4D] sm:inline"
            >
              Safety
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
          <div className="relative hero-orb">
            <Image
              src="/seren-logo.png"
              alt="Seren orb logo"
              width={620}
              height={620}
              priority
              className="h-72 w-72 object-contain sm:h-88 sm:w-88 lg:h-96 lg:w-96"
            />
            <span className="spark-particle particle-one" />
            <span className="spark-particle particle-two" />
            <span className="spark-particle particle-three" />
          </div>

          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.34em] text-[#00755F] reveal-up reveal-delay-1">
            anonymous voice moments
          </p>

          <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.02em] text-[#021F1B] sm:text-7xl lg:text-8xl reveal-up reveal-delay-2">
            Share a thought. Talk once. Let it disappear.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#44524F] sm:text-xl reveal-up reveal-delay-3">
            Post one short anonymous thought. People browse fresh thoughts by
            topic, then request a private voice call. If you want something
            lighter, open a temporary group room instead.
          </p>

          <div className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center reveal-up reveal-delay-4">
            <a
              href="#waitlist"
              className="motion-button waitlist-pulse rounded-full bg-[#00755F] px-7 py-4 text-center text-sm font-bold text-white shadow-[0_18px_45px_rgba(0,117,95,0.22)] transition hover:bg-[#005E4D]"
            >
              Join the early list
            </a>
            <a
              href="#how-it-works"
              className="motion-button rounded-full border border-[#1D9E75]/45 bg-white/70 px-7 py-4 text-center text-sm font-bold text-[#005E4D] transition hover:bg-white"
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
          <div className="max-w-2xl reveal-up">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              How Seren works
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              One thought can become a real conversation.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="motion-card reveal-up rounded-[28px] border border-[#021F1B]/8 bg-[#F7F7F5] p-7"
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
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl reveal-up">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              A calmer feed
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              A feed without the performance.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Seren does have a feed: fresh anonymous thoughts, sorted by time
              and topic. What it does not have is the social pressure that makes
              most feeds noisy.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {feedPrinciples.map((item) => (
              <article
                key={item.title}
                className="motion-card rounded-[28px] border border-[#021F1B]/8 bg-white p-7"
              >
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#53605D]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="reveal-up">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              Voice first
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Voice is the center. Groups are lighter.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Seren is built around one private 20-minute voice call. Group
              rooms stay available as a softer text option, but they do not
              replace the main promise.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {conversationTypes.map((type) => (
              <article
                key={type.title}
                className="motion-card rounded-[28px] border border-[#021F1B]/8 bg-white p-7"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00755F]">
                  {type.label}
                </p>
                <h3 className="mt-5 font-serif text-3xl">{type.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#53605D]">
                  {type.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="safety"
        className="border-y border-[#021F1B]/8 bg-[#021F1B] px-6 py-20 text-white sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="reveal-up">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A9DCCE]">
                The hard parts
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
                Temporary should still be responsible.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/70">
                Seren is anonymous and temporary by design, so safety, discovery,
                and age checks have to be part of the product from the start.
                Here is how we are handling the parts that matter most.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {hardParts.map((item) => (
                <article
                  key={item.title}
                  className="motion-card rounded-[28px] border border-white/10 bg-white/[0.06] p-6"
                >
                  <h3 className="font-serif text-3xl text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal-up">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
              Built to stay light
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              Real conversation without becoming social media.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53605D]">
              Seren is intentionally small. You can post one active Spark at a
              time. It can become a voice call or a group room, but it is never
              built to last forever.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {promises.map((item) => (
              <div
                key={item}
                className="motion-card rounded-2xl border border-[#1D9E75]/14 bg-white px-5 py-4 text-sm font-semibold text-[#083D36]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl reveal-up">
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
            Be one of the first people inside Seren.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
            We are testing slowly, with real people, so the app can stay calm,
            safe, and human from the beginning.
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
            <a href="mailto:yaaworkp@gmail.com" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
