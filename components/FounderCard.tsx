import Image from "next/image";
import type { Founder } from "@/lib/founders";

export default function FounderCard({ founder }: { founder: Founder }) {
  return (
    <div className="rounded bg-ink p-5.5 text-text-ondark">
      <div className="relative aspect-square w-full overflow-hidden rounded bg-paper">
        <Image
          src={`/images/founders/${founder.photo}`}
          alt={founder.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <span className="mt-4 block text-[12px] font-semibold tracking-[0.06em] text-gold-bright">
        {founder.years}
      </span>
      <h3 className="mt-1 font-serif text-lg font-semibold">{founder.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{founder.bio}</p>
    </div>
  );
}
