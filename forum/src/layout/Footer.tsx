import { Link } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo/BrandLogo";
import { SITE_URL } from "../data/categories";
import { ALL_NAV, ROUTES } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__panel">
        <div className="site-footer__grid">
          <div>
            <BrandLogo size="footer" />
            <p className="site-footer__brand-copy text-body-sm">{t.meta.shortDescription}</p>
          </div>
          <div>
            <h2 className="site-footer__heading">{t.nav.categories}</h2>
            <nav className="site-footer__links" aria-label={t.nav.categories}>
              {ALL_NAV.slice(0, 5).map((key) => (
                <Link key={key} className="site-footer__link" to={ROUTES[key]}>
                  {t.nav[key]}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2 className="site-footer__heading">{t.footer.toSite}</h2>
            <a className="site-footer__link" href={SITE_URL} rel="noreferrer">
              {t.meta.siteName}
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>
            © {year} {t.meta.forumName}. {t.footer.rights}.
          </p>
          <div className="site-footer__bottom-links">
            <Link to={ROUTES.about}>{t.nav.about}</Link>
            <a href={SITE_URL}>{t.footer.toSite}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
