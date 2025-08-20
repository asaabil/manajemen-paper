    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import jsconfigPaths from 'vite-jsconfig-paths' // <-- 1. Impor "kacamata"

    // https://vitejs.dev/config/
    export default defineConfig({
      // 2. Pasang "kacamata" di sini
      plugins: [react(), jsconfigPaths()], 
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
          }
        }
      }
    })
    