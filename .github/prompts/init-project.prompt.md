---
name: init-project
description: "Bootstrap a new project: verify environment, install deps, init AGENTS.md, add first feature, and launch dev server."
agent: agent
argument-hint: "Brief introduction about the project (name, purpose, tech stack)"
---

You are bootstrapping a new project. Follow every step below in order. If any step fails, stop immediately and report the failure with the exact error before proceeding.

## Project Brief

$input

---

## Step 1 — Check Node.js

Run `node --version`. If the command fails or Node.js is not installed, install Node.js (LTS) before continuing.

## Step 2 — Install pnpm globally

Run `npm i -g pnpm`. Confirm `pnpm --version` succeeds before proceeding.

## Step 3 — Install dependencies

Run `pnpm i` in the project root. If the command fails, report the error and stop.

## Step 4 — Verify agent context

Check whether you are running inside the **Boss** agent. If you are not, stop here and tell the user:

> "Please run this prompt inside the **Boss** agent (select Boss in the agent dropdown in VS Code Copilot Chat)."

Do not continue past this step unless you are Boss.

## Step 5 — Initialise the project

Use the project brief from `$input` to update `AGENTS.md` at the workspace root. The file should document:

- Project name and one-line purpose
- Tech stack
- Key conventions or constraints the AI agents must follow

If an `init` skill exists at `.github/skills/init/SKILL.md`, load and execute it. Otherwise perform the initialisation yourself by writing the updated `AGENTS.md` directly.

## Step 6 — Add the first feature

Follow the **Boss** agent workflow defined in `.github/agents/Boss.agent.md` to plan and implement the first feature derived from the project brief (Scenario 1 — Business Changes).

## Step 7 — Launch dev server and notify user

Start the development server (typically `pnpm dev`) and remind the user to open the browser to view the result. Provide the local URL (usually `http://localhost:3000`).
