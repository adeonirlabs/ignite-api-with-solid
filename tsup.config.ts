import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: true,
  clean: true,
  outDir: 'dist',
  outExtension: () => ({
    js: '.js',
  }),
})
