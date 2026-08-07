import type { Locale } from "./types";
import sq from "@/messages/sq.json";
import en from "@/messages/en.json";

export const locales: Locale[] = ["sq", "en"];
export const defaultLocale: Locale = "sq";

const dictionaries = { sq, en } as const;

export type Dictionary = typeof sq;

export function isLocale(value: string): value is Locale {
  return value === "sq" || value === "en";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localePath(locale: Locale, hash = ""): string {
  const base = locale === "sq" ? "/" : "/en";
  return hash ? `${base}${hash}` : base;
}

export function switchLocalePath(current: Locale, hash = ""): string {
  return localePath(current === "sq" ? "en" : "sq", hash);
}
