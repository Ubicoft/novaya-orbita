import { useEffect, useRef, useState, type FormEvent } from "react";
import { Container } from "../../components/Container/Container";
import { useContent } from "../../content/ContentProvider";
import { loc } from "../../content/i18nText";
import { uid } from "../../content/store";
import { useLocale } from "../../i18n/LocaleProvider";

export function ContactsPage() {
  const { t, locale } = useLocale();
  const { store, addFeedback } = useContent();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
  }, [locale]);

  const c = store.contacts;
  const hasPublic =
    loc(c.email, locale) || loc(c.phone, locale) || loc(c.address, locale) || loc(c.hours, locale);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const tooFast = Date.now() - started.current < 1200;
    if (honeypot || tooFast) {
      setStatus("ok");
      return;
    }
    if (!name.trim() || !email.includes("@") || !message.trim()) {
      setStatus("err");
      return;
    }
    addFeedback({
      id: uid(),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      read: false,
    });
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setStatus("ok");
  }

  return (
    <div className="cat">
      <section className="cat-hero">
        <Container width="wide">
          <p className="cat-eyebrow">{t.nav.contacts}</p>
          <h1 className="cat-title">{t.contactsPage.title}</h1>
          <p className="cat-lead">{t.contactsPage.lead}</p>

          <div className="cat-grid" style={{ marginTop: "1.5rem" }}>
            <div className="cat-detail__block">
              {hasPublic ? (
                <>
                  {loc(c.email, locale) ? (
                    <p>
                      {t.contactsPage.email}: {loc(c.email, locale)}
                    </p>
                  ) : null}
                  {loc(c.phone, locale) ? (
                    <p>
                      {t.contactsPage.phone}: {loc(c.phone, locale)}
                    </p>
                  ) : null}
                  {loc(c.address, locale) ? <p>{loc(c.address, locale)}</p> : null}
                  {loc(c.hours, locale) ? <p>{loc(c.hours, locale)}</p> : null}
                </>
              ) : (
                <p>{loc(c.note, locale)}</p>
              )}
              {hasPublic && loc(c.note, locale) ? (
                <p style={{ marginTop: "0.75rem" }}>{loc(c.note, locale)}</p>
              ) : null}
            </div>

            <form className="cat-detail__block" onSubmit={onSubmit} noValidate>
              <h2>{t.contactsPage.formTitle}</h2>
              <label className="admin-field">
                <span>{t.contactsPage.name}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label className="admin-field">
                <span>{t.contactsPage.email}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="admin-field">
                <span>{t.contactsPage.subject}</span>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} />
              </label>
              <label className="admin-field">
                <span>{t.contactsPage.message}</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>
              <label className="admin-hp" aria-hidden="true">
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
              <button type="submit" className="shell-btn shell-btn--primary">
                {t.contactsPage.send}
              </button>
              {status === "ok" ? <p className="form-ok">{t.contactsPage.success}</p> : null}
              {status === "err" ? <p className="form-err">{t.contactsPage.error}</p> : null}
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
