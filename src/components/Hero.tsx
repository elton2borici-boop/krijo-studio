"use client";

import { useEffect, useRef } from "react";
import { Container } from "./ui/Container";
import { HeroWall } from "./HeroWall";

/**
 * Liquid Spotlight hero — type-forward on a true-black field.
 * Depth from three static-ish layers: drifting gradient-mesh blobs, a
 * radial-masked dot grid, and a soft glow that tracks the cursor.
 * "use client" only for the pointer tracking (rAF-throttled, no layout thrash).
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Transform only — never touch the gradient's position, which would
        // repaint the whole hero on every frame.
        spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      /* Taller again now that the wall fills the space — empty ground read as
         unfinished, a drifting wall does not. */
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Wall of drifting page layouts, behind everything. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30">
        <HeroWall />
      </div>

      {/* Drifting gradient-mesh blobs. On a light ground these are washes, not
          glows — at the old 0.45–0.55 alpha they turned the page into a blue
          gradient and buried the headline. They sit over the wall so the whole
          composition picks up the same tint. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="mesh-blob mesh-a absolute -left-[12%] -top-[20%] h-[72vh] w-[72vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(31,95,191,0.16), transparent 62%)",
          }}
        />
        <div
          className="mesh-blob mesh-b absolute -bottom-[28%] -right-[8%] h-[68vh] w-[68vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(196,132,74,0.16), transparent 64%)",
          }}
        />
      </div>

      {/* Cursor-tracking spotlight — parked off-screen until the pointer moves,
          so touch devices never paint it at all. */}
      <div ref={spotRef} aria-hidden className="spotlight -z-10" />

      {/* Colour hand-off. The hero sits on `canvas` and the section below on
          `canvas-raised`; butting them together drew a visible horizontal
          seam across the full width. This ramps one into the other so the
          boundary is a transition rather than a line. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-canvas"
      />

      <Container>
        <div className="hero-copy relative max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Studio krijuese · Tiranë
          </p>

          <h1 className="serif mt-7 max-w-[14ch] text-balance text-[clamp(3.15rem,7.2vw,6.35rem)] font-semibold leading-[0.94] tracking-[-0.02em] text-fg">
            Krijojmë faqe që{" "}
            <span className="italic text-gradient">punojnë.</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-fg-muted">
            Zhvillim, hosting dhe mirëmbajtje — gjithçka në një vend.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#kontakt" className="btn btn-primary">
              Nis një projekt <span aria-hidden>→</span>
            </a>
            <a href="#cmimet" className="btn btn-secondary">
              Shiko çmimet <span aria-hidden>↓</span>
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-hairline pt-6">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                Pako
              </dt>
              <dd className="serif mt-1 text-[1.35rem] font-semibold leading-none tracking-tight text-fg sm:text-[1.65rem]">
                4
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                Përgjigje
              </dt>
              <dd className="serif mt-1 text-[1.35rem] font-semibold leading-none tracking-tight text-fg sm:text-[1.65rem]">
                24 orë
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                Studio
              </dt>
              <dd className="serif mt-1 text-[1.35rem] font-semibold leading-none tracking-tight text-fg sm:text-[1.65rem]">
                Tiranë
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
