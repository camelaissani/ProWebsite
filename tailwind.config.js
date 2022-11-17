/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const accent = '#0a66c2';
const accentLight = '#0070df';

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent,
        'accent-light': accentLight,
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.3) 0px 4px 4px 0px',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 2px 12px var(--tw-shadow-color)',
      },
      animation: {
        'initial-star': 'initial-star 1s linear',
        star: 'star 1s linear infinite',
        'initial-meteor': 'initial-meteor 1s linear',
        meteor: 'meteor 1s linear infinite',
        enlight: 'enlight 2.5s linear',
      },
      keyframes: {
        'initial-star': {
          '0%': { visibility: 'hidden' },
          '0.1%': { visibility: 'visible' },
          '100%': { transform: 'translateY(-100vh)' },
        },
        star: {
          '100%': { transform: 'translateY(-200vh)' },
        },
        'initial-meteor': {
          '0%': { visibility: 'hidden' },
          '0.1%': { visibility: 'visible' },
          '100%': {
            transform: 'translateY(100vh) translateX(-100vw)',
          },
        },
        meteor: {
          '100%': {
            transform: 'translateY(200vh) translateX(-200vw)',
          },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        enlight: {
          '0%': { width: 0, 'border-right': '2px solid #ffcc00' },
          '200%': { width: '100%', 'border-right': 'none' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
