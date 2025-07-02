import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server proxy
  server: {
    proxy: {
      // String '/api' akan diganti dengan target di bawah
      '/api': {
        target: 'http://localhost:5000', // Alamat server backend kita
        changeOrigin: true,
      }
    }
  }
})
