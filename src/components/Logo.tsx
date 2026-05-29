import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#" className={cn("group flex items-baseline gap-2", className)} aria-label="Krijo Studio">
      <span className="serif text-[22px] font-medium leading-none tracking-[-0.02em] text-ink">
        Krijo
        <span className="text-accent">.</span>
      </span>
      <span className="mono text-[10px] uppercase text-ink-soft">studio · tiranë</span>
    </a>
  );
}
