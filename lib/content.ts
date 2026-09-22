export const chapter = {
  name: "Sigma Lambda Chapter",
  org: "Alpha Phi Alpha Fraternity, Inc.",
  city: "New Orleans, Louisiana",
  founded: 1925,
};

export type LegacyEntry = {
  year?: string;
  name: string;
  description: string;
  photo?: string;
};

export const legacyTimeline: LegacyEntry[] = [
  {
    year: "1925",
    name: "Alexander Pierre Tureaud Sr.",
    description:
      "Alexander Pierre Tureaud Sr. was an American civil rights attorney and NAACP leader who spearheaded legal challenges to segregation in Louisiana. A Howard Law graduate and associate of Thurgood Marshall, he won landmark cases ending Jim Crow in New Orleans schools, securing equal pay for Black teachers, integrating LSU, and defending early sit-in protests at the U.S. Supreme Court.",
    photo: "Alexander Pierre Tureaud Sr.jpg",
  },
  {
    year: "1946",
    name: 'Ernest "Dutch" Morial',
    description:
      "First Black mayor of New Orleans, and the first Black graduate of LSU Law School. Morial was elected the 23rd General President of Alpha Phi Alpha Fraternity, Inc.",
    photo: "morial.jpg",
  },
  {
    year: "1962",
    name: "Emmett Bashful",
    description:
      "Educator and administrator who helped shape higher education access across the city. First chancellor of Southern University of New Orleans.",
    photo: "bashful.jpg",
  },
  {
    year: "1974",
    name: "Charles Teamer, Sr.",
    description:
      "Chancellor and civic leader whose work strengthened Black colleges in New Orleans. Teamer was elected the 27th General President of Alpha Phi Alpha Fraternity, Inc.",
    photo: "teamer.jpg",
  },
  {
    name: "Dr. Norman C. Francis",
    description: "Longest Serving President of Xavier University of Louisiana.",
    photo: "Norman-Francis.jpeg",
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
  name: string;
  description: string;
  category: "national" | "chapter";
  href?: string;
};

export const programsIntro =
  "The fraternity's national programs are community outreach mentoring initiatives that have been adopted by the organization's governing body and mandated for implementation by all of its chapters.";

export const programs: Program[] = [
  {
    name: "Brother's Keeper",
    description:
      "Formally the A. Charles Haston Brother's Keeper program, developed to advocate for and improve quality of life for Alpha Phi Alpha brothers, their spouses, and widows who are retired, elderly, disabled, or ailing.",
    category: "national",
  },
  {
    name: "A Voteless People Is a Hopeless People",
    description:
      "Initiated as a national program in the 1930s, when many African Americans had the legal right to vote but were blocked by poll taxes, threats, and lack of education about the voting process. Voter education and registration have remained a focus for over 65 years, expanding in the 1990s to include political awareness delivered through town halls and candidate forums.",
    category: "national",
  },
  {
    name: "Go-to-High-School, Go-to-College",
    description:
      "Established in 1922, this program concentrates on completing secondary and collegiate education as a path to advancement.",
    category: "national",
  },
  {
    name: "Project Alpha",
    description:
      "A collaborative program providing education, motivation, and skill-building on responsibility, relationships, and teen pregnancy prevention for young men ages 12-15, delivered through workshops led by chapter brothers.",
    category: "national",
  },
  {
    name: "Alpha Youth Leadership Academy",
    description:
      "Works to give young men in Greater New Orleans a brighter, more positive outlook on life, guided by the brothers of Sigma Lambda. Currently partners with Warren Easton Charter School to mentor a core group of high school young men. Brothers mentor one Thursday each month and host weekend enrichment activities year-round. Participants qualify for priority consideration for Alpha Phi Alpha Scholarship Foundation awards.",
    category: "chapter",
  },
  {
    name: "Scholarship Foundation",
    description:
      "A 501(c)(3) organization that raises and distributes scholarship funds, primarily to young men furthering their education. Each year, the foundation and chapter host a scholarship gala during Founders' Week as the marquee fundraising event.",
    category: "chapter",
    href: "/programs/scholarship-foundation",
  },
  {
    name: "Social Justice",
    description:
      "Focuses on race and equality, voter rights, and mass incarceration. Brothers have led voter mobilization efforts and public forums on advocacy and civic action in New Orleans.",
    category: "chapter",
  },
  {
    name: "Alpha Plaza Foundation",
    description: "A Sigma Lambda Chapter initiative. More details forthcoming.",
    category: "chapter",
    href: "/programs/alpha-plaza-foundation",
  },
];

export type EventItem = {
  slug: string;
  day?: string;
  month?: string;
  /** For events with no single date — shown in the calendar tile instead of day/month, e.g. "3RD WED". */
  recurring?: string;
  title: string;
  location: string;
  time: string;
  action: string;
};

export const events: EventItem[] = [
  {
    slug: "centennial-scholarship-gala",
    day: "05",
    month: "DEC",
    title: "Centennial Scholarship Gala",
    location: "Xavier University of Louisiana Convocation Center, New Orleans, Louisiana",
    time: "7:00 PM – 11:00 PM",
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
    recurring: "3RD WED",
    title: "Monthly Chapter Meetings",
    location: "Members only",
    time: "7:30 PM",
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

export type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Our History" },
      { href: "/about/seven-jewels", label: "Seven Jewels" },
      { href: "/about/chapter-history", label: "Chapter History" },
      { href: "/about/notable-brothers", label: "Notable Brothers" },
      { href: "/about/college-chapters", label: "College Chapters" },
    ],
  },
  {
    href: "/leadership",
    label: "Leadership",
    children: [
      { href: "/leadership", label: "Leadership" },
      { href: "/leadership/past-presidents", label: "Past Presidents" },
    ],
  },
  { href: "/programs", label: "Programs" },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "Events" },
      { href: "/events/scholarship-gala", label: "Scholarship Gala" },
      { href: "/events/gallery", label: "Gallery" },
      { href: "/events/rsvp", label: "RSVP" },
    ],
  },
  { href: "/news", label: "News" },
];
