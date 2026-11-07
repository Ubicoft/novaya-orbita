export type DividerProps = {
  strong?: boolean;
  vertical?: boolean;
  label?: string;
  className?: string;
};

export function Divider({
  strong = false,
  vertical = false,
  label,
  className = "",
}: DividerProps) {
  if (label) {
    return (
      <div
        className={`divider divider--with-label ${className}`.trim()}
        role="separator"
      >
        <span className="divider__label text-caption">{label}</span>
      </div>
    );
  }

  const classes = [
    "divider",
    strong ? "divider--strong" : "",
    vertical ? "divider--vertical" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <hr className={classes} />;
}
