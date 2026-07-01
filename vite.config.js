import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // es2020 + safari14 eliminates legacy JS transforms (regenerator, etc.)
    // while keeping full iOS 14+ compatibility.
    target: ['es2020', 'safari14', 'ios14', 'chrome87', 'firefox78'],
    // Targeting iOS 14+ prevents LightningCSS minifier from converting
    // @media (max-width: N) to range syntax (width <= N), which older
    // iOS Safari versions don't support.
    cssTarget: ['safari14', 'ios14'],
  },
})
