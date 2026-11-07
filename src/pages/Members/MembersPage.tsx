import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { loc } from "../../content/i18nText";
import { MEMBER_ROLE_LABELS, PROJECT_DIRECTION_LABELS } from "../../content/labels";
import type { MemberRole, ProjectDirection } from "../../content/types";
import { useLocale } from "../../i18n/LocaleProvider";

const ROLES = Object.keys(MEMBER_ROLE_LABELS) as MemberRole[];
const DIRECTIONS = Object.keys(PROJECT_DIRECTION_LABELS) as ProjectDirection[];

export function MembersPage() {
  const { t, locale } = useLocale();
  const { store } = useContent();
  const [role, setRole] = useState<"all" | MemberRole>("all");
  const [direction, setDirection] = useState<"all" | ProjectDirection>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = `${t.membersPage.title} · ${t.meta.siteName}`;
  }, [t, locale]);

  const items = useMemo(() => {
    return store.members
      .filter((m) => m.published)
      .filter((m) => (role === "all" ? true : m.role === role))
      .filter((m) => (direction === "all" ? true : m.direction === direction))
      .filter((m) => {
        const hay = `${loc(m.name, locale)} ${loc(m.university, locale)}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      });
  }, [store.members, role, direction, q, locale]);

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.members}</p>
          <h1 className="cat-title">{t.membersPage.title}</h1>
          <p className="cat-lead">{t.membersPage.lead}</p>
          <p className="cat-lead" style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}>
            {t.membersPage.disclaimer}
          </p>

          <div className="cat-toolbar">
            <input
              className="cat-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.catalog.search}
            />
            {(["all", ...ROLES] as const).map((r) => (
              <button
                key={r}
                type="button"
                className={`cat-chip${role === r ? " cat-chip--active" : ""}`}
                onClick={() => setRole(r)}
              >
                {r === "all" ? t.catalog.role : MEMBER_ROLE_LABELS[r][locale]}
              </button>
            ))}
          </div>
          <div className="cat-toolbar">
            <button
              type="button"
              className={`cat-chip${direction === "all" ? " cat-chip--active" : ""}`}
              onClick={() => setDirection("all")}
            >
              {t.catalog.direction}
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

          {items.length === 0 ? (
            <div className="cat-empty">
              <h2 className="cat-empty__title">{t.catalog.emptyTitle}</h2>
              <p className="cat-empty__body">{t.catalog.emptyBody}</p>
            </div>
          ) : (
            <div className="cat-grid cat-grid--3">
              {items.map((item) => (
                <Link key={item.id} to={`/members/${item.slug}`} className="cat-card" data-cursor="pointer">
                  <div className="cat-card__cover" style={{ aspectRatio: "1 / 1", maxWidth: "9rem" }}>
                    {item.photoUrl ? <img src={item.photoUrl} alt="" /> : null}
                  </div>
                  <div className="cat-card__meta">
                    <span className="cat-badge">{MEMBER_ROLE_LABELS[item.role][locale]}</span>
                  </div>
                  <h2 className="cat-card__title">{loc(item.name, locale)}</h2>
                  <p className="cat-card__text">{loc(item.university, locale)}</p>
                  <p className="cat-card__foot">{loc(item.bio, locale)}</p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
