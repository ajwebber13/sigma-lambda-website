import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import GallerySection from "@/components/GallerySection";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { gallerySections } from "@/lib/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photos from Sigma Lambda Chapter events, grouped by event, from Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/events/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            GALLERY
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Photos from the chapter.
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            Grouped by event — click any photo to open the slideshow.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          {gallerySections.length === 0 ? (
            <Reveal>
              <SectionHeading
                tag="Coming soon"
                title="Event photos are on the way."
                description="This page is built and ready — once the chapter shares photos from past events, they'll appear here grouped by event, each opening as a slideshow."
              />
            </Reveal>
          ) : (
            <div className="space-y-16">
              {gallerySections.map((section) => (
                <Reveal key={section.title}>
                  <GallerySection section={section} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
