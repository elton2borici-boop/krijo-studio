import { cn } from "@/lib/utils";

/**
 * Dissolves a navy band into the page colour at one edge. It overhangs the
 * edge by 1px so a section ending on a fractional pixel can't show a line.
 */
export function EdgeFade({ side }: { side: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "edge-fade pointer-events-none absolute inset-x-0 -z-10 h-36 sm:h-48",
        side === "top" ? "edge-fade-top -top-px" : "-bottom-px"
      )}
    />
  );
}
