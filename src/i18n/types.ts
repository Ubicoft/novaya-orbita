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
  aboutPage: {
    intro: {
      title: string;
      lead: string;
    };
    history: {
      eyebrow: string;
      title: string;
      body: string;
      note: string;
    };
    mission: {
      eyebrow: string;
      title: string;
      statement: string;
    };
    goals: {
      eyebrow: string;
      title: string;
      lead: string;
      items: Array<{ id: string; title: string }>;
    };
    values: {
      eyebrow: string;
      title: string;
      items: Array<{ id: string; title: string; text: string }>;
    };
    principles: {
      eyebrow: string;
      title: string;
      lead: string;
      items: Array<{ id: string; title: string; text: string }>;
    };
    structure: {
      eyebrow: string;
      title: string;
      lead: string;
      note: string;
      roles: Array<{ id: string; title: string; text: string }>;
    };
    interuni: {
      eyebrow: string;
      title: string;
      body: string;
      points: Array<{ title: string; text: string }>;
    };
    cta: {
      title: string;
      lead: string;
      button: string;
    };
  };
  catalog: {
    all: string;
    search: string;
    filters: string;
    status: string;
    category: string;
    direction: string;
    role: string;
    format: string;
    open: string;
    back: string;
    emptyTitle: string;
    emptyBody: string;
    notFoundTitle: string;
    notFoundBody: string;
    date: string;
    place: string;
    launch: string;
    progress: string;
    goals: string;
    program: string;
    organizers: string;
    participation: string;
    results: string;
    idea: string;
    problem: string;
    workAreas: string;
    stages: string;
    team: string;
    joinProject: string;
    university: string;
    interests: string;
    profiles: string;
    cooperation: string;
    website: string;
    publishedAt: string;
    media: string;
  };
  eventsPage: {
    title: string;
    lead: string;
  };
  projectsPage: {
    title: string;
    lead: string;
  };
  membersPage: {
    title: string;
    lead: string;
    disclaimer: string;
  };
  partnersPage: {
    title: string;
    lead: string;
    invite: string;
  };
  newsPage: {
    title: string;
    lead: string;
  };
  contactsPage: {
    title: string;
    lead: string;
    formTitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  joinPage: {
    title: string;
    lead: string;
    formTitle: string;
    fullName: string;
    university: string;
    faculty: string;
    course: string;
    email: string;
    contact: string;
    directions: string;
    experience: string;
    skills: string;
    motivation: string;
    extra: string;
    cvUrl: string;
    consent: string;
    submit: string;
    success: string;
    error: string;
    note: string;
  };
  admin: {
    title: string;
    unlock: string;
    password: string;
    enter: string;
    logout: string;
    hint: string;
    navOverview: string;
    navEvents: string;
    navProjects: string;
    navMembers: string;
    navPartners: string;
    navNews: string;
    navContacts: string;
    navFeedback: string;
    navApplications: string;
    create: string;
    save: string;
    remove: string;
    published: string;
    draft: string;
    empty: string;
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
