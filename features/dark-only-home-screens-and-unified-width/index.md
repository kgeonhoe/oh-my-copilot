# Feature: Dark-Only Theme, Separated Home Screens, Unified Page Width

## Goal and Background

Align the site UI with three clear presentation requirements:

1. Remove theme switching and keep dark mode as the only theme.
2. On the homepage, make screen transitions separated by section (screen-by-screen) instead of continuous long-page scrolling.
3. Ensure every page uses the same content width standard as the showcase page.

## Acceptance Criteria

- [ ] Theme toggle control is removed from the navbar.
- [ ] Theme provider logic and light/auto theme switching behavior are removed.
- [ ] Site always renders in dark mode (no light mode state).
- [ ] Homepage transitions between major sections in separated screens (snap-like section changes), not free continuous scrolling across mixed-height content.
- [ ] Homepage sections use consistent viewport-aware section sizing.
- [ ] All main route pages use `mx-auto w-full max-w-6xl px-6` for primary content container width.
- [ ] Existing route content and copy remain functionally unchanged outside these requested UI behavior updates.

## Scope (In / Out of scope)

In scope:

- Remove theme toggle UI and related runtime theme switching state.
- Enforce dark-only tokens and runtime attributes.
- Add homepage section transition behavior for separated screen changes.
- Standardize page container widths to showcase width.

Out of scope:

- Rewriting page content/copy.
- New backend/API work.
- New route creation.
- Large visual redesign beyond the three requested adjustments.

## Data Flow

No backend or API changes. This is static UI behavior and layout consistency work.

## Routing & Component Planning

Planned files to modify:

- `app/layout.tsx`
  - Remove theme provider wrapper and anti-flash script for light/auto toggling.
  - Keep global shell behavior while enforcing dark-only markup.
- `components/Navbar.tsx`
  - Remove `ThemeSelector` import and rendered toggle area.
  - Keep nav links and structure intact.
- `components/ThemeProvider.tsx`
  - Delete (if no longer referenced).
- `components/ThemeSelector.tsx`
  - Delete (if no longer referenced).
- `types/theme.ts`
  - Delete (if no longer referenced).
- `app/globals.css`
  - Remove light/auto theme token branches and retain a single dark token source.
  - Add homepage screen transition utility classes (scroll-snap behavior).
- `app/page.tsx`
  - Convert section wrappers to separated screen transitions with snap semantics.
  - Keep content structure and CTAs intact.
  - Ensure section container width aligns to `max-w-6xl` baseline.
- `app/about/page.tsx`
  - Update top-level container to `max-w-6xl`.
- `app/changelog/page.tsx`
  - Update top-level container to `max-w-6xl`.
- `app/get-started/page.tsx`
  - Update top-level container to `max-w-6xl`.
- `app/how-it-works/page.tsx`
  - Update top-level container to `max-w-6xl`.

## API Design (if backend is involved)

Not applicable.

## Edge Cases & Error States

- Ensure dark mode is applied during first paint without relying on localStorage theme preference.
- Preserve mobile usability for snap sections (avoid trapping content that exceeds viewport height).
- Ensure navbar fixed offset does not hide top content when using section snapping.

## Open Questions

- None.

## Implementation Notes

### Decisions & Deviations

- Homepage section transitions were implemented with CSS scroll snapping on the homepage content container (`snap-y snap-mandatory`) and viewport-aware section heights (`min-h-[calc(100vh-4rem)]`) to create separated screen changes.
- Dark-only behavior was implemented by removing runtime theme switching state and forcing `data-theme="dark"` at the root layout.
- Global CSS now keeps a single token source in `:root`; light/auto branches were removed.

### Reused Components / Utilities

- `components/Navbar.tsx` — reused existing navigation structure and removed only theme toggle integration.
- `app/page.tsx` — reused existing four-section content and CTA structure; only layout/sizing and section transition behavior changed.

### New Abstractions Introduced

- None.

### Known Gaps / Follow-ups

- Mobile navigation still shows only the site logo (existing behavior from before these changes); if desired, a dedicated mobile menu can be added in a separate feature.
