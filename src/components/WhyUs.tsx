import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Four working principles, kept deliberately short — pricing and maintenance
 * promises live in their own sections, so nothing is repeated here.
 */
const principles = [
  {
    k: "Studio e vogël, me qëllim",
    v: "Projektet zhvillohen një nga një. Flet gjithmonë me njerëzit që bëjnë punën — jo me një menaxher llogarie.",
  },
  {
    k: "Gjithçka në shqip",
    v: "Oferta, udhëzimet dhe paneli i administrimit — në gjuhën që të vjen natyrshëm, edhe pas lansimit.",
  },
  {
    k: "Cilësi para sasie",
    v: "Pak klientë, secili me kujdes të plotë. Më mirë një faqe e menduar deri në fund sesa pesë të nxituara.",
  },
  {
    k: "Pa shabllone",
    v: "Dizajn i ndërtuar për markën tënde dhe kod i pastër, që faqja të mbetet e shpejtë me kalimin e viteve.",
  },
];

export function WhyUs() {
  return (
    <section
      id="pse-ne"
      className="relative bg-canvas-raised py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          label="si punojmë"
          title={
            <>
              Katër parime që <span className="text-gradient">nuk i shpallim</span> — i zbatojmë.
            </>
          }
        />

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div
              key={p.k}
              className="group card-spot relative overflow-hidden rounded-2xl glass p-6 transition-transform duration-300 sm:p-7 lg:hover:-translate-y-1"
            >
              <div className="flex items-baseline gap-3">
                <span className="mono tnum text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif text-[19px] font-bold leading-tight tracking-tight text-fg sm:text-[20px]">
                  {p.k}
                </h3>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">
                {p.v}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
