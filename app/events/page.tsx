import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RsvpButton from "@/components/RsvpButton";
import SectionHeading from "@/components/SectionHeading";
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
            Browse the chapter&apos;s full calendar below, or sign in to RSVP to the events we&apos;re
            tracking here — QR check-in is coming with the members-only portal in a later phase.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Link
                href="/events/founders-day"
                className="rounded-lg border border-line bg-ink px-6.5 py-7 text-text-ondark transition-transform hover:-translate-y-0.5"
              >
                <span className="text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                  Dec 4, 2026
                </span>
                <h2 className="mt-2.5 text-lg font-semibold">Founder&apos;s Day</h2>
                <p className="mt-1.5 text-sm text-text-ondark/60">120 Years of Brotherhood →</p>
              </Link>
              <Link
                href="/events/scholarship-gala"
                className="rounded-lg border border-line bg-ink px-6.5 py-7 text-text-ondark transition-transform hover:-translate-y-0.5"
              >
                <span className="text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                  Founders&apos; Week
                </span>
                <h2 className="mt-2.5 text-lg font-semibold">Scholarship Gala</h2>
                <p className="mt-1.5 text-sm text-text-ondark/60">The chapter&apos;s marquee fundraiser →</p>
              </Link>
              <Link
                href="/events/gallery"
                className="rounded-lg border border-line bg-ink px-6.5 py-7 text-text-ondark transition-transform hover:-translate-y-0.5"
              >
                <span className="text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                  Photos
                </span>
                <h2 className="mt-2.5 text-lg font-semibold">Gallery</h2>
                <p className="mt-1.5 text-sm text-text-ondark/60">Browse photos by event →</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Full chapter calendar"
              title="Everything on the calendar."
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-line">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=neworleansalphas%40gmail.com&ctz=America/Chicago"
                style={{ border: 0 }}
                width="100%"
                height="650"
                title="Sigma Lambda Chapter full calendar"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="RSVP"
              title="Events you can RSVP to."
              description="The specific events the chapter portal tracks attendance for."
              className="mb-10"
            />
          </Reveal>
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
