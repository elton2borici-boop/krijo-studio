import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { packages } from "@/content/packages";
import { HeroWall } from "./HeroWall";
import { GastroPreview, LawPreview, ShopPreview } from "./SiteMocks";

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
 * Full-bleed brand-blue hero: headline left, a fanned stack of example sites
 * right. `tone-accent` re-themes everything inside (white type, inverted
 * buttons); the drifting wall turns into a white-line texture on the blue.
 */
export function Hero() {
  return (
    <section className="tone-accent relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 opacity-60">
        <HeroWall />
      </div>
      {/* Deepen the left side so the headline sits on calm colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_90%_at_15%_40%,var(--canvas)_35%,transparent_80%)]"
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-accent-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-fg" />
              Studio krijuese · Tiranë
            </p>

            <h1 className="mt-8 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-fg sm:text-7xl xl:text-8xl">
              Krijojmë faqe që{" "}
              <span className="relative whitespace-nowrap text-accent">
                punojnë.
                <svg
                  aria-hidden
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent/60 sm:-bottom-3"
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
              <ButtonLink href="#kontakt" className="shadow-raised">
                Nis një projekt <span aria-hidden>→</span>
              </ButtonLink>
              <ButtonLink
                href="#cmimet"
                variant="secondary"
                className="bg-transparent hover:bg-accent-soft"
              >
                Shiko çmimet <span aria-hidden>↓</span>
              </ButtonLink>
            </div>

            <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-hairline pt-8">
              {proof.map((p) => (
                <div key={p.value} className="flex flex-col-reverse gap-1">
                  <dt className="text-xs leading-snug text-fg-muted sm:text-sm">
                    {p.label}
                  </dt>
                  <dd className="font-display text-2xl font-bold tabular-nums text-fg sm:text-3xl">
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Fanned stack of illustrative sites — the kinds of pages we build.
              Decorative here; the format picker below presents them properly. */}
          <div
            aria-hidden
            className="tone-paper relative mx-auto aspect-[5/4] w-full max-w-lg lg:col-span-6 lg:max-w-none"
          >
            <div className="absolute top-[6%] left-0 w-[62%] -rotate-6 opacity-95">
              <BrowserFrame domain="avokatura-arta.al" interactive={false}>
                <LawPreview />
              </BrowserFrame>
            </div>
            <div className="absolute top-0 right-0 w-[60%] rotate-[5deg] opacity-95">
              <BrowserFrame domain="atelier12.al" interactive={false}>
                <ShopPreview />
              </BrowserFrame>
            </div>
            <div className="absolute bottom-0 left-1/2 w-[68%] -translate-x-1/2 shadow-overlay">
              <BrowserFrame domain="buke-vere.al" interactive={false}>
                <GastroPreview />
              </BrowserFrame>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
