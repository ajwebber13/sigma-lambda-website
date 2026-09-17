export type CollegeChapter = {
  name: string;
  institution: string;
  blurb: string;
  logo: string;
  instagramHandle?: string;
};

export const collegeChapters: CollegeChapter[] = [
  {
    name: "Beta Tau Chapter",
    institution: "Xavier University of Louisiana",
    blurb: "62nd House of Alpha Phi Alpha Fraternity, Inc. Chartered March 28, 1936.",
    logo: "betataulogo.jpg",
    instagramHandle: "betataualphas1936",
  },
  {
    name: "Beta Phi Chapter",
    institution: "Dillard University",
    blurb:
      "64th House of Alpha Phi Alpha Fraternity, Inc. Chartered on the campus of Dillard University in New Orleans in 1938.",
    logo: "betaphilogo.jpg",
  },
  {
    name: "Epsilon Upsilon Chapter",
    institution: "Southern University at New Orleans",
    blurb: "Chartered Friday, May 22, 1964, on the campus of Southern University at New Orleans.",
    logo: "epsilonupsilonlogo.jpg",
    instagramHandle: "epsilonupsilon",
  },
  {
    name: "Theta Phi Chapter",
    institution: "LSU New Orleans",
    blurb:
      "Chartered 1973, on the campus then known as Louisiana State University in New Orleans (LSUNO). The school was renamed University of New Orleans in 1974, then reverted to LSU New Orleans in July 2026.",
    logo: "thetaphilogo.jpg",
  },
  {
    name: "Rho Epsilon Chapter",
    institution: "Loyola University New Orleans",
    blurb: "756th House of Alpha Phi Alpha Fraternity, Inc. Chartered Thursday, November 10, 1988.",
    logo: "rhoepsilonlogo.jpg",
    instagramHandle: "rhoepsilonalphas",
  },
  {
    name: "Rho Iota Chapter",
    institution: "Tulane University",
    blurb: "Chartered November 16, 1989, at Tulane University in New Orleans, LA.",
    logo: "rhoiotalogo.jpg",
    instagramHandle: "rhoiotaalphas",
  },
];
