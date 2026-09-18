import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import OfficerCard from "@/components/OfficerCard";
import { buildMetadata } from "@/lib/seo";
import { officers } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Leadership",
  description:
    "Meet the executive board of Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana.",
  path: "/leadership",
});

export default function LeadershipPage() {
  const hasFootnote = officers.some((o) => o.footnote);

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Governance
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Leadership
          </h1>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {officers.map((officer) => (
                <OfficerCard key={officer.name} officer={officer} />
              ))}
            </div>
          </Reveal>
          {hasFootnote && <p className="mt-12 text-sm text-text-onlight/55">* Omega Chapter</p>}
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <Link
              href="/leadership/past-presidents"
              className="mx-auto block max-w-[420px] rounded-lg border border-line bg-ink px-6.5 py-7 text-text-ondark transition-transform hover:-translate-y-0.5"
            >
              <span className="text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                A Century of Leadership
              </span>
              <h2 className="mt-2.5 text-lg font-semibold">Past Presidents</h2>
              <p className="mt-1.5 text-sm text-text-ondark/60">Every chapter president since 1925 →</p>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
