"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function FoundersDayNotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase
      .from("founders_day_notify_signups")
      .insert({ email: email.trim() });

    // 23505 = already signed up; treat as success.
    if (error && error.code !== "23505") {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p role="status" className="font-serif text-lg text-gold-bright italic">
        You&apos;re on the list — we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[520px]">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="founders-day-email" className="sr-only">
          Email address
        </label>
        <input
          id="founders-day-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to stay updated"
          className="min-w-0 flex-1 rounded-sm border border-text-ondark/25 bg-text-ondark/5 px-4 py-3.5 text-[14.5px] text-text-ondark placeholder:text-text-ondark/45 focus:border-gold-bright"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-sm bg-gold px-6 py-3.5 text-[13px] font-bold tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "loading" ? "…" : "NOTIFY ME"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-3 text-[13px] text-red-400">
          Couldn&apos;t sign you up — please try again.
        </p>
      )}
    </form>
  );
}
