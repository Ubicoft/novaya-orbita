import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkVariant = "default" | "subtle" | "nav";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: LinkVariant;
  disabled?: boolean;
  children: ReactNode;
};

export function Link({
  variant = "default",
  disabled = false,
  className = "",
  children,
  href = "#",
  onClick,
  ...rest
}: LinkProps) {
  const classes = [
    "link",
    variant !== "default" ? `link--${variant}` : "",
    disabled ? "link--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={classes}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
