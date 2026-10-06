import { services } from "@/content/services";
import { ServiceIconGlyph } from "@/components/ui/ServiceIcons";

/**
 * A slow strip of the service names between the hero and the first section.
 * Screen readers get the list once; the duplicate copy that makes the loop
 * seamless is hidden from them.
 */
export function ServicesMarquee() {
  const items = services.map((s) => (
    <li
      key={s.title}
      className="flex shrink-0 items-center gap-3 px-6 font-display text-xl font-semibold whitespace-nowrap text-fg sm:px-10 sm:text-2xl"
    >
      <span className="text-accent">
        <ServiceIconGlyph name={s.icon} />
      </span>
      {s.title}
    </li>
  ));

  return (
    <div className="marquee relative overflow-hidden border-y border-hairline bg-surface py-6">
      <div className="marquee-track">
        <ul aria-label="Shërbimet tona" className="flex">
          {items}
        </ul>
        <ul aria-hidden className="flex">
          {items}
        </ul>
      </div>
      {/* Soft fade at both edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent"
      />
    </div>
  );
}
