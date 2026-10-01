import { site, addressLine } from "./site";

/**
 * LocalBusiness schema for Albanian local search.
 *
 * Every field is conditional. Google penalises structured data that
 * contradicts the visible page, so an unconfirmed address or phone number is
 * omitted rather than guessed — see the TODOs in src/lib/site.ts.
 */
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
      "Faqe interneti për biznese të vogla në Shqipëri. Nga €299 me TVSH, e publikuar në 5–7 ditë pune. Domain, email dhe mirëmbajtje.",
    inLanguage: "sq",
    areaServed: { "@type": "Country", name: "Shqipëri" },
    priceRange: "€29–€799",
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
    itemListElement: [
      { name: "Vetëm Faqja", price: "299", unit: null },
      { name: "Faqja + Domain", price: "399", unit: null },
      { name: "Mirëmbajtje", price: "29", unit: "MON" },
      { name: "Gjithçka", price: "799", unit: null },
    ].map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name },
      price: p.price,
      priceCurrency: "EUR",
      ...(p.unit
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.price,
              priceCurrency: "EUR",
              billingDuration: 1,
              billingIncrement: 1,
              unitCode: p.unit,
            },
          }
        : {}),
    })),
  };

  return data;
}
