-- Optional link to the original article, shown as a button on the story page.
-- (The table-level select grant from 20260921040000 already covers new columns.)
alter table public.news_highlights
  add column if not exists source_url text,
  add column if not exists source_label text;

-- Kendall McManus-Thomas: full story, source link, and real publish date.
update public.news_highlights
set
  source_url = 'https://www.nola.com/news/education/warren-easton-high-school-principal-new-orleans/article_d5f4b722-72e9-4304-80db-12fda8d8e650.html',
  source_label = 'NOLA.com',
  published_at = '2026-05-28 12:00:00+00',
  preview = 'Bro. Dr. Kendall McManus-Thomas returns to his alma mater as CEO and Principal of Warren Easton Charter High School.',
  body = E'Congratulations to Bro. Dr. Kendall McManus-Thomas, who has been named CEO and Principal of Warren Easton Charter High School in New Orleans. He returns to his alma mater, where he once taught chemistry, coached track, and served in school leadership.\n\nMost recently, Bro. McManus-Thomas was principal of Benjamin Franklin High School, where he became the school''s first Black male principal. He holds a doctorate in executive leadership and is known across the city as "Dr. Mac."\n\nShoutout to Bro. Robert Mitchell and Bro. Desmond LeBlanc, who are both Board Members and will help lead Easton forward with the rest of their team.'
where slug = 'kendall-mcmanus-thomas-easton';

-- New highlights. Timestamps are noon UTC so the date shows correctly in Central time.
insert into public.news_highlights
  (slug, brother_name, label, title, preview, body, photo_url, photo_fit, published, published_at)
values
  (
    'jonathan-stewart-sewerage-water-board-president',
    'Bro. Jonathan Stewart',
    'BROTHER HIGHLIGHT',
    'Bro. Jonathan Stewart Elected President of the Sewerage and Water Board',
    'Bro. Jonathan Stewart was elected President of the newly seated Sewerage and Water Board, its first citizen President in decades, for a four-year term.',
    E'The newly seated Sewerage and Water Board has elected its first citizen President in decades, naming our Brother Jonathan Stewart as Board President for a four-year term.\n\nMayor Helena Moreno congratulated Stewart and pointed to his elevation as evidence of accelerating reforms made possible by the passage of the Mayor and Council''s local and state legislative agenda.',
    '/images/news/jonathan-stewart-swbno.jpg',
    'contain',
    true,
    '2026-08-15 12:00:00+00'
  ),
  (
    'ivan-lemelle-portrait-unveiling',
    'Bro. Judge Ivan Lemelle',
    'CONGRATULATIONS',
    'Bro. Judge Ivan Lemelle Honored at Portrait Unveiling',
    'Bro. Honorable Judge Ivan Lemelle (Beta Tau) was honored at a portrait unveiling at the U.S. District Court for the Eastern District of Louisiana.',
    E'Congratulations to Bro. Honorable Judge Ivan Lemelle (Beta Tau) on his portrait unveiling at the U.S. District Court for the Eastern District of Louisiana.\n\nJudge Lemelle has attained senior status at the court. He was appointed to the bench by President Bill Clinton in 1997.\n\nJoining Bro. Lemelle were Brothers Karl Connor, State Rep. Eddie Murray, Ronald Carrere, Tim Francis, and Omar Mason.',
    '/images/news/judge-ivan-lemelle.jpg',
    'contain',
    true,
    '2026-07-10 12:00:00+00'
  ),
  (
    'notice-of-transition-dexter-joseph',
    'Bro. Dexter Joseph',
    'NOTICE OF TRANSITION',
    'Notice of Transition: Bro. Dexter Joseph',
    'Bro. Dexter Joseph, a Fall 1984 initiate of Theta Phi Chapter and longtime Budget Director for the Sewerage and Water Board, passed away on August 2, 2026.',
    E'On Sunday, August 2nd, 2026, Bro. Dexter Joseph passed away, surrounded by his family.\n\nBro. Joseph was a Fall 1984 initiate of Alpha Phi Alpha Fraternity, Inc., Theta Phi Chapter, seated at Louisiana State University at New Orleans (LSUNO), formerly the University of New Orleans (UNO). He served as the Budget Director for the Sewerage and Water Board, where he was honored in December 2025 for 35 years of service to the City of New Orleans.\n\nBro. Joseph should be remembered as a strong Alpha Man who worked to reclaim brothers while delivering on his promise to hold the light of Alpha high. He proudly served as our chapter''s Sergeant at Arms. Brothers, I hope we all take a moment to pray for, acknowledge, and lift up Bro. Joseph''s life and legacy, his family, and all who had the pleasure of crossing paths with our Bro. Dexter Joseph. Details for Bro. Joseph''s Omega service and funeral arrangements will be provided when made available.\n\nRest Well, Brother Joseph....06!!',
    '/images/news/dexter-joseph-omega.jpg',
    'cover',
    true,
    '2026-08-02 12:00:00+00'
  ),
  (
    'notice-of-transition-joshua-williams-jr',
    'Bro. Joshua Williams Jr.',
    'NOTICE OF TRANSITION',
    'Notice of Transition: Bro. Joshua Williams Jr.',
    'Bro. Joshua Williams Jr., a Fall 1986 initiate of Beta Phi Chapter and former Sigma Lambda Chapter President and Louisiana District Director, has transitioned to the Omega Chapter.',
    E'It is with deep sorrow that I announce that Bro. Joshua Williams Jr. has transitioned to the Omega Chapter in Quincy, Florida.\n\nBro. Williams was a dedicated servant of Alpha, having served as Sigma Lambda Chapter President and Louisiana District Director. Initiated into our Dear Fraternity through the Beta Phi Chapter in the Fall of 1986, he exemplified the aims of Alpha through his leadership and service to all. Most recently, Bro. Williams led the U Matter Health Awareness Series on college campuses across the country.\n\nDuring this difficult time, I ask that you keep Bro. Williams'' family and our Brothers in your thoughts and prayers. We are grateful for his many contributions to our Fraternity and the lasting impact he made on our Chapter, the District, and all of Alpha Phi Alpha.\n\nAdditional information regarding arrangements will be shared as it becomes available.\n\nFraternally,\nBro. Rob Carter III, Chapter President',
    '/images/news/joshua-williams-omega.jpg',
    'cover',
    true,
    '2026-09-05 12:00:00+00'
  )
on conflict (slug) do nothing;
