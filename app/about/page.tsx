/**
 * @file page.tsx
 * @description About page — introduces the oh-my-copilot blog's mission and
 * provides a placeholder author bio section.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About oh-my-copilot — a tech blog for frontend developers, and the person behind it.",
};

/**
 * @description About page with two sections: blog intro and author bio.
 * @returns Full about page layout.
 */
export default function AboutPage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      {/* Page header */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">// whoami</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          About
        </h1>
      </header>

      {/* ── Blog intro ─────────────────────────────────── */}
      <section
        className="animate-fade-in-up mb-8"
        style={{ animationDelay: "0.1s" }}
        aria-labelledby="about-blog-heading"
      >
        <div className="blog-card relative overflow-hidden rounded-2xl p-8 md:p-12">
          {/* Accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-accent"
            aria-hidden="true"
          />

          <div className="pl-4">
            <h2
              id="about-blog-heading"
              className="mb-6 font-mono text-2xl font-semibold text-foreground"
            >
              The Blog
            </h2>

            <div className="flex flex-col gap-4 leading-relaxed text-(--text-secondary)">
              <p>
                <span className="font-mono text-accent">oh-my-copilot</span> is
                a tech blog for frontend developers. It covers JavaScript,
                TypeScript, React, and the modern web platform — the things that
                actually matter when shipping real products.
              </p>
              <p>
                This project was built with{" "}
                <em className="font-mono not-italic text-foreground">
                  vibe coding
                </em>{" "}
                — a workflow where humans and AI pair-program in real time. The
                idea: move fast, ship quality, learn openly.
              </p>
              <p>
                Every post is a genuine exploration — things that confused me,
                patterns I discovered, tools I found useful. No SEO padding, no
                filler. Just the good stuff.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "CSS",
                "Tooling",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-(--border-color) bg-(--accent-dim) px-3 py-1 font-mono text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Author bio ─────────────────────────────────── */}
      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
        aria-labelledby="about-author-heading"
      >
        <div className="blog-card rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Avatar placeholder */}
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-(--border-color) bg-surface font-mono text-2xl text-accent md:h-32 md:w-32"
              aria-hidden="true"
            >
              &gt;_
            </div>

            <div className="flex flex-col gap-4">
              <h2
                id="about-author-heading"
                className="font-mono text-2xl font-semibold text-foreground"
              >
                The Author
              </h2>

              <div className="flex flex-col gap-3 leading-relaxed text-(--text-secondary)">
                <p>
                  <span className="font-mono text-accent">
                    {"// placeholder"}
                  </span>{" "}
                  — Author bio coming soon.
                </p>
                <p>
                  Frontend developer, tinkerer, and occasional over-engineer.
                  Interested in the craft of building interfaces that feel right
                  — responsive, fast, accessible, and a little beautiful.
                </p>
                <p>
                  When not writing code, probably reading about it. Or reading
                  about reading about it.
                </p>
              </div>

              <div className="mt-2">
                <Link
                  href="/blog"
                  className="font-mono text-sm text-accent transition-colors hover:underline"
                >
                  Read the Blog →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
