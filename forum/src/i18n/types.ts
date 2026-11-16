export type Locale = "ru" | "tj" | "en";

export type ForumNavKey =
  | "home"
  | "categories"
  | "recent"
  | "popular"
  | "qa"
  | "members"
  | "about";

export type CategoryCopy = {
  title: string;
  description: string;
  subs: Record<string, string>;
};

export type Dictionary = {
  meta: {
    siteName: string;
    forumName: string;
    shortDescription: string;
  };
  nav: Record<ForumNavKey, string>;
  header: {
    openMenu: string;
    closeMenu: string;
    more: string;
    language: string;
    theme: string;
    skipToContent: string;
    primaryNav: string;
    mobileNav: string;
    login: string;
    register: string;
    notifications: string;
    profile: string;
    comingSoon: string;
  };
  themes: Record<"winter" | "blue" | "pink" | "green", string>;
  search: {
    placeholder: string;
    label: string;
    disabledHint: string;
  };
  home: {
    welcomeTitle: string;
    welcomeLead: string;
    exploreCategories: string;
    latestTitle: string;
    latestEmpty: string;
    popularTitle: string;
    popularEmpty: string;
    qaTitle: string;
    qaEmpty: string;
    membersTitle: string;
    membersEmpty: string;
    toSite: string;
  };
  categoriesPage: {
    title: string;
    lead: string;
    topics: string;
    posts: string;
    lastActivity: string;
    emptyActivity: string;
    subsections: string;
    open: string;
  };
  categoryPage: {
    back: string;
    subsectionsTitle: string;
    threadsTitle: string;
    threadsEmpty: string;
  };
  subsectionPage: {
    backCategory: string;
    threadsEmpty: string;
  };
  recentPage: { title: string; lead: string; empty: string };
  popularPage: { title: string; lead: string; empty: string };
  qaPage: { title: string; lead: string; empty: string };
  membersPage: { title: string; lead: string; empty: string };
  aboutPage: { title: string; lead: string; body: string[]; toSite: string };
  profile: {
    registered: string;
    posts: string;
    reactions: string;
    reputation: string;
    achievements: string;
    currentRank: string;
    orbitProgress: string;
    scoreLabel: string;
  };
  ranks: Record<
    | "cosmic_novice"
    | "pioneer"
    | "explorer"
    | "navigator"
    | "orbital_member"
    | "stellar_member"
    | "orbit_keeper"
    | "debate_master"
    | "stellar_expert"
    | "cosmic_strategist"
    | "idea_architect"
    | "orbit_legend"
    | "forum_founder"
    | "honorary_member"
    | "special_guest",
    string
  >;
  achievements: Record<
    | "first_step"
    | "active_talker"
    | "community_helper"
    | "initiator"
    | "researcher"
    | "organizer"
    | "international_voice",
    string
  >;
  adminRanks: {
    nav: string;
    title: string;
    lead: string;
    saved: string;
    specialTitle: string;
    specialHint: string;
    autoOnly: string;
    weightsTitle: string;
    weightsHint: string;
    helpful: string;
    threads: string;
    materials: string;
    events: string;
    postSoftCap: string;
    defaultWeight: string;
  };
  footer: {
    rights: string;
    toSite: string;
  };
  langNames: Record<Locale, string>;
  categories: Record<string, CategoryCopy>;
};
