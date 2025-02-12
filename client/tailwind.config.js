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
      },
    },
  },
  plugins: [],
}