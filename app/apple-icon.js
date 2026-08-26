import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fontData = await readFile(join(process.cwd(), "app/fonts/PlusJakartaSans-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2efe4",
          color: "#0e7d72",
          fontSize: 34,
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        <div>Flash</div>
        <div>Net</div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Plus Jakarta Sans", data: fontData, weight: 800, style: "normal" }],
    }
  );
}
