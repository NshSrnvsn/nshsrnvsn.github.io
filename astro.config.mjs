// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://nshsrnvsn.github.io',
  base: process.env.NODE_ENV === 'production' ? '/the-a-word' : '/',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});