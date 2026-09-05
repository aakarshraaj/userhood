# Userhood website redesign roadmap

Status: active  
Owner: Userhood  
Working principle: evidence before spectacle; one approved phase at a time

## The outcome

Turn Userhood from a visually distinctive agency site into a high-trust product-studio website that helps a serious founder answer four questions quickly:

1. Do these people understand the kind of product I am trying to ship?
2. Can they show real product and engineering judgement?
3. Is the 12-week offer credible and right for my situation?
4. Do I trust the people who will be in the room after I sign?

The redesign keeps the black, white, and cyan identity. It removes legibility debt, unnecessary techno theatre, empty vertical space, and any proof claim the available evidence cannot support.

## Non-negotiables

- Never invent client relationships, outcome numbers, adoption, revenue, or conversion improvements.
- Clearly distinguish repository-backed builds from experience contributed by team members.
- Essential copy must render visibly without waiting for JavaScript animation.
- Product evidence does the visual heavy lifting; decorative effects remain secondary.
- Every phase must pass desktop and phone review before the next phase begins.
- Existing accessibility, SEO, consent, routing, and security guardrails remain intact.
- Case-study media must be replaceable without redesigning the page.

## Portfolio evidence model

### Tier A — repository-backed product builds

These lead the portfolio because the implementation and product decisions can be inspected.

- Rentnama — rental intelligence platform
- Tirch — small-batch commerce system

Allowed claims come from current code, tests, product decision documents, and implementation notes. Commercial outcomes remain out of bounds until a source exists.

### Tier B — team experience

- Hyundai Global — automotive purchase journey
- Mitsubishi Motors Australia — connected ownership

These remain clearly labelled as experience contributed by members of the team. Attribution appears once, quietly and precisely. They do not borrow the authority of a current Userhood engagement.

## Phase 1 — proof architecture and new case studies

Status: complete

Deliverables:

- Put Rentnama and Tirch first in Selected Work.
- Add dedicated case-study routes for both products.
- Rebuild the case-study template around product facts, decisions, verifiable scope, evidence boundaries, and visual proof.
- Add intentional media placeholders for every required product view.
- Keep Hyundai and Mitsubishi, but demote them below repository-backed builds and retain explicit provenance.
- Add route-specific metadata, prerendered output, and sitemap entries.

Acceptance criteria:

- A visitor can tell which work is repository-backed and which is team experience without opening a case study.
- Rentnama and Tirch each communicate a specific product problem, four consequential decisions, concrete scope, and an honest evidence boundary.
- Missing images are represented by designed proof slots, never fake screenshots.
- Replacing a placeholder requires only adding an image path and alt text.
- Every case-study route has exactly one H1, one main landmark, canonical metadata, and responsive output.

## Phase 2 — legibility and motion

Status: complete

Deliverables:

- Raise body, supporting, footer, metadata, and secondary-action contrast.
- Use monospace only for metadata and technical labels.
- Establish minimum body and caption sizes for phone and desktop.
- Make essential content visible in the server-rendered and initial client state.
- Reduce reveal durations and eliminate long staggered delays.
- Replace decorative motion with one restrained motion idea per viewport.
- Recheck reduced-motion behaviour.

Acceptance criteria:

- The complete hero proposition and primary CTA are visible immediately.
- No section looks empty before a viewport animation runs.
- Supporting copy is comfortably readable at 390px wide and on a standard laptop.
- Motion never delays navigation, comprehension, or interaction.

## Phase 3 — homepage composition and conversion hierarchy

Status: complete

Deliverables:

- Use the desktop hero's right-hand space for product proof rather than an empty kinetic field.
- Shorten hero and section heights.
- Make the 12-week build the single commercial centre of the page.
- Move rescue and post-launch services into a compact secondary band.
- Add proof above the fold and reduce repeated twelve-week explanation.
- Introduce one or two visual contrast beats so the page does not repeat the same black-card rhythm.
- Standardise primary CTA language to “Discuss your 12-week build.”

Acceptance criteria:

- A first-time founder can state the offer, audience, evidence, and next step after one viewport.
- The homepage is 20–30% shorter without removing essential proof.
- One primary action dominates each commercial section.
- Decorative elements never receive more space than proof.

