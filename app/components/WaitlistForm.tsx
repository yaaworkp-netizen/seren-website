"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Could not join the waitlist.");
      }

      setEmail("");
      setState("success");
      setMessage(result.message || "You are on the early list.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not join the waitlist yet."
      );
    }
  };

  return (
    <div className="mx-auto mt-9 max-w-xl">
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-[28px] border border-white/12 bg-white/8 p-3 sm:flex-row"
      >
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state !== "submitting") {
              setState("idle");
              setMessage("");
            }
          }}
          placeholder="you@email.com"
          className="min-h-14 flex-1 rounded-full border border-white/10 bg-white px-5 text-sm font-medium text-[#021F1B] outline-none placeholder:text-[#7A8582]"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="min-h-14 rounded-full bg-[#1D9E75] px-7 text-sm font-bold text-white transition hover:bg-[#147A5A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Joining..." : "Join waitlist"}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-4 text-sm font-semibold ${
            state === "error" ? "text-[#FFB3B6]" : "text-[#9FE8CD]"
          }`}
        >
          {message}
        </p>
      ) : (
        <p className="mt-5 text-xs leading-6 text-white/52">
          We will only use this to send early access updates.
        </p>
      )}
    </div>
  );
}
