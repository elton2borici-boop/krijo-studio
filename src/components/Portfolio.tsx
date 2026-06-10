import Image from "next/image";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

const works = [
  {
    id: "gastro",
    title: "Një gastronomi lokale",
    caption:
      "Strukturë e menduar për foto ushqimi, menu e lexueshme në telefon dhe thirrje të qarta për të rezervuar.",
    url: "klient-i.gastronomia.al",
    imageSrc:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Ambient restoranti me tavolina të shtruara dhe dritë të ngrohtë",
    frame: (
      <>
        {/* Hero band — gradient instead of flat grey */}
        <div className="h-24 rounded-[4px] bg-gradient-to-br from-stone-200/90 via-stone-200/60 to-stone-300/50 ring-1 ring-stone-300/40" />
        {/* Card row with internal hint structure */}
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-24 flex-1 rounded-[4px] bg-gradient-to-b from-white/95 to-stone-100/70 shadow-sm ring-1 ring-stone-200/60 ${
                i === 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="mx-2 mt-2.5 h-1.5 w-2/3 rounded-[2px] bg-stone-300/55" />
              <div className="mx-2 mt-1.5 h-1 w-1/2 rounded-[2px] bg-stone-200/55" />
              <div className="mx-2 mt-1.5 h-1 w-2/5 rounded-[2px] bg-stone-200/40" />
            </div>
          ))}
        </div>
        {/* Text lines */}
        <div className="mx-auto mt-4 max-w-[88%] space-y-1.5">
          <div className="h-2.5 w-1/3 rounded-[2px] bg-stone-300/65" />
          <div className="h-2 w-full max-w-[92%] rounded-[2px] bg-stone-200/55" />
          <div className="h-2 w-4/5 max-w-[82%] rounded-[2px] bg-stone-200/40" />
        </div>
      </>
    ),
  },
  {
    id: "prof",
    title: "Një profesion që kërkon seriozitet",
    caption:
      "Tipografi e qetë për tekste të gjata, hapësirë e organizuar për shërbimet dhe kontakte të dukshme që nuk humbasin mes dizajnit.",
    url: "studio.example.al",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Ndërtesë moderne zyrash nën dritën e mbrëmjes — ambient profesional",
    frame: (
      <>
        {/* Header row — logo placeholder + headline */}
        <div className="grid grid-cols-12 gap-3 border-b border-stone-200/70 pb-4">
          <div className="col-span-4 flex h-14 items-center justify-center rounded-[4px] bg-gradient-to-br from-white to-stone-100 shadow-sm ring-1 ring-stone-200/60">
            <div className="h-5 w-5 rounded-full bg-stone-300/55" />
          </div>
          <div className="col-span-8 space-y-1.5 pt-2">
            <div className="h-2.5 w-2/3 rounded-[2px] bg-stone-300/65" />
            <div className="h-2 w-full rounded-[2px] bg-stone-200/55" />
            <div className="h-2 w-4/5 rounded-[2px] bg-stone-200/40" />
          </div>
        </div>
        {/* Service grid — each tile has internal lines */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((x) => (
            <div
              key={x}
              className="h-20 space-y-1.5 rounded-[4px] bg-gradient-to-br from-white/95 to-stone-100/70 p-2.5 shadow-sm ring-1 ring-stone-200/55"
            >
              <div className="h-2 w-1/3 rounded-[2px] bg-stone-300/65" />
              <div className="h-1.5 w-2/3 rounded-[2px] bg-stone-200/55" />
              <div className="h-1.5 w-1/2 rounded-[2px] bg-stone-200/40" />
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "shop",
    title: "Dyqan i menduar para së gjithash për telefonin",
    caption:
      "Rrjeta të qarta me foto produktesh dhe një faqe kryesore e strukturuar — me përparësi blerjen e shpejtë e të lehtë nga telefoni.",
    url: "dyqan.example.al",
    imageSrc:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Rafte me veshje të përzgjedhura në një dyqan të pastër e të ndriçuar mirë",
    frame: (
      <>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-[3px] bg-white shadow-sm ring-1 ring-black/[0.05]"
            />
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <div className="h-11 flex-[2] rounded-[4px] bg-stone-200" />
          <div className="h-11 flex-1 rounded-[4px] bg-ink" />
        </div>
      </>
    ),
  },
] satisfies Array<{
  id: string;
  title: string;
  caption: string;
  url: string;
  imageSrc: string;
  imageAlt: string;
  frame: React.ReactNode;
}>;

function BrowserFrame({
  domain,
  children,
}: {
  domain: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[11px] border border-black/[0.12] bg-neutral-950 shadow-[0_20px_52px_-15px_rgba(0,0,0,.55)] ring-2 ring-black/35">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <div className="min-w-0 flex-1 rounded-md bg-neutral-900/95 px-3 py-1.5 mono text-[10px] tracking-wide text-neutral-400">
          https://{domain}
        </div>
      </div>
      <div className="border-t border-neutral-900 bg-[#faf9f6] px-4 pb-4 pt-3">
        {children}
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="punet" className="relative border-t border-rule py-16 sm:py-20">
      <Container>
        <SectionHeading
          label="Punë të përzgjedhura"
          title={
            <>
              Disa nga punët{" "}
              <span className="italic">
                e fundit
              </span>{" "}
              — pa emra klientësh, vetëm struktura.
            </>
          }
          lede={
            <>
              Fotot ilustruese janë marrë nga Unsplash, vetëm për të treguar thellësinë
              vizuale që synojmë — si në faqet e marketingut me fotografi të forta.
              Pamjet reale për biznesin tënd krijohen kur nis projekti.
            </>
          }
        />

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24 lg:gap-28">
          {works.map((w, idx) => (
            <article
              key={w.id}
              className="grid items-center gap-10 transition-transform duration-500 ease-out lg:grid-cols-2 lg:gap-16 lg:hover:-translate-y-1 xl:gap-20"
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-[0_2px_0_0_rgba(24,21,17,0.06)] ring-1 ring-black/[0.08]">
                  <Image
                    src={w.imageSrc}
                    alt={w.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="img-zoom photo-soft object-cover"
                    priority={idx === 0}
                  />
                  <div className="pointer-events-none absolute inset-[7%_5%_10%_5%]">
                    <BrowserFrame domain={w.url}>{w.frame}</BrowserFrame>
                  </div>
                </div>
              </div>

              <div className={idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}>
                <p className="mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  Rasti {idx + 1}/{works.length}
                </p>
                <h3 className="serif mt-3 text-[clamp(26px,3.4vw,36px)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {w.title}
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft sm:text-[15.5px]">
                  {w.caption}
                </p>
                <a
                  href="#kontakt"
                  className="mono mt-8 inline-flex text-[11px] uppercase tracking-[0.12em] text-ink underline decoration-ink/25 underline-offset-[5px] transition-colors hover:decoration-ink"
                >
                  Bisedoni për një ide të ngjashme →
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mono mt-20 border-t border-rule pt-6 text-[10px] uppercase leading-relaxed text-ink-soft">
          Portofolin e plotë e ndajmë privatisht, sipas kërkesës &mdash;
          i respektojmë emrat e klientëve tanë.
        </p>
      </Container>
    </section>
  );
}
