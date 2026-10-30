"use client";

import { useEffect, useRef } from "react";
import type { CreatureKind } from "./heroCreatureScene";

/**
 * Two 3D koi swimming behind the hero copy (or a snake, with kind="snake").
 * They wander on their own, follow the cursor while it moves, dart to food
 * dropped with a click, and dive deeper while they pass under the headline so
 * it stays readable.
 *
 * three.js and the scene are one chunk, imported once the page is idle, so
 * they never compete with first paint. Visitors who prefer reduced motion, or
 * whose browser has no WebGL 2, never download it — unless the URL has
 * `?motion`, so someone with reduced motion on can still preview the hero.
 */
export function HeroCreature({ kind = "koi" }: { kind?: CreatureKind }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const forced = new URLSearchParams(location.search).has("motion");
    if (
      !host ||
      !("WebGL2RenderingContext" in window) ||
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forced)
    ) {
      return;
    }

    let teardown: (() => void) | undefined;
    let cancelled = false;
    const load = () => {
      import("./heroCreatureScene").then(({ mountCreatures }) => {
        if (!cancelled) teardown = mountCreatures(host, kind);
      });
    };

    let cancelLoad: () => void;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 2000 });
      cancelLoad = () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(load, 600);
      cancelLoad = () => clearTimeout(id);
    }

    return () => {
      cancelled = true;
      cancelLoad();
      teardown?.();
    };
  }, [kind]);

  return <div ref={hostRef} aria-hidden className="absolute inset-0" />;
}
