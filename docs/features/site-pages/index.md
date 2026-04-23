# Feature: Core Site Pages

## Summary

Add the four core pages of the oh-my-copilot tech blog — Homepage, Blog List, Blog Post, and About — along with a persistent Navbar and Footer in the root layout. A three-mode theme selector (Light / Dark / Auto) lives in the Navbar. The visual direction is **Modern, Dynamic, High-Tech**: deep navy backgrounds, electric-cyan accents, Geist Mono headings, frosted-glass navbar, grid-pattern hero, and glowing card hover effects.

## User Stories

- As a visitor, I want to land on an informative homepage that showcases recent posts, so I can quickly understand what the blog is about and find content I care about.
- As a reader, I want to browse a blog list page with a magazine-style layout, so the most important post is prominent and others are easy to scan.
- As a reader, I want to read a full blog post with nicely formatted markdown (headings, code blocks, lists), so the reading experience feels polished.
- As a curious visitor, I want an About page that explains the blog's mission and the author, so I understand who is behind it.
- As any user, I want a theme selector in the navbar that respects my system preference by default and lets me override it, so I can read comfortably in any environment.

## Acceptance Criteria

- [ ] Navbar renders on every page with logo, nav links (Blog, About), and a three-state theme toggle (Light / Dark / Auto).
- [ ] Footer renders on every page.
- [ ] Theme selector persists choice to `localStorage` and applies `data-theme` attribute to `<html>`.
- [ ] Auto mode follows `prefers-color-scheme` with no flash on page load.
- [ ] Homepage displays a hero section (placeholder tagline) and a grid of recent posts.
- [ ] Blog List page renders all posts magazine-style (large featured post + smaller grid).
- [ ] Blog Post page renders full markdown content with styled headings, paragraphs, code blocks.
- [ ] About page has both a blog intro section and a placeholder author bio.
- [ ] All pages pass TypeScript strict checks and ESLint.
- [ ] No `any` types; all exported symbols have JSDoc.

## Scope

**In scope:** Homepage, Blog List, Blog Post (from local markdown files), About page, Navbar, Footer, theme selector.  
**Out of scope:** Search, comments, authentication, admin panel, Go backend integration.

## Design Direction

