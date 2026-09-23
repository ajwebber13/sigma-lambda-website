-- Monthly Chapter Meeting is added one entry per month, by hand, as an
-- ongoing manual task (no recurrence support in calendar_events yet).
-- Founders' Day 120th Year Celebration links back to the existing chapter
-- subpage via the link column.
insert into public.calendar_events (title, start_date, description, location, link)
values
  (
    'Monthly Chapter Meeting',
    '2026-10-21',
    'Sigma Lambda Chapter''s monthly meeting, held the third Wednesday of the month.',
    'Chapter house',
    null
  ),
  (
    'Monthly Chapter Meeting',
    '2026-11-18',
    'Sigma Lambda Chapter''s monthly meeting, held the third Wednesday of the month.',
    'Chapter house',
    null
  ),
  (
    'Monthly Chapter Meeting',
    '2026-12-16',
    'Sigma Lambda Chapter''s monthly meeting, held the third Wednesday of the month.',
    'Chapter house',
    null
  ),
  (
    'Alpha Phi Alpha Fraternity, Inc. Founders'' Day — 120th Year Celebration',
    '2026-12-04',
    'Celebrating 120 years of Alpha Phi Alpha Fraternity, Inc.',
    null,
    '/events/founders-day-celebration'
  );
