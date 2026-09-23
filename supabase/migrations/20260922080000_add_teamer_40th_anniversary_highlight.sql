-- Sigma Lambda brothers fellowship with the Louisiana District Director,
-- Southwestern Regional Vice President, current General President, and past
-- General Presidents who visited New Orleans to celebrate Bro. Charles C.
-- Teamer, Sr.'s 40th anniversary as 27th General President. Photo is a posed
-- group shot, not a portrait, so photo_fit is 'contain' to keep everyone in
-- frame rather than cropping a 4:5 card, same as the softball and leadership
-- posts.
insert into public.news_highlights
  (slug, brother_name, label, title, preview, body, photo_url, photo_fit, photo_width, photo_height, published, published_at)
values
  (
    'honoring-charles-teamer-40th-anniversary',
    'Sigma Lambda Chapter',
    'CONGRATULATIONS',
    'Sigma Lambda Honors 27th General President Charles C. Teamer, Sr. on His 40th Anniversary',
    'Sigma Lambda Brothers had the privilege of fellowshipping with our Louisiana District Director, Southwestern Regional Vice President, current General President, and past General Presidents who visited New Orleans to celebrate our Brother, 27th General President Charles C. Teamer, Sr.',
    E'Sigma Lambda Brothers had the privilege of fellowshipping with our Louisiana District Director, Southwestern Regional Vice President, current General President, and past General Presidents who visited New Orleans yesterday to celebrate our Brother, 27th General President Charles C. Teamer, Sr. This year marks 40 years since Bro. Teamer began his term as General President. Congrats Bro. Teamer and thank you for all your years of service to the Brotherhood and our beloved city!',
    '/images/news/honoring-charles-teamer-40th-anniversary/532143575_1149125110583950_3265200259486974261_n.jpg',
    'contain',
    2048,
    1536,
    true,
    '2026-09-21 12:00:00+00'
  )
on conflict (slug) do nothing;
