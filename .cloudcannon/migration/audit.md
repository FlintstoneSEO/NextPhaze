# CloudCannon migration audit

Date: 2026-08-30

## Platform and build

- SSG: Astro 7.2.9, static output, directory-format routes.
- Package manager: npm with `package-lock.json`.
- Build command: `npm run build` (`astro check && astro build`).
- Framework islands: none. Components are Astro only.
- CSS: project-owned global CSS; no Tailwind or prose plugin.
- Markdown: Astro content collections using the `glob()` loader; no MDX, remark, or rehype plugins.
- CloudCannon runtime: `@cloudcannon/editable-regions` 0.0.19 is installed and its Astro integration is enabled.
- Environment inputs: `SITE_URL` controls canonical/noindex behavior; `PUBLIC_SQUARE_BOOKING_URL` controls the external booking state.
- Images: plain `<img>` elements backed by `public/images`; uploads should remain under `public/uploads`.

## Content collections

| Collection | Loader and path | Shape | Consumption | Body rendered | Migration action |
|---|---|---|---|---|---|
| `pages` | `glob('**/*.md')`, `src/content/pages` | title, description, `content_blocks[]` | Not yet consumed; directory is missing | No | Create entries and page-builder route |
| `services` | `glob('**/*.md')`, `src/content/services` | fixed service schema | `getEntry()` in two fixed routes | No | Retain fixed schema and wire visual editing |
| `focus_areas` | `glob('**/*.md')`, `src/content/focus_areas` | fixed service schema | `getEntry()` in two fixed routes | No | Retain fixed schema and wire visual editing |
| `legal` | `glob('**/*.md')`, `src/content/legal` | title, description, effective date | `getEntry()` and `render()` | Yes | Retain content + data editors |

`src/data/site.ts` contains navigation, booking configuration, training options, and focus-area summaries. It is TypeScript rather than a CloudCannon-editable data file. The editable values will move to a structured YAML file; the environment-provided Square URL remains runtime configuration and will not be exposed as invented content.

## Pages and routing

| Route | Source | Data source | CloudCannon treatment |
|---|---|---|---|
| `/` | `src/pages/index.astro` | hardcoded + `src/data/site.ts` | page-builder entry `pages/index.md` |
| `/training/` | `src/pages/training/index.astro` | hardcoded + shared data | page-builder entry `pages/training.md` with explicit permalink |
| `/training/one-on-one/` | fixed Astro route | `services/one-on-one.md` | fixed-schema collection |
| `/training/group/` | fixed Astro route | `services/group.md` | fixed-schema collection |
| `/training/speed-agility/` | fixed Astro route | `focus_areas/speed-agility.md` | fixed-schema collection |
| `/training/wide-receiver/` | fixed Astro route | `focus_areas/wide-receiver.md` | fixed-schema collection |
| `/coach-carrington/` | `src/pages/coach-carrington.astro` | hardcoded | page-builder entry |
| `/book-training/` | `src/pages/book-training.astro` | hardcoded + shared data + environment | page-builder entry; runtime booking state stays computed |
| `/privacy/` | `src/pages/privacy.astro` | `legal/privacy.md` | fixed-schema legal collection |
| `/404.html` | `src/pages/404.astro` | hardcoded | keep developer-owned system page |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | generated | keep developer-owned generated route |

There are no API, pagination, taxonomy, server-rendered, or redirect routes.

## Static-page census

| Page file | Distinct content sections | Layout repeated? | Editor may add similar pages? | Recommended pattern |
|---|---|---|---|---|
| `src/pages/index.astro` | hero, pricing, focus, process, coach proof, service area, FAQ, CTA | No | Yes | Page builder |
| `src/pages/training/index.astro` | hero, formats, focus areas, CTA | No | Yes | Page builder |
| `src/pages/coach-carrington.astro` | hero, stats, timeline, performance, sources, CTA | No | Yes | Page builder |
| `src/pages/book-training.astro` | hero/status, options, expectations | No | Yes | Page builder with computed booking component |
| `src/pages/404.astro` | system message | No | No | Hardcoded system page |
| `src/pages/privacy.astro` | title and long-form body | Yes | Possibly another policy | Existing fixed-schema `legal` collection |

## Component hierarchy and editing candidates

- `BaseLayout.astro` owns metadata, organization JSON-LD, `Header`, `Footer`, and the page slot.
- `Header.astro` consumes shared navigation and contains the only interactive client script. Navigation belongs in the data editor.
- `Footer.astro` is shared UI. Its descriptive copy and navigation belong in shared data; the required Flintstone SEO attribution remains locked in the component.
- `ServicePage.astro` renders collection-backed service/focus content. Hero fields, image, and topics are visual-editing candidates.
- `BookingCTA.astro` is shared presentation currently fed by props. Page-builder uses should co-locate CTA fields within the block.
- New page-block Astro components will represent the existing unique sections without changing the approved visual design.
- No React/Vue/Svelte/Solid islands, MDX components, `astro-icon`, scroll-reveal behavior, or source-editable wrapper components were found.
- Inline `<details>` exists only in the hardcoded homepage and will become a structured FAQ block, not a Markdown snippet.
- `set:html` is limited to generated JSON-LD and is not editor content.

## Primitive vs. computed census

| Template | Interpolation | Kind | Action |
|---|---|---|---|
| `index.astro` | shared training/focus arrays and numeric index formatting | computed/shared data | Render inside registered section components using co-located block fields |
| `training/index.astro` | shared training/focus arrays | computed/shared data | Render inside registered section components using co-located block fields |
| `coach-carrington.astro` | all visible values currently literals | primitive | Move into co-located block fields |
| `book-training.astro` | Square readiness ternaries and shared options | computed/runtime | Isolate in registered booking components; keep display copy editable |
| service detail routes | `page.data.*` values | primitive | Keep collection fields and registered service component |
| `privacy.astro` | title, date prefix, rendered body | primitive plus presentational prefix | Keep collection fields; isolate date presentation from editable value |

Target for migrated route files: zero computed visible-content interpolation outside registered components.

## Registered-component co-location census

No components are currently registered: `src/cloudcannon/registerComponents.ts` exports nothing. Every page-builder block introduced in Phase 3 will receive a single co-located block object and be registered in Phase 4; no empty prop prefix or fallback wrapper will be used.

## Flags for later phases

- `cloudcannon.config.yml` references the missing `src/content/pages` directory.
- Existing `_structures.content_blocks` defines only a CTA and does not cover any current page.
- The `data` collection points at a TypeScript module, which CloudCannon cannot safely treat as normal editor data.
- Existing editable attributes cover only legal and service fields; shared CTAs and all unique marketing sections remain hardcoded.
- Booking URL and production domain remain deployment environment values.
- Existing factual constraints and approved route architecture must be preserved.

## Migration sizing

- Total rendered HTML routes: 10 including the 404 page (threshold `>30`: not tripped).
- Hardcoded Astro-to-content conversions: 4 (threshold `>15`: not tripped).
- Distinct content collections after migration: 3 (`pages`, `services`, `focus_areas`; threshold `>5`: not tripped). The former `legal` entry is consolidated into `pages`.
- Thresholds tripped: 0/3. A single-pass migration is appropriate; no `.cloudcannon/migration/plan.md` is required.
