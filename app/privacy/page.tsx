import Link from "next/link";

import { privacySections } from "../legal-copy";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-8 text-[#021F1B] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <nav className="flex items-center justify-between">
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

        <header className="py-16">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00755F]">
            Privacy
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-7xl">
            Quiet by design.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#53605D]">
            Seren is built around temporary anonymous Sparks and live voice
            moments. This policy explains what we collect, what we avoid, and
            how safety records work.
          </p>
        </header>

        <div className="grid gap-4 pb-20">
          {privacySections.map((section) => (
            <section
              key={section.title}
              className="rounded-[24px] border border-[#021F1B]/8 bg-white p-6"
            >
              <h2 className="font-serif text-3xl">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-[#53605D]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
