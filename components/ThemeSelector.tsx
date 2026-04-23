/**
 * @file ThemeSelector.tsx
 * @description Three-button theme selector displayed in the Navbar.
 * Allows the user to choose Light, Dark, or Auto (follow OS preference).
 * Reads and writes the active theme via ThemeContext.
 */

"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import type { Theme } from "@/types/theme";

interface ThemeButtonProps {
  /** The theme value this button represents. */
  readonly value: Theme;
  /** Accessible label for the button (e.g., "Light"). */
  readonly label: string;
  /** SVG icon element rendered inside the button. */
  readonly icon: React.ReactNode;
  /** The currently active theme, used to determine the pressed state. */
  readonly current: Theme;
  /** Callback invoked when the user clicks this button. */
  readonly onSelect: (t: Theme) => void;
}

/**
 * @description A single icon button representing one theme option.
 * Applies active styling when `value === current`.
 * @param props - {@link ThemeButtonProps}
 * @returns A `<button>` with `aria-label` and `aria-pressed` attributes.
 */
function ThemeButton({
  value,
  label,
  icon,
  current,
  onSelect,
}: ThemeButtonProps): React.JSX.Element {
  // Whether this button represents the currently selected theme.
  const isActive = value === current;

  return (
    <button
      type="button"
      aria-label={`Set theme to ${label}`}
      aria-pressed={isActive}
      onClick={() => onSelect(value)}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md text-sm transition-all duration-200",
        isActive
          ? "bg-(--accent-dim) text-accent border border-(--border-color)"
          : "text-(--text-secondary) hover:text-foreground hover:bg-(--border-subtle)",
      )}
    >
      {icon}
    </button>
  );
}

function SunIcon(): React.JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(): React.JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon(): React.JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

/**
 * @description Renders a compact row of three theme toggle buttons: Light, Dark, and Auto.
 * Wraps each in a `ThemeButton` that reflects the active state from `ThemeContext`.
 * @returns A `<div role="group">` containing the three option buttons.
 */
export default function ThemeSelector(): React.JSX.Element {
  // Active theme value and setter from the nearest ThemeProvider.
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className="flex items-center gap-0.5 rounded-lg border border-(--border-subtle) bg-surface p-0.5"
    >
      <ThemeButton
        value="light"
        label="Light"
        current={theme}
        onSelect={setTheme}
        icon={<SunIcon />}
      />
      <ThemeButton
        value="dark"
        label="Dark"
        current={theme}
        onSelect={setTheme}
        icon={<MoonIcon />}
      />
      <ThemeButton
        value="auto"
        label="Auto (system)"
        current={theme}
        onSelect={setTheme}
        icon={<MonitorIcon />}
      />
    </div>
  );
}
