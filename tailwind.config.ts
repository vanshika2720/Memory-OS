import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        secondary: "#555555",
        tertiary: "#333333",
        faint: "#2a2a2a",
        border: {
          DEFAULT: "#111111",
          subtle: "#0a0a0a",
        },
      },
      fontFamily: {
        headline: ["var(--font-bebas-neue)"],
        body: ["var(--font-dm-sans)"],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
