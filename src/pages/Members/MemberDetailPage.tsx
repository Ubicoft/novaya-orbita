import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { formatDate, loc } from "../../content/i18nText";
import { PROJECT_DIRECTION_LABELS } from "../../content/labels";
import {
  MEMBERSHIP_STATUS_LABELS,
  OFFICE_POSITION_BLURBS,
  OFFICE_POSITION_LABELS,
} from "../../content/team";
import { withLang } from "../../i18n";
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
          <Link to={withLang("/members", locale)} className="cat-detail__back">
            {t.catalog.back}
          </Link>
          <h1 className="cat-detail__title">{t.catalog.notFoundTitle}</h1>
          <p className="cat-detail__lead">{t.catalog.notFoundBody}</p>
        </Container>
      </div>
    );
  }

  const place = [loc(item.city, locale), loc(item.country, locale)].filter(Boolean).join(", ");

  return (
    <div className="cat cat-detail team-detail">
      <Container width="wide">
        <Seo
          title={`${loc(item.name, locale)} · ${t.meta.siteName}`}
          description={
            loc(item.bio, locale) ||
            (item.position ? OFFICE_POSITION_LABELS[item.position][locale] : "") ||
            MEMBERSHIP_STATUS_LABELS[item.membershipStatus][locale]
          }
        />
        <Link to={withLang("/members", locale)} className="cat-detail__back">
          {t.catalog.back}
        </Link>

        <div className="team-detail__layout">
          <div className="team-detail__media">
            <div className="cat-detail__cover team-detail__photo">
              {item.photoUrl ? (
                <img src={item.photoUrl} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className="team-card__initials team-card__initials--lg" aria-hidden="true">
                  {(loc(item.name, locale) || "?").slice(0, 1)}
                </span>
              )}
            </div>
          </div>

          <div className="team-detail__main">
            <div className="cat-card__meta">
              {item.position ? (
                <span className="cat-badge">{OFFICE_POSITION_LABELS[item.position][locale]}</span>
              ) : (
                <span className="cat-badge cat-badge--muted">{t.catalog.noOffice}</span>
              )}
              <span className="cat-badge cat-badge--muted">
                {MEMBERSHIP_STATUS_LABELS[item.membershipStatus][locale]}
              </span>
              {item.direction ? (
                <span className="cat-badge cat-badge--muted">
                  {PROJECT_DIRECTION_LABELS[item.direction][locale]}
                </span>
              ) : null}
            </div>

            <h1 className="cat-detail__title">{loc(item.name, locale)}</h1>

            {item.position ? (
              <p className="cat-detail__lead">{OFFICE_POSITION_BLURBS[item.position][locale]}</p>
            ) : null}

            <dl className="team-detail__meta">
              {loc(item.university, locale) ? (
                <div>
                  <dt>{t.catalog.university}</dt>
                  <dd>{loc(item.university, locale)}</dd>
                </div>
              ) : null}
              {place ? (
                <div>
                  <dt>
                    {t.catalog.city} / {t.catalog.country}
                  </dt>
                  <dd>{place}</dd>
                </div>
              ) : null}
              {loc(item.representation, locale) ? (
                <div>
                  <dt>{t.catalog.representation}</dt>
                  <dd>{loc(item.representation, locale)}</dd>
                </div>
              ) : null}
              {item.joinedAt ? (
                <div>
                  <dt>{t.catalog.joinedAt}</dt>
                  <dd>{formatDate(item.joinedAt, locale)}</dd>
                </div>
              ) : null}
              {item.appointedAt && item.position ? (
                <div>
                  <dt>{t.catalog.appointedAt}</dt>
                  <dd>{formatDate(item.appointedAt, locale)}</dd>
                </div>
              ) : null}
            </dl>

            <p className="cat-lead team__disclaimer">{t.membersPage.disclaimer}</p>
          </div>
        </div>

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
        {item.positionHistory.length ? (
          <div className="cat-detail__block">
            <h2>{t.catalog.positionHistory}</h2>
            <ol className="team-history">
              {item.positionHistory.map((h) => (
                <li key={`${h.at}-${h.position}-${h.note}`}>
                  <span className="team-history__date">{formatDate(h.at.slice(0, 10), locale)}</span>
                  <span>
                    {h.position
                      ? OFFICE_POSITION_LABELS[h.position][locale]
                      : t.catalog.noOffice}
                  </span>
                  {h.note ? <span className="team-history__note">{h.note}</span> : null}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
