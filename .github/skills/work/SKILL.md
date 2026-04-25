---
name: work
description: "Implement a new feature in this Next.js + Tailwind project. Use when adding a feature from a markdown spec: abstract logic, define API/data flow, audit existing code for reuse, decompose into small parts, implement, write unit tests, then update the spec with findings."
argument-hint: "Path to feature spec (e.g. features/my-feature/index.md)"
---

# Feature Implementation Workflow

You are the full-stack engineer in the current conversation, responsible for turning a spec document into clean, runnable code. You run in the Boss's context, **sharing the complete conversation history**, so you don't need to re-understand the background through the spec.

Tech Stack: **Next.js 15 App Router + Tailwind + Shadcn/ui** (Frontend) + **Go + Gin** (Backend, if applicable).

---

## Step 1 — Confirm Branch

Confirm that you are on the `main` branch (Boss's Scenario 1 process should have completed branch switching, usually ready):

```bash
git branch --show-current
```

---

## Phase 0 — Reconnaissance

Read the following files to understand the current situation (use the existing context in the conversation to skip known content):

1. Spec document (`features/<name>/index.md`)
2. `AGENTS.md` — Project constraints
3. `.github/instructions/nextjs-tailwind.instructions.md` — Frontend standards
4. `.github/instructions/general-frontend.instructions.md` — TypeScript standards
5. `.github/instructions/go-gin.instructions.md` — Backend standards (if applicable)
6. `app/` directory structure — Existing routes
7. `components/`, `lib/`, `types/` — Reusable modules
8. `server/` — Existing backend code (if applicable)
9. `package.json` — Available dependencies

For each candidate module found, determine whether to: **Reuse directly**, **Extend**, or **Create new**.

---

## Phase 1 — Deconstruct Implementation Plan

Break the spec down into independent, testable implementation units, arranged in the following order:

```
Pure Functions / Utilities
  → Type Definitions
  → Backend API (Gin Handler + Route Registration)
  → Frontend Data Layer (Server Actions / fetch utils)
  → Custom Hooks
  → UI Components (from leaf to container)
  → Pages (Page / Layout)
```

**List the path and responsibility of each file before you start writing code.**

---

## Phase 2 — Implementation

Implement bottom-up according to Phase 1's order, **do not skip steps**.

### Frontend Standards

- Follow `.github/instructions/nextjs-tailwind.instructions.md`
- Follow `.github/instructions/general-frontend.instructions.md` (JSDoc standards in development-guide are always active)
- Load and follow frontend design principles in `.github/skills/frontend-design/SKILL.md`
- Prioritize Shadcn/ui components (`npx shadcn@latest add <component>` if not installed)
- Server Component first, only add `"use client"` when browser API or hooks are needed
- All images use `next/image`, all internal links use `next/link`
- Styles use Tailwind utilities + `cn()`, no inline style

### Backend Standards

- Follow `.github/instructions/go-gin.instructions.md`
- Handlers only parse requests + call Services + return responses. Business logic goes to the Service layer
- All Handlers must have error handling and return a cohesive JSON error format
- New routes are registered in the routing files, not scattered in main.go

### General Standards

- Every file has a JSDoc / GoDoc file header
- No `any` type (TypeScript), no abuse of `interface{}` (Go)
- Only implement what the spec describes, do not add extra features

### Checklist per file

- [ ] JSDoc / GoDoc file header
- [ ] All exported symbols have documentation comments
- [ ] No `any` type
- [ ] No unnecessary imports
- [ ] Tailwind class names follow project token conventions
- [ ] `"use client"` only appears when necessary

---

## Phase 3 — Update Spec Document

After implementation is complete, append an `## Implementation Notes` section at the end of the spec document (`features/<name>/index.md`):

```markdown
## Implementation Notes

### Decisions & Deviations

- [Differences from the spec and reasons]

### Reused Components / Utilities

- `ComponentName` — [Why reuse / How to extend]

### New Abstractions Introduced

- `lib/foo.ts` — [What it does, why abstract]

### Known Gaps / Follow-ups

- [Out-of-scope content, technical debt, follow-up work]
```

**Append, do not delete existing content.**

---

## Phase 4 — Implementation Report

Return a structured report to the Boss:

```
## Implementation Report

### Added / Modified / Deleted Files
- `path/to/file.tsx` — [Responsibility description]
- `server/handler/xxx.go` — [Responsibility description]

### Key Decisions
- [Non-obvious technical choices + reasons]

### Known Limitations
- [Unimplemented edge cases, or ambiguous areas in the spec]
```
