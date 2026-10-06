"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "./WorkCard";
import {
  GastroPreview,
  LawPreview,
  ShopPreview,
  StudioPreview,
} from "./SiteMocks";
import { cn } from "@/lib/utils";
import { formats, type MockId } from "@/content/formats";
import { ButtonLink } from "@/components/ui/Button";

const mocks: Record<MockId, React.ComponentType> = {
  gastro: GastroPreview,
  law: LawPreview,
  studio: StudioPreview,
  shop: ShopPreview,
};

export function Format() {
  const [selected, setSelected] = useState(0);
  const current = formats[selected];
  const Mock = mocks[current.example.mock];

  return (
    <Section id="punet" tone="raised" labelledBy="punet-titulli">
      <SectionHeading
        id="punet-titulli"
        label="puna & formati"
        title={
          <>
            Cili format i përshtatet{" "}
            <span className="text-accent">markës sate?</span>
          </>
        }
        lede="Zgjidh një strukturë më poshtë për të parë një shembull të plotë të saj. Pamjet janë ilustruese — portofolin me faqe reale klientësh e ndajmë me kërkesë."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Picker — left column on desktop, full width on mobile */}
        <ol
          aria-label="Formatet e mundshme"
          className="flex flex-col gap-2 lg:col-span-5"
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
                    "group flex min-h-16 w-full items-center gap-4 rounded-card border px-5 py-4 text-left transition-colors duration-200",
                    isActive
                      ? "border-accent bg-surface shadow-card"
                      : "border-transparent hover:border-hairline hover:bg-surface"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-2xl font-bold tabular-nums leading-none",
                      isActive ? "text-accent" : "text-fg-faint"
                    )}
                  >
                    {f.n}
                  </span>
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-xs font-medium text-fg-muted">
                      {f.tag}
                    </span>
                    <span className="font-display text-lg font-bold leading-tight text-fg">
                      {f.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "transition-[transform,color] duration-200",
                      isActive
                        ? "text-accent"
                        : "-translate-x-1 text-fg-faint group-hover:translate-x-0 group-hover:text-fg-muted"
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
          className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-7 lg:self-start"
        >
          <p className="text-base leading-relaxed text-fg-muted">
            {current.text}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            {/* key: forces a fresh WorkCard per format so its <dialog>
                never holds the previous example's markup. */}
            <WorkCard
              key={current.example.domain}
              domain={current.example.domain}
              tag={current.tag}
              title={current.example.label}
              caption={current.example.caption}
            >
              <Mock />
            </WorkCard>

            <ul className="flex flex-col gap-2.5">
              {current.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-fg">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm leading-relaxed text-fg">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
              Më i përshtatshëm
            </span>
            {current.best}
          </p>

          <ButtonLink href="#kontakt" className="w-fit">
            Ky format më përshtatet
            <span aria-hidden>→</span>
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
