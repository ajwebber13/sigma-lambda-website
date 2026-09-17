import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { legacyTimeline } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "About & History",
  description:
    "The history of Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. — a century of brotherhood and civic leadership in New Orleans, Louisiana.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            About the chapter
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            A century of brotherhood, service and leadership in New Orleans.
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. was chartered in 1925,
            making it one of the oldest chapters of the nation&apos;s first intercollegiate Black
            fraternity operating in New Orleans. For a hundred years, brothers of Sigma Lambda
            have led in courtrooms, classrooms and city hall — while building a chapter rooted in
            scholarship, brotherhood and service to the community.
          </p>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Charter history"
              title="How the chapter came to be."
              description="The Sigma Lambda Chapter of Alpha Phi Alpha Fraternity was chartered by the Seventeenth Annual Convention of the Fraternity, held in New York City from December 27–31, 1924. On December 5, 1925, the chapter was officially installed in New Orleans, Louisiana, by the Fraternity's Southern Vice President, Brother Charles W. Green — becoming the first Black Greek-letter organization established in the Greater New Orleans area."
            />
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