## Phase 4 — final case-study media

Status: waiting on approved product images

Deliverables:

- Replace every placeholder with approved product screenshots, annotated flows, system diagrams, or redacted artefacts.
- Create a consistent capture treatment across desktop, phone, diagrams, and operational views.
- Add captions that explain the decision represented by each image.
- Produce case-specific social cards only after real media is available.

Required media for Rentnama:

- Hero: society answer beside map context.
- Search: society/locality lookup and disambiguation.
- Evidence states: one report, supported median, thin data, and empty society.
- Contribution: canonical fast path and unknown-building map confirmation.
- Growth loop: share, watch return, and privacy-bounded density dashboard.

Required media for Tirch:

- Hero: storefront and collection art direction.
- Commerce: bag to server-verified checkout quote.
- Account: profile, addresses, order history, and empty states.
- Brand system: collection, product-detail, and campaign screens.
- Optional system diagram: browser, Worker, D1, image service, email, and payment boundary.

Required media for Hyundai and Mitsubishi:

- One approved or anonymised hero artefact.
- Journey or system diagram.
- Two to three annotated decision artefacts.
- If permission is unavailable, keep the pages as experience notes and do not simulate client UI.

Asset contract:

- Preferred format: WebP or AVIF, with PNG only where transparency is necessary.
- Wide product view: 1600×1000 minimum.
- Mobile composite: 1200×1400 minimum.
- Social image: 1200×630, created only from approved media.
- Each file requires descriptive alt text and a source/permission note in the asset inventory.

## Phase 5 — Services and About

Status: next

Deliverables:

- Reframe Services by buyer outcome: launch, rescue, and extend.
- Make the 12-week build the default path instead of one capability among many.
- Explain fit, deliverables, duration, client responsibility, and end state for every engagement.
- Move brand/marketing into supporting capability language unless it becomes a deliberate commercial offer.
- Replace illustration-only team presentation with real photography where available.
- Add concise biographies, responsibilities, relevant experience, and LinkedIn links.
- Show how founder involvement actually works during an engagement.

Acceptance criteria:

- A buyer can identify the correct engagement in under 30 seconds.
- The Services page no longer reads like a general capability catalogue.
- The About page proves who does the work and why the operating model is credible.

## Phase 6 — navigation, enquiry, and mobile polish

Deliverables:

- Remove audio controls and nonessential system fiction from navigation.
- Replace `ESTABLISH_CONTACT` with human CTA language.
- Turn the mobile menu into a complete sheet with a proper backdrop.
- Show the sticky CTA only after the hero and before the final CTA; hide it for menu, modal, and footer states.
- Reduce the enquiry form to project type, name, email, release, and optional timeline.
- Preselect project type from the originating CTA.
- Reduce consent-banner height and improve secondary CTA visibility.
- Guarantee top-of-page positioning on internal route changes.

Acceptance criteria:

- No screen presents more than two competing contact actions.
- The enquiry flow fits comfortably on phone and can be completed without unnecessary fields.
- Sticky UI never overlaps evidence, legal content, controls, or the footer.
- Every route begins at the correct position.

## Phase 7 — final quality and measurement

Deliverables:

- Responsive review at 390px, 768px, 1024px, and 1440px.
- Keyboard, focus, reduced-motion, colour-contrast, and semantic review.
- Build, prerender, metadata, sitemap, and security-header verification.
- Performance pass focused on hero cost, motion, fonts, lazy loading, and image sizing.
- Verify analytics for case-study opens, CTA source, form start, validation, submit, and WhatsApp exits.
- Record a release checklist and rollback point before production deployment.

Acceptance criteria:

- No horizontal overflow, hidden content, accidental overlap, or broken route.
- All automated checks pass.
- Core pages remain useful without animation.
- Every tracked event answers a real conversion question.
- Production deployment is reviewed separately from local completion.

## Execution order

Only one phase is active at a time:

`Proof → Legibility and motion → Homepage → Real media → Services/About → Mobile/funnel → Quality and release`

The next phase starts only after the active phase is reviewed and accepted.
