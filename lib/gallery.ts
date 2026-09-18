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

// Add a folder per event under public/images/gallery/<event-slug>/ and list
// the files here — each section renders as its own clickable slideshow.
export const gallerySections: GallerySection[] = [
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
