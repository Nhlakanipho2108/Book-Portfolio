import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: page('./index.html'),
        projects: page('./projects.html'),
        skills: page('./skills.html'),
        about: page('./about.html'),
        certificates: page('./certificates.html'),
        contact: page('./contact.html')
      }
    }
  }
});
