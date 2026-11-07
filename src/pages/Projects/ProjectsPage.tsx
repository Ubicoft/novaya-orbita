import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { PROJECT_DIRECTION_LABELS, PROJECT_STATUS_LABELS } from "../../content/labels";
import type { ProjectDirection, ProjectStatus } from "../../content/types";
import { useLocale } from "../../i18n/LocaleProvider";

const DIRECTIONS = Object.keys(PROJECT_DIRECTION_LABELS) as ProjectDirection[];
const STATUSES = Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[];

export function ProjectsPage() {
  const { t, locale } = useLocale();
  const { store } = useContent();
  const [direction, setDirection] = useState<"all" | ProjectDirection>("all");
  const [status, setStatus] = useState<"all" | ProjectStatus>("all");
  const [q, setQ] = useState("");


  const items = useMemo(() => {
    return store.projects
      .filter((p) => p.published)
      .filter((p) => (direction === "all" ? true : p.direction === direction))
      .filter((p) => (status === "all" ? true : p.status === status))
      .filter((p) => {
        const hay = `${loc(p.title, locale)} ${loc(p.summary, locale)}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      })
      .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  }, [store.projects, direction, status, q, locale]);

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.projects}</p>
          <h1 className="cat-title">{t.projectsPage.title}</h1>
          <p className="cat-lead">{t.projectsPage.lead}</p>

          <div className="cat-toolbar">
            <input
              className="cat-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.catalog.search}
            />
            <button
              type="button"
              className={`cat-chip${direction === "all" ? " cat-chip--active" : ""}`}
              onClick={() => setDirection("all")}
            >
              {t.catalog.all}
            </button>
            {DIRECTIONS.map((d) => (
              <button
                key={d}
                type="button"
                className={`cat-chip${direction === d ? " cat-chip--active" : ""}`}
                onClick={() => setDirection(d)}
              >
                {PROJECT_DIRECTION_LABELS[d][locale]}
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
                {s === "all" ? t.catalog.status : PROJECT_STATUS_LABELS[s][locale]}
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
                  to={`/projects/${item.slug}`}
                  className="cat-card"
                  style={i % 3 === 0 ? { gridColumn: "1 / -1" } : undefined}
                  data-cursor="pointer"
                >
                  <div className="cat-card__cover">
                    {item.coverUrl ? <img src={item.coverUrl} alt="" loading="lazy" decoding="async" /> : null}
                  </div>
                  <div className="cat-card__meta">
                    <span className="cat-badge">{PROJECT_DIRECTION_LABELS[item.direction][locale]}</span>
                    <span className="cat-badge cat-badge--muted">
                      {PROJECT_STATUS_LABELS[item.status][locale]}
                    </span>
                  </div>
                  <h2 className="cat-card__title">{loc(item.title, locale)}</h2>
                  <p className="cat-card__text">{loc(item.summary, locale)}</p>
                  <p className="cat-card__foot">
                    {item.launchDate ? `${t.catalog.launch}: ${formatDate(item.launchDate, locale)}` : ""}
                  </p>
                  {item.progress > 0 ? (
                    <div className="cat-progress" aria-label={t.catalog.progress}>
                      <span style={{ width: `${Math.min(100, item.progress)}%` }} />
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
