import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "MLK Day 2027",
  description:
    "MLK Day 2027 — a Sigma Lambda Chapter event of Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/events/mlk-day-2027",
});

const backLinkClass =
  "inline-block text-[13px] font-bold tracking-[0.03em] uppercase focus-visible:outline-gold-bright";

export default function MlkDay2027Page() {
  return (
    <section className="bg-ink pt-[150px] pb-24 text-text-ondark">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Link href="/events" className={`${backLinkClass} mb-8 block text-gold-bright`}>
          ← Back to Events
        </Link>
        <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
          Chapter Event
        </span>
        <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
          MLK Day 2027
        </h1>
        <Reveal>
          <p className="mt-14 text-lg text-text-ondark/78">More information coming soon.</p>
        </Reveal>
      </div>
    </section>
  );
}
