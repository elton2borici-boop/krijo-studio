"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a price up when it first scrolls into view.
 *
 * Renders the final value on the server and as the initial client state, so
 * the real number is in the HTML for crawlers and for anyone without JS — the
 * animation only ever replaces a correct value with itself.
 *
 * Skipped entirely under prefers-reduced-motion, and it runs once: a price
 * that re-animates every time you scroll past is a distraction at the exact
 * moment someone is trying to make a decision.
 */
export function CountUp({
  value,
  durationMs = 650,
  className,
}: {
  value: number;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let done = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || done) continue;
          done = true;
          observer.disconnect();

          const start = performance.now();
          setDisplay(0);

          const tick = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            // easeOutCubic: quick off the mark, settles onto the real number.
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
