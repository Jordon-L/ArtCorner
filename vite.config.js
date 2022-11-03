// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  publicDir: 'public',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        create: resolve(root, 'create-account.html'),
        login: resolve(root, 'login.html'),
        gallery: resolve(root, 'gallery.html'),
        upload: resolve(root, 'upload.html'),
        post: resolve(root, 'post.html'),
      }
    } 
  },
})