import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isValidTimestamp(timestamp: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{2}$/;
  if (!regex.test(timestamp)) return false;

  const date = new Date(timestamp);
  return date.toString() !== "Invalid Date";
}
