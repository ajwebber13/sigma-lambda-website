"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MerchItemId } from "@/lib/merch";

export default function MerchBuyButton({
  itemId,
  price,
  isSignedIn,
}: {
  itemId: MerchItemId;
  price: number;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "merch", item: itemId }),
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
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-sm bg-gold px-5 py-2.5 text-[13px] font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Redirecting…" : `Buy — $${price.toFixed(2)}`}
      </button>
      {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
