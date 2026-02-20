import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://vazquezilusionista.com.ar',
  adapter: vercel(),
  integrations: [
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});