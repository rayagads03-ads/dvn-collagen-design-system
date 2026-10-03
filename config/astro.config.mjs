import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wellnesbeauty.com',
  output: 'static',
  // Old Google Ads Final URL moved to /dvn/collagen/dvncollagen/.
  // Redirect lives in public/_redirects (both trailing-slash forms) instead
  // of this `redirects` option, because passing both forms here collides
  // ("route defined twice") in Astro's static route generator.
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    sitemap({
      // Only self-canonical URLs belong in the sitemap. The Google Ads Final
      // URL canonicalises to the root, so listing it sent Google a
      // contradictory signal. No lastmod/changefreq/priority: Google ignores
      // changefreq/priority, and a build-time lastmod on every URL is not a
      // real content-change date.
      filter: (page) => !page.startsWith('https://wellnesbeauty.com/dvn/collagen/dvncollagen/'),
    }),
  ],
  build: {
    // Keep the single page stylesheet inline. A controlled mobile Lighthouse
    // comparison measured this faster than adding a render-blocking CSS round
    // trip, despite the larger HTML document.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  vite: {
    build: {
      minify: 'terser',
    },
  },
});
