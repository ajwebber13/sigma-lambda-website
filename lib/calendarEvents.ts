import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export type CalendarEvent = {
  id: string;
  title: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  location: string | null;
  link: string | null;
};

export type CalendarEventInput = Omit<CalendarEvent, "id">;

// Postgres 42P01 / PostgREST PGRST205: the table has not been migrated yet.
function isMissingTable(error: { code?: string }) {
  return error.code === "42P01" || error.code === "PGRST205";
}

// This fetch itself stays read-only, but admins can now create/edit/delete
// events from the site (see CalendarView + EventForm) — writes go straight to
// Supabase with the admin's own session client, enforced by the calendar_events
// RLS policies and is_admin() (20260924000000_add_site_roles_and_calendar_admin.sql).
export const getCalendarEvents = cache(async (): Promise<CalendarEvent[]> => {
  const { data, error } = await createPublicClient()
    .from("calendar_events")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    if (isMissingTable(error)) return [];
    throw new Error(`Failed to load calendar events: ${error.message}`);
  }
  return (data ?? []) as CalendarEvent[];
});

// "YYYY-MM-DD" parsed as local calendar date, not UTC midnight — avoids the
// off-by-one day shift new Date("YYYY-MM-DD") produces west of UTC.
export function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toISODateOnly(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// FullCalendar treats an all-day event's `end` as exclusive; calendar_events.end_date
// is the last inclusive day of the event, so it needs to be pushed forward one day.
export function toFullCalendarEnd(endDate: string | null): string | undefined {
  if (!endDate) return undefined;
  const date = parseDateOnly(endDate);
  date.setDate(date.getDate() + 1);
  return toISODateOnly(date);
}

export function formatEventDate(event: Pick<CalendarEvent, "start_date" | "end_date">): string {
  const start = parseDateOnly(event.start_date);
  const startLabel = start.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (!event.end_date || event.end_date === event.start_date) return startLabel;

  const end = parseDateOnly(event.end_date);
  const endLabel = end.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `${startLabel} – ${endLabel}`;
}
