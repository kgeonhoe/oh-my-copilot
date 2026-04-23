# Feature Implementation Checklist

Reference sheet for Phase 2–5 of the `work` skill. Consult this during API design and implementation.

---

## API Design Rules (Next.js App Router)

### Server Actions

- Define in `app/actions/` or co-located `actions.ts` — always mark `"use server"`.
- One action = one mutation. Do not combine reads and writes.
- Validate all inputs with a schema (zod preferred) before any business logic.
- Return a discriminated union: `{ success: true; data: T } | { success: false; error: string }`.
- Never expose internal error messages to the client — log internally, return generic user-facing message.

### Route Handlers

- Use only when you need non-HTML responses (JSON API, file downloads, webhooks).
- Prefer Server Actions for form submissions and mutations triggered from client components.
- Always set appropriate `Content-Type` and status codes.
- Validate request body / query params at the handler boundary.

### Data Flow Contract

Before coding, write out:

```ts
// Input
type FeatureInput = { ... };

// Output (success)
type FeatureResult = { ... };

// Error
type FeatureError = { code: string; message: string };
```

---

## State Management Decision Tree

```
Is this state only needed in one component?
  -> Yes: useState
Is this state shared between 2-3 closely related components?
  -> Yes: lift state up / props
Is this state needed across a subtree (e.g. a wizard, modal, panel)?
  -> Yes: React context (useContext + provider)
Is this server state (fetched data, mutations)?
  -> Yes: Server Component + server actions, or SWR/React Query if client-side polling needed
Is this global UI state (sidebar open, theme, user session)?
  -> Yes: existing global store or context — check lib/ and app/
```

---

## Component Decomposition Rules

| Signal                                 | Action                                     |
| -------------------------------------- | ------------------------------------------ |
| Component > ~150 lines                 | Split out sub-components                   |
| Repeated JSX pattern (≥ 2 occurrences) | Extract component                          |
| Inline data transform in JSX           | Extract to util function                   |
| `useEffect` with > 1 responsibility    | Split into separate effects or custom hook |
| Prop drilling > 2 levels deep          | Introduce context or restructure           |

---

## Tailwind Usage Rules

- Use design tokens from `globals.css` / `tailwind.config.*` — do not hardcode hex values.
- Use `cn()` (or `clsx`) for conditional class merging — never template-literal class strings.
- Responsive prefix order: mobile-first → `sm:` → `md:` → `lg:` → `xl:`.
- Dark mode: use `dark:` variants, not JS theme toggling.
- Avoid `!important` overrides (`!` prefix) except as a last resort.

---

## Accessibility Checklist

- [ ] Interactive elements are `<button>`, `<a>`, or have `role` + `tabIndex`.
- [ ] Images have meaningful `alt` text (or `alt=""` for decorative).
- [ ] Form inputs are associated with `<label>` via `htmlFor` / `id` or `aria-label`.
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI components).
- [ ] Focus ring is visible and not suppressed globally.
- [ ] Modal / dialog traps focus and restores it on close.
- [ ] Announced state changes use `aria-live` where screen readers need to react.

---

## Performance Rules

- Prefer Server Components — only add `"use client"` when you need browser APIs, event handlers, or local state.
- Images: use `next/image` with explicit `width`/`height` or `fill`.
- Fonts: use `next/font` — never load fonts from external CDNs in `<head>`.
- Dynamic imports (`next/dynamic`) for heavy client components (charts, editors, maps).
- Memoize expensive pure computations with `useMemo`; memoize stable callbacks with `useCallback` only when passed as props to memoized children.
- Avoid `useEffect` for data that can be fetched in a Server Component.

---

## File & Folder Conventions (App Router)

```
app/
  (group)/                  # Route group (no URL segment)
  feature-name/
    page.tsx                # Server Component — layout + data fetching only
    layout.tsx              # Persistent shell for nested routes
    loading.tsx             # Suspense skeleton
    error.tsx               # Error boundary ("use client")
    actions.ts              # Server Actions ("use server")
    components/             # Feature-local components
    hooks/                  # Feature-local hooks
components/
  ui/                       # Shared primitives (Button, Input, Modal…)
  [feature]/                # Shared feature components
hooks/                      # Global custom hooks
lib/                        # Pure utilities, validators, DB client, external SDKs
types/                      # Shared TypeScript types and interfaces
```

---

## Test Quality Checklist

- [ ] Tests describe behavior, not implementation (`it("shows error when email is invalid")` not `it("sets error state")`).
- [ ] No snapshot tests for logic — only for intentional visual regression checks.
- [ ] All async operations are awaited; no floating promises.
- [ ] Mocks are reset between tests (`beforeEach` / `afterEach`).
- [ ] Test file mirrors source file path: `lib/foo.ts` → `lib/foo.test.ts`.
