import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo/BrandLogo";
import {
  ALL_NAV,
  PRIMARY_NAV,
  ROUTES,
  SECONDARY_NAV,
  type ForumNavKey,
  type Locale,
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
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

  const secondaryActive = SECONDARY_NAV.some((key) => ROUTES[key] === location.pathname);

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
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langOpen && langRef.current && !langRef.current.contains(target)) setLangOpen(false);
      if (themeOpen && themeRef.current && !themeRef.current.contains(target)) setThemeOpen(false);
      if (moreOpen && moreRef.current && !moreRef.current.contains(target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [langOpen, themeOpen, moreOpen]);

  return (
    <>
      <header className={`glass-header${scrolled ? " glass-header--scrolled" : ""}`}>
        <div className="glass-header__bar">
          <BrandLogo size="header" />

          <nav className="glass-header__nav" aria-label={t.header.primaryNav}>
            {PRIMARY_NAV.map((key: ForumNavKey) => (
              <NavLink key={key} to={ROUTES[key]} className={navClass} end={key === "home"}>
                {t.nav[key]}
              </NavLink>
            ))}
            <div className="nav-more" ref={moreRef}>
              <button
                type="button"
                className={`nav-more__button ui-idle${secondaryActive ? " nav-more__button--active" : ""}`}
                aria-expanded={moreOpen}
                aria-controls={moreMenuId}
                onClick={() => {
                  setMoreOpen((v) => !v);
                  setLangOpen(false);
                  setThemeOpen(false);
                }}
              >
                {t.header.more}
                <Chevron className="glass-chip__chevron" />
              </button>
              {moreOpen ? (
                <div id={moreMenuId} className="nav-more__menu" role="menu">
                  {SECONDARY_NAV.map((key) => (
                    <NavLink
                      key={key}
                      to={ROUTES[key]}
                      role="menuitem"
                      className={({ isActive }) =>
                        `nav-more__link${isActive ? " nav-more__link--active" : ""}`
                      }
                      onClick={() => setMoreOpen(false)}
                    >
                      {t.nav[key]}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className="glass-header__tools">
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
                      <span style={{ opacity: 0.6, fontSize: "0.75rem" }}>{code}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className="glass-header__ghost ui-idle"
              title={t.header.comingSoon}
              aria-label={t.header.notifications}
              disabled
            >
              <BellIcon />
            </button>

            <button
              type="button"
              className="glass-header__ghost ui-idle"
              title={t.header.comingSoon}
              disabled
            >
              {t.header.login}
            </button>
            <button
              type="button"
              className="glass-header__cta shell-btn shell-btn--primary ui-idle ui-idle--cta"
              title={t.header.comingSoon}
              disabled
            >
              {t.header.register}
            </button>

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

      <div className={`mobile-nav${mobileOpen ? " mobile-nav--open" : ""}`} aria-hidden={!mobileOpen}>
        <button
          type="button"
          className="mobile-nav__backdrop"
          aria-label={t.header.closeMenu}
          onClick={() => setMobileOpen(false)}
        />
        <div id="mobile-nav-panel" className="mobile-nav__panel" role="dialog" aria-modal="true">
          <div className="mobile-nav__top">
            <BrandLogo size="mobile" onNavigate={() => setMobileOpen(false)} />
            <button
              type="button"
              className="mobile-nav__close ui-idle"
              aria-label={t.header.closeMenu}
              onClick={() => setMobileOpen(false)}
            >
              <MenuIcon open />
            </button>
          </div>
          <nav className="mobile-nav__list" aria-label={t.header.mobileNav}>
            {ALL_NAV.map((key) => (
              <NavLink
                key={key}
                to={ROUTES[key]}
                className={mobileNavClass}
                end={key === "home"}
                onClick={() => setMobileOpen(false)}
              >
                {t.nav[key]}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-nav__meta">
            <p className="mobile-nav__meta-label">{t.header.language}</p>
            <div className="mobile-nav__langs">
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`mobile-nav__chip${code === locale ? " mobile-nav__chip--active" : ""}`}
                  onClick={() => setLocale(code)}
                >
                  {code}
                </button>
              ))}
            </div>
            <p className="mobile-nav__meta-label">{t.header.theme}</p>
            <div className="mobile-nav__langs">
              {themes.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`mobile-nav__chip${id === theme ? " mobile-nav__chip--active" : ""}`}
                  onClick={() => setTheme(id)}
                >
                  {t.themes[id]}
                </button>
              ))}
            </div>
            <p className="mobile-nav__soon">{t.header.comingSoon}</p>
            <div className="mobile-nav__auth">
              <button type="button" className="shell-btn" disabled>
                {t.header.login}
              </button>
              <button type="button" className="shell-btn shell-btn--primary" disabled>
                {t.header.register}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7Zm6 11a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
