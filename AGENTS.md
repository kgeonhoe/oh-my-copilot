# oh-my-copilot — Agent Guidelines

Open-source tech blog for frontend developers, built with vibe coding. Features email auth, a threaded comment system, and an admin panel.

## Monorepo Layout

```
oh-my-copilot/
├── app/                   # Next.js App Router pages & layouts
├── components/            # Shared React components (shadcn/ui wrappers + custom)
├── lib/                   # Frontend utilities, API client, auth helpers
├── server/                # Go backend (REST API)
│   ├── cmd/               # Entry points (main.go)
│   ├── internal/          # Business logic, handlers, middleware
│   └── ...
├── docs/
│   ├── blogs/             # Markdown source files for blog posts
│   └── features/          # Feature specs written during development
└── .github/               # Agent customization files (instructions, prompts, skills)
```

> `pnpm` manages the frontend workspace. The Go backend is a separate module inside `server/`.

## Commands

### Frontend (Next.js)

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint
```

### Backend (Go)

```bash
cd server
go run ./cmd/...  # Start API server
go test ./...     # Run all tests
go build ./cmd/... # Build binary
```

## Architecture

### Data Flow

```
Browser → Next.js (App Router) → Go REST API → PostgreSQL
```

- Next.js **Server Components** fetch data directly from the Go API at build/request time.
- **Client Components** use the API client in `lib/api/` for interactive features (comments, auth forms).
- The Go backend is the single source of truth — Next.js has no database access.

### Authentication

- Email + password. JWT issued by Go backend, stored in `httpOnly` cookies.
- Auth state is read server-side via cookie in Next.js Server Components / Route Handlers.
- Protected routes: `/admin/**` (admin role required), `/api/**` (varies per route).

### Blog Content

- Blog posts are **Markdown files** stored in `docs/blogs/`.
- The Go backend reads and serves parsed blog content (metadata + HTML) via REST.
- Admin can publish (add file + trigger re-index) or delete (remove file) blogs.

### Comment System

- **Two-level nesting only** ("楼中楼"): top-level comments + one level of replies. No infinite nesting.
- All comment mutations require authentication.
- Admin can delete any comment.

## Frontend Conventions

See [.github/instructions/frontend-coding.instructions.md](.github/instructions/frontend-coding.instructions.md) for the full coding standard. Key rules:

- **Server Components by default** — add `"use client"` only for interactivity or browser APIs.
- **shadcn/ui** for all base UI components. Install with `pnpm dlx shadcn@latest add <component>`.
- **`cn()`** from `lib/utils.ts` for all conditional Tailwind classes.
- **`import type`** for type-only imports. No `any` — use `unknown`.
- Every exported file, component, hook, and function needs JSDoc (`@file`, `@description`, `@param`, `@returns`).

## Backend Conventions (Go)

- Standard Go project layout: `cmd/` for binaries, `internal/` for all app code.
- REST JSON API. Use `net/http` standard library or Chi router (keep dependencies minimal).
- Middleware chain: CORS → Rate limit → Auth (JWT) → Handler.
- Return consistent error envelopes: `{ "error": "message" }` with appropriate HTTP status codes.
- All database access through a repository layer (`internal/repository/`). No raw SQL in handlers.

## Key Files

| File                                      | Purpose                                   |
| ----------------------------------------- | ----------------------------------------- |
| `app/layout.tsx`                          | Root layout, fonts, global providers      |
| `app/globals.css`                         | Tailwind 4 import + CSS custom properties |
| `docs/blogs/*.md`                         | Blog post source files                    |
| `.github/prompts/add-feature.prompt.md`   | Workflow for implementing new features    |
| `.github/skills/work/SKILL.md`            | Step-by-step feature implementation skill |
| `.github/skills/frontend-design/SKILL.md` | UI design quality guidelines              |

## Development Notes

- **shadcn/ui not yet installed** — run `pnpm dlx shadcn@latest init` before adding components.
- **Go backend not yet scaffolded** — start with `go mod init` inside `server/`.
- When adding a new feature, follow the workflow in `.github/prompts/add-feature.prompt.md`.
- Blog markdown files already exist in `docs/blogs/` — use them as real content during development.
