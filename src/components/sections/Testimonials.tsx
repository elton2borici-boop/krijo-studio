import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="relative bg-canvas py-16 sm:py-24">
      <Container>
        <Eyebrow className="mb-9 sm:mb-11">zëra klientësh</Eyebrow>

        <div className="grid grid-cols-12 gap-5">
          {testimonials.map((q) => (
            <figure
              key={q.name}
              className="col-span-12 flex flex-col rounded-2xl glass p-7 lg:col-span-4"
            >
              <span className="serif text-[52px] leading-[0.5] text-gradient" aria-hidden>
                “
              </span>
              <blockquote className="mt-4 flex-1 text-[16px] leading-[1.5] text-fg sm:text-[17px]">
                {q.text}
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-1 border-t border-hairline pt-4 text-[13px]">
                <span className="text-fg">{q.name}</span>
                <span className="max-w-none text-pretty leading-relaxed text-fg-muted">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
