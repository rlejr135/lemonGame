import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/lemonGame/',   // ★ 리포지토리 이름
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
