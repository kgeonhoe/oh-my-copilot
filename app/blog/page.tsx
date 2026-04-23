/**
 * @file page.tsx
 * @description Blog listing page. Displays posts in a magazine-style layout:
 * one large featured post at the top, followed by a responsive card grid.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogMeta } from "@/lib/blog";
import type { BlogMeta } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All posts about JavaScript, TypeScript, React, and frontend development.",
};

interface CategoryBadgeProps {
  /** Category label to display. */
  readonly category: string;
}

/**
 * @description Small monospace badge displaying a post category.
 * @param props - {@link CategoryBadgeProps}
 * @returns A styled `<span>` element.
 */
function CategoryBadge({ category }: CategoryBadgeProps): React.JSX.Element {
  return (
    <span className="font-mono text-xs text-accent bg-(--accent-dim) border border-(--border-color) px-2 py-0.5 rounded">
      {category}
    </span>
  );
}

interface FeaturedPostProps {
  /** The most recent post to feature prominently. */
  readonly post: BlogMeta;
}

/**
 * @description Wide featured post card — the topmost entry in the magazine layout.
 * @param props - {@link FeaturedPostProps}
 * @returns A full-width card with a left accent bar, large title, and excerpt.
 */
function FeaturedPost({ post }: FeaturedPostProps): React.JSX.Element {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className="blog-card relative overflow-hidden rounded-2xl p-8 md:p-12"
        aria-label={`Featured post: ${post.title}`}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-accent"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-4 pl-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
            <span className="font-mono text-xs text-accent bg-(--accent-dim) border border-(--border-color) px-2 py-0.5 rounded uppercase tracking-wider">
              Featured
            </span>
          </div>

          <h2 className="font-mono text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight md:text-4xl">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="max-w-2xl text-base text-(--text-secondary) leading-relaxed md:text-lg">
              {post.excerpt}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between">
            <time
              className="font-mono text-sm text-(--text-muted)"
              dateTime={post.date.toISOString()}
            >
              {post.dateFormatted}
            </time>
            <span className="font-mono text-sm text-accent group-hover:underline">
              read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

interface PostCardProps {
  /** Blog post metadata for this card. */
  readonly post: BlogMeta;
  /** Zero-based grid index used to stagger the entrance animation. */
  readonly index: number;
}

/**
 * @description Standard compact post card for the grid below the featured post.
 * @param props - {@link PostCardProps}
 * @returns A card with title, category badges, excerpt, and date.
 */
function PostCard({ post, index }: PostCardProps): React.JSX.Element {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full animate-fade-in-up"
      style={{ animationDelay: `${0.2 + index * 0.08}s` }}
    >
      <article className="blog-card h-full rounded-xl p-6 flex flex-col gap-3">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
        )}

        <h3 className="flex-1 font-mono text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="line-clamp-2 text-sm text-(--text-secondary) leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <time
          className="font-mono text-xs text-(--text-muted)"
          dateTime={post.date.toISOString()}
        >
          {post.dateFormatted}
        </time>
      </article>
    </Link>
  );
}

/**
 * @description Blog listing page with magazine-style layout.
 * @returns Full blog list with featured post and remaining posts in a grid.
 */
export default function BlogPage(): React.JSX.Element {
  const posts = getAllBlogMeta();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Page header */}
      <header className="mb-12 animate-fade-in-up">
        <p className="font-mono text-xs text-accent mb-2">// posts</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          Blog
        </h1>
        <p className="mt-3 font-mono text-sm text-(--text-secondary)">
          {posts.length} post{posts.length !== 1 ? "s" : ""} — frontend,
          JavaScript, and more
        </p>
      </header>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="font-mono text-2xl text-(--text-muted)">~/blog $</p>
          <p className="mt-2 font-mono text-sm text-(--text-muted)">
            No posts yet. Check back soon.
          </p>
        </div>
      )}

      {/* Featured post */}
      {featured !== undefined && (
        <div
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Remaining posts grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
