import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0E2F44",
          teal: "#0F79A6",
          sky: "#E9F5FB",
          card: "#FFFFFF",
          soft: "#F4F7FB",
          ink: "#0D2940",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "ui-sans-serif",
          "Segoe UI",
          "Roboto",
          "Arial",
        ],
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
