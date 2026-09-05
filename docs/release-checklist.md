# Userhood website release checklist

Prepared: 5 September 2026  
Candidate branch: `codex/site-rebuild`  
Pre-Phase-7 rollback point: `a319c3b`  
Deployment status: not authorised; local candidate only

## What passed locally

- [x] Production typecheck, client build, server build, prerender, and site validator.
- [x] Exactly one `main` and one `h1` on every route in the route manifest.
- [x] Canonical metadata, social metadata, sitemap, robots, consent boundaries, security headers, and immutable asset caching.
- [x] Responsive review at 390×844, 768×900, 1024×900, and 1440×900.
- [x] No horizontal overflow on the homepage, Services, About, repository-backed case studies, experience notes, Careers, legal pages, or 404 route.
- [x] Mobile menu: opaque full-height sheet, body lock, inert background, focus loop, Escape close, and focus return.
- [x] Enquiry modal: source-based project preselection, body lock, focus containment, keyboard close, validation path, scrollable phone layout, and visible privacy context.
- [x] Sticky mobile CTA appears only after proof enters, and disappears before the final CTA and footer.
- [x] The source validator requires the complete conversion-event contract: selected-work and case-study opens, form open/start/type/validation/attempt/success/error/close, WhatsApp exit, and page view. Every event except post-submit `generate_lead` is also required in a keyless local bundle; Vite correctly removes the unreachable success branch when no form access key is present.
- [x] Google Analytics stays disabled until consent; production pages contain no Apollo visitor-identification script.
- [x] Essential content and controls remain useful without animation; reduced-motion CSS removes delays and continuous movement.

## Release gates still requiring a human or production environment

- [ ] Product owner reviews the local candidate and explicitly approves deployment.
- [ ] Confirm `VITE_WEB3FORMS_ACCESS_KEY` in the production environment, then send one labelled internal test enquiry and verify receipt. Do not use a real prospect's details.
- [ ] Accept analytics consent on the production candidate and verify one event from each funnel stage in GA DebugView: proof open, lead form open, form start, submit attempt, and `generate_lead`.
- [ ] Run Lighthouse or a Chrome DevTools performance trace on Home, Services, and one case study at mobile and desktop sizes. Record LCP, CLS, and INP/TBT; investigate any regression before announcing the release.
- [ ] Verify the live response headers against `vercel.json` after deployment.
- [ ] Test the live canonical domain, redirects, sitemap, robots, 404 response, WhatsApp link, and email links.
- [ ] Replace Phase 4 product placeholders only with approved images and provenance notes; rerun responsive and performance checks after each media batch.

## Rollback

1. If the release causes a functional, routing, form, consent, or severe visual regression, revert the release merge or release commit through Git/Vercel and redeploy the previous known-good build.
2. Use `a319c3b` as the pre-Phase-7 comparison point. Do not use a destructive reset on the shared working copy.
3. Preserve failed-deployment logs, the affected URL, viewport, browser, and analytics/form evidence before making the corrective patch.
4. Rerun `npm run check` and the relevant browser scenario before attempting a second release.

## Known deferred inputs, not release surprises

- Rentnama and Tirch product screenshots, diagrams, and social cards are still intentional placeholders under Phase 4.
- Hyundai and Mitsubishi media remain experience-note placeholders unless usage approval is supplied.
- Team portraits are illustrations, and individual LinkedIn/profile evidence has not been supplied.
- Core Web Vitals numbers are pending the measurement gate above; no unmeasured score is claimed.
