-- Two real events, added end-to-end to confirm the calendar pipeline works.
insert into public.calendar_events (title, start_date, description, location, link)
values
  (
    '39th UNCF Walk for Education',
    '2026-10-17',
    'Brothers regularly take part in this HBCU-support 5K walk/run. This is an external event hosted by UNCF, not a Sigma Lambda program.',
    'LSU New Orleans Lakefront Campus Field, 6686 Elysian Fields Ave, New Orleans, LA 70122',
    'https://uncf.org/events/39th-annual-uncf-walk-for-education-new-orleans'
  ),
  (
    'Founders'' Day Service',
    '2026-11-02',
    'Annual service commemorating the founding of Alpha Phi Alpha Fraternity, Inc.',
    'Chapter house',
    null
  );
