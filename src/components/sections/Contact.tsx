import { Container } from "@/components/ui/Container";
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
    <section
      id="kontakt"
      className="relative isolate overflow-hidden bg-canvas py-20 sm:py-28"
    >
      {/* Mesh glow instead of a photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="mesh-blob absolute -left-[10%] top-[10%] h-[55vh] w-[55vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(31,95,191,0.09), transparent 64%)" }}
        />
        <div
          className="mesh-blob mesh-b absolute -bottom-[20%] right-[-8%] h-[50vh] w-[50vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(91,63,212,0.07), transparent 66%)" }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          {/* Left: bold statement */}
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="mb-5">kontakt</Eyebrow>

            <h2 className="serif text-balance text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1] tracking-[0.012em] text-fg">
              Le të <span className="text-gradient">flasim.</span><br />
              Një kafe ose<br />
              një email.
            </h2>

            <p className="mt-7 max-w-md text-[16px] leading-[1.6] text-fg-muted">
              Plotëso formularin këtu ose na shkruaj drejtpërdrejt &mdash; përgjigjemi brenda 24 orësh, me një propozim falas e pa asnjë angazhim.
            </p>

            {/* Two photographs, paired. The headline offers a coffee, and the
                studio shot answers the question a stranger actually has at the
                point of writing to you: who am I about to email? It moved here
                when the "Si punojmë" section was cut. */}
            <div className="mt-9 grid grid-cols-2 gap-3">
              <Photo
                src="/images/kafe.webp"
                alt="Një espresso dhe një bloknot mbi tavolinën e një kafenaje në Tiranë."
                width={1408}
                height={690}
                sizes="(min-width: 1024px) 225px, 45vw"
                className="aspect-[4/3] rounded-2xl border border-hairline shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)]"
              />
              <Photo
                src="/images/studio.webp"
                alt="Dy anëtarë të studios duke diskutuar një projekt në zyrën e tyre në Tiranë."
                width={1376}
                height={690}
                sizes="(min-width: 1024px) 225px, 45vw"
                className="aspect-[4/3] rounded-2xl border border-hairline shadow-[0_10px_30px_-14px_rgba(21,24,29,0.18)]"
              />
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-fg-muted">
              Studioja jonë në Tiranë — projektet zhvillohen një nga një.
            </p>

            <dl className="mt-12 flex flex-col gap-5 text-[14px]">
              {details.map((d) => (
                <div
                  key={d.term}
                  className="grid grid-cols-[80px_1fr] gap-3 border-t border-hairline pt-4"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
                    {d.term}
                  </dt>
                  <dd className="text-fg">
                    {d.href ? (
                      <a href={d.href} className="link-underline text-fg">
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

          {/* Right: glass form */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
