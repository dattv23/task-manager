/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3754DB',
        secondary: '#FCCD65',
        error: '#FB151A',
        warning: '#EBA300',
        info: '#6684FF',
        success: '#00C271',
        dark: '#16171D',
        white: '#ffff',
        wine: '#B80020'
      },
      fontFamily: {
        popins: ['Poppins', 'sans-serif'],
        smooch: ['Smooch Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
