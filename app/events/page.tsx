import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import RsvpButton from "@/components/RsvpButton";
import { buildMetadata } from "@/lib/seo";
import { events } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Events & Calendar",
  description:
    "Upcoming events, meetings and service days from Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/events",
});

export default async function EventsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let rsvpedSlugs = new Set<string>();
  if (user) {
    const { data: rsvps } = await supabase.from("event_rsvps").select("event_slug").eq("user_id", user.id);
    rsvpedSlugs = new Set(rsvps?.map((r) => r.event_slug));
  }

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Events &amp; calendar
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            What&apos;s next for the chapter.
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            One running calendar for galas, meetings and service days. Sign in to RSVP — QR
            check-in is coming with the members-only portal in a later phase.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-[760px]">
              {events.map((event, i) => (
                <div
                  key={event.title}
                  className={`flex flex-wrap items-center gap-5 py-6 ${
                    i === events.length - 1 ? "" : "border-b border-line"
                  }`}
                >
                  <div className="w-16.5 flex-shrink-0 rounded bg-ink py-2.5 text-center text-text-ondark">
                    <b className="block font-serif text-[22px] text-gold-bright">{event.day}</b>
                    <span className="text-[10.5px] tracking-[0.06em] text-text-ondark/65">{event.month}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[17px] font-semibold">{event.title}</h2>
                    <div className="mt-1 text-sm text-text-onlight/55">
                      {event.location} · {event.time}
                    </div>
                  </div>
                  {event.action === "RSVP" ? (
                    <RsvpButton
                      eventSlug={event.slug}
                      isSignedIn={Boolean(user)}
                      initiallyRsvped={rsvpedSlugs.has(event.slug)}
                    />
                  ) : (
                    <div className="flex-shrink-0 text-sm font-bold whitespace-nowrap text-gold-text">
                      {event.action} →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
