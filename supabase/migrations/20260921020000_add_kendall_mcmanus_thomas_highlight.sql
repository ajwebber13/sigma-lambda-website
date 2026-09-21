insert into public.news_highlights
  (slug, brother_name, title, preview, body, photo_url, label, published, published_at)
values
  (
    'kendall-mcmanus-thomas-easton',
    'Bro. Dr. Kendall McManus-Thomas',
    'Congratulations, Bro. Dr. Kendall McManus-Thomas!',
    'Congrats to Bro. Dr. Kendall McManus-Thomas! Shoutout to Bro. Robert Mitchell and Bro. Desmond LeBlanc, Board Members who will help lead Easton forward.',
    E'Congrats to Bro. Dr. Kendall McManus-Thomas!\n\nShoutout to Bro. Robert Mitchell and Bro. Desmond LeBlanc, who are both Board Members and will help lead Easton forward with the rest of their team.',
    '/images/news/kendall-mcmanus-thomas.jpg',
    'CONGRATULATIONS',
    true,
    now()
  )
on conflict (slug) do nothing;
