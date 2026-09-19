create table if not exists public.founders_day_notify_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists founders_day_notify_signups_email_idx
  on public.founders_day_notify_signups (lower(email));

alter table public.founders_day_notify_signups enable row level security;

-- Public signup form: anyone (signed in or not) may add an email, but nobody
-- can read the list through the API. Admins read it from the Supabase dashboard.
create policy "Anyone can sign up for Founder's Day updates"
  on public.founders_day_notify_signups for insert
  to anon, authenticated
  with check (true);
