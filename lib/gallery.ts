export type GalleryImage = {
  src: string;
  alt: string;
};

export type GallerySection = {
  title: string;
  slug: string;
  images: GalleryImage[];
};

const galaCentennialPhotoNumbers = [
  17, 18, 23, 28, 29, 30, 31, 34, 44, 58, 60, 61, 63, 65, 68, 69, 70, 78, 86, 87, 94, 95, 101, 105, 124,
];

const waterOutingFiles = [
  "778869699_10165675587128033_7204837146899449075_n.jpg",
  "784226548_10165675585623033_2668464268807098677_n.jpg",
  "785146450_10165675586758033_232157628505738741_n.jpg",
  "790025153_10165675586538033_3659186034502305893_n.jpg",
  "790267960_10165675585313033_7734821420503153669_n.jpg",
];

const centennialLuncheonFiles = [
  "593922352_10173312366245241_2644526345388101691_n.jpg",
  "594909163_10173312442155241_3354500654936528808_n.jpg",
  "594971923_10173312347635241_6773383701126583369_n.jpg",
  "595266378_10173312376045241_4925666953073187378_n.jpg",
  "595374876_10173312582100241_2916247236973590005_n.jpg",
  "595574527_10173312570880241_1212418123968371120_n.jpg",
  "595810515_10173312559410241_7788055305631881387_n.jpg",
  "595815388_10173312557210241_3261441152154466734_n.jpg",
  "595973925_10173312553380241_7063176841626794309_n.jpg",
  "596212812_10173312386910241_2329771634097871246_n.jpg",
  "596214945_10173312559455241_8568426019799998603_n.jpg",
  "596298367_10173312435165241_1821872957842873231_n.jpg",
  "596298858_10173312528695241_121936349368601713_n.jpg",
  "596315530_10173312501035241_8951903640611859908_n.jpg",
  "596372534_10173312641175241_8948694364577959089_n.jpg",
  "596413745_10173312590995241_6329913598724511286_n.jpg",
  "596417313_10173312574615241_3387323203633258900_n.jpg",
  "596425861_10173312595250241_7363797675848251093_n.jpg",
  "596454993_10173312584095241_8154176341562669621_n.jpg",
  "596498682_10173312561150241_6495424389438276729_n.jpg",
  "596517329_10173312593140241_7000097980937911611_n.jpg",
  "596530220_10173312347000241_5083673814540446304_n.jpg",
  "596587691_10173312416405241_6355320433958101267_n.jpg",
  "596623735_10173312418530241_5658540253267057745_n.jpg",
  "596689263_10173312567545241_6174858588170178797_n.jpg",
  "596802732_10173312534825241_6424711439451629930_n.jpg",
  "596943238_10173312465675241_5949828522486502849_n.jpg",
  "596966946_10173312411035241_3268976541417726151_n.jpg",
  "597230437_10173312380050241_4005706761879499959_n.jpg",
  "597246092_10173312578805241_3420330261271105555_n.jpg",
  "597265704_10173312520830241_3140379486441804911_n.jpg",
  "597578764_10173312346910241_4085988936770093421_n.jpg",
  "597587172_10173312568255241_3401925739639782426_n.jpg",
  "597631584_10173312588625241_3366978694951246875_n.jpg",
  "597647051_10173312525355241_125094201970555155_n.jpg",
];

const mlkParade26Files = [
  "616010256_10163147833446939_1956977085432801201_n.jpg",
  "616421456_10163147833586939_3337655500881440483_n.jpg",
  "616530663_10163147832601939_4687862686597435085_n.jpg",
  "618749102_10163147832591939_2721296498496756515_n.jpg",
  "619256309_10163147832786939_5243448022063723273_n.jpg",
];

const softballTourney26Files = ["3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "original.jpeg"];

// Add a folder per event under public/images/gallery/<event-slug>/ and list
// the files here — each section renders as its own clickable slideshow.
export const gallerySections: GallerySection[] = [
  {
    title: "2026 Fraternity Softball Tournament — Championship Win",
    slug: "softball-tourney26",
    images: softballTourney26Files.map((file) => ({
      src: `/images/gallery/softball-tourney26/${file}`,
      alt: "2026 Fraternity Softball Tournament — Championship Win",
    })),
  },
  {
    title: "3rd Annual Brotherhood Water Outing",
    slug: "water-outing-2026",
    images: waterOutingFiles.map((file) => ({
      src: `/images/2026-water-outing/${file}`,
      alt: "3rd Annual Brotherhood Water Outing",
    })),
  },
  {
    title: "MLK Parade 2026",
    slug: "mlk-parade-2026",
    images: mlkParade26Files.map((file) => ({
      src: `/images/gallery/mlk-parade26/${file}`,
      alt: "MLK Parade 2026",
    })),
  },
  {
    title: "Centennial Luncheon at Dooky Chase Restaurant",
    slug: "centennial-luncheon",
    images: centennialLuncheonFiles.map((file) => ({
      src: `/images/gallery/centennial-luncheon/${file}`,
      alt: "Centennial Luncheon at Dooky Chase Restaurant",
    })),
  },
  {
    title: "Sigma Lambda Gala 2025 — Centennial Celebration",
    slug: "gala-2025-centennial",
    images: galaCentennialPhotoNumbers.map((n) => ({
      src: `/images/gallery/gala-2025-centennial/SigmaLambdaGala2025-${n}.jpg`,
      alt: "Sigma Lambda Gala 2025 — Centennial Celebration",
    })),
  },
];

const scholarshipFoundationPhotoNumbers = [184, 188, 192, 198, 204, 220, 257];

// One entry per chapter program with photos — slug must match the program's
// slugified name (see ProgramsGrid) and the folder under public/images/<slug>/.
export const programGalleries: GallerySection[] = [
  {
    title: "Alpha Youth Leadership Academy",
    slug: "alpha-youth-leadership-academy",
    images: Array.from({ length: 7 }, (_, i) => i + 1).map((n) => ({
      src: `/images/alpha-youth-leadership-academy/${n}.jpg`,
      alt: "Alpha Youth Leadership Academy",
    })),
  },
  {
    title: "Scholarship Foundation",
    slug: "scholarship-foundation",
    images: scholarshipFoundationPhotoNumbers.map((n) => ({
      src: `/images/scholarship-foundation/SigmaLambdaGala2025-${n}.jpg`,
      alt: "Scholarship Foundation",
    })),
  },
  {
    title: "Social Justice",
    slug: "social-justice",
    images: Array.from({ length: 12 }, (_, i) => i + 1).map((n) => ({
      src: `/images/social-justice/${n}.jpg`,
      alt: "Social Justice",
    })),
  },
];
