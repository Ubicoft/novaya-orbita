import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  variant?: "default" | "elevated" | "muted";
  interactive?: boolean;
  as?: "article" | "div" | "section";
  children: ReactNode;
};

export function Card({
  variant = "default",
  interactive = false,
  as: Tag = "article",
  className = "",
  children,
  ...rest
}: CardProps) {
  const classes = [
    "card",
    variant !== "default" ? `card--${variant}` : "",
    interactive ? "card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export function CardEyebrow({ children }: { children: ReactNode }) {
  return <p className="card__eyebrow text-caption">{children}</p>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="card__title text-h4">{children}</h3>;
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="card__body text-body">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card__footer">{children}</div>;
}
