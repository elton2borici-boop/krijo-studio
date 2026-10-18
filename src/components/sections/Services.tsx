import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIconGlyph } from "@/components/ui/ServiceIcons";
import { cn } from "@/lib/utils";
import { services } from "@/content/services";

/* Bento rhythm on desktop: wide/narrow, narrow/wide, wide/narrow — so the
   six cards read as a composed grid rather than two identical rows. */
const wide = new Set([0, 3, 4]);

export function Services() {
  return (
    <Section id="sherbimet" tone="raised" labelledBy="sherbimet-titulli">
      <SectionHeading
        id="sherbimet-titulli"
        label="shërbimet"
        title="Gjashtë fusha, të mbuluara në çdo projekt"
        lede="Nëse diçka del jashtë kësaj liste, e diskutojmë së bashku para se të nisim."
      />

      <ul
        role="list"
        className="stagger mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s, i) => (
          <li
            key={s.title}
            style={{ "--i": i } as React.CSSProperties}
            className={cn(
              "card card-hover group relative isolate flex flex-col overflow-hidden p-6 sm:p-8",
              wide.has(i) && "lg:col-span-2"
            )}
          >
            {/* Oversized faint numeral as a quiet graphic anchor, kept fully
                inside the card. Drawn as CSS content so it stays pure
                decoration, not page text. */}
            <span
              aria-hidden
              data-n={String(i + 1).padStart(2, "0")}
              className="pointer-events-none absolute top-5 right-6 font-display text-6xl leading-none font-extrabold tabular-nums text-fg/[0.06] before:content-[attr(data-n)]"
            />
            {/* Accent light in the corner on hover. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,var(--accent-soft),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <span className="grid size-12 place-items-center rounded-control bg-[linear-gradient(180deg,var(--accent-fill),color-mix(in_srgb,var(--accent-fill)_78%,#000))] text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_10px_20px_-10px_var(--accent-fill)]">
              <ServiceIconGlyph name={s.icon} />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-fg">
              {s.title}
            </h3>
            <p
              className={cn(
                "mt-2.5 text-sm leading-relaxed text-fg-muted",
                wide.has(i) && "lg:max-w-lg lg:text-base"
              )}
            >
              {s.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
