# Visual-editing census

| Route/template | Section | Treatment | Reason / boundary |
| --- | --- | --- | --- |
| Training detail templates | Service hero, topic list, related link | collection component + text/image/array regions | Content is moved into `services` and `focus_areas` entries. |
| Privacy template | Policy body | collection content region | Long-form prose belongs in the `legal` collection body. |
| Homepage | All sections | page-builder (pending content migration) | Unique, multi-section marketing page; do not use source editables. |
| Training overview | All sections | page-builder (pending content migration) | Unique, multi-section marketing page. |
| Coach page | All sections | page-builder (pending content migration) | Unique, multi-section marketing page. |
| Booking page | Content sections; booking state | page-builder + developer-owned booking-state component (pending) | Copy is editor content; the external Square URL/status remains environment-driven. |
| Header | Navigation links | shared data-file component (pending) | Navigation is shared across routes. Menu behavior remains developer-owned. |
| Footer | Footer copy and links | shared data-file component (pending) | Required Flintstone attribution remains visible and fixed. |
| Booking CTA | CTA copy | shared data-file component (pending) | Shared section rendered across multiple routes. |
| 404 | Error page | developer-owned | System page; no content-editor value. |

## Implementation note

This first implementation pass wires the collection-backed detail and legal templates. The four unique marketing pages and shared partials remain explicitly pending page-builder/data extraction; they are not being mislabeled as source-editable.
