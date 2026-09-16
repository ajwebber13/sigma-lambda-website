"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RsvpButton({
  eventSlug,
  isSignedIn,
  initiallyRsvped,
}: {
  eventSlug: string;
  isSignedIn: boolean;
  initiallyRsvped: boolean;
}) {
  const router = useRouter();
  const [rsvped, setRsvped] = useState(initiallyRsvped);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/login");
      return;
    }
    if (rsvped || loading) return;

    setLoading(true);
    setError("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: existing } = await supabase
      .from("event_rsvps")
      .select("id")
      .eq("user_id", user.id)
      .eq("event_slug", eventSlug)
      .maybeSingle();

    if (existing) {
      setRsvped(true);
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("event_rsvps")
      .insert({ user_id: user.id, event_slug: eventSlug });

    if (insertError) {
      setError("Couldn't RSVP — try again.");
      setLoading(false);
      return;
    }

    setRsvped(true);
    setLoading(false);
  }

  if (rsvped) {
    return <span className="text-[13px] font-bold whitespace-nowrap text-gold-text">You&apos;re going ✓</span>;
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex-shrink-0 text-[13px] font-bold whitespace-nowrap text-gold-text hover:underline disabled:opacity-60"
      >
        {loading ? "…" : "RSVP →"}
      </button>
      {error && <span className="text-[11px] whitespace-nowrap text-red-500">{error}</span>}
    </div>
  );
}
