/**
 * @file Navbar.tsx
 * @description Site-wide navigation bar rendered as a Server Component.
 * Fixed to the top of the viewport with a frosted-glass backdrop.
 * Contains the site logo, primary nav links, and the client-side ThemeSelector.
 */

import Link from "next/link";
import ThemeSelector from "@/components/ThemeSelector";

/**
 * @description Sticky top navigation bar with logo, nav links, and theme selector.
 * Rendered server-side; ThemeSelector is a client component hydrated in the browser.
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

        {/* Nav links and theme selector */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5">
            <Link
              href="/get-started"
              className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
            >
              /get-started
            </Link>
            <Link
              href="/blog"
              className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
            >
              /blog
            </Link>
            <Link
              href="/about"
              className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
            >
              /about
            </Link>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
}
