"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { cn } from "@/lib/utils";

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
const steps = [
  {
    n: "01",
    title: "Bisedë",
    days: "Dita 1",
    text: "Na tregon për biznesin dhe çfarë pret nga faqja — me takim, telefonatë ose video.",
    detail:
      "Pa përgatitje nga ana jote. Mjafton të dimë çfarë bën biznesi, kujt i shet dhe çfarë duhet të ndodhë kur dikush hap faqen.",
  },
  {
    n: "02",
    title: "Propozim",
    days: "Ditët 2–3",
    text: "Merr një afat konkret dhe një listë të qartë të asaj që përfshihet. Pa terma të mjegullt.",
    detail:
      "Një dokument i vetëm: çmimi, afati, çfarë përfshihet dhe çfarë jo. Nëse diçka nuk të bind, e ndryshojmë para se të nisim — jo pasi të kemi ndërtuar.",
  },
  {
    n: "03",
    title: "Ndërtim",
    days: "Ditët 4–7",
    text: "E ndërtojmë faqen dhe të japim një lidhje ku e ndjek ecurinë në kohë reale.",
    detail:
      "Lidhja është e jotja që nga dita e parë. Sheh çdo ndryshim ndërsa ndodh dhe na thua menjëherë nëse diçka nuk shkon, në vend që të presësh dorëzimin.",
  },
  {
    n: "04",
    title: "Lansim",
    days: "Java e dytë",
    text: "Testim në telefon e shfletues të ndryshëm, miratimi yt — dhe pastaj publikimi.",
    detail:
      "Asgjë nuk publikohet pa miratimin tënd të qartë. Pas lansimit të tregojmë si ta përditësosh vetë faqen, me një trajnim të shkurtër.",
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  const current = steps[active];

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
        <div className="flex flex-col gap-4 sm:gap-5">
          <Eyebrow>procesi</Eyebrow>
          <h2 className="serif max-w-3xl text-balance text-[1.9rem] font-bold leading-[1.05] tracking-[-0.015em] text-fg sm:text-[2.2rem] lg:text-[2.5rem]">
            Nga ideja te publikimi — <span className="text-gradient">katër hapa.</span>
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-fg-muted">
            Kliko një hap për të parë se çfarë ndodh saktësisht në të.
          </p>
        </div>

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

        <div
          id="hap-detajet"
          role="tabpanel"
          aria-live="polite"
          className="mt-8 max-w-2xl rounded-2xl glass p-6 sm:mt-10 sm:p-8"
        >
          <p className="text-[16px] leading-relaxed text-fg">{current.text}</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">
            {current.detail}
          </p>
        </div>
      </Container>
    </section>
  );
}
