const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,t ittsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#160C28",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
