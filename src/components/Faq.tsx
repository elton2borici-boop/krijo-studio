import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

const faqs = [
  {
    q: "Sa kohë duhet për të ndërtuar një faqe?",
    a: "Shumica e faqeve dorëzohen brenda 5–7 ditësh, pasi të kemi materialet (tekst, foto, logo). Dyqanet online ose sistemet e rezervimit zakonisht marrin 2–3 javë.",
  },
  {
    q: "A mund ta përditësoj vetë faqen pas dorëzimit?",
    a: "Po. Çdo faqe vjen me një panel administrimi të thjeshtë në shqip, plus një trajnim falas (~30 min) që të ndihesh i sigurt.",
  },
  {
    q: "Si funksionon pagesa?",
    a: "50% në fillim të projektit dhe 50% para dorëzimit. Pranojmë IBAN shqiptar, transfertë ndërkombëtare ose para në dorë. Mund të diskutojmë edhe pagesa me këste — mjafton të na pyesësh.",
  },
  {
    q: "Çfarë ndodh nëse domain-i im është i zënë?",
    a: "Të ndihmojmë të gjesh një emër që i shkon markës tënde (.al, .com ose të tjera), dhe, nëse ia vlen, mund të ndërmjetësojmë komunikimin me pronarin aktual.",
  },
  {
    q: "A ofroni faktura me TVSH?",
    a: "Po. Çmimet janë në Euro, me TVSH të përfshirë, dhe faturën e lëshojmë sipas rregullave në fuqi.",
  },
  {
    q: "Po nëse nuk më pëlqen dizajni?",
    a: "Çdo pako standarde përfshin së paku 2 raunde rishikimi, derisa rezultati të të kënaqë. Asgjë nuk publikohet pa miratimin tënd të qartë.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative bg-canvas-raised py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow className="mb-5">pyetjet</Eyebrow>
            <h2 className="serif text-[1.9rem] font-bold leading-[1.06] tracking-tight text-fg sm:text-[2.3rem]">
              Pyetjet që na <span className="text-gradient">bëjnë më shpesh.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
              Nuk e gjete përgjigjen këtu? Na shkruaj me email — zakonisht
              përgjigjemi brenda 24 orësh gjatë ditëve të punës.
            </p>
          </div>

          <ul className="col-span-12 flex flex-col gap-3 lg:col-span-8">
            {faqs.map((f, i) => (
              <li key={f.q} className="overflow-hidden rounded-xl glass">
                <details className="group">
                  <summary className="grid w-full cursor-pointer list-none grid-cols-[32px_1fr_28px] items-start gap-x-3 px-5 py-5 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mono tnum pt-1 text-[11px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="serif text-[18px] font-semibold leading-snug text-fg sm:text-[20px] lg:group-hover:text-accent">
                      {f.q}
                    </span>
                    <span className="mono pt-0.5 text-right text-[17px] text-fg-muted transition-transform duration-150 group-open:rotate-45 group-open:text-accent">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 pl-[52px] text-[15px] leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
