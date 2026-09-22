import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SevenJewelsGrid from "@/components/SevenJewelsGrid";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { founders } from "@/lib/founders";

export const metadata: Metadata = buildMetadata({
  title: "The Seven Founding Jewels",
  description:
    "The Seven Founding Jewels of Alpha Phi Alpha Fraternity, Inc. — the college men who founded the fraternity at Cornell University in 1906.",
  path: "/about/seven-jewels",
});

export default function SevenJewelsPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            THE SEVEN JEWELS
          </h1>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="The Seven Jewels"
              title="The Seven Founding Jewels of Alpha Phi Alpha."
              description="The seven visionary founders, known as the “Jewels” of the fraternity, are Henry Arthur Callis, Charles Henry Chapman, Eugene Kinckle Jones, George Biddle Kelley, Nathaniel Allison Murray, Robert Harold Ogle, and Vertner Woodson Tandy."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <SevenJewelsGrid founders={founders} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
