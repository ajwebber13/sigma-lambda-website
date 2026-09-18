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
