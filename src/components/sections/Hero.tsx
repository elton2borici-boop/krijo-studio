import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { EdgeFade } from "@/components/ui/EdgeFade";
import { HeroWall } from "./HeroWall";
import { HeroCreature } from "./HeroCreature";

/** Navy hero: a centered headline over the drifting wall, with koi swimming
    between the two. */
export function Hero() {
  return (
    <section className="tone-ink relative isolate pt-32 pb-52 sm:pt-40 sm:pb-64 lg:pb-68">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <HeroWall />
        <HeroCreature />
      </div>
      <EdgeFade side="bottom" />

      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-8xl">
            Krijojmë faqe që <span className="text-accent">punojnë.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
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
