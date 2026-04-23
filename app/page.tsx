/**
 * @file page.tsx
 * @description Homepage — hero section with a terminal-style introduction and a
 * recent posts preview grid. A Server Component that reads blog data at request time.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogMeta } from "@/lib/blog";
import type { BlogMeta } from "@/types/blog";

export const metadata: Metadata = {
  title: "oh-my-copilot",
  description: "A tech blog for frontend developers.",
};

interface PostCardProps {
  /** Blog post metadata to render in the card. */
  readonly post: BlogMeta;
  /** Zero-based card index used to stagger the entrance animation. */
  readonly index: number;
}

/**
 * @description Compact blog post card for the homepage recent posts grid.
 * @param props - {@link PostCardProps}
 * @returns A linked article card with category badge, title, excerpt, and date.
 */
function PostCard({ post, index }: PostCardProps): React.JSX.Element {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
    >
      <article className="blog-card h-full rounded-xl p-6 flex flex-col gap-3">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="font-mono text-xs text-accent bg-(--accent-dim) border border-(--border-color) px-2 py-0.5 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-mono text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="flex-1 text-sm text-(--text-secondary) leading-relaxed line-clamp-2">
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
 * @description Homepage with hero banner and a grid of the three most recent posts.
 * @returns Full homepage layout.
 */
export default function HomePage(): React.JSX.Element {
  const allPosts = getAllBlogMeta();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="hero-grid relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
        aria-label="Hero"
      >
        {/* Radial accent glow overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 50%, var(--accent-dim) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6">
          {/* Terminal prompt line */}
          <div
            className="animate-fade-in-up flex items-center gap-2 font-mono text-(--text-muted)"
            style={{ animationDelay: "0s" }}
          >
            <span className="text-accent">$</span>
            <span>copilot --mode vibe --quality production</span>
          </div>

          {/* Site name */}
          <h1
            className="animate-fade-in-up font-mono text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
            style={{ animationDelay: "0.15s" }}
          >
            oh-my-copilot
          </h1>

          {/* Slogan with blinking cursor */}
          <div
            className="animate-fade-in-up max-w-2xl"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="font-mono text-base leading-relaxed text-(--text-secondary) sm:text-lg">
              <span className="text-accent">&gt;</span> Use an enhanced Copilot
              to ship a complete website —{" "}
              <span className="text-foreground">Next.js</span> frontend,{" "}
              <span className="text-foreground">Tailwind</span> styling, and{" "}
              <span className="text-foreground">production quality</span> — all
              from a chat window.
              <span className="animate-blink text-accent ml-1">▋</span>
            </p>
          </div>

          {/* Stat badges */}
          <div
            className="animate-fade-in-up flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "100%", label: "vibes" },
              { value: "3", label: "days" },
              { value: "100+", label: "features" },
              { value: "1000+", label: "tests" },
              { value: String(allPosts.length), label: "posts" },
            ].map(({ value, label }) => (
              <span
                key={label}
                className="rounded-full border border-(--border-color) bg-(--accent-dim) px-3 py-1 font-mono text-sm text-(--text-secondary)"
              >
                <span className="text-accent">{value}</span> {label}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="animate-fade-in-up flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.5s" }}
          >
            <Link
              href="/get-started"
              className="rounded-lg bg-accent px-6 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
            >
              /get-started
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-(--border-color) px-6 py-3 font-mono text-sm text-(--text-secondary) transition-all hover:border-accent hover:text-accent"
            >
              /about
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade into page background */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(transparent, var(--bg-base))" }}
          aria-hidden="true"
        />
      </section>

      {/* ── Recent Posts ─────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div
            className="animate-fade-in-up mb-10 flex items-end justify-between"
            style={{ animationDelay: "0.4s" }}
          >
            <div>
              <p className="font-mono text-xs text-accent mb-1">// latest</p>
              <h2 className="font-mono text-2xl font-semibold text-foreground">
                Recent Posts
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-mono text-sm text-(--text-muted) transition-colors hover:text-accent"
            >
              view all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
