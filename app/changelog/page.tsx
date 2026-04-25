/**
 * @file page.tsx
 * @description Changelog page — displays the oh-my-copilot release history as a
 * vertical timeline of version entries. Data is sourced from lib/changelog.ts.
 */

import type { Metadata } from "next";
import { ChangelogEntryCard } from "@/components/ChangelogEntry";
import { CHANGELOG } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "oh-my-copilot release history — every version, every improvement, tracked in one place.",
};

/**
 * @description Changelog page listing all releases newest-first as timeline cards.
 * @returns Full changelog page layout.
 */
export default function ChangelogPage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* ── Page header ─────────────────────────────────── */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">{"// git.log"}</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          Changelog
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
          Every release, every improvement. Newest first.
        </p>
      </header>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section aria-label="Release history">
        <div className="flex flex-col gap-6">
          {CHANGELOG.map((entry, i) => (
            <ChangelogEntryCard key={entry.version} entry={entry} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
