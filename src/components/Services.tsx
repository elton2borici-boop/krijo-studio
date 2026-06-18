import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

const services = [
  {
    title: "Krijim faqesh",
    text:
      "Faqe të ndërtuara nga zero: të menduara së pari për telefonin, të strukturuara që fotografitë të kenë vendin kryesor dhe me një bazë teknike të pastër për motorët e kërkimit.",
    bullets: [
      "Dizajn i posaçëm për markën tënde",
      "Zhvillim me Next.js / React",
      "Strukturë mobile‑first",
      "Optimizim bazë për SEO dhe shpejtësi ngarkimi",
    ],
  },
  {
    title: "Domain & DNS",
    text:
      "Një adresë që i shkon markës tënde — e regjistrojmë, e lidhim dhe e konfigurojmë DNS-in, që email-i dhe faqja jote të punojnë së bashku.",
    bullets: [
      "Regjistrim & rinovim",
      "Konfigurim DNS sipas nevojës",
      "Email profesional në domain-in tënd",
      "Migrim i qetë nga zgjidhjet e vjetra",
    ],
  },
  {
    title: "Hosting",
    text:
      "Hapësirë në Evropën Qendrore, afër audiencës sate, me SSL automatik dhe kopje rezervë të menaxhuara — që asnjë ndryshim i rëndësishëm të mos humbasë.",
    bullets: [
      "SSL automatik",
      "Kopje rezervë të planifikuara",
      "Monitorim ditor i disponueshmërisë",
      "Nivel disponueshmërie i përcaktuar dhe i dokumentuar",
    ],
  },
  {
    title: "Mirëmbajtje",
    text:
      "Pas lansimit: tekste të reja, foto, formularë — dhe kur diçka prishet, e rregullojmë para se ta vërejnë vizitorët.",
    bullets: [
      "Ndryshime të planifikuara sipas pakos",
      "Kontakt i drejtpërdrejtë me personin përgjegjës",
      "Pa zinxhirë të gjatë komunikimi",
    ],
  },
  {
    title: "Identitet vizual bazë",
    text:
      "Kur lidhet drejtpërdrejt me një faqe të re: paletë, tipografi, logo kryesore dhe një udhëzues i shkurtër përdorimi që e mban markën konsistente në çdo kanal.",
    bullets: [
      "Paletë & tipografi",
      "Logo kryesore + variante",
      "Udhëzues i shkurtër përdorimi",
    ],
  },
  {
    title: "SEO & analitika",
    text:
      "Të dhëna të strukturuara mirë dhe një arkitekturë e qartë faqesh që e ndihmon kërkimin — bashkë me një raport bazë mbi metrikat kryesore.",
    bullets: [
      "Vlerësim bazë i strukturës",
      "Google Search Console kur është e përshtatshme",
      "Raport mujor i thjeshtë për t’u lexuar",
    ],
  },
];

export function Services() {
  return (
    <section
      id="sherbimet"
      className="relative border-t border-rule py-14 sm:py-20"
    >
      <Container>
        <SectionHeading
          label="Shërbimet"
          title="Gjashtë fusha, të mbuluara në çdo projekt"
          lede="Nëse diçka del jashtë kësaj liste, e diskutojmë së bashku para se të nisim."
        />

        {/* Ledger / register — full-width rows, rule separators, no boxes. */}
        <ol className="mt-8 border-t border-ink/70 sm:mt-10">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="group grid grid-cols-12 gap-x-6 gap-y-3 border-b border-rule px-1 py-5 transition-colors duration-300 sm:px-2 sm:py-6 lg:hover:bg-paper-soft/40"
            >
              <div className="col-span-12 flex items-baseline gap-3 lg:col-span-4">
                <span className="mono tnum text-[12px] font-medium leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif text-[20px] font-semibold leading-tight tracking-tight text-ink sm:text-[22px]">
                  {s.title}
                </h3>
              </div>

              <p className="col-span-12 text-[14px] leading-relaxed text-ink-soft lg:col-span-5">
                {s.text}
              </p>

              {/* Bullets are secondary detail — the row text carries the message on phones. */}
              <ul className="col-span-12 hidden flex-col gap-1 sm:flex lg:col-span-3">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden className="text-accent">/</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
