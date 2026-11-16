export function EmptyState({ children }: { children: string }) {
  return (
    <div className="forum-empty">
      <p>{children}</p>
    </div>
  );
}
