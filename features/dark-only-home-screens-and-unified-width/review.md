## Objector Design Review — April 25, 2026

### Verdict

The homepage presents a distinct developer-focused aesthetic with strong visual identity (monospace terminal motif, cyan accent). Structurally it uses effective two-column layouts, but there are immediate usability failures that block a confident release: mobile navigation is inaccessible and the Showcase section contains no real examples. Addressing those two issues first will materially improve first-time conversion and trust.

### Blockers (must fix before any release)

1. **Navbar / Mobile** — No accessible navigation at 390px (no hamburger/menu exposed). Mobile visitors cannot reach other routes like `/get-started` or `/showcase`, preventing exploration and conversion. **Action:** Implement a responsive hamburger that reveals all nav links (ensure focus management and keyboard access). — Evidence: `home_mobile_above_fold.png`

2. **Section 4 — Showcase** — All showcase cards display "Coming Soon", providing zero social proof and undermining the hero claim to "Start Shipping." This reads as vaporware. **Action:** Replace at least 3 cards with real shipped examples or reframe the section copy to reflect future work. — Evidence: `home_scroll_75pct.png`

### Major Issues (high priority, fix soon)

1. **Hero vertical imbalance** — The main headline sits well below the visual center leaving large empty space above it on desktop. This reduces immediate legibility. **Action:** Reduce top padding or vertically center the hero content so the headline occupies the visual sweet spot. — Evidence: `home_desktop_above_fold.png`

2. **Secondary CTA contrast** — The ghost/secondary CTA lacks contrast and reads disabled at smaller viewports. **Action:** Increase text contrast and border visibility (use `text-foreground` / stronger border or accent tint). — Evidence: `home_mobile_above_fold.png`, `nav_hover__get_started.png`

3. **Section 3 bottom whitespace** — The workflow section leaves ~250px of empty space below the fold, which feels like missing content. **Action:** Add a teaser element or reduce min-height to tighten the section. — Evidence: `home_scroll_50pct.png`

4. **Right-side control card overstretch** — Cards in section 2 stretch to match the left column leaving large empty areas inside the card. **Action:** Make the card height fit content (`h-fit self-start`) or add meaningful content to fill the space. — Evidence: `home_scroll_25pct.png`

### Minor Issues (polish, nice-to-have)

1. **Mobile terminal prompt wrapping** — Terminal prompt wraps awkwardly on small screens leaving the `$` glyph detached. **Action:** Provide a shorter mobile string or use `whitespace-nowrap` with truncation. — Evidence: `home_mobile_above_fold.png`

2. **Section entry spacing** — Section labels feel tight on entry; increase top padding for clearer separation between screens. **Action:** Add ~120px top padding on `// why.this.config` and `// how.it.works`. — Evidence: `home_scroll_25pct.png`, `home_scroll_50pct.png`

3. **Compact card alignment** — Bottom-row compact cards lack tag metadata and create a staggered grid. **Action:** Add tags or equalize card min-height. — Evidence: `home_scroll_75pct.png`

4. **Unattributed metrics** — Metrics in the handoff card (e.g., `-42% lead time`) lack attribution and feel unverified. **Action:** Add source or reframe as targets/expected outcomes. — Evidence: `home_scroll_50pct.png`

### What's Working Well

- **Distinctive brand language** — Terminal motif, monospace headings, and cyan accent consistently communicate a developer tool. — Evidence: `home_desktop_above_fold.png`
- **Primary CTA prominence** — The primary "Get Started" button reads clearly as the main action and stands out. — Evidence: `nav_hover__get_started.png`
- **Effective two-column structure** — Pairing narrative left with dense right-side panels creates readable, scannable sections. — Evidence: `home_scroll_25pct.png`
- **Immediate hover affordance** — Nav hover states are quick and clear, aiding discoverability on desktop. — Evidence: `nav_hover__how_it_works.png`

### Screenshot Evidence

- Mobile nav missing → `home_mobile_above_fold.png`
- Showcase all coming-soon → `home_scroll_75pct.png`, `home_scroll_100pct.png`
- Hero dead space → `home_desktop_above_fold.png`
- Secondary CTA contrast → `home_mobile_above_fold.png`, `nav_hover__get_started.png`
- Section 3 whitespace → `home_scroll_50pct.png`
- Control panel empty bottom → `home_scroll_25pct.png`
- Compact cards incomplete → `home_scroll_75pct.png`

---

Notes: Capture evidence produced by automated Playwright run on April 25, 2026 (desktop 1440×900, mobile 390×844). Prioritize mobile nav and showcase content; after those fixes, iterate on hero vertical balance and control-card content density.
