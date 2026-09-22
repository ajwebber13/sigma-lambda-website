import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alpha Plaza Foundation",
  description: "Alpha Plaza Foundation — a Sigma Lambda Chapter initiative of Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/programs/alpha-plaza-foundation",
});

const backLinkClass =
  "inline-block text-[13px] font-bold tracking-[0.03em] uppercase focus-visible:outline-gold-bright";

export default function AlphaPlazaFoundationPage() {
  return (
    <section className="bg-ink pt-[150px] pb-24 text-text-ondark">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Link href="/programs" className={`${backLinkClass} mb-8 block text-gold-bright`}>
          ← Back to Programs
        </Link>
        <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
          Chapter Program
        </span>
        <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
          Alpha Plaza Foundation
        </h1>
        <Reveal>
          <div className="mx-auto mt-14 max-w-[420px]">
            <div className="relative aspect-[1545/1999] w-full">
              <Image
                src="/images/neworleans-alphas-logo.png"
                alt="New Orleans Alphas"
                fill
                sizes="(min-width: 640px) 420px, 100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-lg text-text-ondark/78">More details forthcoming.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
