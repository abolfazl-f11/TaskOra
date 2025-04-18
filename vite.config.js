import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // این خط باعث می‌شود که سرور به تمام IP‌های محلی گوش دهد
    port: 5173, // پورت پیش‌فرض Vite
  },
})
