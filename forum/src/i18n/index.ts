import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { tj } from "./locales/tj";
import type { Dictionary, ForumNavKey, Locale } from "./types";

export type { Dictionary, ForumNavKey, Locale } from "./types";

export const LOCALES: Locale[] = ["ru", "tj", "en"];
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_STORAGE_KEY = "novaya-orbita.locale";

const DICTS: Record<Locale, Dictionary> = { ru, tj, en };

export function isLocale(value: unknown): value is Locale {
  return value === "ru" || value === "tj" || value === "en";
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale];
}

export const PRIMARY_NAV: ForumNavKey[] = ["home", "categories", "recent", "popular"];
export const SECONDARY_NAV: ForumNavKey[] = ["qa", "members", "about"];
export const ALL_NAV: ForumNavKey[] = [...PRIMARY_NAV, ...SECONDARY_NAV];

export const ROUTES: Record<ForumNavKey, string> = {
  home: "/",
  categories: "/categories",
  recent: "/recent",
  popular: "/popular",
  qa: "/qa",
  members: "/members",
  about: "/about",
};
