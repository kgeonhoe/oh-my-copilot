/**
 * @file utils.ts
 * @description Shared utility functions for the oh-my-copilot frontend.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description Merges Tailwind CSS class names with conflict resolution.
 * Combines `clsx` conditional class composition with `tailwind-merge` deduplication
 * so that later classes correctly override conflicting earlier ones.
 * @param inputs - Any number of class values: strings, arrays, objects, or falsy values.
 * @returns A single deduplicated, merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
