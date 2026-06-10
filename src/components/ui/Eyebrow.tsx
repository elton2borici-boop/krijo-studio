import { cn } from "@/lib/utils";

/**
 * Small mono label with a leading dash, used above every section heading.
 * Defaults to the accent color; pass a text-* class to retint (the dash
 * follows via bg-current).
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
        "mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-accent",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}
