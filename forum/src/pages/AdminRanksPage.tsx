import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDemoMembers } from "../data/demoMembers";
import {
  getRanksAdminState,
  saveRanksAdminState,
  type RanksAdminState,
} from "../ranks/adminStore";
import { SPECIAL_RANKS } from "../ranks/catalog";
import type { OrbitRankId } from "../ranks/types";
import { useLocale } from "../i18n/LocaleProvider";

export function AdminRanksPage() {
  const { t } = useLocale();
  const members = useMemo(() => getDemoMembers(), []);
  const [state, setState] = useState<RanksAdminState>(() => getRanksAdminState());
  const [saved, setSaved] = useState(false);

  const persist = (next: RanksAdminState) => {
    setState(next);
    saveRanksAdminState(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="forum">
      <div className="forum-crumb">
        <Link to="/">{t.nav.home}</Link>
        <span>/</span>
        <Link to="/members">{t.nav.members}</Link>
        <span>/</span>
        <span>{t.adminRanks.title}</span>
      </div>

      <section className="forum-section">
        <div className="forum-section__head">
          <div>
            <h1 className="forum-section__title">{t.adminRanks.title}</h1>
            <p className="forum-section__lead">{t.adminRanks.lead}</p>
          </div>
          {saved ? <span className="forum-hero__brand">{t.adminRanks.saved}</span> : null}
        </div>

        <div className="forum-admin">
          <div className="forum-admin__panel">
            <h2>{t.adminRanks.specialTitle}</h2>
            <p className="forum-admin__hint">{t.adminRanks.specialHint}</p>
            {members.map((m) => (
              <div className="forum-admin__row" key={m.id}>
                <label htmlFor={`special-${m.id}`}>{m.displayName}</label>
                <select
                  id={`special-${m.id}`}
                  value={state.specialByMember[m.id] ?? m.specialRankId ?? ""}
                  onChange={(e) => {
                    const value = e.target.value as OrbitRankId | "";
                    const specialByMember = { ...state.specialByMember };
                    if (!value) specialByMember[m.id] = null;
                    else specialByMember[m.id] = value;
                    persist({ ...state, specialByMember });
                  }}
                >
                  <option value="">{t.adminRanks.autoOnly}</option>
                  {SPECIAL_RANKS.map((id) => (
                    <option key={id} value={id}>
                      {t.ranks[id]}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="forum-admin__panel">
            <h2>{t.adminRanks.weightsTitle}</h2>
            <p className="forum-admin__hint">{t.adminRanks.weightsHint}</p>
            {(
              [
                ["posts", t.profile.posts],
                ["helpfulAnswers", t.adminRanks.helpful],
                ["reactionsReceived", t.profile.reactions],
                ["threadsStarted", t.adminRanks.threads],
                ["materialsShared", t.adminRanks.materials],
                ["eventParticipation", t.adminRanks.events],
                ["postSoftCap", t.adminRanks.postSoftCap],
              ] as const
            ).map(([key, label]) => (
              <div className="forum-admin__row" key={key}>
                <label htmlFor={`w-${key}`}>{label}</label>
                <input
                  id={`w-${key}`}
                  type="number"
                  min={0}
                  step={1}
                  value={state.weights[key] ?? ""}
                  placeholder={t.adminRanks.defaultWeight}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const weights: RanksAdminState["weights"] = { ...state.weights };
                    if (raw === "") delete weights[key];
                    else weights[key] = Number(raw);
                    persist({ ...state, weights });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
