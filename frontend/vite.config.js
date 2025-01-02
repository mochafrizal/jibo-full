import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Tambahkan ini
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})