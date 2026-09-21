-- 1. Per-highlight photo fit: 'cover' crops to the 4:5 frame (portraits),
--    'contain' shows the whole image (graphics, flyers).
alter table public.news_highlights
  add column if not exists photo_fit text not null default 'cover';

alter table public.news_highlights
  drop constraint if exists news_highlights_photo_fit_check;

alter table public.news_highlights
  add constraint news_highlights_photo_fit_check check (photo_fit in ('cover', 'contain'));

-- 2. Kendall McManus-Thomas: the photo is an announcement graphic, so show it whole.
update public.news_highlights
set
  photo_fit = 'contain',
  title = 'Bro. Dr. Kendall McManus-Thomas Named Next CEO & Principal of Warren Easton',
  preview = 'Bro. Dr. Kendall McManus-Thomas has been named the next CEO and Principal of Warren Easton. Bro. Robert Mitchell and Bro. Desmond LeBlanc, both Board Members, will help lead Easton forward.',
  body = E'Congratulations to Bro. Dr. Kendall McManus-Thomas, who has been named the next CEO and Principal of Warren Easton.\n\nShoutout to Bro. Robert Mitchell and Bro. Desmond LeBlanc, who are both Board Members and will help lead Easton forward with the rest of their team.'
where slug = 'kendall-mcmanus-thomas-easton';

-- 3. Hide the sample seed rows (kept, not deleted, so they can be re-published
--    or reused as templates).
update public.news_highlights
set published = false
where slug in (
  'sample-service-above-self',
  'sample-scholarship-and-mentorship',
  'sample-leadership-in-the-community'
);
