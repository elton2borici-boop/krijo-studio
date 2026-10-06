import type { Metadata } from "next";
import { DM_Sans, Sora, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/structured-data";
import "./globals.css";

/* Body face — muted white at rest. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Display face — large, tight Sora for headlines and the wordmark. */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

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
      className={`${dmSans.variable} ${sora.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-canvas text-fg">
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
