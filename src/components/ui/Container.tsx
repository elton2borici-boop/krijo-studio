import { cn } from "@/lib/utils";

/** Centred page-width wrapper with the standard side gutters. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10", className)}
    >
      {children}
    </div>
  );
}
