import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

/* Calm, readable pair: no variable optical sliders (those can redraw oddly on scroll). */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
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
      className={`${dmSans.variable} ${sourceSerif.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-paper text-ink">
        <a href="#permbajtja" className="skip-link">
          Kalo te përmbajtja
        </a>
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--color-ink)",
              color: "var(--color-paper)",
              border: "none",
              borderRadius: 0,
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "12px 18px",
            },
            success: {
              iconTheme: {
                primary: "var(--color-accent)",
                secondary: "var(--color-paper)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--color-accent)",
                secondary: "var(--color-paper)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
