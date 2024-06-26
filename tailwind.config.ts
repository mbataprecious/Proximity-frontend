import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#096DD9",
        secondary: "#F7931E",
      },
      boxShadow: {
        "custom-purple": "0 8px 16px #7B68EE66",
      },
    },
  },
  plugins: [],
};
export default config;
