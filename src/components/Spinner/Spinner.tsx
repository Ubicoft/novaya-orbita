type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
  label?: string;
};

export function Spinner({
  size = "md",
  className = "",
  label = "Загрузка",
}: SpinnerProps) {
  return (
    <span
      className={`spinner spinner--${size} ${className}`.trim()}
      role="status"
      aria-label={label}
    />
  );
}

export function LoadingState({
  label = "Загрузка…",
}: {
  label?: string;
}) {
  return (
    <div className="spinner-block" role="status">
      <Spinner size="lg" label={label} />
      <p className="text-body-sm">{label}</p>
    </div>
  );
}
