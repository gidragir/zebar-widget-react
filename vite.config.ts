import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
// import path from "path"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  build: {
    outDir: 'C:/Users/ilyab/.glzr/zebar/starter',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index-main.js',  // Главный JS файл
        chunkFileNames: 'assets/[name]-[hash].js', // Чанки JS файлов
        assetFileNames: (assetInfo) => {
          const extname = assetInfo.names[0].split('.').pop();
          if (extname === 'css') {
            return 'assets/index-main.css';  // CSS файл будет называться index-main.css
          }

          return 'assets/[fileName]-[hash][extname]';
        }
      }
    }
  }
})
