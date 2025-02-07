import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        'src',
        'generated-client',
        '.svelte-kit',
        'node_modules'
      ]
    }
  }
});