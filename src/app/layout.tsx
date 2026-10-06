import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { site } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/structured-data";
import "./globals.css";

/* Body face. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Display face — headlines and the wordmark. */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/**
 * Runs before first paint so the page never flashes the wrong theme: a stored
 * choice wins, otherwise the OS setting — which it keeps following live until
 * the visitor picks one with the toggle.
 */
const themeScript = `(function(){try{var d=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)");function a(){var s=localStorage.getItem("theme");d.dataset.theme=s==="dark"||s==="light"?s:m.matches?"dark":"light"}a();m.addEventListener("change",a)}catch(e){}})()`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1014" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: "Krijo Studio — Faqe interneti, domain & mirëmbajtje në shqip",
  description:
    "Studio e vogël dixhitale në Tiranë. Ndërtojmë faqe interneti me kujdes, regjistrojmë e konfigurojmë domain-e dhe i mirëmbajmë pa surpriza. Vetëm 4 pako, me çmime të hapura.",
  keywords: [
    "faqe interneti shqip",
    "krijim website Shqipëri",
    "domain .al",
    "hosting Shqipëri",
    "mirëmbajtje website",
    "Krijo Studio",
  ],
  openGraph: {
    title: "Krijo Studio — Faqe interneti për biznesin tënd",
    description:
      "Studio e vogël dixhitale shqiptare. Faqe, domain, hosting, mirëmbajtje.",
    type: "website",
    locale: "sq_AL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sq"
      className={`${dmSans.variable} ${sora.variable} h-full`}
      // The theme script sets data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative flex min-h-full flex-col bg-canvas text-fg">
        <script
          type="application/ld+json"
          // Serialized from a typed object we control, not user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <a href="#permbajtja" className="skip-link">
          Kalo te përmbajtja
        </a>
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
