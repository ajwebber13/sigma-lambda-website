import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CalendarView from "@/components/CalendarView";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { getCalendarEvents } from "@/lib/calendarEvents";
import { gallerySections } from "@/lib/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Events & Calendar",
  description:
    "Upcoming events, meetings and service days from Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/events",
});

export const revalidate = 3600;

export default async function EventsPage() {
  const calendarEvents = await getCalendarEvents();

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            EVENTS &amp; CALENDAR
          </span>
          <h1 className="mx-auto max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Cordiality exists among all who abide within…
          </h1>
          <p className="mx-auto mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            The Brothers of Sigma Lambda Chapter invites you to attend our upcoming programs.
            Below you will find a description of each event and a chance to register. We look
            forward to seeing you soon!
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Calendar"
              title="What's next for the chapter."
              description="Galas, meetings and service days — tap a date to see the details."
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <CalendarView events={calendarEvents} />
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Community calendar"
              title="Also on our radar."
              description="Community events brothers regularly support — hosted by other organizations, not the chapter."
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <div className="rounded-lg border border-line bg-ink p-6.5 text-text-ondark sm:p-7">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.06em] text-gold-bright">
                HOSTED BY UNCF
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="mt-2.5 font-serif text-xl font-semibold sm:text-2xl">
                39th UNCF Walk for Education
              </h3>
              <p className="mt-2 text-[14px] text-text-ondark/65">
                Saturday, October 17, 2026 · 7:00 AM – 12:00 PM
                <br />
                LSU New Orleans Lakefront Campus Field, 6686 Elysian Fields Ave, New Orleans, LA 70122
              </p>
              <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-text-ondark/78">
                Brothers regularly take part in this HBCU-support 5K walk/run. This is an external
                event hosted by UNCF, not a Sigma Lambda program — visit their site for full
                details and to register.
              </p>
              <a
                href="https://uncf.org/events/39th-annual-uncf-walk-for-education-new-orleans"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-gold-bright hover:underline"
              >
                Learn more &amp; register
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only">(opens uncf.org in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Photo albums"
              title="Relive the last event(s)."
              description="Browse photos by event — click an album to open the full gallery."
              className="mb-10"
            />
          </Reveal>
          {/*
            Google Calendar embed — hidden in favor of the gallery preview below.
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
          */}
          {gallerySections.length === 0 ? (
            <Reveal>
              <p className="text-text-onlight/60">Event photos are on the way — check back soon.</p>
            </Reveal>
          ) : (
            <Reveal>
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
                {gallerySections.map((section) => (
                  <Link key={section.slug} href={`/events/gallery#${section.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-line">
                      <Image
                        src={section.images[0].src}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-center text-[14px] leading-tight text-text-onlight/70 italic">
                      {section.title}
                    </p>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

    </>
  );
}
