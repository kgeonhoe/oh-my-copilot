/**
 * @file blog.ts
 * @description Server-side utilities for reading and parsing blog posts from the local filesystem.
 * All functions in this file run exclusively on the server — never in the browser.
 * Blog posts are Markdown files in `docs/blogs/` with YAML frontmatter.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogMeta, BlogPost } from "@/types/blog";

/** Absolute path to the directory containing blog markdown files. */
const BLOGS_DIR = path.join(process.cwd(), "docs", "blogs");

/**
 * @description Strips the `.md` extension from a filename to produce a URL slug.
 * @param filename - Markdown filename, e.g. `"My-Post.md"`.
 * @returns Slug string without the extension, e.g. `"My-Post"`.
 */
function toSlug(filename: string): string {
  return filename.replace(/\.md$/, "");
}

/**
 * @description Returns all `.md` filenames from the blogs directory.
 * Returns an empty array if the directory does not exist.
 * @returns Array of markdown filenames.
 */
function getBlogFilenames(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));
}

/**
 * @description Reads and parses the frontmatter and excerpt for a single blog post.
 * Does not render the markdown body — use `getBlogPost` for full content.
 * @param slug - URL slug matching a markdown filename (without `.md`).
 * @returns Parsed `BlogMeta` object.
 */
function parseBlogMeta(slug: string): BlogMeta {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  const rawDate = data.date ? new Date(data.date as string) : new Date(0);
  const dateFormatted =
    rawDate.getTime() > 0
      ? rawDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  // Extract the first non-empty, non-heading line as the post excerpt
  const excerpt =
    content
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l.length > 0 && !l.startsWith("#") && !l.startsWith("```"))
      ?.replace(/[*_`[\]]/g, "")
      .slice(0, 160) ?? "";

  return {
    slug,
    title: typeof data.title === "string" && data.title ? data.title : slug,
    date: rawDate,
    dateFormatted,
    categories: Array.isArray(data.categories)
      ? (data.categories as string[])
      : [],
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    excerpt,
  };
}

/**
 * @description Returns metadata for all blog posts, sorted newest-first.
 * @returns Array of `BlogMeta` objects ordered by publication date descending.
 */
export function getAllBlogMeta(): BlogMeta[] {
  return getBlogFilenames()
    .map((filename) => parseBlogMeta(toSlug(filename)))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * @description Returns the slug for every blog post. Used for static param generation.
 * @returns Array of slug strings.
 */
export function getAllSlugs(): string[] {
  return getBlogFilenames().map((f) => toSlug(f));
}

/**
 * @description Reads, parses, and renders a single blog post to HTML.
 * @param slug - URL slug matching a markdown filename (without `.md`).
 * @returns A `BlogPost` with rendered HTML content, or `null` if the file does not exist.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(source);

  // marked.parse returns string | Promise<string>; await handles both cases
  const html = await marked.parse(content);
  const meta = parseBlogMeta(slug);

  return { ...meta, content: html };
}
