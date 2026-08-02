import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Saat menjalankan `npm run dev`, panggilan /api diteruskan ke
      // `wrangler pages dev` (jalankan `npm run pages:dev` di terminal
      // terpisah, port 8788) supaya Function + D1 lokal bisa dicoba
      // bersamaan dengan hot-reload Vite.
      '/api': {
        target: 'http://127.0.0.1:8788',
        changeOrigin: true,
      },
    },
  },
});
