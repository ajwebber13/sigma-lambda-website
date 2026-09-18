import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { charterMembers, notableMembers } from "@/lib/charterMembers";
import { pastPresidents } from "@/lib/pastPresidents";

export const metadata: Metadata = buildMetadata({
  title: "Members",
  description:
    "Charter members, notable members and past chapter presidents of Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc.",
  path: "/notable-members",
});

export default function NotableMembersPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Members
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Charter members, notable members and past presidents.
          </h1>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Chartered in 1925" title="Charter Members" className="mb-10" />
          </Reveal>
          <Reveal>
            <ul className="columns-2 gap-x-10 sm:columns-3 lg:columns-4">
              {charterMembers.map((name) => (
                <li key={name} className="mb-2.5 break-inside-avoid text-[15px] text-text-onlight/75">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Brothers of the chapter" title="Notable Members" className="mb-14" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notableMembers.map((member) => (
                <div key={member.name} className="rounded bg-ink p-5.5 text-text-ondark">
                  <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{member.role}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Past Chapter Presidents" title="A Century of Leadership" className="mb-10" />
          </Reveal>
          <Reveal>
            <ul className="columns-2 gap-x-10 sm:columns-3 lg:columns-4">
              {pastPresidents.map((president, i) => (
                <li
                  key={`${president.name}-${i}`}
                  className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 break-inside-avoid text-[15px] text-text-onlight/75"
                >
                  <span>{president.name}</span>
                  {president.badge && (
                    <span className="inline-block flex-shrink-0 rounded-full border border-gold/30 bg-gold/8 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-gold-text uppercase">
                      {president.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
