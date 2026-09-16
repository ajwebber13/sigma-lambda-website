import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color: "#0A0908",
          background:
            "radial-gradient(circle at 32% 28%, #EBCB6E, #C9A227 46%, #8C6D1B 100%)",
        }}
      >
        ΑΦΑ
      </div>
    ),
    size
  );
}
