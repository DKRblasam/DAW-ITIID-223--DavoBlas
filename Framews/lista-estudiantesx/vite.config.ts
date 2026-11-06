import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Los alias (@/*) se declaran una sola vez, en tsconfig.app.json
    tsconfigPaths: true,
  },
})
