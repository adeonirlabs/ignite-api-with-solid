/// <reference types="vitest" />
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '~': new URL('src', import.meta.url).pathname,
    },
  },
})
