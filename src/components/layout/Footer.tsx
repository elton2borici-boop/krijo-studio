import { Container } from "@/components/ui/Container";
import { InstagramIcon, FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
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

  const columns = [
    {
      title: "Studio",
      span: "lg:col-span-2",
      links: [
        { label: "Puna jonë", href: "/#punet" },
        { label: "Çmimet", href: "/#cmimet" },
        { label: "Shërbimet", href: "/#sherbimet" },
        { label: "Procesi", href: "/#procesi" },
      ],
    },
    { title: "Kontakt", span: "lg:col-span-3", links: contactLinks },
    {
      title: "Të dobishme",
      span: "lg:col-span-3",
      links: [
        { label: "Pyetje të shpeshta", href: "/#faq" },
        { label: "Politika e privatësisë", href: "/privatesia" },
      ],
    },
  ];

  return (
    <footer className="tone-ink py-16 sm:py-20">
      <Container>
        {/* Decorative wordmark — the name is already in the header logo. */}
        <p
          aria-hidden
          className="border-b border-hairline pb-8 font-display text-[clamp(4rem,18vw,14rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-fg"
        >
          krijo<span className="text-accent">.</span>
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 sm:col-span-3 lg:col-span-4">
            <p className="max-w-sm text-lg leading-snug text-fg">
              Studio e vogël dixhitale.
              <br />
              {site.city}, {site.country} &mdash;{" "}
              <span className="italic">që nga {site.foundingYear}.</span>
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-4">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-fg-muted transition-colors hover:text-accent"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className={`min-w-0 ${col.span}`}
            >
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label} className="min-w-0">
                    <a
                      href={l.href}
                      className="link-underline inline-block max-w-full break-words text-sm text-fg hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-hairline pt-6 text-sm text-fg-muted sm:flex-row sm:items-baseline">
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
