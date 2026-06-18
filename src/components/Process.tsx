import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

/**
 * Four short steps on a dark band — the page's mid-point contrast moment.
 * Deliberately compact: no photos, no scroll-spy; the steps are one sentence each.
 */
const steps = [
  {
    n: "01",
    title: "Bisedë",
    days: "Dita 1",
    text: "Na tregon për biznesin dhe çfarë pret nga faqja — me takim, telefonatë ose video.",
  },
  {
    n: "02",
    title: "Propozim",
    days: "Ditët 2–3",
    text: "Merr një afat konkret dhe një listë të qartë të asaj që përfshihet. Pa terma të mjegullt.",
  },
  {
    n: "03",
    title: "Ndërtim",
    days: "Ditët 4–7",
    text: "E ndërtojmë faqen dhe të japim një lidhje ku e ndjek ecurinë në kohë reale.",
  },
  {
    n: "04",
    title: "Lansim",
    days: "Java e dytë",
    text: "Testim në telefon e shfletues të ndryshëm, miratimi yt — dhe pastaj publikimi.",
  },
];

export function Process() {
  return (
    <section id="procesi" className="relative border-t border-ink/70 bg-ink py-14 text-paper sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:gap-5">
          <Eyebrow className="text-accent-mute">Procesi</Eyebrow>
          <h2 className="serif max-w-3xl text-balance text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[2.2rem] lg:text-[2.5rem]">
            Nga ideja te publikimi — <span className="italic text-accent-mute">katër hapa.</span>
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-paper/65">
            Komunikimi mbetet i drejtpërdrejtë: flet pikërisht me njerëzit që bëjnë dizajnin dhe zhvillimin.
          </p>
        </div>

        <ol className="mt-9 grid gap-x-8 gap-y-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-paper/20 pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="serif tnum text-[34px] font-semibold leading-none tracking-tight text-accent-mute">
                  {s.n}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.14em] text-paper/50">
                  {s.days}
                </span>
              </div>
              <h3 className="serif mt-3 text-[20px] font-semibold leading-tight tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-paper/65">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
