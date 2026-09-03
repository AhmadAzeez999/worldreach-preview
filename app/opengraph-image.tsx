import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { org, consultant } from "@/lib/content";

export const alt = `${org.registeredName}. ${consultant.title} ${consultant.rcicNumber}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required by `output: "export"`: rendered once at build time.
export const dynamic = "force-static";

/**
 * Social share card, generated at build time from the same content module and
 * the same mark geometry as the site. Nothing to keep in sync by hand.
 *
 * Two satori constraints shape the code below and are easy to trip over:
 *   1. inline <svg> elements are unreliable here, so the mark is serialised to
 *      a data URI and rendered as an <img>
 *   2. any element with more than one child node needs an explicit display, 
 *      and `{a} {b}` counts as three children, so every text node is composed
 *      into a single string first
 */

const LOGO = readFileSync(
  join(process.cwd(), "public", "logo-og.png"),
).toString("base64");
const LOGO_SRC = `data:image/png;base64,${LOGO}`;

export default function OpengraphImage() {
  const licence = `${consultant.titleShort} ${consultant.rcicNumber}`;
  const person = `${consultant.name} · ${consultant.title}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0e1f33",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Oversized mark cropped by the right edge. The same treatment the
            site's dark sections use. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by
            satori in next/og, where next/image does not exist. */}
        <img
          src={LOGO_SRC}
          width={660}
          height={532}
          alt=""
          style={{ position: "absolute", right: -150, top: 60, opacity: 0.07 }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori */}
          <img src={LOGO_SRC} width={62} height={50} alt="" />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            <div style={{ color: "#faf8f4", fontSize: 30 }}>{org.shortName}</div>
            <div
              style={{
                color: "#93a8bc",
                fontSize: 14,
                letterSpacing: "3.4px",
                marginTop: 6,
              }}
            >
              {org.descriptor.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#faf8f4",
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: "-2.6px",
              maxWidth: 820,
            }}
          >
            Immigration help you can verify.
          </div>
          <div style={{ color: "#93a8bc", fontSize: 26, marginTop: 28 }}>{person}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #26384c",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "#faf8f4", fontSize: 22, letterSpacing: "1.2px" }}>
            {licence}
          </div>
          <div style={{ color: "#93a8bc", fontSize: 22 }}>{org.locality}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
