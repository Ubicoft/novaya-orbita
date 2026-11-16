import { Link } from "react-router-dom";
import { CategoryIcon } from "../components/CategoryIcon";
import { CATEGORIES } from "../data/categories";
import { useLocale } from "../i18n/LocaleProvider";

export function CategoriesPage() {
  const { t } = useLocale();

  return (
    <div className="forum">
      <section className="forum-hero">
        <p className="forum-hero__brand">{t.nav.categories}</p>
        <h1 className="forum-hero__title">{t.categoriesPage.title}</h1>
        <p className="forum-hero__lead">{t.categoriesPage.lead}</p>
      </section>

      <section className="forum-section">
        <div className="forum-grid forum-grid--cats">
          {CATEGORIES.map((cat) => {
            const copy = t.categories[cat.id];
            return (
              <article key={cat.id} className="forum-cat">
                <div className="forum-cat__top">
                  <span className="forum-cat__mark">
                    <CategoryIcon id={cat.icon} />
                  </span>
                  <div>
                    <h2 className="forum-cat__title">
                      <Link to={`/categories/${cat.id}`}>{copy.title}</Link>
                    </h2>
                    <p className="forum-cat__desc">{copy.description}</p>
                  </div>
                </div>
                <p className="text-caption" style={{ margin: 0, color: "var(--page-muted)" }}>
                  {t.categoriesPage.subsections}
                </p>
                <ul className="forum-cat__subs">
                  {cat.subsections.map((sub) => (
                    <li key={sub}>
                      <Link to={`/categories/${cat.id}/${sub}`}>{copy.subs[sub]}</Link>
                    </li>
                  ))}
                </ul>
                <div className="forum-cat__meta">
                  <span>
                    {t.categoriesPage.topics}: 0
                  </span>
                  <span>
                    {t.categoriesPage.posts}: 0
                  </span>
                  <span>
                    {t.categoriesPage.lastActivity}: {t.categoriesPage.emptyActivity}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
