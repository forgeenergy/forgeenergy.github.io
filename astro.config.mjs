import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://forgeenergy.github.io',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'pt', 'ja'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
