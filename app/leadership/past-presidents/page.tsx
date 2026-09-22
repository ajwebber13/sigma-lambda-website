import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { pastPresidents } from "@/lib/pastPresidents";

export const metadata: Metadata = buildMetadata({
  title: "Past Presidents",
  description:
    "Every past president of Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana, since its 1925 charter.",
  path: "/leadership/past-presidents",
});

export default function PastPresidentsPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Governance
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Past Presidents
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            A century of leadership every brother who has served as president of Sigma
            Lambda Chapter of Alpha Phi Alpha Fraternity, Incorporate since its 1925 charter.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="PAST CHAPTER PRESIDENTS" title="A Century of Leadership" className="mb-10" />
          </Reveal>
          <Reveal>
            <ul className="columns-2 gap-x-10 sm:columns-3 lg:columns-4">
              {pastPresidents.map((president, i) => (
                <li
                  key={`${president.name}-${i}`}
                  className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 break-inside-avoid text-[15px] text-text-onlight/75"
                >
                  <span>{president.name}</span>
                  {president.badge && (
                    <span className="inline-block flex-shrink-0 rounded-full border border-gold/30 bg-gold/8 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-gold-text uppercase">
                      {president.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
