import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/testimonials";

/** "Av. Erald Berisha" → "EB": skips honorifics ending in a dot. */
function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => !w.endsWith("."))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials() {
  return (
    <Section labelledBy="zerat-titulli">
      <SectionHeading id="zerat-titulli" title="Zëra klientësh" />

      {/* First quote is featured large; the other two stack beside it. */}
      <ul
        role="list"
        className="stagger mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2"
      >
        {testimonials.map((q, i) => {
          const featured = i === 0;
          return (
            <li
              key={q.name}
              style={{ "--i": i } as React.CSSProperties}
              className={cn(
                "card relative isolate flex overflow-hidden",
                // The featured quote is a navy panel (tone-ink re-themes its
                // contents).
                featured && "tone-ink lg:col-span-2 lg:row-span-2"
              )}
            >
              <figure
                className={cn(
                  "flex flex-1 flex-col",
                  featured ? "p-8 sm:p-10" : "p-7"
                )}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 32 24"
                  className={cn("text-accent", featured ? "h-8 w-10" : "h-5 w-7")}
                  fill="currentColor"
                >
                  <path d="M0 24V14C0 6.3 4.1 1.6 12.2 0l1.4 3.4C9 4.8 7 7.3 6.7 11H12v13H0Zm18 0V14c0-7.7 4.1-12.4 12.2-14l1.4 3.4C27 4.8 25 7.3 24.7 11H30v13H18Z" />
                </svg>
                <blockquote
                  className={cn(
                    "flex-1 text-fg",
                    featured
                      ? "mt-6 font-display text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl lg:leading-tight"
                      : "mt-6 text-base leading-relaxed"
                  )}
                >
                  {q.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-hairline pt-5 text-sm">
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent"
                  >
                    {initials(q.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-fg">{q.name}</span>
                    <span className="text-fg-muted">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
