import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HeroWall } from "./HeroWall";

/** Type-forward hero over a slowly drifting wall of page layouts. */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-canvas pt-28 pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <HeroWall />
      </div>

      {/* Ramps into the next section's surface so there is no hard seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-canvas-raised"
      />

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Studio krijuese · Tiranë
          </p>

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Krijojmë faqe që <span className="text-accent">punojnë.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
            Zhvillim, hosting dhe mirëmbajtje — gjithçka në një vend.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="#kontakt">
              Nis një projekt <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink href="#cmimet" variant="secondary">
              Shiko çmimet <span aria-hidden>↓</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
