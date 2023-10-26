import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@root": "/",
      "@types": "/types",
      "@classes": "/src/app-logic/classes",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@public": "/src/public",
    }
  }
})
