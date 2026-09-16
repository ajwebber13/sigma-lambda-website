"use client";

import { useEffect, useRef, useState } from "react";
import type { Officer } from "@/lib/content";

export default function OfficerCard({ officer }: { officer: Officer }) {
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

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded bg-paper">
        {imgError ? (
          <div
            className="flex h-full w-full items-center justify-center font-serif text-3xl font-bold text-ink"
            style={{ background: "linear-gradient(145deg, var(--gold-bright), var(--gold-deep))" }}
          >
            {officer.initials}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- graceful onerror fallback needs a plain img
          <img
            ref={imgRef}
            src={`/images/officers/${officer.photo}`}
            alt={officer.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="mt-4 text-[12px] font-semibold tracking-[0.06em] text-gold-deep uppercase">
        {officer.title}
      </div>
      <h3 className="mt-1 font-serif text-[18px] font-semibold">
        {officer.name}
        {officer.footnote && <sup className="ml-0.5 text-gold-deep">*</sup>}
      </h3>
    </div>
  );
}
