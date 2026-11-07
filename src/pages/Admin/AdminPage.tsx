import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import { APPLICATION_STATUS_LABELS } from "../../content/labels";
import { slugify, uid } from "../../content/store";
import {
  emptyLocalized,
  type ApplicationStatus,
  type EventRecord,
  type LocalizedString,
  type MemberRole,
  type NewsRecord,
  type ProjectRecord,
} from "../../content/types";
import { useLocale } from "../../i18n/LocaleProvider";

export function AdminPage() {
  const { t } = useLocale();
  const { admin, tryUnlock, logoutAdmin } = useContent();
  const [key, setKey] = useState("");
  const [err, setErr] = useState(false);

  if (!admin) {
    return (
      <div className="admin-shell">
        <form
          className="admin-login"
          onSubmit={(e) => {
            e.preventDefault();
            const ok = tryUnlock(key);
            setErr(!ok);
          }}
        >
          <h1>{t.admin.unlock}</h1>
          <p>{t.admin.hint}</p>
          <label className="admin-field">
            <span>{t.admin.password}</span>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="shell-btn shell-btn--primary">
            {t.admin.enter}
          </button>
          {err ? <p className="form-err">Invalid key</p> : null}
          <Link to="/">{t.stub.backHome}</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <p className="admin-nav__title">{t.admin.title}</p>
        <NavLink to="/admin" end className={navClass}>
          {t.admin.navOverview}
        </NavLink>
        <NavLink to="/admin/events" className={navClass}>
          {t.admin.navEvents}
        </NavLink>
        <NavLink to="/admin/projects" className={navClass}>
          {t.admin.navProjects}
        </NavLink>
        <NavLink to="/admin/members" className={navClass}>
          {t.admin.navMembers}
        </NavLink>
        <NavLink to="/admin/partners" className={navClass}>
          {t.admin.navPartners}
        </NavLink>
        <NavLink to="/admin/news" className={navClass}>
          {t.admin.navNews}
        </NavLink>
        <NavLink to="/admin/contacts" className={navClass}>
          {t.admin.navContacts}
        </NavLink>
        <NavLink to="/admin/feedback" className={navClass}>
          {t.admin.navFeedback}
        </NavLink>
        <NavLink to="/admin/applications" className={navClass}>
          {t.admin.navApplications}
        </NavLink>
        <button type="button" className="admin-nav__logout" onClick={logoutAdmin}>
          {t.admin.logout}
        </button>
        <Link to="/" className="admin-nav__home">
          {t.stub.backHome}
        </Link>
      </aside>
      <main className="admin-main">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="members" element={<MembersAdmin />} />
          <Route path="partners" element={<PartnersAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="contacts" element={<ContactsAdmin />} />
          <Route path="feedback" element={<FeedbackAdmin />} />
          <Route path="applications" element={<ApplicationsAdmin />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function navClass({ isActive }: { isActive: boolean }) {
  return `admin-nav__link${isActive ? " is-active" : ""}`;
}

function Overview() {
  const { t } = useLocale();
  const { store } = useContent();
  const cards = [
    [t.admin.navEvents, store.events.length],
    [t.admin.navProjects, store.projects.length],
    [t.admin.navMembers, store.members.length],
    [t.admin.navPartners, store.partners.length],
    [t.admin.navNews, store.news.length],
    [t.admin.navFeedback, store.feedback.filter((f) => !f.read).length],
    [t.admin.navApplications, store.applications.filter((a) => a.status === "new").length],
  ] as const;
  return (
    <div>
      <h1>{t.admin.navOverview}</h1>
      <p className="admin-hint">{t.admin.hint}</p>
      <div className="admin-cards">
        {cards.map(([label, n]) => (
          <div key={label} className="admin-card">
            <strong>{n}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocalizedFields({
  value,
  onChange,
  label,
}: {
  value: LocalizedString;
  onChange: (next: LocalizedString) => void;
  label: string;
}) {
  return (
    <fieldset className="admin-l10n">
      <legend>{label}</legend>
      {(["ru", "tj", "en"] as const).map((lang) => (
        <label key={lang} className="admin-field">
          <span>{lang.toUpperCase()}</span>
          <textarea
            rows={2}
            value={value[lang]}
            onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
          />
        </label>
      ))}
    </fieldset>
  );
}

function EventsAdmin() {
  const { t } = useLocale();
  const { store, upsertEvent, removeEvent } = useContent();
  const blank = (): EventRecord => ({
    id: uid(),
    slug: `event-${Date.now().toString(36)}`,
    published: false,
    category: "education",
    status: "upcoming",
    coverUrl: "",
    startDate: "",
    endDate: "",
    location: emptyLocalized(),
    title: emptyLocalized(),
    summary: emptyLocalized(),
    body: emptyLocalized(),
    goals: emptyLocalized(),
    program: emptyLocalized(),
    organizers: emptyLocalized(),
    participation: emptyLocalized(),
    results: emptyLocalized(),
    mediaUrls: [],
    updatedAt: new Date().toISOString(),
  });
  const [draft, setDraft] = useState<EventRecord>(blank());

  return (
    <AdminCrud
      title={t.admin.navEvents}
      items={store.events.map((e) => ({
        id: e.id,
        label: e.title.ru || e.slug,
        published: e.published,
      }))}
      onCreate={() => setDraft(blank())}
      onEdit={(id) => setDraft(store.events.find((e) => e.id === id) || blank())}
      onRemove={removeEvent}
      form={
        <form
          className="admin-form"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const slug = slugify(draft.title.ru || draft.slug);
            upsertEvent({ ...draft, slug, updatedAt: new Date().toISOString() });
            setDraft(blank());
          }}
        >
          <label className="admin-field admin-field--check">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
            />
            <span>{t.admin.published}</span>
          </label>
          <LocalizedFields
            label="Title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <LocalizedFields
            label="Summary"
            value={draft.summary}
            onChange={(summary) => setDraft({ ...draft, summary })}
          />
          <LocalizedFields label="Body" value={draft.body} onChange={(body) => setDraft({ ...draft, body })} />
          <LocalizedFields
            label="Location"
            value={draft.location}
            onChange={(location) => setDraft({ ...draft, location })}
          />
          <div className="admin-row">
            <label className="admin-field">
              <span>Category</span>
              <select
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value as EventRecord["category"] })}
              >
                <option value="conference">conference</option>
                <option value="forum">forum</option>
                <option value="debate">debate</option>
                <option value="education">education</option>
                <option value="contest">contest</option>
                <option value="social">social</option>
                <option value="international">international</option>
                <option value="culture">culture</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Status</span>
              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value as EventRecord["status"] })}
              >
                <option value="upcoming">upcoming</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </label>
          </div>
          <div className="admin-row">
            <label className="admin-field">
              <span>Start</span>
              <input
                type="date"
                value={draft.startDate}
                onChange={(e) => setDraft({ ...draft, startDate: e.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>End</span>
              <input
                type="date"
                value={draft.endDate}
                onChange={(e) => setDraft({ ...draft, endDate: e.target.value })}
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Cover URL</span>
            <input
              value={draft.coverUrl}
              onChange={(e) => setDraft({ ...draft, coverUrl: e.target.value })}
            />
          </label>
          <button type="submit" className="shell-btn shell-btn--primary">
            {t.admin.save}
          </button>
        </form>
      }
    />
  );
}

function ProjectsAdmin() {
  const { t } = useLocale();
  const { store, upsertProject, removeProject } = useContent();
  const blank = (): ProjectRecord => ({
    id: uid(),
    slug: `project-${Date.now().toString(36)}`,
    published: false,
    direction: "projects",
    status: "planned",
    coverUrl: "",
    launchDate: "",
    progress: 0,
    title: emptyLocalized(),
    summary: emptyLocalized(),
    idea: emptyLocalized(),
    problem: emptyLocalized(),
    goals: emptyLocalized(),
    workAreas: emptyLocalized(),
    stages: emptyLocalized(),
    team: emptyLocalized(),
    results: emptyLocalized(),
    joinInfo: emptyLocalized(),
    mediaUrls: [],
    updatedAt: new Date().toISOString(),
  });
  const [draft, setDraft] = useState<ProjectRecord>(blank());

  return (
    <AdminCrud
      title={t.admin.navProjects}
      items={store.projects.map((e) => ({
        id: e.id,
        label: e.title.ru || e.slug,
        published: e.published,
      }))}
      onCreate={() => setDraft(blank())}
      onEdit={(id) => setDraft(store.projects.find((e) => e.id === id) || blank())}
      onRemove={removeProject}
      form={
        <form
          className="admin-form"
          onSubmit={(e) => {
            e.preventDefault();
            upsertProject({
              ...draft,
              slug: slugify(draft.title.ru || draft.slug),
              updatedAt: new Date().toISOString(),
            });
            setDraft(blank());
          }}
        >
          <label className="admin-field admin-field--check">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
            />
            <span>{t.admin.published}</span>
          </label>
          <LocalizedFields label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
          <LocalizedFields
            label="Summary"
            value={draft.summary}
            onChange={(summary) => setDraft({ ...draft, summary })}
          />
          <LocalizedFields label="Idea" value={draft.idea} onChange={(idea) => setDraft({ ...draft, idea })} />
          <div className="admin-row">
            <label className="admin-field">
              <span>Direction</span>
              <select
                value={draft.direction}
                onChange={(e) =>
                  setDraft({ ...draft, direction: e.target.value as ProjectRecord["direction"] })
                }
              >
                <option value="education">education</option>
                <option value="debate">debate</option>
                <option value="international">international</option>
                <option value="science">science</option>
                <option value="social">social</option>
                <option value="projects">projects</option>
                <option value="leadership">leadership</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Status</span>
              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value as ProjectRecord["status"] })}
              >
                <option value="planned">planned</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
                <option value="paused">paused</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Progress %</span>
              <input
                type="number"
                min={0}
                max={100}
                value={draft.progress}
                onChange={(e) => setDraft({ ...draft, progress: Number(e.target.value) || 0 })}
              />
            </label>
          </div>
          <button type="submit" className="shell-btn shell-btn--primary">
            {t.admin.save}
          </button>
        </form>
      }
    />
  );
}

function MembersAdmin() {
  const { t } = useLocale();
  const { store, upsertMember, removeMember } = useContent();
  const [nameRu, setNameRu] = useState("");
  const [role, setRole] = useState("member");
  const [published, setPublished] = useState(false);

  return (
    <div>
      <h1>{t.admin.navMembers}</h1>
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nameRu.trim()) return;
          const id = uid();
          upsertMember({
            id,
            slug: slugify(nameRu),
            published,
            role: role as MemberRole,
            photoUrl: "",
            name: { ru: nameRu, tj: nameRu, en: nameRu },
            university: emptyLocalized(),
            direction: "",
            bio: emptyLocalized(),
            interests: emptyLocalized(),
            publicProfiles: "",
            updatedAt: new Date().toISOString(),
          });
          setNameRu("");
          setPublished(false);
        }}
      >
        <label className="admin-field">
          <span>Name (RU seed)</span>
          <input value={nameRu} onChange={(e) => setNameRu(e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="leadership">leadership</option>
            <option value="coordination">coordination</option>
            <option value="direction-lead">direction-lead</option>
            <option value="project-coordinator">project-coordinator</option>
            <option value="member">member</option>
          </select>
        </label>
        <label className="admin-field admin-field--check">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          <span>{t.admin.published}</span>
        </label>
        <button type="submit" className="shell-btn shell-btn--primary">
          {t.admin.create}
        </button>
      </form>
      <ItemList
        empty={t.admin.empty}
        items={store.members.map((m) => ({
          id: m.id,
          label: `${m.name.ru || m.slug} · ${m.published ? t.admin.published : t.admin.draft}`,
        }))}
        onRemove={removeMember}
      />
    </div>
  );
}

function PartnersAdmin() {
  const { t } = useLocale();
  const { store, upsertPartner, removePartner } = useContent();
  const [nameRu, setNameRu] = useState("");
  const [published, setPublished] = useState(false);

  return (
    <div>
      <h1>{t.admin.navPartners}</h1>
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nameRu.trim()) return;
          upsertPartner({
            id: uid(),
            slug: slugify(nameRu),
            published,
            category: "university",
            logoUrl: "",
            name: { ru: nameRu, tj: nameRu, en: nameRu },
            description: emptyLocalized(),
            cooperation: emptyLocalized(),
            website: "",
            updatedAt: new Date().toISOString(),
          });
          setNameRu("");
          setPublished(false);
        }}
      >
        <label className="admin-field">
          <span>Name (RU seed)</span>
          <input value={nameRu} onChange={(e) => setNameRu(e.target.value)} />
        </label>
        <label className="admin-field admin-field--check">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          <span>{t.admin.published}</span>
        </label>
        <button type="submit" className="shell-btn shell-btn--primary">
          {t.admin.create}
        </button>
      </form>
      <ItemList
        empty={t.admin.empty}
        items={store.partners.map((m) => ({
          id: m.id,
          label: `${m.name.ru || m.slug} · ${m.published ? t.admin.published : t.admin.draft}`,
        }))}
        onRemove={removePartner}
      />
    </div>
  );
}

