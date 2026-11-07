import type { ImgHTMLAttributes, ReactNode } from "react";

export type ImageBlockProps = {
  src?: string;
  alt?: string;
  caption?: string;
  placeholderLabel?: string;
  rounded?: "default" | "sm" | "full";
  children?: ReactNode;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

export function ImageBlock({
  src,
  alt = "",
  caption,
  placeholderLabel = "Изображение",
  rounded = "default",
  className = "",
  children,
  ...rest
}: ImageBlockProps) {
  const wrapClass = [
    "image-block",
    rounded === "sm" ? "image-block--rounded-sm" : "",
    rounded === "full" ? "image-block--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure>
      <div className={wrapClass}>
        {src ? (
          <img
            className="image-block__media"
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            {...rest}
          />
        ) : (
          <div className="image-block__placeholder">
            <div>
              <div className="image-block__placeholder-mark" aria-hidden="true" />
              <p className="text-body-sm">{placeholderLabel}</p>
              {children}
            </div>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="image-block__caption text-caption">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
