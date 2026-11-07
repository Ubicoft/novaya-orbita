import type { ReactNode } from "react";

type AlertTone = "success" | "error" | "warning" | "info";

export type AlertProps = {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
  className?: string;
};

const icons: Record<AlertTone, ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.2l2.2 2.2 4.8-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 7l6 6M13 7l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M9.1 3.6L2.4 15.2A1 1 0 003.3 16.7h13.4a1 1 0 00.9-1.5L10.9 3.6a1 1 0 00-1.8 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.8" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  ),
};

export function Alert({
  tone = "info",
  title,
  children,
  className = "",
}: AlertProps) {
  return (
    <div
      className={`alert alert--${tone} ${className}`.trim()}
      role={tone === "error" ? "alert" : "status"}
    >
      <span className="alert__icon">{icons[tone]}</span>
      <div className="alert__content">
        {title ? <p className="alert__title text-body">{title}</p> : null}
        <div className="alert__body">{children}</div>
      </div>
    </div>
  );
}
