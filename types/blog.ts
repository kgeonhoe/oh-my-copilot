/**
 * @file blog.ts
 * @description Type definitions for blog post data structures used across the app.
 */

/** Metadata extracted from a blog post's frontmatter and filename. */
export interface BlogMeta {
  /** URL-safe slug derived from the markdown filename (without .md). */
  readonly slug: string;
  /** Post title from frontmatter; falls back to the slug if missing. */
  readonly title: string;
  /** Parsed publication date. */
  readonly date: Date;
  /** Human-readable formatted date string (e.g., "January 26, 2025"). */
  readonly dateFormatted: string;
  /** Category labels from frontmatter. */
  readonly categories: readonly string[];
  /** Tag labels from frontmatter. */
  readonly tags: readonly string[];
  /** First ~160 characters of post body text, used as a preview excerpt. */
  readonly excerpt: string;
}

/** A full blog post including the rendered HTML body. */
export interface BlogPost extends BlogMeta {
  /** HTML string rendered from the markdown body via `marked`. */
  readonly content: string;
}

/** Theme preference value stored in localStorage and applied via `data-theme` on `<html>`. */
export type Theme = "light" | "dark" | "auto";
