import { Container } from "./ui/Container";

const principles = [
  {
    k: "Jo agjenci e madhe",
    v: "Ekip i vogël — komunikimi mbetet i shpejtë dhe projektet zhvillohen një nga një, pa departamente që nuk flasin me njëri-tjetrin.",
  },
  {
    k: "Komunikim në shqip",
    v: "Dokumente, përgjigje dhe udhëzime në gjuhën që të vjen natyrshëm — të njëjtën gjë edhe pas lansimit.",
  },
  {
    k: "Çmime transparente",
    v: "Pako publike, me numra të qartë. Çdo ndryshim i fushëveprimit diskutohet që në fillim, jo pas nënshkrimit.",
  },
  {
    k: "Cilësi para sasie",
    v: "Preferojmë pak klientë, secilin me kujdesin e plotë, sesa shumë projekte të nxituara e të përsëritura.",
  },
  {
    k: "Pas lansimit",
    v: "Mirëmbajtja është pjesë e modelit tonë — jo një ‘shërbim shtesë i fshehur’ që shfaqet papritur në faturë.",
  },
  {
    k: "Pa shabllone",
    v: "Dizajni përshtatet me markën tënde; kodi mbahet i pastër, që faqja të ruajë performancën gjatë gjithë jetës së saj.",
  },
];

export function WhyUs() {
  return (
    <section
      id="pse-ne"
      className="section-sage-tint relative border-t border-rule py-16 sm:py-24"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-14">
          {/* Sticky manifesto heading (left column on desktop). */}
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-24 flex flex-col gap-5">
              <p className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
                <span aria-hidden className="h-px w-6 bg-accent" />
                Filozofia
              </p>
              <h2 className="serif text-balance text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[2.6rem] lg:text-[2.9rem]">
                Gjashtë parime që nuk i{" "}
                <span className="italic">shpallim me zë të lartë</span> — por i zbatojmë çdo ditë.
              </h2>
              <p className="text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">
                Ndoshta nuk i përshtaten çdo biznesi — dhe është mirë ta kuptojmë së bashku që në fillim, para se të nisim punën.
              </p>
            </div>
          </div>

          {/* Plain numbered list of principles — rules only, no boxes. */}
          <ol className="col-span-12 border-t border-ink/40 lg:col-span-8">
            {principles.map((p, i) => (
              <li
                key={p.k}
                className="grid grid-cols-12 gap-x-5 gap-y-2 border-b border-rule py-6 sm:py-8"
              >
                <span className="mono tnum col-span-3 text-[12px] uppercase text-accent sm:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif col-span-9 text-[20px] font-semibold leading-tight tracking-tight text-ink sm:col-span-10 sm:text-[22px]">
                  {p.k}
                </h3>
                <p className="col-span-12 text-[14.5px] leading-relaxed text-ink-soft sm:col-start-3 sm:col-span-10 sm:text-[15px]">
                  {p.v}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
