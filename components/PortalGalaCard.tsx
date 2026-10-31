import Link from "next/link";
import { GALA } from "@/lib/gala-2026";

export default function PortalGalaCard() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line/60 bg-paper p-6">
      <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">SCHOLARSHIP GALA</div>
      <h3 className="mt-1 font-serif text-[22px] font-semibold">Scholarship Gala 2026</h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-onlight/60">
        {GALA.date} · {GALA.time}
      </p>
      <p className="text-[13.5px] leading-relaxed text-text-onlight/60">{GALA.venue}</p>
      <Link
        href="/portal/scholarship-gala"
        className="mt-auto inline-block pt-5 text-[13px] font-bold tracking-[0.03em] text-gold-text uppercase"
      >
        View gala info <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
