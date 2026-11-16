import { EmptyState } from "../components/EmptyState";
import { SearchStub } from "../components/SearchStub";

type Props = {
  brand: string;
  title: string;
  lead: string;
  empty: string;
  withSearch?: boolean;
};

export function SimpleEmptyPage({ brand, title, lead, empty, withSearch }: Props) {
  return (
    <div className="forum">
      <section className="forum-hero">
        <p className="forum-hero__brand">{brand}</p>
        <h1 className="forum-hero__title">{title}</h1>
        <p className="forum-hero__lead">{lead}</p>
        {withSearch ? <SearchStub /> : null}
      </section>
      <section className="forum-section">
        <EmptyState>{empty}</EmptyState>
      </section>
    </div>
  );
}
