import { Container } from "./ui/Container";
import { InstagramIcon, FacebookIcon, LinkedInIcon } from "./icons/Social";
import { site, addressLine, telHref, whatsappHref } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  // Only render channels that actually go somewhere. A dead `href="#"` in the
  // footer reads as an abandoned site.
  const socials = [
    { Icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
    { Icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
    { Icon: LinkedInIcon, href: site.social.linkedin, label: "LinkedIn" },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  const address = addressLine();
  const tel = telHref();
  const whatsapp = whatsappHref();

  const contactLinks = [
    { label: site.email, href: `mailto:${site.email}` },
    tel && site.phoneDisplay ? { label: site.phoneDisplay, href: tel } : null,
    whatsapp ? { label: "WhatsApp", href: whatsapp } : null,
    address
      ? {
          label: address,
          href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
        }
      : null,
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  return (
    <footer className="border-t border-hairline bg-canvas-deep py-16 sm:py-20">
      <Container>
        {/* Big wordmark */}
        <div className="serif flex items-baseline border-b border-hairline pb-8 text-[clamp(4rem,18vw,18rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-fg">
          krijo<span className="text-gradient">.</span>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-10 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 min-w-0 lg:col-span-4">
            <p className="serif max-w-sm text-[20px] leading-[1.35] text-fg">
              Faqe për biznese të vogla.<br />
              {site.city}, {site.country} &mdash;{" "}
              <span className="italic">që nga {site.foundingYear}.</span>
              <br />
              Nga €299, me çmimet në faqe.
            </p>

            {socials.length > 0 && (
              <div className="mt-7 flex items-center gap-4 text-fg-muted">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {[
            {
              title: "Studio",
              links: [
                { label: "Formatet", href: "#formatet" },
                { label: "Çmimet", href: "#cmimet" },
                { label: "Shërbimet", href: "#sherbimet" },
                { label: "Procesi", href: "#procesi" },
              ],
            },
            {
              title: "Kontakt",
              links: contactLinks,
            },
            {
              title: "Të dobishme",
              links: [
                { label: "Pyetje të shpeshta", href: "#faq" },
                { label: "Politika e privatësisë", href: "/privatesia" },
              ],
            },
          ].map((col) => {
            // Give the Kontakt column more room (long email + address);
            // squeeze Studio slightly so the row still totals 12 on lg.
            const span =
              col.title === "Kontakt"
                ? "sm:col-span-4 lg:col-span-3"
                : col.title === "Studio"
                  ? "sm:col-span-4 lg:col-span-2"
                  : "sm:col-span-4 lg:col-span-3";
            return (
              <div
                key={col.title}
                className={`col-span-12 min-w-0 ${span} lg:col-start-auto`}
              >
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">{col.title}</div>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l.label} className="min-w-0">
                      <a
                        href={l.href}
                        className="link-underline inline-block max-w-full break-words text-[14px] text-fg transition-colors hover:text-accent"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-hairline pt-6 text-[12.5px] text-fg-muted sm:flex-row sm:items-baseline">
          <span>
            © {year} {site.name}
            {site.nipt && ` · NIPT ${site.nipt}`}
          </span>
          <span>Ndërtuar me kujdes në Tiranë.</span>
        </div>
      </Container>
    </footer>
  );
}
