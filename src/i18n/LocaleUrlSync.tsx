import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isLocale } from "./index";
import { useLocale } from "./LocaleProvider";

/**
 * Keeps `?lang=` in sync with LocaleProvider inside the router.
 *
 * - External URL `lang` changes (back/forward, shared links) → setLocale.
 * - UI `setLocale` → replace `?lang=` (flagged so URL→locale ignores that update).
 * - Route change that drops `lang` → repair from current locale.
 * Never let both directions fight in the same turn (that caused RU↔EN flicker).
 */
export function LocaleUrlSync() {
  const { locale, setLocale } = useLocale();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const paramLang = params.get("lang");

  const localeRef = useRef(locale);
  localeRef.current = locale;

  const prevLocale = useRef(locale);
  /** After we write the query, skip one URL→locale reconciliation. */
  const ignoreNextParam = useRef(false);

  // URL → locale
  useEffect(() => {
    if (ignoreNextParam.current) {
      ignoreNextParam.current = false;
      return;
    }
    if (isLocale(paramLang) && paramLang !== localeRef.current) {
      setLocale(paramLang);
    }
  }, [paramLang, setLocale]);

  // Locale → URL + repair missing lang
  useEffect(() => {
    const localeChanged = prevLocale.current !== locale;
    prevLocale.current = locale;

    if (paramLang === locale) return;

    // Inbound/back-forward: URL has another valid lang and locale has not
    // changed this turn — let the URL→locale effect apply it. Do not overwrite.
    if (!localeChanged && isLocale(paramLang) && paramLang !== locale) {
      return;
    }

    const next = new URLSearchParams(location.search);
    next.set("lang", locale);
    const search = `?${next.toString()}`;

    ignoreNextParam.current = true;
    navigate(
      { pathname: location.pathname, search, hash: location.hash },
      { replace: true },
    );
  }, [locale, paramLang, location.pathname, location.hash, location.search, navigate]);

  return null;
}
