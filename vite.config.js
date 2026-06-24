import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relatif pour pouvoir héberger sur GitHub Pages ou ouvrir le build localement
export default defineConfig({
  plugins: [react()],
  base: './',
})