function NewsAdmin() {
  const { t } = useLocale();
  const { store, upsertNews, removeNews } = useContent();
  const blank = (): NewsRecord => ({
    id: uid(),
    slug: `news-${Date.now().toString(36)}`,
    status: "draft",
    format: "article",
    coverUrl: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    title: emptyLocalized(),
    summary: emptyLocalized(),
    body: emptyLocalized(),
    videoUrl: "",
    updatedAt: new Date().toISOString(),
  });
  const [draft, setDraft] = useState<NewsRecord>(blank());

  return (
    <AdminCrud
      title={t.admin.navNews}
      items={store.news.map((e) => ({
        id: e.id,
        label: e.title.ru || e.slug,
        published: e.status === "published",
      }))}
      onCreate={() => setDraft(blank())}
      onEdit={(id) => setDraft(store.news.find((e) => e.id === id) || blank())}
      onRemove={removeNews}
      form={
        <form
          className="admin-form"
          onSubmit={(e) => {
            e.preventDefault();
            upsertNews({
              ...draft,
              slug: slugify(draft.title.ru || draft.slug),
              updatedAt: new Date().toISOString(),
            });
            setDraft(blank());
          }}
        >
          <label className="admin-field">
            <span>Status</span>
            <select
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value as NewsRecord["status"] })}
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Format</span>
            <select
              value={draft.format}
              onChange={(e) => setDraft({ ...draft, format: e.target.value as NewsRecord["format"] })}
            >
              <option value="article">article</option>
              <option value="report">report</option>
              <option value="interview">interview</option>
            </select>
          </label>
          <LocalizedFields label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
          <LocalizedFields
            label="Summary"
            value={draft.summary}
            onChange={(summary) => setDraft({ ...draft, summary })}
          />
          <LocalizedFields label="Body" value={draft.body} onChange={(body) => setDraft({ ...draft, body })} />
          <label className="admin-field">
            <span>Cover URL</span>
            <input value={draft.coverUrl} onChange={(e) => setDraft({ ...draft, coverUrl: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Video URL</span>
            <input value={draft.videoUrl} onChange={(e) => setDraft({ ...draft, videoUrl: e.target.value })} />
          </label>
          <button type="submit" className="shell-btn shell-btn--primary">
            {t.admin.save}
          </button>
        </form>
      }
    />
  );
}

