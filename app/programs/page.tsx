import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProgramsGrid from "@/components/ProgramsGrid";
import { buildMetadata } from "@/lib/seo";
import { programs, programsIntro } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Programs",
  description:
    "National and chapter programs run by Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. — mentoring, civic education and community service in New Orleans.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Service &amp; Programs
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Mentoring, education and outreach — organized clearly.
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">{programsIntro}</p>
        </div>
      </section>

      <section className="bg-ink py-18 text-text-ondark lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <ProgramsGrid programs={programs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
