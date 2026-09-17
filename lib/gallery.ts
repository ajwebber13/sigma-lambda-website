export type GalleryImage = {
  src: string;
  alt: string;
};

export type GallerySection = {
  title: string;
  images: GalleryImage[];
};

// No event photos have been supplied yet. Add a folder per event under
// public/images/gallery/<event-slug>/ and list the files here — each
// section renders as its own clickable slideshow.
export const gallerySections: GallerySection[] = [];
