import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { ROUTES } from "../../i18n";
import { useLocale } from "../../i18n/LocaleProvider";
import { DirectionIcon } from "./DirectionIcon";
import { OrbitVisual } from "./OrbitVisual";

export function HomePage() {
  const { t, locale } = useLocale();
  const h = t.home;

  useEffect(() => {
    document.title = `${t.meta.siteName} · ${t.meta.shortDescription}`;
  }, [t.meta.siteName, t.meta.shortDescription, locale]);

  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__glow" aria-hidden="true" />
        <div className="home-hero__orbit" aria-hidden="true">
          <OrbitVisual />
        </div>

        <Container width="wide" className="home-hero__inner">
          <p className="home-hero__brand">{t.meta.siteName}</p>
          <h1 id="home-hero-title" className="home-hero__headline">
            {h.hero.headline}
          </h1>
          <p className="home-hero__lead">{h.hero.lead}</p>
          <div className="home-hero__actions">
            <Link to={ROUTES.join} className="shell-btn shell-btn--primary ui-idle ui-idle--cta">
              {h.hero.ctaJoin}
            </Link>
            <Link to={ROUTES.about} className="shell-btn shell-btn--secondary">
              {h.hero.ctaAbout}
            </Link>
          </div>
        </Container>
      </section>

      <section className="home-section home-about" aria-labelledby="home-about-title">
        <Container width="wide">
          <div className="home-about__grid">
            <div className="home-about__intro">
              <p className="home-eyebrow">{h.about.eyebrow}</p>
              <h2 id="home-about-title" className="home-section__title">
                {h.about.title}
              </h2>
              <p className="home-section__lead">{h.about.body}</p>
            </div>
            <ul className="home-about__points">
              {h.about.points.map((point) => (
                <li key={point.title} className="home-about__point">
                  <h3 className="home-about__point-title">{point.title}</h3>
                  <p className="home-about__point-text">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="home-section home-directions" aria-labelledby="home-directions-title">
        <Container width="wide">
          <div className="home-section__head">
            <div>
              <p className="home-eyebrow">{h.directions.eyebrow}</p>
              <h2 id="home-directions-title" className="home-section__title">
                {h.directions.title}
              </h2>
              <p className="home-section__lead">{h.directions.lead}</p>
            </div>
            <Link to={ROUTES.directions} className="home-section__more">
              {h.directions.more}
            </Link>
          </div>

          <div className="home-dir__grid">
            {h.directions.items.map((item) => (
              <Link
                key={item.id}
                to={ROUTES.directions}
                className="home-dir__card"
                data-cursor="pointer"
              >
                <span className="home-dir__mark">
                  <DirectionIcon id={item.id} />
                </span>
                <h3 className="home-dir__title">{item.title}</h3>
                <p className="home-dir__text">{item.text}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-events" aria-labelledby="home-events-title">
        <Container width="wide">
          <p className="home-eyebrow">{h.events.eyebrow}</p>
          <h2 id="home-events-title" className="home-section__title">
            {h.events.title}
          </h2>
          <div className="home-empty home-empty--events">
            <div className="home-empty__copy">
              <h3 className="home-empty__title">{h.events.emptyTitle}</h3>
              <p className="home-empty__body">{h.events.emptyBody}</p>
              <Link to={ROUTES.events} className="shell-btn shell-btn--secondary">
                {h.events.cta}
              </Link>
            </div>
            <div className="home-empty__visual home-empty__visual--calendar" aria-hidden="true" />
          </div>
        </Container>
      </section>

      <section className="home-section home-projects home-section--panel" aria-labelledby="home-projects-title">
        <Container width="wide">
          <div className="home-projects__layout">
            <div>
              <p className="home-eyebrow home-eyebrow--on-light">{h.projects.eyebrow}</p>
              <h2 id="home-projects-title" className="home-section__title home-section__title--on-light">
                {h.projects.title}
              </h2>
              <p className="home-section__lead home-section__lead--on-light">{h.projects.lead}</p>
            </div>
            <div className="home-empty home-empty--compact home-empty--on-light">
              <h3 className="home-empty__title">{h.projects.emptyTitle}</h3>
              <p className="home-empty__body">{h.projects.emptyBody}</p>
              <Link to={ROUTES.projects} className="shell-btn shell-btn--on-light">
                {h.projects.cta}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-section home-news" aria-labelledby="home-news-title">
        <Container width="wide">
          <p className="home-eyebrow">{h.news.eyebrow}</p>
          <h2 id="home-news-title" className="home-section__title">
            {h.news.title}
          </h2>
          <div className="home-empty home-empty--news">
            <div className="home-empty__rail" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="home-empty__copy">
              <h3 className="home-empty__title">{h.news.emptyTitle}</h3>
              <p className="home-empty__body">{h.news.emptyBody}</p>
              <Link to={ROUTES.news} className="shell-btn shell-btn--secondary">
                {h.news.cta}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-join" aria-labelledby="home-join-title">
        <Container width="wide" className="home-join__inner">
          <h2 id="home-join-title" className="home-join__title">
            {h.join.title}
          </h2>
          <p className="home-join__lead">{h.join.lead}</p>
          <Link to={ROUTES.join} className="shell-btn shell-btn--primary ui-idle ui-idle--cta">
            {h.join.cta}
          </Link>
        </Container>
      </section>
    </div>
  );
}
