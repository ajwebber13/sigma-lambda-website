"use client";

import Image from "next/image";
import { useState } from "react";
import { getDuesAmount, tierLabels, type Tier } from "@/lib/dues";

export type ExistingDuesPayment = {
  tier: Tier;
  onlineTotal: string;
};

export default function DuesCard({
  existingPayment,
  hasZelleQr,
}: {
  existingPayment: ExistingDuesPayment | null;
  hasZelleQr: boolean;
}) {
  const [tier, setTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (existingPayment) {
    return (
      <div className="rounded-lg bg-paper p-5.5">
        <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">DUES</div>
        <div className="mt-1 font-serif text-[19px]">
          Dues paid — {tierLabels[existingPayment.tier]}, ${existingPayment.onlineTotal}
        </div>
        <DuesFootnote />
      </div>
    );
  }

  const pricing = tier ? getDuesAmount(tier) : null;

  async function handlePayOnline() {
    if (!tier) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "dues", tier }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Something went wrong starting checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting checkout.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg bg-paper p-5.5">
      <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">DUES</div>

      <fieldset className="mt-3">
        <legend className="mb-2.5 text-[13px] font-semibold text-text-onlight/70">I am a</legend>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-6">
          {(["senior", "non-senior"] as const).map((t) => (
            <label key={t} className="flex items-center gap-2 text-[15px]">
              <input
                type="radio"
                name="dues-tier"
                value={t}
                checked={tier === t}
                onChange={() => setTier(t)}
                className="h-4 w-4 accent-gold-deep"
              />
              {tierLabels[t]}
            </label>
          ))}
        </div>
      </fieldset>

      {pricing && (
        <div className="mt-6 flex flex-col gap-5">
          {/* Zelle */}
          <div className="rounded-md border border-line/60 bg-ivory p-4.5">
            <div className="text-[12px] font-semibold tracking-[0.04em] text-gold-text uppercase">
              Zelle (preferred — no fee)
            </div>
            <div className="mt-1.5 font-serif text-[26px] font-semibold">${pricing.base.toFixed(2)}</div>
            <div className="mt-3 flex items-start gap-4">
              {hasZelleQr ? (
                <Image
                  src="/images/zelle-qr.png"
                  alt="Zelle QR code for Sigma Lambda Chapter finance account"
                  width={110}
                  height={110}
                  className="flex-shrink-0 rounded border border-line/60"
                />
              ) : (
                <div className="flex h-[110px] w-[110px] flex-shrink-0 items-center justify-center rounded border border-dashed border-text-onlight/25 bg-text-onlight/5 text-center text-[11px] text-text-onlight/45">
                  QR code coming soon
                </div>
              )}
              <p className="text-[13.5px] leading-relaxed text-text-onlight/65">
                Or search <span className="font-semibold text-text-onlight">sigmalambdafinance1925</span>{" "}
                in your Zelle app.
              </p>
            </div>
          </div>

          {/* Pay online */}
          <div className="rounded-md border border-line/60 bg-ivory p-4.5">
            <div className="text-[12px] font-semibold tracking-[0.04em] text-text-onlight/55 uppercase">
              Pay online (card)
            </div>
            <div className="mt-1.5 font-serif text-[26px] font-semibold">${pricing.onlineTotal.toFixed(2)}</div>
            <p className="mt-1 text-[13px] text-text-onlight/55">Includes 3% processing fee.</p>
            {error && <p className="mt-2 text-[13px] text-red-500">{error}</p>}
            <button
              type="button"
              onClick={handlePayOnline}
              disabled={loading}
              className="mt-3.5 rounded-sm bg-gold px-5.5 py-3 text-[14px] font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Redirecting…" : "Pay dues online"}
            </button>
          </div>

          {/* In person */}
          <div className="rounded-md border border-line/60 bg-ivory p-4.5">
            <div className="text-[12px] font-semibold tracking-[0.04em] text-text-onlight/55 uppercase">
              In person
            </div>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-onlight/70">
              Contact Brother Gilbert Jones to pay by check, money order, or cash.
            </p>
          </div>
        </div>
      )}

      <DuesFootnote />
    </div>
  );
}

function DuesFootnote() {
  return (
    <p className="mt-5 text-[12.5px] leading-relaxed text-text-onlight/50">
      A separate Grand Tax is due by December 31 — details to come.
    </p>
  );
}
