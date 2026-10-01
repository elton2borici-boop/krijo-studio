"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

/** Single primary navigation surface — footer handles fine-grain jumps. */
const links = [
  { href: "#formatet", label: "Formatet" },
  { href: "#cmimet", label: "Çmimet" },
  { href: "#sherbimet", label: "Shërbimet" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll-spy: highlight the nav link for the section crossing a band ~45%
  // down the viewport (IntersectionObserver). A single passive scroll read
  // also tracks the sticky background and clears the highlight up in the hero,
  // where no nav section is in the band yet.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Above the first nav section → no section is "current".
      if (els[0] && els[0].getBoundingClientRect().top > window.innerHeight * 0.55) {
        setActive("");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1180px] items-center justify-between rounded-[14px] px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled ? "glass-nav" : "border border-transparent"
        )}
      >
        <Logo />

        <nav className="hidden lg:block" aria-label="Navigimi kryesor">
          <ul className="flex items-center gap-7">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "text-[14px] font-medium transition-colors hover:text-fg",
                      isActive ? "text-accent" : "text-fg-muted"
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <a
            href="#kontakt"
            className="inline-flex h-9 items-center rounded-[10px] bg-accent-deep px-4 text-[13.5px] font-semibold text-white shadow-[0_4px_14px_-6px_rgba(31,95,191,0.7)] transition-transform hover:-translate-y-0.5"
          >
            Kontakt
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Mbyll menynë" : "Hap menynë"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-9 items-center rounded-[10px] border border-hairline-strong px-4 text-[13.5px] font-semibold text-fg lg:hidden"
        >
          {open ? "Mbyll" : "Menu"}
        </button>
      </div>

      {/* Opaque, not glass: this panel floats over the hero headline, and a 5%
          white fill leaves 60px display type legible straight through it. */}
      {open && (
        <div className="mx-auto mt-2 max-w-[1180px] rounded-[14px] border border-hairline bg-white px-2 shadow-[0_20px_50px_-18px_rgba(21,24,29,0.25)] lg:hidden">
          <nav aria-label="Menuja për celular">
            <ul className="px-3 py-1">
              {links.map((l) => (
                <li key={l.href} className="border-b border-hairline last:border-b-0">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-[15px] font-medium text-fg"
                  >
                    {l.label}
                    <span className="text-[12px] text-accent">→</span>
                  </a>
                </li>
              ))}
              <li className="py-3">
                <a
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-[10px] bg-accent-deep text-[14px] font-semibold text-white"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
