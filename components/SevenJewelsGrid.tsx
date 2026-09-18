"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Founder } from "@/lib/founders";

export default function SevenJewelsGrid({ founders }: { founders: Founder[] }) {
  const [selected, setSelected] = useState<Founder | null>(null);

  useEffect(() => {
    if (!selected) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {founders.map((founder) => (
          <button
            key={founder.name}
            type="button"
            onClick={() => setSelected(founder)}
            className="rounded bg-ink p-5.5 text-left text-text-ondark transition-transform hover:-translate-y-0.5"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded bg-paper">
              <Image
                src={`/images/founders/${founder.photo}`}
                alt={founder.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <span className="mt-4 block text-[12px] font-semibold tracking-[0.06em] text-gold-bright">
              {founder.years}
            </span>
            <h3 className="mt-1 font-serif text-lg font-semibold">{founder.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{founder.cardBio}</p>
            <span className="mt-3.5 inline-block text-[13px] font-bold text-gold-bright">View bio →</span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} biography`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 px-5 py-10"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative grid w-full max-w-[820px] grid-cols-1 overflow-hidden rounded-lg bg-ink sm:max-h-[85vh] sm:grid-cols-[280px_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink text-lg text-text-ondark hover:border-gold-bright"
            >
              ✕
            </button>

            <div className="relative aspect-square w-full sm:aspect-auto sm:h-full">
              <Image
                src={`/images/founders/${selected.photo}`}
                alt={selected.name}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>

            <div className="overflow-y-auto p-7 text-text-ondark sm:p-9">
              <span className="block text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                {selected.years}
              </span>
              <h3 className="mt-1.5 font-serif text-2xl font-semibold">{selected.name}</h3>
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-text-ondark/70">
                {selected.bioParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
