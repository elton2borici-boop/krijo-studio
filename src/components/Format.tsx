"use client";

import { useState } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { WorkCard } from "./WorkCard";
import {
  GastroPreview,
  LawPreview,
  ShopPreview,
  StudioPreview,
} from "./SiteMocks";
import { cn } from "@/lib/utils";

type FormatItem = {
  n: string;
  title: string;
  tag: string;
  text: string;
  best: string;
  bullets: string[];
  /** Worked example of this structure — replaces the old abstract wireframe.
      Merged in from the former "Punët" section, which asked the same question
      ("what shape of site do I need?") with different pictures. */
  example: {
    domain: string;
    label: string;
    caption: string;
    preview: React.ReactNode;
  };
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
    example: {
      domain: "buke-vere.al",
      label: "Restorant në Tiranë",
      caption: "Menu e lexueshme në telefon dhe rezervim i dukshëm kudo.",
      preview: <GastroPreview />,
    },
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
    example: {
      domain: "avokatura-arta.al",
      label: "Studio ligjore",
      caption:
        "Tipografi e qetë dhe shërbime të ndara qartë — besim që në lexim të parë.",
      preview: <LawPreview />,
    },
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
    example: {
      domain: "elira-nushi.al",
      label: "Portfolio fotografie",
      caption: "Galeria mban faqen; teksti rri mënjanë dhe nuk e pengon.",
      preview: <StudioPreview />,
    },
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
    example: {
      domain: "atelier12.al",
      label: "Dyqan artizanal online",
      caption:
        "Produkte, çmime dhe blerje e shpejtë — e menduar së pari për telefonin.",
      preview: <ShopPreview />,
    },
  },
];

export function Format() {
  const [selected, setSelected] = useState(0);
  const current = formats[selected];

  return (
    <section id="punet" className="relative bg-canvas-raised py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="puna & formati"
          title={
            <>
              Cili format i përshtatet{" "}
              <span className="text-gradient">markës sate?</span>
            </>
          }
          lede="Zgjidh një strukturë më poshtë për të parë një shembull të plotë të saj. Pamjet janë ilustruese — portofolin me faqe reale klientësh e ndajmë me kërkesë."
        />

        <div className="mt-8 grid grid-cols-12 gap-x-8 gap-y-8 sm:mt-10 lg:gap-x-12">
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
                    aria-controls="punet-preview"
                    onClick={() => setSelected(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 min-h-[64px]",
                      isActive
                        ? "glass-strong text-fg ring-1 ring-accent/40"
                        : "glass text-fg-muted hover:text-fg"
                    )}
                  >
                    <span
                      className={cn(
                        "serif tnum text-[28px] font-bold leading-none tracking-tight",
                        isActive ? "text-gradient" : "text-fg-faint"
                      )}
                    >
                      {f.n}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[11.5px] font-medium text-fg-muted">
                        {f.tag}
                      </span>
                      <span className="serif text-[18px] font-bold leading-tight tracking-tight text-fg">
                        {f.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "transition-transform duration-300",
                        isActive ? "translate-x-0 text-accent" : "-translate-x-1 text-fg-muted group-hover:translate-x-0"
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
            id="punet-preview"
            aria-live="polite"
            className="col-span-12 flex flex-col gap-5 lg:col-span-7 lg:sticky lg:top-24"
          >
            <p className="text-[15px] leading-relaxed text-fg-muted">
              {current.text}
            </p>

            <div className="grid grid-cols-12 gap-x-6 gap-y-5">
              <div className="col-span-12 sm:col-span-6">
                {/* key: forces a fresh WorkCard per format so its <dialog>
                    never holds the previous example's markup. */}
                <WorkCard
                  key={current.example.domain}
                  domain={current.example.domain}
                  tag={current.tag}
                  title={current.example.label}
                  caption={current.example.caption}
                >
                  {current.example.preview}
                </WorkCard>
              </div>

              <ul className="col-span-12 flex flex-col gap-2 sm:col-span-6 sm:self-center">
                {current.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-[14px] leading-relaxed text-fg"
                  >
                    <span aria-hidden className="text-accent">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[13px] leading-relaxed text-fg">
              <span className="mr-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                Më i përshtatshëm
              </span>
              {current.best}
            </p>

            <a
              href="#kontakt"
              className="inline-flex h-12 w-fit items-center gap-2 rounded-[10px] bg-accent-deep px-5 text-[14px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(31,95,191,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
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
