import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { loc } from "../../content/i18nText";
import { PROJECT_DIRECTION_LABELS } from "../../content/labels";
import {
  MEMBERSHIP_STATUS_LABELS,
  MEMBERSHIP_STATUSES,
  OFFICE_POSITION_BLURBS,
  OFFICE_POSITION_LABELS,
  OFFICE_POSITIONS,
  OFFICE_TIER_LABELS,
  OFFICE_TIER_OF,
  OFFICE_TIER_ORDER,
  sortMembersByHierarchy,
} from "../../content/team";
import type {
  MemberRecord,
  MembershipStatus,
  OfficePosition,
  OfficeTier,
  ProjectDirection,
} from "../../content/types";
import { withLang } from "../../i18n";
import { useLocale } from "../../i18n/LocaleProvider";

const DIRECTIONS = Object.keys(PROJECT_DIRECTION_LABELS) as ProjectDirection[];

type ViewMode = "structure" | "people";

export function MembersPage() {
  const { t, locale } = useLocale();
  const { store } = useContent();
  const [view, setView] = useState<ViewMode>("structure");
  const [position, setPosition] = useState<"all" | OfficePosition | "none">("all");
  const [membership, setMembership] = useState<"all" | MembershipStatus>("all");
  const [direction, setDirection] = useState<"all" | ProjectDirection>("all");
  const [university, setUniversity] = useState("all");
  const [country, setCountry] = useState("all");
  const [q, setQ] = useState("");
  const [moreFilters, setMoreFilters] = useState(false);

  const published = useMemo(
    () => store.members.filter((m) => m.published && m.membershipStatus !== "suspended"),
    [store.members],
  );

  const universities = useMemo(() => {
    const set = new Set<string>();
    published.forEach((m) => {
      const u = loc(m.university, locale).trim();
      if (u) set.add(u);
    });
    return [...set].sort((a, b) => a.localeCompare(b, locale));
  }, [published, locale]);

  const countries = useMemo(() => {
    const set = new Set<string>();
    published.forEach((m) => {
      const c = loc(m.country, locale).trim();
      if (c) set.add(c);
    });
    return [...set].sort((a, b) => a.localeCompare(b, locale));
  }, [published, locale]);

  const items = useMemo(() => {
    return published
      .filter((m) => {
        if (position === "all") return true;
        if (position === "none") return !m.position;
        return m.position === position;
      })
      .filter((m) => (membership === "all" ? true : m.membershipStatus === membership))
      .filter((m) => (direction === "all" ? true : m.direction === direction))
      .filter((m) =>
        university === "all" ? true : loc(m.university, locale).trim() === university,
      )
      .filter((m) => (country === "all" ? true : loc(m.country, locale).trim() === country))
      .filter((m) => {
        const hay = [
          loc(m.name, locale),
          loc(m.university, locale),
          loc(m.country, locale),
          loc(m.city, locale),
          loc(m.representation, locale),
          m.position ? OFFICE_POSITION_LABELS[m.position][locale] : "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      })
      .slice()
      .sort(sortMembersByHierarchy);
  }, [
    published,
    position,
    membership,
    direction,
    university,
    country,
    q,
    locale,
  ]);

  const executive = useMemo(
    () =>
      published
        .filter((m) => m.position && OFFICE_TIER_OF[m.position] === "executive")
        .sort(sortMembersByHierarchy),
    [published],
  );

  const structureGroups = useMemo(() => {
    const groups: { tier: OfficeTier; positions: OfficePosition[] }[] = [];
    for (const tier of OFFICE_TIER_ORDER) {
      const positions = OFFICE_POSITIONS.filter((p) => OFFICE_TIER_OF[p] === tier);
      if (positions.length) groups.push({ tier, positions });
    }
    return groups;
  }, []);

  return (
    <div className="cat team">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.members}</p>
          <h1 className="cat-title">{t.membersPage.title}</h1>
          <p className="cat-lead">{t.membersPage.lead}</p>
          <p className="cat-lead team__disclaimer">{t.membersPage.disclaimer}</p>
          <p className="team__note">{t.membersPage.permissionsNote}</p>

          <div className="cat-toolbar team__view-toggle" role="tablist" aria-label={t.membersPage.title}>
            <button
              type="button"
              role="tab"
              aria-selected={view === "structure"}
              className={`cat-chip${view === "structure" ? " cat-chip--active" : ""}`}
              onClick={() => setView("structure")}
            >
              {t.membersPage.viewStructure}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "people"}
              className={`cat-chip${view === "people" ? " cat-chip--active" : ""}`}
              onClick={() => setView("people")}
            >
              {t.membersPage.viewPeople}
            </button>
          </div>

          {view === "structure" ? (
            <div className="team-structure">
              <h2 className="team-structure__title">{t.membersPage.structureTitle}</h2>
              <p className="cat-lead">{t.membersPage.structureLead}</p>

              {executive.length > 0 ? (
                <div className="team-exec">
                  <h3 className="team-exec__title">{t.membersPage.executiveTitle}</h3>
                  <div className="cat-grid cat-grid--3 team-exec__grid">
                    {executive.map((item) => (
                      <PersonCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : null}

              <ol className="team-tiers">
                {structureGroups.map(({ tier, positions }) => (
                  <li key={tier} className="team-tier">
                    <h3 className="team-tier__title">{OFFICE_TIER_LABELS[tier][locale]}</h3>
                    <ul className="team-tier__positions">
                      {positions.map((pos) => {
                        const holders = published
                          .filter((m) => m.position === pos)
                          .sort(sortMembersByHierarchy);
                        return (
                          <li key={pos} className="team-office">
                            <div className="team-office__head">
                              <p className="team-office__name">{OFFICE_POSITION_LABELS[pos][locale]}</p>
                              <p className="team-office__blurb">{OFFICE_POSITION_BLURBS[pos][locale]}</p>
                            </div>
                            {holders.length ? (
                              <ul className="team-office__people">
                                {holders.map((m) => (
                                  <li key={m.id}>
                                    <Link
                                      to={withLang(`/members/${m.slug}`, locale)}
                                      className="team-office__link"
                                    >
                                      {loc(m.name, locale)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="team-office__vacant">—</p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <>
              <h2 className="team-structure__title">{t.membersPage.peopleTitle}</h2>
              <div className="cat-toolbar">
                <input
                  className="cat-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t.catalog.search}
                  aria-label={t.catalog.search}
                />
                <button
                  type="button"
                  className={`cat-chip${moreFilters ? " cat-chip--active" : ""}`}
                  onClick={() => setMoreFilters((v) => !v)}
                >
                  {t.membersPage.filtersMore}
                </button>
              </div>

              <div className="cat-toolbar">
                <button
                  type="button"
                  className={`cat-chip${position === "all" ? " cat-chip--active" : ""}`}
                  onClick={() => setPosition("all")}
                >
                  {t.catalog.position}
                </button>
                <button
                  type="button"
                  className={`cat-chip${position === "none" ? " cat-chip--active" : ""}`}
                  onClick={() => setPosition("none")}
                >
                  {t.catalog.noOffice}
                </button>
                {OFFICE_POSITIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`cat-chip${position === p ? " cat-chip--active" : ""}`}
                    onClick={() => setPosition(p)}
                  >
                    {OFFICE_POSITION_LABELS[p][locale]}
                  </button>
                ))}
              </div>

              <div className="cat-toolbar">
                <button
                  type="button"
                  className={`cat-chip${membership === "all" ? " cat-chip--active" : ""}`}
                  onClick={() => setMembership("all")}
                >
                  {t.catalog.membership}
                </button>
                {MEMBERSHIP_STATUSES.filter((s) => s !== "suspended").map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`cat-chip${membership === s ? " cat-chip--active" : ""}`}
                    onClick={() => setMembership(s)}
                  >
                    {MEMBERSHIP_STATUS_LABELS[s][locale]}
                  </button>
                ))}
              </div>

              <div className="cat-toolbar">
                <button
                  type="button"
                  className={`cat-chip${direction === "all" ? " cat-chip--active" : ""}`}
                  onClick={() => setDirection("all")}
                >
                  {t.catalog.direction}
                </button>
                {DIRECTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`cat-chip${direction === d ? " cat-chip--active" : ""}`}
                    onClick={() => setDirection(d)}
                  >
                    {PROJECT_DIRECTION_LABELS[d][locale]}
                  </button>
                ))}
              </div>

              {moreFilters ? (
                <>
                  <div className="cat-toolbar">
                    <button
                      type="button"
                      className={`cat-chip${university === "all" ? " cat-chip--active" : ""}`}
                      onClick={() => setUniversity("all")}
                    >
                      {t.catalog.university}
                    </button>
                    {universities.map((u) => (
                      <button
                        key={u}
                        type="button"
                        className={`cat-chip${university === u ? " cat-chip--active" : ""}`}
                        onClick={() => setUniversity(u)}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                  <div className="cat-toolbar">
                    <button
                      type="button"
                      className={`cat-chip${country === "all" ? " cat-chip--active" : ""}`}
                      onClick={() => setCountry("all")}
                    >
                      {t.catalog.country}
                    </button>
                    {countries.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`cat-chip${country === c ? " cat-chip--active" : ""}`}
                        onClick={() => setCountry(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}

              {items.length === 0 ? (
                <div className="cat-empty">
                  <h2 className="cat-empty__title">{t.catalog.emptyTitle}</h2>
                  <p className="cat-empty__body">{t.catalog.emptyBody}</p>
                </div>
              ) : (
                <div className="cat-grid cat-grid--3">
                  {items.map((item) => (
                    <PersonCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}

function PersonCard({ item }: { item: MemberRecord }) {
  const { t, locale } = useLocale();

  return (
    <Link
      to={withLang(`/members/${item.slug}`, locale)}
      className="cat-card team-card"
      data-cursor="pointer"
    >
      <div className="cat-card__cover team-card__photo">
        {item.photoUrl ? (
          <img src={item.photoUrl} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="team-card__initials" aria-hidden="true">
            {(loc(item.name, locale) || "?").slice(0, 1)}
          </span>
        )}
      </div>
      <div className="cat-card__meta">
        {item.position ? (
          <span className="cat-badge">{OFFICE_POSITION_LABELS[item.position][locale]}</span>
        ) : (
          <span className="cat-badge cat-badge--muted">{t.catalog.noOffice}</span>
        )}
        <span className="cat-badge cat-badge--muted">
          {MEMBERSHIP_STATUS_LABELS[item.membershipStatus][locale]}
        </span>
      </div>
      <h2 className="cat-card__title">{loc(item.name, locale)}</h2>
      <p className="cat-card__text">
        {[loc(item.university, locale), loc(item.city, locale), loc(item.country, locale)]
          .filter(Boolean)
          .join(" · ")}
      </p>
      {loc(item.representation, locale) ? (
        <p className="cat-card__foot">
          {t.catalog.representation}: {loc(item.representation, locale)}
        </p>
      ) : null}
    </Link>
  );
}
