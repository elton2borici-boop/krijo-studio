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
              "card card-hover relative flex flex-col p-6 sm:p-8",
              wide.has(i) && "lg:col-span-2"
            )}
          >
            <span className="text-accent">
              <ServiceIconGlyph name={s.icon} />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-fg">
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
