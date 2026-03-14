import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  deps: {
    neverBundle: ['node-fetch', 'debug', 'vue'],
  },
})
