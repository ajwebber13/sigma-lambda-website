"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidateCalendar } from "@/app/actions/events";
import type { CalendarEvent, CalendarEventInput } from "@/lib/calendarEvents";

const inputClass =
  "w-full rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] text-text-ondark placeholder:text-text-ondark/40 [color-scheme:dark]";
const labelClass = "mb-2 block text-[13px] font-semibold text-text-ondark/80";

function toInput(event: CalendarEvent | null): CalendarEventInput {
  return {
    title: event?.title ?? "",
    start_date: event?.start_date ?? "",
    end_date: event?.end_date ?? "",
    location: event?.location ?? "",
    description: event?.description ?? "",
    link: event?.link ?? "",
  };
}

export default function EventForm({
  event,
  onClose,
  onSaved,
}: {
  event: CalendarEvent | null;
  onClose: () => void;
  onSaved: (event: CalendarEvent) => void;
}) {
  const [fields, setFields] = useState<CalendarEventInput>(() => toInput(event));
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  function set<K extends keyof CalendarEventInput>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.title.trim() || !fields.start_date) {
      setError("Title and start date are required.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError("");

    const payload = {
      title: fields.title.trim(),
      start_date: fields.start_date,
      end_date: fields.end_date || null,
      location: fields.location?.trim() || null,
      description: fields.description?.trim() || null,
      link: fields.link?.trim() || null,
    };

    const supabase = createClient();
    const query = event
      ? supabase.from("calendar_events").update(payload).eq("id", event.id)
      : supabase.from("calendar_events").insert(payload);

    const { data, error: saveError } = await query.select().single();

    if (saveError || !data) {
      setError("Couldn't save this event — try again.");
      setStatus("error");
      return;
    }

    await revalidateCalendar();
    onSaved(data as CalendarEvent);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,9,8,0.82)] px-5"
      role="dialog"
      aria-modal="true"
      aria-label={event ? "Edit event" : "Add event"}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-lg border border-line bg-ink p-6 text-text-ondark sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-xl font-semibold sm:text-2xl">
          {event ? "Edit event" : "Add event"}
        </h3>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <label className="block">
            <span className={labelClass}>Title</span>
            <input
              type="text"
              value={fields.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Founders' Day Service"
              className={inputClass}
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Start date</span>
              <input
                type="date"
                value={fields.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                className={inputClass}
                required
              />
            </label>
            <label className="block">
              <span className={labelClass}>End date</span>
              <input
                type="date"
                value={fields.end_date ?? ""}
                onChange={(e) => set("end_date", e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block">
            <span className={labelClass}>Location</span>
            <input
              type="text"
              value={fields.location ?? ""}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. Chapter house"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Description</span>
            <textarea
              value={fields.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              placeholder="Details members should know…"
              className={`${inputClass} resize-y`}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Link</span>
            <input
              type="url"
              value={fields.link ?? ""}
              onChange={(e) => set("link", e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </label>

          {status === "error" && error && <p className="text-sm text-red-400">{error}</p>}

          <div className="mt-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "saving"}
              className="rounded-sm bg-gold px-5 py-2.5 text-[13.5px] font-bold text-ink transition-colors hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "saving" ? "Saving…" : "Save event"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-line px-5 py-2.5 text-[13.5px] font-semibold text-text-ondark transition-colors hover:border-gold-deep"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
