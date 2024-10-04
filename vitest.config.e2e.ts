/// <reference types="vitest" />
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.e2e-spec.ts'],
    environmentMatchGlobs: [['src/features/*/controllers', 'prisma']],
  },
  resolve: {
    alias: {
      '~': new URL('src', import.meta.url).pathname,
    },
  },
})
