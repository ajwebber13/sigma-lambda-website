import Image from "next/image";

export default function Medallion() {
  return (
    <div className="relative flex h-[380px] items-center justify-center sm:h-[520px]">
      <div
        className="relative h-[300px] w-[232px] sm:h-[450px] sm:w-[347px]"
        style={{ ["--logo-mask" as string]: "url(/images/sigma-lambda-logo.png)" }}
      >
        <Image
          src="/images/sigma-lambda-logo.png"
          alt="Sigma Lambda Chapter crest, Alpha Phi Alpha Fraternity, Incorporated, founded 1925"
          fill
          priority
          sizes="(min-width: 640px) 347px, 232px"
          className="logo-glow object-contain"
        />
        <div className="logo-flare" aria-hidden="true" />
      </div>
    </div>
  );
}
