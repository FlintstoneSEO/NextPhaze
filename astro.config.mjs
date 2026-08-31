import { defineConfig } from 'astro/config';
import editableRegions from '@cloudcannon/editable-regions/astro-integration';

const configuredSite = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: configuredSite,
  output: 'static',
  integrations: [editableRegions()],
  build: {
    format: 'directory'
  }
});
