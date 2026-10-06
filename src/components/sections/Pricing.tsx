import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { cn } from "@/lib/utils";
import { packages, priceUnit } from "@/content/packages";

export function Pricing() {
  return (
    <Section id="cmimet" labelledBy="cmimet-titulli">
      <SectionHeading
        id="cmimet-titulli"
        label="çmimet"
        size="lg"
        title={
          <>
            Katër pako. <span className="text-accent">Çmime të hapura.</span>
          </>
        }
        lede="Në Euro, me TVSH të përfshirë. Pa kosto të fshehura — dhe nëse të duhet diçka tjetër, bëjmë ofertë të personalizuar."
      />

      {/* Phones: a swipeable row (cards peek), focusable so it can also be
          scrolled from the keyboard. Tablets: 2×2. Desktop: 4 across. */}
      <ul
        role="list"
        tabIndex={0}
        aria-label="Pakot"
        className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        {packages.map((p) => (
          <li
            key={p.id}
            className={cn(
              "card relative flex w-[82vw] max-w-sm shrink-0 snap-center flex-col p-6 transition-colors duration-200 sm:w-auto sm:max-w-none",
              p.starred
                ? "border-accent shadow-raised"
                : "hover:border-hairline-strong"
            )}
          >
            {p.starred && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent-fill px-3 py-1 text-xs font-semibold text-on-accent">
                Rekomanduar për biznese të reja
              </span>
            )}

            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
              {p.tagline}
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-fg">
              {p.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {p.description}
            </p>

            <p className="mt-6 flex items-baseline gap-1.5 border-t border-hairline pt-5">
              <span className="font-display text-4xl font-bold tabular-nums leading-none text-fg">
                {p.price}
              </span>
              <span className="text-sm font-medium text-fg-muted">
                {priceUnit(p)}
              </span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-fg-muted">
              {p.note}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5 border-t border-hairline pt-5">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm leading-snug text-fg">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <ButtonLink
                href="#kontakt"
                variant={p.starred ? "primary" : "secondary"}
                className="w-full justify-between"
              >
                <span>{p.cta}</span>
                <span aria-hidden>→</span>
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>

      {/* Swipe affordance: a peeking card alone doesn't say the row scrolls. */}
      <p
        aria-hidden
        className="mt-3 text-center text-xs font-medium text-fg-muted sm:hidden"
      >
        ← rrëshqit për të gjitha katër pakot →
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-sm leading-relaxed text-fg-muted">
          * çmimet me TVSH të përfshirë. † IBAN shqiptar, transfertë
          ndërkombëtare ose para në dorë.
        </p>
        <a
          href="#kontakt"
          className="link-underline text-sm font-medium text-accent"
        >
          nuk je i sigurt? bisedo me ne →
        </a>
      </div>
    </Section>
  );
}
