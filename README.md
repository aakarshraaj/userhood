# Userhood

A product design and engineering studio for focused MVP releases. Userhood brings product strategy, interface design, software engineering, and useful AI integration into one accountable delivery team.

## Core Philosophy
Design and engineering share the same release boundary, product decisions, and accountability. Neither discipline exists to decorate or merely execute the other.

The flagship engagement takes a deliberately scoped MVP from product brief to production in twelve weeks. Complexity that cannot responsibly fit is surfaced before kickoff.

## Tech Stack
- React 19 + TypeScript
- Motion (Animation logic & micro-interactions)
- Tailwind CSS v4 (Custom terminal-style design system)
- Vite Ecosystem

## Local Development

Use Node.js 22.12 or newer, then run the application locally:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build & preview production build
npm run build && npm run preview
```

Before opening a pull request, run the same full gate used by CI:

```bash
npm run check
```

This runs strict TypeScript checks, builds and prerenders every public route, and validates route metadata, sitemap coverage, document landmarks, consent boundaries, social previews, and Vercel routing safeguards. CI also audits the locked dependency tree for high-severity advisories.

## Production Notes

- `src/data/site-metadata.json` is the source of truth for public routes, titles, descriptions, canonical URLs, social-preview policy, and sitemap inclusion. Update it when a public route changes; the build generates `sitemap.xml` and `robots.txt` from it.
- `npm run build` creates route-specific static HTML for every public route plus `404.html`, then fails if the rendered output diverges from the route manifest or production safety rules.
- Vercel serves those files with clean URLs and security headers from `vercel.json`. There is intentionally no catch-all SPA rewrite, because it would replace route metadata and turn missing pages into soft 404s.
- Set `VITE_WEB3FORMS_ACCESS_KEY` in the deployment environment and restrict the key to `userhood.in` and `www.userhood.in` in Web3Forms.
- Google Analytics loads only after explicit visitor consent and never loads in local development. Apollo visitor identification is intentionally not included.
