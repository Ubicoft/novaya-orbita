import { Outlet } from "react-router-dom";
import { WinterAtmosphere } from "../atmosphere/WinterAtmosphere";
import { useLocale } from "../i18n/LocaleProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell() {
  const { t } = useLocale();

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">
        {t.header.skipToContent}
      </a>
      <WinterAtmosphere />
      <Header />
      <main id="main" className="page-shell__main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
