-- Sigma Lambda wins the 2026 Fraternity Softball Tournament. Photo is a wide
-- team group shot, not a portrait, so photo_fit is 'contain' to keep the
-- whole team in frame rather than cropping most of them out of a 4:5 card.
insert into public.news_highlights
  (slug, brother_name, label, title, preview, body, photo_url, photo_fit, published, published_at)
values
  (
    'sigma-lambda-wins-2026-softball-tournament',
    'Sigma Lambda Chapter',
    'CONGRATULATIONS',
    'Sigma Lambda Wins 2026 Fraternity Softball Tournament',
    'Congratulations to the brothers of Sigma Lambda Chapter on winning the 2026 Fraternity Softball Tournament, held September 12 at Wesley Barrow Stadium.',
    E'NEW ORLEANS, LA — September 12, 2026 — Congratulations to the brothers of Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. on winning the 2026 Fraternity Softball Tournament.\n\nThe tournament brought together fraternity teams from across the New Orleans area for a day of competition, fellowship, and brotherhood. Participating organizations included Alpha Phi Alpha Fraternity, Inc. – Sigma Lambda Chapter; Omega Psi Phi Fraternity, Inc. – West Bank and East Bank; Iota Phi Theta Fraternity, Inc.; Kappa Alpha Psi Fraternity, Inc. – New Orleans and Kenner; and Phi Beta Sigma Fraternity, Inc.\n\nThe event was held on September 12, 2026, at Wesley Barrow Stadium, bringing members of the Divine Nine and the surrounding community together for an afternoon of softball and camaraderie.\n\nAfter a day of competition on the field, the brothers of Sigma Lambda emerged as the 2026 Fraternity Softball Tournament champions.\n\nBeyond the competition, the tournament provided an opportunity for fraternities to come together, strengthen relationships, and celebrate the spirit of brotherhood and community.\n\nA special thank-you goes out to everyone who came out to support the teams and the event. The energy and support from family, friends, fraternity members, and community supporters helped make the tournament a memorable occasion.\n\nThe 2026 Fraternity Softball Tournament was presented by the Theta Beta Sigma Chapter of Phi Beta Sigma Fraternity, Inc.\n\nCongratulations once again to the brothers of Sigma Lambda on their championship, and thank you to all of the participating fraternities, organizers, volunteers, and supporters who helped make the event a success.',
    '/images/news/softball-tourney26/original.jpeg',
    'contain',
    true,
    '2026-09-12 12:00:00+00'
  )
on conflict (slug) do nothing;
