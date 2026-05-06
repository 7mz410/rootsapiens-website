import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/rootsapiens-website/', // Set this to the repository name if deploying to username.github.io/repo/
})
