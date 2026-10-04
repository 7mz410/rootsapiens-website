import { defineConfig } from 'vite';

// Multi-file build for the website: images, fonts and JS ship as hashed files under assets/
// so the browser downloads them in parallel and caches them forever. base './' lets the game
// live in any sub-folder (rootsapiens.com/game/).
export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2_000,
    outDir: 'dist',
  },
});
