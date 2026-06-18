import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

/**
 * Opening statement — type-forward, no photo. Depth comes from the hero-wash
 * base plus two soft accent/sage color glows, so the serif headline leads.
 * No looping motion (the glows are static; no scroll-bound work).
 */
export function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Color-wash depth instead of a photo. Static, blurred, behind content. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[12%] -top-[30%] h-[65vh] w-[65vh] rounded-full bg-accent/12 blur-[110px]" />
        <div className="absolute -bottom-[35%] left-[-8%] h-[55vh] w-[55vh] rounded-full bg-sage/20 blur-[120px]" />
      </div>

      <Container>
        <div className="relative max-w-5xl">
          <Eyebrow>Studio dixhitale · Tiranë</Eyebrow>

          <h1 className="serif mt-7 text-balance text-[clamp(2.8rem,6.4vw,5.5rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-ink">
            Faqe interneti për bizneset shqiptare — strukturë e qartë,{" "}
            <span className="italic text-accent">fotografi të zgjedhura me kujdes</span> dhe
            komunikim i drejtpërdrejtë.
          </h1>

          <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
            Domain, hosting dhe mirëmbajtje — të organizuara mirë, me pako të thjeshta.
            Më poshtë gjen disa punë që tregojnë stilin tonë.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#kontakt"
              className="mono inline-flex h-12 items-center gap-3 bg-accent px-6 text-[11px] uppercase tracking-[0.1em] text-paper shadow-sm shadow-accent/25 transition-opacity hover:opacity-90"
            >
              Nis një projekt <span aria-hidden>→</span>
            </a>
            <a
              href="#cmimet"
              className="mono link-underline text-[11px] uppercase tracking-[0.12em] text-ink"
            >
              Shiko çmimet <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
