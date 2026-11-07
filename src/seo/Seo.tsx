import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleProvider";
import { absoluteUrl, defaultDescription, SITE_NAME } from "./site";

type SeoProps = {
  title?: string;
  description?: string;
  noindex?: boolean;
  ogImage?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    }
    document.head.appendChild(el);
  }
  el.href = href;
}

export function Seo({ title, description, noindex = false, ogImage }: SeoProps) {
  const { locale, t } = useLocale();
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = title || `${t.meta.siteName} · ${t.meta.shortDescription}`;
    const desc = description || t.meta.shortDescription || defaultDescription(locale);
    const canonical = absoluteUrl(pathname, locale);
    const image = ogImage || absoluteUrl("/favicon.svg");

    document.title = pageTitle;
    document.documentElement.lang = locale === "tj" ? "tg" : locale;

    upsertMeta("name", "description", desc);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:locale", locale === "tj" ? "tg_TJ" : locale === "en" ? "en_GB" : "ru_RU");
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", desc);

    upsertLink("canonical", canonical);
    upsertLink("alternate", absoluteUrl(pathname, "ru"), { hreflang: "ru" });
    upsertLink("alternate", absoluteUrl(pathname, "tj"), { hreflang: "tg" });
    upsertLink("alternate", absoluteUrl(pathname, "en"), { hreflang: "en" });
    upsertLink("alternate", absoluteUrl(pathname, "ru"), { hreflang: "x-default" });
  }, [title, description, noindex, ogImage, locale, pathname, t]);

  return null;
}
