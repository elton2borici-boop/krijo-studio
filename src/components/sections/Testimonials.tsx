import { Section } from "@/components/ui/Section";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section labelledBy="zerat-titulli">
      {/* Styled as an eyebrow, but a real heading so the section is reachable
          by heading navigation. */}
      <h2
        id="zerat-titulli"
        className="text-xs font-semibold uppercase tracking-[0.12em] text-accent"
      >
        zëra klientësh
      </h2>

      <ul role="list" className="mt-10 grid gap-4 lg:grid-cols-3">
        {testimonials.map((q) => (
          <li key={q.name} className="card flex">
            <figure className="flex flex-1 flex-col p-7">
              <span
                aria-hidden
                className="font-display text-5xl leading-[0.5] text-accent"
              >
                “
              </span>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-fg sm:text-lg">
                {q.text}
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-0.5 border-t border-hairline pt-4 text-sm">
                <span className="font-semibold text-fg">{q.name}</span>
                <span className="text-fg-muted">{q.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
