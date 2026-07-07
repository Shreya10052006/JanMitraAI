import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getStatusColorClass(
  color: "orange" | "green" | "blue" | "purple" | "gray"
): string {
  const colorMap = {
    orange: "text-orange-500",
    green: "text-emerald-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    gray: "text-gray-500",
  };
  return colorMap[color];
}
