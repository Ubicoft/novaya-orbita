import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container/Container";
import { ROUTES, type NavKey } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";

export function StubPage({ page }: { page: NavKey }) {
  const { t, locale } = useLocale();
  const meta = t.pages[page];

  useEffect(() => {
    document.title = `${meta.title} · ${t.meta.siteName}`;
  }, [meta.title, t.meta.siteName, locale]);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__panel">
          <p className="text-caption page-hero__eyebrow">{t.nav[page]}</p>
          <h1 className="text-h1 page-hero__title">{meta.title}</h1>
          <p className="text-body-lg page-hero__lead">{meta.description}</p>
        </div>
      </section>

      <section className="page-content">
        <Container width="wide">
          <div className="stub-panel">
            <p className="text-caption stub-panel__eyebrow">{t.stub.eyebrow}</p>
            <h2 className="text-h3 stub-panel__title">{t.stub.title}</h2>
            <p className="text-body stub-panel__body">{t.stub.body}</p>
            {page !== "home" ? (
              <Link to={ROUTES.home} className="shell-btn shell-btn--on-light">
                {t.stub.backHome}
              </Link>
            ) : (
              <Link to={ROUTES.join} className="shell-btn shell-btn--primary ui-idle ui-idle--cta">
                {t.nav.join}
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
