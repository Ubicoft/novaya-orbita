import type { InputHTMLAttributes, ReactNode } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  success?: boolean;
  id: string;
};

export function Input({
  label,
  hint,
  error,
  success = false,
  id,
  className = "",
  disabled,
  ...rest
}: InputProps) {
  const inputClass = [
    "input",
    error ? "input--error" : "",
    success && !error ? "input--success" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="field">
      {label ? (
        <label className="field__label text-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={inputClass}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="field__error text-body-sm" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="field__hint text-body-sm">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="ds-stack">{children}</div>;
}
