---
description: "Use when writing, editing, or reviewing any TypeScript or TSX files. Enforces JSDoc documentation on files/functions/hooks/components, strict TypeScript, accessibility, and consistent component structure."
applyTo: "**/*.{ts,tsx}"
---

# General Frontend Coding Standards

## 1. File Description

Every file must start with a JSDoc block describing its purpose, scope, and any important notes.

```tsx
/**
 * @file UserCard.tsx
 * @description Renders a user's avatar, display name, and role badge.
 * Used in the dashboard sidebar and the team overview page.
 */
```

## 2. Function & Component Documentation

Every exported function and React component must have a JSDoc comment covering:

- `@description` — what it does
- `@param` — each parameter with its type and meaning
- `@returns` — what is returned (or rendered for components)

```tsx
/**
 * @description Formats a UTC timestamp into a human-readable local date string.
 * @param timestamp - Unix timestamp in milliseconds.
 * @param locale - BCP 47 locale string (e.g. "en-US"). Defaults to the browser locale.
 * @returns Formatted date string such as "April 22, 2026".
 */
function formatDate(timestamp: number, locale?: string): string { ... }
```

For React components, document the props type and what the component renders:

```tsx
interface UserCardProps {
  /** The user's unique identifier. */
  userId: string;
  /** Display name shown below the avatar. */
  displayName: string;
  /** Optional role label rendered as a badge. */
  role?: "admin" | "member" | "viewer";
}

/**
 * @description Displays a user's avatar, name, and optional role badge.
 * Used in the dashboard sidebar and team overview page.
 * @param props - {@link UserCardProps}
 * @returns A card element with avatar, name, and role badge.
 */
export default function UserCard({ userId, displayName, role }: UserCardProps) { ... }
```

## 3. Hook Documentation

Every call to `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext`, and custom hooks must have an inline comment explaining:

- **useState**: what the state represents and its initial value rationale
- **useEffect**: what the effect does, when it runs, and what it cleans up (if applicable)
- **useMemo / useCallback**: what is memoized and why
- **useRef**: what the ref tracks

```tsx
// Tracks whether the dropdown menu is open. Starts closed.
const [isOpen, setIsOpen] = useState<boolean>(false);

// Tracks the input element to manage focus programmatically.
const inputRef = useRef<HTMLInputElement>(null);

// Fetches user profile data when userId changes. Cleans up by aborting the request on unmount or userId change.
useEffect(() => {
  const controller = new AbortController();
  fetchUser(userId, { signal: controller.signal }).then(setUser);
  return () => controller.abort();
}, [userId]);

// Memoizes the sorted list to avoid re-sorting on every render when only unrelated state changes.
const sortedItems = useMemo(() => [...items].sort(byName), [items]);
```

## 4. Strict TypeScript

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

## 5. Accessibility

- Every interactive element must have an accessible label (`aria-label`, `aria-labelledby`, or visible text).
- Images must have meaningful `alt` text; decorative images use `alt=""`.
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`) rather than `<div>` with click handlers.
- Ensure keyboard navigability: interactive elements must be reachable via Tab and operable via Enter/Space.

## 6. Component Structure Order

Keep the internals of a component in this order for consistency:

1. Type/interface definitions (above the component)
2. Component function signature + JSDoc
3. Hook calls (state, refs, context, custom hooks)
4. Derived values and memoized data
5. Event handlers and callbacks
6. Early returns (loading / error states)
7. Main JSX return

## 7. Exports

- **Pages and layouts**: use `default export`.
- **All other components, hooks, and utilities**: use **named exports** to support tree-shaking and easier refactoring.
- Never re-export everything with `export * from` unless creating a deliberate barrel file with a clear purpose.
