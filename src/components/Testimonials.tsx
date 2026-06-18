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
    <section className="section-sage-tint relative border-t border-rule py-14 sm:py-20">
      <Container>
        <Eyebrow className="mb-9 sm:mb-11">Zëra klientësh</Eyebrow>

        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          {quotes.map((q) => (
            <figure key={q.name} className="col-span-12 lg:col-span-4">
              <span className="serif text-[56px] leading-[0.6] text-accent" aria-hidden>
                “
              </span>
              <blockquote className="serif mt-2 text-[18px] font-normal leading-[1.4] tracking-[-0.01em] text-ink sm:text-[19px]">
                {q.text}
              </blockquote>
              <figcaption className="mono mt-6 flex flex-col gap-1 border-t border-rule pt-4 text-[11px] uppercase">
                <span className="text-ink">{q.name}</span>
                <span className="max-w-none text-pretty leading-relaxed text-ink-soft">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
