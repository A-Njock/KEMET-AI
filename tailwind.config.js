/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      display: ['DM Sans', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        black: "#0A0A0A",
        gold: "#D4A017",
        'gold-light': '#F4D03F',
        'gold-dark': '#B8860B',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
}

