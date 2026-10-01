/**
 * The commercial facts the page is allowed to claim.
 * Pricing cards, the format picker, and the contact form all read from here
 * so a button can never offer a package the form does not know about.
 */

export const packages = [
  { id: "vetem-faqja", label: "Vetëm Faqja", price: "€299" },
  { id: "faqja-plus-domain", label: "Faqja + Domain", price: "€399" },
  { id: "mirembajtje", label: "Mirëmbajtje", price: "€29/muaj" },
  { id: "premium", label: "Gjithçka", price: "€799" },
  { id: "tjeter", label: "Diçka tjetër / pyetje", price: "" },
] as const;

export type PackageId = (typeof packages)[number]["id"];

const packageIds = new Set<string>(packages.map((p) => p.id));

export function isPackageId(value: string | null): value is PackageId {
  return value !== null && packageIds.has(value);
}

export function packageById(id: string | null) {
  return packages.find((p) => p.id === id) ?? null;
}

export const formatChoices = [
  { id: "nje-faqe", label: "Një faqe e vetme" },
  { id: "nenfaqe", label: "Uebsajt me nënfaqe" },
  { id: "portfolio", label: "Portfolio" },
  { id: "dyqan", label: "Dyqan online" },
] as const;

export type FormatId = (typeof formatChoices)[number]["id"];

const formatIds = new Set<string>(formatChoices.map((f) => f.id));

export function isFormatId(value: string | null): value is FormatId {
  return value !== null && formatIds.has(value);
}

export function formatById(id: string | null) {
  return formatChoices.find((f) => f.id === id) ?? null;
}

/** Same-page jump that carries the choice into the contact form. */
export function contactHref(opts?: { pako?: PackageId; format?: FormatId }) {
  const params = new URLSearchParams();
  if (opts?.pako) params.set("pako", opts.pako);
  if (opts?.format) params.set("format", opts.format);
  const query = params.toString();
  return query ? `/?${query}#kontakt` : "/#kontakt";
}
