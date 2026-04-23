/**
 * @file changelog.ts
 * @description Type definitions for changelog entry data structures used in the
 * product changelog page and changelog data file.
 */

/** A single version entry in the oh-my-copilot changelog. */
export interface ChangelogEntry {
  /** Semantic version string, e.g. "v0.1.0". */
  readonly version: string;
  /** ISO 8601 date string, e.g. "2026-04-23". */
  readonly date: string;
  /** Short title summarising this release. */
  readonly title: string;
  /** Bullet-point list of notable changes or improvements in this release. */
  readonly highlights: readonly string[];
  /** Release type: major (breaking/large), minor (features), patch (fixes). */
  readonly type: "major" | "minor" | "patch";
}
