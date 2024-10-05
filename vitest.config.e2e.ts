/// <reference types="vitest" />

import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    env: {
      BASE_URL: process.env.BASE_URL,
    },
    include: ['src/**/*.e2e-spec.ts'],
    environmentMatchGlobs: [['src/features/*/controllers/**', 'prisma']],
  },
  resolve: {
    alias: {
      '~': new URL('src', import.meta.url).pathname,
    },
  },
})
