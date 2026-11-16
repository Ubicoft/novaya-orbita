import { Link } from "react-router-dom";
import { CategoryIcon } from "../components/CategoryIcon";
import { EmptyState } from "../components/EmptyState";
import { SearchStub } from "../components/SearchStub";
import { CATEGORIES, SITE_URL } from "../data/categories";
import { ROUTES } from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";

export function HomePage() {
  const { t } = useLocale();

  return (
    <div className="forum">
      <section className="forum-hero">
        <p className="forum-hero__brand">{t.meta.forumName}</p>
        <h1 className="forum-hero__title">{t.home.welcomeTitle}</h1>
        <p className="forum-hero__lead">{t.home.welcomeLead}</p>
        <div className="forum-hero__actions">
          <Link className="shell-btn shell-btn--primary" to={ROUTES.categories}>
            {t.home.exploreCategories}
          </Link>
          <a className="shell-btn shell-btn--secondary" href={SITE_URL} rel="noreferrer">
            {t.home.toSite}
          </a>
        </div>
        <SearchStub />
      </section>

      <section className="forum-section" aria-labelledby="forum-cats-title">
        <div className="forum-section__head">
          <div>
            <h2 id="forum-cats-title" className="forum-section__title">
              {t.nav.categories}
            </h2>
            <p className="forum-section__lead">{t.categoriesPage.lead}</p>
          </div>
          <Link to={ROUTES.categories}>{t.categoriesPage.open}</Link>
        </div>
        <div className="forum-grid forum-grid--cats">
          {CATEGORIES.map((cat) => {
            const copy = t.categories[cat.id];
            return (
              <Link key={cat.id} className="forum-cat" to={`/categories/${cat.id}`}>
                <div className="forum-cat__top">
                  <span className="forum-cat__mark">
                    <CategoryIcon id={cat.icon} />
                  </span>
                  <div>
                    <h3 className="forum-cat__title">{copy.title}</h3>
                    <p className="forum-cat__desc">{copy.description}</p>
                  </div>
                </div>
                <ul className="forum-cat__subs">
                  {cat.subsections.slice(0, 3).map((sub) => (
                    <li key={sub}>
                      <span>{copy.subs[sub]}</span>
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
              </Link>
            );
          })}
        </div>
      </section>

      <section className="forum-section" aria-labelledby="forum-latest">
        <div className="forum-section__head">
          <h2 id="forum-latest" className="forum-section__title">
            {t.home.latestTitle}
          </h2>
          <Link to={ROUTES.recent}>{t.nav.recent}</Link>
        </div>
        <EmptyState>{t.home.latestEmpty}</EmptyState>
      </section>

      <section className="forum-section" aria-labelledby="forum-popular">
        <div className="forum-section__head">
          <h2 id="forum-popular" className="forum-section__title">
            {t.home.popularTitle}
          </h2>
          <Link to={ROUTES.popular}>{t.nav.popular}</Link>
        </div>
        <EmptyState>{t.home.popularEmpty}</EmptyState>
      </section>

      <section className="forum-section" aria-labelledby="forum-qa">
        <div className="forum-section__head">
          <h2 id="forum-qa" className="forum-section__title">
            {t.home.qaTitle}
          </h2>
          <Link to={ROUTES.qa}>{t.nav.qa}</Link>
        </div>
        <EmptyState>{t.home.qaEmpty}</EmptyState>
      </section>

      <section className="forum-section" aria-labelledby="forum-members">
        <div className="forum-section__head">
          <h2 id="forum-members" className="forum-section__title">
            {t.home.membersTitle}
          </h2>
          <Link to={ROUTES.members}>{t.nav.members}</Link>
        </div>
        <EmptyState>{t.home.membersEmpty}</EmptyState>
      </section>
    </div>
  );
}
