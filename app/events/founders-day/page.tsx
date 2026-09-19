import type { Metadata } from "next";
import FoundersDayNotifyForm from "@/components/FoundersDayNotifyForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Founder's Day",
  description:
    "Founder's Day 2026 — celebrating 120 years of Alpha Phi Alpha Fraternity, Inc. with Sigma Lambda Chapter in New Orleans, Louisiana.",
  path: "/events/founders-day",
});

const badges = [
  "Founded December 4, 1906",
  "Cornell University · Ithaca, NY",
  "120 Years of Brotherhood",
];

export default function FoundersDayPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-ink px-5 pt-[150px] pb-10 text-center text-text-ondark sm:px-8">
      {/* Ghosted watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[260px] leading-none font-bold text-gold/[0.045] select-none sm:text-[420px] lg:text-[560px]"
      >
        120
      </span>

      <div className="relative flex w-full max-w-[900px] flex-1 flex-col items-center">
        <div className="flex w-full items-center gap-4 sm:gap-6">
          <span className="h-px flex-1 bg-gold/40" />
          <span className="text-[11px] font-semibold tracking-[0.22em] text-gold-bright uppercase sm:text-[13px]">
            Sigma Lambda Chapter · Est. 1925
          </span>
          <span className="h-px flex-1 bg-gold/40" />
        </div>

        <p className="mt-10 font-serif text-3xl text-gold-bright italic sm:text-4xl">Winter</p>
        <h1 className="font-serif text-[104px] leading-[0.95] font-bold text-text-ondark sm:text-[168px] lg:text-[208px]">
          2026
        </h1>

        <div className="my-8 h-px w-24 bg-gold/60" />

        <h2 className="max-w-[760px] font-serif text-[28px] leading-[1.15] font-bold tracking-[0.02em] uppercase sm:text-[40px] lg:text-[48px]">
          Alpha Phi Alpha 120th Anniversary
        </h2>
        <p className="mt-4 font-serif text-base text-text-ondark/65 italic sm:text-lg">
          Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc.
        </p>

        <ul className="mt-9 flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-gold/40 px-4 py-2 text-[12.5px] font-medium text-text-ondark/85 sm:text-[13.5px]"
            >
              {badge}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[15px] text-text-ondark/60">More Details Coming Soon.</p>

        <div className="mt-6 flex w-full justify-center">
          <FoundersDayNotifyForm />
        </div>
        <p className="mt-4 text-xs text-text-ondark/45">We&apos;ll reach out when details are announced.</p>
      </div>

      <p className="relative mt-16 max-w-[820px] text-[10.5px] leading-relaxed tracking-[0.2em] text-text-ondark/40 uppercase sm:text-[11.5px]">
        Alpha Phi Alpha · 1906 – 2026 · 120 Years of Brotherhood · Sigma Lambda Chapter
      </p>
    </section>
  );
}
