import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { gallerySections } from "@/lib/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Events & Calendar",
  description:
    "Upcoming events, meetings and service days from Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/events",
});

export default function EventsPage() {
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
