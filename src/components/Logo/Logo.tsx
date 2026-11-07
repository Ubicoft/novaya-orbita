type LogoSize = "header" | "footer" | "sm" | "mobile";
type LogoTheme = "light" | "dark";

export type LogoProps = {
  size?: LogoSize;
  theme?: LogoTheme;
  markOnly?: boolean;
  showTagline?: boolean;
  href?: string;
  className?: string;
};

function Mark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle
        className="logo__orbit"
        cx="20"
        cy="20"
        r="15.5"
        strokeWidth="1.5"
      />
      <circle
        className="logo__orbit-soft"
        cx="20"
        cy="20"
        r="9.5"
        strokeWidth="1"
        strokeDasharray="2.5 3.5"
        opacity="0.9"
      />
      <circle className="logo__core" cx="28.5" cy="11.5" r="2.4" />
    </svg>
  );
}

export function Logo({
  size = "header",
  theme = "light",
  markOnly = false,
  showTagline = true,
  href = "/",
  className = "",
}: LogoProps) {
  const classes = [
    "logo",
    `logo--${size}`,
    `logo--${theme}`,
    markOnly ? "logo--mark-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="logo__mark">
        <Mark />
      </span>
      {!markOnly ? (
        <span className="logo__wordmark">
          <span className="logo__name">Новая Орбита</span>
          {showTagline ? (
            <span className="logo__tagline">Межуниверситетское объединение</span>
          ) : null}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} aria-label="Новая Орбита — на главную">
        {content}
      </a>
    );
  }

  return (
    <span className={classes} role="img" aria-label="Новая Орбита">
      {content}
    </span>
  );
}
