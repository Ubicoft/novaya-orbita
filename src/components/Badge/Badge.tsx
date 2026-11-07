import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "neutral" | "info" | "success" | "warning" | "error" | "accent";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
};

export function Badge({
  tone = "neutral",
  dot = false,
  className = "",
  children,
  ...rest
}: BadgeProps) {
  return (
    <span className={`badge badge--${tone} ${className}`.trim()} {...rest}>
      {dot ? <span className="badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
