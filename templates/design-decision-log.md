# Design Decision Log

## 2026-08-30: Platform

Decision: use Astro because this is a new content-driven local-service website with no existing application or requested platform.

## 2026-08-30: Art direction

Decision: Training Lab approved by the client. Use the existing black, gold, and silver identity with sharp geometry, movement notation, modular pricing, and restrained animation. Career content receives limited Championship Editorial influence only on the coach route.

## 2026-08-30: Media

Decision: use the supplied logo as the only assumed-owned production asset. Hold Carrington photographs until rights are confirmed. This keeps implementation compatible with the report's provenance gate.

## 2026-08-30: Location

Decision: describe the service as serving Nashville without claiming a storefront, customer-facing facility, street address, or specific neighborhood.

## 2026-08-30: Audience

Decision: write for athletes and evaluating parents without naming youth, high-school, adult, or other age groups until the client confirms eligibility.

## 2026-08-30: Booking

Decision pending: CTA destinations can route to `/book-training/`, but the final submission or scheduling action requires a client-supplied booking URL or approved lead-capture workflow.

## 2026-08-30: Homepage hero media

Decision: replace the synthetic homepage hero with the client-supplied `Carrington Action Shot.png`, explicitly selected and approved by the user. Deliver it as an optimized WebP with a full-bleed crop, retaining the Training Lab composition and responsive scrim for text contrast.

## 2026-08-30: CloudCannon migration architecture

Decision: complete the partial CloudCannon integration with a structured `pages` collection and registered Astro page blocks for the four unique marketing pages. Retain fixed-schema collections for repeating training detail pages and Markdown legal content. Move shared editor-owned values into YAML data while preserving deployment-owned Square and production-domain environment variables. The approved routes, visual direction, verified facts, SEO behavior, and Flintstone SEO attribution remain unchanged.

## 2026-08-31: Homepage career proof imagery

Decision: combine the Western Michigan #15 and 2016 championship credentials into one image-backed panel using the client-selected `Carrington Action Shot2.PNG`. Pair the 2018 MPIF championship and Offensive Rookie of the Year credential with `Carrington Action 5.png` in a second panel. Use dark lower scrims and responsive crops so the credentials remain readable without separating the photographs from their related career proof.

## 2026-08-31: Coach page portrait

Decision: replace the abstract right-side coach hero mark with the client-selected `Image of Carrington.png`. Preserve the `15 / Western Michigan` credential as a compact gold overlay, keeping the page's established Training Lab identity while giving the coach introduction a personal focal point.

Revision: remove the `15 / Western Michigan` overlay after visual review. The portrait is stronger without competing text, while Carrington's Western Michigan history remains documented in the career content below.

## 2026-08-31: Homepage training-focus interaction

Decision: make the training-focus section image-backed and interactive. Selecting a focus opens its description and changes the full-section background image; desktop hover and keyboard focus provide a temporary preview, while a click or tap locks the selection. The directional arrow remains a separate link to the relevant training page so exploration does not unexpectedly navigate away.
