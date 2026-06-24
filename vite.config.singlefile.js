import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build "tout-en-un" : génère un index.html unique avec JS + CSS intégrés,
// ouvrable d'un simple double-clic, sans serveur ni installation.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-singlefile',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
