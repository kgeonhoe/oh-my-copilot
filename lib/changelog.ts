/**
 * @file changelog.ts
 * @description Static changelog data for oh-my-copilot releases.
 * Entries are ordered newest-first. This is the single source of truth for the
 * /changelog page; add new entries here when cutting a release.
 */

import type { ChangelogEntry } from "@/types/changelog";

/** All changelog entries, newest first. */
export const CHANGELOG: readonly ChangelogEntry[] = [
  {
    version: "v0.3.0",
    date: "2026-04-23",
    title: "Agent System Matured",
    highlights: [
      "Added Tester agent with E2E test generation via the webapp-testing Playwright skill",
      "Added Objector agent for critical adversarial review (security, performance, SEO)",
      "Added deploy skill covering multi-stage Dockerfile and hardened Nginx configuration",
      "Refined Boss routing logic for ambiguous or mixed-intent requests",
      "Improved Worker backend coverage: go-gin instructions now include repository layer patterns",
    ],
    type: "minor",
  },
  {
    version: "v0.2.0",
    date: "2026-04-10",
    title: "Full-Stack Coverage",
    highlights: [
      "Added go-gin.instructions.md — Go + Gin handler, service, and route conventions",
      "Added docker.instructions.md — multi-stage build hardening and Nginx security rules",
      "Worker agent now generates Go handlers, service layers, and repository code",
      "Added less-css.instructions.md for stylesheet naming and specificity conventions",
      "Added frontend-design skill — high-quality UI generation with distinctive aesthetics",
    ],
    type: "minor",
  },
  {
    version: "v0.1.0",
    date: "2026-03-28",
    title: "Initial Release",
    highlights: [
      "Boss, Worker, and Teacher agents — the core trio for any development task",
      "git-commit skill for automated Conventional Commits message generation",
      "Baseline instruction set: development-guide, nextjs-tailwind, general-frontend",
      "Site redesign feature spec and monorepo layout established",
      "Open-sourced under MIT license — fork it and make it yours",
    ],
    type: "minor",
  },
];
