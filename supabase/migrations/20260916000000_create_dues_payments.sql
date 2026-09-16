-- Dues payments made by members. Only 'stripe' rows are ever written by the
-- app today (Zelle and in-person are informational-only in the UI); the
-- 'zelle' and 'in-person' method values are reserved for future admin tooling.
create table if not exists public.dues_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tier text not null check (tier in ('senior', 'non-senior')),
  "window" text not null check ("window" in ('prime', 'standard')),
  base_amount numeric(10, 2) not null,
  online_total numeric(10, 2) not null,
  method text not null check (method in ('stripe', 'zelle', 'in-person')),
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

create index if not exists dues_payments_user_id_idx on public.dues_payments (user_id);

alter table public.dues_payments enable row level security;

create policy "Members can view their own dues payments"
  on public.dues_payments for select
  using (auth.uid() = user_id);

create policy "Members can insert their own dues payments"
  on public.dues_payments for insert
  with check (auth.uid() = user_id);
