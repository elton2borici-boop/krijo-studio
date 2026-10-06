import { cn } from "@/lib/utils";

/** Accent tick for feature lists; decorative, the list text carries meaning. */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("mt-[0.3em] size-3.5 shrink-0 text-accent", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8.5 3 3 7-7" />
    </svg>
  );
}
