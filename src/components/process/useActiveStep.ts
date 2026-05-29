"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which step row is "active" based on scroll position.
 * Returns [active, setActive] so click handlers can update immediately
 * (the observer keeps it in sync with passive scrolling).
 */
export function useActiveStep(
  ids: readonly string[]
): [number, (i: number) => void] {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Still respond to clicks via #anchor — but skip live scroll-spying.
    }

    // Spy zone: an element is "active" once its top enters the upper 45% of the viewport.
    // rootMargin shrinks the bottom so a step only activates once it's clearly visible.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible (largest intersectionRatio among intersecting)
        // Fallback: the lowest-index that's still intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const top = visible[0].target as HTMLElement;
        const idx = ids.indexOf(top.id);
        if (idx >= 0) setActive(idx);
      },
      {
        // Top edge of "active zone" sits ~25% from top; bottom edge ~55% from top.
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive];
}

/** Smooth-scroll to a step; respects scroll-margin-top set on the target. */
export function scrollToStep(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
