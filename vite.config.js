import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api/mc-markets': {
        target: 'https://www.moneycontrol.com/rss/marketreports.xml',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/mc-top': {
        target: 'https://www.moneycontrol.com/rss/MCtopnews.xml',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/mc-business': {
        target: 'https://www.moneycontrol.com/rss/business.xml',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/mint-markets': {
        target: 'https://www.livemint.com/rss/markets',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/mint-companies': {
        target: 'https://www.livemint.com/rss/companies',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/bs-markets': {
        target: 'https://www.business-standard.com/rss/markets-106.rss',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/gnews-india': {
        target: 'https://news.google.com/rss/search?q=NSE+BSE+Indian+Stock+Market+good+news&hl=en-IN&gl=IN&ceid=IN:en',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/gnews-search': {
        target: 'https://news.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gnews-search/, '/rss/search'),
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/et-markets': {
        target: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/et-stocks': {
        target: 'https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/et-tech': {
        target: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/et-politics': {
        target: 'https://economictimes.indiatimes.com/news/politics-and-nation/rssfeeds/1052732854.cms',
        changeOrigin: true,
        rewrite: () => '',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/yahoo': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo/, ''),
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
      '/api/mfapi': {
        target: 'https://api.mfapi.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mfapi/, ''),
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      },
    },
  },
})
