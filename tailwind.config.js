/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      spacing: {
        // Common component spacing
        'section': '2rem',      // 32px - for section spacing (mb-8 equivalent)
        'card': '2rem',          // 32px - for card padding (p-8 equivalent)
        'form': '1rem',          // 16px - for form spacing (space-y-4 equivalent)
        'button': '0.75rem',     // 12px - for button padding (px-6 py-2 equivalent)
        'input': '1rem',         // 16px - for input padding (px-4 py-3 equivalent)
        'icon': '0.5rem',        // 8px - for icon button padding (p-2 equivalent)
        'label': '0.5rem',       // 8px - for label margin (mb-2 equivalent)
        'text': '0.5rem',        // 8px - for text spacing (mt-1, mb-2 equivalent)
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flip-x': 'flipX 0.3s ease-in-out',
        'rotate-180': 'rotate180 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flipX: {
          '0%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(-1)' },
          '100%': { transform: 'scaleX(1)' },
        },
        rotate180: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        // Common padding combinations
        '.p-card': {
          padding: '2rem', // p-8
        },
        '.px-input': {
          paddingLeft: '1rem', // px-4
          paddingRight: '1rem',
        },
        '.py-input': {
          paddingTop: '0.75rem', // py-3
          paddingBottom: '0.75rem',
        },
        '.p-input': {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
        },
        '.p-button': {
          paddingLeft: '1.5rem', // px-6
          paddingRight: '1.5rem',
          paddingTop: '0.5rem', // py-2
          paddingBottom: '0.5rem',
        },
        '.p-icon': {
          padding: '0.5rem', // p-2
        },
        // Common margin combinations
        '.mb-section': {
          marginBottom: '2rem', // mb-8
        },
        '.mb-label': {
          marginBottom: '0.5rem', // mb-2
        },
        '.mb-text': {
          marginBottom: '0.5rem', // mb-2
        },
        '.mt-section': {
          marginTop: '2rem', // mt-8
        },
        '.mt-text': {
          marginTop: '0.25rem', // mt-1
        },
        // Common gap combinations
        '.gap-form': {
          gap: '1rem', // gap-4
        },
        '.gap-button': {
          gap: '0.5rem', // gap-2
        },
        // Common spacing for forms
        '.space-form': {
          '& > * + *': {
            marginTop: '1rem', // space-y-4
          },
        },
      });
    }),
  ],
}

