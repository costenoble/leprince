import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await readFile(join(process.cwd(), "app/fonts/PlusJakartaSans-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2efe4",
          color: "#0e7d72",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        F
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Plus Jakarta Sans", data: fontData, weight: 800, style: "normal" }],
    }
  );
}
