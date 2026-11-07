import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { loc } from "../../content/i18nText";
import { MEMBER_ROLE_LABELS, PROJECT_DIRECTION_LABELS } from "../../content/labels";
import { useLocale } from "../../i18n/LocaleProvider";
import { Seo } from "../../seo/Seo";

export function MemberDetailPage() {
  const { slug = "" } = useParams();
  const { t, locale } = useLocale();
  const { store } = useContent();
  const item = store.members.find((m) => m.slug === slug && m.published);


  if (!item) {
    return (
      <div className="cat cat-detail">
        <Container width="wide">
          <Seo title={`${t.catalog.notFoundTitle} · ${t.meta.siteName}`} noindex />
          <Link to="/members" className="cat-detail__back">
            {t.catalog.back}
          </Link>
          <h1 className="cat-detail__title">{t.catalog.notFoundTitle}</h1>
          <p className="cat-detail__lead">{t.catalog.notFoundBody}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="cat cat-detail">
      <Container width="wide">
        <Seo
          title={`${loc(item.name, locale)} · ${t.meta.siteName}`}
          description={loc(item.bio, locale) || MEMBER_ROLE_LABELS[item.role][locale]}
        />
      <Link to="/members" className="cat-detail__back">
          {t.catalog.back}
        </Link>
        <div className="cat-card__meta">
          <span className="cat-badge">{MEMBER_ROLE_LABELS[item.role][locale]}</span>
          {item.direction ? (
            <span className="cat-badge cat-badge--muted">
              {PROJECT_DIRECTION_LABELS[item.direction][locale]}
            </span>
          ) : null}
        </div>
        <h1 className="cat-detail__title">{loc(item.name, locale)}</h1>
        <p className="cat-detail__lead">
          {t.catalog.university}: {loc(item.university, locale)}
        </p>
        <p className="cat-lead" style={{ marginBottom: "1rem", fontSize: "0.92rem" }}>
          {t.membersPage.disclaimer}
        </p>
        {item.photoUrl ? (
          <div className="cat-detail__cover" style={{ aspectRatio: "4 / 3", maxWidth: "28rem" }}>
            <img src={item.photoUrl} alt="" loading="lazy" decoding="async" />
          </div>
        ) : null}
        {loc(item.bio, locale) ? (
          <div className="cat-detail__block">
            <p>{loc(item.bio, locale)}</p>
          </div>
        ) : null}
        {loc(item.interests, locale) ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.interests}</h2>
            <p>{loc(item.interests, locale)}</p>
          </div>
        ) : null}
        {item.publicProfiles ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.profiles}</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{item.publicProfiles}</p>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
