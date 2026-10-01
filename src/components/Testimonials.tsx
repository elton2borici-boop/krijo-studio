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
    <section className="relative overflow-hidden bg-ink py-16 text-on-ink sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-canvas to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#c4844a]/15 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <Container className="relative">
        <Eyebrow className="mb-9 text-accent-on-ink sm:mb-11">zëra klientësh</Eyebrow>

        <div className="grid grid-cols-12 gap-5">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="col-span-12 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:col-span-4"
            >
              <span className="serif mb-1 block text-[2.75rem] font-semibold leading-none text-gradient-ink" aria-hidden>
                “
              </span>
              <blockquote className="serif mt-4 flex-1 text-[17px] italic leading-[1.45] text-on-ink sm:text-[18px]">
                {q.text}
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-1 border-t border-white/10 pt-4 text-[13px]">
                <span className="text-on-ink">{q.name}</span>
                <span className="max-w-none text-pretty leading-relaxed text-on-ink-muted">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
