"use client";

import { cn } from "@/lib/utils";
import { scrollToStep } from "./useActiveStep";

export type Step = {
  id: string;
  n: string;
  title: string;
  days: string;
};

type Props = {
  steps: readonly Step[];
  active: number;
  onSelect: (index: number) => void;
  variant: "pills" | "rail";
};

/**
 * Two layouts, one component:
 *   - "pills"  → sticky horizontal strip used on mobile (under main nav).
 *   - "rail"   → sticky vertical list used on desktop, anchored in a side column.
 *
 * Both forms are buttons (≥44px tap height) that smooth-scroll to the matching step.
 */
export function StepNav({ steps, active, onSelect, variant }: Props) {
  const go = (i: number, id: string) => {
    onSelect(i);
    scrollToStep(id);
  };

  if (variant === "pills") {
    return (
      <nav
        aria-label="Hapat e procesit"
        className="sticky top-0 z-30 -mx-6 border-y border-rule bg-paper/95 px-6 py-2.5 backdrop-blur-sm sm:-mx-10 sm:px-10 lg:hidden"
      >
        <ol className="flex snap-x snap-mandatory items-center gap-2 overflow-x-auto">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.id} className="snap-start shrink-0">
                <button
                  type="button"
                  onClick={() => go(i, s.id)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "mono inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[11px] uppercase tracking-wider transition-colors duration-300",
                    isActive
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-paper-soft/70 text-ink-soft active:bg-paper-soft"
                  )}
                >
                  <span
                    className={cn(
                      "tnum text-[12px] font-semibold",
                      isActive ? "text-paper" : "text-accent"
                    )}
                  >
                    {s.n}
                  </span>
                  <span>{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // Desktop rail
  return (
    <nav
      aria-label="Hapat e procesit"
      className="hidden lg:block"
    >
      <ol className="lg:sticky lg:top-28 flex flex-col gap-3 border-l border-rule pl-5">
        {steps.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <li key={s.id} className="relative">
              {/* Marker dot, sits on top of the border-l */}
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300",
                  isActive
                    ? "border-accent bg-accent"
                    : isPast
                      ? "border-accent bg-paper"
                      : "border-rule-strong bg-paper"
                )}
              />
              <button
                type="button"
                onClick={() => go(i, s.id)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group block min-h-11 w-full text-left transition-colors duration-300",
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                <span className="mono tnum text-[11px] uppercase tracking-wide">
                  {s.n} · {s.days}
                </span>
                <span
                  className={cn(
                    "serif mt-0.5 block text-[18px] font-semibold leading-tight tracking-tight",
                    isActive && "text-accent"
                  )}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
