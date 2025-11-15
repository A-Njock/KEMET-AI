/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        black: "#1A1A1A",
        gold: "#D4A017"
      }
    }
  },
  plugins: [],
}

