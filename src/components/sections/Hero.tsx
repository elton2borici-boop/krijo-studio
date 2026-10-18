import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { packages } from "@/content/packages";
import { LawPreview } from "./SiteMocks";

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

/**
 * Navy hero: the headline on the left, an example site on the right.
 *
 * The example is one of the illustrative mocks from the format picker (the
 * copy there says they are illustrations) — the law office, so it doesn't repeat
 * the picker's default right below — shown in a browser window so the
 * first screen answers "what would I get?" with a picture of it. The chips
 * around it are taken from the base package's feature list, so they hold for
 * every site the studio builds.
 */
export function Hero() {
  return (
    <section className="tone-ink relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32">
      <div aria-hidden className="ink-glow pointer-events-none absolute inset-0 -z-20" />
      <div aria-hidden className="grid-texture pointer-events-none absolute inset-0 -z-10" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Studio krijuese · Tiranë
            </p>

            <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
              Krijojmë faqe që{" "}
              <span className="relative whitespace-nowrap text-accent">
                punojnë.
                {/* Hand-drawn underline: the accent's one flourish. */}
                <svg
                  aria-hidden
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent/50 sm:-bottom-3"
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

            <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
              Zhvillim, hosting dhe mirëmbajtje — gjithçka në një vend.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#kontakt">
                Nis një projekt <span aria-hidden>→</span>
              </ButtonLink>
              <ButtonLink href="#cmimet" variant="secondary">
                Shiko çmimet <span aria-hidden>↓</span>
              </ButtonLink>
            </div>

            <dl className="mt-14 grid max-w-xl grid-cols-3 divide-x divide-hairline rounded-card border border-hairline bg-surface/60">
              {proof.map((p) => (
                <div key={p.value} className="flex flex-col-reverse gap-1 px-3 py-4 sm:px-5">
                  <dt className="text-xs leading-snug text-fg-muted">{p.label}</dt>
                  <dd className="font-display text-xl font-bold tabular-nums text-fg sm:text-2xl">
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div aria-hidden className="relative flex justify-center lg:col-span-6 lg:justify-end">
            {/* Light pooling under the window — a gradient, not a blur filter,
                so it costs nothing to repaint. */}
            <div className="absolute -inset-x-10 top-0 -bottom-16 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_50%_55%,rgb(47_107_208/0.5),transparent_70%)]" />

            <div className="hero-tilt relative w-full max-w-[360px] sm:w-auto sm:max-w-none">
              <div className="hero-shot overflow-hidden rounded-xl border border-white/15 bg-[#f3f1ec] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.04)]">
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-[#ff5f57]" />
                    <span className="size-2 rounded-full bg-[#febc2e]" />
                    <span className="size-2 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="min-w-0 flex-1 truncate rounded-md border border-black/10 bg-white px-2.5 py-1 text-[9px] text-[#4e535c]">
                    https://avokatura-arta.al
                  </span>
                </div>
                <div className="aspect-[4/3] overflow-hidden border-t border-black/10 bg-white">
                  <LawPreview />
                </div>
              </div>

              {/* Placed at the window's edges, clear of its prices and names. */}
              <Chip className="float -right-5 top-5 hidden sm:flex">
                Plotësisht responsive
              </Chip>
              <Chip className="float float-delay -left-8 bottom-6 hidden sm:flex">
                Dizajn unik, kod nga zero
              </Chip>
              <Chip className="float -bottom-5 right-14 hidden sm:flex">
                SEO bazë
              </Chip>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Chip({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`absolute items-center gap-2 rounded-full border border-white/70 bg-white px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-[#15181d] shadow-[0_12px_30px_-10px_rgb(0_0_0/0.55)] ${className}`}
    >
      <span className="grid size-4 place-items-center rounded-full bg-[#1f5fbf] text-white">
        <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 6.2 2.2 2.2 4.8-4.8" />
        </svg>
      </span>
      {children}
    </span>
  );
}
