import Image from "next/image";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

const quotes = [
  {
    text: "Komunikim i vazhdueshëm gjatë gjithë ndërtimit dhe çmime të qarta që në fillim — asnjë surprizë në fund.",
    name: "Eriona Kola",
    role: "Restorant, Tiranë",
  },
  {
    text: "Faqja e re i përmbush kërkesat e Google-it dhe duket mirë në telefon — pikërisht aty ku na gjen shumica e klientëve të rinj.",
    name: "Av. Erald Berisha",
    role: "Studio ligjore, Tiranë",
  },
  {
    text: "Më shumë vlerësova kontaktin e drejtpërdrejtë e të shpejtë me personin përgjegjës, pa nivele të tepërta menaxhimi.",
    name: "Dr. Klaudia Hoxha",
    role: "Klinikë dentare, Durrës",
  },
];

export function Testimonials() {
  return (
    <section className="relative border-t border-rule py-16 sm:py-24">
      <Container>
        <Eyebrow className="mb-14">Zëra klientësh</Eyebrow>

        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          {quotes.map((q) => (
            <figure key={q.name} className="col-span-12 lg:col-span-4">
              <span className="serif text-[68px] leading-[0.6] text-accent" aria-hidden>
                “
              </span>
              <blockquote className="serif mt-3 text-[19px] font-normal leading-[1.4] tracking-[-0.01em] text-ink sm:text-[21px]">
                {q.text}
              </blockquote>
              <figcaption className="mono mt-8 flex flex-col gap-1 border-t border-rule pt-5 text-[11px] uppercase">
                <span className="text-ink">{q.name}</span>
                <span className="max-w-none text-pretty leading-relaxed text-ink-soft">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <figure className="mt-20 sm:mt-28">
          <div className="group relative mx-auto aspect-[11/6] w-full max-w-5xl overflow-hidden rounded-xl bg-paper-deep ring-1 ring-ink/10 shadow-[0_38px_80px_-36px_rgba(28,24,19,0.5)]">
            <Image
              src="/images/services-crafted.png"
              alt="Një faqe e ndërtuar nga Krijo Studio — dyqan online"
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="img-zoom object-cover"
            />
            <div aria-hidden className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/12" />
          </div>
          <figcaption className="mono mx-auto mt-5 max-w-5xl text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            <span className="text-accent">/</span> Nga puna jonë — dyqan online
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
