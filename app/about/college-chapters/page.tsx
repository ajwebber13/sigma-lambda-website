import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { collegeChapters } from "@/lib/collegeChapters";

export const metadata: Metadata = buildMetadata({
  title: "College Chapters",
  description:
    "The New Orleans-area college chapters of Alpha Phi Alpha Fraternity, Inc. — Beta Tau, Beta Phi, Epsilon Upsilon, Theta Phi, Rho Epsilon and Rho Iota.",
  path: "/about/college-chapters",
});

export default function CollegeChaptersPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            About the fraternity
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            College Chapters
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            The New Orleans-area college chapters of Alpha Phi Alpha Fraternity, Inc.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Greater New Orleans"
              title="Six chapters, one city."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collegeChapters.map((chapter) => (
                <div key={chapter.name} className="rounded bg-ink p-5.5 text-text-ondark">
                  <div className="relative aspect-square w-full overflow-hidden rounded bg-paper">
                    <Image
                      src={`/images/collegechapterlogos/${chapter.logo}`}
                      alt={`${chapter.name} crest`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="mt-4 block text-[12px] font-semibold tracking-[0.06em] text-gold-bright">
                    {chapter.institution}
                  </span>
                  <h2 className="mt-1 font-serif text-lg font-semibold">{chapter.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{chapter.blurb}</p>
                  {chapter.instagramHandle && (
                    <a
                      href={`https://www.instagram.com/${chapter.instagramHandle}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-block text-[13px] font-bold text-gold-bright hover:underline"
                    >
                      @{chapter.instagramHandle} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
