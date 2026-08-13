import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Photo } from "./ui/Photo";

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
    <section
      id="procesi"
      className="section-glow relative isolate overflow-hidden bg-canvas py-16 sm:py-24"
    >
      <Container>
        <div className="flex flex-col gap-4 sm:gap-5">
          <Eyebrow>procesi</Eyebrow>
          <h2 className="serif max-w-3xl text-balance text-[1.9rem] font-bold leading-[1.05] tracking-[-0.025em] text-fg sm:text-[2.2rem] lg:text-[2.5rem]">
            Nga ideja te publikimi — <span className="text-gradient">katër hapa.</span>
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-fg-muted">
            Komunikimi mbetet i drejtpërdrejtë: flet pikërisht me njerëzit që bëjnë dizajnin dhe zhvillimin.
          </p>
        </div>

        {/* Wide band between the promise and the four steps: the annotated
            layout sheet is the visual proof that "ndërtim" means drafting and
            revising, not installing a template. */}
        <Photo
          src="/images/puna.webp"
          alt="Pamje nga lart e tavolinës së punës: laptop, telefon me versionin mobil, dhe një skicë e faqes e shënuar me dorë."
          width={1408}
          height={388}
          sizes="(min-width: 1240px) 1180px, 100vw"
          className="mt-9 rounded-2xl border border-hairline shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)] sm:mt-12"
        />

        <ol className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group card-spot relative overflow-hidden rounded-2xl glass p-5 transition-transform duration-300 lg:hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="serif tnum text-[34px] font-bold leading-none tracking-tight text-gradient">
                  {s.n}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
                  {s.days}
                </span>
              </div>
              <h3 className="serif mt-3 text-[20px] font-bold leading-tight tracking-tight text-fg">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
