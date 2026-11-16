/** Admin-ready category tree aligned with the global forum TZ. Counts stay empty until F3+. */

export type CategoryId =
  | "official"
  | "discussion"
  | "education"
  | "debates"
  | "ideas"
  | "projects"
  | "events"
  | "interuni"
  | "help";

export type CategoryDef = {
  id: CategoryId;
  icon: string;
  subsections: string[];
};

export const CATEGORIES: CategoryDef[] = [
  {
    id: "official",
    icon: "official",
    subsections: ["news", "announcements", "decisions", "org", "feedback-lead"],
  },
  {
    id: "discussion",
    icon: "discussion",
    subsections: ["general", "free", "introductions", "opinions", "qa-open"],
  },
  {
    id: "education",
    icon: "education",
    subsections: ["law", "economics", "ir", "it", "science", "materials", "contests"],
  },
  {
    id: "debates",
    icon: "debates",
    subsections: ["prep", "topics", "argumentation", "speaking", "competitions"],
  },
  {
    id: "ideas",
    icon: "ideas",
    subsections: ["propose", "social-projects", "volunteer", "civic", "problems-solutions"],
  },
  {
    id: "projects",
    icon: "projects",
    subsections: ["looking", "teams", "active", "partners", "reports"],
  },
  {
    id: "events",
    icon: "events",
    subsections: ["upcoming", "registration", "discuss", "outcomes", "conferences"],
  },
  {
    id: "interuni",
    icon: "interuni",
    subsections: ["universities", "regional", "international", "foreign-partners", "exchange"],
  },
  {
    id: "help",
    icon: "help",
    subsections: ["support", "org-questions", "newcomers", "forum-ideas"],
  },
];

export function getCategory(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export const SITE_URL = "https://ubicoft.github.io/novaya-orbita/";
