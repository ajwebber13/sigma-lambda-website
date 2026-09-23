import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Founders' Day Celebration",
  description:
    "Founders' Day Celebration — a Sigma Lambda Chapter event of Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/events/founders-day-celebration",
});

const backLinkClass =
  "inline-block text-[13px] font-bold tracking-[0.03em] uppercase focus-visible:outline-gold-bright";

export default function FoundersDayCelebrationPage() {
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
          Founders&apos; Day Celebration
        </h1>
        <Reveal>
          <div className="mx-auto mt-14 max-w-[640px]">
            <div className="relative aspect-[1088/1344] w-full overflow-hidden rounded-lg border border-line">
              <Image
                src="/images/foundersday-savethedate120.jpg"
                alt="Save the Date — Founders' Day Celebration"
                fill
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center text-lg text-text-ondark/78">More details forthcoming.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
