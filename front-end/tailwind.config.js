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
        error: "#FB151A",
        warning: "#EBA300",
        info: "#6684FF",
        success: "#00C271"
      },
    },
  },
  plugins: [],
}