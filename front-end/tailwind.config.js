/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3754DB",
        accenct_dark: "#16171D",
        accenct_wine: "#FCCD65",
        error: "#16171D",
        warning: "#FEC901",
        info: "#FEC901",
        success: "#00C271"
      },
    },
  },
  plugins: [],
}