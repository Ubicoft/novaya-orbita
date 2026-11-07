import type { InputHTMLAttributes } from "react";

export type ToggleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  hint?: string;
  id: string;
};

export function Toggle({
  label,
  hint,
  id,
  disabled,
  className = "",
  ...rest
}: ToggleProps) {
  return (
    <label className={`toggle ${className}`.trim()} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="toggle__input"
        disabled={disabled}
        {...rest}
      />
      <span className="toggle__track" aria-hidden="true">
        <span className="toggle__thumb" />
      </span>
      <span>
        <span className="toggle__label">{label}</span>
        {hint ? <span className="toggle__hint">{hint}</span> : null}
      </span>
    </label>
  );
}
