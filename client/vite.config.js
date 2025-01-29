import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@styles': path.resolve(__dirname, 'src', 'assets', 'styles'),
      '@icons': path.resolve(__dirname, 'src', 'assets', 'icons', 'icons.jsx'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@navbtns': path.resolve(__dirname, 'src', 'components', 'navbar-items', 'NavbarBtns.jsx'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
  plugins: [react()],
})
