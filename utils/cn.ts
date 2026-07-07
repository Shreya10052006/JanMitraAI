/**
 * utils/cn.ts
 *
 * Shared utility functions used across all components.
 * Provides class merging, date formatting, and status color helpers.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 * Uses clsx for conditional classes and tailwind-merge to deduplicate.
 *
 * @param inputs - Any number of class values (strings, objects, arrays)
 * @returns A single merged class string with conflicts resolved
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-6")
 * // → "py-2 bg-blue-500 px-6" (px-4 overridden by px-6)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO date string into a human-readable Indian locale date.
 *
 * @param dateStr - ISO 8601 date string (e.g., "2026-07-07T09:00:00Z")
 * @returns Formatted date string (e.g., "7 Jul 2026")
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Maps a semantic color name to its corresponding Tailwind text color class.
 * Used for consistent status badge coloring across complaint and activity lists.
 *
 * @param color - Semantic color name
 * @returns Tailwind CSS text color class string
 */
export function getStatusColorClass(
  color: "orange" | "green" | "blue" | "purple" | "gray"
): string {
  const colorMap: Record<typeof color, string> = {
    orange: "text-orange-500",
    green: "text-emerald-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    gray: "text-gray-500",
  };
  return colorMap[color];
}
