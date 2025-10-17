import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f3f7fb",
          100: "#e6eef7",
          200: "#cfe0f0",
          300: "#a8c7e4",
          400: "#78a8d6",
          500: "#3f84c5",
          600: "#2f6aa5",
          700: "#255382",
          800: "#1e446a",
          900: "#173653"
        },
        accent: {
          500: "#1fb6ff"
        }
      },
      fontFamily: {
        serif: ['"Georgia"', 'ui-serif', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: "0 6px 24px rgba(18, 62, 105, 0.08)",
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  plugins: [typography, forms],
}

export default config
