import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: true,
  clean: true,
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  treeshake: true,
  outExtension: () => ({
    js: '.js',
  }),
  esbuildOptions(options) {
    options.alias = {
      '~': './src',
    }
  },
})
