import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#b9ddfd",
          300: "#7cc2fb",
          400: "#36a2f7",
          500: "#0c85eb",
          600: "#0267c7",
          700: "#0352a1",
          800: "#074684",
          900: "#0c3b6d",
          950: "#082548",
        },
        navy: {
          800: "#0f172a",
          900: "#0a0f1d",
          950: "#050811",
        },
        accent: {
          500: "#e11d48", // Rose/red accent for sports cars & badges
          600: "#be123c",
        }
      },
    },
  },
  plugins: [],
};
export default config;

