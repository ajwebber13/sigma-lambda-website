"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import { useMemo, useState } from "react";
import {
  formatEventDate,
  toFullCalendarEnd,
  type CalendarEvent,
} from "@/lib/calendarEvents";

export default function CalendarView({ events }: { events: CalendarEvent[] }) {
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  const fcEvents: EventInput[] = useMemo(
    () =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start_date,
        end: toFullCalendarEnd(event.end_date),
        allDay: true,
      })),
    [events]
  );

  function handleEventClick(info: EventClickArg) {
    info.jsEvent.preventDefault();
    const match = events.find((event) => event.id === info.event.id);
    if (match) setSelected(match);
  }

  return (
    <div className="sl-calendar rounded-lg border border-line bg-ink p-4 text-text-ondark sm:p-6">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
        height="auto"
        dayMaxEvents={3}
        events={fcEvents}
        eventClick={handleEventClick}
      />

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,9,8,0.82)] px-5"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-[440px] rounded-lg border border-line bg-ink p-6 text-text-ondark sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="font-serif text-xl font-semibold sm:text-2xl">{selected.title}</h3>
            <p className="mt-2 text-[14px] text-gold-bright">{formatEventDate(selected)}</p>
            {selected.location && (
              <p className="mt-1 text-[13.5px] text-text-ondark/65">{selected.location}</p>
            )}
            {selected.description && (
              <p className="mt-4 text-[14.5px] leading-relaxed text-text-ondark/78">
                {selected.description}
              </p>
            )}
            <div className="mt-6 flex items-center gap-4">
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm bg-gold px-5 py-2.5 text-[13.5px] font-bold text-ink transition-colors hover:-translate-y-0.5"
                >
                  Learn more &amp; register
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-sm border border-line px-5 py-2.5 text-[13.5px] font-semibold text-text-ondark transition-colors hover:border-gold-deep"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
