import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  formatHighlightDate,
  getHighlightBySlug,
  getPublishedHighlights,
  highlightPhotoAlt,
  highlightPhotoFit,
} from "@/lib/newsHighlights";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

// Pre-render the stories that exist at build time; stories published later are
// rendered on first request and then cached (dynamicParams defaults to true).
// A database hiccup at build time must not fail the build, so fall back to none.
export async function generateStaticParams() {
  try {
    const highlights = await getPublishedHighlights();
    return highlights.map(({ slug }) => ({ slug }));
  } catch (err) {
    console.error("generateStaticParams(news): skipping pre-render.", err);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const highlight = await getHighlightBySlug(slug);
  if (!highlight) return {};

  return buildMetadata({
    title: highlight.title,
    description: highlight.preview,
    path: `/news/${highlight.slug}`,
  });
}

const backLinkClass =
  "inline-block text-[13px] font-bold tracking-[0.03em] uppercase focus-visible:outline-gold-bright";

export default async function HighlightPage({ params }: Props) {
  const { slug } = await params;
  const highlight = await getHighlightBySlug(slug);
  if (!highlight) notFound();

  const fit = highlightPhotoFit(highlight);

  // Split on blank lines; tolerate CRLF and whitespace-only "blank" lines.
  const paragraphs = highlight.body.split(/\r?\n(?:[ \t]*\r?\n)+/).filter((p) => p.trim());

  return (
    <>
      <section className="bg-ink pt-[150px] pb-16 text-text-ondark">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Link href="/news" className={`${backLinkClass} mb-8 text-gold-bright`}>
            ← Back to News
          </Link>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            <div>
              <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.06em] text-gold-bright uppercase">
                {highlight.label}
              </span>
              <h1 className="max-w-[820px] text-[36px] leading-[1.08] font-semibold sm:text-[52px]">
                {highlight.title}
              </h1>
              <p className="mt-6 text-lg text-text-ondark/78">
                {highlight.brother_name}
                <span aria-hidden="true"> · </span>
                <time dateTime={highlight.published_at} className="block sm:inline">
                  {formatHighlightDate(highlight.published_at)}
                </time>
              </p>
            </div>
            <div
              className={`relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-lg border border-line ${fit.frame}`}
            >
              <Image
                src={highlight.photo_url}
                alt={highlightPhotoAlt(highlight)}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 100vw"
                className={fit.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 lg:py-27">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="max-w-[68ch] space-y-5 text-[17px] leading-relaxed text-text-onlight/85">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <Link href="/news" className={`${backLinkClass} mt-12 text-gold-text focus-visible:outline-gold-deep`}>
            ← Back to News
          </Link>
        </div>
      </section>
    </>
  );
}
