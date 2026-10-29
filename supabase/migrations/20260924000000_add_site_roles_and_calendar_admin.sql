-- Minimal admin-role layer: an email/role table plus two helper functions, used
-- below to gate writes to calendar_events. No admin UI existed before this —
-- see lib/calendarEvents.ts for the app-side read helper this complements.
-- Already applied by hand in the Supabase SQL Editor; this file is kept in sync
-- with that live schema and is safe to re-run.
create table if not exists public.site_roles (
  email text not null,
  role text not null,
  primary key (email, role)
);

alter table public.site_roles enable row level security;

-- Intentionally no select policy: the admin roster is only readable through the
-- security definer functions below, never directly over the API.

-- security definer + fixed search_path so this can read site_roles regardless of
-- the calling user's own RLS, without being hijackable via a crafted search_path.
create or replace function public.has_role(check_role text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.site_roles
    where email = lower(auth.jwt() ->> 'email')
      and role = check_role
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.has_role('admin');
$$;

grant execute on function public.has_role(text) to authenticated;
grant execute on function public.is_admin() to authenticated;

-- calendar_events already has a public "select" policy (see
-- 20260922050000_create_calendar_events.sql); add admin-only writes.
drop policy if exists "Admins can insert calendar events" on public.calendar_events;
create policy "Admins can insert calendar events"
  on public.calendar_events for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update calendar events" on public.calendar_events;
create policy "Admins can update calendar events"
  on public.calendar_events for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete calendar events" on public.calendar_events;
create policy "Admins can delete calendar events"
  on public.calendar_events for delete
  to authenticated
  using (public.is_admin());

-- Table-level grant is required in addition to the policies above — see
-- 20260921040000_grant_news_highlights_read.sql for why.
grant insert, update, delete on public.calendar_events to authenticated;

insert into public.site_roles (email, role) values
  ('ajwebber13@gmail.com', 'admin'),
  ('drturner504@gmail.com', 'admin'),
  ('drturner504@gmail.com', 'president'),
  ('gilbert1030@gmail.com', 'admin'),
  ('gilbert1030@gmail.com', 'treasurer')
on conflict do nothing;
