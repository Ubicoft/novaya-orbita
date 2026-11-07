import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { EVENT_CATEGORY_LABELS, EVENT_STATUS_LABELS } from "../../content/labels";
import type { EventCategory, EventStatus } from "../../content/types";
import { useLocale } from "../../i18n/LocaleProvider";

const CATEGORIES = Object.keys(EVENT_CATEGORY_LABELS) as EventCategory[];
const STATUSES = Object.keys(EVENT_STATUS_LABELS) as EventStatus[];

export function EventsPage() {
  const { t, locale } = useLocale();
  const { store } = useContent();
  const [category, setCategory] = useState<"all" | EventCategory>("all");
  const [status, setStatus] = useState<"all" | EventStatus>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = `${t.eventsPage.title} · ${t.meta.siteName}`;
  }, [t, locale]);

  const items = useMemo(() => {
    return store.events
      .filter((e) => e.published)
      .filter((e) => (category === "all" ? true : e.category === category))
      .filter((e) => (status === "all" ? true : e.status === status))
      .filter((e) => {
        const hay = `${loc(e.title, locale)} ${loc(e.summary, locale)}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      })
      .sort((a, b) => (b.startDate || "").localeCompare(a.startDate || ""));
  }, [store.events, category, status, q, locale]);

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.events}</p>
          <h1 className="cat-title">{t.eventsPage.title}</h1>
          <p className="cat-lead">{t.eventsPage.lead}</p>

          <div className="cat-toolbar" aria-label={t.catalog.filters}>
            <input
              className="cat-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.catalog.search}
              aria-label={t.catalog.search}
            />
            <button
              type="button"
              className={`cat-chip${category === "all" ? " cat-chip--active" : ""}`}
              onClick={() => setCategory("all")}
            >
              {t.catalog.all}
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`cat-chip${category === c ? " cat-chip--active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {EVENT_CATEGORY_LABELS[c][locale]}
              </button>
            ))}
          </div>
          <div className="cat-toolbar">
            {(["all", ...STATUSES] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={`cat-chip${status === s ? " cat-chip--active" : ""}`}
                onClick={() => setStatus(s)}
              >
                {s === "all" ? t.catalog.status : EVENT_STATUS_LABELS[s][locale]}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="cat-empty">
              <h2 className="cat-empty__title">{t.catalog.emptyTitle}</h2>
              <p className="cat-empty__body">{t.catalog.emptyBody}</p>
            </div>
          ) : (
            <div className="cat-grid cat-grid--3">
              {items.map((item) => (
                <Link key={item.id} to={`/events/${item.slug}`} className="cat-card" data-cursor="pointer">
                  <div className="cat-card__cover">
                    {item.coverUrl ? <img src={item.coverUrl} alt="" /> : null}
                  </div>
                  <div className="cat-card__meta">
                    <span className="cat-badge">{EVENT_CATEGORY_LABELS[item.category][locale]}</span>
                    <span className="cat-badge cat-badge--muted">
                      {EVENT_STATUS_LABELS[item.status][locale]}
                    </span>
                  </div>
                  <h2 className="cat-card__title">{loc(item.title, locale)}</h2>
                  <p className="cat-card__text">{loc(item.summary, locale)}</p>
                  <p className="cat-card__foot">
                    {formatDate(item.startDate, locale)}
                    {loc(item.location, locale) ? ` · ${loc(item.location, locale)}` : ""}
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
