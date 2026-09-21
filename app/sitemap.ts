import type { MetadataRoute } from "next";
import { getPublishedHighlights } from "@/lib/newsHighlights";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/about/seven-jewels",
    "/about/chapter-history",
    "/about/notable-brothers",
    "/about/college-chapters",
    "/leadership",
    "/leadership/past-presidents",
    "/programs",
    "/events",
    "/news",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/events" || route === "/news" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  // If Supabase is unreachable, still serve the static routes rather than a 500.
  try {
    const highlights = await getPublishedHighlights();
    return [
      ...staticEntries,
      ...highlights.map((highlight) => ({
        url: `${siteUrl}/news/${highlight.slug}`,
        lastModified: new Date(highlight.published_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch (err) {
    console.error("Sitemap: could not load news highlights, serving static routes only.", err);
    return staticEntries;
  }
}
