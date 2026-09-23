export default function SectionHeading({
  tag,
  title,
  description,
  dark = false,
  className = "",
  headingId,
  center = false,
  titleClassName,
}: {
  tag: string;
  title: string;
  description?: string;
  dark?: boolean;
  className?: string;
  headingId?: string;
  center?: boolean;
  titleClassName?: string;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : "max-w-[640px]"} ${className}`}>
      <span
        className={`mb-3.5 block text-[13px] font-semibold tracking-[0.03em] ${
          dark ? "text-gold-bright" : "text-gold-text"
        }`}
      >
        {tag}
      </span>
      <h2
        id={headingId}
        className={`leading-[1.12] font-semibold ${titleClassName ?? "text-[28px] sm:text-[36px] lg:text-[42px]"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-[70ch] text-[16.5px] leading-relaxed ${
            dark ? "text-text-ondark/68" : "text-text-onlight/68"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
