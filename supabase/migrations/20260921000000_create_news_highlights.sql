create table if not exists public.news_highlights (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brother_name text not null,
  title text not null,
  preview text not null,
  body text not null,
  photo_url text not null,
  label text not null default 'BROTHER HIGHLIGHT',
  published boolean not null default false,
  published_at timestamptz not null default now(),
  sort_order integer not null default 0
);

create index if not exists news_highlights_published_idx
  on public.news_highlights (published, published_at desc);

alter table public.news_highlights enable row level security;

-- Public site: anyone may read published highlights. Drafts are invisible to
-- the API; admins manage rows from the Supabase dashboard.
create policy "Anyone can read published news highlights"
  on public.news_highlights for select
  to anon, authenticated
  using (published = true);

-- Sample content so the News tab is not empty. Replace with real stories
-- (and real photos) from the Supabase dashboard; delete these rows when done.
insert into public.news_highlights
  (slug, brother_name, title, preview, body, photo_url, published, published_at, sort_order)
values
  (
    'sample-service-above-self',
    'Brother Sample One',
    'Sample Story: Service Above Self',
    'This is placeholder copy for a Brother Highlight. Replace it with a short preview of the story so readers know what they will find when they click through to the full article on the chapter site.',
    E'This is sample content. Replace it with the full story from the Supabase dashboard.\n\nEach paragraph is separated by a blank line. Tell readers who the brother is, what he accomplished, and how his work reflects the chapter''s commitment to service and scholarship.\n\nClose with a line about what comes next, or how fellow brothers can support the effort.',
    '/images/brotherhood.jpg',
    true,
    '2026-09-15 12:00:00+00',
    0
  ),
  (
    'sample-scholarship-and-mentorship',
    'Brother Sample Two',
    'Sample Story: Scholarship and Mentorship',
    'Another placeholder highlight. Use this space for two or three sentences that introduce the story — the brother, the accomplishment, and why it matters to the chapter and to New Orleans.',
    E'This is sample content. Replace it with the full story from the Supabase dashboard.\n\nA good highlight names the brother, describes the work in specific terms, and includes a quote or two when available.',
    '/images/city-of-neworleans.jpg',
    true,
    '2026-09-08 12:00:00+00',
    0
  ),
  (
    'sample-leadership-in-the-community',
    'Brother Sample Three',
    'Sample Story: Leadership in the Community',
    'A third placeholder highlight so the grid shows a full row on desktop. Keep previews short; the card shows only the first three lines and the rest lives on the story page.',
    E'This is sample content. Replace it with the full story from the Supabase dashboard.\n\nPhotos work best as portraits with the face in the upper half of the frame — the cards crop to a 4:5 ratio from the top.',
    '/images/alpha_phi_alpha_2_0.jpg',
    true,
    '2026-09-01 12:00:00+00',
    0
  )
on conflict (slug) do nothing;
