import type { Locale } from "../i18n/types";

export type LocalizedString = Record<Locale, string>;

export type EventStatus = "upcoming" | "completed" | "cancelled";
export type EventCategory =
  | "conference"
  | "forum"
  | "debate"
  | "education"
  | "contest"
  | "social"
  | "international"
  | "culture";

export type ProjectStatus = "planned" | "active" | "completed" | "paused";
export type ProjectDirection =
  | "education"
  | "debate"
  | "international"
  | "science"
  | "social"
  | "projects"
  | "leadership";

/** Organizational office (должность). Empty string = no appointed office. */
export type OfficePosition =
  | "chair"
  | "first-vice-chair"
  | "vice-chair"
  | "coord-council"
  | "direction-head"
  | "representation-head"
  | "project-head"
  | "secretariat-head"
  | "direction-deputy"
  | "representation-deputy"
  | "project-deputy"
  | "direction-coordinator"
  | "project-coordinator"
  | "representation-coordinator"
  | "curator"
  | "mentor"
  | "organizer"
  | "volunteer"
  | "chair-advisor"
  | "expert";

export type OfficeTier =
  | "executive"
  | "coord-body"
  | "leadership"
  | "deputies"
  | "coordination"
  | "organizing"
  | "membership"
  | "honorary";

/** Membership status — separate from office/position. */
export type MembershipStatus =
  | "candidate"
  | "member"
  | "active"
  | "honorary"
  | "suspended";

export type PositionHistoryEntry = {
  at: string;
  position: OfficePosition | "";
  note: string;
};

/** @deprecated Use OfficePosition + MembershipStatus; kept for migration typing only. */
export type MemberRole =
  | "leadership"
  | "coordination"
  | "direction-lead"
  | "project-coordinator"
  | "member";

export type PartnerCategory =
  | "university"
  | "ngo"
  | "international"
  | "government"
  | "youth"
  | "media";

export type NewsFormat = "article" | "report" | "interview";
export type NewsStatus = "draft" | "published";

export type ApplicationStatus =
  | "new"
  | "review"
  | "clarify"
  | "approved"
  | "rejected";

export type EventRecord = {
  id: string;
  slug: string;
  published: boolean;
  category: EventCategory;
  status: EventStatus;
  coverUrl: string;
  startDate: string;
  endDate: string;
  location: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  body: LocalizedString;
  goals: LocalizedString;
  program: LocalizedString;
  organizers: LocalizedString;
  participation: LocalizedString;
  results: LocalizedString;
  mediaUrls: string[];
  updatedAt: string;
};

export type ProjectRecord = {
  id: string;
  slug: string;
  published: boolean;
  direction: ProjectDirection;
  status: ProjectStatus;
  coverUrl: string;
  launchDate: string;
  progress: number;
  title: LocalizedString;
  summary: LocalizedString;
  idea: LocalizedString;
  problem: LocalizedString;
  goals: LocalizedString;
  workAreas: LocalizedString;
  stages: LocalizedString;
  team: LocalizedString;
  results: LocalizedString;
  joinInfo: LocalizedString;
  mediaUrls: string[];
  updatedAt: string;
};

export type MemberRecord = {
  id: string;
  slug: string;
  published: boolean;
  /** Organizational office; empty if the person has membership only. */
  position: OfficePosition | "";
  membershipStatus: MembershipStatus;
  photoUrl: string;
  name: LocalizedString;
  university: LocalizedString;
  country: LocalizedString;
  city: LocalizedString;
  /** University / region / country representation label. */
  representation: LocalizedString;
  direction: ProjectDirection | "";
  bio: LocalizedString;
  interests: LocalizedString;
  publicProfiles: string;
  joinedAt: string;
  appointedAt: string;
  positionHistory: PositionHistoryEntry[];
  updatedAt: string;
};

export type PartnerRecord = {
  id: string;
  slug: string;
  published: boolean;
  category: PartnerCategory;
  logoUrl: string;
  name: LocalizedString;
  description: LocalizedString;
  cooperation: LocalizedString;
  website: string;
  updatedAt: string;
};

export type NewsRecord = {
  id: string;
  slug: string;
  status: NewsStatus;
  format: NewsFormat;
  coverUrl: string;
  publishedAt: string;
  title: LocalizedString;
  summary: LocalizedString;
  body: LocalizedString;
  videoUrl: string;
  updatedAt: string;
};

export type ContactSettings = {
  email: LocalizedString;
  phone: LocalizedString;
  address: LocalizedString;
  hours: LocalizedString;
  note: LocalizedString;
};

export type FeedbackMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
};

export type JoinApplication = {
  id: string;
  createdAt: string;
  status: ApplicationStatus;
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
  consent: boolean;
  adminComment: string;
};

export type ContentStore = {
  version: 1;
  events: EventRecord[];
  projects: ProjectRecord[];
  members: MemberRecord[];
  partners: PartnerRecord[];
  news: NewsRecord[];
  contacts: ContactSettings;
  feedback: FeedbackMessage[];
  applications: JoinApplication[];
};

export function emptyLocalized(): LocalizedString {
  return { ru: "", tj: "", en: "" };
}

export function defaultContacts(): ContactSettings {
  return {
    email: emptyLocalized(),
    phone: emptyLocalized(),
    address: emptyLocalized(),
    hours: emptyLocalized(),
    note: {
      ru: "Контактные данные появятся после официального утверждения. Пока можно оставить сообщение через форму.",
      tj: "Маълумоти тамос пас аз тасдиқи расмӣ нашр мешавад. Ҳоло метавонед тавассути форма паём гузоред.",
      en: "Contact details will be published after official confirmation. For now you can leave a message via the form.",
    },
  };
}
