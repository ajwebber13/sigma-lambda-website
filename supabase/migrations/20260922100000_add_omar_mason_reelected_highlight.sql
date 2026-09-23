-- Bro. Omar K. Mason's re-election without opposition to Orleans Parish
-- Civil District Court, Division E. Source photo is a real portrait (judge's
-- bench headshot), so photo_fit is 'cover' to crop to the 4:5 frame like
-- other individual portraits.
insert into public.news_highlights
  (slug, brother_name, label, title, preview, body, photo_url, photo_fit, published, published_at)
values
  (
    'omar-mason-reelected',
    'Bro. Omar K. Mason',
    'CONGRATULATIONS',
    'Congratulations to Brother Omar K. Mason',
    'Sigma Lambda proudly congratulates Brother Omar K. Mason on his re-election without opposition to the Orleans Parish Civil District Court, Division E.',
    E'Sigma Lambda proudly congratulates Brother Omar K. Mason on his re-election without opposition to the Orleans Parish Civil District Court, Division E.\n\nBrother Mason''s continued service on the bench represents a commitment to the principles of leadership, integrity, justice, and service that are central to the mission of Alpha Phi Alpha Fraternity, Inc.\n\nHis re-election without opposition is a meaningful recognition of the confidence placed in his leadership and service to the citizens of Orleans Parish. Through his work in the legal and judicial community, Brother Mason continues to demonstrate the importance of excellence, professionalism, and a commitment to serving others.\n\nAs a member of Sigma Lambda Chapter, Brother Mason carries forward the chapter''s proud tradition of brothers making an impact throughout the community and beyond.\n\nPlease join the brothers of Sigma Lambda in congratulating Brother Omar K. Mason on this accomplishment and wishing him continued wisdom, strength, and success as he carries out his responsibilities on the Orleans Parish Civil District Court.\n\nCongratulations, Brother Mason!\n\nMay God guide our thoughts and control our lives, so that we may become through Thee, servants of all.',
    '/images/news/omar-mason-reelected.jpg',
    'cover',
    true,
    now()
  )
on conflict (slug) do nothing;
