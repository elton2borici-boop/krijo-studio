import Image from "next/image";
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
      "Një adresë që të përfaqëson denjësisht — e regjistrojmë, e lidhim dhe e konfigurojmë DNS-in, që email-i dhe faqja jote të punojnë së bashku.",
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
      className="relative overflow-hidden border-t border-rule py-16 sm:py-24"
    >
      {/* Soft paper-texture backdrop — kept, dialed back so the ledger reads first. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/luxury-atmosphere.png"
          alt=""
          fill
          sizes="100vw"
          className="photo-soft scale-110 object-cover object-[center_35%] blur-3xl"
          priority={false}
        />
        <div className="absolute inset-0 bg-paper/[0.9]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          label="Shërbimet"
          title="Gjashtë fusha që i mbulojmë në çdo projekt"
          lede="Në çdo projekt merremi konkretisht me secilën prej tyre. Nëse diçka del jashtë kësaj liste, e diskutojmë së bashku para se të nisim."
        />

        {/* Ledger / register — full-width rows, rule separators, no boxes. */}
        <ol className="mt-10 border-t border-ink/70 sm:mt-14">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="group grid grid-cols-12 gap-x-6 gap-y-4 border-b border-rule px-1 py-6 transition-colors duration-300 sm:px-2 sm:py-8 lg:hover:bg-paper-soft/40"
            >
              <div className="col-span-12 flex items-baseline gap-4 lg:col-span-4">
                <span className="serif tnum text-[34px] font-semibold leading-none tracking-tight text-accent sm:text-[40px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif text-[22px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px]">
                  {s.title}
                </h3>
              </div>

              <p className="col-span-12 text-[14.5px] leading-relaxed text-ink-soft lg:col-span-5 lg:text-[15px]">
                {s.text}
              </p>

              <ul className="col-span-12 flex flex-col gap-1.5 lg:col-span-3">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-[13px] leading-relaxed text-ink-soft"
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
