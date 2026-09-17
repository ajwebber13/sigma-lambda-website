import Image from "next/image";
import Link from "next/link";
import { chapter } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-ink pt-16 pb-8 text-text-ondark/70">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-wrap justify-between gap-10 border-b border-line pb-12">
          <Link href="/" className="flex items-center gap-3 font-serif text-text-ondark">
            <span className="relative h-9.5 w-9.5 flex-shrink-0">
              <Image src="/images/sigma-lambda-logo.png" alt="" fill sizes="38px" className="object-contain" />
            </span>
            <span className="leading-tight">
              <b className="block text-base font-semibold">SIGMA LAMBDA CHAPTER</b>
              <span className="mt-0.5 block font-sans text-[11px] tracking-[0.08em] text-gold-bright">
                ALPHA PHI ALPHA FRATERNITY, INC.
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap gap-14">
            <div>
              <h2 className="mb-4 font-sans text-[12.5px] font-bold tracking-[0.06em] text-gold-bright">
                CHAPTER
              </h2>
              <Link href="/about" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                History
              </Link>
              <Link href="/leadership" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                Leadership
              </Link>
              <Link href="/programs" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                Programs
              </Link>
            </div>
            <div>
              <h2 className="mb-4 font-sans text-[12.5px] font-bold tracking-[0.06em] text-gold-bright">
                GET INVOLVED
              </h2>
              <Link href="/events" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                Events
              </Link>
              <Link href="/portal" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                Member portal
              </Link>
              <Link href="/news" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                News
              </Link>
            </div>
            <div>
              <h2 className="mb-4 font-sans text-[12.5px] font-bold tracking-[0.06em] text-gold-bright">
                CONNECT
              </h2>
              <a href="mailto:info@sigmalambda.org" className="mb-2.5 block text-sm opacity-75 hover:opacity-100">
                Contact the chapter
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 pt-6.5 text-[12.5px] opacity-55">
          <span>
            {chapter.city} · {chapter.name}, since {chapter.founded}
          </span>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/NolaAlphas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-gold"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v6h3v-6h2.7l.5-3h-3.2v-2c0-.6.4-1 1-1z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/neworleansalphas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-gold"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
