import type { HTMLAttributes, ReactNode } from "react";

type ContainerWidth = "narrow" | "default" | "wide" | "full";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: ContainerWidth;
  as?: "div" | "section" | "main" | "header" | "footer";
  children: ReactNode;
};

export function Container({
  width = "default",
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={`container container--${width} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
