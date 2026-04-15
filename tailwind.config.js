/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Figtree', 'system-ui', 'sans-serif'],
      heading: ['Figtree', 'system-ui', 'sans-serif'],
      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
    },
    extend: {
      colors: {
        ivory: '#F9F7F3',
        'ivory-dark': '#EDE8DF',
        navy: '#0C1B4A',
        'navy-light': '#1A2F6A',
        royal: '#B8892A',          // antique gold — the main accent
        'royal-light': '#C9A040',  // lighter gold for hover
        'royal-pale': '#FAF4E6',   // pale warm cream for backgrounds
        'royal-glow': 'rgba(184, 137, 42, 0.12)',
        slate: '#4A5578',
        border: '#E2D9C8',         // warm beige border
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, #B8892A 0%, #C9A040 50%, #B8892A 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0C1B4A 0%, #1A2F6A 50%, #B8892A 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184, 137, 42, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(184, 137, 42, 0.3)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
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
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(12, 27, 74, 0.05), 0 8px 24px rgba(12, 27, 74, 0.05)',
        'card-hover': '0 4px 6px rgba(12, 27, 74, 0.05), 0 20px 40px rgba(12, 27, 74, 0.10)',
        'gold-glow': '0 0 30px rgba(184, 137, 42, 0.2)',
        'btn': '0 2px 8px rgba(12, 27, 74, 0.25)',
        'btn-hover': '0 6px 20px rgba(12, 27, 74, 0.35)',
      },
    }
  },
  plugins: [],
}
