# oh-my-copilot

A production-ready Next.js starter template with a structured multi-agent GitHub Copilot workflow. Drop it into any project to get a consistent AI-assisted development loop — planning, implementation, testing, and adversarial review — all driven by specialized agents and skill files.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) · React 19 · TypeScript 5 |
| Styling | Tailwind CSS v4 · Shadcn/ui |
| Testing | Playwright |
| Package manager | pnpm |

## Agent System

The `.github/agents/` and `.github/skills/` directories define a team of AI agents and reusable skills:

| Agent / Skill | Role |
|---|---|
| **Boss** | Orchestrates feature work — creates branches, delegates to skills, manages PRs |
| **Tester** | Writes and runs unit tests and Playwright E2E acceptance tests |
| **Objector** | Adversarial reviewer — checks design quality, UX, SEO, security, and performance |
| **Teacher** | Explains code and concepts from first principles using Feynman's method |
| **`work` skill** | Full-stack feature implementation (spec → types → API → components → page) |
| **`frontend-design` skill** | Produces distinctive, production-grade UI — avoids generic AI aesthetics |
| **`generate-unit-test` skill** | Generates unit tests for new features |
| **`git-commit` skill** | Stages changes and generates Conventional Commits messages |
| **`theme-factory` skill** | Applies or generates visual themes for artifacts |
| **`webapp-testing` skill** | Captures Playwright screenshots and interaction evidence for feature review |

## Quick Start

```bash
# 1. Install dependencies
pnpm i

# 2. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Bootstrap a new project

Open GitHub Copilot Chat, select the **Boss** agent, and run the `init-project` prompt with a short description of your project:

```
@Boss /init-project My project name — one-line purpose, tech stack hints
```

Boss will update `AGENTS.md`, implement the first feature, and start the dev server.

## Project Structure

```
.
├── app/                        # Next.js App Router routes
│   ├── layout.tsx              # Root layout (fonts, global CSS)
│   └── page.tsx                # Home page
├── .github/
│   ├── agents/                 # Agent instruction files (Boss, Tester, Objector, Teacher)
│   ├── instructions/           # Coding standards auto-injected into Copilot context
│   │   ├── nextjs-tailwind.instructions.md
│   │   ├── general-frontend.instructions.md
│   │   ├── go-gin.instructions.md
│   │   └── ...
│   ├── prompts/                # Reusable Copilot prompt files
│   │   └── init-project.prompt.md
│   └── skills/                 # Reusable skill modules invoked by agents
│       ├── work/
│       ├── frontend-design/
│       ├── generate-unit-test/
│       └── ...
├── AGENTS.md                   # Project constraints shared across all agents
├── tests/                      # Playwright test suites
└── package.json
```

## Coding Standards

All coding standards live in `.github/instructions/` and are automatically applied by Copilot:

- **Next.js + Tailwind** — App Router conventions, Tailwind utility classes, Shadcn/ui patterns
- **TypeScript** — strict types, JSDoc headers on every file, no `any`
- **Go + Gin** — handler/service separation, GoDoc comments, consistent JSON error format
- **Accessibility** — WCAG AA contrast, semantic HTML, visible focus rings

## Available Scripts

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```
