import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import FounderCard from "@/components/FounderCard";
import InstagramFeed from "@/components/InstagramFeed";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { legacyTimeline } from "@/lib/content";
import { foundingHistory, founders } from "@/lib/founders";
import { charterFounders } from "@/lib/charterFounders";

export const metadata: Metadata = buildMetadata({
  title: "Alpha Phi Alpha History",
  description:
    "The founding history of Alpha Phi Alpha Fraternity, Inc., the Seven Founding Jewels, and the history of Sigma Lambda Chapter in New Orleans, Louisiana.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            About the fraternity
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Alpha Phi Alpha History
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            Founded December 4, 1906, at Cornell University — the first intercollegiate
            Greek-letter fraternity established for African American men.
          </p>
        </div>
      </section>

      <section className="bg-paper py-9">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <Link
              href="/about/college-chapters"
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-ink px-6.5 py-6 text-text-ondark transition-transform hover:-translate-y-0.5"
            >
              <span>
                <span className="block text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                  Greater New Orleans
                </span>
                <span className="mt-1 block text-lg font-semibold">College Chapters</span>
              </span>
              <span className="text-sm font-bold text-gold-bright">
                The area&apos;s six Alpha chapters →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="1906" title="The founding of Alpha Phi Alpha." className="mb-10" />
          </Reveal>
          <Reveal>
            <div className="max-w-[75ch] space-y-5 text-[16.5px] leading-relaxed text-text-onlight/78">
              {foundingHistory.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-18 text-text-ondark lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="The Seven Jewels"
              title="The Seven Founding Jewels of Alpha Phi Alpha."
              dark
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {founders.map((founder) => (
                <FounderCard key={founder.name} founder={founder} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Charter history"
              title="How Sigma Lambda came to be."
              description="The Sigma Lambda Chapter of Alpha Phi Alpha Fraternity was chartered by the Seventeenth Annual Convention of the Fraternity, held in New York City from December 27–31, 1924. On December 5, 1925, the chapter was officially installed in New Orleans, Louisiana, by the Fraternity's Southern Vice President, Brother Charles W. Green — becoming the first Black Greek-letter organization established in the Greater New Orleans area."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <p className="mb-8 max-w-[75ch] text-[16.5px] leading-relaxed text-text-onlight/78">
              The charter members represented a distinguished group of men, including:
            </p>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {charterFounders.map((founder) => (
                <div key={founder.name} className="rounded bg-ink p-5.5 text-text-ondark">
                  <h3 className="font-serif text-lg font-semibold">{founder.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{founder.bio}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Notable brothers"
              title="A legacy carried by the men who came before."
              description="A few of the brothers whose work shaped New Orleans — and the chapter that helped form them."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
              {legacyTimeline.map((entry) => (
                <TiltCard
                  key={entry.name}
                  className="relative overflow-hidden rounded bg-ink px-5.5 py-7 text-text-ondark shadow-[0_22px_40px_-24px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                    {entry.year}
                  </span>
                  <div
                    className="my-4 flex h-13 w-13 items-center justify-center rounded-full font-serif text-lg font-bold text-ink"
                    style={{ background: "linear-gradient(145deg, var(--gold-bright), var(--gold-deep))" }}
                  >
                    {entry.initials}
                  </div>
                  <h2 className="text-lg font-semibold text-text-ondark">{entry.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{entry.description}</p>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Follow along"
              title="Sigma Lambda on Instagram."
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <InstagramFeed />
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Mission"
              title="Scholarship, fellowship, good character, and the uplift of humanity."
              description="Sigma Lambda carries forward Alpha Phi Alpha's founding cardinal principles through mentorship, civic engagement and community service across New Orleans — while giving every member a clear place to stay connected to the chapter."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
