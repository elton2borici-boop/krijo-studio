import { Container } from "./ui/Container";
import { InstagramIcon, FacebookIcon, LinkedInIcon } from "./icons/Social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper-deep py-16 sm:py-20">
      <Container>
        {/* Big wordmark */}
        <div className="serif flex items-baseline border-b border-ink/30 pb-8 text-[clamp(4rem,18vw,18rem)] leading-[0.85] tracking-[-0.04em] text-ink">
          Krijo<span className="text-accent">.</span>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-10 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 min-w-0 lg:col-span-4">
            <p className="serif max-w-sm text-[20px] leading-[1.35] text-ink">
              Studio e vogël dixhitale.<br />
              Tiranë, Shqipëri &mdash; <span className="italic">që nga 2024.</span>
            </p>

            <div className="mono mt-7 flex items-center gap-4 text-[11px] uppercase text-ink-soft">
              {[
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-paper-soft"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Studio",
              links: [
                { label: "Shërbimet", href: "#sherbimet" },
                { label: "Puna jonë", href: "#punet" },
                { label: "Çmimet", href: "#cmimet" },
                { label: "Filozofia", href: "#pse-ne" },
                { label: "Procesi", href: "#procesi" },
              ],
            },
            {
              title: "Kontakt",
              links: [
                { label: "pershendetje@krijo.studio", href: "mailto:pershendetje@krijo.studio" },
                { label: "+355 69 555 0123", href: "tel:+355695550123" },
                { label: "WhatsApp", href: "https://wa.me/355695550123" },
                { label: "Rr. Myslym Shyri, Tiranë", href: "https://maps.google.com/?q=Tirana" },
              ],
            },
            {
              title: "Të dobishme",
              links: [
                { label: "Pyetje të shpeshta", href: "#faq" },
                { label: "Termat & Kushtet", href: "#" },
                { label: "Politika e privatësisë", href: "#" },
                { label: "Blog (së shpejti)", href: "#" },
              ],
            },
          ].map((col, i) => {
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
                <div className="mono mb-4 text-[10px] uppercase text-ink-soft">{col.title}</div>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l.label} className="min-w-0">
                      <a
                        href={l.href}
                        className="link-underline inline-block max-w-full break-words text-[14px] text-ink transition-colors hover:text-paper-soft"
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

        <div className="mono mt-14 flex flex-col items-start justify-between gap-2 border-t border-rule pt-6 text-[11px] uppercase text-ink-soft sm:flex-row sm:items-baseline">
          <span>© {year} Krijo Studio · NIPT L24XXXXXXXR</span>
          <span>Ndërtuar me kujdes në Tiranë.</span>
        </div>
      </Container>
    </footer>
  );
}
