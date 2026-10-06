import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { packages } from "@/content/packages";
import { HeroWall } from "./HeroWall";

/** Cheapest one-off build, so the claim follows the price list. */
const fromPrice = Math.min(
  ...packages.filter((p) => !p.monthly).map((p) => p.price)
);

/* Facts already promised elsewhere on the page (pricing, FAQ, contact). */
const proof = [
  { value: `€${fromPrice}`, label: "çmimi nisës për një faqe" },
  { value: "5–7 ditë", label: "dorëzim i zakonshëm" },
  { value: "24 orë", label: "kohë përgjigjeje" },
];

/** Type-forward hero over a slowly drifting wall of page layouts. */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <HeroWall />
      </div>
      <div
        aria-hidden
        className="dot-texture pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      {/* Static accent wash behind the headline — depth without motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,var(--accent-soft),transparent_70%)]"
      />
      {/* Ramps into the next section's surface so there is no hard seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-canvas-raised"
      />

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted shadow-card backdrop-blur-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Studio krijuese · Tiranë
          </p>

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Krijojmë faqe që{" "}
            <span className="relative whitespace-nowrap text-accent">
              punojnë.
              {/* Hand-drawn underline: the accent's one flourish. */}
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent/40 sm:-bottom-3"
              >
                <path
                  d="M3 10C60 4 140 2 297 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
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

          <dl className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-hairline rounded-card border border-hairline bg-surface/80 shadow-card backdrop-blur-sm">
            {proof.map((p) => (
              <div key={p.value} className="flex flex-col-reverse gap-1 px-3 py-4 sm:px-6 sm:py-5">
                <dt className="text-xs leading-snug text-fg-muted">{p.label}</dt>
                <dd className="font-display text-xl font-bold tabular-nums text-fg sm:text-2xl">
                  {p.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
