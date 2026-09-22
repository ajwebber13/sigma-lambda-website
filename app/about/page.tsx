import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
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
            ABOUT THE FRATERNITY
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            The History of Alpha Phi Alpha Fraternity, Incorporated
          </h1>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="mb-12 overflow-hidden rounded-lg border border-line">
              <Image
                src="/images/founders/jewels.jpg"
                alt="The Seven Founding Jewels of Alpha Phi Alpha Fraternity, Inc."
                width={1600}
                height={320}
                sizes="(min-width: 1180px) 1116px, 100vw"
                priority
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
              <div className="space-y-5 text-[16.5px] leading-relaxed text-text-onlight/78">
                {foundingHistory.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="mx-auto w-full max-w-[400px] lg:mx-0">
                <figure>
                  <div className="overflow-hidden rounded-lg border border-line">
                    <Image
                      src={`/images/${encodeURIComponent(
                        "Alpha Phi Alpha house and Singleton residence PC Cornell University Library.jpg",
                      )}`}
                      alt="The Alpha Phi Alpha house and Singleton residence at 411 East State Street, Ithaca, New York"
                      width={1045}
                      height={1760}
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs leading-relaxed text-text-onlight/50">
                    411 East State Street — the Alpha Phi Alpha house and Singleton residence.
                    Photo: Cornell University Library
                  </figcaption>
                </figure>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="MISSION"
              title="Alpha Phi Alpha Fraternity, Inc. develops leaders, promotes brotherhood and academic excellence, while providing service and advocacy for our communities."
              className="mx-auto text-center"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
