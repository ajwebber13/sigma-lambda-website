import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import SaveTheDateModal from "@/components/SaveTheDateModal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sigma Lambda Chapter | Alpha Phi Alpha Fraternity, Inc.",
  description:
    "Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana — chapter history, leadership, programs, events and news since 1925.",
  path: "",
  absolute: true,
});

export default function HomePage() {
  return (
    <>
      <SaveTheDateModal />
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-[150px] pb-24 text-text-ondark">
        <Image
          src="/images/brotherhood.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-[rgba(10,9,8,0.72)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2.5 text-[13.5px] font-semibold tracking-[0.04em] text-gold-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(201,162,39,0.7)]" />
              FOUNDED 1925 · NEW ORLEANS, LOUISIANA
            </div>
            <h1 className="text-[44px] leading-[1.0] font-semibold sm:text-[64px] lg:text-[84px]">
              A Century of Brotherhood
            </h1>
            <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="/about"
                className="rounded-sm bg-gold px-6.5 py-4 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5"
              >
                Explore the chapter
              </Link>
              <Link
                href="/portal"
                className="rounded-sm border border-text-ondark/30 px-6.5 py-4 text-[14.5px] font-semibold text-text-ondark transition-colors hover:border-gold-bright hover:bg-gold/10"
              >
                Member portal
              </Link>
              <Link
                href="/events/scholarship-gala"
                className="rounded-sm border border-text-ondark/30 px-6.5 py-4 text-[14.5px] font-semibold text-text-ondark transition-colors hover:border-gold-bright hover:bg-gold/10"
              >
                RSVP for Scholarship Gala 2026
              </Link>
            </div>
          </div>
          <Medallion />
        </div>
      </section>
    </>
  );
}
