"use client";

import { useEffect, useRef, useState } from "react";
import type { LegacyEntry } from "@/lib/content";

function BrotherPhoto({ entry, className }: { entry: LegacyEntry; className: string }) {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The <img> is server-rendered, so on a fast 404 the browser can fire its
  // native error event before React hydrates and attaches onError below.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setImgError(true);
    }
  }, []);

  if (!entry.photo || imgError) {
    return null;
  }

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- graceful onerror needs a plain img */}
      <img
        ref={imgRef}
        src={`/images/notablebrothers/${encodeURIComponent(entry.photo)}`}
        alt={entry.name}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function NotableBrothersGrid({ entries }: { entries: LegacyEntry[] }) {
  const [selected, setSelected] = useState<LegacyEntry | null>(null);

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
        {entries.map((entry) => (
          <button
            key={entry.name}
            type="button"
            onClick={() => setSelected(entry)}
            className="rounded bg-ink p-5.5 text-left text-text-ondark transition-transform hover:-translate-y-0.5"
          >
            <BrotherPhoto
              entry={entry}
              className="relative aspect-square w-full overflow-hidden rounded bg-paper"
            />
            {entry.year && (
              <span
                className={`block text-[12px] font-semibold tracking-[0.06em] text-gold-bright ${
                  entry.photo ? "mt-4" : ""
                }`}
              >
                {entry.year}
              </span>
            )}
            <h3
              className={`font-serif text-lg font-semibold ${
                entry.year ? "mt-1" : entry.photo ? "mt-4" : ""
              }`}
            >
              {entry.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-ondark/65">{entry.description}</p>
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
            className={`relative grid w-full max-w-[820px] grid-cols-1 overflow-hidden rounded-lg bg-ink sm:max-h-[85vh] ${
              selected.photo ? "sm:grid-cols-[280px_1fr]" : ""
            }`}
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

            <BrotherPhoto entry={selected} className="relative aspect-square w-full sm:aspect-auto sm:h-full" />

            <div className="overflow-y-auto p-7 text-text-ondark sm:p-9">
              {selected.year && (
                <span className="block text-[12.5px] font-semibold tracking-[0.06em] text-gold-bright">
                  {selected.year}
                </span>
              )}
              <h3 className={`font-serif text-2xl font-semibold ${selected.year ? "mt-1.5" : ""}`}>
                {selected.name}
              </h3>
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-text-ondark/70">
                <p>{selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
