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
  // 'contain' photos with known dimensions get a box sized to their real aspect
  // ratio, so landscape flyers/group shots fill the frame instead of floating in
  // a tall portrait box. 'cover' photos (and 'contain' rows with no dimensions on
  // file) keep the fixed 4:5 box, since 'cover' always crops to fill it anyway.
  const hasPhotoAspect = highlight.photo_fit === "contain" && highlight.photo_width && highlight.photo_height;
  const photoBoxStyle = hasPhotoAspect
    ? { aspectRatio: `${highlight.photo_width} / ${highlight.photo_height}` }
    : undefined;
  // Only http(s) links are rendered as the source button.
  const sourceUrl = highlight.source_url && /^https?:\/\//i.test(highlight.source_url) ? highlight.source_url : null;

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
              className={`relative w-full max-w-[380px] overflow-hidden rounded-lg border border-line ${fit.frame} ${hasPhotoAspect ? "" : "aspect-[4/5]"}`}
              style={photoBoxStyle}
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
              // pre-line keeps single line breaks (e.g. a sign-off) inside a paragraph
              <p key={i} className="whitespace-pre-line">
                {paragraph.trim()}
              </p>
            ))}
          </div>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-sm bg-gold px-5 py-3 text-[13.5px] font-bold tracking-[0.02em] text-ink uppercase shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-px focus-visible:outline-gold-deep"
            >
              Read the full article{highlight.source_label ? ` at ${highlight.source_label}` : ""}{" "}
              <span aria-hidden="true">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <Link
            href="/news"
            className={`${backLinkClass} ${sourceUrl ? "mt-8 block" : "mt-12"} text-gold-text focus-visible:outline-gold-deep`}
          >
            ← Back to News
          </Link>
        </div>
      </section>
    </>
  );
}
