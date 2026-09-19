"use client";

import { useState } from "react";
import { merchItems } from "@/lib/merch";

type ShopItem = { id: string; name: string; detail: string; price: number };

// Mockup: the gala ticket and its price are placeholders (not in lib/merch, so the
// real /api/checkout route can't sell it). Cart state is local and not saved.
const shopItems: ShopItem[] = [
  {
    id: "gala-ticket",
    name: "Scholarship Gala Ticket",
    detail: "Dec 5, 2026 · Xavier Convocation Center",
    price: 75,
  },
  ...merchItems.map((item) => ({
    id: item.id,
    name: item.name,
    detail: "Chapter gear",
    price: item.price,
  })),
];

export default function PortalMerchCard() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState(false);

  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = shopItems.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);

  function add(id: string) {
    setNotice(false);
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <div className="rounded-lg border border-line/60 bg-paper p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">CHAPTER STORE</div>
          <h3 className="mt-1 font-serif text-[22px] font-semibold">Wear the letters. Fund the mission.</h3>
        </div>
        <p className="text-[13px] text-text-onlight/55">Proceeds support scholarships and chapter programs.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shopItems.map((item) => {
          const qty = cart[item.id] ?? 0;
          return (
            <div key={item.id} className="flex flex-col rounded-md border border-line/60 bg-ivory p-4">
              <div
                aria-hidden="true"
                className="flex aspect-[16/6] items-center sm:aspect-[4/3] justify-center rounded bg-ink font-serif text-[26px] font-semibold tracking-[0.08em] text-gold-bright"
              >
                ΣΛ
              </div>
              <div className="mt-3.5 text-[15px] leading-snug font-semibold">{item.name}</div>
              <div className="mt-0.5 text-[12.5px] text-text-onlight/55">{item.detail}</div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <span className="font-serif text-[20px] font-semibold">${item.price.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => add(item.id)}
                  className="rounded-sm bg-gold px-3.5 py-2 text-[12.5px] font-bold whitespace-nowrap text-ink transition-transform hover:-translate-y-0.5"
                >
                  {qty > 0 ? `Add another (${qty})` : "Add to cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-md bg-ink px-5 py-4 text-text-ondark">
        <div className="text-[14px]">
          {count === 0 ? (
            <span className="text-text-ondark/60">Your cart is empty.</span>
          ) : (
            <>
              <span className="font-semibold">
                {count} {count === 1 ? "item" : "items"}
              </span>
              <span className="text-text-ondark/60"> · Subtotal </span>
              <span className="font-semibold text-gold-bright">${subtotal.toFixed(2)}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {count > 0 && (
            <button
              type="button"
              onClick={() => {
                setCart({});
                setNotice(false);
              }}
              className="text-[13px] text-text-ondark/60 hover:text-text-ondark hover:underline"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            disabled={count === 0}
            onClick={() => setNotice(true)}
            className="rounded-sm bg-gold px-5 py-2.5 text-[13.5px] font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Checkout
          </button>
        </div>
      </div>
      {notice && (
        <p
          role="status"
          className="mt-3 rounded-sm border border-line/60 bg-ivory px-4 py-3 text-[13px] leading-relaxed text-text-onlight/70"
        >
          Secure card checkout opens once the portal is approved.
        </p>
      )}
    </div>
  );
}
