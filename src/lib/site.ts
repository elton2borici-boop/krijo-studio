/**
 * Single source of truth for business identity.
 *
 * Anything that is not yet confirmed is `null`, and every consumer omits null
 * fields rather than rendering a placeholder. A fabricated tax ID or a dead
 * social link costs more trust than an absent one — especially in the footer,
 * where a cautious buyer goes looking for proof the business is real.
 *
 * TODO(owner): fill in the nulls below with the registered values, and confirm
 * the non-null ones are correct before launch.
 */

export type SiteConfig = {
  name: string;
  legalName: string | null;
  /** Albanian tax ID. MUST stay null until the real one is known. */
  nipt: string | null;
  email: string;
  /** E.164, digits only after the +, for tel: and wa.me links. */
  phoneE164: string | null;
  /** Human-readable form of the same number. */
  phoneDisplay: string | null;
  whatsapp: boolean;
  street: string | null;
  city: string;
  country: string;
  countryCode: string;
  /** Public site origin, no trailing slash. Used for sitemap/robots/JSON-LD. */
  url: string;
  foundingYear: number;
  openingHours: string | null;
  social: {
    instagram: string | null;
    facebook: string | null;
    linkedin: string | null;
  };
};

export const site: SiteConfig = {
  name: "Krijo Studio",
  legalName: null,

  // Placeholder was "L24XXXXXXXR" — an obviously fake tax ID rendered in the
  // footer. Left null so the line is simply omitted until the real one lands.
  nipt: null,

  // CONFIRM: is this mailbox actually receiving mail?
  email: "pershendetje@krijo.studio",

  // CONFIRM: the previous value (+355 69 555 0123) follows the reserved
  // 555 dummy-number pattern and is almost certainly not a real line.
  phoneE164: null,
  phoneDisplay: null,
  whatsapp: false,

  // CONFIRM: registered address, if the studio takes visitors at all.
  street: null,
  city: "Tiranë",
  country: "Shqipëri",
  countryCode: "AL",

  // CONFIRM: the production domain.
  url: "https://krijo.studio",

  foundingYear: 2024,
  openingHours: "E hënë — E premte · 09:00 — 19:00",

  social: {
    instagram: null,
    facebook: null,
    linkedin: null,
  },
};

/** Full address on one line, skipping unknown parts. Null if nothing is known. */
export function addressLine(): string | null {
  const parts = [site.street, site.city].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export function telHref(): string | null {
  return site.phoneE164 ? `tel:+${site.phoneE164}` : null;
}

export function whatsappHref(): string | null {
  return site.whatsapp && site.phoneE164 ? `https://wa.me/${site.phoneE164}` : null;
}
