import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";
import RsvpButton from "@/components/RsvpButton";
import MerchBuyButton from "@/components/MerchBuyButton";
import { buildMetadata } from "@/lib/seo";
import { legacyTimeline, programs, events, news } from "@/lib/content";
import { merchItems } from "@/lib/merch";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Sigma Lambda Chapter | Alpha Phi Alpha Fraternity, Inc.",
  description:
    "Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana — chapter history, leadership, programs, events and news since 1925.",
  path: "",
  absolute: true,
});

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let rsvpedSlugs = new Set<string>();
  if (user) {
    const { data: rsvps } = await supabase.from("event_rsvps").select("event_slug").eq("user_id", user.id);
    rsvpedSlugs = new Set(rsvps?.map((r) => r.event_slug));
  }

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-[150px] pb-24 text-text-ondark">
        <Image
          src="/images/city-of-neworleans.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(10,9,8,0.72)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2.5 text-[13.5px] font-semibold tracking-[0.04em] text-gold-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(201,162,39,0.7)]" />
              FOUNDED 1925 · NEW ORLEANS, LOUISIANA
            </div>
            <h1 className="text-[38px] leading-[1.03] font-semibold sm:text-[52px] lg:text-[68px]">
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
            </div>
          </div>
          <Medallion />
        </div>
      </section>

      {/* HISTORY TEASER */}
      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Chapter history"
              title="A Hundred Years of Excellence"
              description="Since 1925, The Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Incorporated has stood alongside the city of New Orleans through every era — brothers who led in courtrooms, city hall, the state house, and numerous other capacities. The brothers of Sigma Lambda continue to make a great impact in the city of New Orleans and the state of Louisiana."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
              {legacyTimeline.map((entry) => (
                <TiltCard
                  key={entry.name}
                  className="relative overflow-hidden rounded bg-ink px-5.5 py-7 text-text-ondark shadow-[0_22px_40px_-24px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                    {entry.year}
                  </span>
                  <div
                    className="my-4 flex h-13 w-13 items-center justify-center rounded-full font-serif text-lg font-bold text-ink"
                    style={{ background: "linear-gradient(145deg, var(--gold-bright), var(--gold-deep))" }}
                  >
                    {entry.initials}
                  </div>
                  <h3 className="text-lg font-semibold text-text-ondark">{entry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{entry.description}</p>
                </TiltCard>
              ))}
            </div>
          </Reveal>
          <div className="mt-10">
            <Link href="/about" className="text-sm font-bold text-gold-text hover:underline">
              Read the full chapter history →
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS TEASER */}
      <section className="bg-ink py-18 text-text-ondark lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Service &amp; programs"
              title="Mentoring, education and outreach — organized clearly."
              description="National mandates and chapter-built initiatives, sorted so visitors know exactly what Sigma Lambda runs and who it serves."
              dark
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-px bg-text-ondark/12 sm:grid-cols-2 lg:grid-cols-3">
              {programs.slice(0, 3).map((program) => (
                <div key={program.name} className="bg-ink px-6.5 py-7.5 transition-colors hover:bg-[#1c1610]">
                  <span className="font-serif text-2xl font-semibold text-gold-deep">{program.number}</span>
                  <h3 className="mt-3.5 text-lg font-semibold">{program.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-ondark/60">{program.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-10">
            <Link href="/programs" className="text-sm font-bold text-gold-bright hover:underline">
              See all programs →
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS TEASER */}
      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Events &amp; calendar"
              title="What's next for the chapter."
              description="One running calendar for galas, meetings and service days — with RSVPs and check-in built in."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div>
              {events.slice(0, 3).map((event, i) => (
                <div
                  key={event.title}
                  className={`flex items-center gap-5 py-5 ${
                    i === events.slice(0, 3).length - 1 ? "" : "border-b border-line"
                  }`}
                >
                  <div className="w-16.5 flex-shrink-0 rounded bg-ink py-2.5 text-center text-text-ondark">
                    <b className="block font-serif text-[22px] text-gold-bright">{event.day}</b>
                    <span className="text-[10.5px] tracking-[0.06em] text-text-ondark/65">{event.month}</span>
                  </div>
                  <div>
                    <h3 className="text-[16.5px] font-semibold">{event.title}</h3>
                    <div className="mt-1 text-[13px] text-text-onlight/55">
                      {event.location} · {event.time}
                    </div>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    {event.action === "RSVP" ? (
                      <RsvpButton
                        eventSlug={event.slug}
                        isSignedIn={Boolean(user)}
                        initiallyRsvped={rsvpedSlugs.has(event.slug)}
                      />
                    ) : (
                      <div className="text-[13px] font-bold whitespace-nowrap text-gold-text">
                        {event.action} →
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-10">
            <Link href="/events" className="text-sm font-bold text-gold-text hover:underline">
              View the full calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* MERCH / CHAPTER STORE */}
      <section className="bg-ink py-18 text-text-ondark lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="Chapter store"
              title="Wear the letters. Fund the mission."
              description="A simple built-in store — proceeds support scholarships and chapter programs."
              dark
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {merchItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-line/60 bg-[#1c1610] p-6">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="mt-4">
                    <MerchBuyButton itemId={item.id} price={item.price} isSignedIn={Boolean(user)} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWS TEASER */}
      <section className="bg-paper py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tag="News &amp; announcements"
              title="What's happening at Sigma Lambda."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
              {news.map((item) => (
                <div key={item.title} className="bg-ivory px-6.5 py-7">
                  <div className="text-xs font-semibold tracking-[0.05em] text-gold-text">{item.date}</div>
                  <h3 className="mt-3 text-[17.5px] leading-tight font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-onlight/60">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-10">
            <Link href="/news" className="text-sm font-bold text-gold-text hover:underline">
              Read all chapter news →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
