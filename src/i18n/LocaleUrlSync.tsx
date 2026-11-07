import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isLocale } from "./index";
import { useLocale } from "./LocaleProvider";

/**
 * Keeps `?lang=` in sync with LocaleProvider inside the router.
 * URL wins when it changes (back/forward, shared links); locale wins on setLocale.
 */
export function LocaleUrlSync() {
  const { locale, setLocale } = useLocale();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const lastWritten = useRef<string | null>(null);

  const paramLang = params.get("lang");

  useEffect(() => {
    if (isLocale(paramLang) && paramLang !== locale) {
      lastWritten.current = paramLang;
      setLocale(paramLang);
    }
  }, [paramLang, locale, setLocale]);

  useEffect(() => {
    if (paramLang === locale) {
      lastWritten.current = locale;
      return;
    }
    if (lastWritten.current === locale && paramLang === locale) return;

    const next = new URLSearchParams(location.search);
    next.set("lang", locale);
    const search = next.toString();
    lastWritten.current = locale;
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : "", hash: location.hash },
      { replace: true },
    );
  }, [locale, location.pathname, location.hash, location.search, navigate, paramLang]);

  return null;
}
