export type CharterMember = {
  name: string;
  slug: string;
  bio: string;
};

export const charterMembers: CharterMember[] = [
  {
    name: "Bro. Lucien Alexis",
    slug: "lucien-alexis",
    bio: "Harvard University graduate; principal of McDonogh 35 Senior High School, the first high school for African American students in Greater New Orleans; also owned a business school.",
  },
  {
    name: "Bro. Osceola Blanchet",
    slug: "osceola-blanchet",
    bio: "Talladega College graduate, master's from Xavier University; taught at McDonogh 35 for more than 40 years; an accomplished musician who produced operettas at the school and served as Minister of Music at Central United Church of Christ.",
  },
  {
    name: "Bro. Edward M. Coleman",
    slug: "edward-m-coleman",
    bio: "Talladega College graduate, master's from Iowa State University; Professor of History at Straight College (merged into Dillard University in the 1930s).",
  },
  {
    name: "Bro. C.C. Haydel",
    slug: "cc-haydel",
    // Spelling verified as "Haydel" here per the chapter's president list, but
    // this name appears as "Haydell" elsewhere on the source site — flag for
    // chapter confirmation before publish.
    bio: "Howard University Medical School graduate; maintained an extensive medical practice and served as President of Standard Life Insurance Company.",
  },
  {
    name: "Bro. William H. Mitchell",
    slug: "william-h-mitchell",
    bio: "Springfield College graduate, Executive Director of the Dryades Street YMCA; master's from Columbia University; served as Honorary Consul General, later Consul General, of the Republic of Liberia.",
  },
  {
    name: "Bro. Rudolph Moses",
    slug: "rudolph-moses",
    bio: "University of Iowa graduate, master's from Columbia University; served on the faculty of Dillard University and its predecessor institutions.",
  },
  {
    name: "Bro. Jesse O. Richards",
    slug: "jesse-o-richards",
    bio: "Atlanta University graduate; principal of several New Orleans schools, including J.S. Clark.",
  },
  {
    name: "Bro. Robert E. Jones",
    slug: "robert-e-jones",
    bio: "Bennett College graduate (B.A.), B.D. from Gammon Theological Seminary; Bishop of the African Methodist Episcopal Church.",
  },
];
