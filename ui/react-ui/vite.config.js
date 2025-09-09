import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/odata/v4': {
        target: 'http://localhost:4004',
        changeOrigin: true
      }
    }
  }
})
