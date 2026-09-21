import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export type NewsHighlight = {
  id: string;
  slug: string;
  brother_name: string;
  title: string;
  preview: string;
  body: string;
  photo_url: string;
  label: string;
  photo_fit: "cover" | "contain";
  source_url: string | null;
  source_label: string | null;
  published: boolean;
  published_at: string;
  sort_order: number;
};

// Postgres 42P01 / PostgREST PGRST205: the table has not been migrated yet.
function isMissingTable(error: { code?: string }) {
  return error.code === "42P01" || error.code === "PGRST205";
}

// Real query errors are thrown, not turned into an empty result: these pages are
// cached (ISR), and a transient failure must not replace good cached content with
// an empty list or a 404. Next keeps serving the last good page when a
// revalidation throws.
export const getPublishedHighlights = cache(async (): Promise<NewsHighlight[]> => {
  const { data, error } = await createPublicClient()
    .from("news_highlights")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) {
    if (isMissingTable(error)) return [];
    throw new Error(`Failed to load news highlights: ${error.message}`);
  }
  return (data ?? []) as NewsHighlight[];
});

export const getHighlightBySlug = cache(async (slug: string): Promise<NewsHighlight | null> => {
  const { data, error } = await createPublicClient()
    .from("news_highlights")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    if (isMissingTable(error)) return null;
    throw new Error(`Failed to load news highlight: ${error.message}`);
  }
  return (data as NewsHighlight | null) ?? null;
});

export function formatHighlightDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}

// 'cover' crops to the frame from the top (portraits, faces never cut off);
// 'contain' shows the whole image on the card's dark background (graphics, flyers).
// Rows read before the photo_fit migration has run have no value and count as 'cover'.
export function highlightPhotoFit(highlight: Pick<NewsHighlight, "photo_fit">) {
  return highlight.photo_fit === "contain"
    ? { frame: "bg-ink", image: "object-contain" }
    : { frame: "bg-paper", image: "object-cover object-top" };
}

export function highlightPhotoAlt(highlight: Pick<NewsHighlight, "brother_name" | "title">) {
  return `${highlight.brother_name} — ${highlight.title}`;
}
