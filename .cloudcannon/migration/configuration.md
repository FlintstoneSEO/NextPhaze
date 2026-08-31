# CloudCannon configuration

Date: 2026-08-30

## Decisions

- Use one `pages` collection with `page_builder` and `legal` schemas. This consolidates the single Privacy entry without changing its Markdown writing workflow.
- Keep `services` and `focus_areas` as separate fixed-schema collections because their editorial meaning differs, while a shared Astro route will render both.
- Use a single JSON-backed `data` collection for shared navigation, footer, option, and focus content.
- Use split co-located structure values for page blocks because the site has more than five block types.
- Preserve static images in `public/`; new uploads go to `public/uploads`.
- Preserve `SITE_URL` and `PUBLIC_SQUARE_BOOKING_URL` as deployment settings rather than editor content.

## Files

- `cloudcannon.config.yml` defines collection groups, schemas, explicit inputs, shared structures, and data-file editing.
- `.cloudcannon/initial-site-settings.json` selects Astro and the repository's full npm build pipeline.
- `.cloudcannon/README.md` provides editor-facing guidance.
- `.cloudcannon/schemas/` contains creation templates for page-builder, policy, training-format, and training-focus entries.
- Page-block structure values live beside their components under `src/components/blocks/`.

## Deferred to later phases

- Create actual `pages` entries and shared JSON data.
- Consolidate Privacy into `pages/privacy.md` and remove the `legal` collection.
- Replace fixed training route files with one collection-backed dynamic route.
- Register every block and add its editable regions.
- Validate all configured URLs against built `dist/` output.
