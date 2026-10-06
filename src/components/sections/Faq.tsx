import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";

export function Faq() {
  return (
    <section id="faq" className="relative bg-canvas-raised py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeading
              label="pyetjet"
              title={
                <>
                  Pyetjet që na{" "}
                  <span className="text-gradient">bëjnë më shpesh.</span>
                </>
              }
              lede="Nuk e gjete përgjigjen këtu? Na shkruaj me email — zakonisht përgjigjemi brenda 24 orësh gjatë ditëve të punës."
            />
          </div>

          <ul className="col-span-12 flex flex-col gap-3 lg:col-span-8">
            {faqs.map((f, i) => (
              <li key={f.q} className="overflow-hidden rounded-xl glass">
                <details className="group">
                  <summary className="grid w-full cursor-pointer list-none grid-cols-[32px_1fr_28px] items-start gap-x-3 px-5 py-5 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mono tnum pt-1 text-[11px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="serif text-[18px] font-semibold leading-snug text-fg sm:text-[20px] lg:group-hover:text-accent">
                      {f.q}
                    </span>
                    <span className="mono pt-0.5 text-right text-[17px] text-fg-muted transition-transform duration-150 group-open:rotate-45 group-open:text-accent">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 pl-[52px] text-[15px] leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
