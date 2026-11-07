import type { SelectHTMLAttributes } from "react";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
  id: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  label,
  hint,
  error,
  id,
  options,
  placeholder,
  className = "",
  disabled,
  ...rest
}: SelectProps) {
  const selectClass = [
    "select",
    error ? "select--error" : "",
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
      <select
        id={id}
        className={selectClass}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        defaultValue={rest.defaultValue ?? ""}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
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
