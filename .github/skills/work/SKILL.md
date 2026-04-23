---
name: work
description: "Implement a new feature in this Next.js + Tailwind project. Use when adding a feature from a markdown spec: abstract logic, define API/data flow, audit existing code for reuse, decompose into small parts, implement, write unit tests, then update the spec with findings."
argument-hint: "Path to feature markdown spec (e.g. docs/my-feature.md)"
---

# Feature Implementation Workflow

A structured, end-to-end procedure for shipping a new feature in this Next.js + Tailwind (App Router) codebase. Follow every phase in order — do not skip ahead.

---

## Phase 1 — Read and Abstract the Feature Spec

> The spec may arrive as an attached file, inline context, a user message, or session memory. Use whatever is provided as the source of truth. **Do not open or re-read the markdown file** — that is reserved for the final update in Phase 7.

1. Internalize the feature spec from the provided context (attachment, argument, or memory).
2. Extract and restate in your own words:
   - **Goal** — the user-facing outcome in one sentence.
   - **Scope** — what is explicitly in / out of scope.
   - **Constraints** — performance, accessibility, auth, business rules.
   - **Acceptance criteria** — what "done" looks like, ideally as a checklist.
3. If anything is ambiguous, ask for clarification **before** proceeding.

---

## Phase 2 — Define the API and Data Flow

Model the feature as a data pipeline before touching any code:

```
User action
  -> UI event handler
  -> [optional] Client state update (useState / useReducer / context / store)
  -> [optional] Server Action or API Route call
       -> Input validation (zod / yup)
       -> Business logic
       -> Data layer (DB / external API)
       -> Response shape
  -> UI re-render / toast / redirect
```

Write this diagram explicitly. Include:

- **Props** flowing into new components (name, type, required/optional).
- **Server Actions or Route Handlers** (path, HTTP method, request/response shape).
- **State shape** if any client state is introduced.
- **Error paths** — what happens when each step fails.

Refer to [feature-checklist.md](./references/feature-checklist.md) for API design rules.

---

## Phase 3 — Audit Existing Code for Reuse

Search the codebase before writing anything new:

| What to look for                                       | Where to look                          |
| ------------------------------------------------------ | -------------------------------------- |
| UI primitives (Button, Input, Modal, Card…)            | `components/ui/`, `app/`               |
| Data-fetching hooks (`useQuery`, `useSWR`, custom)     | `hooks/`, `lib/`                       |
| Server utilities (auth helpers, DB client, validators) | `lib/`, `server/`                      |
| Shared types / interfaces                              | `types/`, co-located `*.types.ts`      |
| Tailwind tokens / design patterns                      | `globals.css`, `tailwind.config.*`     |
| Existing similar pages or layouts                      | `app/**/page.tsx`, `app/**/layout.tsx` |

For **every** found candidate, decide: **reuse as-is**, **extend**, or **create new**. Document the decision.

---

## Phase 4 — Decompose into Small, Flexible Parts

Split the feature into independently testable units before writing code:

1. **Pure functions** — data transforms, validators, formatters → `lib/` or co-located `*.utils.ts`.
2. **Custom hooks** — encapsulate stateful logic, side effects, data fetching → `hooks/use-*.ts`.
3. **Server Actions / Route Handlers** — one action per mutation, one route per resource.
4. **UI components** — one component per visual responsibility, smallest possible props surface.
5. **Page / layout** — composition only; no logic beyond routing and data fetching.

Name each part, state its single responsibility, and note its inputs/outputs before coding.

---

## Phase 5 — Implement

Work through the parts bottom-up (utilities → hooks → server actions → components → page):

### Coding standards (this project)

- Strict TypeScript — no `any`, use `unknown` + type guards.
- `import type` for type-only imports.
- Every exported function, component, and hook must have a JSDoc block (`@description`, `@param`, `@returns`).
- Every `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback` must have an inline comment.
- Server Components by default; add `"use client"` only when interactivity requires it.
- Tailwind utility classes only — no inline `style={}` for layout/spacing/color.
- Accessible markup: semantic HTML, `aria-*` where needed, keyboard navigable.

### Checklist per file

- [ ] JSDoc file header added.
- [ ] All exported symbols documented.
- [ ] No `any` types.
- [ ] No unused imports.
- [ ] Tailwind classes follow project token conventions.
- [ ] `"use client"` present only where needed.

---

## Phase 6 — Write Unit Tests

For every **pure function** and **custom hook** created:

1. Co-locate tests: `*.test.ts` / `*.test.tsx` next to the source file.
2. Test structure — Arrange / Act / Assert with descriptive `describe` + `it` blocks.
3. Cover:
   - **Happy path** — expected input produces expected output.
   - **Edge cases** — empty, null, boundary values.
   - **Error paths** — thrown errors, rejected promises, validation failures.
4. For hooks, use `@testing-library/react`'s `renderHook`.
5. For components, use `@testing-library/react` — query by role/label, not by class.
6. Mock external dependencies (fetch, DB, auth) at the module boundary.
7. Run the test suite; confirm all new tests pass and no existing tests regress.

---

## Phase 7 — Update the Feature Markdown

After implementation is complete, re-open the original spec markdown and append a `## Implementation Notes` section:

```markdown
## Implementation Notes

### Decisions & Deviations

- [What was done differently from the spec and why]

### Reused Components / Utilities

- `ComponentName` — [why it was reused / how it was extended]

### New Abstractions Introduced

- `lib/foo.utils.ts` — [what it does and why it was extracted]

### Known Gaps / Follow-ups

- [Anything left out of scope, tech debt incurred, or future work]

### Data Flow (actual)

[Updated diagram if it diverged from Phase 2]
```

Do **not** delete original spec content — append only.

---
