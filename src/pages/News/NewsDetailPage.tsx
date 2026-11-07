import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { NEWS_FORMAT_LABELS } from "../../content/labels";
import { useLocale } from "../../i18n/LocaleProvider";
import { Seo } from "../../seo/Seo";

export function NewsDetailPage() {
  const { slug = "" } = useParams();
  const { t, locale } = useLocale();
  const { store } = useContent();
  const item = store.news.find((n) => n.slug === slug && n.status === "published");


  if (!item) {
    return (
      <div className="cat cat-detail">
        <Container width="wide">
          <Seo title={`${t.catalog.notFoundTitle} · ${t.meta.siteName}`} noindex />
          <Link to="/news" className="cat-detail__back">
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
        <Seo title={`${loc(item.title, locale)} · ${t.meta.siteName}`} description={loc(item.summary, locale) || t.meta.shortDescription} />
      <Link to="/news" className="cat-detail__back">
          {t.catalog.back}
        </Link>
        <span className="cat-badge">{NEWS_FORMAT_LABELS[item.format][locale]}</span>
        <h1 className="cat-detail__title">{loc(item.title, locale)}</h1>
        <p className="cat-card__foot">
          {t.catalog.publishedAt}: {formatDate(item.publishedAt, locale)}
        </p>
        <p className="cat-detail__lead">{loc(item.summary, locale)}</p>
        {item.coverUrl ? (
          <div className="cat-detail__cover">
            <img src={item.coverUrl} alt="" loading="lazy" decoding="async" />
          </div>
        ) : null}
        <div className="cat-detail__block">
          <p>{loc(item.body, locale)}</p>
        </div>
        {item.videoUrl ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.media}</h2>
            <p>
              <a href={item.videoUrl} target="_blank" rel="noreferrer">
                {item.videoUrl}
              </a>
            </p>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
