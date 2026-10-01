import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

const services = [
  {
    title: "Krijim faqesh",
    text: "Faqe e ndërtuar për telefonin: oferta ose menu, foto, dhe një mënyrë për të të telefonuar, rezervuar ose porositur.",
    where: "Te Vetëm Faqja, Faqja + Domain dhe Gjithçka. Mirëmbajtja është për faqe që ekziston tashmë.",
  },
  {
    title: "Domain & email",
    text: "Regjistrim .al ose .com për një vit, DNS i lidhur, dhe një adresë email me emrin e biznesit.",
    where: "Te Faqja + Domain dhe te Gjithçka. Te Vetëm Faqja, domain-in dhe email-in i sjell ti.",
  },
  {
    title: "Hosting",
    text: "Server në Evropën Qendrore, certifikatë SSL dhe kopje rezervë, që faqja të hapet dhe ndryshimet të mos humbasin.",
    where: "I përfshirë te Gjithçka. Te pakot e tjera, ose e ke tashmë, ose shtohet me mirëmbajtjen €29/muaj.",
  },
  {
    title: "Mirëmbajtje",
    text: "Kopje rezervë çdo ditë, përditësime, rregullim defektesh dhe 2 ndryshime teksti ose fotoje në muaj.",
    where: "€29/muaj, pa kontratë vjetore. Te Gjithçka është e përfshirë, pastaj €39/muaj.",
  },
  {
    title: "Logo dhe ngjyra",
    text: "Paletë, tipografi dhe një logo kryesore, vetëm kur biznesi nuk ka ende një.",
    where: "Nuk hyn në pakot standarde. E çmojmë veç, para se të nisim faqen.",
  },
  {
    title: "SEO & analitika",
    text: "Çdo faqe e re ka titull, përshkrim dhe strukturë që Google e lexon. Raporti i vizitave tregon sa njerëz erdhën dhe nga ku.",
    where: "SEO bazë është në çdo faqe të re. SEO i avancuar, Google Ads dhe blog janë vetëm te Gjithçka.",
  },
];

export function Services() {
  return (
    <section
      id="sherbimet"
      className="relative scroll-mt-28 bg-canvas py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          label="shërbimet"
          title="Çfarë hyn në punë — dhe ku jo"
          lede="Jo të gjashta janë në çdo pako. Te secila është shkruar se ku fillon."
        />

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

              <p className="mt-4 border-t border-hairline pt-3 text-[13px] leading-relaxed text-fg">
                <span className="mr-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                  Ku hyn
                </span>
                {s.where}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
