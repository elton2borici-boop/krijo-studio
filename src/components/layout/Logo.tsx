import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#"
      className={cn("group flex items-baseline gap-2", className)}
      aria-label="Krijo Studio"
    >
      <span className="serif text-[20px] font-bold leading-none tracking-[-0.03em] text-fg">
        krijo<span className="text-accent">.</span>
      </span>
      <span className="hidden text-[12px] font-medium text-fg-muted sm:inline">
        Studio · Tiranë
      </span>
    </a>
  );
}
