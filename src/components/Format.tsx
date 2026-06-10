"use client";

import { useState } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { cn } from "@/lib/utils";

type FormatItem = {
  n: string;
  title: string;
  tag: string;
  text: string;
  best: string;
  bullets: string[];
  /** Visual wireframe key — determines which CSS mock renders in the preview. */
  shape: "one-pager" | "klasik" | "portfolio" | "ecommerce";
};

const formats: FormatItem[] = [
  {
    n: "01",
    title: "Një faqe e vetme",
    tag: "One‑pager",
    text:
      "Gjithçka në një rrjedhë të vetme — i përshtatshëm kur mesazhi është i drejtpërdrejtë dhe vendimi merret shpejt.",
    best: "Për biznese të reja, evente, ose një produkt të vetëm.",
    bullets: [
      "Strukturë e shkurtër, vendim i shpejtë",
      "Përshtatje e shkëlqyer për telefonin",
      "Lansim më i shpejtë",
    ],
    shape: "one-pager",
  },
  {
    n: "02",
    title: "Uebsajt me nënfaqe",
    tag: "Klasik",
    text:
      "Kreu, rreth nesh, shërbimet, kontakti — strukturë e qartë që e ndan përmbajtjen sipas asaj që kërkon vizitori.",
    best: "Për biznese me disa shërbime.",
    bullets: [
      "Deri në 5–7 nënfaqe të dedikuara",
      "SEO më i thellë për çdo shërbim",
      "Më e lehtë për t’u rritur me kohën",
    ],
    shape: "klasik",
  },
  {
    n: "03",
    title: "Portfolio",
    tag: "Vizual",
    text:
      "Fotografia dhe puna jote në qendër — me hapësirë, ritëm dhe një rrjedhë leximi që e bën galerinë protagonistin.",
    best: "Për fotografë, arkitektë, studio krijuese.",
    bullets: [
      "Galeri të shpejta dhe të pastra",
      "Tipografi e zgjedhur me kujdes",
      "Kategori dhe filtra sipas nevojës",
    ],
    shape: "portfolio",
  },
  {
    n: "04",
    title: "Dyqan online",
    tag: "E‑commerce",
    text:
      "Produkte, shportë, pagesa — me një menaxhim që mund ta përdorësh edhe pa njohuri teknike.",
    best: "Për markat që duan të shesin direkt, pa platforma të jashtme.",
    bullets: [
      "Pagesa me kartë dhe transfertë",
      "Stoku & porositë në një vend",
      "I integrueshëm me Instagram",
    ],
    shape: "ecommerce",
  },
];

