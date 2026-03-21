import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number | undefined | null): string | number {
  if (value == null) return "-";
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return value;
}
