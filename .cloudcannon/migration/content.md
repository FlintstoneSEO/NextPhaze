# CloudCannon content migration

Date: 2026-08-31

## Completed changes

- Extracted the homepage, Training overview, Coach Carrington, and Book Training pages into complete `src/content/pages/*.md` page-builder entries.
- Consolidated Privacy into the same `pages` collection using the `legal` schema while preserving its Markdown body.
- Extracted navigation, footer copy and links, training options, and focus-area summaries from TypeScript into `src/data/site.json`.
- Retained the deployment-controlled Square URL in `src/data/site.ts` and combined it with editor-owned site data at runtime.
- Added complete CTA objects to all service and focus-area entries.
- Replaced four fixed training detail routes with a single collection-backed `src/pages/training/[slug].astro` route.
- Added a catch-all route for future page-builder and policy entries created in CloudCannon.
- Replaced hardcoded marketing markup with 19 reusable Astro block components while preserving existing classes and composition.

## Consistency checks

- `scripts/check-cloudcannon-content.mjs` compares every page-builder block against its co-located structure value and reports missing, extra, or unknown fields.
- All 19 structures match every migrated block instance.
- No Astro JSX artifacts or block-level HTML were introduced into frontmatter.
- Shared JSON arrays are consistently shaped and every item has an explicit `slug` where it represents linked content.
- Public image paths remain rooted at `/images/`; no assets were moved.

## Build result

`npm run build` succeeds and emits the 10 expected HTML routes plus the sitemap. Astro 7 reports TypeScript deprecation hints for the compatibility `z` export from `astro:content`; these are non-blocking and can be removed by moving the import to Astro's current Zod entrypoint during final cleanup.

