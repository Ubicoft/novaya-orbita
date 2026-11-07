import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { NEWS_FORMAT_LABELS } from "../../content/labels";
import type { NewsFormat } from "../../content/types";
import { useLocale } from "../../i18n/LocaleProvider";

const FORMATS = Object.keys(NEWS_FORMAT_LABELS) as NewsFormat[];

export function NewsPage() {
  const { t, locale } = useLocale();
  const { store } = useContent();
  const [format, setFormat] = useState<"all" | NewsFormat>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = `${t.newsPage.title} · ${t.meta.siteName}`;
  }, [t, locale]);

  const items = useMemo(() => {
    return store.news
      .filter((n) => n.status === "published")
      .filter((n) => (format === "all" ? true : n.format === format))
      .filter((n) => {
        const hay = `${loc(n.title, locale)} ${loc(n.summary, locale)}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      })
      .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  }, [store.news, format, q, locale]);

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.news}</p>
          <h1 className="cat-title">{t.newsPage.title}</h1>
          <p className="cat-lead">{t.newsPage.lead}</p>
          <div className="cat-toolbar">
            <input
              className="cat-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.catalog.search}
            />
            <button
              type="button"
              className={`cat-chip${format === "all" ? " cat-chip--active" : ""}`}
              onClick={() => setFormat("all")}
            >
              {t.catalog.all}
            </button>
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                className={`cat-chip${format === f ? " cat-chip--active" : ""}`}
                onClick={() => setFormat(f)}
              >
                {NEWS_FORMAT_LABELS[f][locale]}
              </button>
            ))}
          </div>
          {items.length === 0 ? (
            <div className="cat-empty">
              <h2 className="cat-empty__title">{t.catalog.emptyTitle}</h2>
              <p className="cat-empty__body">{t.catalog.emptyBody}</p>
            </div>
          ) : (
            <div className="cat-grid">
              {items.map((item, i) => (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="cat-card"
                  style={i === 0 ? { gridColumn: "1 / -1" } : undefined}
                >
                  <div className="cat-card__cover">
                    {item.coverUrl ? <img src={item.coverUrl} alt="" /> : null}
                  </div>
                  <div className="cat-card__meta">
                    <span className="cat-badge">{NEWS_FORMAT_LABELS[item.format][locale]}</span>
                  </div>
                  <h2 className="cat-card__title">{loc(item.title, locale)}</h2>
                  <p className="cat-card__text">{loc(item.summary, locale)}</p>
                  <p className="cat-card__foot">
                    {t.catalog.publishedAt}: {formatDate(item.publishedAt, locale)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
