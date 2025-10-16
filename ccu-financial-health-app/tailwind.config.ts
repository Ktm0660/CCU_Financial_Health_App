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
          navy: "#0B2E4E",
          blue: "#1565C0",
          light: "#F6F9FC",
          ink: "#0F172A",
          gray: "#64748B",
          success: "#0E9F6E",
          warn: "#D97706",
          danger: "#DC2626",
        },
      },
      boxShadow: {
        card: "0 8px 30px rgba(2, 18, 46, 0.08)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "22px",
      },
    },
  },
  plugins: [],
};
export default config;
