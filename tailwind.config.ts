import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    strokeWidth: {
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
    },
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
        "light-shade": "0 6px 12px 0 rgba(27, 105, 253, 0.27)",
      },
    },
  },
  plugins: [],
};
export default config;
