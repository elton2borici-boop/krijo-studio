"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement only — applies the `.reveal` class via JS so content
 * stays visible without JS. IntersectionObserver, so nothing runs on scroll.
 */
export function MotionLayer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    return () => observer.disconnect();
  }, []);

  return null;
}
