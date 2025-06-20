import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Option 1: Generic function (most flexible)
export function tryFixAndParse<T = unknown>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    try {
      const fixed = raw
        .replace(/[""]/g, '"') // Curly quotes → straight quotes
        .replace(/['']/g, "'") // Curly apostrophes → straight
        .replace(/,\s*([}\]])/g, "$1") // Trailing commas → remove
        .replace(/\\n/g, "\n") // Escaped \n → real newline
        .replace(/\\"/g, '"') // Escaped quotes → real quotes
        .replace(/"\s*:\s*/g, '": ') // Normalize key-value spacing
        .replace(/([^\[,])"\s*"/g, '$1","') // Fix missing commas between strings
        .replace(/"\s*([^\],])/g, '",$1') // Fix quotes not followed by comma
        .replace(/[\u0000-\u001F]+/g, "") // Remove control characters
        .replace(/^\s*```json\s*|\s*```$/g, "") // Strip ```json ... ``` blocks
        .trim();

      return JSON.parse(fixed) as T;
    } catch (innerErr) {
      console.error("Still can't parse AI output:", innerErr);
      return null;
    }
  }
}
