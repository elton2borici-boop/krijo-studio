import { cn } from "@/lib/utils";

/** Small uppercase label above a heading, set as a pill with a dot. */
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
        "inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent before:size-1.5 before:rounded-full before:bg-accent",
        className
      )}
    >
      {children}
    </p>
  );
}
