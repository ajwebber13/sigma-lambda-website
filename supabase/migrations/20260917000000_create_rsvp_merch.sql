create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  event_slug text not null,
  created_at timestamptz not null default now(),
  unique (user_id, event_slug)
);

create index if not exists event_rsvps_user_id_idx on public.event_rsvps (user_id);

alter table public.event_rsvps enable row level security;

create policy "Members can view their own RSVPs"
  on public.event_rsvps for select
  using (auth.uid() = user_id);

create policy "Members can insert their own RSVPs"
  on public.event_rsvps for insert
  with check (auth.uid() = user_id);

create table if not exists public.merch_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item text not null,
  amount numeric(10, 2) not null,
  stripe_session_id text unique,
  ordered_at timestamptz not null default now()
);

create index if not exists merch_orders_user_id_idx on public.merch_orders (user_id);

alter table public.merch_orders enable row level security;

create policy "Members can view their own merch orders"
  on public.merch_orders for select
  using (auth.uid() = user_id);

create policy "Members can insert their own merch orders"
  on public.merch_orders for insert
  with check (auth.uid() = user_id);
