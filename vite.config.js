import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from '@vuejs/vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ear-training-app/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
        output: {
            entryFileNames: `[name]-[hash].js`,
        },
    },
  },
})
