import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { EVENT_CATEGORY_LABELS, EVENT_STATUS_LABELS } from "../../content/labels";
import { useLocale } from "../../i18n/LocaleProvider";

export function EventDetailPage() {
  const { slug = "" } = useParams();
  const { t, locale } = useLocale();
  const { store } = useContent();
  const item = store.events.find((e) => e.slug === slug && e.published);

  useEffect(() => {
    document.title = item
      ? `${loc(item.title, locale)} · ${t.meta.siteName}`
      : `${t.catalog.notFoundTitle} · ${t.meta.siteName}`;
  }, [item, locale, t]);

  if (!item) {
    return (
      <div className="cat cat-detail">
        <Container width="wide">
          <Link to="/events" className="cat-detail__back">
            {t.catalog.back}
          </Link>
          <h1 className="cat-detail__title">{t.catalog.notFoundTitle}</h1>
          <p className="cat-detail__lead">{t.catalog.notFoundBody}</p>
        </Container>
      </div>
    );
  }

  const blocks = [
    { title: t.catalog.goals, text: loc(item.goals, locale) },
    { title: t.catalog.program, text: loc(item.program, locale) },
    { title: t.catalog.organizers, text: loc(item.organizers, locale) },
    { title: t.catalog.participation, text: loc(item.participation, locale) },
    { title: t.catalog.results, text: loc(item.results, locale) },
  ].filter((b) => b.text.trim());

  return (
    <div className="cat cat-detail">
      <Container width="wide">
        <Link to="/events" className="cat-detail__back">
          {t.catalog.back}
        </Link>
        <div className="cat-card__meta">
          <span className="cat-badge">{EVENT_CATEGORY_LABELS[item.category][locale]}</span>
          <span className="cat-badge cat-badge--muted">{EVENT_STATUS_LABELS[item.status][locale]}</span>
        </div>
        <h1 className="cat-detail__title">{loc(item.title, locale)}</h1>
        <p className="cat-detail__lead">{loc(item.summary, locale)}</p>
        <p className="cat-card__foot">
          {t.catalog.date}: {formatDate(item.startDate, locale)}
          {item.endDate ? ` — ${formatDate(item.endDate, locale)}` : ""}
          {loc(item.location, locale) ? ` · ${t.catalog.place}: ${loc(item.location, locale)}` : ""}
        </p>
        <div className="cat-detail__cover">
          {item.coverUrl ? <img src={item.coverUrl} alt="" /> : null}
        </div>
        {loc(item.body, locale) ? (
          <div className="cat-detail__block">
            <p>{loc(item.body, locale)}</p>
          </div>
        ) : null}
        {blocks.map((b) => (
          <div key={b.title} className="cat-detail__block">
            <h2>{b.title}</h2>
            <p>{b.text}</p>
          </div>
        ))}
        {item.mediaUrls.length > 0 ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.media}</h2>
            <ul>
              {item.mediaUrls.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
