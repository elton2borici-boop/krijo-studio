"use client";

import { useEffect, useRef } from "react";
import { Container } from "./ui/Container";

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
        spot.style.setProperty("--mx", `${x}px`);
        spot.style.setProperty("--my", `${y}px`);
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
      /* Shorter than the dark version: empty space on a near-white ground reads
         as unfinished, where on true black it read as atmosphere. */
      className="relative isolate flex min-h-[74vh] items-center overflow-hidden bg-canvas pt-28 pb-16"
    >
      {/* Drifting gradient-mesh blobs. On a light ground these are washes, not
          glows — at the old 0.45–0.55 alpha they turned the page into a blue
          gradient and buried the headline. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="mesh-blob mesh-a absolute -left-[12%] -top-[20%] h-[72vh] w-[72vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(31,95,191,0.10), transparent 62%)",
          }}
        />
        <div
          className="mesh-blob mesh-b absolute -bottom-[28%] -right-[12%] h-[68vh] w-[68vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(91,63,212,0.08), transparent 64%)",
          }}
        />
      </div>

      {/* Dot grid, radial-masked at the edges */}
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10" />

      {/* Cursor-tracking spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(440px circle at var(--mx, 50%) var(--my, 35%), rgba(31,95,191,0.07), transparent 60%)",
        }}
      />

      <Container>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-md border border-hairline bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Studio krijuese · Tiranë
          </p>

          <h1 className="serif mt-7 text-balance text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-fg">
            Krijojmë faqe që{" "}
            <span className="text-gradient">punojnë.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-muted sm:text-[17px]">
            Zhvillim, hosting dhe mirëmbajtje — gjithçka në një vend.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#kontakt"
              className="inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-accent-deep px-7 text-[14px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(31,95,191,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Nis një projekt <span aria-hidden>→</span>
            </a>
            <a
              href="#cmimet"
              className="inline-flex h-12 items-center gap-2.5 rounded-[10px] border border-hairline-strong bg-white px-7 text-[14px] font-semibold text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Shiko çmimet <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
