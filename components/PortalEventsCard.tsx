"use client";

import { useState } from "react";
import type { EventItem } from "@/lib/content";

// Mockup: RSVP state is local to the page and is not saved. The real version writes
// to event_rsvps (see RsvpButton) after design approval.
export default function PortalEventsCard({ events }: { events: EventItem[] }) {
  const [going, setGoing] = useState<Set<string>>(new Set([events[0]?.slug]));

  function toggle(slug: string) {
    setGoing((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-line/60 bg-paper p-6">
      <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">EVENTS</div>
      <h3 className="mt-1 font-serif text-[22px] font-semibold">Upcoming events</h3>

      <ul className="mt-5 flex flex-1 flex-col divide-y divide-line/60">
        {events.map((event) => {
          const isGoing = going.has(event.slug);
          return (
            <li key={event.slug} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="w-14 flex-shrink-0 rounded bg-ink py-2 text-center text-text-ondark">
                {event.recurring ? (
                  <b className="block px-1 font-serif text-[13px] leading-tight text-gold-bright">
                    {event.recurring}
                  </b>
                ) : (
                  <>
                    <b className="block font-serif text-[20px] leading-none text-gold-bright">{event.day}</b>
                    <span className="text-[10px] tracking-[0.06em] text-text-ondark/65">{event.month}</span>
                  </>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] leading-snug font-semibold">{event.title}</div>
                <div className="mt-0.5 truncate text-[12.5px] text-text-onlight/55">
                  {event.location} · {event.time}
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggle(event.slug)}
                aria-pressed={isGoing}
                className={`flex-shrink-0 rounded-sm px-3.5 py-2 text-[12.5px] font-bold whitespace-nowrap transition-colors ${
                  isGoing
                    ? "border border-gold/50 bg-gold/10 text-gold-text"
                    : "bg-gold text-ink hover:-translate-y-0.5"
                }`}
              >
                {isGoing ? "Going ✓" : "RSVP"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
