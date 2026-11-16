import { Link, Navigate, useParams } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard";
import { getDemoMember } from "../data/demoMembers";
import { AUTO_RANK_ORDER, ORBIT_RANKS } from "../ranks/catalog";
import {
  computeActivityScore,
  resolveMemberRanks,
} from "../ranks/progression";
import { useLocale } from "../i18n/LocaleProvider";

export function ProfilePage() {
  const { memberId = "" } = useParams();
  const { t } = useLocale();
  const member = getDemoMember(memberId);
  if (!member) return <Navigate to="/members" replace />;

  const { auto, primary } = resolveMemberRanks(member);
  const score = computeActivityScore(member.stats);

  return (
    <div className="forum">
      <div className="forum-crumb">
        <Link to="/">{t.nav.home}</Link>
        <span>/</span>
        <Link to="/members">{t.nav.members}</Link>
        <span>/</span>
        <span>{member.displayName}</span>
      </div>

      <div className="forum-profile-page">
        <ProfileCard member={member} />

        <aside className="forum-admin__panel">
          <h2>{t.profile.orbitProgress}</h2>
          <p className="forum-admin__hint">
            {t.profile.scoreLabel}: <strong>{Math.round(score.total)}</strong> ·{" "}
            {t.profile.currentRank}: {t.ranks[primary]}
            {primary !== auto ? ` (${t.ranks[auto]})` : ""}
          </p>
          <ul className="forum-ladder">
            {AUTO_RANK_ORDER.map((id) => {
              const def = ORBIT_RANKS[id];
              return (
                <li key={id} className={id === auto ? "is-current" : undefined}>
                  <span>{t.ranks[id]}</span>
                  <span className="forum-ladder__score">
                    ≥ {def.minScore} / {def.minUniqueThreads} thr
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
