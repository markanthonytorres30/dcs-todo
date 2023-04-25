import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true
  },
  build: {
    rollupOptions: {
      external: ['Vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
      input: './index.html'
    }
  }
})
