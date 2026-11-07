import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { loc } from "../../content/i18nText";
import { PARTNER_CATEGORY_LABELS } from "../../content/labels";
import { useLocale } from "../../i18n/LocaleProvider";

export function PartnerDetailPage() {
  const { slug = "" } = useParams();
  const { t, locale } = useLocale();
  const { store } = useContent();
  const item = store.partners.find((p) => p.slug === slug && p.published);

  useEffect(() => {
    document.title = item
      ? `${loc(item.name, locale)} · ${t.meta.siteName}`
      : `${t.catalog.notFoundTitle} · ${t.meta.siteName}`;
  }, [item, locale, t]);

  if (!item) {
    return (
      <div className="cat cat-detail">
        <Container width="wide">
          <Link to="/partners" className="cat-detail__back">
            {t.catalog.back}
          </Link>
          <h1 className="cat-detail__title">{t.catalog.notFoundTitle}</h1>
          <p className="cat-detail__lead">{t.catalog.notFoundBody}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="cat cat-detail">
      <Container width="wide">
        <Link to="/partners" className="cat-detail__back">
          {t.catalog.back}
        </Link>
        <span className="cat-badge">{PARTNER_CATEGORY_LABELS[item.category][locale]}</span>
        <h1 className="cat-detail__title">{loc(item.name, locale)}</h1>
        <p className="cat-detail__lead">{loc(item.description, locale)}</p>
        {item.logoUrl ? (
          <div className="cat-detail__cover" style={{ aspectRatio: "16 / 7", maxWidth: "36rem" }}>
            <img src={item.logoUrl} alt="" />
          </div>
        ) : null}
        {loc(item.cooperation, locale) ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.cooperation}</h2>
            <p>{loc(item.cooperation, locale)}</p>
          </div>
        ) : null}
        {item.website ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.website}</h2>
            <p>
              <a href={item.website} target="_blank" rel="noreferrer">
                {item.website}
              </a>
            </p>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
