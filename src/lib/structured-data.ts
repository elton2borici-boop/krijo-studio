import { site, addressLine } from "./site";
import { packages } from "@/content/packages";

/**
 * LocalBusiness schema for Albanian local search.
 *
 * Every field is conditional. Google penalises structured data that
 * contradicts the visible page, so an unconfirmed address or phone number is
 * omitted rather than guessed — see the TODOs in src/lib/site.ts.
 */
function priceRange() {
  const prices = packages.map((p) => p.price);
  return `€${Math.min(...prices)}–€${Math.max(...prices)}`;
}

export function localBusinessJsonLd() {
  const address = addressLine();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    email: site.email,
    description:
      "Studio e vogël dixhitale në Tiranë. Faqe interneti, domain, hosting dhe mirëmbajtje, me çmime të hapura.",
    inLanguage: "sq",
    areaServed: { "@type": "Country", name: "Shqipëri" },
    priceRange: priceRange(),
    foundingDate: String(site.foundingYear),
    knowsLanguage: ["sq", "en"],
  };

  if (site.legalName) data.legalName = site.legalName;
  if (site.nipt) data.taxID = site.nipt;
  if (site.phoneE164) data.telephone = `+${site.phoneE164}`;

  if (address) {
    data.address = {
      "@type": "PostalAddress",
      // Omitted entirely rather than emitted as null when the street is
      // unconfirmed — a null field is a validation error in Rich Results.
      ...(site.street ? { streetAddress: site.street } : {}),
      addressLocality: site.city,
      addressCountry: site.countryCode,
    };
  }

  const socials = Object.values(site.social).filter(
    (u): u is string => Boolean(u)
  );
  if (socials.length) data.sameAs = socials;

  data.hasOfferCatalog = {
    "@type": "OfferCatalog",
    name: "Pako",
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name },
      price: String(p.price),
      priceCurrency: "EUR",
      ...(p.monthly
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: String(p.price),
              priceCurrency: "EUR",
              billingDuration: 1,
              billingIncrement: 1,
              unitCode: "MON",
            },
          }
        : {}),
    })),
  };

  return data;
}
