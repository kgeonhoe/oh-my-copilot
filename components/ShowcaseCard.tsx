/**
 * @file ShowcaseCard.tsx
 * @description Reusable card component for displaying a showcase project.
 * Supports two variants: "featured" (large, detailed) and "compact" (small grid tile).
 * Placeholder links (href="#") are rendered without an href to prevent navigation.
 */

import type { ShowcaseItem } from "@/types/showcase";
import { cn } from "@/lib/utils";

interface ShowcaseCardProps {
  /** The showcase project data to render. */
  readonly item: ShowcaseItem;
  /** Visual variant controlling card size and detail level. */
  readonly variant?: "featured" | "compact";
}

/**
 * @description Renders a showcase project card in featured or compact format.
 * When `item.link` is `"#"`, the card renders without an href to prevent navigation.
 * @param props - {@link ShowcaseCardProps}
 * @returns A styled card element.
 */
export function ShowcaseCard({
  item,
  variant = "compact",
}: ShowcaseCardProps): React.JSX.Element {
  const isFeatured = variant === "featured";
  const isPlaceholder = item.link === "#";

  const cardClasses = cn(
    "blog-card group block rounded-xl transition-all",
    isFeatured ? "p-7" : "p-5",
    isPlaceholder ? "cursor-default" : "cursor-pointer",
  );

  const inner = (
    <div className="flex flex-col gap-3 h-full">
      {/* Header: name + status badge */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={cn(
            "font-mono font-semibold text-foreground group-hover:text-accent transition-colors",
            isFeatured ? "text-xl" : "text-base",
          )}
        >
          {item.name}
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 font-mono text-xs border",
            item.status === "Live"
              ? "bg-emerald-950 border-emerald-700 text-emerald-400"
              : "bg-(--accent-dim) border-(--border-color) text-(--text-muted)",
          )}
        >
          {item.status}
        </span>
      </div>

      {/* Description */}
      <p
        className={cn(
          "flex-1 text-(--text-secondary) leading-relaxed",
          isFeatured ? "text-sm" : "text-xs line-clamp-2",
        )}
      >
        {item.description}
      </p>

      {/* Tags — only shown on featured variant */}
      {isFeatured && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-(--border-color) bg-(--accent-dim) px-2 py-0.5 font-mono text-xs text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (isPlaceholder) {
    return (
      <div
        className={cardClasses}
        role="article"
        aria-label={`${item.name} — ${item.status}`}
      >
        {inner}
      </div>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      aria-label={`${item.name} — open project`}
    >
      {inner}
    </a>
  );
}
