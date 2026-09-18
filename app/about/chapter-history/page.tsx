import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { charterFounders } from "@/lib/charterFounders";

export const metadata: Metadata = buildMetadata({
  title: "Charter History",
  description:
    "How Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. came to be, chartered in 1924 and installed in New Orleans, Louisiana in 1925.",
  path: "/about/chapter-history",
});

export default function ChapterHistoryPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            About the fraternity
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Charter History
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            How Sigma Lambda came to be, and the men who signed the charter.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Charter History"
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
    </>
  );
}
