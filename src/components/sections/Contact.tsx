import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { site, addressLine, telHref, whatsappHref } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/** Only the channels that are actually reachable — see src/lib/site.ts. */
function contactDetails() {
  const tel = telHref();
  const whatsapp = whatsappHref();
  const address = addressLine();

  return [
    { term: "Email", value: site.email, href: `mailto:${site.email}` },
    tel && site.phoneDisplay
      ? { term: "Telefon", value: site.phoneDisplay, href: tel }
      : null,
    whatsapp && site.phoneDisplay
      ? { term: "WhatsApp", value: site.phoneDisplay, href: whatsapp }
      : null,
    // Only claim a visitable studio once there is a street to visit — "Tiranë
    // — me takim" alone promises a place without saying where.
    site.street && address
      ? { term: "Studio", value: `${address} — me takim`, href: null }
      : null,
    site.openingHours
      ? { term: "Orari", value: site.openingHours, href: null }
      : null,
  ].filter(
    (d): d is { term: string; value: string; href: string | null } => Boolean(d)
  );
}

export function Contact() {
  const details = contactDetails();
  return (
    <Section
      id="kontakt"
      labelledBy="kontakt-titulli"
      className="isolate overflow-hidden"
    >
      {/* Static accent wash and texture behind the closing headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_55%_at_15%_25%,var(--accent-soft),transparent_70%)]"
      />
      <div
        aria-hidden
        className="dot-texture pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 opacity-50"
      />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>kontakt</Eyebrow>

          <h2
            id="kontakt-titulli"
            className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl"
          >
            Le të <span className="text-accent">flasim.</span>
            <br />
            Një kafe ose
            <br />
            një email.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
            Plotëso formularin këtu ose na shkruaj drejtpërdrejt &mdash;
            përgjigjemi brenda 24 orësh, me një propozim falas e pa asnjë
            angazhim.
          </p>

          {/* The headline offers a coffee; the studio shot answers the
              question a stranger has at this point: who am I emailing? */}
          <figure className="mt-10">
            <div className="grid grid-cols-2 gap-3">
              <Photo
                src="/images/kafe.webp"
                alt="Një espresso dhe një bloknot mbi tavolinën e një kafenaje në Tiranë."
                width={1408}
                height={690}
                sizes="(min-width: 1024px) 225px, 45vw"
                className="aspect-[4/3] rounded-card border border-hairline"
              />
              <Photo
                src="/images/studio.webp"
                alt="Dy anëtarë të studios duke diskutuar një projekt në zyrën e tyre në Tiranë."
                width={1376}
                height={690}
                sizes="(min-width: 1024px) 225px, 45vw"
                className="aspect-[4/3] rounded-card border border-hairline"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-fg-muted">
              Studioja jonë në Tiranë — projektet zhvillohen një nga një.
            </figcaption>
          </figure>

          <dl className="mt-10 flex flex-col text-sm">
            {details.map((d) => (
              <div
                key={d.term}
                className="grid grid-cols-[5rem_1fr] gap-3 border-t border-hairline py-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
                  {d.term}
                </dt>
                <dd className="text-fg">
                  {d.href ? (
                    <a href={d.href} className="link-underline">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
