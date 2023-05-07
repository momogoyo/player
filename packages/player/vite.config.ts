import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'player',
      fileName: 'player',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          preact: 'preact'
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})