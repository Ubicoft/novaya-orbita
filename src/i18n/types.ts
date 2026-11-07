export type Locale = "ru" | "tj" | "en";

export type NavKey =
  | "home"
  | "about"
  | "directions"
  | "events"
  | "projects"
  | "members"
  | "partners"
  | "news"
  | "contacts"
  | "join";

export type Dictionary = {
  meta: {
    siteName: string;
    shortDescription: string;
  };
  nav: Record<NavKey, string>;
  header: {
    openMenu: string;
    closeMenu: string;
    more: string;
    language: string;
    theme: string;
  };
  themes: {
    winter: string;
    blue: string;
    pink: string;
    green: string;
  };
  footer: {
    quickLinks: string;
    contacts: string;
    contactsSoon: string;
    rights: string;
    designSystem: string;
  };
  stub: {
    eyebrow: string;
    title: string;
    body: string;
    backHome: string;
  };
  pages: Record<
    NavKey,
    {
      title: string;
      description: string;
    }
  >;
  langNames: Record<Locale, string>;
};
