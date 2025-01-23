import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // Gebruik c8 voor code coverage
      reporter: ['text', 'json', 'html'], // Gebruik de gewenste report types
      all: true, // Zorg ervoor dat alle bestanden worden opgenomen in de coverage
    },
  },
})
