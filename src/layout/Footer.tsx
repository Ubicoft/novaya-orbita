import { Link } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo/BrandLogo";
import { ALL_NAV, FORUM_URL, ROUTES, withLang, type NavKey } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";

export function Footer() {
  const { t, locale } = useLocale();
  const year = new Date().getFullYear();

  const quick = ALL_NAV.filter((key) =>
    ["about", "directions", "events", "projects", "forum", "join"].includes(key),
  );

  return (
    <footer className="site-footer">
      <div className="site-footer__panel">
        <div className="site-footer__grid">
          <div>
            <BrandLogo size="footer" />
            <p className="site-footer__brand-copy text-body-sm">
              {t.meta.shortDescription}
            </p>
          </div>

          <div>
            <h2 className="site-footer__heading">{t.footer.quickLinks}</h2>
            <nav className="site-footer__links" aria-label={t.footer.quickLinks}>
              {quick.map((key) =>
                key === "forum" ? (
                  <a key={key} className="site-footer__link" href={FORUM_URL} rel="noopener noreferrer">
                    {t.nav.forum}
                  </a>
                ) : (
                  <Link
                    key={key}
                    className="site-footer__link"
                    to={withLang(ROUTES[key as Exclude<NavKey, "forum">], locale)}
                  >
                    {t.nav[key]}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div>
            <h2 className="site-footer__heading">{t.footer.contacts}</h2>
            <p className="site-footer__note">{t.footer.contactsSoon}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {t.meta.siteName}. {t.footer.rights}.
          </p>
          <div className="site-footer__bottom-links">
            <Link to={withLang("/design-system", locale)}>{t.footer.designSystem}</Link>
            <Link to={withLang(ROUTES.contacts, locale)}>{t.nav.contacts}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
