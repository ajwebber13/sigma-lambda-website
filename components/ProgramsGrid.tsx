"use client";

import { useState } from "react";
import type { Program } from "@/lib/content";
import GallerySection from "@/components/GallerySection";
import { programGalleries } from "@/lib/gallery";

function slugifyProgramName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProgramsGrid({ programs }: { programs: Program[] }) {
  const [category, setCategory] = useState<Program["category"]>("national");
  const filtered = programs.filter((p) => p.category === category);
  const isNational = category === "national";
  const cols = Math.min(filtered.length, 3);
  const gridColsClass = isNational
    ? "lg:grid-cols-2"
    : cols === 1
      ? "lg:grid-cols-1"
      : cols === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Program category">
        {(["national", "chapter"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-4.5 py-2.5 text-[13.5px] font-semibold transition-colors ${
              category === cat
                ? "border-gold bg-gold/8 text-gold-bright"
                : "border-text-ondark/22 text-text-ondark/75 hover:border-gold hover:text-gold-bright"
            }`}
          >
            {cat === "national" ? "National Programs" : "Chapter Programs"}
          </button>
        ))}
      </div>
      <div
        className={`grid grid-cols-1 gap-px bg-text-ondark/12 ${cols >= 2 || isNational ? "sm:grid-cols-2" : ""} ${gridColsClass}`}
      >
        {filtered.map((program) => {
          const gallery = programGalleries.find((g) => g.slug === slugifyProgramName(program.name));
          return (
            <div
              key={program.name}
              className={`bg-ink transition-colors hover:bg-[#1c1610] ${
                isNational ? "px-8 py-10" : "px-6.5 py-7.5"
              }`}
            >
              {gallery && (
                <div className="mb-5">
                  <GallerySection section={gallery} variant="thumbnail" />
                </div>
              )}
              <h2 className={isNational ? "text-2xl font-semibold" : "text-lg font-semibold"}>
                {program.name}
              </h2>
              <p
                className={`mt-2.5 leading-relaxed text-text-ondark/60 ${
                  isNational ? "text-base" : "text-sm"
                }`}
              >
                {program.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
