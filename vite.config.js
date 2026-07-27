import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://blogcraft-backend-2uy4.onrender.com', // Updated Backend URL
        changeOrigin: true, // Origin header change karo
        secure: false, // HTTPS ke liye false, agar SSL issue aaye toh
      },
    },
  },
});
