# NextPhaze Media Provenance

## Rights statuses

`owned`, `licensed`, `official-embed`, `link-only`, `permission-pending`, `rejected`

## Rules

Only assets marked `owned` or `licensed` may be copied into production. Official embeds must use publisher-provided functionality. Link-only items use text links with no copied thumbnail. No hotlinking, screenshots, downloads, or rehosting of third-party media.

## Asset register

| Asset ID | Source | Type | Status | Approved use | Production path | Notes |
|---|---|---|---|---|---|---|
| NP-LOGO-01 | Client-supplied project folder | Logo | owned | Site identity | `/public/images/nextphaze-logo.png` | Assumed authorized because supplied as the business logo; client should confirm before launch |
| NP-PHOTO-01 | Client-supplied project folder | Carrington action photo | owned | Homepage hero | `/public/images/carrington-action-hero.webp` | User explicitly selected and approved this supplied image for hero use on 2026-08-30 |
| NP-PHOTO-02 | Client-supplied project folder | Carrington Western Michigan action photo | owned | Homepage coach proof | `/public/images/carrington-wmu-proof.webp` | User explicitly selected this supplied image for the combined WMU #15 and 2016 credential panel on 2026-08-31 |
| NP-PHOTO-03 | Client-supplied project folder | Carrington Ironmen action photo | owned | Homepage coach proof | `/public/images/carrington-mpif-proof.webp` | User explicitly selected this supplied image for the 2018 MPIF credential panel on 2026-08-31 |
| NP-GEN-01 | OpenAI built-in image generation | Synthetic training image | owned | Homepage and 1-on-1 training | `/public/images/training-acceleration.webp` | Anonymous athlete, not Carrington or a client |
| NP-GEN-02 | OpenAI built-in image generation | Synthetic training image | owned | Training and speed/agility pages | `/public/images/training-lane.webp` | Empty training setup with no people |
| NP-GEN-03 | OpenAI built-in image generation | Synthetic training image | owned | Wide receiver training page | `/public/images/receiver-catch.webp` | Anonymous athlete, not Carrington or a client |
| WMU-PROFILE | wmubroncos.com | Page/photo lead | link-only | Fact source link | None | No reuse license established |
| FOX17-PROFILE | fox17online.com | Article/video lead | link-only | External article link | None | Upgrade only if official embed is offered and verified |
| LSJ-2018 | localsportsjournal.com | Article/photos | link-only | External article link | None | Photography requires permission |
| LSJ-2019-MUSKEGON | localsportsjournal.com | Article/photos | link-only | External article link | None | Joe Lane photography requires permission |
| LSJ-2019-INDY | localsportsjournal.com | Article/photos | link-only | External article link | None | Leo Valdez photography requires permission |
| MLIVE-YOUTUBE | youtube.com/watch?v=lsJL8-dRAYM | Video | permission-pending | Conditional official YouTube embed | None | Confirm availability and embed permission before use |

## Release check

- [x] Client confirms the selected Carrington action photograph for homepage hero use
- [ ] No unlicensed remote image URL appears in HTML, CSS, or content
- [ ] No third-party thumbnail is copied into the repository
- [ ] Every production asset has an allowed status
