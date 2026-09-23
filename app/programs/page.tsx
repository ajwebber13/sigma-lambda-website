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
          <h1 className="max-w-[820px] text-[32px] leading-[1.08] font-semibold sm:text-[46px]">
            SERVICE &amp; PROGRAMS
          </h1>
          <p className="mx-auto mt-6 max-w-[70ch] text-center text-lg leading-relaxed text-text-ondark/78">
            Our Fraternity&apos;s motto of &quot;First of All, Servants of All, We Shall Transcend All&quot;
            embodies our history as the first intercollegiate Fraternity founded by African American men;
            our mission to provide service to our community; and our charge to our membership.
          </p>
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
