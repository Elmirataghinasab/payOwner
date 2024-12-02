import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/crypto': {
            target: 'https://pro-api.coinmarketcap.com',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/crypto/, '')
        }
    }
}
})

