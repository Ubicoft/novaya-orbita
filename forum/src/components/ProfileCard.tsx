import { Link } from "react-router-dom";
import type { ForumMember } from "../ranks/types";
import { resolveMemberRanks, reputationPoints } from "../ranks/progression";
import { useLocale } from "../i18n/LocaleProvider";
import { OrbitBadge } from "./OrbitBadge";
import { AchievementChip } from "./AchievementChip";
import "./ProfileCard.css";

function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "tj" ? "tg" : locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ProfileCard({
  member,
  compact = false,
}: {
  member: ForumMember;
  compact?: boolean;
}) {
  const { t, locale } = useLocale();
  const { primary, badges } = resolveMemberRanks(member);
  const rep = reputationPoints(member.stats);

  return (
    <article className={`profile-card${compact ? " profile-card--compact" : ""}`}>
      <div className="profile-card__glow" aria-hidden />
      <div className="profile-card__head">
        <div
          className="profile-card__avatar"
          style={{ ["--avatar-hue" as string]: String(member.avatarHue) }}
          aria-hidden
        >
          <span>{member.avatarInitials}</span>
        </div>
        <div className="profile-card__identity">
          <Link
            to={`/members/${member.id}`}
            className={`profile-card__name profile-card__name--${member.nameRole}`}
          >
            {member.displayName}
          </Link>
          <div className="profile-card__badges">
            {badges.map((id) => (
              <OrbitBadge key={id} rankId={id} size={compact ? "sm" : "md"} />
            ))}
          </div>
          {member.officeTitle ? (
            <p className="profile-card__office">{member.officeTitle}</p>
          ) : null}
        </div>
      </div>

      <dl className="profile-card__stats">
        <div>
          <dt>{t.profile.registered}</dt>
          <dd>{formatDate(member.registeredAt, locale)}</dd>
        </div>
        <div>
          <dt>{t.profile.posts}</dt>
          <dd>{member.stats.posts}</dd>
        </div>
        <div>
          <dt>{t.profile.reactions}</dt>
          <dd>{member.stats.reactionsReceived}</dd>
        </div>
        <div>
          <dt>{t.profile.reputation}</dt>
          <dd>{rep}</dd>
        </div>
      </dl>

      {!compact && member.achievements.length > 0 ? (
        <div className="profile-card__achs" aria-label={t.profile.achievements}>
          {member.achievements.map((id) => (
            <AchievementChip key={id} id={id} />
          ))}
        </div>
      ) : null}

      {!compact ? (
        <p className="profile-card__meta-line">
          <span className="profile-card__rank-hint">
            {t.profile.currentRank}: {t.ranks[primary]}
          </span>
          {member.university ? <span>· {member.university}</span> : null}
          {member.country ? <span>· {member.country}</span> : null}
        </p>
      ) : null}
    </article>
  );
}
