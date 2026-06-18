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
    <section id="faq" className="relative border-t border-rule py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow className="mb-5">Pyetjet</Eyebrow>
            <h2 className="serif text-[1.9rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[2.3rem]">
              Pyetjet që na <span className="italic text-accent">bëjnë më shpesh.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Nuk e gjete përgjigjen këtu? Na shkruaj me email — zakonisht
              përgjigjemi brenda 24 orësh gjatë ditëve të punës.
            </p>
          </div>

          <ul className="col-span-12 lg:col-span-8">
            {faqs.map((f, i) => (
              <li key={f.q} className="border-b border-rule first:border-t">
                <details className="group">
                  <summary className="grid w-full cursor-pointer list-none grid-cols-[32px_1fr_28px] items-start gap-x-3 py-6 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mono tnum pt-1 text-[11px] uppercase text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="serif text-[20px] leading-snug text-ink sm:text-[22px] lg:group-hover:opacity-80">
                      {f.q}
                    </span>
                    <span className="mono pt-0.5 text-right text-[17px] text-ink-soft transition-transform duration-150 group-open:rotate-45 group-open:text-ink">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pl-[44px] pr-6 text-[15px] leading-relaxed text-ink-soft sm:pr-10 lg:pr-14">
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
