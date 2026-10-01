"use client";

import { useState } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { WorkCard } from "./WorkCard";
import {
  GastroPreview,
  LawPreview,
  ShopPreview,
  StudioPreview,
} from "./SiteMocks";
import { contactHref, type FormatId, type PackageId } from "@/lib/offers";
import { cn } from "@/lib/utils";

type FormatItem = {
  n: string;
  id: FormatId;
  title: string;
  tag: string;
  text: string;
  forWhom: string;
  scope: string;
  time: string;
  packageId: PackageId;
  cta: string;
  bullets: string[];
  /** Worked example of this structure. The pictures are models of the
      structure, not client projects — the copy says so. */
  example: {
    domain: string;
    label: string;
    caption: string;
    preview: React.ReactNode;
  };
};

const formats: FormatItem[] = [
  {
    n: "01",
    id: "nje-faqe",
    title: "Një faqe e vetme",
    tag: "One‑pager",
    text:
      "Një faqe: çfarë ofron, fotot, orari dhe një buton që çon te telefoni, rezervimi ose WhatsApp. Nuk ka menu me faqe të tjera.",
    forWhom: "Kafene, evente, një shërbim i vetëm.",
    scope:
      "Zakonisht Faqja + Domain · €399. Nëse e ke domain-in: Vetëm Faqja · €299.",
    time: "5 ditë pune, nëse tekstet dhe fotot janë gati.",
    packageId: "faqja-plus-domain",
    cta: "Dua një faqe të vetme",
    bullets: [
      "4–6 seksione, në një faqe të vetme",
      "Një veprim kryesor: telefono, rezervim ose porosi",
      "Hapet së pari në telefon",
    ],
    example: {
      domain: "buke-vere.al",
      label: "Restorant në Tiranë",
      caption: "Menu e lexueshme në telefon dhe rezervim i dukshëm kudo.",
      preview: <GastroPreview />,
    },
  },
  {
    n: "02",
    id: "nenfaqe",
    title: "Uebsajt me nënfaqe",
    tag: "Klasik",
    text:
      "Kreu, shërbimet, rreth nesh dhe kontakti. Secila faqe përgjigjet për një pyetje — e duhur kur ke disa shërbime dhe klientët kërkojnë secilin veç e veç.",
    forWhom: "Studio, klinika dhe zyra me 2–6 shërbime.",
    scope:
      "Faqja + Domain · €399, deri në 5–7 faqe. Blog dhe mirëmbajtje: Gjithçka · €799.",
    time: "7 ditë pune, me materialet gati.",
    packageId: "faqja-plus-domain",
    cta: "Dua faqe të ndara",
    bullets: [
      "5–7 faqe: kryefaqe, shërbime, rreth nesh, kontakt",
      "Një faqe për çdo shërbim, me titull që lexohet nga Google",
      "Telefon, email dhe formular në kontakt",
    ],
    example: {
      domain: "avokatura-arta.al",
      label: "Studio ligjore",
      caption: "Çdo shërbim është faqe më vete, jo një listë në kryefaqe.",
      preview: <LawPreview />,
    },
  },
  {
    n: "03",
    id: "portfolio",
    title: "Portfolio",
    tag: "Vizual",
    text:
      "Galeria është faqja. Teksti është i shkurtër: kush je, çfarë bën, si të të shkruajnë. Fotot ngarkohen në madhësi që hapen shpejt në telefon.",
    forWhom: "Fotografë, arkitektë, studio krijuese.",
    scope:
      "Faqja + Domain · €399. Nëse e ke domain-in: Vetëm Faqja · €299.",
    time: "7 ditë pune. Më gjatë nëse fotot i zgjedhim bashkë.",
    packageId: "faqja-plus-domain",
    cta: "Dua një portfolio",
    bullets: [
      "Galeri me deri në 4 kategori",
      "Faqe kontakti me telefon dhe email",
      "Pa tekst të gjatë mbi fotot",
    ],
    example: {
      domain: "elira-nushi.al",
      label: "Portfolio fotografie",
      caption: "Galeria mban faqen; teksti rri mënjanë dhe nuk e pengon.",
      preview: <StudioPreview />,
    },
  },
  {
    n: "04",
    id: "dyqan",
    title: "Dyqan online",
    tag: "E‑commerce",
    text:
      "Katalog me çmim, shportë dhe pagesë në faqe. Nuk është një faqe me buton që të çon te Instagram për të porositur.",
    forWhom: "Marka që shesin produkte direkt, pa marketplace.",
    scope:
      "Nuk hyn te €299 ose €399. E nisim nga pakoja Gjithçka · €799 dhe e konfirmojmë me ofertë para punës.",
    time: "2–3 javë, jo 7 ditë.",
    packageId: "premium",
    cta: "Dua një dyqan",
    bullets: [
      "Produkt, çmim, stok dhe porosi në një panel",
      "Pagesë me kartë ose transfertë",
      "Çmimi i saktë shkruhet para se të nisim",
    ],
    example: {
      domain: "atelier12.al",
      label: "Dyqan artizanal online",
      caption: "Çmimi dhe butoni i blerjes janë në kartën e produktit.",
      preview: <ShopPreview />,
    },
  },
];

