import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/github-contributions': {
        target: 'https://github-contributions.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github-contributions/, ''),
      },
    },
  },
})
