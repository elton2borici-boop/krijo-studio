import Image from "next/image";
import { Container } from "./ui/Container";

/**
 * Opening story only — navigation lives in Navbar.
 * No mini-indexes, marquee, or looping motion (persistent scroll lag on phones).
 */
export function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-32">
      {/* Right-half image, faded into the paper so it reads as a calm backdrop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] lg:block"
      >
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1300&q=80"
          alt=""
          fill
          sizes="60vw"
          className="photo-soft object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper from-[6%] via-paper/60 via-[54%] to-paper/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/55 via-transparent to-paper/55" />
      </div>

      <Container>
        <div className="relative max-w-2xl">
          <p className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Studio dixhitale · Tiranë
          </p>

          <h1 className="serif mt-7 text-balance text-[clamp(2.3rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-ink">
            Faqe interneti për bizneset shqiptare — strukturë e qartë,{" "}
            <span className="italic text-accent">fotografi e kujdesshme</span> dhe komunikim i
            drejtpërdrejtë.
          </h1>

          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            Domain, hosting dhe mirëmbajtje — të organizuara mirë dhe pa surpriza. Pakot janë të
            thjeshta, me çmime të hapura. Nëse nuk di nga t’ia nisësh, më poshtë gjen disa punë
            që tregojnë stilin tonë.
          </p>

          <div className="mt-9">
            <a
              href="#kontakt"
              className="mono inline-flex h-12 items-center gap-3 bg-accent px-6 text-[11px] uppercase tracking-[0.1em] text-paper shadow-sm shadow-accent/25 transition-opacity hover:opacity-90"
            >
              Nis një projekt <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
