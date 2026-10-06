import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politika e privatësisë — Krijo Studio",
  description:
    "Çfarë të dhënash mbledh formulari i kontaktit, pse i mbledhim, sa kohë i ruajmë dhe si mund t'i fshish.",
  robots: { index: true, follow: true },
};

/**
 * Describes exactly what `POST /api/contact` stores. If that route changes,
 * this page has to change with it — the table below is the user-facing
 * contract for the columns in the `contacts` table.
 */
const collected = [
  {
    field: "Emri",
    why: "Për t'iu drejtuar me emër në përgjigje.",
    required: true,
  },
  {
    field: "Email",
    why: "Kanali kryesor i përgjigjes.",
    required: true,
  },
  {
    field: "Telefoni",
    why: "Vetëm nëse preferon të të kontaktojmë me telefon.",
    required: false,
  },
  {
    field: "Emri i biznesit",
    why: "Për të kuptuar kontekstin e projektit para se të përgjigjemi.",
    required: false,
  },
  {
    field: "Pakoja që të intereson",
    why: "Për të përgatitur një propozim konkret.",
    required: false,
  },
  {
    field: "Mesazhi",
    why: "Përshkrimi i kërkesës tënde.",
    required: true,
  },
  {
    field: "Adresa IP",
    why: "Për të kufizuar dërgimet e automatizuara (spam). Nuk përdoret për profilizim.",
    required: true,
  },
  {
    field: "Shfletuesi (user agent)",
    why: "Për të njohur dërgimet e automatizuara. Nuk përdoret për reklama.",
    required: true,
  },
  {
    field: "Identifikuesi i shfletuesit",
    why: "Një kod i rastësishëm nga cookie-ja teknike (shih më poshtë), vetëm për të kufizuar dërgimet e shpeshta nga i njëjti shfletues.",
    required: true,
  },
  {
    field: "Data e dërgimit",
    why: "Për të ditur radhën e kërkesave dhe për të zbatuar afatin e ruajtjes.",
    required: true,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main className="relative flex-1 py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Link
              href="/"
              className="link-underline text-[13.5px] font-medium text-fg-muted"
            >
              ← kthehu në faqen kryesore
            </Link>

            <h1 className="serif mt-8 text-balance text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold leading-[1.05] tracking-[0.012em] text-fg">
              Politika e <span className="text-gradient">privatësisë.</span>
            </h1>

            <p className="mt-6 text-[16px] leading-[1.7] text-fg-muted">
              Kjo faqe ka një formular të vetëm kontakti. Nuk përdorim cookies
              gjurmuese, nuk kemi Google Analytics, nuk kemi pixel reklamash dhe
              nuk ndajmë asgjë me palë të treta për marketing. Më poshtë është
              lista e plotë e asaj që ruajmë kur dërgon formularin.
            </p>

            <Section title="Kush është përgjegjës">
              <p>
                {site.name}, {site.city}, {site.country}. Për çdo pyetje ose
                kërkesë lidhur me të dhënat e tua, na shkruaj në{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-fg"
                >
                  {site.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Çfarë ruajmë dhe pse">
              <ul className="mt-2 flex flex-col divide-y divide-hairline border-y border-hairline">
                {collected.map((c) => (
                  <li key={c.field} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                    <span className="text-[12px] font-semibold text-accent">
                      {c.field}
                      {!c.required && (
                        <span className="text-fg-muted"> · opsionale</span>
                      )}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-fg-muted">
                      {c.why}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Cookies">
              <p>
                Faqja vendos një cookie të vetme teknike,{" "}
                <code className="text-fg">krijo_ct</code>, dhe vetëm kur
                dërgon formularin. Përmban një kod të rastësishëm që nuk
                tregon kush je, skadon pas 30 ditësh dhe shërben vetëm për të
                mbrojtur formularin nga spam-i. Nuk përdorim cookies analitike
                ose reklamash.
              </p>
            </Section>

            <Section title="Baza ligjore">
              <p>
                Të dhënat i përpunojmë mbi bazën e pëlqimit tënd, të dhënë në
                momentin që dërgon formularin, si dhe për hapat paraprakë të një
                marrëdhënieje kontraktuale që ti vetë e nis. Adresën IP dhe
                shfletuesin i ruajmë mbi bazën e interesit tonë legjitim për të
                mbrojtur formularin nga abuzimi.
              </p>
            </Section>

            <Section title="Sa kohë i ruajmë">
              <p>
                Kërkesat e kontaktit ruhen për 24 muaj nga dita e dërgimit, që
                të kemi historikun e bisedës nëse projekti vazhdon. Pas këtij
                afati fshihen. Nëse na kërkon fshirjen më herët, e bëjmë brenda
                30 ditëve.
              </p>
            </Section>

            <Section title="Ku ruhen">
              <p>
                Në një bazë të dhënash në serverin ku është hostuar kjo faqe.
                Aksesin e ka vetëm {site.name}, përmes një paneli të mbrojtur me
                fjalëkalim. Nuk i shesim, nuk i shkëmbejmë dhe nuk i përdorim
                për t&apos;u dërguar newsletter pa kërkesën tënde.
              </p>
              <p className="mt-3">
                Që të përgjigjemi shpejt, kur vjen një kërkesë e re mund të
                marrim një njoftim me email përmes{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  className="link-underline text-fg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Resend
                </a>{" "}
                dhe/ose një mesazh në{" "}
                <a
                  href="https://telegram.org/privacy"
                  className="link-underline text-fg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Telegram
                </a>
                . Njoftimi përmban emrin, email-in, telefonin, biznesin,
                pakon dhe mesazhin — jo adresën IP. Këta ofrues mund ta
                përpunojnë njoftimin edhe jashtë Shqipërisë, vetëm për të na
                e dorëzuar.
              </p>
            </Section>

            <Section title="Të drejtat e tua">
              <p>
                Ke të drejtë të kërkosh një kopje të të dhënave që mbajmë për
                ty, të kërkosh korrigjimin ose fshirjen e tyre, dhe të tërheqësh
                pëlqimin në çdo moment. Mjafton një email në{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-fg"
                >
                  {site.email}
                </a>
                . Përgjigjemi brenda 30 ditëve.
              </p>
            </Section>

            <Section title="Ndryshimet">
              <p>
                Nëse ndryshojmë mënyrën si i përpunojmë të dhënat, përditësojmë
                këtë faqe. Versioni në fuqi është ai që lexon këtu.
              </p>
            </Section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="serif text-[22px] font-bold tracking-tight text-fg">
        {title}
      </h2>
      <div className="mt-3 text-[15px] leading-[1.7] text-fg-muted">
        {children}
      </div>
    </section>
  );
}
