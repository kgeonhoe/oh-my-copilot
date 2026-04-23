---
description: "Use when writing, editing, or reviewing any TypeScript or TSX files. Enforces strict TypeScript, accessibility, and consistent component structure. Documentation standards (file headers, JSDoc, hook comments) are in development-guide.instructions.md."
applyTo: "**/*.{ts,tsx}"
---

# General Frontend Coding Standards

## 1. Strict TypeScript

- Enable and respect all strict compiler flags (`strict: true` in tsconfig).
- **Never use `any`**. Use `unknown` and narrow with type guards instead.
- Use `import type` for type-only imports.
- Prefer `interface` for public component props and data shapes; use `type` for unions, intersections, and utility types.
- Always type function return values explicitly on exported functions.
- Avoid non-null assertions (`!`); use optional chaining (`?.`) and nullish coalescing (`??`) instead.
- Use `readonly` for props and data that must not be mutated.

```tsx
// Good
import type { Metadata } from "next";
interface ButtonProps { readonly label: string; onClick: () => void; }

// Bad
const data: any = await fetch(...);
```

## 2. Accessibility

- Every interactive element must have an accessible label (`aria-label`, `aria-labelledby`, or visible text).
- Images must have meaningful `alt` text; decorative images use `alt=""`.
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`) rather than `<div>` with click handlers.
- Ensure keyboard navigability: interactive elements must be reachable via Tab and operable via Enter/Space.

## 3. Component Structure Order

Keep the internals of a component in this order for consistency:

1. Type/interface definitions (above the component)
2. Component function signature + JSDoc
3. Hook calls (state, refs, context, custom hooks)
4. Derived values and memoized data
5. Event handlers and callbacks
6. Early returns (loading / error states)
7. Main JSX return

## 4. Exports

- **Pages and layouts**: use `default export`.
- **All other components, hooks, and utilities**: use **named exports** to support tree-shaking and easier refactoring.
- Never re-export everything with `export * from` unless creating a deliberate barrel file with a clear purpose.
