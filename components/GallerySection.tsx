"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GallerySection as GallerySectionType } from "@/lib/gallery";

export default function GallerySection({
  section,
  variant = "grid",
}: {
  section: GallerySectionType;
  variant?: "grid" | "thumbnail";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % section.images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + section.images.length) % section.images.length));
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, section.images.length]);

  return (
    <div id={section.slug} className="scroll-mt-28">
      {variant === "grid" && (
        <h3 className="mb-5 font-serif text-xl font-semibold">{section.title}</h3>
      )}

      {variant === "thumbnail" ? (
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg transition-opacity hover:opacity-90"
          aria-label={`View photos — ${section.title}`}
        >
          <Image
            src={section.images[0].src}
            alt={section.images[0].alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute inset-x-0 bottom-0 p-3 text-[13px] font-semibold leading-tight text-text-ondark">
            {section.title}
          </span>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {section.images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative aspect-square overflow-hidden rounded bg-paper transition-opacity hover:opacity-85"
              aria-label={`Open photo ${i + 1} of ${section.images.length} — ${section.title}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {open && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${section.title} slideshow`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 px-5 py-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close slideshow"
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg text-text-ondark hover:border-gold-bright"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((openIndex - 1 + section.images.length) % section.images.length);
            }}
            aria-label="Previous photo"
            className="absolute left-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line text-xl text-text-ondark hover:border-gold-bright sm:left-6"
          >
            ‹
          </button>

          <div
            className="relative h-[70vh] w-full max-w-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={section.images[openIndex].src}
              alt={section.images[openIndex].alt}
              fill
              sizes="900px"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((openIndex + 1) % section.images.length);
            }}
            aria-label="Next photo"
            className="absolute right-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line text-xl text-text-ondark hover:border-gold-bright sm:right-6"
          >
            ›
          </button>

          <div className="absolute bottom-6 text-[13px] text-text-ondark/60">
            {openIndex + 1} / {section.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
