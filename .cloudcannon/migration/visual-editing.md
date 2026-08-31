# CloudCannon visual-editing census

Date: 2026-08-31

## Infrastructure

- Astro 7 and `@cloudcannon/editable-regions` are installed.
- The Astro integration is active and the base layout conditionally imports component registration only in editor mode.
- The site uses Astro components only; no unsupported framework islands or `astro-icon` setup applies.

## Section census

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
|---|---|---|---|---|---|
| All pages | Header navigation | data-file + array | `@data[site].navigation`; relative `label` and `href` inside items | All visible labels and targets are in `site.json`; logo remains a fixed brand asset | — |
| All pages | Footer identity and links | data-file + array | `@data[site].footer_copy` and `@data[site].footer_navigation` | Copy, link labels, and targets are in `site.json`; copyright year and required attribution remain computed/locked legal UI | — |
| Homepage | Home hero | component + text + image | `content_blocks` item component `home_hero`; relative fields | Complete | — |
| Homepage | Pricing rail | component + text + data-file array | component `pricing_rail`; `@data[site].training_options` for options | Complete | — |
| Homepage | Training focus | component + text + image + data-file array | component `training_focus`; `@data[site].focus_areas` for shared items | Complete | — |
| Homepage | Process | component + array | component `process`; relative `items` and item fields | Complete, including icon enum | — |
| Homepage | Coach proof | component + array | component `coach_proof`; relative `credentials` and fields | Complete | — |
| Homepage | Service area | component + text | component `service_area`; relative fields | Complete | — |
| Homepage | FAQ | component + array | component `faq`; relative `items`, `question`, `answer` | Complete | — |
| Homepage | Final CTA | component + text | component `booking_cta`; relative fields | Complete | — |
| Training overview | Hero and route steps | component + array | component `training_hero`; relative `route_steps` | Complete | — |
| Training overview | Format comparison | component + text + data-file array | component `format_section`; `@data[site].training_options` | Complete | — |
| Training overview | Focus list | component + image + data-file array | component `focus_index`; `@data[site].focus_areas` | Complete | — |
| Training overview | Final CTA | component + text | component `booking_cta` | Complete | — |
| Coach | Hero | component + text | component `coach_hero`; relative fields | Complete | — |
| Coach | Career statistics | component + array | component `career_stats`; relative `stats` | Complete | — |
| Coach | Career story | component + array | component `career_story`; relative `items` | Complete | — |
| Coach | Performance callout | component + text | component `performance_callout`; relative fields | Complete | — |
| Coach | Verified sources | component + array | component `source_section`; relative `links` | Complete | — |
| Coach | Final CTA | component + text | component `booking_cta` | Complete | — |
| Booking | Hero and Square state | component + text | component `booking_hero`; computed state re-renders inside registered component | Both ready and pending copy are stored; URL remains deployment-owned | — |
| Booking | Training options | component + data-file array | component `booking_options`; `@data[site].training_options` | Complete; Square URL remains deployment-owned | — |
| Booking | Expectations | component + array | component `booking_expectations`; relative `items` | Complete, including icon enum | — |
| Training detail | Service/focus body | standalone component + text + image + array | `<editable-component data-component="service_page" data-prop="service">`; nested `topics` | Fields will be co-located under `service` before wiring | — |
| Training detail | Final CTA | standalone component | `<editable-component data-component="service_booking_cta" data-prop="cta">` | Complete | — |
| Privacy and future policies | Heading, effective date, Markdown body | text + content | relative `title`, `effective_date`, and `@content` | Complete | — |
| 404 | System error message | developer-owned | No content binding | Intentionally fixed system-state copy; editors cannot create or route another 404 page | — |

## Shared-UI applicability

- Header/navigation: applies; stored in `site.json` and wired through `data_config.site`.
- Footer: applies; stored in `site.json`, with copyright year and mandatory Flintstone SEO attribution intentionally computed/locked.
- CTA banners: page-specific CTA copy lives in page blocks or each training entry's `cta` object.
- Share blocks, author cards, testimonials, and social-link groups: not present in this site.

## Implementation status

- Every page-builder page wraps `content_blocks` as a component-keyed editable array, and every block is an editable array item linked to its registered Astro component.
- All 19 block types are registered from the shared component map and expose nested text, image, and sub-array regions.
- Shared navigation, footer, training options, focus areas, and booking labels bind through `@data[site]` component regions.
- Training-detail content is co-located under `service` and `cta`, then rendered through standalone registered-component wrappers.
- Privacy and future policy pages expose their heading, effective-date fields, and Markdown body.
- Uniform arrays in new block/training templates receive a starter item so their inline controls have a renderable row; the heterogeneous page-builder array is handled by registered component types.
- Decorative icons, responsive layout classes, computed copyright year, deployment URLs, fixed brand assets, and the mandatory Flintstone SEO attribution remain developer-controlled presentation or deployment values.

## Verification

- Official CloudCannon CLI validation: passed for the main config, all 19 structure files, and initial site settings.
- Content/structure field completeness: passed with `scripts/check-cloudcannon-content.mjs`.
- Astro check and production build: passed with zero errors, warnings, or hints.
