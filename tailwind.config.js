/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'system-ui', 'sans-serif'],
      heading: ['Outfit', 'system-ui', 'sans-serif'],
      display: ['Outfit', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        black: "#0A0A0A",
        'rich-black': "#050508",
        gold: "#D4A017",
        'gold-light': '#F4D03F',
        'gold-dark': '#B8860B',
        'gold-glow': 'rgba(212, 160, 23, 0.15)',
        'ivory': '#FAFAF5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, #D4A017 0%, #F4D03F 50%, #D4A017 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.6)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'premium-hover': '0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 160, 23, 0.1)',
        'gold-glow': '0 0 30px rgba(212, 160, 23, 0.4)',
      },
    }
  },
  plugins: [],
}
