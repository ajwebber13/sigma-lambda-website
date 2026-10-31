import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AddToCalendarMenu from "@/components/AddToCalendarMenu";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { GALA } from "@/lib/gala-2026";

export const metadata: Metadata = buildMetadata({
  title: "2026 Scholarship Gala — December 5, 2026",
  description:
    "The 2026 Scholarship Gala — Sigma Lambda Chapter's marquee fundraiser on Saturday, December 5, 2026 at Xavier University of Louisiana, supporting scholarships for young men in New Orleans.",
  path: "/events/scholarship-gala",
});

const SAVE_THE_DATE_IMAGE = "/images/savethedate-scholarshipgala-2026.jpg";
const SPONSORSHIP_PACKAGE_IMAGE = "/images/gala-2026-sponsorship-package.png";

const backLinkClass =
  "inline-block text-[13px] font-bold tracking-[0.03em] uppercase focus-visible:outline-gold-bright";

const primaryButtonClass =
  "rounded-sm bg-gold px-6.5 py-4 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5";

const primaryButtonDisabledClass =
  "rounded-sm bg-gold px-6.5 py-4 text-[14.5px] font-bold text-ink opacity-50 cursor-not-allowed";

const secondaryButtonOnDarkClass =
  "rounded-sm border border-text-ondark/30 px-6.5 py-4 text-[14.5px] font-semibold text-text-ondark transition-colors hover:border-gold-bright hover:bg-gold/10";

const secondaryButtonOnLightClass =
  "rounded-sm border border-line px-6.5 py-3.5 text-[14.5px] font-semibold text-text-onlight transition-colors hover:border-gold-deep";

function buildEventJsonLd() {
  const [addressLocality, addressRegion] = GALA.city.split(",").map((s) => s.trim());

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: GALA.title,
    startDate: GALA.startISO,
    endDate: GALA.endISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: GALA.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality,
        addressRegion,
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc.",
      url: siteUrl,
    },
    ...(GALA.ticketUrl && {
      offers: {
        "@type": "Offer",
        url: GALA.ticketUrl,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export default function ScholarshipGalaPage() {
  const eventJsonLd = buildEventJsonLd();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* HEADER + EVENT DETAILS */}
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Link href="/events" className={`${backLinkClass} mb-8 block text-gold-bright`}>
            ← Back to Events
          </Link>
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Chapter Event
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">{GALA.title}</h1>
          <p className="mt-6 text-lg text-text-ondark/78">{GALA.tagline}</p>

          <Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_2fr]">
              <div className="rounded-lg border border-line p-5.5">
                <div className="text-[12px] font-semibold tracking-[0.04em] text-gold-bright uppercase">Date</div>
                <div className="mt-1.5 text-[15.5px] font-semibold">{GALA.date}</div>
              </div>
              <div className="rounded-lg border border-line p-5.5">
                <div className="text-[12px] font-semibold tracking-[0.04em] text-gold-bright uppercase">Time</div>
                <div className="mt-1.5 text-[15.5px] font-semibold">{GALA.time}</div>
              </div>
              <div className="rounded-lg border border-line p-5.5">
                <div className="text-[12px] font-semibold tracking-[0.04em] text-gold-bright uppercase">Venue</div>
                <div className="mt-1.5 text-[15.5px] font-semibold lg:whitespace-nowrap">{GALA.venue}</div>
                <div className="mt-1 text-[13px] text-text-ondark/60">{GALA.city}</div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-7">
              <AddToCalendarMenu
                uid="scholarship-gala-2026@sigmalambda.org"
                title={GALA.title}
                description={GALA.tagline}
                venue={GALA.venue}
                city={GALA.city}
                startISO={GALA.startISO}
                endISO={GALA.endISO}
                fileName="scholarship-gala-2026.ics"
                buttonClassName={secondaryButtonOnDarkClass}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SAVE THE DATE IMAGE */}
      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-[600px] overflow-hidden rounded-lg border border-line">
              <div className="relative aspect-[1060/1484] w-full">
                <Image
                  src={SAVE_THE_DATE_IMAGE}
                  alt="Save the Date — Sigma Lambda Chapter Scholarship Gala 2026"
                  fill
                  sizes="(min-width: 640px) 600px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT THE GALA */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="About the Gala"
              title="A night of scholarship, service & brotherhood."
              center
              className="mx-auto max-w-[900px]"
              titleClassName="text-[28px] sm:text-[36px] lg:text-[34px] leading-[1.12] font-semibold"
            />
            <div className="mx-auto mt-4 max-w-2xl space-y-3 text-center">
              {GALA.about.map((paragraph) => (
                <p key={paragraph} className="text-[16.5px] leading-relaxed text-text-onlight/68">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENTERTAINMENT */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Entertainment" title="Live music & performances" className="mb-10" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {GALA.performers.map((performer) => (
                <div key={performer} className="rounded bg-ink p-5.5 text-text-ondark">
                  <h3 className="font-serif text-lg font-semibold">{performer}</h3>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TICKETS & TABLES */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-lg border border-line bg-ink px-6 py-7 text-text-ondark sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold sm:text-xl">Tickets & Tables</h3>
                <p className="mt-1.5 max-w-[55ch] text-sm leading-relaxed text-text-ondark/65">
                  Reserve your seat or a table for your family, friends, or business at the chapter&apos;s marquee
                  fundraiser of the year.
                </p>
              </div>
              {GALA.ticketUrl ? (
                <Link href={GALA.ticketUrl} className={`${primaryButtonClass} flex-shrink-0 whitespace-nowrap`}>
                  Buy Tickets & Tables
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className={`${primaryButtonDisabledClass} flex-shrink-0 whitespace-nowrap`}
                >
                  Tickets Coming Soon
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPONSORSHIP OPPORTUNITIES */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Sponsorship Opportunities"
              title="Partner with the chapter"
              description="Partner with Sigma Lambda Chapter to fund scholarships for young men pursuing their education in New Orleans. Sponsorship packages include recognition before, during, and after the gala."
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {GALA.sponsorTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-lg bg-ink p-5.5 text-text-ondark ${
                    tier.exclusive ? "border-2 border-gold" : "border border-line"
                  }`}
                >
                  {tier.exclusive && (
                    <span className="mb-3 inline-block rounded-full border border-gold/40 bg-gold/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.04em] text-gold-bright uppercase">
                      Exclusive
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-semibold">{tier.name}</h3>
                  <div className="mt-1 text-[22px] font-semibold text-gold-bright">{tier.price}</div>
                  <div className="mt-1 text-[12.5px] text-text-ondark/55">{tier.seating}</div>
                  <ul className="mt-4 space-y-2">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="text-[13.5px] leading-relaxed text-text-ondark/65">
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={SPONSORSHIP_PACKAGE_IMAGE} download className={secondaryButtonOnLightClass}>
                Download Sponsorship Package
              </a>
              <a
                href={`mailto:${GALA.contactEmail}?subject=${encodeURIComponent(
                  "2026 Scholarship Gala — Become a Sponsor"
                )}`}
                className={secondaryButtonOnLightClass}
              >
                Become a Sponsor
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Contact" title="Questions about the gala?" className="mb-6" />
            <a
              href={`mailto:${GALA.contactEmail}`}
              className="inline-block text-[13px] font-bold tracking-[0.03em] text-gold-text uppercase"
            >
              {GALA.contactEmail}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
