import path from 'path'
import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'player',
      fileName: (format) => `player.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          preact: 'preact'
        }
      },
      external: ['preact']
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})