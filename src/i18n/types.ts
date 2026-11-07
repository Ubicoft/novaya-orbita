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
  home: {
    hero: {
      headline: string;
      lead: string;
      ctaJoin: string;
      ctaAbout: string;
    };
    about: {
      eyebrow: string;
      title: string;
      body: string;
      points: Array<{ title: string; text: string }>;
    };
    directions: {
      eyebrow: string;
      title: string;
      lead: string;
      more: string;
      items: Array<{ id: string; title: string; text: string }>;
    };
    events: {
      eyebrow: string;
      title: string;
      emptyTitle: string;
      emptyBody: string;
      cta: string;
    };
    projects: {
      eyebrow: string;
      title: string;
      lead: string;
      emptyTitle: string;
      emptyBody: string;
      cta: string;
    };
    news: {
      eyebrow: string;
      title: string;
      emptyTitle: string;
      emptyBody: string;
      cta: string;
    };
    join: {
      title: string;
      lead: string;
      cta: string;
    };
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
