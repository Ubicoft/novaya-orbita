import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { tj } from "./locales/tj";
import type { Dictionary, Locale, NavKey } from "./types";

export type { Dictionary, Locale, NavKey };

export const LOCALES: Locale[] = ["ru", "tj", "en"];
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_STORAGE_KEY = "novaya-orbita.locale";

export const dictionaries: Record<Locale, Dictionary> = {
  ru,
  tj,
  en,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "tj" || value === "en";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Primary nav always visible on wide desktop; rest go to "More" when compact. */
export const PRIMARY_NAV: NavKey[] = [
  "home",
  "about",
  "directions",
  "events",
  "projects",
];

export const SECONDARY_NAV: NavKey[] = [
  "members",
  "partners",
  "news",
  "contacts",
];

export const ALL_NAV: NavKey[] = [
  ...PRIMARY_NAV,
  ...SECONDARY_NAV,
  "join",
];

export const ROUTES: Record<NavKey, string> = {
  home: "/",
  about: "/about",
  directions: "/directions",
  events: "/events",
  projects: "/projects",
  members: "/members",
  partners: "/partners",
  news: "/news",
  contacts: "/contacts",
  join: "/join",
};
