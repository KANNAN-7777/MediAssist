/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#087F91',
        'primary-light': '#19B7C8',
        navy: '#082B3A',
      },

      gridTemplateColumns: {
        auto: 'repeat(auto-fill,minmax(200px,1fr))',
      },
    },
  },

  plugins: [],
}