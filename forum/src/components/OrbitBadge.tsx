import { ORBIT_RANKS } from "../ranks/catalog";
import type { OrbitRankId } from "../ranks/types";
import { useLocale } from "../i18n/LocaleProvider";
import "./OrbitBadge.css";

type Size = "sm" | "md" | "lg";

function BadgeIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    className: "orbit-badge__icon",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "rocket":
      return (
        <svg {...common}>
          <path d="M12 3c3 2 5 5 5 9l-3 1-2 5-2-5-3-1c0-4 2-7 5-9Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="m10 14 4-6-6 4 2 2Z" fill="currentColor" />
        </svg>
      );
    case "orbit":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path
            d="m12 3 2.2 5.4L20 9l-4 3.4L17.2 18 12 14.8 6.8 18 8 12.4 4 9l5.8-.6L12 3Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="currentColor"
            fillOpacity="0.25"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 19 6v5c0 5-3.2 8.2-7 10-3.8-1.8-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 3c2 3-1 4 1 7 2-1 4 1 4 4a5 5 0 1 1-10 0c0-3 2-5 5-11Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M4 16 6 8l4 4 2-6 2 6 4-4 2 8H4Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );
    case "founders":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "laurel":
      return (
        <svg {...common}>
          <path d="M7 18c-2-3-2-7 0-10M17 18c2-3 2-7 0-10M9 19c1.5 1 4.5 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "comet":
      return (
        <svg {...common}>
          <path d="M4 12c4-1 7-2 9-4l3 3c-2 2-3 5-4 9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16.5" cy="7.5" r="2.2" fill="currentColor" />
        </svg>
      );
    case "crystal":
      return (
        <svg {...common}>
          <path d="m12 3 6 7-6 11L6 10l6-7Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "nova":
      return (
        <svg {...common}>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M5 19l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M4 7.5 9 5l6 3 5-2.5v12L15 20l-6-3-5 2.5v-12Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "planet":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(-20 12 12)" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        </svg>
      );
  }
}

export function OrbitBadge({
  rankId,
  size = "md",
}: {
  rankId: OrbitRankId;
  size?: Size;
}) {
  const { t } = useLocale();
  const def = ORBIT_RANKS[rankId];
  const label = t.ranks[rankId];

  return (
    <span
      className={`orbit-badge orbit-badge--${def.badgeTone} orbit-badge--${size}`}
      title={label}
    >
      <BadgeIcon name={def.icon} />
      <span className="orbit-badge__label">{label}</span>
    </span>
  );
}
