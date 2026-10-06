/**
 * The packages on offer — the single source of truth.
 *
 * Read by the pricing cards, the contact form's radio options, the API's
 * validation enum, lead notifications and the JSON-LD offer catalog. Change a
 * price or add a package here and every one of those follows.
 */

export type Package = {
  id: PackageId;
  name: string;
  tagline: string;
  /** Euros, VAT included. */
  price: number;
  /** Billed monthly rather than once. */
  monthly?: boolean;
  note: string;
  description: string;
  features: string[];
  cta: string;
  /** The one plan the page steers people toward. */
  starred?: boolean;
};

export const PACKAGE_IDS = [
  "vetem-faqja",
  "faqja-plus-domain",
  "mirembajtje",
  "premium",
] as const;

export type PackageId = (typeof PACKAGE_IDS)[number];

/** Extra contact-form option for people who don't fit a package. */
export const OTHER_OPTION = { id: "tjeter", label: "Diçka tjetër / pyetje" } as const;

/** Every value the contact form may submit for `package`. */
export const INTEREST_IDS = [...PACKAGE_IDS, OTHER_OPTION.id] as const;

export const packages: Package[] = [
  {
    id: "vetem-faqja",
    name: "Vetëm Faqja",
    tagline: "Fillimi yt",
    price: 299,
    note: "Një pagesë e vetme. Pa kosto mujore.",
    description: "Ti sjell domain-in dhe hosting-un. Ne sjellim faqen.",
    features: [
      "Deri në 5 faqe të personalizuara",
      "Dizajn unik, kod nga zero",
      "Plotësisht responsive",
      "Formular kontakti",
      "SEO bazë",
      "Dorëzim brenda 7 ditësh",
    ],
    cta: "Zgjidh këtë pako",
  },
  {
    id: "faqja-plus-domain",
    name: "Faqja + Domain",
    tagline: "Gati për nisje",
    price: 399,
    note: "Një pagesë e vetme. Domain & email të përfshira për 1 vit.",
    description: "Gjithçka për të nisur. Asgjë tjetër për të blerë.",
    features: [
      "Gjithçka nga pakoja Vetëm Faqja",
      "Domain falas vitin e parë (.al/.com)",
      "Email profesional @biznesi-yt",
      "DNS i konfiguruar plotësisht",
      "Integrim me Instagram & Facebook",
      "Dorëzim brenda 5 ditësh",
    ],
    cta: "Nis me këtë pako",
    starred: true,
  },
  {
    id: "mirembajtje",
    name: "Mirëmbajtje",
    tagline: "Për faqet ekzistuese",
    price: 29,
    monthly: true,
    note: "Asnjë kontratë afatgjatë. Anulim kur të duash.",
    description: "Ti ke tashmë faqen. Ne mbajmë gjithçka në rregull.",
    features: [
      "Përditësime të rregullta",
      "Kopje rezervë ditore",
      "Monitorim 24/7",
      "Rregullim defektesh",
      "2 ndryshime përmbajtjeje/muaj",
      "Raport mujor",
    ],
    cta: "Aktivizo mirëmbajtjen",
  },
  {
    id: "premium",
    name: "Gjithçka",
    tagline: "Eksperienca e plotë",
    price: 799,
    note: "+ €39/muaj mirëmbajtje. Pa kufizim faqesh.",
    description:
      "Lansim i plotë: faqe, domain, hosting, email, SEO, mirëmbajtje.",
    features: [
      "Numër i pakufizuar faqesh",
      "Domain .al + .com (2 vjet)",
      "Hosting premium me CDN global",
      "5 email-e profesionale",
      "Mirëmbajtje 24/7 e përfshirë",
      "SEO i avancuar + Google Ads",
      "Blog / Lajme / Newsletter",
      "Linjë WhatsApp e dedikuar",
    ],
    cta: "Zgjidh këtë pako",
  },
];

/** "€29/muaj" or "€299". */
export function formatPrice(p: Pick<Package, "price" | "monthly">) {
  return `€${p.price}${p.monthly ? "/muaj" : ""}`;
}

/** The unit printed next to a big price figure: "€" or "€/muaj". */
export function priceUnit(p: Pick<Package, "monthly">) {
  return p.monthly ? "€/muaj" : "€";
}

/** Human label for a submitted interest id, e.g. "Mirëmbajtje (€29/muaj)". */
export function interestLabel(id: string): string {
  if (id === OTHER_OPTION.id) return OTHER_OPTION.label;
  const p = packages.find((pkg) => pkg.id === id);
  return p ? `${p.name} (${formatPrice(p)})` : id;
}
