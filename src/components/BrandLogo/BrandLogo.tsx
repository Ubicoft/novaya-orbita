import { Link } from "react-router-dom";
import logoHorizontal from "../../assets/brand/logo-horizontal-transparent.png";
import logoStacked from "../../assets/brand/logo-stacked-transparent.png";
import logoWinter from "../../assets/brand/logo-winter-transparent.png";
import { useLocale } from "../../i18n/LocaleProvider";
import { useTheme } from "../../theme/ThemeProvider";

type BrandLogoSize = "header" | "footer" | "mobile" | "sm";

export type BrandLogoProps = {
  size?: BrandLogoSize;
  /** Force a variant; otherwise theme picks winter vs horizontal. */
  variant?: "auto" | "winter" | "horizontal" | "stacked";
  to?: string | null;
  className?: string;
  onNavigate?: () => void;
};

export function BrandLogo({
  size = "header",
  variant = "auto",
  to = "/",
  className = "",
  onNavigate,
}: BrandLogoProps) {
  const { t } = useLocale();
  const { isWinter } = useTheme();

  const resolved =
    variant === "auto"
      ? isWinter
        ? "winter"
        : size === "footer" || size === "mobile"
          ? "stacked"
          : "horizontal"
      : variant;

  const src =
    resolved === "winter"
      ? logoWinter
      : resolved === "stacked"
        ? logoStacked
        : logoHorizontal;

  const classes = [
    "brand-logo",
    `brand-logo--${size}`,
    `brand-logo--${resolved}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const image = (
    <img
      src={src}
      alt={t.meta.siteName}
      width={1254}
      height={1254}
      decoding="async"
      draggable={false}
    />
  );

  if (to === null) {
    return <span className={classes}>{image}</span>;
  }

  return (
    <Link
      className={classes}
      to={to}
      aria-label={t.meta.siteName}
      onClick={onNavigate}
    >
      {image}
    </Link>
  );
}
