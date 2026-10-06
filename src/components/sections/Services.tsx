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
              "card card-hover relative flex flex-col overflow-hidden p-6 sm:p-7",
              wide.has(i) && "lg:col-span-2",
              // The core service leads in brand blue.
              i === 0 && "tone-accent border-transparent"
            )}
          >
            {/* Oversized faint numeral as a quiet graphic anchor. Drawn as
                CSS content so it stays pure decoration, not page text. */}
            <span
              aria-hidden
              data-n={String(i + 1).padStart(2, "0")}
              className="pointer-events-none absolute -top-3 right-4 font-display text-8xl font-extrabold tabular-nums text-fg/[0.04] before:content-[attr(data-n)]"
            />

            <span className="grid size-12 place-items-center rounded-control bg-accent-soft text-accent">
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
