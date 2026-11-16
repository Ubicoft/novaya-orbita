/** Mirrors UI tree in ../src/data/categories.ts — seed into DB on F2 migrate. */

export const CATEGORY_SEED = [
  {
    slug: "official",
    icon: "official",
    sections: ["news", "announcements", "decisions", "org", "feedback-lead"],
  },
  {
    slug: "discussion",
    icon: "discussion",
    sections: ["general", "free", "introductions", "opinions", "qa-open"],
  },
  {
    slug: "education",
    icon: "education",
    sections: ["law", "economics", "ir", "it", "science", "materials", "contests"],
  },
  {
    slug: "debates",
    icon: "debates",
    sections: ["prep", "topics", "argumentation", "speaking", "competitions"],
  },
  {
    slug: "ideas",
    icon: "ideas",
    sections: ["propose", "social-projects", "volunteer", "civic", "problems-solutions"],
  },
  {
    slug: "projects",
    icon: "projects",
    sections: ["looking", "teams", "active", "partners", "reports"],
  },
  {
    slug: "events",
    icon: "events",
    sections: ["upcoming", "registration", "discuss", "outcomes", "conferences"],
  },
  {
    slug: "interuni",
    icon: "interuni",
    sections: ["universities", "regional", "international", "foreign-partners", "exchange"],
  },
  {
    slug: "help",
    icon: "help",
    sections: ["support", "org-questions", "newcomers", "forum-ideas"],
  },
] as const;
