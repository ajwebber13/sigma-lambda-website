const handle = "neworleansalphas";

export default function InstagramFeed() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <a
            key={i}
            href={`https://www.instagram.com/${handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View @${handle} on Instagram`}
            className="group relative flex aspect-square items-center justify-center overflow-hidden rounded bg-ink transition-transform hover:-translate-y-0.5"
          >
            <div
              className="absolute inset-0 opacity-80 transition-opacity group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 30% 110%, #ebcb6e 0%, #c9a227 30%, #8c6d1b 55%, #0a0908 90%)",
              }}
            />
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="relative text-text-ondark/90"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
        ))}
      </div>
      <a
        href={`https://www.instagram.com/${handle}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block text-sm font-bold text-gold-text hover:underline"
      >
        Follow @{handle} on Instagram →
      </a>
    </div>
  );
}
