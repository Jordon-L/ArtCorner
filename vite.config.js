// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        create: resolve(root, 'create-account.html'),
        login: resolve(root, 'login.html'),
        gallery: resolve(root, 'gallery.html'),
      }
    } 
  }
})