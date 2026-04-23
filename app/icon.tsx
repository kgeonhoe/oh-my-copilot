/**
 * @file icon.tsx
 * @description Next.js App Router route for generating the site favicon.
 * Renders a terminal-style `$` prompt as an SVG icon.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";

/** Width and height of the generated icon in pixels. */
export const size = { width: 32, height: 32 };

/** Output format for the icon. */
export const contentType = "image/png";

/**
 * @description Generates the site favicon — a `$` symbol on the dark navy background,
 * matching the cyberpunk-terminal aesthetic of the site.
 * @returns An {@link ImageResponse} rendered as a 32×32 PNG.
 */
export default function Icon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060d1a",
        borderRadius: 6,
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 22,
          fontWeight: 700,
          color: "#00ccff",
          lineHeight: 1,
        }}
      >
        $
      </span>
    </div>,
    { ...size },
  );
}
