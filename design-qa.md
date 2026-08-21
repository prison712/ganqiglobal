# Design QA — 赣企科技集团总站

## Evidence

- Source visual truth: `design-references/ganqi-selected-homepage-direction.png`
- Rendered desktop implementation: `design-references/ganqi-implementation-desktop.png`
- Rendered mobile implementation: `design-references/ganqi-implementation-mobile.png`
- Desktop interaction states: `design-references/ganqi-implementation-nav-hover.png`
- Mobile menu state: `design-references/ganqi-implementation-mobile-menu.png`
- Contact validation state: `design-references/ganqi-implementation-contact-validation.png`
- Full comparison board: `design-references/ganqi-comparison-full.png`
- Focused hero comparison board: `design-references/ganqi-comparison-hero.png`
- Browser results and route evidence: `design-references/ganqi-local-qa.json`

## Normalization

- Source pixels: 718 × 2191.
- Desktop implementation pixels: 1440 × 7561, CSS viewport 1440 × 1000, device scale factor 1.
- Mobile implementation pixels: 390 × 11530, CSS viewport 390 × 844, device scale factor 1.
- The source concept is a condensed overview while the approved implementation contains additional strategy, company and global-network sections. The comparison board normalizes both desktop columns to 718 px width; the additional implementation height is intentional product scope rather than density drift.
- The focused hero board compares the source and implementation at the same normalized 718 px column width and closed-navigation state.

## State and Interaction Checks

- Desktop home: default state and About dropdown hover state.
- Mobile home: default state and open navigation drawer.
- Contact: invalid-phone validation state.
- Routes checked in browser: `/about`, `/business`, `/strategy`, `/companies`, `/global`, `/news`, `/contact`, `/companies/enterprise-services`, `/companies/education`.
- All checked routes returned HTTP 200 and rendered the expected page title.
- Browser console errors: none.
- Horizontal overflow: none at 1440 px or 390 px.
- Homepage anchor links: none; group navigation uses independent page routes.

## Required Fidelity Surfaces

- Fonts and typography: Chinese display hierarchy follows the source with a heavy headline, compact English eyebrow and restrained body size. The Windows Chinese system fallback differs slightly from the rendered concept font but preserves weight and hierarchy. No orphan characters remain in desktop hero or global-network headings.
- Spacing and layout rhythm: hero, white intro, deep-blue business area, white capabilities, exhibition feature, partner area, deep-blue news and footer retain the source rhythm. Added strategy, companies and global-network sections use the same spacing and grid system.
- Colors and tokens: deep navy, business blue, white and orange CTA tokens match the selected direction. Contrast is sufficient in hero, dark sections, navigation and form states.
- Image quality and asset fidelity: hero uses a project-bound generated 16:9 global-network image; group, exhibition, enterprise-service and education sections use the user's real source images at suitable aspect ratios. No placeholder illustration, custom SVG art or emoji imagery is used.
- Copy and content: group statistics and business taxonomy stay within supplied materials. Unconfirmed honors, partner logos and news copy are explicitly marked pending instead of being invented.
- Responsive behavior: desktop grids collapse to tablet/two-column and mobile/single-column layouts. The strategy and capability tracks use contained horizontal scrolling on mobile without page overflow.
- Accessibility: semantic links and buttons, visible focus rings, labelled form fields, `aria-current`, `aria-expanded`, escape-to-close navigation, reduced-motion support and validation status are present.

## Comparison History

### Pass 1 — blocked

- [P2] Desktop hero headline left a single “界” character on a third line because its width was capped at 900 px.
- [P2] The global-network heading similarly left “海” isolated on its own line.
- [P2] The header lockup emphasized the group name instead of the approved lead brand “赣企出海”.

Fixes:

- Increased desktop hero heading width to 1120 px and global heading width to 940 px.
- Changed header and footer lockups to lead with “赣企出海 / GANQI OVERSEAS” and retain the group name as the descriptor.
- Re-captured desktop, mobile, dropdown, menu and contact states after the fixes.

### Pass 2 — passed

- Focused hero comparison confirms one-line desktop headline, matching left-side text hierarchy, real global hero imagery and orange CTA placement.
- Full comparison confirms the shared source sections and visual token system remain coherent across the longer approved framework.
- No actionable P0, P1 or P2 differences remain.

## Follow-up Polish

- [P3] Replace the clearly labelled partner-category states with final authorized logo assets when supplied.
- [P3] Replace pending news and honor content after group approval without changing the current card and publication-status layouts.

final result: passed
