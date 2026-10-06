/**
 * The four site structures offered in the "Puna & formati" picker, each with
 * a worked (illustrative, not client) example.
 */

export type MockId = "gastro" | "law" | "studio" | "shop";

export type FormatItem = {
  n: string;
  title: string;
  tag: string;
  text: string;
  best: string;
  bullets: string[];
  /** Worked example of this structure — replaces the old abstract wireframe.
      Merged in from the former "Punët" section, which asked the same question
      ("what shape of site do I need?") with different pictures. */
  example: {
    domain: string;
    label: string;
    caption: string;
    /** Which illustrative mock (components/sections/SiteMocks) to show. */
    mock: MockId;
  };
};

export const formats: FormatItem[] = [
  {
    n: "01",
    title: "Një faqe e vetme",
    tag: "One‑pager",
    text:
      "Gjithçka në një rrjedhë të vetme — i përshtatshëm kur mesazhi është i drejtpërdrejtë dhe vendimi merret shpejt.",
    best: "Për biznese të reja, evente, ose një produkt të vetëm.",
    bullets: [
      "Strukturë e shkurtër, vendim i shpejtë",
      "Përshtatje e shkëlqyer për telefonin",
      "Lansim më i shpejtë",
    ],
    example: {
      domain: "buke-vere.al",
      label: "Restorant në Tiranë",
      caption: "Menu e lexueshme në telefon dhe rezervim i dukshëm kudo.",
      mock: "gastro",
    },
  },
  {
    n: "02",
    title: "Uebsajt me nënfaqe",
    tag: "Klasik",
    text:
      "Kreu, rreth nesh, shërbimet, kontakti — strukturë e qartë që e ndan përmbajtjen sipas asaj që kërkon vizitori.",
    best: "Për biznese me disa shërbime.",
    bullets: [
      "Deri në 5–7 nënfaqe të dedikuara",
      "SEO më i thellë për çdo shërbim",
      "Më e lehtë për t’u rritur me kohën",
    ],
    example: {
      domain: "avokatura-arta.al",
      label: "Studio ligjore",
      caption:
        "Tipografi e qetë dhe shërbime të ndara qartë — besim që në lexim të parë.",
      mock: "law",
    },
  },
  {
    n: "03",
    title: "Portfolio",
    tag: "Vizual",
    text:
      "Fotografia dhe puna jote në qendër — me hapësirë, ritëm dhe një rrjedhë leximi që e bën galerinë protagonistin.",
    best: "Për fotografë, arkitektë, studio krijuese.",
    bullets: [
      "Galeri të shpejta dhe të pastra",
      "Tipografi e zgjedhur me kujdes",
      "Kategori dhe filtra sipas nevojës",
    ],
    example: {
      domain: "elira-nushi.al",
      label: "Portfolio fotografie",
      caption: "Galeria mban faqen; teksti rri mënjanë dhe nuk e pengon.",
      mock: "studio",
    },
  },
  {
    n: "04",
    title: "Dyqan online",
    tag: "E‑commerce",
    text:
      "Produkte, shportë, pagesa — me një menaxhim që mund ta përdorësh edhe pa njohuri teknike.",
    best: "Për markat që duan të shesin direkt, pa platforma të jashtme.",
    bullets: [
      "Pagesa me kartë dhe transfertë",
      "Stoku & porositë në një vend",
      "I integrueshëm me Instagram",
    ],
    example: {
      domain: "atelier12.al",
      label: "Dyqan artizanal online",
      caption:
        "Produkte, çmime dhe blerje e shpejtë — e menduar së pari për telefonin.",
      mock: "shop",
    },
  },
];
