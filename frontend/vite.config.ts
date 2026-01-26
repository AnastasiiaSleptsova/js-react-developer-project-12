import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 5002,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'http://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
        changeOrigin: true,
      },
    },
  },
})
