import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Reveal from "@/components/Reveal";
import SignOutButton from "@/components/SignOutButton";
import DuesCard, { type ExistingDuesPayment } from "@/components/DuesCard";
import SectionHeading from "@/components/SectionHeading";
import type { Tier } from "@/lib/dues";
import { buildMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Member Portal",
  description:
    "The Sigma Lambda Chapter member portal — dues payment, event RSVPs, check-in and the member directory, coming in Phase 2.",
  path: "/portal",
  noindex: true,
});

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();
  const { data: duesRows } = await supabase
    .from("dues_payments")
    .select("tier, online_total")
    .eq("user_id", user.id)
    .eq("method", "stripe")
    .gte("created_at", yearStart)
    .order("created_at", { ascending: false })
    .limit(1);

  const existingPayment: ExistingDuesPayment | null = duesRows?.[0]
    ? { tier: duesRows[0].tier as Tier, onlineTotal: String(duesRows[0].online_total) }
    : null;

  const hasZelleQr = fs.existsSync(path.join(process.cwd(), "public/images/zelle-qr.png"));

  return (
    <>
    <section className="bg-ink pt-[150px] pb-24 text-text-ondark">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
              Member portal
            </span>
            <h1 className="text-[32px] leading-[1.12] font-semibold sm:text-[42px]">
              Everything a brother needs, behind one login.
            </h1>
            <p className="mt-4 max-w-[52ch] text-[16.5px] leading-relaxed text-text-ondark/68">
              Online dues payment, event RSVPs and a searchable member directory are coming in
              Phase 2 — for now, here&apos;s a look at your dashboard.
            </p>
            <ul className="mt-6.5 flex flex-col gap-4">
              {[
                "Pay dues online and see payment history",
                "RSVP to events and store digital check-in codes",
                "Search the full member directory",
                "Track personal attendance and standing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-[15px] leading-normal">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5.5 w-5.5 flex-shrink-0 items-center justify-center rounded-full bg-gold text-xs font-extrabold text-ink"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm text-text-ondark/55">
              Have a question in the meantime? Reach out at{" "}
              <a href="mailto:info@sigmalambda.org" className="font-semibold text-gold-bright hover:underline">
                info@sigmalambda.org
              </a>
              .
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <span className="text-sm text-text-ondark/70">
                Signed in as <span className="font-semibold text-gold-bright">{user.email}</span>
              </span>
              <SignOutButton />
            </div>
          </Reveal>
          <Reveal>
            <div
              className="rounded-2xl bg-ink p-3.5 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.5)]"
              style={{ transform: "perspective(1200px) rotateY(-8deg) rotateX(2deg)" }}
            >
              <div className="min-h-[360px] rounded-lg bg-ivory p-5.5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <b className="flex-shrink-0 font-serif text-[15px]">Member Dashboard</b>
                  <span className="max-w-[60%] truncate rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-ink">
                    {user.email}
                  </span>
                </div>
                <div className="mb-3 flex gap-3">
                  <div className="flex-1 rounded-lg bg-paper p-4">
                    <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">
                      NEXT EVENT
                    </div>
                    <div className="mt-1 font-serif text-[19px]">Gala, Oct 18</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-paper p-4">
                    <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">
                      ATTENDANCE
                    </div>
                    <div className="mt-1 font-serif text-[19px]">92%</div>
                  </div>
                </div>
                <div className="mb-3 rounded-lg bg-paper p-4">
                  <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">
                    MY CHECK-IN CODE
                  </div>
                  <div className="mt-1 font-serif text-[19px]">Tap to show QR</div>
                </div>
                <div className="rounded-lg bg-paper p-4">
                  <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">
                    DIRECTORY
                  </div>
                  <div className="mt-1 font-serif text-[19px]">218 members</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="py-18 lg:py-27">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="Dues" title="Pay your chapter dues." className="mb-10" />
        </Reveal>
        <Reveal>
          <div className="max-w-[560px]">
            <DuesCard existingPayment={existingPayment} hasZelleQr={hasZelleQr} />
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}
