/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite/plugin");
module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      brand: "#fffc00",
      dark: "#111618",
      midnight: "#1b263b",
      moonlight: "#1F2937",
      midnightDark: "#131B2B",
      grey: "#415a77",
      lightGrey: "#778da9",
      light: "#e0e1dd",
      orangey: "#E2703A",
    },
    extend: {},
  },
  plugins: [flowbite],
};