function ContactsAdmin() {
  const { t, locale } = useLocale();
  const { store, saveContacts } = useContent();
  const [draft, setDraft] = useState(store.contacts);

  return (
    <div>
      <h1>{t.admin.navContacts}</h1>
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          saveContacts(draft);
        }}
      >
        <LocalizedFields label="Email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
        <LocalizedFields label="Phone" value={draft.phone} onChange={(phone) => setDraft({ ...draft, phone })} />
        <LocalizedFields
          label="Address"
          value={draft.address}
          onChange={(address) => setDraft({ ...draft, address })}
        />
        <LocalizedFields label="Hours" value={draft.hours} onChange={(hours) => setDraft({ ...draft, hours })} />
        <LocalizedFields label="Note" value={draft.note} onChange={(note) => setDraft({ ...draft, note })} />
        <p className="admin-hint">Preview ({locale}): {draft.note[locale]}</p>
        <button type="submit" className="shell-btn shell-btn--primary">
          {t.admin.save}
        </button>
      </form>
    </div>
  );
}

function FeedbackAdmin() {
  const { t } = useLocale();
  const { store, markFeedbackRead, removeFeedback } = useContent();
  return (
    <div>
      <h1>{t.admin.navFeedback}</h1>
      {store.feedback.length === 0 ? <p>{t.admin.empty}</p> : null}
      <ul className="admin-list">
        {store.feedback.map((f) => (
          <li key={f.id} className="admin-list__item">
            <div>
              <strong>
                {f.name} · {f.email}
              </strong>
              <p>{f.subject}</p>
              <p>{f.message}</p>
              <small>{f.createdAt}</small>
            </div>
            <div className="admin-list__actions">
              {!f.read ? (
                <button type="button" onClick={() => markFeedbackRead(f.id)}>
                  Mark read
                </button>
              ) : null}
              <button type="button" onClick={() => removeFeedback(f.id)}>
                {t.admin.remove}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApplicationsAdmin() {
  const { t, locale } = useLocale();
  const { store, updateApplication, removeApplication } = useContent();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      store.applications.filter((a) =>
        `${a.fullName} ${a.email} ${a.university}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [store.applications, q],
  );

  return (
    <div>
      <h1>{t.admin.navApplications}</h1>
      <input
        className="cat-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.catalog.search}
      />
      {filtered.length === 0 ? <p>{t.admin.empty}</p> : null}
      <ul className="admin-list">
        {filtered.map((a) => (
          <li key={a.id} className="admin-list__item">
            <div>
              <strong>
                {a.fullName} · {APPLICATION_STATUS_LABELS[a.status][locale]}
              </strong>
              <p>
                {a.university} / {a.faculty} / {a.course}
              </p>
              <p>
                {a.email} · {a.contact}
              </p>
              <p>{a.motivation}</p>
              <label className="admin-field">
                <span>Status</span>
                <select
                  value={a.status}
                  onChange={(e) =>
                    updateApplication({ ...a, status: e.target.value as ApplicationStatus })
                  }
                >
                  <option value="new">new</option>
                  <option value="review">review</option>
                  <option value="clarify">clarify</option>
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Admin comment</span>
                <textarea
                  rows={2}
                  value={a.adminComment}
                  onChange={(e) => updateApplication({ ...a, adminComment: e.target.value })}
                />
              </label>
            </div>
            <button type="button" onClick={() => removeApplication(a.id)}>
              {t.admin.remove}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminCrud({
  title,
  items,
  onCreate,
  onEdit,
  onRemove,
  form,
}: {
  title: string;
  items: Array<{ id: string; label: string; published: boolean }>;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  form: ReactNode;
}) {
  const { t } = useLocale();
  return (
    <div>
      <div className="admin-head">
        <h1>{title}</h1>
        <button type="button" className="shell-btn shell-btn--secondary" onClick={onCreate}>
          {t.admin.create}
        </button>
      </div>
      {form}
      <ItemList
        empty={t.admin.empty}
        items={items.map((i) => ({
          id: i.id,
          label: `${i.label} · ${i.published ? t.admin.published : t.admin.draft}`,
          onEdit: () => onEdit(i.id),
        }))}
        onRemove={onRemove}
      />
    </div>
  );
}

function ItemList({
  items,
  onRemove,
  empty,
}: {
  items: Array<{ id: string; label: string; onEdit?: () => void }>;
  onRemove: (id: string) => void;
  empty: string;
}) {
  const { t } = useLocale();
  if (items.length === 0) return <p>{empty}</p>;
  return (
    <ul className="admin-list">
      {items.map((item) => (
        <li key={item.id} className="admin-list__item">
          <span>{item.label}</span>
          <div className="admin-list__actions">
            {item.onEdit ? (
              <button type="button" onClick={item.onEdit}>
                Edit
              </button>
            ) : null}
            <button type="button" onClick={() => onRemove(item.id)}>
              {t.admin.remove}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
