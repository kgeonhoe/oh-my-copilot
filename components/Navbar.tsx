/**
 * @file Navbar.tsx
 * @description Site-wide navigation bar rendered as a Server Component.
 * Fixed to the top of the viewport with a frosted-glass backdrop.
 * Contains the site logo and primary nav links.
 * Links: Home / Get Started / How It Works / Showcase / Changelog / About
 */

import Link from "next/link";

/**
 * @description Sticky top navigation bar with logo and nav links.
 * @returns A `<nav>` element fixed to the top of the viewport.
 */
export default function Navbar(): React.JSX.Element {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-(--border-color) bg-(--bg-glass) backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        {/* Site logo — links to homepage */}
        <Link
          href="/"
          className="flex items-center gap-1.5 font-mono transition-opacity hover:opacity-75"
          aria-label="oh-my-copilot — go to homepage"
        >
          <span className="text-accent font-bold text-lg">$</span>
          <span className="font-semibold tracking-tight text-foreground">
            oh-my-copilot
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-5">
          <Link
            href="/get-started"
            className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
          >
            /get-started
          </Link>
          <Link
            href="/how-it-works"
            className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
          >
            /how-it-works
          </Link>
          <Link
            href="/showcase"
            className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
          >
            /showcase
          </Link>
          <Link
            href="/changelog"
            className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
          >
            /changelog
          </Link>
          <Link
            href="/about"
            className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
          >
            /about
          </Link>
        </div>
      </div>
    </nav>
  );
}
