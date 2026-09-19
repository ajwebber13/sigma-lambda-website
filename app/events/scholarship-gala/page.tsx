import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import RsvpButton from "@/components/RsvpButton";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { events } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Scholarship Gala",
  description:
    "The Sigma Lambda Chapter Scholarship Gala — the chapter's marquee fundraiser supporting scholarships for young men in New Orleans.",
  path: "/events/scholarship-gala",
});

export default async function ScholarshipGalaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const gala = events.find((e) => e.slug === "centennial-scholarship-gala");

  let rsvped = false;
  if (user && gala) {
    const { data } = await supabase
      .from("event_rsvps")
      .select("id")
      .eq("user_id", user.id)
      .eq("event_slug", gala.slug)
      .maybeSingle();
    rsvped = Boolean(data);
  }

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            Scholarship Gala
          </span>
          <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
            Scholarship Gala 2026
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-text-ondark/78">
            Each year, the Scholarship Foundation and Sigma Lambda Chapter host a gala during
            Founders&apos; Week — funding scholarships for young men pursuing their education in
            New Orleans.
          </p>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-[600px] overflow-hidden rounded-lg border border-line">
              <div className="relative aspect-[1060/1484] w-full">
                <Image
                  src="/images/savethedate-scholarshipgala-2026.jpg"
                  alt="Save the Date — Sigma Lambda Chapter Scholarship Gala 2026"
                  fill
                  sizes="(min-width: 640px) 600px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="This year" title="Centennial Scholarship Gala" className="mb-10" />
          </Reveal>
          {gala && (
            <Reveal>
              <div className="flex flex-wrap items-center gap-6 rounded-lg border border-line bg-paper px-7 py-6">
                <div className="w-16.5 flex-shrink-0 rounded bg-ink py-2.5 text-center text-text-ondark">
                  <b className="block font-serif text-[22px] text-gold-bright">{gala.day}</b>
                  <span className="text-[10.5px] tracking-[0.06em] text-text-ondark/65">{gala.month}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] text-text-onlight/70">
                    {gala.location} · {gala.time}
                  </div>
                </div>
                <RsvpButton eventSlug={gala.slug} isSignedIn={Boolean(user)} initiallyRsvped={rsvped} />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Where it goes"
              title="Funding the Scholarship Foundation."
              description="The chapter's Scholarship Foundation has awarded thousands of dollars in scholarships to young men in the New Orleans community — proceeds from the gala go directly toward next year's awards."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
