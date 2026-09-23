create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_date date not null,
  end_date date,
  description text,
  location text,
  link text,
  created_at timestamptz not null default now()
);

create index if not exists calendar_events_start_date_idx on public.calendar_events (start_date);

alter table public.calendar_events enable row level security;

-- Public site + member portal: anyone may read events. No member-facing or
-- admin UI writes to this table — Drew adds rows from the Supabase SQL Editor.
create policy "Anyone can read calendar events"
  on public.calendar_events for select
  to anon, authenticated
  using (true);

-- Row level security alone does not grant table-level privilege — see
-- 20260921040000_grant_news_highlights_read.sql for why this grant is required.
grant select on public.calendar_events to anon, authenticated;
