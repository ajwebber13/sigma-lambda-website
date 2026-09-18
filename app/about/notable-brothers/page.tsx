import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import NotableBrothersGrid from "@/components/NotableBrothersGrid";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { legacyTimeline } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Notable Brothers",
  description:
    "A legacy carried by the men who came before — notable brothers of Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc., who shaped New Orleans.",
  path: "/about/notable-brothers",
});

export default function NotableBrothersPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            About the Fraternity
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Notable Brothers
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            A legacy carried by the men who came before — a few of the brothers whose work shaped
            New Orleans, and the chapter that helped form them.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Notable Brothers"
              title="A legacy carried by the men who came before."
              description="A few of the brothers whose work shaped New Orleans — and the chapter that helped form them."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <NotableBrothersGrid entries={legacyTimeline} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
