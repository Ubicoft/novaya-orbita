import type { ReactNode } from "react";

type IconId =
  | "education"
  | "debate"
  | "international"
  | "science"
  | "social"
  | "projects"
  | "leadership";

export function DirectionIcon({ id }: { id: string }) {
  const key = (id in ICONS ? id : "projects") as IconId;
  return (
    <svg className="home-dir__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {ICONS[key]}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<IconId, ReactNode> = {
  education: (
    <>
      <path d="M4 10.5L12 6l8 4.5-8 4.5-8-4.5z" {...stroke} />
      <path d="M7 12.5v4.2c0 .4 2.2 1.8 5 1.8s5-1.4 5-1.8v-4.2" {...stroke} />
      <path d="M20 10.5V16" {...stroke} />
    </>
  ),
  debate: (
    <>
      <path d="M5 6h8v6H9l-2.5 2.5V12H5V6z" {...stroke} />
      <path d="M11 9h8v6h-3.5L13 18v-3H11V9z" {...stroke} />
    </>
  ),
  international: (
    <>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path d="M4 12h16" {...stroke} />
      <path d="M12 4c2.4 2.6 2.4 12.4 0 16" {...stroke} />
      <path d="M12 4c-2.4 2.6-2.4 12.4 0 16" {...stroke} />
    </>
  ),
  science: (
    <>
      <path d="M9 3h6l-1.5 5h4L12 21 6.5 8h4L9 3z" {...stroke} />
    </>
  ),
  social: (
    <>
      <circle cx="9" cy="8" r="2.5" {...stroke} />
      <circle cx="16" cy="9" r="2" {...stroke} />
      <path d="M4.5 18c0-2.3 2-4.2 4.5-4.2S13.5 15.7 13.5 18" {...stroke} />
      <path d="M13 16.2c.7-1 1.9-1.7 3.3-1.7 2 0 3.7 1.5 3.7 3.5" {...stroke} />
    </>
  ),
  projects: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.2" {...stroke} />
      <rect x="13" y="4" width="7" height="5" rx="1.2" {...stroke} />
      <rect x="4" y="13" width="7" height="7" rx="1.2" {...stroke} />
      <rect x="13" y="11" width="7" height="9" rx="1.2" {...stroke} />
    </>
  ),
  leadership: (
    <>
      <path d="M12 3.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 14.3 7.8 16.5l.8-4.7-3.4-3.3 4.7-.7L12 3.5z" {...stroke} />
    </>
  ),
};
