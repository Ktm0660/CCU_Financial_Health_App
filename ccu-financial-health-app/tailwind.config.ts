import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0D3554",
          blue: "#0B66C3",
          sky: "#E9F3FA",
          mist: "#F6FAFD",
          gradientStart: "#1F63B6",
          gradientEnd: "#27B0C7",
          accent: "#0E7DB6",
          light: "#F6F9FC",
          ink: "#0F172A",
          gray: "#64748B",
          success: "#0E9F6E",
          warn: "#D97706",
          danger: "#DC2626",
        },
      },
      boxShadow: {
        soft: "0 6px 24px rgba(13,53,84,0.08)",
        card: "0 8px 30px rgba(13,53,84,0.10)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      fontSize: {
        display: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        eyebrow: ["0.75rem", { letterSpacing: "0.06em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};
export default config;
