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
        'bubble-up-10': 'bubble-up-20 15s linear infinite',
        'bubble-up-20': 'bubble-up-20 20s linear infinite',
        'bubble-up-30': 'bubble-up-30 30s linear infinite',
        'bubble-up-40': 'bubble-up-40 40s linear infinite',
        'bubble-up-50': 'bubble-up-50 50s linear infinite',
        'meteor-10': 'meteor-10 15s linear infinite',
        'meteor-20': 'meteor-20 20s linear infinite',
        'meteor-30': 'meteor-30 30s linear infinite',
        'meteor-40': 'meteor-40 40s linear infinite',
        'meteor-50': 'meteor-50 50s linear infinite',
        'meteor-60': 'meteor-60 60s linear infinite',
        'zoom-out': 'zoom-out 0.7s ease-in-out',
        enlight: 'enlight 2.5s linear',
      },
      keyframes: {
        'bubble-up-10': {
          '100%': { transform: 'translateY(-10vh) scale(2)', opacity: 0.5 },
          '0%': { transform: 'translateY(100vh) scale(2)', opacity: 1 },
        },
        'bubble-up-20': {
          '100%': { transform: 'translateY(-10vh) scale(1.5)', opacity: 0.5 },
          '0%': { transform: 'translateY(100vh) scale(1.5)', opacity: 1 },
        },
        'bubble-up-30': {
          '100%': { transform: 'translateY(-10vh)', opacity: 0.5 },
          '0%': { transform: 'translateY(100vh)', opacity: 1 },
        },
        'bubble-up-40': {
          '100%': { transform: 'translateY(-10vh) scale(0.8)', opacity: 0.5 },
          '0%': { transform: 'translateY(100vh) scale(0.8)', opacity: 1 },
        },
        'bubble-up-50': {
          '100%': { transform: 'translateY(-10vh) scale(0.2)', opacity: 0.5 },
          '0%': { transform: 'translateY(100vh) scale(0.2)', opacity: 1 },
        },
        'meteor-10': {
          '0%': {
            transform: 'translateY(-10vh) translateX(20vw) scale(2)',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-80vw) scale(2)',
          },
        },
        'meteor-20': {
          '0%': {
            transform: 'translateY(-10vh) translateX(20vw) scale(1.5)',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-80vw) scale(1.5)',
          },
        },
        'meteor-30': {
          '0%': {
            transform: 'translateY(-10vh) translateX(20vw)',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-80vw)',
          },
        },
        'meteor-40': {
          '0%': {
            transform: 'translateY(-10vh) translateX(20vw) scale(.8)',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-80vw) scale(.8)',
          },
        },
        'meteor-50': {
          '0%': {
            transform: 'translateY(-10vh) translateX(20vw) scale(.5)',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-80vw) scale(.5)',
          },
        },
        'meteor-60': {
          '0%': {
            transform: 'translateY(-10vh) translateX(20vw) scale(.2)',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-80vw) scale(.2)',
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
