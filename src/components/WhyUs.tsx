import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Photo } from "./ui/Photo";

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

        {/* The claim in this section is "you talk to the people doing the
            work" — so the people doing the work sit next to it. */}
        <div className="mt-8 grid items-start gap-6 sm:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Photo
              src="/images/studio.webp"
              alt="Dy anëtarë të studios duke diskutuar një projekt para një laptopi, në zyrën e tyre në Tiranë."
              width={1376}
              height={690}
              sizes="(min-width: 1024px) 460px, 100vw"
              className="rounded-2xl border border-hairline shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)]"
            />
            <p className="mt-3 text-[12.5px] leading-relaxed text-fg-muted">
              Studioja në Tiranë — projektet zhvillohen një nga një.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
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
        </div>
      </Container>
    </section>
  );
}
