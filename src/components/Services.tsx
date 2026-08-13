import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

const services = [
  {
    title: "Krijim faqesh",
    text:
      "Faqe të ndërtuara nga zero: të menduara së pari për telefonin, të strukturuara që fotografitë të kenë vendin kryesor dhe me një bazë teknike të pastër për motorët e kërkimit.",
  },
  {
    title: "Domain & DNS",
    text:
      "Një adresë që i shkon markës tënde — e regjistrojmë, e lidhim dhe e konfigurojmë DNS-in, që email-i dhe faqja jote të punojnë së bashku.",
  },
  {
    title: "Hosting",
    text:
      "Hapësirë në Evropën Qendrore, afër audiencës sate, me SSL automatik dhe kopje rezervë të menaxhuara — që asnjë ndryshim i rëndësishëm të mos humbasë.",
  },
  {
    title: "Mirëmbajtje",
    text:
      "Pas lansimit: tekste të reja, foto, formularë — dhe kur diçka prishet, e rregullojmë para se ta vërejnë vizitorët.",
  },
  {
    title: "Identitet vizual bazë",
    text:
      "Kur lidhet drejtpërdrejt me një faqe të re: paletë, tipografi, logo kryesore dhe një udhëzues i shkurtër përdorimi që e mban markën konsistente në çdo kanal.",
  },
  {
    title: "SEO & analitika",
    text:
      "Të dhëna të strukturuara mirë dhe një arkitekturë e qartë faqesh që e ndihmon kërkimin — bashkë me një raport bazë mbi metrikat kryesore.",
  },
];

export function Services() {
  return (
    <section
      id="sherbimet"
      className="relative bg-canvas py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          label="shërbimet"
          title="Gjashtë fusha, të mbuluara në çdo projekt"
          lede="Nëse diçka del jashtë kësaj liste, e diskutojmë së bashku para se të nisim."
        />

        {/* Two columns of compact cards rather than six full-width rows.
            The ledger layout meant six vertical stops to learn six things,
            which is what made this section feel like an endless scroll —
            the content was never the problem, the shape was. */}
        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:gap-4">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col rounded-2xl border border-hairline bg-white p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="mono tnum text-[12px] font-medium leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif text-[19px] font-semibold leading-tight tracking-tight text-fg sm:text-[20px]">
                  {s.title}
                </h3>
              </div>

              <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">
                {s.text}
              </p>

            </li>
          ))}
        </ul>

      </Container>
    </section>
  );
}
