/**
 * @file showcase.ts
 * @description Type definitions for showcase project data structures used on the
 * Showcase page and the homepage preview section.
 */

/** A single project entry in the oh-my-copilot showcase. */
export interface ShowcaseItem {
  /** Unique identifier for the project, used as a React key. */
  readonly id: string;
  /** Display name of the project. */
  readonly name: string;
  /** One-sentence description of what the project does. */
  readonly description: string;
  /** Technology stack tags (e.g. "Next.js", "Go", "Tailwind"). */
  readonly tags: readonly string[];
  /** Current deployment status. */
  readonly status: "Live" | "Coming Soon";
  /** Project URL. Use "#" for placeholder / not-yet-published projects. */
  readonly link: string;
  /** If true, render as a large featured card; otherwise render as a compact tile. */
  readonly featured: boolean;
}
