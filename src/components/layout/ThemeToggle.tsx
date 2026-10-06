"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/*
 * The theme itself lives on <html data-theme>, set before paint by the inline
 * script in layout.tsx. This component only reads that attribute and flips it,
 * so there is no React state to drift out of sync with what is on screen.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.dataset.theme === "dark";

export function ThemeToggle({ className }: { className?: string }) {
  // Server snapshot is `false`; React re-renders with the real value right
  // after hydration. The icons are switched in CSS, so nothing visibly flips.
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = isDark() ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Private mode / storage disabled: the switch still works for this visit.
      }
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Tema e errët"
      title={dark ? "Kalo në temën e çelët" : "Kalo në temën e errët"}
      className={cn(
        "inline-grid size-9 place-items-center rounded-control border border-hairline-strong text-fg-muted transition-colors duration-200 hover:border-accent hover:text-accent",
        className
      )}
    >
      {/* Sun in dark mode (go light), moon in light mode (go dark). */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="hidden size-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
