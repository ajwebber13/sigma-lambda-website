-- 100 Years of Alpha in New Orleans: Sigma Lambda's Centennial Charter Day
-- tribute. Source photo is a designed flyer graphic (Crescent City Connection
-- bridge lit gold, with text overlay), so photo_fit is 'contain' to keep the
-- full graphic visible rather than cropping it to a 4:5 frame.
insert into public.news_highlights
  (slug, brother_name, label, title, preview, body, photo_url, photo_fit, photo_width, photo_height, published, published_at)
values
  (
    '100-years-of-alpha-in-new-orleans',
    'Sigma Lambda Chapter',
    'CENTENNIAL',
    '100 Years of Alpha in New Orleans',
    'Sigma Lambda Celebrates a Century of Brotherhood, Service, and Excellence. On Centennial Charter Day, the chapter honors a legacy that began in 1925 and continues to shape generations of men and communities throughout New Orleans and beyond.',
    E'A century ago, a vision for brotherhood, scholarship, leadership, and service took root in the Crescent City. Today, the brothers of the Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. proudly celebrate 100 years of Alpha in New Orleans.\n\nOn this Centennial Charter Day, Sigma Lambda honors a remarkable legacy that began in 1925 and continues to shape generations of men and communities throughout New Orleans and beyond.\n\nFor 100 years, Sigma Lambda has stood as a beacon of brotherhood, service, leadership, and Alpha excellence. Through changing times and generations, the chapter has remained committed to the principles upon which Alpha Phi Alpha was founded—developing leaders, advancing education, serving humanity, and uplifting the communities in which its brothers live and serve.\n\nA century is more than a milestone. It is a testament to the countless brothers who answered the call of Alpha and devoted their time, talents, and lives to something greater than themselves. Each generation of Sigma Lambda brothers has inherited a legacy built by those who came before them, while accepting the responsibility to strengthen that legacy for those who will follow.\n\nFrom the historic streets of New Orleans to classrooms, churches, businesses, civic institutions, and communities throughout the region, the light of Sigma Lambda has continued to shine.\n\nHolding High the Light\n\nThe Centennial celebration is not simply a look backward—it is also a declaration about the future.\n\nSigma Lambda''s history provides a foundation for the next 100 years of service. The chapter''s commitment remains centered on uplifting the community, supporting young people, promoting achievement, and embodying the ideals of Alpha Phi Alpha.\n\nAs Sigma Lambda marks this extraordinary occasion, the chapter also recognizes the importance of New Orleans itself. The Crescent City has provided the backdrop for a century of Alpha history, and the relationship between the chapter and the city remains deeply connected.\n\nIn recognition of this historic moment, the Crescent City Connection will shine with Sigma Lambda, illuminating the New Orleans skyline as a symbol of 100 years of Alpha in the Crescent City.\n\nThe lights serve as more than a celebration. They represent the enduring presence of Alpha Phi Alpha in New Orleans and the generations of brothers who have carried the torch of service forward.\n\nA Century Behind Us. Centuries Ahead.\n\nOne hundred years represents an extraordinary accomplishment, but for Sigma Lambda, it is also a beginning.\n\nThe brothers of today stand on the shoulders of those who established, built, strengthened, and sustained the chapter across generations. Their charge is to continue that work—to honor the past, serve the present, and prepare the way for the brothers and communities of tomorrow.\n\nAs Sigma Lambda celebrates its Centennial Charter Day, the chapter proudly reflects on its journey while looking toward the future with faith, purpose, and determination.\n\n100 years of brotherhood.\n100 years of service.\n100 years of Alpha excellence in New Orleans.\nThe legacy continues.\n\nHere''s to 100 years—and to the centuries still to come.\nHold the light high.',
    '/images/news/centennial-tribute/595996779_1245299880966472_256253147505208446_n.jpg',
    'contain',
    1080,
    1350,
    true,
    '2025-12-05 12:00:00+00'
  )
on conflict (slug) do nothing;
