/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#8B9A6E',
          50: '#F5F7F1',
          100: '#E9EFE0',
          200: '#D5E1C3',
          300: '#BFD1A4',
          400: '#A5BD84',
          500: '#8B9A6E',
          600: '#717F55',
          700: '#566141',
          800: '#3D452E',
          900: '#262B1D',
          glow: 'rgba(139, 154, 110, 0.45)',
        },
        canvas: {
          light: '#F7F2EB', // cream_canvas
          dark: '#0E0F0D',  // deep obsidian canvas
        },
        surface: {
          light: '#EAE2D6', // warm_sand
          dark: '#181A15',  // obsidian card container
          cardLight: '#F0E9DD',
          cardDark: '#20231D',
        },
        divider: {
          light: '#EEEEEE', // soft_gray
          dark: '#2A2D26',  // subtle obsidian divider
        },
        cream: '#F7F2EB',
        sand: '#EAE2D6',
        softgray: '#EEEEEE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sage': '0 0 25px rgba(139, 154, 110, 0.35)',
        'glow-sage-lg': '0 0 45px rgba(139, 154, 110, 0.55)',
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 6px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 12px 32px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'breathe-circle': 'breathe 16s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.4)' },
          '50%': { transform: 'scale(1.4)' },
          '75%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
