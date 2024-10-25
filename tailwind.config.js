/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grad-b-1': '#224570',
        'grad-b-2': '#4e81c3',
      },
    },
  },
  plugins: [],
}

