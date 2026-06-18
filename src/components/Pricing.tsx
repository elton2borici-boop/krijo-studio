"use client";

import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  n: string;
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
    n: "I",
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
    cta: "Zgjidh I",
  },
  {
    id: "faqja-plus-domain",
    n: "II",
    name: "Faqja + Domain",
    tagline: "Gati për nisje",
    price: "399",
    unit: "€",
    note: "Një pagesë e vetme. Domain & email të përfshira për 1 vit.",
    description: "Gjithçka për të nisur. Asgjë tjetër për të blerë.",
    features: [
      "Gjithçka nga Pakoja I",
      "Domain falas vitin e parë (.al/.com)",
      "Email profesional @biznesi-yt",
      "DNS i konfiguruar plotësisht",
      "Integrim me Instagram & Facebook",
      "Dorëzim brenda 5 ditësh",
    ],
    cta: "Zgjidh II",
    starred: true,
  },
  {
    id: "mirembajtje",
    n: "III",
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
    cta: "Aktivizo III",
  },
  {
    id: "premium",
    n: "IV",
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
    cta: "Zgjidh IV",
  },
];

export function Pricing() {
  return (
    <section id="cmimet" className="relative border-t border-rule py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="Çmimet"
          size="lg"
          title={
            <>
              Katër pako. <span className="italic">Çmime të hapura.</span>
            </>
          }
          lede="Në Euro, me TVSH të përfshirë. Pa kosto të fshehura — dhe nëse të duhet diçka tjetër, bëjmë ofertë të personalizuar."
        />

        {/* Rate card — static DOM (was Framer-motion whileInView → scroll jank) */}
        <div className="mt-10 border-t border-b border-ink/70">
          <div className="hidden grid-cols-4 border-b border-rule lg:grid">
            {plans.map((p) => (
              <div
                key={`h-${p.id}`}
                className={cn(
                  "relative flex items-start justify-between border-l border-rule px-6 py-4 first:border-l-0",
                  p.starred && "bg-paper-soft"
                )}
              >
                <span className="mono text-[10px] uppercase text-ink-soft">
                  {p.tagline}
                </span>
                {p.starred && (
                  <span className="mono inline-flex items-center gap-1 text-[10px] uppercase text-ink">
                    ★ Më e zgjedhura
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/tablet: swipeable snap row (cards peek to invite the swipe).
              Desktop: 4-column rate card. */}
          <div className="flex snap-x snap-mandatory overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible">
            {plans.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "group flex w-[84vw] shrink-0 snap-center flex-col border-l border-rule px-5 py-6 transition-colors duration-300 first:border-l-0 sm:w-[420px] lg:w-auto lg:py-8 lg:px-6",
                  p.starred
                    ? "bg-paper-soft"
                    : "hover:bg-paper-soft/55"
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="serif tnum text-[34px] leading-none text-ink-faint">
                    {p.n}
                  </span>
                  <h3 className="serif text-[21px] font-semibold tracking-tight text-ink">
                    {p.name}
                  </h3>
                </div>

                <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-y border-rule py-3.5">
                  <span className="serif tnum text-[clamp(34px,5vw,44px)] font-semibold leading-none tracking-tight text-accent">
                    {p.price}
                  </span>
                  <span className="mono text-[12px] uppercase text-ink-soft">
                    {p.unit}
                  </span>
                </div>
                <p className="mono mt-2.5 text-[10px] uppercase leading-[1.7] text-ink-soft">
                  {p.note}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-[13.5px] leading-snug text-ink"
                    >
                      <span aria-hidden className="font-serif text-ink-faint">
                        +
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <a
                    href="#kontakt"
                    className={cn(
                      "mono inline-flex h-11 w-full items-center justify-between border px-4 text-[11px] uppercase tracking-wider outline-offset-2 transition-all duration-300 lg:hover:scale-[1.02] lg:hover:shadow-md lg:hover:shadow-ink/10",
                      p.starred
                        ? "border-ink bg-ink text-paper active:opacity-90 lg:hover:opacity-90"
                        : "border-ink/40 text-ink active:bg-ink active:text-paper lg:hover:bg-ink lg:hover:text-paper"
                    )}
                  >
                    <span>{p.cta}</span>
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="mono text-[11px] uppercase leading-relaxed text-ink-soft">
            * Çmimet me TVSH të përfshirë. † IBAN shqiptar, transfertë ndërkombëtare ose para në dorë.
          </p>
          <a
            href="#kontakt"
            className="mono link-underline text-[12px] uppercase text-ink"
          >
            Nuk je i sigurt? Bisedo me ne →
          </a>
        </div>
      </Container>
    </section>
  );
}
