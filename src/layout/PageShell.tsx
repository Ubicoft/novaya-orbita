import { Outlet, useLocation } from "react-router-dom";
import { WinterAtmosphere } from "../atmosphere/WinterAtmosphere";
import type { NavKey } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";
import { Seo } from "../seo/Seo";
import { Footer } from "./Footer";
import { Header } from "./Header";

const PATH_TO_NAV: Record<string, NavKey> = {
  "/": "home",
  "/about": "about",
  "/directions": "directions",
  "/events": "events",
  "/projects": "projects",
  "/members": "members",
  "/partners": "partners",
  "/news": "news",
  "/contacts": "contacts",
  "/join": "join",
};

export function PageShell() {
  const { t } = useLocale();
  const { pathname } = useLocation();
  const key = PATH_TO_NAV[pathname];
  const title = key
    ? key === "home"
      ? `${t.meta.siteName} · ${t.meta.shortDescription}`
      : `${t.pages[key].title} · ${t.meta.siteName}`
    : `${t.meta.siteName}`;
  const description = key ? t.pages[key].description : t.meta.shortDescription;

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">
        {t.header.skipToContent}
      </a>
      <Seo title={title} description={description} />
      <WinterAtmosphere />
      <Header />
      <main id="main" className="page-shell__main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
