# CloudCannon migration build verification

Date: 2026-08-31

## Automated verification

- Official CloudCannon CLI validation passed for `cloudcannon.config.yml`, all 19 co-located component structure files, and `.cloudcannon/initial-site-settings.json`.
- `node scripts/check-cloudcannon-content.mjs` passed, confirming every page-builder block matches its registered structure fields.
- A clean `npm run build` completed with 51 files, 10 generated routes, and zero errors, warnings, or hints.
- Generated HTML contains editable arrays, array items, registered component attributes, shared `@data[site]` bindings, and the privacy-page `@content` binding.
- The production output contains the CloudCannon component-registration bundle and no conflicting `prose` class.
- The required visible `Design by Flintstone SEO` attribution appears on all 10 generated HTML pages.
- Playwright passed all 20 checks across the nine public routes, including one-H1 validation, horizontal-overflow checks, serious/critical accessibility scanning, mobile navigation, the booking journey, dark mode, and screenshots at 320, 375, 390, 768, 1024, and 1440 pixels.

## CloudCannon-side acceptance checklist

These checks require the connected CloudCannon project and cannot be completed from the local repository:

1. Open the homepage, training overview, one training-detail page, coach page, booking page, and privacy page in the Visual Editor.
2. Edit representative inline text and an image, then confirm the preview updates without a full reload.
3. Add, remove, and reorder both a page block and a nested array item.
4. Edit navigation, footer content, a training option, and a focus area; confirm the shared change appears everywhere expected.
5. Save each representative edit and confirm CloudCannon commits it to the intended Markdown or `src/data/site.json` file.
6. Confirm production environment values for `SITE_URL` and `PUBLIC_SQUARE_BOOKING_URL` are configured in CloudCannon.
