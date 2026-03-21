import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number | undefined | null): string | number {
  if (value == null) return "-";
  return new Intl.NumberFormat('en-US', { 
    notation: 'compact', 
    maximumFractionDigits: 1 
  }).format(value);
}
