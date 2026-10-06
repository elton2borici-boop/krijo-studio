import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";

export function Services() {
  return (
    <Section id="sherbimet" tone="raised" labelledBy="sherbimet-titulli">
      <SectionHeading
        id="sherbimet-titulli"
        label="shërbimet"
        title="Gjashtë fusha, të mbuluara në çdo projekt"
        lede="Nëse diçka del jashtë kësaj liste, e diskutojmë së bashku para se të nisim."
      />

      <ul role="list" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.title} className="card flex flex-col p-6">
            <span className="text-sm font-semibold tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-fg">
              {s.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
              {s.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
