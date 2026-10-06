import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/**
 * Eyebrow + h2 + optional lede. `size="lg"` is reserved for the page's key
 * moment (pricing) so the headline rhythm doesn't shout in every section.
 */
export function SectionHeading({
  label,
  title,
  lede,
  align = "left",
  size = "md",
  id,
  className,
}: {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
  /** Lets the section point aria-labelledby at the heading. */
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <Eyebrow>{label}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "max-w-4xl font-display font-extrabold leading-[1.02] tracking-tight text-fg",
          size === "lg"
            ? "text-5xl sm:text-6xl lg:text-7xl"
            : "text-4xl sm:text-5xl"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {lede}
        </p>
      )}
    </div>
  );
}
