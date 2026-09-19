import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SignOutButton from "@/components/SignOutButton";
import PortalDuesCard from "@/components/PortalDuesCard";
import PortalEventsCard from "@/components/PortalEventsCard";
import PortalMerchCard from "@/components/PortalMerchCard";
import { events } from "@/lib/content";

export default function PortalDashboard({ email, name }: { email: string; name?: string | null }) {
  const nextEvent = events[0];

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
              Member portal
            </span>
            <h1 className="max-w-[820px] text-[32px] leading-[1.1] font-semibold sm:text-[48px]">
              Welcome back, {name ?? "Brother"}.
            </h1>
            <p className="mt-4 max-w-[60ch] text-[16.5px] leading-relaxed text-text-ondark/68">
              Your chapter dues, events and store in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <span className="text-sm text-text-ondark/70">
                Signed in as <span className="font-semibold text-gold-bright">{email}</span>
              </span>
              <SignOutButton />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-white/[0.03] px-5 py-4">
                <div className="text-[11px] font-semibold tracking-[0.04em] text-text-ondark/55">DUES</div>
                <div className="mt-1 font-serif text-[19px]">Not yet paid</div>
              </div>
              <div className="rounded-lg border border-line bg-white/[0.03] px-5 py-4">
                <div className="text-[11px] font-semibold tracking-[0.04em] text-text-ondark/55">NEXT EVENT</div>
                <div className="mt-1 font-serif text-[19px]">
                  {nextEvent.title} · {nextEvent.month} {nextEvent.day}
                </div>
              </div>
              <div className="rounded-lg border border-line bg-white/[0.03] px-5 py-4">
                <div className="text-[11px] font-semibold tracking-[0.04em] text-text-ondark/55">
                  CHAPTER STORE
                </div>
                <div className="mt-1 font-serif text-[19px]">Gala tickets &amp; gear</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading tag="Your dashboard" title="Dues, events and the chapter store." className="mb-10" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <PortalDuesCard />
              <PortalEventsCard events={events} />
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-6">
              <PortalMerchCard />
            </div>
          </Reveal>
          <p className="mt-8 text-center text-[12.5px] text-text-onlight/45">
            Preview — online payments, checkout and RSVPs go live after approval.
          </p>
        </div>
      </section>
    </>
  );
}
