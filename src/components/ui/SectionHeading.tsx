import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/**
 * One quiet eyebrow label — avoids duplicating navbar “chapter numbers”.
 * `size="lg"` is reserved for the page's key moments (pricing); secondary
 * sections use the default "md" so the headline rhythm doesn't shout six times.
 */
export function SectionHeading({
  label,
  title,
  lede,
  align = "left",
  size = "md",
  className,
}: {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <Eyebrow>{label}</Eyebrow>
      <h2
        className={cn(
          "serif max-w-4xl text-balance font-semibold leading-[1.04] tracking-[-0.025em] text-ink",
          size === "lg"
            ? "text-[2.3rem] sm:text-[3rem] lg:text-[3.7rem]"
            : "text-[1.8rem] sm:text-[2.05rem] lg:text-[2.3rem]"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">
          {lede}
        </p>
      )}
    </div>
  );
}
