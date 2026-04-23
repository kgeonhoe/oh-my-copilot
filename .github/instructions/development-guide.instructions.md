---
description: "General agent behavior rules and universal code documentation standards for this project. Always active."
applyTo: "**"
---

# Agent Behavior Rules

1. **Ask before acting** — If requirements are ambiguous or underspecified, ask clarifying questions first. Do not assume intent.

2. **Only do what is asked** — Implement exactly what is requested. Do not add features, refactor unrelated code, add comments, or make "improvements" that were not mentioned.

3. **Self-check before implementing** — Before writing code, verify your own logic: ensure the implementation is correct, consistent, and free of obvious bugs before outputting it.

4. **Use Boss for `.github/` changes** — Any change to files inside `.github/` must be delegated to the `Boss` sub-agent. Do not modify `.github/` files directly.

5. **Use the `work` skill for app code changes** — Any change to files outside `.github/` must be implemented via the `work` skill (`.github/skills/work/SKILL.md`). Boss invokes it inline, sharing full conversation context.

---

# Universal Code Documentation Standards

These rules apply to **all languages** in this project (TypeScript, Go, etc.).

## 1. File Header

Every source file must start with a block comment describing its purpose and scope.

**TypeScript / TSX:**

```tsx
/**
 * @file UserCard.tsx
 * @description Renders a user's avatar, display name, and role badge.
 * Used in the dashboard sidebar and the team overview page.
 */
```

**Go:**

```go
// Package handler provides HTTP request handlers for the user API.
// All handlers follow the parse → validate → service → respond pipeline.
package handler
```

## 2. Function & Method Documentation

Every exported function, method, and React component must have a documentation comment.

**TypeScript — functions:**

```tsx
/**
 * @description Formats a UTC timestamp into a human-readable local date string.
 * @param timestamp - Unix timestamp in milliseconds.
 * @param locale - BCP 47 locale string (e.g. "en-US"). Defaults to the browser locale.
 * @returns Formatted date string such as "April 22, 2026".
 */
export function formatDate(timestamp: number, locale?: string): string { ... }
```

**TypeScript — React components:** document the props interface and what the component renders:

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
 * @param props - {@link UserCardProps}
 * @returns A card element with avatar, name, and role badge.
 */
export default function UserCard({ userId, displayName, role }: UserCardProps) { ... }
```

**Go — GoDoc:**

```go
// CreateUser handles POST /api/v1/users. It creates a new user account
// and returns the created user on success.
func CreateUser(c *gin.Context) { ... }
```

GoDoc format: starts with the symbol name, ends with a period.

## 3. Hook & State Documentation (TypeScript)

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

// Fetches user profile data when userId changes. Cleans up by aborting on unmount or userId change.
useEffect(() => {
  const controller = new AbortController();
  fetchUser(userId, { signal: controller.signal }).then(setUser);
  return () => controller.abort();
}, [userId]);

// Memoizes the sorted list to avoid re-sorting on every render when only unrelated state changes.
const sortedItems = useMemo(() => [...items].sort(byName), [items]);
```
