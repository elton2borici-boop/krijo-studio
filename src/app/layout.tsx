import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { site } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/structured-data";
import "./globals.css";

/* Both families are variable fonts, so one file per family covers every
   weight. Only `latin` is preloaded: Albanian's ç and ë, plus € and —, are
   all in it. The other subsets stay declared and download only if a page
   actually uses one of their characters. */

/* Body face. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Display face — headlines and the wordmark. */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

/* The site is dark only (see globals.css), so the browser chrome matches. */
export const viewport: Viewport = {
  themeColor: "#0e1014",
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
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "sq_AL",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq" className={`${dmSans.variable} ${sora.variable} h-full`}>
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
