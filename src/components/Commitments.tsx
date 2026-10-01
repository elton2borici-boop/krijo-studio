import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

/**
 * Checkable rules, in place of client quotes.
 *
 * The previous quotes named people and businesses the site cannot point to,
 * and the format section already says the pictures are not client work.
 * A buyer treats that as decoration. These six lines are the same facts the
 * pricing, process, and FAQ already state — gathered where the quotes were,
 * so the page argues with commitments instead of unnamed praise.
 */
const rules = [
  {
    title: "Çmimi që sheh",
    text: "Çmimi në faqe është çmimi me TVSH. Nëse diçka shtohet, shkruhet para se të nisim — jo në fund.",
  },
  {
    title: "Si paguhet",
    text: "50% kur nisim, 50% para se ta publikojmë. IBAN shqiptar, transfertë ose para në dorë.",
  },
  {
    title: "Dy raunde",
    text: "Çdo pako faqeje ka dy raunde ndryshimesh. Asgjë nuk publikohet pa një po të qartë nga ti.",
  },
  {
    title: "Çfarë na jep ti",
    text: "Tekstet, 5–10 foto, logo nëse e ke, dhe numrin ku të të gjejnë klientët. Pa këto, afati nuk nis.",
  },
  {
    title: "Pas publikimit",
    text: "Panel administrimi në shqip dhe 30 minuta trajnim, që tekstin dhe fotot t’i ndryshosh vetë.",
  },
  {
    title: "Kur përgjigjemi",
    text: "Brenda 24 orëve, e hënë–e premte, 09:00–19:00. Propozimi është falas dhe pa kontratë.",
  },
];

export function Commitments() {
  return (
    <section className="relative bg-canvas py-16 sm:py-24">
      <Container>
        <Eyebrow className="mb-5">çfarë është e vendosur</Eyebrow>
        <h2 className="serif max-w-3xl text-balance text-[1.9rem] font-bold leading-[1.05] tracking-[0.012em] text-fg sm:text-[2.2rem] lg:text-[2.5rem]">
          Gjashtë rregulla,{" "}
          <span className="text-gradient">të njëjta për çdo projekt.</span>
        </h2>

        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {rules.map((rule, i) => (
            <li
              key={rule.title}
              className="flex flex-col rounded-2xl border border-hairline bg-white p-5 sm:p-6"
            >
              <span className="mono tnum text-[12px] font-medium leading-none text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="serif mt-3 text-[18px] font-semibold leading-tight tracking-tight text-fg">
                {rule.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                {rule.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
