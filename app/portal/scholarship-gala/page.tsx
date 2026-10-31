import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CopyLinkButton from "@/components/CopyLinkButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { GALA, GALA_BROTHERS } from "@/lib/gala-2026";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Scholarship Gala 2026 — Brothers' Info",
  description: "Scholarship Gala 2026 brothers' info — Sigma Lambda Chapter member portal.",
  path: "/portal/scholarship-gala",
  noindex: true,
});

const backLinkClass =
  "inline-block text-[13px] font-bold tracking-[0.03em] uppercase focus-visible:outline-gold-bright";

const secondaryButtonOnLightClass =
  "rounded-sm border border-line px-5 py-2.5 text-[13px] font-semibold text-text-onlight transition-colors hover:border-gold-deep";

const publicGalaUrl = `${siteUrl}/events/scholarship-gala`;

const flyers = [
  {
    name: "Save the Date",
    src: "/images/savethedate-scholarshipgala-2026.jpg",
    aspect: "aspect-[1060/1484]",
  },
  {
    name: "Sponsorship Package",
    src: "/images/gala-2026-sponsorship-package.png",
    aspect: "aspect-[850/1100]",
  },
] as const;

export default async function PortalScholarshipGalaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Link href="/portal" className={`${backLinkClass} mb-8 block text-gold-bright`}>
            ← Back to Portal
          </Link>
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Member portal
          </span>
          <h1 className="max-w-[820px] text-[32px] leading-[1.1] font-semibold sm:text-[48px]">
            Scholarship Gala 2026 — Brothers&apos; Info
          </h1>

          <Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                <div className="mt-1.5 text-[15.5px] font-semibold">{GALA.venue}</div>
                <div className="mt-1 text-[13px] text-text-ondark/60">{GALA.city}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE NEED FROM YOU */}
      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Brothers' Checklist" title="What we need from you" className="mb-8" />
            <ul className="max-w-[70ch] space-y-3">
              {GALA_BROTHERS.notes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-[15px] leading-relaxed text-text-onlight/75">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FLYERS */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Flyers" title="Save the Date & Sponsorship Package" className="mb-8" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {flyers.map((flyer) => (
                <div key={flyer.name} className="rounded-lg border border-line/60 bg-paper p-5">
                  <div className={`relative ${flyer.aspect} w-full overflow-hidden rounded bg-ink`}>
                    <Image
                      src={flyer.src}
                      alt={flyer.name}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{flyer.name}</h3>
                  <div className="mt-3.5 flex flex-wrap gap-3">
                    <a
                      href={flyer.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={secondaryButtonOnLightClass}
                    >
                      View
                    </a>
                    <a href={flyer.src} download className={secondaryButtonOnLightClass}>
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* RECRUITING A SPONSOR */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="rounded-lg border border-line/60 bg-paper p-6">
              <h3 className="font-serif text-[22px] font-semibold">Recruiting a sponsor</h3>
              <p className="mt-2.5 max-w-[65ch] text-[15px] leading-relaxed text-text-onlight/68">
                Share the sponsorship package with your contacts. Send interested sponsors to the public gala page
                or have them email the Scholarship Foundation.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CopyLinkButton link={publicGalaUrl} className={secondaryButtonOnLightClass} />
                <a
                  href={`mailto:${GALA.contactEmail}?subject=${encodeURIComponent(
                    "2026 Scholarship Gala — Sponsorship"
                  )}`}
                  className={secondaryButtonOnLightClass}
                >
                  Email the Scholarship Foundation
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LINK TO PUBLIC PAGE */}
      <section className="pb-18 lg:pb-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <Link
              href="/events/scholarship-gala"
              className="inline-block text-[13px] font-bold tracking-[0.03em] text-gold-text uppercase"
            >
              View the public gala page <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
