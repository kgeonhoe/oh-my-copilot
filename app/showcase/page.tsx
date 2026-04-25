/**
 * @file page.tsx
 * @description Showcase page — displays all projects built with oh-my-copilot.
 * Featured items render as large detailed cards; the remaining items render as
 * a compact grid. All data is sourced from the static lib/showcase.ts file.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ShowcaseCard } from "@/components/ShowcaseCard";
import { FEATURED_SHOWCASE, COMPACT_SHOWCASE } from "@/lib/showcase";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Real products built with oh-my-copilot — from SaaS platforms to developer tools, all shipped with a team of specialised agents.",
};

/**
 * @description Showcase page listing all featured and compact projects.
 * @returns Full showcase page layout.
 */
export default function ShowcasePage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* ── Page header ─────────────────────────────────── */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">{"// built.with"}</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          Showcase
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
          Products built end-to-end using oh-my-copilot agents. From idea to
          deployed — without a dedicated engineering team.
        </p>
      </header>

      {/* ── Featured Projects ────────────────────────────── */}
      <section className="mb-16" aria-labelledby="featured-heading">
        <div
          className="animate-fade-in-up mb-8"
          style={{ animationDelay: "0.05s" }}
        >
          <p className="mb-1 font-mono text-xs text-accent">{"// featured"}</p>
          <h2
            id="featured-heading"
            className="font-mono text-xl font-semibold text-foreground"
          >
            Featured Projects
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SHOWCASE.map((item, i) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <ShowcaseCard item={item} variant="featured" />
            </div>
          ))}
        </div>
      </section>

      {/* ── More Projects ────────────────────────────────── */}
      <section aria-labelledby="more-heading">
        <div
          className="animate-fade-in-up mb-8"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="mb-1 font-mono text-xs text-accent">{"// more"}</p>
          <h2
            id="more-heading"
            className="font-mono text-xl font-semibold text-foreground"
          >
            More Projects
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPACT_SHOWCASE.map((item, i) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.35 + i * 0.07}s` }}
            >
              <ShowcaseCard item={item} variant="compact" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div
        className="animate-fade-in-up mt-20 text-center"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="font-mono text-sm text-(--text-muted) mb-4">
          Built something with oh-my-copilot?
        </p>
        <Link
          href="/get-started"
          className="inline-block rounded-lg bg-accent px-7 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
        >
          Start Building →
        </Link>
      </div>
    </div>
  );
}
