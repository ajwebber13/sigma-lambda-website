import { DATA_SHEET_URL } from "@/lib/portal-links";

export default function PortalDataSheetCard() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line/60 bg-paper p-6">
      <div className="text-[11px] font-semibold tracking-[0.04em] text-text-onlight/55">ACTION NEEDED</div>
      <h3 className="mt-1 font-serif text-[22px] font-semibold">Membership Personal Data Sheet</h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-onlight/60">
        The Communication Team is building a chapter directory and the Alpha Phi Alpha Fraternity, Inc.,
        Sigma Lambda Chapter Historical Volume. Please complete your personal data sheet.
      </p>
      <a
        href={DATA_SHEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block self-start pt-5 text-[13px] font-bold tracking-[0.03em] text-gold-text uppercase"
      >
        Complete the Data Sheet <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
