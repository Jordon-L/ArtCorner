// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        create: resolve(__dirname, 'create-account.html'),
        login: resolve(__dirname, 'login.html'),
        gallery: resolve(__dirname, 'gallery.html'),
      }
    }
  }
})