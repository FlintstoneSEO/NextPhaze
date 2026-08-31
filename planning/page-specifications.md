# NextPhaze Page Specifications

## Shared implementation rules

- One descriptive H1 per page.
- Primary CTA label is always `Book Training`.
- Career proof appears only after the service proposition is clear.
- Nashville is named without implying a verified street address or facility.
- No age, schedule, duration, result, testimonial, or availability claim is invented.
- LCP candidates are either the logo or CSS-driven layout; unconfirmed photos are not required above the fold.
- Shared Organization schema includes only verified name, area served, and prices visible on the page. Domain-dependent fields remain omitted until supplied.

## `/`

Objective: explain the offer, prices, Nashville relevance, and booking path in the first screen. H1: `Athletic Training Built for Your Next Phase`. Sections: asymmetric hero; two-option price rail; training-focus composition; how training works; compact coach proof; Nashville service-area statement; FAQ; final CTA. Title: `Athletic Training in Nashville, TN | NextPhaze`. Meta: `Train for speed, agility, football skills and athletic development with NextPhaze in Nashville. Group training is $30 and 1-on-1 training is $60.`

## `/training/`

Objective: help visitors choose a training format and focus. H1: `Training With a Clear Purpose`. Sections: overview; format comparison; development focus; related coach proof; CTA. Title: `Sports Performance Training Nashville | NextPhaze`.

## `/training/one-on-one/`

Objective: explain focused coaching without promising individualized outcomes that have not been verified. H1: `Focused 1-on-1 Athletic Training`. Required proof: $60 confirmed price. Title: `1-on-1 Athletic Training Nashville | NextPhaze`.

## `/training/group/`

Objective: explain the group format without inventing group size, schedule, or age range. H1: `Group Training That Builds Competitive Habits`. Required proof: $30 confirmed price. Title: `Group Athletic Training Nashville | $30 Sessions`.

## `/training/speed-agility/`

Objective: target movement-development intent while avoiding guaranteed performance claims. H1: `Speed and Agility Training for Game Movement`. Topics: acceleration, footwork, change of direction, body control, and transfer to play. Title: `Speed & Agility Training Nashville, TN | NextPhaze`.

## `/training/wide-receiver/`

Objective: explain receiver and football-skill coaching with relevant Carrington proof. H1: `Wide Receiver Training Built for the Position`. Topics: stance, releases, footwork, route detail, catching, and game movement. Title: `Wide Receiver Training Nashville, TN | NextPhaze`.

## `/coach-carrington/`

Objective: establish credibility after explaining Carrington's role as coach. H1: `Coach Carrington Thompson`. Verified proof: Western Michigan #15, 2016 MAC Champion and Cotton Bowl team member, 139 collegiate receptions, 1,936 collegiate receiving yards, 18 collegiate touchdowns across Northwood and Western Michigan, West Michigan Ironmen experience, 2018 MPIF champion, 2018 MPIF Offensive Rookie of the Year. External source links are text-only unless media rights permit otherwise. Title: `Coach Carrington Thompson | NextPhaze Nashville`.

## `/book-training/`

Objective: help users select Group or 1-on-1, confirm the price, and enter the real booking flow. H1: `Choose Your Training Format`. The page must not claim completion unless an actual scheduler callback or successful lead submission exists. Exact workflow is blocked pending client input. Title: `Book Athletic Training in Nashville | NextPhaze`.

## `/privacy/`

Objective: publish accurate privacy terms only after form, analytics, and hosting behavior are known. H1: `Privacy Policy`. Until those systems are configured, the route may explain that the static site does not collect information directly and must be updated before analytics or forms are enabled.

## Acceptance criteria

All routes build statically, remain usable at 320px, support keyboard navigation and reduced motion, expose unique titles and descriptions, contain no unlicensed remote images, include the Flintstone SEO attribution, and send every Book Training CTA to `/book-training/` or the verified external scheduler.
