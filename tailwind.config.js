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
        ivory: '#F8F7F4',
        'ivory-dark': '#EDEAE3',
        navy: '#0C1B4A',
        'navy-light': '#1A3D8F',
        royal: '#2451B7',
        'royal-light': '#3B6DD4',
        'royal-pale': '#EEF2FF',
        'royal-glow': 'rgba(36, 81, 183, 0.12)',
        slate: '#4A5578',
        border: '#DDE2EE',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'blue-shimmer': 'linear-gradient(90deg, #2451B7 0%, #3B6DD4 50%, #2451B7 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0C1B4A 0%, #1A3D8F 50%, #2451B7 100%)',
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
        'pulse-royal': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(36, 81, 183, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(36, 81, 183, 0.4)' },
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
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-royal': 'pulse-royal 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(12, 27, 74, 0.06), 0 8px 24px rgba(12, 27, 74, 0.06)',
        'card-hover': '0 4px 6px rgba(12, 27, 74, 0.06), 0 20px 40px rgba(12, 27, 74, 0.12)',
        'royal-glow': '0 0 30px rgba(36, 81, 183, 0.25)',
        'btn': '0 2px 8px rgba(36, 81, 183, 0.3)',
        'btn-hover': '0 4px 16px rgba(36, 81, 183, 0.4)',
      },
    }
  },
  plugins: [],
}
