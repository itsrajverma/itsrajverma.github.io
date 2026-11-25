import { defineConfig } from 'vite'
// Relative base: the build works from any folder or sub-path.
export default defineConfig({ base: './', build: { chunkSizeWarningLimit: 1000 } })
