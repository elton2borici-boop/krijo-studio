import { cn } from "@/lib/utils";

/** Small uppercase label above a heading. */
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
        "text-xs font-semibold uppercase tracking-[0.12em] text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}
