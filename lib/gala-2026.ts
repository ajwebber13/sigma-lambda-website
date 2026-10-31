export type SponsorTier = {
  name: string;
  price: string;
  seating: string;
  perks: string[];
  exclusive?: boolean;
};

export type GalaContent = {
  title: string;
  tagline: string;
  date: string;
  time: string;
  startISO: string;
  endISO: string;
  venue: string;
  city: string;
  about: string[];
  performers: string[];
  ticketUrl: string;
  sponsorTiers: SponsorTier[];
  contactEmail: string;
};

export const GALA: GalaContent = {
  title: "2026 Scholarship Gala",
  tagline: "Scholarship | Service | Brotherhood",
  date: "Saturday, December 5, 2026",
  time: "7:00 PM – 11:00 PM",
  startISO: "2026-12-05T19:00:00-06:00",
  endISO: "2026-12-05T23:00:00-06:00",
  venue: "Xavier University of Louisiana Convocation Center",
  city: "New Orleans, Louisiana",

  about: [
    "Save the date! The Brothers of Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. invite you to our 2026 Scholarship Gala.",
    "Proceeds support scholarships for deserving students in the Greater New Orleans area — opening doors of opportunity and advancing the mission of Alpha Phi Alpha: developing leaders, promoting service, and elevating our communities.",
    "This is our moment to make a major step forward in investing in the next generation. Join us for an unforgettable evening.",
  ],

  performers: ["DJ Jess", "Partners N Crime", "Bobbi Rae"],

  ticketUrl: "", // TODO: add ticket/table purchase link

  sponsorTiers: [
    {
      name: "Presenting Sponsor",
      price: "$25,000",
      exclusive: true,
      seating: "2 VIP tables · 20 guests",
      perks: [
        "Exclusive Presenting Sponsor designation",
        "Premier recognition in all event materials and promotions",
        "Premier logo placement on all signage, digital media, and event program",
        "Recognition from the podium during the Gala",
        "Two (2) VIP tables for 20 guests",
        "VIP Reception access for 20 guests",
        "Recognition in post-event thank you and media coverage",
      ],
    },
    {
      name: "Corporate Sponsor",
      price: "$10,000",
      seating: "1 VIP table · 10 guests",
      perks: [
        "Prominent recognition in event materials and promotions",
        "Prominent logo placement on signage, digital media, and event program",
        "One (1) VIP table for 10 guests",
        "VIP Reception access for 10 guests",
        "Recognition in post-event thank you and media coverage",
      ],
    },
    {
      name: "Gold Sponsor",
      price: "$5,000",
      seating: "1 table · 10 guests",
      perks: [
        "Recognition in event materials and promotions",
        "Logo placement on signage, digital media, and event program",
        "One (1) table for 10 guests",
        "VIP Reception access for 10 guests",
        "Recognition in post-event thank you",
      ],
    },
    {
      name: "Black Sponsor",
      price: "$1,750",
      seating: "1 table · 10 guests",
      perks: [
        "Recognition in event program and selected digital media",
        "One (1) table for 10 guests",
        "Two (2) VIP Reception tickets",
      ],
    },
  ],

  contactEmail: "apalscholarshipfoundation@gmail.com",
};

export type GalaBrothersContent = {
  notes: string[];
};

export const GALA_BROTHERS: GalaBrothersContent = {
  notes: [
    "Every brother receives one (1) complimentary ticket.",
    "Dress code for brothers: a white coat. Black, gold, or a combination of both as accents is fine — but the coat must be white.",
    "We're going big. Every brother is asked to recruit sponsors: community organizations, agencies, business owners, community stakeholders, and friends of the fraternity.",
    "Share the Save the Date and Sponsorship Package below with your network.",
  ],
};
