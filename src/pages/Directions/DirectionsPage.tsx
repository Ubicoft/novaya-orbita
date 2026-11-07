import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { ROUTES } from "../../i18n";
import { useLocale } from "../../i18n/LocaleProvider";
import { DirectionIcon } from "../Home/DirectionIcon";
import { Seo } from "../../seo/Seo";

export function DirectionsPage() {
  const { t } = useLocale();
  const d = t.home.directions;

  return (
    <div className="cat">
      <Seo title={`${t.pages.directions.title} · ${t.meta.siteName}`} description={d.lead} />
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.directions}</p>
          <h1 className="cat-title">{d.title}</h1>
          <p className="cat-lead">{d.lead}</p>

          <div className="cat-grid cat-grid--3" style={{ marginTop: "1.5rem" }}>
            {d.items.map((item) => (
              <article key={item.id} className="cat-card" id={item.id}>
                <span className="home-dir__mark" style={{ width: "2.6rem", height: "2.6rem" }}>
                  <DirectionIcon id={item.id} />
                </span>
                <h2 className="cat-card__title">{item.title}</h2>
                <p className="cat-card__text">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="cat-empty" style={{ marginTop: "1.75rem" }}>
            <p className="cat-empty__body">{d.relatedNote}</p>
            <p style={{ marginTop: "0.85rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link to={ROUTES.events}>{t.nav.events}</Link>
              <Link to={ROUTES.projects}>{t.nav.projects}</Link>
              <Link to={ROUTES.join}>{t.nav.join}</Link>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
