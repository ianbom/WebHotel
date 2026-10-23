# Lifetime Design

Frontend-only Next.js App Router implementation adapting the five inspected M Design Group layouts to authorized Lifetime Design identity and content.

## Run

Requires Node.js 22.18 or newer.

```sh
npm ci
npm run dev
```

Production: `npm run build`, then `npm start`. Standard port: 3000.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Routes: `/`, `/our-expertise`, `/about-us`, `/awards-articles`, `/contact`, and six `/articles/[slug]` pages. Content lives in `src/data/content.ts` and `src/data/site.ts`; images and licensed fonts live under `public/`.

The inquiry form validates locally, then opens the visitor's email application. It does not send messages or store personal information. Maps and official external links depend on third-party availability.

`scripts/collect-assets.py` refreshes authorized source assets/content and requires Python, BeautifulSoup and Pillow. It is maintenance tooling, not a runtime dependency. `scripts/browser-qa.py` runs through the installed browser-harness against `QA_ORIGIN`, optionally pinning `QA_TARGET`.

See `docs/reference-analysis.md`, `docs/asset-sources.md`, and `docs/visual-comparison.md` for provenance, visual evidence and deliberate differences. Reference screenshots are development artifacts, never application assets.
