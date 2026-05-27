// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://learnhns.com',
  integrations: [
    sitemap({
      // Default priorities + change frequencies for the static page set.
      // Per-page overrides could be added later via the `serialize` hook.
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Exclude agent-oriented utility endpoints from the human sitemap.
      filter: (page) => !/\/(skill\.md|llms\.txt)$/.test(page),
    }),
  ],
});
