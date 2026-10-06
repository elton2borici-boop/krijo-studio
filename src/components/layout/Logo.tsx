import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-baseline gap-2 rounded-control", className)}
    >
      <span className="font-display text-xl font-bold leading-none tracking-tight text-fg">
        krijo<span className="text-accent">.</span>
      </span>
      <span className="hidden text-xs font-medium text-fg-muted sm:inline">
        Studio · Tiranë
      </span>
      <span className="sr-only"> — faqja kryesore</span>
    </Link>
  );
}
