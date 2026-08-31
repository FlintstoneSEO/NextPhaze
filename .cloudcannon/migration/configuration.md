# CloudCannon configuration

## Completed

- Downloaded and consulted the official CloudCannon configuration and initial-site-settings JSON schemas locally. The schema files are ignored by Git.
- Generated the baseline with `@cloudcannon/cli`, then replaced the generic root-page collection with the audited collection model.
- Configured static image uploads under `public/uploads`, static-site paths, and the site's `America/New_York` timezone.
- Added collection configuration for `pages`, `services`, `focus_areas`, and `legal`, including their target public URLs and editor modes.
- Added a data collection boundary for shared editable configuration under `src/data`.
- Defined reusable structures for navigation links, service topic items, and the initial CTA page-builder block.

## Validation

`npx @cloudcannon/cli validate` passed for `cloudcannon.config.yml`.

## Deferred to the content and visual-editing phases

- Create content collection files, schemas, and Astro collection definitions.
- Expand page-builder structures to cover the audited page sections.
- Replace hardcoded routes with collection-backed routes and update the sitemap.
- Add the editable-regions integration, registered block components, and inline editing attributes.

## User review

CloudCannon-hosted preview and save-to-Git verification must wait until the collection content and editable regions are implemented.
