import type { AchievementId } from "../ranks/types";
import { useLocale } from "../i18n/LocaleProvider";
import "./AchievementChip.css";

const ICONS: Record<AchievementId, string> = {
  first_step: "①",
  active_talker: "◎",
  community_helper: "✚",
  initiator: "✦",
  researcher: "◆",
  organizer: "◈",
  international_voice: "◉",
};

export function AchievementChip({ id }: { id: AchievementId }) {
  const { t } = useLocale();
  return (
    <span className="ach-chip" title={t.achievements[id]}>
      <span className="ach-chip__mark" aria-hidden>
        {ICONS[id]}
      </span>
      <span className="ach-chip__label">{t.achievements[id]}</span>
    </span>
  );
}
