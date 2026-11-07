import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { loc } from "../../content/i18nText";
import { PARTNER_CATEGORY_LABELS } from "../../content/labels";
import type { PartnerCategory } from "../../content/types";
import { ROUTES } from "../../i18n";
import { useLocale } from "../../i18n/LocaleProvider";

const CATEGORIES = Object.keys(PARTNER_CATEGORY_LABELS) as PartnerCategory[];

export function PartnersPage() {
  const { t, locale } = useLocale();
  const { store } = useContent();
  const [category, setCategory] = useState<"all" | PartnerCategory>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = `${t.partnersPage.title} · ${t.meta.siteName}`;
  }, [t, locale]);

  const items = useMemo(() => {
    return store.partners
      .filter((p) => p.published)
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => loc(p.name, locale).toLowerCase().includes(q.trim().toLowerCase()));
  }, [store.partners, category, q, locale]);

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.partners}</p>
          <h1 className="cat-title">{t.partnersPage.title}</h1>
          <p className="cat-lead">{t.partnersPage.lead}</p>

          <div className="cat-toolbar">
            <input
              className="cat-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.catalog.search}
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
                {PARTNER_CATEGORY_LABELS[c][locale]}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="cat-empty">
              <h2 className="cat-empty__title">{t.catalog.emptyTitle}</h2>
              <p className="cat-empty__body">{t.catalog.emptyBody}</p>
              <p className="cat-empty__body" style={{ marginTop: "0.85rem" }}>
                {t.partnersPage.invite}{" "}
                <Link to={ROUTES.contacts}>{t.nav.contacts}</Link>
              </p>
            </div>
          ) : (
            <div className="cat-grid cat-grid--3">
              {items.map((item) => (
                <Link key={item.id} to={`/partners/${item.slug}`} className="cat-card" data-cursor="pointer">
                  <div className="cat-card__cover" style={{ aspectRatio: "3 / 2" }}>
                    {item.logoUrl ? <img src={item.logoUrl} alt="" /> : null}
                  </div>
                  <div className="cat-card__meta">
                    <span className="cat-badge">{PARTNER_CATEGORY_LABELS[item.category][locale]}</span>
                  </div>
                  <h2 className="cat-card__title">{loc(item.name, locale)}</h2>
                  <p className="cat-card__text">{loc(item.description, locale)}</p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
