"use client";

import Image from "next/image";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { cn } from "@/lib/utils";
import { StepNav, type Step } from "./process/StepNav";
import { useActiveStep } from "./process/useActiveStep";

const steps = [
  {
    id: "step-01",
    n: "01",
    title: "Bisedë",
    days: "Dita 1",
    text:
      "Na tregon informacionin kryesor për biznesin dhe çfarë pret nga faqja. Mund të bëhet edhe me një telefonatë video.",
    img: "/images/process-meeting.png",
    alt: "Bisedë pune rreth një tavoline",
  },
  {
    id: "step-02",
    n: "02",
    title: "Propozim",
    days: "Ditët 2–3",
    text:
      "Të japim një afat konkret dhe një listë të qartë të asaj që përfshihet. Pa terma të mjegullta dhe pa kushte të fshehura në fund.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    alt: "Shënime dhe planifikim i një projekti",
  },
  {
    id: "step-03",
    n: "03",
    title: "Ndërtim",
    days: "Ditët 4–7",
    text:
      "E ndërtojmë faqen dhe të japim një lidhje ku e ndjek ecurinë në kohë reale, ndërsa punojmë.",
    img: "/images/process-developer.png",
    alt: "Kod gjatë ndërtimit të faqes",
  },
  {
    id: "step-04",
    n: "04",
    title: "Lansim",
    days: "Java e dytë",
    text:
      "Testime në telefon e në shfletues të ndryshëm, miratimi yt final dhe pastaj publikimi.",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80",
    alt: "Dizajnere duke testuar faqen para lansimit",
  },
] as const satisfies readonly (Step & { text: string; img: string; alt: string })[];

const stepIds = steps.map((s) => s.id);

export function Process() {
  const [active, setActive] = useActiveStep(stepIds);

  // Center the active step within its own band — half-step offset feels more "we're at this milestone".
  const progress = ((active + 0.5) / steps.length) * 100;

  return (
    <section id="procesi" className="relative border-t border-rule py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="Procesi"
          title={
            <>
              Nga ideja te publikimi —{" "}
              <span className="italic">në pak hapa.</span>
            </>
          }
          lede="Me një studio të vogël, komunikimi mbetet i drejtpërdrejtë: ti flet pikërisht me njerëzit që e bëjnë dizajnin dhe zhvillimin."
        />

        {/* Mobile-only sticky pill strip */}
        <div className="mt-10 sm:mt-12 lg:hidden">
          <StepNav steps={steps} active={active} onSelect={setActive} variant="pills" />
        </div>

        {/* Desktop: rail (3 cols) + timeline (9 cols) */}
        <div className="mt-10 grid grid-cols-12 gap-x-10 sm:mt-12 lg:gap-x-12">
          {/* Rail column */}
          <aside className="lg:col-span-3">
            <StepNav steps={steps} active={active} onSelect={setActive} variant="rail" />
          </aside>

          {/* Timeline column */}
          <ol className="relative col-span-12 lg:col-span-9">
            {/* Spine — gradient fill driven by --progress */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-3 w-px transition-[background] duration-500 ease-out sm:left-3.5 lg:left-1/2 lg:-translate-x-px"
              style={{
                background: `linear-gradient(to bottom, var(--color-accent) 0%, var(--color-accent) ${progress}%, var(--color-rule) ${progress}%, var(--color-rule) 100%)`,
              }}
            />

            {steps.map((s, i) => {
              const reversed = i % 2 === 1;
              const isActive = i === active;
              const isPast = i < active;
              return (
                <li
                  key={s.id}
                  id={s.id}
                  data-state={isActive ? "active" : isPast ? "past" : "upcoming"}
                  // Reserve room for sticky pill strip on mobile + main nav on desktop
                  className="relative grid scroll-mt-32 grid-cols-12 gap-x-6 gap-y-4 pb-12 last:pb-0 sm:pb-16 lg:scroll-mt-28 lg:gap-x-10"
                >
                  {/* Marker dot — sits on the spine */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-3 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 sm:left-3.5 lg:left-1/2",
                      isActive
                        ? "border-accent bg-accent"
                        : isPast
                          ? "border-accent bg-paper"
                          : "border-rule-strong bg-paper"
                    )}
                  />

                  {/* Image side */}
                  <div
                    className={cn(
                      "col-span-12 pl-8 sm:pl-10 lg:pl-0",
                      reversed
                        ? "lg:col-span-6 lg:order-2 lg:pl-10"
                        : "lg:col-span-6 lg:order-1 lg:pr-10"
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-[16/10] w-full overflow-hidden rounded-sm transition-opacity duration-500",
                        !isActive && !isPast && "opacity-80"
                      )}
                    >
                      <Image
                        src={s.img}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="photo-soft object-cover"
                      />
                    </div>
                  </div>

                  {/* Text side */}
                  <div
                    className={cn(
                      "col-span-12 pl-8 sm:pl-10 lg:pl-0",
                      reversed
                        ? "lg:col-span-6 lg:order-1 lg:pr-10 lg:text-right"
                        : "lg:col-span-6 lg:order-2 lg:pl-10"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-baseline gap-4",
                        reversed && "lg:justify-end"
                      )}
                    >
                      <span
                        className={cn(
                          "serif tnum text-[42px] font-semibold leading-none tracking-tight transition-colors duration-500 sm:text-[52px]",
                          isActive || isPast ? "text-accent" : "text-ink-faint"
                        )}
                      >
                        {s.n}
                      </span>
                      <span className="mono text-[11px] uppercase tracking-wide text-ink-soft">
                        {s.days}
                      </span>
                    </div>
                    <h3 className="serif mt-3 text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">
                      {s.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]",
                        reversed && "lg:ml-auto"
                      )}
                    >
                      {s.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