- **Aesthetic**: Cyberpunk-terminal. Deep navy-black (#060d1a) backgrounds. Electric cyan (#00ccff) accent. Grid-line background texture on hero. Frosted-glass navbar.
- **Typography**: Geist Mono for all headings and UI labels — creates a code/terminal feel. Geist Sans for body copy.
- **Motion**: Staggered fade-in on page load, card lift + glow on hover, smooth theme transition.
- **Responsiveness**: Mobile-first. Single column on mobile → magazine grid on md+.
- **Dark mode**: Default to system preference. CSS custom properties handle all three states (auto / forced light / forced dark) without Tailwind `dark:` variants.

## Data Flow

```
1. Server Component (page.tsx)
   → calls lib/blog.ts (reads fs, parses gray-matter + marked)
   → receives typed BlogMeta[] or BlogPost
   → renders static HTML

2. ThemeSelector (client)
   → reads localStorage "theme" on mount
   → on change: writes localStorage, sets data-theme on document.documentElement
   → inline <script> in <head> prevents flash on initial load
```

## Routes & Components

| Path / Component               | Type             | Responsibility                                                        |
| ------------------------------ | ---------------- | --------------------------------------------------------------------- |
| `app/layout.tsx`               | Server (root)    | Wraps all pages with ThemeProvider, Navbar, Footer, anti-flash script |
| `app/page.tsx`                 | Server Component | Homepage: hero + recent posts                                         |
| `app/blog/page.tsx`            | Server Component | Blog list: magazine layout, all posts                                 |
| `app/blog/[slug]/page.tsx`     | Server Component | Single blog post: markdown rendered to HTML                           |
| `app/about/page.tsx`           | Server Component | Blog intro + author bio                                               |
| `components/Navbar.tsx`        | Server Component | Logo, nav links; embeds ThemeSelector                                 |
| `components/Footer.tsx`        | Server Component | Copyright, links                                                      |
| `components/ThemeProvider.tsx` | Client Component | Context for theme state; sets data-theme on html                      |
| `components/ThemeSelector.tsx` | Client Component | Three-button (Light/Dark/Auto) toggle                                 |
| `lib/blog.ts`                  | Server utility   | Reads markdown files, parses frontmatter + HTML                       |
| `lib/utils.ts`                 | Utility          | `cn()` class composition helper                                       |
| `types/blog.ts`                | Types            | `BlogMeta`, `BlogPost` interfaces                                     |

## Props & API Shape

```ts
// types/blog.ts
interface BlogMeta {
  slug: string;
  title: string;
  date: Date;
  dateFormatted: string;
  categories: string[];
  tags: string[];
  excerpt: string;
}

interface BlogPost extends BlogMeta {
  content: string; // rendered HTML from markdown
}

// ThemeContext
type Theme = "light" | "dark" | "auto";
interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}
```

## Edge Cases & Error States

- Empty state: if no markdown files exist, blog list shows an empty state message.
- Missing frontmatter: slug is used as title fallback; empty string for date/categories.
- Invalid slug in URL: `notFound()` called from Next.js if file doesn't exist.
- Flash of wrong theme: prevented by inline `<script>` in `<head>` that runs before hydration.
- Dark/light mode on SSR: HTML renders without `data-theme` (auto); client script sets it immediately.

## Accessibility Requirements

- Navbar logo and links have descriptive `aria-label` values.
- ThemeSelector buttons have `aria-label` and `aria-pressed` states.
- Blog post headings form a correct document outline.
- All interactive elements are keyboard-reachable.
- Color contrast meets WCAG AA in both light and dark themes.

## Open Questions

- _(resolved)_ About page: Both blog intro + placeholder author bio.
- _(resolved)_ Homepage hero: Placeholder tagline.
- _(resolved)_ Blog list layout: Magazine-style.

## Implementation Notes

### Files Created / Modified

| File                           | Action                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| `app/globals.css`              | Rewritten — full design token system, CSS animations, `.blog-card`, `.hero-grid`, `.prose-content` |
| `app/layout.tsx`               | Updated — ThemeProvider, Navbar, Footer, anti-flash script                                         |
| `app/page.tsx`                 | Rewritten — hero + recent posts grid                                                               |
| `app/blog/page.tsx`            | Created — magazine layout                                                                          |
| `app/blog/[slug]/page.tsx`     | Created — markdown post with prose styling                                                         |
| `app/about/page.tsx`           | Created — blog intro + author bio                                                                  |
| `components/ThemeProvider.tsx` | Created — client context, localStorage sync                                                        |
| `components/ThemeSelector.tsx` | Created — three-button toggle (Light/Dark/Auto)                                                    |
| `components/Navbar.tsx`        | Created — fixed, frosted-glass navbar                                                              |
| `components/Footer.tsx`        | Created — copyright + nav links                                                                    |
| `lib/blog.ts`                  | Created — server-side markdown reader using gray-matter + marked                                   |
| `lib/utils.ts`                 | Created — `cn()` helper using clsx + tailwind-merge                                                |
| `types/blog.ts`                | Created — `BlogMeta`, `BlogPost`, `Theme` types                                                    |

### Dependencies Added

- `gray-matter` — YAML frontmatter parsing
- `marked` — Markdown to HTML
- `clsx` + `tailwind-merge` — `cn()` utility

### Key Decisions

- Tailwind 4 CSS variable shorthand `text-(--var)` / `bg-(--var)` used throughout
- Theme stored in `localStorage`, applied via `data-theme` on `<html>` — no flash
- Auto mode removes the attribute, letting `@media (prefers-color-scheme: light)` handle it
- Blog content rendered server-side — no client hydration needed for prose
- `generateStaticParams` on `[slug]/page.tsx` enables SSG for all posts

### Acceptance Criteria Status

- [x] Navbar renders on every page with logo, nav links, and three-state theme toggle
- [x] Footer renders on every page
- [x] Theme selector persists to localStorage and applies `data-theme` on `<html>`
- [x] Auto mode follows `prefers-color-scheme` without flash
- [x] Homepage displays hero + recent posts grid
- [x] Blog List: magazine-style (featured + grid)
- [x] Blog Post: full markdown rendered with styled prose
- [x] About: blog intro + author bio sections
- [x] TypeScript strict checks pass (no type errors)
- [x] No `any` types; all exports have JSDoc
