import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Founder's Day",
  description:
    "Founder's Day 2026 — celebrating 120 years of Alpha Phi Alpha Fraternity, Inc. with Sigma Lambda Chapter in New Orleans, Louisiana.",
  path: "/events/founders-day",
});

export default function FoundersDayPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Founder&apos;s Day · December 4, 2026
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            120 Years of Brotherhood
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            On December 4, 1906, seven college men founded Alpha Phi Alpha Fraternity, Inc. at
            Cornell University. Sigma Lambda Chapter marks the anniversary every year — and 2026
            brings the fraternity&apos;s 120th.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="The day"
              title="A century and two decades of Scholarship, Leadership and Tenacity."
              description="Founder's Day honors the Seven Founding Jewels and everything the fraternity has built since — a legacy Sigma Lambda has carried in New Orleans since 1925. Details for the chapter's 2026 Founder's Day program will be posted here and on the full calendar as they're confirmed."
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="rounded-sm bg-gold px-6.5 py-4 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5"
              >
                Read the founding history
              </Link>
              <Link
                href="/events"
                className="rounded-sm border border-line px-6.5 py-4 text-[14.5px] font-semibold text-text-onlight transition-colors hover:border-gold-deep"
              >
                Back to the full calendar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
