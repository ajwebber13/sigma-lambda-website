"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import { useEffect, useMemo, useState } from "react";
import { revalidateCalendar } from "@/app/actions/events";
import EventForm from "@/components/EventForm";
import { createClient } from "@/lib/supabase/client";
import {
  formatEventDate,
  toFullCalendarEnd,
  type CalendarEvent,
} from "@/lib/calendarEvents";

export default function CalendarView({
  events: initialEvents,
  isAdmin: isAdminProp,
}: {
  events: CalendarEvent[];
  /** Pass this when the host page already knows admin status server-side
   *  (the portal). Omit it on statically-generated pages (the public Events
   *  page) and this component checks is_admin() itself, client-side, so the
   *  page can stay cacheable for the anonymous visitors who make up most of
   *  its traffic. */
  isAdmin?: boolean;
}) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [prevInitialEvents, setPrevInitialEvents] = useState(initialEvents);
  const [selected, setSelected] = useState<CalendarEvent | null>(null);
  const [formEvent, setFormEvent] = useState<CalendarEvent | "new" | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminProp ?? false);

  // Adjusting state during render (React's recommended alternative to an
  // effect) so a fresh `initialEvents` prop — e.g. after router.refresh() —
  // overwrites local state without clobbering an admin's own optimistic edit.
  if (initialEvents !== prevInitialEvents) {
    setPrevInitialEvents(initialEvents);
    setEvents(initialEvents);
  }

  useEffect(() => {
    if (isAdminProp !== undefined) return;
    const supabase = createClient();
    supabase.rpc("is_admin").then(({ data }) => {
      if (data) setIsAdmin(true);
    });
  }, [isAdminProp]);

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
    if (match) {
      setSelected(match);
      setConfirmingDelete(false);
    }
  }

  function handleSaved(saved: CalendarEvent) {
    setEvents((prev) => {
      const exists = prev.some((event) => event.id === saved.id);
      const next = exists ? prev.map((event) => (event.id === saved.id ? saved : event)) : [...prev, saved];
      return next.sort((a, b) => a.start_date.localeCompare(b.start_date));
    });
    setFormEvent(null);
    setSelected(null);
  }

  async function handleDelete() {
    if (!selected) return;
    const supabase = createClient();
    const { error } = await supabase.from("calendar_events").delete().eq("id", selected.id);
    if (error) return;

    await revalidateCalendar();
    setEvents((prev) => prev.filter((event) => event.id !== selected.id));
    setSelected(null);
    setConfirmingDelete(false);
  }

  return (
    <div className="sl-calendar rounded-lg border border-line bg-ink p-4 text-text-ondark sm:p-6">
      {isAdmin && (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setFormEvent("new")}
            className="rounded-sm bg-gold px-4 py-2 text-[13px] font-bold text-ink transition-colors hover:-translate-y-0.5"
          >
            + Add Event
          </button>
        </div>
      )}

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

            {isAdmin && (
              <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
                {!confirmingDelete ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setFormEvent(selected)}
                      className="text-[13px] font-semibold text-gold-bright hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(true)}
                      className="text-[13px] font-semibold text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[13px] text-text-ondark/80">Delete this event?</span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="text-[13px] font-bold text-red-400 hover:underline"
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(false)}
                      className="text-[13px] text-text-ondark/60 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {formEvent && (
        <EventForm
          event={formEvent === "new" ? null : formEvent}
          onClose={() => setFormEvent(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
