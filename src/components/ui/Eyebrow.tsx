import { cn } from "@/lib/utils";

/**
 * Small label above each section heading. Uppercase and tracked rather than a
 * mono shell prompt — the terminal styling read as "built by programmers" to a
 * non-technical buyer, which is the opposite of the intended signal.
 * Pass a text-* class to retint.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}
