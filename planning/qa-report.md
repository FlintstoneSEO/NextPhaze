# NextPhaze Website QA Report

## Release status

Implementation is complete and suitable for staging review. Production launch remains a no-go until the Square booking URL and production site URL are supplied and verified. The client should also confirm the public-facing booking policies and legal contact details before launch.

## Verification completed

- `npm run build`: passed with 0 errors, 0 warnings, and 0 hints; 10 pages generated.
- Playwright and axe checks: 20 passed across primary routes, navigation, keyboard-relevant controls, serious/critical accessibility rules, and responsive widths from 320 to 1440 CSS pixels.
- Visual review: completed for the home, coach, and booking pages in light and dark system themes.
- Dependency audit: the final install reported 0 vulnerabilities.
- Lighthouse mobile lab run: Performance 93, Accessibility 100, Best Practices 100, SEO 69; FCP 0.8 s, simulated LCP 3.2 s, CLS 0, and TBT 0 ms.

## Open issues

### 1. Square booking destination is not yet available

- Severity: blocker
- Element or file: `.env.example`, `src/data/site.ts`, and the `/book-training/` route
- Viewport, route, or state: all viewports; any booking call to action before launch configuration
- Observed problem: the production Square Appointments URL has not been supplied, so booking controls deliberately remain disabled and display “Square Link Pending.”
- Evidence: `PUBLIC_SQUARE_BOOKING_URL` is empty and the booking state is rendered as unavailable.
- Exact recommended change: add the final Square booking URL to `PUBLIC_SQUARE_BOOKING_URL`, rebuild the site, and complete a real booking-flow test through Square's confirmation screen without submitting a charge unless an approved test appointment is available.
- Reason: visitors must not be sent to an invented, broken, or unverified payment destination.
- Expected outcome: every “Book Training” action opens the correct Square booking experience.
- Verification method: test header, home, training, service, coach, and booking-page calls to action on desktop and mobile; confirm the destination, service choices, pricing, policies, and return behavior.

### 2. Production domain is not yet configured

- Severity: blocker
- Element or file: `.env.example`, `astro.config.mjs`, `src/layouts/BaseLayout.astro`, sitemap, canonical tags, and robots directives
- Viewport, route, or state: production build before `SITE_URL` is set
- Observed problem: without a verified production domain, the site intentionally emits `noindex, nofollow` and uses a local fallback for canonical construction.
- Evidence: `SITE_URL` is empty; the Lighthouse SEO score is 69 because the current preview is intentionally not crawlable.
- Exact recommended change: set `SITE_URL` to the final HTTPS origin, rebuild, inspect generated canonical and sitemap URLs, and confirm that production pages emit the intended indexable robots directive.
- Reason: indexing a preview URL or publishing incorrect canonical URLs can impair search visibility.
- Expected outcome: unique pages expose valid production canonicals, sitemap entries, and crawl directives.
- Verification method: inspect the built HTML, `/sitemap.xml`, and `/robots.txt`; rerun Lighthouse SEO against the deployed site and confirm indexability in the chosen search-console tooling.

### 3. Booking and legal details need client confirmation

- Severity: high
- Element or file: `/book-training/`, `/privacy/`, footer contact content, and Square configuration
- Viewport, route, or state: production launch and booking checkout
- Observed problem: exact venue/service-area wording, athlete age eligibility, session length, availability, cancellation/refund terms, and the public privacy contact have not been verified.
- Evidence: the planning brief records these fields as client inputs; the implemented site avoids fabricating them.
- Exact recommended change: provide and approve the missing operational and legal details, then update the relevant page copy and ensure matching policies are configured in Square.
- Reason: these details affect purchase expectations, eligibility, and legal transparency.
- Expected outcome: visitors can make an informed booking and see consistent terms on the website and in Square.
- Verification method: compare the published site and Square checkout against the client-approved policy sheet, then complete a copy and link audit.

### 4. Simulated mobile LCP is above the target

- Severity: medium
- Element or file: home-page hero and production delivery configuration
- Viewport, route, or state: Lighthouse simulated mobile profile on the local preview
- Observed problem: simulated LCP measured 3.2 s against the 2.5 s target, although the same report recorded an observed local LCP of approximately 161 ms and the hero image is preloaded and optimized.
- Evidence: `artifacts/lighthouse-home-mobile-final2.json`; Performance score 93, CLS 0, TBT 0 ms.
- Exact recommended change: deploy to staging with compression and CDN caching enabled, rerun Lighthouse from the deployed origin, and collect field data after launch. If the deployed lab result remains above 2.5 s, inspect server response time and image delivery before further visual changes.
- Reason: local simulated timing does not establish the 75th-percentile field result, but it identifies a performance risk worth validating in the real hosting environment.
- Expected outcome: verified staging performance and a clear basis for any server or asset optimization.
- Verification method: run Lighthouse mobile three times on staging, use the median result, and monitor CrUX or equivalent real-user metrics once sufficient traffic exists.

### 5. Supplied athlete photography lacks confirmed usage rights

- Severity: low
- Element or file: supplied Carrington imagery referenced during discovery
- Viewport, route, or state: any future content update that introduces those photographs
- Observed problem: the build does not use the supplied photographs because publication rights were not confirmed.
- Evidence: current pages use purpose-generated, non-identifiable training imagery documented in `media-provenance.md`.
- Exact recommended change: obtain written confirmation of web usage rights before replacing the generated visuals with supplied photography.
- Reason: rights status must be known before public distribution.
- Expected outcome: any future authentic photography is publishable with a documented source and permission basis.
- Verification method: store the approval record and update `media-provenance.md` before committing the replacement assets.

## Release recommendation

Approve for staging. Do not publish as an indexable production site until issues 1 through 3 are resolved. Recheck issue 4 on the actual hosting stack.
