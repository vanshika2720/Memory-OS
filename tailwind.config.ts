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
        secondary: "#a0a0a0",
        tertiary: "#808080",
        faint: "#404040",
        subtle: "#202020",
        border: "#333333",
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
