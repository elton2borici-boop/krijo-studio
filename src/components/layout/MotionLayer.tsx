"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement only — applies the `.reveal` class via JS so content
 * stays visible without JS. IntersectionObserver, so nothing runs on scroll.
 * Also pauses the hero wall while the hero is off-screen.
 */
export function MotionLayer() {
  useEffect(() => {
    const wall = document.querySelector<HTMLElement>(".hero-wall");
    const wallObserver = new IntersectionObserver(([entry]) => {
      wall?.classList.toggle("is-paused", !entry.isIntersecting);
    });
    if (wall) wallObserver.observe(wall);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => wallObserver.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    const sections = document.querySelectorAll<HTMLElement>("main > section");
    const foldLine = window.innerHeight * 0.85;

    sections.forEach((section) => {
      // Already in view at load — leave untouched, no flash.
      if (section.getBoundingClientRect().top < foldLine) return;
      section.classList.add("reveal");
      observer.observe(section);
    });

    return () => {
      wallObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
