import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Krijo Studio — faqe interneti, domain dhe mirëmbajtje";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build/request time rather than shipped as a static PNG, so the
 * card stays in sync with the wordmark and the palette. Plain system type —
 * next/og would need the font binaries fetched to use Sora here.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Mesh glow, echoing the hero */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(31,95,191,0.16), rgba(251,250,247,0) 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -120,
            width: 580,
            height: 580,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(91,63,212,0.13), rgba(251,250,247,0) 64%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#15181d",
            letterSpacing: "-0.02em",
          }}
        >
          krijo<span style={{ color: "#1f5fbf" }}>.</span>
          <span
            style={{
              marginLeft: 18,
              fontSize: 20,
              fontWeight: 400,
              color: "#4e535c",
              alignSelf: "center",
            }}
          >
            studio · {site.city.toLowerCase()}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              color: "#15181d",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
            }}
          >
            E publikuar
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              color: "#1f5fbf",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
            }}
          >
            në 5–7 ditë.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              color: "#4e535c",
            }}
          >
            Nga €299, me TVSH · faqe, domain dhe email.
          </div>
        </div>
      </div>
    ),
    size
  );
}
