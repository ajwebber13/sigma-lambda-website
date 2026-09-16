import Image from "next/image";

export default function Medallion() {
  return (
    <div className="relative flex h-[320px] items-center justify-center sm:h-[440px]" aria-hidden="true">
      <div className="logo-float relative h-[254px] w-[196px] sm:h-[380px] sm:w-[293px]">
        <Image
          src="/images/sigma-lambda-logo.png"
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 293px, 196px"
          className="logo-glow object-contain"
        />
      </div>
    </div>
  );
}
