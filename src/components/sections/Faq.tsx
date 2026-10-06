import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";

export function Faq() {
  return (
    <Section id="faq" tone="raised" labelledBy="faq-titulli">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <SectionHeading
          id="faq-titulli"
          className="lg:col-span-4"
          label="pyetjet"
          title={
            <>
              Pyetjet që na{" "}
              <span className="text-accent">bëjnë më shpesh.</span>
            </>
          }
          lede="Nuk e gjete përgjigjen këtu? Na shkruaj me email — zakonisht përgjigjemi brenda 24 orësh gjatë ditëve të punës."
        />

        <ul role="list" className="flex flex-col gap-3 lg:col-span-8">
          {faqs.map((f, i) => (
            <li key={f.q} className="card overflow-hidden">
              {/* Native <details>: keyboard and screen-reader support for free. */}
              <details className="group">
                <summary className="grid cursor-pointer list-none grid-cols-[2rem_1fr_1.5rem] items-start gap-x-3 rounded-card px-5 py-5 transition-colors hover:bg-canvas-raised/60 [&::-webkit-details-marker]:hidden">
                  <span className="pt-1 text-sm font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold leading-snug text-fg">
                    {f.q}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="mt-1.5 size-4 text-fg-muted transition-transform duration-200 group-open:rotate-45 group-open:text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 pl-[3.75rem] text-base leading-relaxed text-fg-muted">
                  {f.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
