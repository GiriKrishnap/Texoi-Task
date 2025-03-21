import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "./",  // 👈 Ensures assets load correctly on Netlify
  plugins: [
    react(),
    tailwindcss(),
  ],
})
