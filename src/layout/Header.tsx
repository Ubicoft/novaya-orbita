import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo/BrandLogo";
import {
  ALL_NAV,
  PRIMARY_NAV,
  ROUTES,
  SECONDARY_NAV,
  type Locale,
  type NavKey,
} from "../i18n";
import { useLocale } from "../i18n/LocaleProvider";
import { useTheme } from "../theme/ThemeProvider";
import type { ThemeId } from "../theme/types";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function navClass({ isActive }: { isActive: boolean }) {
  return `glass-header__link${isActive ? " glass-header__link--active" : ""}`;
}

function mobileNavClass({ isActive }: { isActive: boolean }) {
  return `mobile-nav__link${isActive ? " mobile-nav__link--active" : ""}`;
}

export function Header() {
  const { t, locale, locales, setLocale } = useLocale();
  const { theme, themes, setTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const langMenuId = useId();
  const themeMenuId = useId();
  const moreMenuId = useId();

  const secondaryActive = SECONDARY_NAV.some(
    (key) => ROUTES[key] === location.pathname,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
    setThemeOpen(false);
    setMoreOpen(false);
  }, [location.pathname, locale, theme]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-lock", mobileOpen);
    return () => document.body.classList.remove("mobile-nav-lock");
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen && !themeOpen && !moreOpen) return;
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langOpen && langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }
      if (themeOpen && themeRef.current && !themeRef.current.contains(target)) {
        setThemeOpen(false);
      }
      if (moreOpen && moreRef.current && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangOpen(false);
        setThemeOpen(false);
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen, themeOpen, moreOpen]);

  const renderNavLink = (key: NavKey, classNameFn = navClass) => (
    <NavLink
      key={key}
      to={ROUTES[key]}
      className={classNameFn}
      end={key === "home"}
    >
      {t.nav[key]}
    </NavLink>
  );

  return (
    <>
      <header
        className={`glass-header${scrolled ? " glass-header--scrolled" : ""}`}
      >
        <div className="glass-header__bar">
          <BrandLogo size="header" className="ui-idle" />

          <nav className="glass-header__nav" aria-label="Primary">
            {PRIMARY_NAV.map((key) => renderNavLink(key))}
            <div className="glass-header__nav--wide-only">
              {SECONDARY_NAV.map((key) => renderNavLink(key))}
            </div>
            <div className="nav-more" ref={moreRef}>
              <button
                type="button"
                className={`nav-more__button ui-idle${secondaryActive ? " nav-more__button--active" : ""}`}
                aria-expanded={moreOpen}
                aria-controls={moreMenuId}
                onClick={() => setMoreOpen((v) => !v)}
              >
                {t.header.more}
                <Chevron className="glass-chip__chevron" />
              </button>
              {moreOpen ? (
                <div id={moreMenuId} className="nav-more__menu" role="menu">
                  {SECONDARY_NAV.map((key) => renderNavLink(key))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className="glass-header__actions">
            <div className="glass-chip" ref={themeRef}>
              <button
                type="button"
                className="glass-chip__btn ui-idle"
                aria-expanded={themeOpen}
                aria-controls={themeMenuId}
                aria-label={t.header.theme}
                onClick={() => {
                  setThemeOpen((v) => !v);
                  setLangOpen(false);
                }}
              >
                <span className={`glass-chip__swatch glass-chip__swatch--${theme}`} />
                <span className="glass-chip__theme-code">
                  {theme === "winter" ? "❄" : theme}
                </span>
                <Chevron className="glass-chip__chevron" />
              </button>
              {themeOpen ? (
                <div id={themeMenuId} className="glass-chip__menu" role="listbox">
                  {themes.map((id: ThemeId) => (
                    <button
                      key={id}
                      type="button"
                      role="option"
                      aria-selected={id === theme}
                      className={`glass-chip__option${id === theme ? " glass-chip__option--active" : ""}`}
                      onClick={() => {
                        setTheme(id);
                        setThemeOpen(false);
                      }}
                    >
                      <span>{t.themes[id]}</span>
                      <span className={`glass-chip__swatch glass-chip__swatch--${id}`} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="glass-chip" ref={langRef}>
              <button
                type="button"
                className="glass-chip__btn ui-idle"
                aria-expanded={langOpen}
                aria-controls={langMenuId}
                aria-label={t.header.language}
                onClick={() => {
                  setLangOpen((v) => !v);
                  setThemeOpen(false);
                }}
              >
                {locale}
                <Chevron className="glass-chip__chevron" />
              </button>
              {langOpen ? (
                <div id={langMenuId} className="glass-chip__menu" role="listbox">
                  {locales.map((code: Locale) => (
                    <button
                      key={code}
                      type="button"
                      role="option"
                      aria-selected={code === locale}
                      className={`glass-chip__option${code === locale ? " glass-chip__option--active" : ""}`}
                      onClick={() => {
                        setLocale(code);
                        setLangOpen(false);
                      }}
                    >
                      <span>{t.langNames[code]}</span>
                      <span style={{ opacity: 0.6, fontSize: "0.75rem" }}>
                        {code}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              to={ROUTES.join}
              className="glass-header__cta shell-btn shell-btn--primary ui-idle ui-idle--cta"
            >
              {t.nav.join}
            </Link>

            <button
              type="button"
              className="glass-header__menu-toggle ui-idle"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? t.header.closeMenu : t.header.openMenu}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav${mobileOpen ? " mobile-nav--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="mobile-nav__backdrop"
          aria-label={t.header.closeMenu}
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />
        <div
          id="mobile-nav-panel"
          className="mobile-nav__panel"
          role="dialog"
          aria-modal="true"
          aria-label={t.header.openMenu}
        >
          <div className="mobile-nav__top">
            <BrandLogo size="mobile" onNavigate={() => setMobileOpen(false)} />
            <button
              type="button"
              className="glass-header__menu-toggle ui-idle"
              aria-label={t.header.closeMenu}
              onClick={() => setMobileOpen(false)}
            >
              <MenuIcon open />
            </button>
          </div>

          <nav className="mobile-nav__list" aria-label="Mobile">
            {ALL_NAV.filter((k) => k !== "join").map((key) =>
              renderNavLink(key, mobileNavClass),
            )}
          </nav>

          <div className="mobile-nav__cta">
            <Link
              to={ROUTES.join}
              className="shell-btn shell-btn--primary shell-btn--block ui-idle ui-idle--cta"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.join}
            </Link>
          </div>

          <div className="mobile-nav__meta">
            <div>
              <p className="mobile-nav__meta-label">{t.header.theme}</p>
              <div className="mobile-nav__themes">
                {themes.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`mobile-nav__pill${id === theme ? " mobile-nav__pill--active" : ""}`}
                    onClick={() => setTheme(id)}
                  >
                    {t.themes[id]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mobile-nav__meta-label">{t.header.language}</p>
              <div className="mobile-nav__langs">
                {locales.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`mobile-nav__pill${code === locale ? " mobile-nav__pill--active" : ""}`}
                    onClick={() => setLocale(code)}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
