import { Link } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard";
import { getDemoMembers } from "../data/demoMembers";
import { useLocale } from "../i18n/LocaleProvider";

export function MembersPage() {
  const { t } = useLocale();
  const members = getDemoMembers();

  return (
    <div className="forum">
      <section className="forum-section">
        <div className="forum-section__head">
          <div>
            <p className="forum-hero__brand">{t.nav.members}</p>
            <h1 className="forum-section__title">{t.membersPage.title}</h1>
            <p className="forum-section__lead">{t.membersPage.lead}</p>
          </div>
          <Link className="shell-btn shell-btn--secondary" to="/admin/ranks">
            {t.adminRanks.nav}
          </Link>
        </div>
        <div className="forum-members-grid">
          {members.map((m) => (
            <ProfileCard key={m.id} member={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
