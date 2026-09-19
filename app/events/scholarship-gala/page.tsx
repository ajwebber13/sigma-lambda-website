import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Scholarship Gala",
  description:
    "The Sigma Lambda Chapter Scholarship Gala — the chapter's marquee fundraiser supporting scholarships for young men in New Orleans.",
  path: "/events/scholarship-gala",
});

export default function ScholarshipGalaPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Scholarship Gala
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Scholarship Gala 2026
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            Each year, the Scholarship Foundation and Sigma Lambda Chapter host a gala during
            Founders&apos; Week — funding scholarships for young men pursuing their education in
            New Orleans.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-[600px] overflow-hidden rounded-lg border border-line">
              <div className="relative aspect-[1060/1484] w-full">
                <Image
                  src="/images/savethedate-scholarshipgala-2026.jpg"
                  alt="Save the Date — Sigma Lambda Chapter Scholarship Gala 2026"
                  fill
                  sizes="(min-width: 640px) 600px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
