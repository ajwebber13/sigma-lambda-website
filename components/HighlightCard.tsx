import Image from "next/image";
import Link from "next/link";
import { highlightPhotoAlt, highlightPhotoFit, type NewsHighlight } from "@/lib/newsHighlights";

export default function HighlightCard({ highlight }: { highlight: NewsHighlight }) {
  const fit = highlightPhotoFit(highlight);

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-ink p-5.5 text-text-ondark transition duration-200 hover:-translate-y-0.5 hover:border-gold has-[:focus-visible]:-translate-y-0.5 has-[:focus-visible]:border-gold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-gold-bright">
      <div className={`relative aspect-[4/5] w-full overflow-hidden rounded ${fit.frame}`}>
        <Image
          src={highlight.photo_url}
          alt={highlightPhotoAlt(highlight)}
          fill
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 100vw"
          className={fit.image}
        />
      </div>
      <div className="mt-4 text-[12px] font-semibold tracking-[0.06em] text-gold-bright uppercase">
        {highlight.label}
      </div>
      <h3 className="mt-1 font-serif text-lg font-semibold">{highlight.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-ondark/65">{highlight.preview}</p>
      <Link
        href={`/news/${highlight.slug}`}
        className="mt-auto inline-block pt-3.5 text-[13px] font-bold tracking-[0.03em] text-gold-bright uppercase outline-hidden after:absolute after:inset-0 after:content-['']"
      >
        Click here to view more <span aria-hidden="true">→</span>
        <span className="sr-only">: {highlight.title}</span>
      </Link>
    </article>
  );
}
