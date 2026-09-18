import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import InstagramFeed from "@/components/InstagramFeed";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { foundingHistory } from "@/lib/founders";

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
            About the Fraternity
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Alpha Phi Alpha History
          </h1>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="max-w-[75ch] space-y-5 text-[16.5px] leading-relaxed text-text-onlight/78">
              {foundingHistory.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
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
