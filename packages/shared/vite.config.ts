import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'shared',
      fileName: 'shared',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          shared: 'shared'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})