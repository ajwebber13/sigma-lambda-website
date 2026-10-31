"use client";

import { useEffect, useRef, useState } from "react";

type CalendarEventInput = {
  title: string;
  description: string;
  venue: string;
  city: string;
  startISO: string;
  endISO: string;
};

function toGoogleDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeICSText(text: string): string {
  return text.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

function googleCalendarUrl({ title, description, venue, city, startISO, endISO }: CalendarEventInput): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toGoogleDate(startISO)}/${toGoogleDate(endISO)}`,
    details: description,
    location: `${venue}, ${city}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function outlookCalendarUrl({ title, description, venue, city, startISO, endISO }: CalendarEventInput): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: title,
    body: description,
    location: `${venue}, ${city}`,
    startdt: startISO,
    enddt: endISO,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function downloadICS(
  { title, description, venue, city, startISO, endISO }: CalendarEventInput,
  uid: string,
  fileName: string
) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sigma Lambda Chapter//Events//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toGoogleDate(new Date().toISOString())}`,
    `DTSTART:${toGoogleDate(startISO)}`,
    `DTEND:${toGoogleDate(endISO)}`,
    `SUMMARY:${escapeICSText(title)}`,
    `DESCRIPTION:${escapeICSText(description)}`,
    `LOCATION:${escapeICSText(`${venue}, ${city}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AddToCalendarMenu({
  uid,
  title,
  description,
  venue,
  city,
  startISO,
  endISO,
  fileName,
  buttonClassName,
}: {
  uid: string;
  title: string;
  description: string;
  venue: string;
  city: string;
  startISO: string;
  endISO: string;
  fileName: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const eventInput: CalendarEventInput = { title, description, venue, city, startISO, endISO };

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const itemClass =
    "flex w-full items-center gap-1.5 rounded px-3 py-2 text-left text-[13.5px] text-text-ondark/80 hover:bg-white/5 hover:text-text-ondark";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 ${buttonClassName ?? ""}`}
      >
        Add to Calendar
        <ChevronIcon open={open} />
      </button>
      <div
        className={`absolute left-0 top-full z-10 pt-2 transition-opacity duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="min-w-[220px] rounded-md border border-line bg-ink p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]">
          <a
            href={googleCalendarUrl(eventInput)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={itemClass}
          >
            Google Calendar
            <ExternalIcon />
          </a>
          <a
            href={outlookCalendarUrl(eventInput)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={itemClass}
          >
            Outlook
            <ExternalIcon />
          </a>
          <button
            type="button"
            onClick={() => {
              downloadICS(eventInput, uid, fileName);
              setOpen(false);
            }}
            className={itemClass}
          >
            Apple / Other (.ics)
          </button>
        </div>
      </div>
    </div>
  );
}
