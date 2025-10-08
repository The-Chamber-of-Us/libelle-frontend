// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ✅ Pega aquí el path EXACTO de tu deployment de GAS (lo que va entre /macros y /exec)
const GAS_EXEC_PATH =
  '/macros/s/AKfycbzFCskYeqfgB12j62DOAX3E6ppIJKCwyzvsifAkgbEm9Kei__n8djxspvoNvNrRu0cSuw/exec'

// Si prefieres, puedes tomarlo de una env: const GAS_EXEC_PATH = process.env.VITE_GAS_EXEC_PATH!

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // cualquier request a /gas en dev se reenviará a script.google.com + GAS_EXEC_PATH
      '/gas': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: true,
        // /gas -> /macros/s/<ID>/exec
        rewrite: (path) => path.replace(/^\/gas/, GAS_EXEC_PATH),
      },
    },
  },
})
