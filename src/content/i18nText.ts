import type { Locale } from "../i18n/types";
import type { LocalizedString } from "./types";

export function loc(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.ru || value.en || value.tj || "";
}

export function formatDate(value: string, locale: Locale): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const tag = locale === "tj" ? "tg-TJ" : locale === "en" ? "en-GB" : "ru-RU";
  return d.toLocaleDateString(tag, { year: "numeric", month: "long", day: "numeric" });
}
