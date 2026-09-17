import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CharterMemberCard from "@/components/CharterMemberCard";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { charterMembers } from "@/lib/charterMembers";
import { pastPresidents } from "@/lib/pastPresidents";

export const metadata: Metadata = buildMetadata({
  title: "Notable Members",
  description:
    "The 1925 charter members and past chapter presidents of Sigma Lambda Chapter, Alpha Phi Alpha Fraternity, Inc.",
  path: "/notable-members",
});

export default function NotableMembersPage() {
  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Notable members
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            The men who founded this chapter, and led it since.
          </h1>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Charter members" title="Chartered in 1925." className="mb-14" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {charterMembers.map((member) => (
                <CharterMemberCard key={member.slug} member={member} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Past chapter presidents" title="A century of leadership." className="mb-10" />
          </Reveal>
          <Reveal>
            <ul className="columns-2 gap-x-10 sm:columns-3 lg:columns-4">
              {pastPresidents.map((name, i) => (
                <li key={`${name}-${i}`} className="mb-2.5 break-inside-avoid text-[15px] text-text-onlight/75">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
