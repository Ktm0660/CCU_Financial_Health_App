import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B2E4E",
          blue: "#1565C0",
          light: "#F5F7FB",
          ink: "#0F172A",
          gray: "#5B6B81",
          border: "#E6EAF2",
          soft: "#F9FAFC",
          success: "#0E9F6E",
          warn: "#D97706",
          danger: "#DC2626",
        },
      },
      fontSize: {
        "2xs": "0.75rem",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(11,46,78,0.06)",
        lift: "0 8px 24px rgba(11,46,78,0.10)",
        focus: "0 0 0 3px rgba(21,101,192,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
