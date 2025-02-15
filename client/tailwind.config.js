/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prim-black': '#111',
        'grad-l': '#2E3038',
        'grad-r': '#454955',
        'prim-yellow-50': '#FCCF5F',
        'prim-yellow-100': '#FBBD23',
        'prim-yellow-200': '#F0AD05',
        'prim-yellow-300': '#C89004',
      },
    },
  },
  plugins: [],
}