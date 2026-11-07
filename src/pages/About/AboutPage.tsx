import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { ROUTES } from "../../i18n";
import { useLocale } from "../../i18n/LocaleProvider";

export function AboutPage() {
  const { t } = useLocale();
  const a = t.aboutPage;


  return (
    <div className="about">
      <section className="about-intro" aria-labelledby="about-intro-title">
        <div className="about-intro__orbit" aria-hidden="true">
          <span className="about-intro__ring about-intro__ring--a" />
          <span className="about-intro__ring about-intro__ring--b" />
          <span className="about-intro__core" />
        </div>
        <Container width="wide" className="about-intro__inner">
          <p className="about-eyebrow">{t.nav.about}</p>
          <h1 id="about-intro-title" className="about-intro__title">
            {a.intro.title}
          </h1>
          <p className="about-intro__lead">{a.intro.lead}</p>
        </Container>
      </section>

      <section className="about-section about-history" aria-labelledby="about-history-title">
        <Container width="wide">
          <div className="about-history__layout">
            <div>
              <p className="about-eyebrow">{a.history.eyebrow}</p>
              <h2 id="about-history-title" className="about-section__title">
                {a.history.title}
              </h2>
              <p className="about-section__body">{a.history.body}</p>
            </div>
            <aside className="about-note" data-module="history-note">
              <p>{a.history.note}</p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="about-mission" aria-labelledby="about-mission-title">
        <Container width="wide" className="about-mission__inner">
          <p className="about-eyebrow">{a.mission.eyebrow}</p>
          <h2 id="about-mission-title" className="about-mission__title">
            {a.mission.title}
          </h2>
          <blockquote className="about-mission__statement" data-module="mission">
            {a.mission.statement}
          </blockquote>
        </Container>
      </section>

      <section className="about-section about-goals" aria-labelledby="about-goals-title">
        <Container width="wide">
          <p className="about-eyebrow">{a.goals.eyebrow}</p>
          <h2 id="about-goals-title" className="about-section__title">
            {a.goals.title}
          </h2>
          <p className="about-section__lead">{a.goals.lead}</p>
          <ol className="about-goals__grid" data-module="goals">
            {a.goals.items.map((item, index) => (
              <li key={item.id} className="about-goals__item">
                <span className="about-goals__index">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="about-goals__title">{item.title}</h3>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="about-section about-values about-section--panel" aria-labelledby="about-values-title">
        <Container width="wide">
          <p className="about-eyebrow about-eyebrow--on-light">{a.values.eyebrow}</p>
          <h2 id="about-values-title" className="about-section__title about-section__title--on-light">
            {a.values.title}
          </h2>
          <div className="about-values__grid" data-module="values">
            {a.values.items.map((item) => (
              <article key={item.id} className="about-values__card">
                <h3 className="about-values__title">{item.title}</h3>
                <p className="about-values__text">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-section about-principles" aria-labelledby="about-principles-title">
        <Container width="wide">
          <p className="about-eyebrow">{a.principles.eyebrow}</p>
          <h2 id="about-principles-title" className="about-section__title">
            {a.principles.title}
          </h2>
          <p className="about-section__lead">{a.principles.lead}</p>
          <ul className="about-principles__list" data-module="principles">
            {a.principles.items.map((item) => (
              <li key={item.id} className="about-principles__item">
                <h3 className="about-principles__title">{item.title}</h3>
                <p className="about-principles__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="about-section about-structure" aria-labelledby="about-structure-title">
        <Container width="wide">
          <p className="about-eyebrow">{a.structure.eyebrow}</p>
          <h2 id="about-structure-title" className="about-section__title">
            {a.structure.title}
          </h2>
          <p className="about-section__lead">{a.structure.lead}</p>
          <div className="about-structure__flow" data-module="structure">
            {a.structure.roles.map((role, index) => (
              <div key={role.id} className="about-structure__role">
                <div className="about-structure__node">
                  <span className="about-structure__step">{index + 1}</span>
                  <h3 className="about-structure__role-title">{role.title}</h3>
                  <p className="about-structure__role-text">{role.text}</p>
                </div>
                {index < a.structure.roles.length - 1 ? (
                  <span className="about-structure__connector" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>
          <p className="about-note about-note--inline">{a.structure.note}</p>
        </Container>
      </section>

      <section className="about-section about-interuni" aria-labelledby="about-interuni-title">
        <Container width="wide">
          <div className="about-interuni__layout">
            <div>
              <p className="about-eyebrow">{a.interuni.eyebrow}</p>
              <h2 id="about-interuni-title" className="about-section__title">
                {a.interuni.title}
              </h2>
              <p className="about-section__body">{a.interuni.body}</p>
            </div>
            <ul className="about-interuni__points" data-module="interuni">
              {a.interuni.points.map((point) => (
                <li key={point.title} className="about-interuni__point">
                  <h3 className="about-interuni__point-title">{point.title}</h3>
                  <p className="about-interuni__point-text">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <Container width="wide" className="about-cta__inner">
          <h2 id="about-cta-title" className="about-cta__title">
            {a.cta.title}
          </h2>
          <p className="about-cta__lead">{a.cta.lead}</p>
          <Link to={ROUTES.join} className="shell-btn shell-btn--primary ui-idle ui-idle--cta">
            {a.cta.button}
          </Link>
        </Container>
      </section>
    </div>
  );
}
