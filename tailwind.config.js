/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

