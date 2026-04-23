---
description: "Use when writing, editing, or reviewing TypeScript or TSX files in this Next.js + Tailwind project. Enforces Next.js App Router best practices and Tailwind CSS usage. See general-frontend.instructions.md for shared TypeScript/JSDoc/accessibility rules."
applyTo: "**/*.{ts,tsx}"
---

# Frontend Coding Standards — Next.js + Tailwind

## 1. Next.js App Router Conventions

- **Server Components by default.** Only add `"use client"` when you need browser APIs, event handlers, or React hooks.
- **`"use server"`** only in Server Actions (functions called from client forms or event handlers that run on the server).
- Use `next/image` (`<Image>`) for all images — never bare `<img>` tags.
- Use `next/link` (`<Link>`) for all internal navigation — never bare `<a>` tags with local paths.
- Export page metadata via the `Metadata` API (`export const metadata: Metadata = { ... }`), not with `<head>` tags.
- Co-locate `loading.tsx`, `error.tsx`, and `not-found.tsx` alongside each route segment that needs them.
- Prefer `async/await` directly in Server Components over `useEffect`-based data fetching.

## 2. Tailwind CSS Usage

- Use Tailwind utility classes for all styling. Avoid inline `style` props unless animating dynamic values that Tailwind can't express.
- Use the `cn()` helper (from `clsx` + `tailwind-merge`) for conditional or composed class names.
- Never hardcode raw color hex values in className; use the design-token aliases defined in `globals.css` / the Tailwind theme.
- Order classes semantically: layout → sizing → spacing → typography → color → border → effects → responsive/state variants.
- Prefer responsive variants (`sm:`, `md:`, `lg:`) over JS breakpoint logic.

```tsx
// Good
<button className={cn("flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background", isLoading && "opacity-50 cursor-not-allowed")}>

// Bad
<button style={{ display: "flex", backgroundColor: "#171717" }}>
```
