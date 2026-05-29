import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const max =
    size === "wide"
      ? "max-w-[1400px]"
      : size === "narrow"
        ? "max-w-3xl"
        : "max-w-[1240px]";
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-10 lg:px-14", max, className)}>
      {children}
    </div>
  );
}
