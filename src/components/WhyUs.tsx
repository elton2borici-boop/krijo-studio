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
      className="section-sage-tint relative border-t border-rule py-14 sm:py-20"
    >
      <Container>
        <SectionHeading
          label="Si punojmë"
          title={
            <>
              Katër parime që <span className="italic">nuk i shpallim</span> — i zbatojmë.
            </>
          }
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:mt-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.k} className="bg-paper p-6 sm:p-7">
              <div className="flex items-baseline gap-3">
                <span className="mono tnum text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif text-[19px] font-semibold leading-tight tracking-tight text-ink sm:text-[20px]">
                  {p.k}
                </h3>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
                {p.v}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
