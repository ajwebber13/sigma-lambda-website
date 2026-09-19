"use client";

import { useState } from "react";
import { getDuesAmount, getDuesWindow, tierLabels, type Tier } from "@/lib/dues";

// Mockup: shows a placeholder "not yet paid" status. The real Stripe flow lives in
// DuesCard + /api/checkout and gets wired in here after design approval.
export default function PortalDuesCard() {
  const [notice, setNotice] = useState(false);
  const window = getDuesWindow();
  const year = new Date().getFullYear();

  return (
    <div className="flex h-full flex-col rounded-lg border border-line/60 bg-paper p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">DUES</div>
          <h3 className="mt-1 font-serif text-[22px] font-semibold">{year} chapter dues</h3>
        </div>
        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold tracking-[0.04em] whitespace-nowrap text-gold-text uppercase">
          Not yet paid
        </span>
      </div>

      <p className="mt-3 text-[13.5px] leading-relaxed text-text-onlight/60">
        {window === "prime"
          ? "Prime rate applies through October 31."
          : "The standard rate applies from November 1."}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(["senior", "non-senior"] as Tier[]).map((tier) => {
          const { base, onlineTotal } = getDuesAmount(tier);
          return (
            <div key={tier} className="rounded-md border border-line/60 bg-ivory p-4">
              <div className="text-[12px] font-semibold text-text-onlight/60">{tierLabels[tier]}</div>
              <div className="mt-1 font-serif text-[26px] font-semibold">${base.toFixed(2)}</div>
              <div className="mt-0.5 text-[12px] text-text-onlight/50">
                Zelle · or ${onlineTotal.toFixed(2)} by card
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setNotice(true)}
          className="rounded-sm bg-gold px-5.5 py-3 text-[14px] font-bold text-ink transition-transform hover:-translate-y-0.5"
        >
          Pay dues
        </button>
        {notice && (
          <p
            role="status"
            className="mt-3 rounded-sm border border-line/60 bg-ivory px-4 py-3 text-[13px] leading-relaxed text-text-onlight/70"
          >
            Online dues payment opens once the portal is approved — you&apos;ll choose Zelle or card
            right here.
          </p>
        )}
        <p className="mt-4 text-[12.5px] leading-relaxed text-text-onlight/50">
          A separate Grand Tax is due by December 31 — details to come.
        </p>
      </div>
    </div>
  );
}
