// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { rehypeDeadLinks } from './src/lib/rehype-dead-links.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://learnhns.com',
  compressHTML: true,
  markdown: {
    processor: unified({ rehypePlugins: [rehypeDeadLinks] }),
  },
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
