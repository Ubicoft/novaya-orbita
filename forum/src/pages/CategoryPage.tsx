import { Link, Navigate, useParams } from "react-router-dom";
import { CategoryIcon } from "../components/CategoryIcon";
import { EmptyState } from "../components/EmptyState";
import { getCategory } from "../data/categories";
import { ROUTES } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";

export function CategoryPage() {
  const { categoryId = "" } = useParams();
  const { t } = useLocale();
  const cat = getCategory(categoryId);

  if (!cat) return <Navigate to={ROUTES.categories} replace />;

  const copy = t.categories[cat.id];

  return (
    <div className="forum">
      <section className="forum-hero">
        <div className="forum-crumb">
          <Link to={ROUTES.categories}>{t.categoryPage.back}</Link>
        </div>
        <div className="forum-cat__top" style={{ marginBottom: "0.75rem" }}>
          <span className="forum-cat__mark">
            <CategoryIcon id={cat.icon} />
          </span>
          <div>
            <h1 className="forum-hero__title" style={{ marginBottom: 0 }}>
              {copy.title}
            </h1>
          </div>
        </div>
        <p className="forum-hero__lead">{copy.description}</p>
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
      </section>

      <section className="forum-section" aria-labelledby="subs-title">
        <h2 id="subs-title" className="forum-section__title">
          {t.categoryPage.subsectionsTitle}
        </h2>
        <ul className="forum-sublist">
          {cat.subsections.map((sub) => (
            <li key={sub}>
              <Link to={`/categories/${cat.id}/${sub}`}>
                <span>{copy.subs[sub]}</span>
                <span className="forum-sublist__count">0</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="forum-section" aria-labelledby="threads-title">
        <h2 id="threads-title" className="forum-section__title">
          {t.categoryPage.threadsTitle}
        </h2>
        <EmptyState>{t.categoryPage.threadsEmpty}</EmptyState>
      </section>
    </div>
  );
}
