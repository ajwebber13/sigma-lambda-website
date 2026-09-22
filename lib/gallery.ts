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

const foundersWeekBrotherhoodSmokeFiles = [
  "594167406_10173311485720241_3960286017350079521_n.jpg",
  "594857197_10173311507515241_9097823055522150255_n.jpg",
  "594970536_10173311333620241_8506588691351400582_n.jpg",
  "594975082_10173311394985241_3294104696882252098_n.jpg",
  "594983221_10173311375890241_6588171690457427358_n.jpg",
  "594992763_10173311516930241_1676801715432786428_n.jpg",
  "595029742_10173311494350241_7596562165480686034_n.jpg",
  "595117172_10173311338065241_5099083315646887424_n.jpg",
  "595179069_10173311455510241_7107862783237265549_n.jpg",
  "595301520_10173311457935241_6814084842034603691_n.jpg",
  "595499485_10173311355280241_5128776368655436520_n.jpg",
  "595510495_10173311489035241_4392867820076292798_n.jpg",
  "595529502_10173311475180241_7679648363908218170_n.jpg",
  "595535713_10173311511965241_26375094315118393_n.jpg",
  "595543950_10173311271810241_4082384140550182278_n.jpg",
  "595612936_10173311538675241_5173976031369847237_n.jpg",
  "595773202_10173311494205241_5028050941189449878_n.jpg",
  "595853859_10173311289900241_7715661820293315439_n.jpg",
  "595924925_10173311461335241_1995759162476219926_n.jpg",
  "595928726_10173311404570241_4879004363290199656_n.jpg",
  "595945757_10173311477855241_8803833150818760712_n.jpg",
  "595966944_10173311328335241_5835798312225302812_n.jpg",
  "596006147_10173311359970241_245975601984279492_n.jpg",
  "596186528_10173311524305241_2247745139808153205_n.jpg",
  "596308493_10173311378270241_5785106660692640271_n.jpg",
  "596337579_10173311509550241_5876057761495202629_n.jpg",
  "596418493_10173311266450241_2585953423804952023_n.jpg",
  "596503892_10173311433965241_5151282630737761639_n.jpg",
  "596519407_10173311388255241_8118876002229876006_n.jpg",
  "596567487_10173311464515241_4897238787106727345_n.jpg",
  "596801658_10173311531605241_5887801129104627587_n.jpg",
  "596813216_10173311519890241_9129726125237034523_n.jpg",
  "596825975_10173311392540241_7828528291557422436_n.jpg",
  "596828374_10173311359795241_2864414152323825732_n.jpg",
  "596847567_10173311499015241_5691615744359961447_n.jpg",
  "597036058_10173311521990241_5898843842974025530_n.jpg",
  "597100571_10173311383610241_4501151887519293571_n.jpg",
  "597141065_10173311480245241_592339853575225587_n.jpg",
  "597187581_10173311503390241_104101925451648497_n.jpg",
  "597443118_10173311380180241_7863654376117835028_n.jpg",
];

// Add a folder per event under public/images/gallery/<event-slug>/ and list
// the files here — each section renders as its own clickable slideshow.
export const gallerySections: GallerySection[] = [
  {
    title: "Founders' Week Brotherhood Smoke at Monday's Restaurant",
    slug: "founders-week25-brotherhood-smoke",
    images: foundersWeekBrotherhoodSmokeFiles.map((file) => ({
      src: `/images/gallery/founders-week25-brotherhoodsmoke/${file}`,
      alt: "Founders' Week Brotherhood Smoke at Monday's Restaurant",
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
