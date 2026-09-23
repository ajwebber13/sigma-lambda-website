create table if not exists public.history_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  submission_date date not null,
  information text not null,
  initiation_chapter text not null,
  initiation_year text not null,
  photo_paths text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists history_submissions_user_id_idx on public.history_submissions (user_id);

alter table public.history_submissions enable row level security;

-- Members-only submission form: signed-in brothers submit historical record
-- entries (with optional photos) that Drew curates from the Supabase
-- dashboard — no in-app review/approval step.
create policy "Members can view their own history submissions"
  on public.history_submissions for select
  using (auth.uid() = user_id);

create policy "Members can insert their own history submissions"
  on public.history_submissions for insert
  with check (auth.uid() = user_id);

-- Private bucket for submitted history photos. Not public — each member can
-- only upload into and read back their own folder (named by their user id);
-- Drew reviews/uses the photos from the Supabase dashboard, which bypasses RLS.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'history-submissions',
  'history-submissions',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "Members can upload their own history submission photos"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'history-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Members can view their own history submission photos"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'history-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
