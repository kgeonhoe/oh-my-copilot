/**
 * @file Footer.tsx
 * @description Site-wide footer rendered as a Server Component.
 * Displays copyright, a tagline, and secondary navigation links.
 */

import Link from "next/link";

/**
 * @description Footer rendered on every page via the root layout.
 * @returns A `<footer>` element with copyright text and nav links.
 */
export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--border-color) bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-sm text-(--text-muted)">
          <span className="text-accent">©</span> {year} oh-my-copilot
          <span className="mx-2 text-(--border-color)">|</span>
          built with vibe coding
        </p>

        <nav aria-label="Footer navigation" className="flex items-center gap-6">
          <Link
            href="/"
            className="font-mono text-xs text-(--text-muted) transition-colors hover:text-accent"
          >
            ~/
          </Link>
          <Link
            href="/blog"
            className="font-mono text-xs text-(--text-muted) transition-colors hover:text-accent"
          >
            /blog
          </Link>
          <Link
            href="/about"
            className="font-mono text-xs text-(--text-muted) transition-colors hover:text-accent"
          >
            /about
          </Link>
        </nav>
      </div>
    </footer>
  );
}
