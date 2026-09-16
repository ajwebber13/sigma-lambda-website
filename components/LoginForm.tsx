"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "sent" | "error";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-sm border border-line bg-gold/8 px-5 py-4 text-[15px] leading-relaxed text-text-ondark">
        Check <span className="font-semibold text-gold-bright">{email}</span> for a login link —
        click it to sign in to the member portal.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Email address</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] text-text-ondark placeholder:text-text-ondark/40"
        />
      </label>
      {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-gold px-6.5 py-4 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "loading" ? "Sending…" : "Send login link"}
      </button>
    </form>
  );
}
