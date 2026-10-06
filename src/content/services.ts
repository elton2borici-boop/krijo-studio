/** The six service areas listed under "Shërbimet". */
export type ServiceIcon = "web" | "domain" | "hosting" | "care" | "brand" | "seo";

export const services: { title: string; icon: ServiceIcon; text: string }[] = [
  {
    title: "Krijim faqesh",
    icon: "web",
    text:
      "Faqe të ndërtuara nga zero: të menduara së pari për telefonin, të strukturuara që fotografitë të kenë vendin kryesor dhe me një bazë teknike të pastër për motorët e kërkimit.",
  },
  {
    title: "Domain & DNS",
    icon: "domain",
    text:
      "Një adresë që i shkon markës tënde — e regjistrojmë, e lidhim dhe e konfigurojmë DNS-in, që email-i dhe faqja jote të punojnë së bashku.",
  },
  {
    title: "Hosting",
    icon: "hosting",
    text:
      "Hapësirë në Evropën Qendrore, afër audiencës sate, me SSL automatik dhe kopje rezervë të menaxhuara — që asnjë ndryshim i rëndësishëm të mos humbasë.",
  },
  {
    title: "Mirëmbajtje",
    icon: "care",
    text:
      "Pas lansimit: tekste të reja, foto, formularë — dhe kur diçka prishet, e rregullojmë para se ta vërejnë vizitorët.",
  },
  {
    title: "Identitet vizual bazë",
    icon: "brand",
    text:
      "Kur lidhet drejtpërdrejt me një faqe të re: paletë, tipografi, logo kryesore dhe një udhëzues i shkurtër përdorimi që e mban markën konsistente në çdo kanal.",
  },
  {
    title: "SEO & analitika",
    icon: "seo",
    text:
      "Të dhëna të strukturuara mirë dhe një arkitekturë e qartë faqesh që e ndihmon kërkimin — bashkë me një raport bazë mbi metrikat kryesore.",
  },
];
