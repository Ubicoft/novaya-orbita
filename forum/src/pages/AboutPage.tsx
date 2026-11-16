import { SITE_URL } from "../data/categories";
import { useLocale } from "../i18n/LocaleProvider";

export function AboutPage() {
  const { t } = useLocale();

  return (
    <div className="forum">
      <section className="forum-hero">
        <p className="forum-hero__brand">{t.nav.about}</p>
        <h1 className="forum-hero__title">{t.aboutPage.title}</h1>
        <p className="forum-hero__lead">{t.aboutPage.lead}</p>
        <div className="forum-about">
          {t.aboutPage.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <a className="shell-btn shell-btn--primary" href={SITE_URL} rel="noreferrer">
            {t.aboutPage.toSite}
          </a>
        </p>
      </section>
    </div>
  );
}
