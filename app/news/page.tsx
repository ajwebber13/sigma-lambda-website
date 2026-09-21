import type { Metadata } from "next";
import HighlightCard from "@/components/HighlightCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { news } from "@/lib/content";
import { getPublishedHighlights } from "@/lib/newsHighlights";

export const metadata: Metadata = buildMetadata({
  title: "News",
  description:
    "Announcements and updates from Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/news",
});

export const revalidate = 3600;

export default async function NewsPage() {
  const highlights = await getPublishedHighlights();

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            NEWS  &amp; ANNOUNCEMENTS
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
          Events with the Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc.
          </h1>
        </div>
      </section>

      <section className="py-18 lg:py-27" aria-labelledby="brother-highlights-heading">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Brother Highlights"
              title="Brothers making an impact."
              description="Stories of Sigma Lambda brothers serving New Orleans and beyond."
              headingId="brother-highlights-heading"
              className="mb-14"
            />
          </Reveal>
          {highlights.length > 0 ? (
            <Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((highlight) => (
                  <HighlightCard key={highlight.id} highlight={highlight} />
                ))}
              </div>
            </Reveal>
          ) : (
            <p className="text-sm text-text-onlight/55">Brother highlights are coming soon.</p>
          )}
        </div>
      </section>

      <section className="border-t border-line py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <p className="mb-10 text-sm text-text-onlight/55">
            Recent chapter news coming soon — send us your latest updates.
          </p>
          <Reveal>
            <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
              {news.map((item) => (
                <div key={item.title} className="bg-ivory px-6.5 py-7">
                  <div className="text-xs font-semibold tracking-[0.05em] text-gold-text">
                    {item.date ?? item.byline}
                  </div>
                  <h2 className="mt-3 text-[17.5px] leading-tight font-semibold">{item.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-onlight/60">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
