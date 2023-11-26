/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3754DB',
        accent_dark: '#16171D',
        accent_wine: '#FCCD65',
        error: '#FB151A',
        warning: '#EBA300',
        info: '#6684FF',
        success: '#00C271',
        gray: '#62667E'
      },
      screens: {
        'mobile': '480px',
        // => @media (min-width: 480px) { ... }

        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px'
        // => @media (min-width: 1280px) { ... }
      },
      fontFamily: {
        'gelion': 'Gelion'
      }
    }
  },
  plugins: []
}