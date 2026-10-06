import { cn } from "@/lib/utils";
import { Container } from "./Container";

const tones = {
  default: "bg-canvas",
  raised: "bg-canvas-raised",
  /** Deep-navy band; re-themes everything inside it (see .tone-ink). */
  ink: "tone-ink",
} as const;

/**
 * A page section with the standard vertical rhythm and container. Every
 * homepage section uses this, so spacing changes happen in one place.
 */
export function Section({
  id,
  tone = "default",
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: keyof typeof tones;
  /** id of the section's heading, for an accessible region name. */
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-20 sm:py-28", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
