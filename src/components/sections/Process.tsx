"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { steps } from "@/content/process";

/**
 * The four steps as a walkable route rather than four static cards.
 *
 * A visitor's real question here is "what will actually happen to me, and
 * when", which is a sequence — so the section is built as one: a connected
 * track of stops you move along, with the detail for the current stop shown
 * beneath. Keyboard arrows walk it too, since a row of stops that only
 * responds to clicks is a picture of a process, not a control.
 *
 * The workshop photograph is the section's background here, not a band inside
 * it, so the steps read as notes laid over the work itself.
 */
export function Process() {
  const [active, setActive] = useState(0);

  function onKeyDown(e: React.KeyboardEvent) {
    const delta =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + steps.length) % steps.length;
    setActive(next);
    document.getElementById(`hap-${next}`)?.focus();
  }

  return (
    <section
      id="procesi"
      className="relative isolate overflow-hidden py-16 sm:py-24"
    >
      {/* Background photograph, washed back far enough to sit under text. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/puna.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>
      {/* Scrim: the photo is light and busy, and body copy needs a floor to
          stand on. Slightly stronger at the edges than the middle so the
          image still reads as an image. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-canvas/88 backdrop-blur-[2px]"
      />

      <Container>
        <SectionHeading
          label="procesi"
          title={
            <>
              Nga ideja te publikimi —{" "}
              <span className="text-gradient">katër hapa.</span>
            </>
          }
          lede="Kliko një hap për të parë se çfarë ndodh saktësisht në të."
        />

        {/* The route. The connecting rule sits behind the stops and is filled
            up to the active one, so progress is visible at a glance. */}
        <div
          className="relative mt-10 sm:mt-14"
          role="tablist"
          aria-label="Hapat e procesit"
          onKeyDown={onKeyDown}
        >
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden h-[2px] bg-hairline sm:block"
          />
          <div
            aria-hidden
            className="absolute left-0 top-[22px] hidden h-[2px] bg-accent transition-[width] duration-500 ease-out sm:block"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />

          <ol className="relative grid gap-4 sm:grid-cols-4 sm:gap-6">
            {steps.map((s, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <li key={s.n}>
                  <button
                    id={`hap-${i}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="hap-detajet"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-3 text-left sm:flex-col sm:items-start sm:gap-3"
                  >
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full border-2 text-[13px] font-semibold tabular-nums transition-colors duration-300",
                        isActive
                          ? "border-accent bg-accent text-white"
                          : isDone
                            ? "border-accent bg-canvas text-accent"
                            : "border-hairline-strong bg-canvas text-fg-muted group-hover:border-accent group-hover:text-accent"
                      )}
                    >
                      {s.n}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
                        {s.days}
                      </span>
                      <span
                        className={cn(
                          "serif text-[19px] font-bold leading-tight tracking-tight transition-colors duration-300",
                          isActive ? "text-fg" : "text-fg-muted group-hover:text-fg"
                        )}
                      >
                        {s.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Every step is rendered, stacked into one grid cell, with only the
            active one visible. The grid sizes to the TALLEST step, so the
            panel — and therefore the section — keeps one height no matter
            which step is selected.

            Without this, each step's detail is a different length, the section
            grows and shrinks as you click, and the `fill` background image
            re-covers to the new box: the photo appears to zoom on every step
            change. Stable height is what stops that. */}
        <div
          id="hap-detajet"
          role="tabpanel"
          aria-live="polite"
          className="mt-8 grid max-w-2xl rounded-2xl glass p-6 sm:mt-10 sm:p-8"
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              aria-hidden={i !== active}
              className={cn(
                "[grid-area:1/1] transition-opacity duration-300",
                i === active ? "opacity-100" : "invisible opacity-0"
              )}
            >
              <p className="text-[16px] leading-relaxed text-fg">{s.text}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