export function Format() {
  const [selected, setSelected] = useState(0);
  const current = formats[selected];

  return (
    <section id="formatet" className="relative scroll-mt-28 bg-canvas-raised py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="formatet"
          title={
            <>
              Katër lloje faqesh.{" "}
              <span className="text-gradient">Zgjidh njërën.</span>
            </>
          }
          lede="Secila ka një shembull, një afat dhe pakon ku hyn. Pamjet janë modele të strukturës, jo projekte klientësh."
        />

        <div className="mt-8 grid grid-cols-12 gap-x-8 gap-y-8 sm:mt-10 lg:gap-x-12">
          {/* Picker — left column on desktop, full width on mobile */}
          <ol
            aria-label="Formatet e mundshme"
            className="col-span-12 flex flex-col gap-2 lg:col-span-5 lg:gap-3"
          >
            {formats.map((f, i) => {
              const isActive = i === selected;
              return (
                <li key={f.n}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="formatet-preview"
                    onClick={() => setSelected(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 min-h-[64px]",
                      isActive
                        ? "glass-strong text-fg ring-1 ring-accent/40"
                        : "glass text-fg-muted hover:text-fg"
                    )}
                  >
                    <span
                      className={cn(
                        "serif tnum text-[28px] font-bold leading-none tracking-tight",
                        isActive ? "text-gradient" : "text-fg-faint"
                      )}
                    >
                      {f.n}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[11.5px] font-medium text-fg-muted">
                        {f.tag}
                      </span>
                      <span className="serif text-[18px] font-bold leading-tight tracking-tight text-fg">
                        {f.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "transition-transform duration-300",
                        isActive ? "translate-x-0 text-accent" : "-translate-x-1 text-fg-muted group-hover:translate-x-0"
                      )}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Preview panel — right column on desktop, below picker on mobile */}
          <div
            id="formatet-preview"
            aria-live="polite"
            className="col-span-12 flex flex-col gap-5 lg:col-span-7 lg:sticky lg:top-24"
          >
            <p className="text-[15px] leading-relaxed text-fg-muted">
              {current.text}
            </p>

            <div className="grid grid-cols-12 gap-x-6 gap-y-5">
              <div className="col-span-12 sm:col-span-6">
                {/* key: forces a fresh WorkCard per format so its <dialog>
                    never holds the previous example's markup. */}
                <WorkCard
                  key={current.example.domain}
                  domain={current.example.domain}
                  tag={current.tag}
                  title={current.example.label}
                  caption={current.example.caption}
                >
                  {current.example.preview}
                </WorkCard>
              </div>

              <ul className="col-span-12 flex flex-col gap-2 sm:col-span-6 sm:self-center">
                {current.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-[14px] leading-relaxed text-fg"
                  >
                    <span aria-hidden className="text-accent">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="flex flex-col gap-2.5 text-[13.5px] leading-relaxed text-fg">
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                  Për kë
                </dt>
                <dd className="mt-0.5">{current.forWhom}</dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                  Afati
                </dt>
                <dd className="mt-0.5">{current.time}</dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                  Çmimi
                </dt>
                <dd className="mt-0.5">{current.scope}</dd>
              </div>
            </dl>

            <a
              href={contactHref({ pako: current.packageId, format: current.id })}
              className="inline-flex h-12 w-fit items-center gap-2 rounded-[10px] bg-accent-deep px-5 text-[14px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(31,95,191,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {current.cta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
