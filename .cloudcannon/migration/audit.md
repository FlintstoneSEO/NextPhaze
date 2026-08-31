# CloudCannon migration audit

## Scope and assumptions

- Site: NextPhaze Athletic Training.
- Objective: make the existing static Astro site editable in CloudCannon while preserving its routes, design, SEO metadata, and Square-link environment-variable boundary.
- Recommended editorial scope: editable page content, shared navigation/training options, reusable CTA copy, and service detail pages. The 404 page remains developer-owned.
- No client facts have been changed or invented during this audit.

## Platform and build pipeline

| Item | Finding |
| --- | --- |
| SSG | Astro 7.2.9 (confirmed from `package.json`; CloudCannon CLI detection did not return before the local command timeout) |
| Output | Static, directory build format |
| Package manager | npm (`package-lock.json`) |
| Build | `npm run build` runs `astro check && astro build` |
| Integrations | None |
| Framework islands | None; all components are `.astro` |
| CSS | Project CSS in `src/styles/global.css`; no Tailwind |
| Markdown / MDX | Not present |
| Node requirement | No `.nvmrc`, `.node-version`, or `engines` field |
| Environment | `SITE_URL` controls canonical/noindex behavior; `PUBLIC_SQUARE_BOOKING_URL` controls the external booking state |

Astro 7 supports the current editable-regions integration. No upgrade decision is required.

## Content collections and shared data

There is no `src/content.config.ts` or legacy content configuration, and no Markdown/MDX content. `src/data/site.ts` currently contains site settings plus two repeated content arrays:

| Current source | Shape | Current consumers | Recommended CloudCannon treatment |
| --- | --- | --- |
| `site` | singleton settings/navigation | header, booking page | YAML data file; retain environment variable for Square URL in code/config boundary |
| `trainingOptions` | two like-shaped services | home, training index, booking | fixed-schema `services` collection; canonical source for service cards and service detail pages |
| `focusAreas` | two like-shaped development areas | home, training index | fixed-schema `focus_areas` collection |

The proposed collections make each routed service page a content entry, not a separate hardcoded page. The Square booking URL should remain an environment variable rather than editable CMS data, because it is an external integration endpoint.

## Pages and routing

All normal routes are static `.astro` pages. `src/pages/sitemap.xml.ts` manually lists the normal routes. It must be refactored to derive routes from the new collections, or the new content entries will be omitted from the sitemap.

| Route | Source | Data source | Recommendation |
| --- | --- | --- | --- |
| `/` | `src/pages/index.astro` | hardcoded + shared arrays | `pages` page-builder entry (`index.md`) |
| `/training/` | `src/pages/training/index.astro` | hardcoded + shared arrays | `pages` page-builder entry (`training/index.md`) |
| `/training/one-on-one/` | `src/pages/training/one-on-one.astro` | inline props | `services` entry, shared `[slug].astro` template |
| `/training/group/` | `src/pages/training/group.astro` | inline props | `services` entry, shared `[slug].astro` template |
| `/training/speed-agility/` | `src/pages/training/speed-agility.astro` | inline props | `focus_areas` entry, shared `[slug].astro` template |
| `/training/wide-receiver/` | `src/pages/training/wide-receiver.astro` | inline props | `focus_areas` entry, shared `[slug].astro` template |
| `/coach-carrington/` | `src/pages/coach-carrington.astro` | hardcoded | `pages` page-builder entry |
| `/book-training/` | `src/pages/book-training.astro` | hardcoded + shared data | `pages` page-builder entry; preserve external booking state logic |
| `/privacy/` | `src/pages/privacy.astro` | hardcoded prose | fixed-schema `legal` entry with Markdown body |
| 404 | `src/pages/404.astro` | hardcoded | leave developer-owned |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | manual route array | derive static pages plus collection entries |

## Static-page census

| Page file | Distinct content sections | Layout repeated on other pages? | Editor will add similar pages? | Recommended pattern |
| --- | --- | --- | --- | --- |
| `src/pages/index.astro` | hero, pricing, focus, process, coach, service area, FAQ, CTA | No | Maybe | Page builder |
| `src/pages/training/index.astro` | hero, formats, focus, CTA | No | Maybe | Page builder |
| `src/pages/training/{group,one-on-one}.astro` | service hero, topics, CTA | Yes | Yes | Fixed-schema `services` collection |
| `src/pages/training/{speed-agility,wide-receiver}.astro` | service hero, topics, CTA | Yes | Yes | Fixed-schema `focus_areas` collection |
| `src/pages/coach-carrington.astro` | hero, stats, story, callout, sources, CTA | No | Maybe | Page builder |
| `src/pages/book-training.astro` | hero/status, options, expectations | No | Maybe | Page builder |
| `src/pages/privacy.astro` | heading and long-form policy | Yes (future legal pages) | Maybe | Fixed-schema `legal` collection with Markdown body |
| `src/pages/404.astro` | error message | N/A | No | Hardcoded |

## Layout and component hierarchy

`BaseLayout.astro` supplies document metadata, structured data, Header, Footer, and page slot. Header reads shared navigation from `src/data/site.ts`. Footer includes the required Flintstone SEO attribution. `BookingCTA.astro` is a reusable editable block candidate. `ServicePage.astro` is a shared presentation template for collections. All image references use `public/images` with plain `<img>` tags, so CloudCannon uploads can remain under the static public image path.

No MDX components, inline HTML content, framework islands, `astro-icon`, presentation wrappers, scroll-reveal scripts, or entrance animations were found.

## Primitive versus computed census

Route templates with repeated interpolations depend primarily on shared data or computed state:

| Interpolation / behavior | Kind | Migration action |
| --- | --- | --- |
| `trainingOptions.map(...)` | shared collection data | render through collection-backed block/component |
| `focusAreas.map(...)` | shared collection data | render through collection-backed block/component |
| `squareReady` conditional | computed environment state | retain in a dedicated booking-status component; do not expose as a frontmatter primitive |
| SEO title / description | primitive page metadata | keep under each page/collection entry metadata |

Target state: page route files render collection entries and registered blocks; stateful booking logic is isolated from editable frontmatter.

## Visual-editing candidates

- Page-builder blocks: hero, pricing/service list, focus list, process steps, credential/stat list, FAQ, source links, booking expectations, CTA.
- Shared data panel: navigation labels/links and service/focus entries.
- Leave structured-data template, global footer attribution, responsive header behavior, and Square environment variable developer-owned.

## Sectioning assessment

- Total content routes: 9 (threshold >30: not tripped).
- Hardcoded-to-content conversions: 8 normal pages (threshold >15: not tripped).
- Distinct proposed collections: 4 (`pages`, `services`, `focus_areas`, `legal`) (threshold >5: not tripped).
- Result: single-pass migration is appropriate; no sectioning plan required.

## User review required before configuration

Confirm the editorial model: page-builder entries for unique marketing pages, fixed-schema collections for services/focus areas/legal content, and Square URL retained as a deployment environment variable.
