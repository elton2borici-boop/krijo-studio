"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Single primary navigation surface — footer handles fine-grain jumps. */
const links = [
  { href: "#punet", label: "Puna jonë" },
  { href: "#cmimet", label: "Çmimet" },
  { href: "#sherbimet", label: "Shërbimet" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll-spy: highlight the link for the section crossing a band ~45% down
  // the viewport. A passive scroll read also drives the nav background and
  // clears the highlight while still in the hero.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
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

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-card border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open ? "nav-surface" : "border-transparent"
        )}
      >
        <Logo />

        <nav className="hidden lg:block" aria-label="Navigimi kryesor">
          <ul className="flex items-center gap-8">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      // The underline is the "new" effect: it slides in under
                      // the current section's link as you scroll.
                      "relative py-1 text-sm font-medium transition-colors duration-200 hover:text-fg",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300 after:ease-out-soft",
                      isActive
                        ? "text-fg after:scale-x-100"
                        : "text-fg-muted after:scale-x-0"
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="#kontakt" size="sm" className="hidden lg:inline-flex">
            Kontakt
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-celular"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 items-center rounded-control border border-hairline-strong px-4 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? "Mbyll" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-celular"
          className="card mx-auto mt-2 max-w-6xl p-2 shadow-raised lg:hidden"
        >
          <nav aria-label="Menuja për celular">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-control px-4 py-3.5 text-base font-medium text-fg transition-colors hover:bg-canvas-raised"
                  >
                    {l.label}
                    <span aria-hidden className="text-accent">→</span>
                  </a>
                </li>
              ))}
              <li className="p-2">
                <ButtonLink
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Kontakt
                </ButtonLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
