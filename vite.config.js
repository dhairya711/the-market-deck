import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api/et-markets': {
        target: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
      '/api/et-stocks': {
        target: 'https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
      '/api/et-tech': {
        target: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
      '/api/yahoo': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo/, ''),
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
    },
  },
})
