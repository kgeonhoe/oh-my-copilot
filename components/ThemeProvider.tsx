/**
 * @file ThemeProvider.tsx
 * @description Client-side theme context provider. Manages the three-state theme preference
 * (light / dark / auto) and syncs it to localStorage and the `data-theme` attribute on `<html>`.
 * The anti-flash inline script in the root layout pre-applies `data-theme` before hydration;
 * this provider keeps React state in sync with that initial value.
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Theme } from "@/types/theme";

interface ThemeContextValue {
  /** The user's active theme preference: 'light', 'dark', or 'auto' (follow system). */
  theme: Theme;
  /** Updates the theme, writes it to localStorage, and applies `data-theme` on `<html>`. */
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "auto",
  setTheme: () => undefined,
});

interface ThemeProviderProps {
  /** React tree to render inside the theme context. */
  readonly children: React.ReactNode;
}

/**
 * @description Provides theme state to the full React tree.
 * On mount, reads the stored preference from localStorage to stay in sync with the
 * anti-flash script that pre-applied the theme before hydration.
 * @param props - {@link ThemeProviderProps}
 * @returns A context provider wrapping the given children.
 */
export function ThemeProvider({
  children,
}: ThemeProviderProps): React.JSX.Element {
  // Tracks the user's chosen theme; 'auto' means defer to the OS preference.
  const [theme, setThemeState] = useState<Theme>("auto");

  // Reads the persisted theme from localStorage on first client render.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored && (["light", "dark", "auto"] as Theme[]).includes(stored)) {
        setThemeState(stored);
      }
    } catch {
      // localStorage may be unavailable in certain restricted environments.
    }
  }, []);

  /**
   * Updates the React state, persists to localStorage, and applies/removes
   * the `data-theme` attribute on `document.documentElement`.
   */
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch {
      // Silently ignore write failures.
    }
    if (t === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (t === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      // 'auto': remove the attribute and let the CSS media query take over.
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * @description Accesses the current theme preference and its setter from the nearest ThemeProvider.
 * @returns An object with `theme` (current value) and `setTheme` (updater function).
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
