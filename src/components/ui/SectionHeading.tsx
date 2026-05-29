import { cn } from "@/lib/utils";

/** One quiet eyebrow label — avoids duplicating navbar “chapter numbers”. */
export function SectionHeading({
  label,
  title,
  lede,
  align = "left",
  className,
}: {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:gap-6",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <p className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
        <span aria-hidden className="h-px w-6 bg-accent" />
        {label}
      </p>
      <h2 className="serif max-w-4xl text-balance text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3.1rem] lg:text-[3.6rem]">
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-pretty text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
          {lede}
        </p>
      )}
    </div>
  );
}