/** Shared "device frame" so every wireframe reads as a page layout. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex aspect-[3/4] w-full max-w-[260px] flex-col gap-2 rounded-md border border-rule bg-paper p-3 shadow-[0_2px_10px_-6px_rgba(28,24,19,0.25)] sm:max-w-[300px]">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-rule" />
        <span className="h-1.5 w-1.5 rounded-full bg-rule" />
        <span className="h-1.5 w-1.5 rounded-full bg-rule" />
      </div>
      {children}
    </div>
  );
}

// Tiny CSS mocks — paper-soft rectangles arranged per format. No images.
function Wireframe({ shape }: { shape: FormatItem["shape"] }) {
  if (shape === "one-pager") {
    return (
      <Frame>
        <div className="h-9 rounded-sm bg-accent/30" />
        <div className="h-2 w-2/3 rounded-sm bg-ink/15" />
        <div className="h-2 w-1/2 rounded-sm bg-ink/10" />
        <div className="mt-1 h-12 rounded-sm bg-paper-soft" />
        <div className="grid grid-cols-3 gap-1.5">
          <div className="h-7 rounded-sm bg-paper-soft" />
          <div className="h-7 rounded-sm bg-paper-soft" />
          <div className="h-7 rounded-sm bg-paper-soft" />
        </div>
        <div className="mt-auto h-5 rounded-sm bg-ink/70" />
      </Frame>
    );
  }

  if (shape === "klasik") {
    return (
      <Frame>
        <div className="flex gap-1">
          <div className="h-2 w-8 rounded-sm bg-ink/30" />
          <div className="ml-auto flex gap-1">
            <div className="h-2 w-5 rounded-sm bg-ink/15" />
            <div className="h-2 w-5 rounded-sm bg-ink/15" />
            <div className="h-2 w-5 rounded-sm bg-accent/40" />
          </div>
        </div>
        <div className="mt-1 h-10 rounded-sm bg-paper-soft" />
        <div className="h-2 w-3/5 rounded-sm bg-ink/15" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-10 rounded-sm bg-paper-soft" />
          <div className="h-10 rounded-sm bg-paper-soft" />
        </div>
        <div className="mt-auto flex justify-between text-[7px]">
          <span className="h-1.5 w-6 rounded-sm bg-ink/15" />
          <span className="h-1.5 w-6 rounded-sm bg-ink/15" />
          <span className="h-1.5 w-6 rounded-sm bg-ink/15" />
        </div>
      </Frame>
    );
  }

  if (shape === "portfolio") {
    return (
      <Frame>
        <div className="h-2 w-1/3 rounded-sm bg-ink/30" />
        <div className="grid grid-cols-3 gap-1.5">
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="aspect-square rounded-sm bg-accent/25" />
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="aspect-square rounded-sm bg-paper-soft" />
        </div>
        <div className="mt-auto h-2 w-1/2 rounded-sm bg-ink/15" />
      </Frame>
    );
  }

  // ecommerce
  return (
    <Frame>
      <div className="flex items-center justify-between">
        <div className="h-2 w-10 rounded-sm bg-ink/30" />
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/40 text-[8px] font-semibold text-paper">
          ●
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex flex-col gap-1">
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="h-1.5 w-3/4 rounded-sm bg-ink/15" />
          <div className="h-1.5 w-1/3 rounded-sm bg-accent/50" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="h-1.5 w-2/3 rounded-sm bg-ink/15" />
          <div className="h-1.5 w-1/3 rounded-sm bg-accent/50" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="h-1.5 w-3/5 rounded-sm bg-ink/15" />
          <div className="h-1.5 w-1/3 rounded-sm bg-accent/50" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="aspect-square rounded-sm bg-paper-soft" />
          <div className="h-1.5 w-3/4 rounded-sm bg-ink/15" />
          <div className="h-1.5 w-1/3 rounded-sm bg-accent/50" />
        </div>
      </div>
      <div className="mt-auto h-4 rounded-sm bg-ink/70" />
    </Frame>
  );
}

export function Format() {
  const [selected, setSelected] = useState(0);
  const current = formats[selected];

  return (
    <section id="formati" className="relative border-t border-rule py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="Formati"
          title={
            <>
              Cili format i përshtatet{" "}
              <span className="italic">markës sate?</span>
            </>
          }
          lede="Para se të nisim, zgjedhim së bashku formën që i shërben më mirë qëllimit tënd. Zgjidh një opsion më poshtë për të parë se si do të dukej."
        />

        <div className="mt-10 grid grid-cols-12 gap-x-8 gap-y-8 sm:mt-14 lg:gap-x-12">
          {/* Picker — left column on desktop, full width on mobile */}
          <ol
            aria-label="Formatet e mundshme"
            className="col-span-12 flex flex-col gap-2 lg:col-span-5 lg:gap-3"
          >
            {formats.map((f, i) => {
              const isActive = i === selected;
              return (
                <li key={f.n}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="formati-preview"
                    onClick={() => setSelected(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors duration-300 min-h-[64px]",
                      isActive
                        ? "border-ink bg-ink text-paper"
                        : "border-rule bg-paper-soft/55 text-ink hover:border-ink/40 active:bg-paper-soft"
                    )}
                  >
                    <span
                      className={cn(
                        "serif tnum text-[28px] font-semibold leading-none tracking-tight",
                        isActive ? "text-accent-mute" : "text-accent"
                      )}
                    >
                      {f.n}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span
                        className={cn(
                          "mono text-[10px] uppercase tracking-wide",
                          isActive ? "text-paper/70" : "text-ink-soft"
                        )}
                      >
                        {f.tag}
                      </span>
                      <span className="serif text-[18px] font-semibold leading-tight tracking-tight">
                        {f.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "transition-transform duration-300",
                        isActive ? "translate-x-0 text-paper" : "-translate-x-1 text-ink-soft group-hover:translate-x-0"
                      )}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Preview panel — right column on desktop, below picker on mobile */}
          <div
            id="formati-preview"
            aria-live="polite"
            className="col-span-12 flex flex-col gap-6 lg:col-span-7 lg:sticky lg:top-24"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mono text-[10px] uppercase tracking-wide text-ink-soft">
                  {current.tag}
                </p>
                <h3 className="serif mt-1 text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-[34px]">
                  {current.title}
                </h3>
              </div>
              <span className="serif tnum text-[44px] font-semibold leading-none tracking-tight text-accent sm:text-[56px]">
                {current.n}
              </span>
            </div>

            <p className="text-[15px] leading-relaxed text-ink-soft">
              {current.text}
            </p>

            <div className="grid grid-cols-12 gap-x-6 gap-y-6">
              <div className="col-span-12 sm:col-span-6">
                <Wireframe shape={current.shape} />
              </div>

              <ul className="col-span-12 flex flex-col gap-2 sm:col-span-6 sm:self-center">
                {current.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-[14px] leading-relaxed text-ink"
                  >
                    <span aria-hidden className="text-accent">/</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[13px] leading-relaxed text-ink">
              <span className="mono mr-2 text-[10px] uppercase tracking-wide text-ink-soft/80">
                Më i përshtatshëm
              </span>
              {current.best}
            </p>

            <a
              href="#kontakt"
              className="mono inline-flex h-12 w-fit items-center gap-2 border border-ink bg-ink px-5 text-[11px] uppercase tracking-wider text-paper transition-opacity duration-300 hover:opacity-90"
            >
              Ky format më përshtatet
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
