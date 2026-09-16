export const chapter = {
  name: "Sigma Lambda Chapter",
  org: "Alpha Phi Alpha Fraternity, Inc.",
  city: "New Orleans, Louisiana",
  founded: 1925,
};

export type LegacyEntry = {
  year: string;
  initials: string;
  name: string;
  description: string;
};

export const legacyTimeline: LegacyEntry[] = [
  {
    year: "1925",
    initials: "AT",
    name: "A.P. Tureaud",
    description:
      "Civil rights attorney who argued for equal education in Louisiana courts for over three decades.",
  },
  {
    year: "1946",
    initials: "DM",
    name: 'Ernest "Dutch" Morial',
    description: "First Black mayor of New Orleans, and the first Black graduate of LSU Law School.",
  },
  {
    year: "1962",
    initials: "EB",
    name: "Emmett Bashful",
    description: "Educator and administrator who helped shape higher education access across the city.",
  },
  {
    year: "1974",
    initials: "CT",
    name: "Charles Teamer, Sr.",
    description: "Chancellor and civic leader whose work strengthened Black colleges in New Orleans.",
  },
];

export type Officer = {
  title: string;
  name: string;
  initials: string;
  photo: string;
  footnote?: boolean;
};

export const officers: Officer[] = [
  { title: "President", name: "Bro. Dr. Brian L. Turner", initials: "BT", photo: "brian-turner.jpg" },
  {
    title: "Vice President",
    name: "Brother Dr. Patrick C. Thompson",
    initials: "PT",
    photo: "patrick-thompson.jpg",
  },
  { title: "Treasurer", name: "Brother Gilbert Jones", initials: "GJ", photo: "gilbert-jones.jpg" },
  {
    title: "Parliamentarian",
    name: "Brother Wayne Woods, Esq.",
    initials: "WW",
    photo: "wayne-woods.jpg",
  },
  {
    title: "Historian",
    name: "Brother Malik Bartholomew",
    initials: "MB",
    photo: "malik-bartholomew.jpg",
  },
  {
    title: "Corresponding Secretary",
    name: "Brother Jared Jupiter",
    initials: "JJ",
    photo: "jared-jupiter.jpg",
  },
  { title: "Chaplain", name: "Brother Kendrik Miller", initials: "KM", photo: "kendrik-miller.jpg" },
  {
    title: "Director of Education",
    name: "Brother Robert Mitchell, Jr.",
    initials: "RM",
    photo: "robert-mitchell.jpg",
  },
  {
    title: "Dean of Membership",
    name: "Brother Howard Rodgers, IV",
    initials: "HR",
    photo: "howard-rodgers.jpg",
  },
  {
    title: "Sergeant at Arms",
    name: "Brother Dexter Joseph",
    initials: "DJ",
    photo: "dexter-joseph.jpg",
    footnote: true,
  },
  { title: "Recording Secretary", name: "Brother Kael Saloy", initials: "KS", photo: "kael-saloy.jpg" },
  {
    title: "Associate Editor of the Sphinx",
    name: "Bro. Dr. Marc Barnes",
    initials: "MB",
    photo: "marc-barnes.jpg",
  },
  { title: "Member at Large", name: "Brother Ralph Johnson", initials: "RJ", photo: "ralph-johnson.jpg" },
  {
    title: "Member at Large",
    name: "Brother Robert Carter, III",
    initials: "RC",
    photo: "robert-carter.jpg",
  },
  {
    title: "Member at Large",
    name: "Brother Terrol Perkins",
    initials: "TP",
    photo: "terrol-perkins.jpg",
  },
];

export type Program = {
  number: string;
  name: string;
  description: string;
  category: "national" | "chapter";
};

export const programs: Program[] = [
  {
    number: "01",
    name: "Go-to-High-School, Go-to-College",
    description: "Academic mentoring that has guided students toward higher education for generations.",
    category: "national",
  },
  {
    number: "02",
    name: "A Voteless People Is a Hopeless People",
    description: "Voter registration and civic education rooted in the fraternity's founding mission.",
    category: "national",
  },
  {
    number: "03",
    name: "Project Alpha",
    description: "Health education and mentorship built for young men in the New Orleans community.",
    category: "national",
  },
  {
    number: "04",
    name: "7th Ward Community Service",
    description: "Chapter-organized service days supporting neighbors across New Orleans.",
    category: "chapter",
  },
  {
    number: "05",
    name: "Centennial Scholarship Fund",
    description: "Chapter-run scholarships awarded to local students pursuing higher education.",
    category: "chapter",
  },
];

export type EventItem = {
  slug: string;
  day: string;
  month: string;
  title: string;
  location: string;
  time: string;
  action: string;
};

export const events: EventItem[] = [
  {
    slug: "centennial-scholarship-gala",
    day: "18",
    month: "OCT",
    title: "Centennial Scholarship Gala",
    location: "Hyatt Regency New Orleans",
    time: "6:30 PM",
    action: "RSVP",
  },
  {
    slug: "founders-day-service",
    day: "02",
    month: "NOV",
    title: "Founders' Day Service",
    location: "Chapter house",
    time: "10:00 AM",
    action: "RSVP",
  },
  {
    slug: "monthly-chapter-meeting",
    day: "14",
    month: "NOV",
    title: "Monthly Chapter Meeting",
    location: "Members only",
    time: "7:00 PM",
    action: "Add to calendar",
  },
  {
    slug: "community-service-day",
    day: "21",
    month: "DEC",
    title: "Community Service Day",
    location: "7th Ward",
    time: "9:00 AM",
    action: "RSVP",
  },
];

export type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
};

export const news: NewsItem[] = [
  {
    date: "SEPT 2026",
    title: "Centennial Scholarship Gala tickets now open",
    excerpt: "Join the chapter in celebrating 100 years of service in New Orleans.",
  },
  {
    date: "AUG 2026",
    title: "Fall mentoring cohort begins next month",
    excerpt: "Go-to-High-School, Go-to-College kicks off its newest group of scholars.",
  },
  {
    date: "JUL 2026",
    title: "Chapter directory update now live",
    excerpt: "Members can now update their own contact info from the portal.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/leadership", label: "Leadership" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
];
