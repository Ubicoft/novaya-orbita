type Props = { id: string; className?: string };

/** Simple geometric marks — brand-adjacent, not emoji. */
export function CategoryIcon({ id, className = "" }: Props) {
  const common = {
    className: `forum-icon ${className}`.trim(),
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (id) {
    case "official":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
      );
    case "discussion":
      return (
        <svg {...common}>
          <path
            d="M7 10h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6l-5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "debates":
      return (
        <svg {...common}>
          <path
            d="M8 22V12M24 22V12M8 12c0-3 3.5-5 8-5s8 2 8 5M11 16h4M17 16h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "education":
      return (
        <svg {...common}>
          <path d="M4 13 16 7l12 6-12 6L4 13Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 15.5v5.5c0 1.5 3 3 7 3s7-1.5 7-3v-5.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "ideas":
      return (
        <svg {...common}>
          <path
            d="M16 5a7 7 0 0 1 4 12.7V22h-8v-4.3A7 7 0 0 1 16 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M13 25h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "projects":
      return (
        <svg {...common}>
          <rect x="6" y="8" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 13h20M12 8v5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "events":
      return (
        <svg {...common}>
          <rect x="6" y="9" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 14h20M11 7v4M21 7v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "interuni":
      return (
        <svg {...common}>
          <circle cx="11" cy="16" r="5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="21" cy="16" r="5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "help":
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M13 13a3 3 0 1 1 4.2 2.7c-.7.4-1.2 1-1.2 1.8V19"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="16" cy="22" r="1.1" fill="currentColor" />
        </svg>
      );
  }
}
