import Image from "next/image";
import type { CharterMember } from "@/lib/charterMembers";

export default function CharterMemberCard({ member }: { member: CharterMember }) {
  return (
    <div className="rounded bg-ink p-5.5 text-text-ondark">
      <div className="relative aspect-square w-full overflow-hidden rounded bg-ink">
        <Image
          src="/images/sigma-lambda-logo.png"
          alt="Sigma Lambda Chapter crest"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-7"
        />
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold">{member.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-ondark/65">{member.bio}</p>
    </div>
  );
}
