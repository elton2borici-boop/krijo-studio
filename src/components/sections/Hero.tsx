import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { EdgeFade } from "@/components/ui/EdgeFade";
import { packages } from "@/content/packages";
import { HeroWall } from "./HeroWall";
import { LawPreview } from "./SiteMocks";

/** Cheapest one-off build, so the claim follows the price list. */
const fromPrice = Math.min(
  ...packages.filter((p) => !p.monthly).map((p) => p.price)
);

/* Facts already promised elsewhere on the page (pricing, FAQ, contact). */
const proof = [
  `Nga €${fromPrice}`,
  "Dorëzim zakonisht 5–7 ditë",
  "Përgjigje brenda 24 orësh",
];

/**
 * Navy hero: the headline on the left, an example site on the right.
 *
 * The example is one of the illustrative mocks from the format picker (the
 * copy there says they are illustrations) — the law office, so it doesn't
 * repeat the picker's default right below — shown in a plain browser window
 * so the first screen answers "what would I get?" with a picture of it.
 */
export function Hero() {
  return (
    <section className="tone-ink relative isolate pt-32 pb-52 sm:pt-40 sm:pb-64 lg:pb-68">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <HeroWall />
      </div>
      <EdgeFade side="bottom" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
              Krijojmë faqe që <span className="text-accent">punojnë.</span>
            </h1>

            <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
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

            <ul className="mt-10 flex flex-col gap-1 text-sm text-fg-muted sm:flex-row sm:gap-5">
              {proof.map((p, i) => (
                <li key={p} className="flex items-center gap-5">
                  {i > 0 && (
                    <span aria-hidden className="hidden text-fg-faint sm:inline">
                      ·
                    </span>
                  )}
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div aria-hidden className="flex justify-center lg:col-span-6 lg:justify-end">
            <div className="w-full max-w-[360px] sm:w-auto sm:max-w-none">
              <div className="hero-shot overflow-hidden rounded-lg border border-white/10 bg-[#f3f1ec] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]">
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-black/15" />
                    <span className="size-2 rounded-full bg-black/15" />
                    <span className="size-2 rounded-full bg-black/15" />
                  </span>
                  <span className="min-w-0 flex-1 truncate rounded border border-black/10 bg-white px-2.5 py-1 text-[9px] text-[#4e535c]">
                    avokatura-arta.al
                  </span>
                </div>
                <div className="aspect-[4/3] overflow-hidden border-t border-black/10 bg-white">
                  <LawPreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
