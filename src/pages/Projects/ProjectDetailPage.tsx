import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { PROJECT_DIRECTION_LABELS, PROJECT_STATUS_LABELS } from "../../content/labels";
import { useLocale } from "../../i18n/LocaleProvider";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { t, locale } = useLocale();
  const { store } = useContent();
  const item = store.projects.find((p) => p.slug === slug && p.published);

  useEffect(() => {
    document.title = item
      ? `${loc(item.title, locale)} · ${t.meta.siteName}`
      : `${t.catalog.notFoundTitle} · ${t.meta.siteName}`;
  }, [item, locale, t]);

  if (!item) {
    return (
      <div className="cat cat-detail">
        <Container width="wide">
          <Link to="/projects" className="cat-detail__back">
            {t.catalog.back}
          </Link>
          <h1 className="cat-detail__title">{t.catalog.notFoundTitle}</h1>
          <p className="cat-detail__lead">{t.catalog.notFoundBody}</p>
        </Container>
      </div>
    );
  }

  const blocks = [
    { title: t.catalog.idea, text: loc(item.idea, locale) },
    { title: t.catalog.problem, text: loc(item.problem, locale) },
    { title: t.catalog.goals, text: loc(item.goals, locale) },
    { title: t.catalog.workAreas, text: loc(item.workAreas, locale) },
    { title: t.catalog.stages, text: loc(item.stages, locale) },
    { title: t.catalog.team, text: loc(item.team, locale) },
    { title: t.catalog.results, text: loc(item.results, locale) },
    { title: t.catalog.joinProject, text: loc(item.joinInfo, locale) },
  ].filter((b) => b.text.trim());

  return (
    <div className="cat cat-detail">
      <Container width="wide">
        <Link to="/projects" className="cat-detail__back">
          {t.catalog.back}
        </Link>
        <div className="cat-card__meta">
          <span className="cat-badge">{PROJECT_DIRECTION_LABELS[item.direction][locale]}</span>
          <span className="cat-badge cat-badge--muted">{PROJECT_STATUS_LABELS[item.status][locale]}</span>
        </div>
        <h1 className="cat-detail__title">{loc(item.title, locale)}</h1>
        <p className="cat-detail__lead">{loc(item.summary, locale)}</p>
        {item.launchDate ? (
          <p className="cat-card__foot">
            {t.catalog.launch}: {formatDate(item.launchDate, locale)}
          </p>
        ) : null}
        {item.progress > 0 ? (
          <div className="cat-progress" aria-label={t.catalog.progress}>
            <span style={{ width: `${Math.min(100, item.progress)}%` }} />
          </div>
        ) : null}
        <div className="cat-detail__cover">
          {item.coverUrl ? <img src={item.coverUrl} alt="" /> : null}
        </div>
        {blocks.map((b) => (
          <div key={b.title} className="cat-detail__block">
            <h2>{b.title}</h2>
            <p>{b.text}</p>
          </div>
        ))}
      </Container>
    </div>
  );
}
