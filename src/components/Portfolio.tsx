import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Compact showcase: three illustrative mini-sites rendered as styled mocks
 * (real micro-copy, not grey skeletons) inside small browser frames.
 * Pure CSS/text — no images, no client JS. Horizontal snap-scroll on mobile.
 */

type Work = {
  id: string;
  domain: string;
  tag: string;
  title: string;
  caption: string;
  preview: React.ReactNode;
};

function BrowserFrame({
  domain,
  children,
}: {
  domain: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-canvas-raised shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)] transition-[transform,box-shadow,border-color] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-accent/40 group-hover:shadow-[0_22px_50px_-20px_rgba(31,95,191,0.28)]">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <div className="min-w-0 flex-1 truncate rounded border border-hairline bg-white px-2.5 py-1 mono text-[9px] tracking-wide text-fg-muted">
          https://{domain}
        </div>
      </div>
      <div className="aspect-[4/3] overflow-hidden border-t border-hairline bg-white">
        {/* Inner layer zooms slightly while the frame lifts — a subtle parallax. */}
        <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Mock 1 — gastronomi: foto-first, menu e lexueshme, rezervim i dukshëm. */
function GastroPreview() {
  return (
    <div className="flex h-full flex-col bg-[#faf6ef] text-[#241d15]">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="serif text-[11px] font-semibold tracking-tight">Bukë &amp; Verë</span>
        <span className="flex items-center gap-2.5 text-[6.5px] uppercase tracking-[0.12em] text-[#241d15]/60">
          <span>Menuja</span>
          <span>Historia</span>
          <span className="rounded-sm bg-[#8c3a22] px-1.5 py-0.5 text-white">Rezervo</span>
        </span>
      </div>
      <div className="relative mx-3 flex h-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#3d2c1e] via-[#5a3f28] to-[#2b1f15] text-center">
        <span className="serif text-[13px] font-semibold leading-tight text-[#f3e9da]">
          Kuzhinë shqiptare,
          <br />
          me zjarr të ngadaltë.
        </span>
        <span className="mt-1 text-[6px] uppercase tracking-[0.2em] text-[#f3e9da]/70">
          Tiranë · që nga 2012
        </span>
      </div>
      <div className="flex-1 px-4 pt-2.5">
        <div className="flex items-baseline justify-between border-b border-[#241d15]/15 pb-1">
          <span className="text-[7.5px] font-semibold uppercase tracking-[0.14em]">Menuja e ditës</span>
          <span className="text-[6.5px] text-[#8c3a22]">Shiko të plotën →</span>
        </div>
        {[
          ["Tavë kosi me mish qengji", "9.50 €"],
          ["Fërgesë tiranase", "7.00 €"],
          ["Byrek me spinaq, i shtëpisë", "3.50 €"],
        ].map(([dish, price]) => (
          <div key={dish} className="flex items-baseline justify-between py-[3px] text-[7px]">
            <span>{dish}</span>
            <span className="tnum font-semibold text-[#8c3a22]">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Mock 2 — profesion serioz: tipografi e qetë, shërbime të qarta, takim i lehtë. */
function LawPreview() {
  return (
    <div className="flex h-full flex-col bg-[#f4f4f1] text-[#1a2420]">
      <div className="flex items-center justify-between border-b border-[#1a2420]/12 px-4 py-2.5">
        <span className="serif text-[10.5px] font-semibold tracking-tight">
          Avokatura <span className="text-[#3c5a4c]">Arta</span>
        </span>
        <span className="rounded-sm border border-[#1a2420]/25 px-1.5 py-0.5 text-[6.5px] uppercase tracking-[0.12em]">
          Cakto takim
        </span>
      </div>
      <div className="px-4 pt-3">
        <span className="text-[6px] uppercase tracking-[0.2em] text-[#3c5a4c]">
          Studio ligjore · Tiranë
        </span>
        <p className="serif mt-1 text-[12px] font-semibold leading-snug">
          Këshillim i qartë,
          <br />
          pa zhargon ligjor.
        </p>
      </div>
      <div className="mt-2.5 grid flex-1 grid-cols-2 gap-1.5 px-4 pb-3">
        {[
          ["E drejta civile", "Pronësi, trashëgimi, dëmshpërblime"],
          ["Kontratat", "Hartim dhe rishikim për biznese"],
          ["E drejta familjare", "Me përkujdes dhe diskrecion"],
          ["Regjistrim biznesi", "NIPT, licenca, përfaqësim"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-sm bg-white p-2 shadow-[0_1px_3px_rgba(26,36,32,0.08)]">
            <span className="block text-[7px] font-semibold">{t}</span>
            <span className="mt-0.5 block text-[6px] leading-snug text-[#1a2420]/60">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Mock 3 — dyqan online: blerje e shpejtë nga telefoni, çmime të dukshme. */
function ShopPreview() {
  return (
    <div className="flex h-full flex-col bg-white text-[#221c18]">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="serif text-[10.5px] font-semibold tracking-tight">Atelier № 12</span>
        <span className="flex items-center gap-2 text-[6.5px] uppercase tracking-[0.12em] text-[#221c18]/60">
          <span>Koleksioni</span>
          <span className="relative">
            Shporta
            <span className="absolute -right-2 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#bd4f2c] text-[5px] font-bold text-white">
              2
            </span>
          </span>
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-1.5 px-4 pb-2">
        {[
          ["Çanta 'Drini'", "45 €", "#d9c7b2"],
          ["Shall leshi", "28 €", "#b9a18a"],
          ["Rrip lëkure", "32 €", "#8a6f57"],
          ["Portofol 'Mali'", "38 €", "#c3b39e"],
          ["Doreza dimri", "24 €", "#a08d76"],
          ["Çelësmbajtëse", "12 €", "#d4c0a8"],
        ].map(([name, price, tone]) => (
          <div key={name} className="flex flex-col">
            <div className="aspect-square rounded-sm" style={{ backgroundColor: tone }} />
            <span className="mt-1 truncate text-[6.5px] font-medium">{name}</span>
            <span className="tnum text-[6.5px] font-semibold text-[#bd4f2c]">{price}</span>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-3 rounded-sm bg-[#221c18] py-1.5 text-center text-[6.5px] uppercase tracking-[0.16em] text-white">
        Bli tani — dërgesa në 24 orë
      </div>
    </div>
  );
}

const works: Work[] = [
  {
    id: "gastro",
    domain: "buke-vere.al",
    tag: "Gastronomi",
    title: "Restorant në Tiranë",
    caption: "Menu e lexueshme në telefon dhe rezervim i dukshëm kudo.",
    preview: <GastroPreview />,
  },
  {
    id: "ligj",
    domain: "avokatura-arta.al",
    tag: "Profesion i lirë",
    title: "Studio ligjore",
    caption: "Tipografi e qetë dhe shërbime të ndara qartë — besim që në lexim të parë.",
    preview: <LawPreview />,
  },
  {
    id: "dyqan",
    domain: "atelier12.al",
    tag: "E-commerce",
    title: "Dyqan artizanal online",
    caption: "Produkte, çmime dhe blerje e shpejtë — e menduar së pari për telefonin.",
    preview: <ShopPreview />,
  },
];

export function Portfolio() {
  return (
    <section id="punet" className="relative border-t border-hairline py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="punë të përzgjedhura"
          title={
            <>
              Tri struktura, tri qëllime{" "}
              <span className="text-gradient">të ndryshme.</span>
            </>
          }
          lede="Pamje ilustrative që tregojnë si e ndërtojmë strukturën sipas qëllimit të biznesit. Portofolin e plotë, me faqe reale klientësh, e ndajmë me kërkesë."
        />

        {/* Desktop: 3-up grid. Mobile: horizontal snap-scroll, one card ~85vw. */}
        <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0">
          {works.map((w) => (
            <article
              key={w.id}
              className="group w-[82vw] max-w-[360px] shrink-0 snap-start lg:w-auto lg:max-w-none"
            >
              <BrowserFrame domain={w.domain}>{w.preview}</BrowserFrame>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="serif text-[18px] font-semibold tracking-tight text-fg">
                  {w.title}
                </h3>
                <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-accent">
                  {w.tag}
                </span>
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
                {w.caption}
              </p>
            </article>
          ))}
        </div>

        {/* Swipe affordance — see the matching hint in Pricing. */}
        <p
          aria-hidden
          className="mt-3 flex items-center justify-center gap-2 text-[12px] font-medium text-fg-muted lg:hidden"
        >
          <span>←</span> rrëshqit për të tre shembujt <span>→</span>
        </p>

        <div className="mt-8 flex justify-end">
          <a
            href="#kontakt"
            className="link-underline text-[13.5px] font-medium text-fg"
          >
            Bisedoni për një ide të ngjashme →
          </a>
        </div>
      </Container>
    </section>
  );
}
