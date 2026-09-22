-- The news detail page's image box was a fixed 4:5 portrait shape. Landscape
-- 'contain'-fit photos (flyers, group shots) fit inside it by width, leaving
-- a lot of empty space above/below. Storing each photo's pixel dimensions
-- lets the detail page size the box to the photo's real aspect ratio instead,
-- so 'contain' images fill their box with no dead space. 'cover'-fit rows
-- don't need this: they always crop to fill a fixed frame regardless of
-- their natural size, so their dimensions are left null.
alter table public.news_highlights
  add column if not exists photo_width integer,
  add column if not exists photo_height integer;

update public.news_highlights set photo_width = 1254, photo_height = 1254
  where slug = 'kendall-mcmanus-thomas-easton';
update public.news_highlights set photo_width = 1080, photo_height = 1356
  where slug = 'jonathan-stewart-sewerage-water-board-president';
update public.news_highlights set photo_width = 720, photo_height = 540
  where slug = 'ivan-lemelle-portrait-unveiling';
update public.news_highlights set photo_width = 1080, photo_height = 1350
  where slug = 'notice-of-transition-norman-c-francis';
update public.news_highlights set photo_width = 526, photo_height = 526
  where slug = 'ed-murray-elected-house-district-97';
update public.news_highlights set photo_width = 1920, photo_height = 1440
  where slug = 'sigma-lambda-wins-2026-softball-tournament';
update public.news_highlights set photo_width = 1080, photo_height = 1350
  where slug = 'honoring-robert-carter-iii-50th-chapter-president';
update public.news_highlights set photo_width = 1672, photo_height = 941
  where slug = 'sigma-lambda-2026-executive-leadership';
