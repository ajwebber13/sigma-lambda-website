-- Appreciation post for Bro. Robert Carter III, Sigma Lambda's 50th Chapter
-- President. Source photo is a designed flyer graphic (portrait + logo/text
-- overlay, including his name and title baked into the bottom of the frame),
-- so photo_fit is 'contain' to keep the full graphic visible rather than
-- cropping it to a 4:5 frame.
insert into public.news_highlights
  (slug, brother_name, label, title, preview, body, photo_url, photo_fit, published, published_at)
values
  (
    'honoring-robert-carter-iii-50th-chapter-president',
    'Bro. Robert Carter III',
    'APPRECIATION',
    'Honoring Our 50th Chapter President, Bro. Robert Carter III',
    'The Brothers of Sigma Lambda extend our sincere appreciation and gratitude to our 50th Chapter President, Bro. Robert Carter III, for his dedicated leadership and service to the chapter.',
    E'The Brothers of Sigma Lambda extend our sincere appreciation and gratitude to our 50th Chapter President, Bro. Robert Carter III, for his dedicated leadership and service to the chapter.\n\nThroughout his tenure, Bro. Carter led Sigma Lambda with vision, excellence, and a steadfast commitment to the aims of Alpha. His leadership reflected a genuine dedication to strengthening the bonds of Brotherhood, advancing the work of the chapter, and serving our community.\n\nUnder his leadership, Sigma Lambda continued to build upon its legacy while looking toward the future. His commitment to the Brotherhood helped foster unity among the Brothers, while his emphasis on service reinforced the chapter''s responsibility to make a meaningful impact in the communities we serve.\n\nLeadership is measured not only by accomplishments, but also by the foundation left for those who follow. Bro. Carter''s tenure as the 50th Chapter President represents another important chapter in Sigma Lambda''s history and adds to the legacy of Brothers who have committed themselves to the continued growth and success of the chapter.\n\nWe thank Bro. Robert Carter III for his time, dedication, sacrifice, and service as the 50th Chapter President of Sigma Lambda.\n\nThank you, Bro. Carter, for your leadership and for helping move Sigma Lambda forward.\n\nBrotherhood. Scholarship. Service.',
    '/images/news/thank-you-brocarter.jpg',
    'contain',
    true,
    '2026-09-22 12:00:00+00'
  )
on conflict (slug) do nothing;
