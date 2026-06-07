import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Targeting iOS 14+ prevents LightningCSS minifier from converting
    // @media (max-width: N) to range syntax (width <= N), which older
    // iOS Safari versions don't support.
    cssTarget: ['safari14', 'ios14'],
  },
})
