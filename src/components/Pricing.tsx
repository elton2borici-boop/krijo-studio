"use client";

import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { CountUp } from "./ui/CountUp";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  note: string;
  description: string;
  features: string[];
  cta: string;
  starred?: boolean;
};

const plans: Plan[] = [
  {
    id: "vetem-faqja",
    name: "Vetëm Faqja",
    tagline: "Fillimi yt",
    price: "299",
    unit: "€",
    note: "Një pagesë e vetme. Pa kosto mujore.",
    description: "Ti sjell domain-in dhe hosting-un. Ne sjellim faqen.",
    features: [
      "Deri në 5 faqe të personalizuara",
      "Dizajn unik, kod nga zero",
      "Plotësisht responsive",
      "Formular kontakti",
      "SEO bazë",
      "Dorëzim brenda 7 ditësh",
    ],
    cta: "Zgjidh këtë pako",
  },
  {
    id: "faqja-plus-domain",
    name: "Faqja + Domain",
    tagline: "Gati për nisje",
    price: "399",
    unit: "€",
    note: "Një pagesë e vetme. Domain & email të përfshira për 1 vit.",
    description: "Gjithçka për të nisur. Asgjë tjetër për të blerë.",
    features: [
      "Gjithçka nga pakoja Vetëm Faqja",
      "Domain falas vitin e parë (.al/.com)",
      "Email profesional @biznesi-yt",
      "DNS i konfiguruar plotësisht",
      "Integrim me Instagram & Facebook",
      "Dorëzim brenda 5 ditësh",
    ],
    cta: "Nis me këtë pako",
    starred: true,
  },
  {
    id: "mirembajtje",
    name: "Mirëmbajtje",
    tagline: "Për faqet ekzistuese",
    price: "29",
    unit: "€/muaj",
    note: "Asnjë kontratë afatgjatë. Anulim kur të duash.",
    description: "Ti ke tashmë faqen. Ne mbajmë gjithçka në rregull.",
    features: [
      "Përditësime të rregullta",
      "Kopje rezervë ditore",
      "Monitorim 24/7",
      "Rregullim defektesh",
      "2 ndryshime përmbajtjeje/muaj",
      "Raport mujor",
    ],
    cta: "Aktivizo mirëmbajtjen",
  },
  {
    id: "premium",
    name: "Gjithçka",
    tagline: "Eksperienca e plotë",
    price: "799",
    unit: "€",
    note: "+ €39/muaj mirëmbajtje. Pa kufizim faqesh.",
    description:
      "Lansim i plotë: faqe, domain, hosting, email, SEO, mirëmbajtje.",
    features: [
      "Numër i pakufizuar faqesh",
      "Domain .al + .com (2 vjet)",
      "Hosting premium me CDN global",
      "5 email-e profesionale",
      "Mirëmbajtje 24/7 e përfshirë",
      "SEO i avancuar + Google Ads",
      "Blog / Lajme / Newsletter",
      "Linjë WhatsApp e dedikuar",
    ],
    cta: "Zgjidh këtë pako",
  },
];

export function Pricing() {
  return (
    <section
      id="cmimet"
      className="relative bg-canvas-raised py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          label="çmimet"
          size="lg"
          title={
            <>
              Katër pako. <span className="text-gradient">Çmime të hapura.</span>
            </>
          }
          lede="Në Euro, me TVSH të përfshirë. Pa kosto të fshehura — dhe nëse të duhet diçka tjetër, bëjmë ofertë të personalizuar."
        />

        {/* Cards. Mobile: swipeable snap row (cards peek). Desktop: 4-up.
            The recommended plan is scaled up and lifted out of the row; the
            other three sit on a lower surface so the eye has one target. */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:mt-16 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                // The hover-lift lives here and nowhere else. It was on four
                // different kinds of card, which made it read as decoration;
                // confined to the one section where you are actively comparing
                // and choosing, it reads as "pick me" again.
                "group card-spot relative flex w-[84vw] shrink-0 snap-center flex-col rounded-2xl p-6 transition-transform duration-300 sm:w-[400px] lg:w-auto lg:hover:-translate-y-1.5",
                p.starred
                  ? "glass-strong border-accent shadow-[0_20px_48px_-18px_rgba(31,95,191,0.35)] lg:-mt-3 lg:scale-[1.03] lg:p-7"
                  : "glass card-quiet"
              )}
            >
              {/* Accent hairline draws in on hover. Clipped to the rounded top
                  corners without an overflow-hidden that would cut the badge. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-accent to-violet transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              {p.starred && (
                <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-deep px-3 py-1 text-[10px] font-semibold tracking-[0.02em] text-white shadow-[0_4px_12px_-2px_rgba(31,95,191,0.45)]">
                  Rekomanduar për biznese të reja
                </span>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                  {p.tagline}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2.5">
                <h3 className="serif text-[21px] font-bold tracking-tight text-fg">
                  {p.name}
                </h3>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                {p.description}
              </p>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-y border-hairline py-3.5">
                <CountUp
                  value={Number(p.price)}
                  className="serif tnum text-[clamp(28px,3.8vw,36px)] font-bold leading-none tracking-tight text-gradient"
                />
                <span className="text-[13px] font-medium text-fg-muted">
                  {p.unit}
                </span>
              </div>
              <p className="mt-2.5 text-[12px] leading-[1.6] text-fg-muted">
                {p.note}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-[13.5px] leading-snug text-fg-muted"
                  >
                    <span aria-hidden className="text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <a
                  href="#kontakt"
                  className={cn(
                    "inline-flex h-11 w-full items-center justify-between rounded-[10px] px-4 text-[13px] font-semibold transition-transform duration-300 lg:hover:-translate-y-0.5",
                    p.starred
                      ? "bg-accent-deep text-white shadow-[0_0_28px_-8px_var(--color-accent)]"
                      : "border border-hairline-strong bg-white text-fg hover:border-accent hover:text-accent"
                  )}
                >
                  <span>{p.cta}</span>
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe affordance: the peeking card alone doesn't tell people the row
            scrolls, and there is no hover state on touch to hint at it. */}
        <p
          aria-hidden
          className="mt-3 flex items-center justify-center gap-2 text-[12px] font-medium text-fg-muted lg:hidden"
        >
          <span>←</span> rrëshqit për të gjitha katër pakot <span>→</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-[12.5px] leading-relaxed text-fg-muted">
            * çmimet me TVSH të përfshirë. † IBAN shqiptar, transfertë ndërkombëtare ose para në dorë.
          </p>
          <a
            href="#kontakt"
            className="link-underline text-[13.5px] font-medium text-fg"
          >
            nuk je i sigurt? bisedo me ne →
          </a>
        </div>
      </Container>
    </section>
  );
}
