"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-rule bg-paper shadow-[0_1px_0_0_rgba(28,24,19,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
        <Logo />

        <nav className="hidden lg:block" aria-label="Navigimi kryesor">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="mono text-[11px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <a
            href="#kontakt"
            className="mono inline-flex h-9 items-center bg-accent px-4 text-[11px] uppercase tracking-[0.1em] text-paper outline-offset-2 shadow-sm shadow-accent/25 transition-opacity hover:opacity-90"
          >
            Projekt i ri →
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Mbyll menynë" : "Hap menynë"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mono inline-flex h-9 items-center border border-ink/20 px-3 text-[11px] uppercase tracking-[0.1em] text-ink lg:hidden"
        >
          {open ? "Mbyll" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-rule bg-paper lg:hidden">
          <nav aria-label="Menuja për celular">
            <ul className="mx-auto max-w-[1240px] px-6 py-1 sm:px-10">
              {links.map((l) => (
                <li key={l.href} className="border-b border-rule last:border-b-0">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex justify-between py-4 text-[15px] font-medium text-ink"
                  >
                    {l.label}
                    <span className="mono text-[11px] text-ink-soft">→</span>
                  </a>
                </li>
              ))}
              <li className="py-4">
                <a
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="mono flex h-11 w-full items-center justify-center bg-accent text-[11px] uppercase tracking-[0.1em] text-paper shadow-sm shadow-accent/20"
                >
                  Projekt i ri →
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
