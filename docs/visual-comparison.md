# Visual comparison and verification

Date: 2026-10-23. Production preview: http://127.0.0.1:3015.

## Inspected sources

All five M Design Group pages were rendered and captured full-page: home, our expertise, about us, awards/articles and contact. Reference viewports: 390, 768, 1440 and 1920px. Mobile menu opening and brand-panel upward hover transition were inspected. Carousel source configuration supplied the 5000ms autoplay and 500ms transition measurements. No claim is made that every reference link or third-party embed works.

Lifetime home, about, portfolio, projects, interior, architecture, estate and blog pages were rendered and scrolled. Project/article source URLs and asset URLs are recorded in local data and the asset inventory. Official linked HOIRe rendered; the furniture brand website returned a TLS/browser failure. This was not bypassed.

## Comparison results

Full-page side-by-side comparisons are stored under `artifacts/comparisons/`, with source on the left and production on the right. Screenshots are normalized to equal display widths, including source captures saved at reduced resolution. Raw production captures and measured section boxes are in `artifacts/browser-qa/`.

The review compared all five desktop and phone page compositions, plus tablet and large-screen home/expertise layouts. Major corrections included:

- Desktop hero height, text width, header spacing, 1200px container and three 458px brand panels.
- Expertise full-width/asymmetric/full-width composition, with 600px outer and 560px middle panels.
- Phone 44px header, 400px hero, 300px brand panels, smaller editorial type, article stacking and timeline sizing.
- Separate tablet rules: 500px hero, stacked 250px brand panels, two-column company overview and horizontal article cards.
- Actual upward brand-panel transition instead of a guessed 3D flip.
- Higher-resolution authorized photography, corrected hero crops, local source font families and mobile contact form proportions.

Macro section order, image/container proportions, typography hierarchy and principal desktop spacing now follow the inspected reference. The result is not claimed pixel-perfect: genuine Lifetime text and wordmarks wrap differently; photographs, awards replacements, accessible controls and source availability necessarily differ.

Desktop full-page height comparison at 1440px (reference heights reconstructed from scaled screenshots, therefore approximate):

| Page | Reference | Production |
| --- | ---: | ---: |
| Home | 4506px | 4393px |
| Expertise | 2916px | 2932px |
| About | 5028px | 4984px |
| Articles | 3848px | 3842px |
| Contact | 3144px | 3193px |

Similar total heights are evidence of overall rhythm, not a pixel-similarity score.

## Verification evidence

- TypeScript, ESLint, four native Node tests and production build pass; logs under `artifacts/`.
- Thirty production route/viewport cases cover five primary routes at 360, 390, 768, 1280, 1440 and 1920px: no horizontal overflow, no broken loaded images, one H1 and no reference business identity in rendered text.
- HTTP smoke checks cover eleven page routes and twenty local images; unknown article returns 404.
- Seventeen browser interaction checks cover menu opening/focus trap/Escape/focus return/navigation; hero arrows/dots/autoplay; project carousel; brand keyboard-focus upward reveal; reduced-motion autoplay suppression; invalid form errors and focus; article detail at phone/desktop widths.
- Email construction, validation, header-injection rejection and field length limits are unit-tested. No email was sent and no external application handoff was triggered during testing.
- Production dependency audit reports zero vulnerabilities at verification time.

## Remaining differences and limitations

- Hero uses Lifetime photographic slides, not the reference's embedded video. No suitable authorized matching video was supplied.
- Verified editorial/project highlights replace awards. Only 2007 is a dated Lifetime milestone; subsequent timeline entries are explicitly undated service themes.
- All three service contact areas explicitly use the same verified office rather than inventing branch locations. This produces different copy lengths from the reference's multiple offices.
- Google Maps is a third-party embed and can remain blank or load late. A direct Maps link remains available; maps are not counted as local image failures.
- The official furniture brand link is retained but was unavailable during inspection. Availability and third-party asset credits should be reviewed before public launch.
- Reference lazy-loaded article images and company/video areas were sometimes blank. Local real photographs intentionally remain visible rather than reproducing source loading failures.
- Footer includes verified Lifetime brand links and email; it can be taller on phones. Language switching is omitted because no alternate-language site is implemented.
- No backend exists. Contact form only validates and opens a mailto draft; the visitor must send it in their email application.

All source business imagery remains outside the application public directory. Inspection artifacts are ignored by Git. Asset permissions are project-specific, not a declaration that the source photography is public domain.
