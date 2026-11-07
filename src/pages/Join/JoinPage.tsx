import { useEffect, useRef, useState, type FormEvent } from "react";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { uid } from "../../content/store";
import { useLocale } from "../../i18n/LocaleProvider";

export function JoinPage() {
  const { t, locale } = useLocale();
  const { addApplication } = useContent();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [honeypot, setHoneypot] = useState("");
  const started = useRef(Date.now());
  const [form, setForm] = useState({
    fullName: "",
    university: "",
    faculty: "",
    course: "",
    email: "",
    contact: "",
    directions: "",
    experience: "",
    skills: "",
    motivation: "",
    extra: "",
    cvUrl: "",
    consent: false,
  });

  useEffect(() => {
    document.title = `${t.joinPage.title} · ${t.meta.siteName}`;
    started.current = Date.now();
  }, [t, locale]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot || Date.now() - started.current < 1500) {
      setStatus("ok");
      return;
    }
    if (
      !form.fullName.trim() ||
      !form.university.trim() ||
      !form.email.includes("@") ||
      !form.motivation.trim() ||
      !form.consent
    ) {
      setStatus("err");
      return;
    }
    addApplication({
      id: uid(),
      createdAt: new Date().toISOString(),
      status: "new",
      fullName: form.fullName.trim(),
      university: form.university.trim(),
      faculty: form.faculty.trim(),
      course: form.course.trim(),
      email: form.email.trim(),
      contact: form.contact.trim(),
      directions: form.directions.trim(),
      experience: form.experience.trim(),
      skills: form.skills.trim(),
      motivation: form.motivation.trim(),
      extra: form.extra.trim(),
      cvUrl: form.cvUrl.trim(),
      consent: true,
      adminComment: "",
    });
    setForm({
      fullName: "",
      university: "",
      faculty: "",
      course: "",
      email: "",
      contact: "",
      directions: "",
      experience: "",
      skills: "",
      motivation: "",
      extra: "",
      cvUrl: "",
      consent: false,
    });
    setStatus("ok");
  }

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.join}</p>
          <h1 className="cat-title">{t.joinPage.title}</h1>
          <p className="cat-lead">{t.joinPage.lead}</p>
          <p className="cat-lead" style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}>
            {t.joinPage.note}
          </p>

          <form className="cat-detail__block" style={{ marginTop: "1.5rem" }} onSubmit={onSubmit}>
            <h2>{t.joinPage.formTitle}</h2>
            {(
              [
                ["fullName", t.joinPage.fullName, true],
                ["university", t.joinPage.university, true],
                ["faculty", t.joinPage.faculty, false],
                ["course", t.joinPage.course, false],
                ["email", t.joinPage.email, true],
                ["contact", t.joinPage.contact, false],
                ["directions", t.joinPage.directions, false],
                ["experience", t.joinPage.experience, false],
                ["skills", t.joinPage.skills, false],
                ["motivation", t.joinPage.motivation, true],
                ["extra", t.joinPage.extra, false],
                ["cvUrl", t.joinPage.cvUrl, false],
              ] as const
            ).map(([key, label, required]) => (
              <label key={key} className="admin-field">
                <span>
                  {label}
                  {required ? " *" : ""}
                </span>
                {key === "motivation" || key === "experience" || key === "extra" ? (
                  <textarea
                    rows={3}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    required={required}
                  />
                ) : (
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    required={required}
                  />
                )}
              </label>
            ))}
            <label className="admin-field admin-field--check">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
              />
              <span>{t.joinPage.consent}</span>
            </label>
            <label className="admin-hp" aria-hidden="true">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
            <button type="submit" className="shell-btn shell-btn--primary ui-idle ui-idle--cta">
              {t.joinPage.submit}
            </button>
            {status === "ok" ? <p className="form-ok">{t.joinPage.success}</p> : null}
            {status === "err" ? <p className="form-err">{t.joinPage.error}</p> : null}
          </form>
        </Container>
      </section>
    </div>
  );
}
