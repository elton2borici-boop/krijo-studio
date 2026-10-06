"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
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

        <div className="mt-8 grid grid-cols-12 gap-y-8 sm:mt-10 lg:gap-x-12">
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
                  <Mock />
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

            <ButtonLink href="#kontakt" className="w-fit px-5">
              Ky format më përshtatet
              <span aria-hidden>→</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
