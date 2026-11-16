import { Link, Navigate, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { getCategory } from "../data/categories";
import { ROUTES } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";

export function SubsectionPage() {
  const { categoryId = "", subsectionId = "" } = useParams();
  const { t } = useLocale();
  const cat = getCategory(categoryId);

  if (!cat || !cat.subsections.includes(subsectionId)) {
    return <Navigate to={ROUTES.categories} replace />;
  }

  const copy = t.categories[cat.id];
  const subTitle = copy.subs[subsectionId];

  return (
    <div className="forum">
      <section className="forum-hero">
        <div className="forum-crumb">
          <Link to={ROUTES.categories}>{t.nav.categories}</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/categories/${cat.id}`}>{copy.title}</Link>
        </div>
        <h1 className="forum-hero__title">{subTitle}</h1>
        <p className="forum-hero__lead">{copy.description}</p>
        <Link className="shell-btn shell-btn--secondary" to={`/categories/${cat.id}`}>
          {t.subsectionPage.backCategory}
        </Link>
      </section>

      <section className="forum-section">
        <EmptyState>{t.subsectionPage.threadsEmpty}</EmptyState>
      </section>
    </div>
  );
}
