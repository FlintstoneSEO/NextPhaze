import { defineConfig } from 'astro/config';

const configuredSite = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: configuredSite,
  output: 'static',
  build: {
    format: 'directory'
  }
});
