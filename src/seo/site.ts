export const SITE_ORIGIN = "https://ubicoft.github.io";
export const SITE_BASE = "/novaya-orbita";
export const SITE_NAME = "Новая Орбита";

export const PUBLIC_PATHS = [
  "/",
  "/about",
  "/directions",
  "/events",
  "/projects",
  "/members",
  "/partners",
  "/news",
  "/contacts",
  "/join",
] as const;

export function absoluteUrl(pathname: string, lang?: string): string {
  const base = `${SITE_ORIGIN}${SITE_BASE}`;
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const url = new URL(path === "/" ? `${base}/` : `${base}${path}`);
  if (lang) url.searchParams.set("lang", lang);
  return url.toString();
}

export function defaultDescription(locale: string): string {
  if (locale === "en") {
    return "Official website of New Orbit — inter-university union of student initiatives.";
  }
  if (locale === "tj") {
    return "Сомонаи расмии Орбитаи Нав — иттиҳодияи байнидонишгоҳии ташаббусҳои донишҷӯён.";
  }
  return "Официальный сайт межуниверситетского объединения студенческих инициатив «Новая Орбита».";
}
