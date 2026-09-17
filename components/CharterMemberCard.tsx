"use client";

import { useEffect, useRef, useState } from "react";
import type { CharterMember } from "@/lib/charterMembers";

export default function CharterMemberCard({ member }: { member: CharterMember }) {
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
    <div className="rounded bg-ink p-5.5 text-text-ondark">
      <div className="aspect-square w-full overflow-hidden rounded bg-paper">
        {imgError ? (
          <div
            className="flex h-full w-full items-center justify-center font-serif text-3xl font-bold text-ink"
            style={{ background: "linear-gradient(145deg, var(--gold-bright), var(--gold-deep))" }}
          >
            {member.initials}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- graceful onerror fallback needs a plain img
          <img
            ref={imgRef}
            src={`/images/charter-members/${member.photo}`}
            alt={member.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold">{member.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{member.bio}</p>
    </div>
  );
}
