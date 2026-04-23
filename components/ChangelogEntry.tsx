/**
 * @file ChangelogEntry.tsx
 * @description Renders a single version entry in the product changelog as a
 * timeline card with an accent left bar, version badge, type badge, date, and
 * a bulleted list of highlights.
 */

import type { ChangelogEntry } from "@/types/changelog";
import { cn } from "@/lib/utils";

interface ChangelogEntryCardProps {
  /** Changelog entry data to render. */
  readonly entry: ChangelogEntry;
  /** Zero-based index used to stagger the entrance animation. */
  readonly index: number;
}

/** Tailwind classes applied to the type badge depending on release type. */
const TYPE_BADGE_CLASSES: Record<ChangelogEntry["type"], string> = {
  major: "bg-rose-950 border-rose-700 text-rose-400",
  minor: "bg-(--accent-dim) border-(--border-color) text-accent",
  patch: "bg-surface border-(--border-color) text-(--text-muted)",
};

/**
 * @description Styled timeline card for a single changelog entry.
 * @param props - {@link ChangelogEntryCardProps}
 * @returns A `<article>` element with version info and highlight list.
 */
export function ChangelogEntryCard({
  entry,
  index,
}: ChangelogEntryCardProps): React.JSX.Element {
  return (
    <article
      className="animate-fade-in-up blog-card relative rounded-xl p-7 overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
      aria-label={`Release ${entry.version} — ${entry.title}`}
    >
      {/* Accent left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-accent"
        aria-hidden="true"
      />

      <div className="pl-4">
        {/* Version + type + date row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-mono text-xl font-bold text-foreground">
            {entry.version}
          </span>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-xs",
              TYPE_BADGE_CLASSES[entry.type],
            )}
          >
            {entry.type}
          </span>
          <time
            className="font-mono text-xs text-(--text-muted) ml-auto"
            dateTime={entry.date}
          >
            {entry.date}
          </time>
        </div>

        {/* Release title */}
        <h3 className="font-mono text-base font-semibold text-accent mb-4">
          {entry.title}
        </h3>

        {/* Highlights */}
        <ul className="flex flex-col gap-2" aria-label="Release highlights">
          {entry.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-(--text-secondary)"
            >
              <span
                className="shrink-0 text-accent font-mono mt-0.5"
                aria-hidden="true"
              >
                +
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
