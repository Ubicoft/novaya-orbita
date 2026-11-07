import type { Locale } from "../i18n/types";
import type {
  EventCategory,
  EventStatus,
  MemberRole,
  PartnerCategory,
  ProjectDirection,
  ProjectStatus,
} from "./types";

type Dict = Record<Locale, string>;

export const EVENT_CATEGORY_LABELS: Record<EventCategory, Dict> = {
  conference: { ru: "Конференции", tj: "Конфронсҳо", en: "Conferences" },
  forum: { ru: "Форумы", tj: "Форумҳо", en: "Forums" },
  debate: { ru: "Дебаты", tj: "Мунозираҳо", en: "Debates" },
  education: { ru: "Образовательные", tj: "Таълимӣ", en: "Educational" },
  contest: { ru: "Конкурсы", tj: "Озмунҳо", en: "Contests" },
  social: { ru: "Социальные", tj: "Иҷтимоӣ", en: "Social" },
  international: { ru: "Международные", tj: "Байналмилалӣ", en: "International" },
  culture: { ru: "Культурные", tj: "Фарҳангӣ", en: "Cultural" },
};

export const EVENT_STATUS_LABELS: Record<EventStatus, Dict> = {
  upcoming: { ru: "Предстоящее", tj: "Дар пеш", en: "Upcoming" },
  completed: { ru: "Завершённое", tj: "Анҷомёфта", en: "Completed" },
  cancelled: { ru: "Отменённое", tj: "Бекоршуда", en: "Cancelled" },
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, Dict> = {
  planned: { ru: "Планируется", tj: "Банақшагирифта", en: "Planned" },
  active: { ru: "В работе", tj: "Дар ҷараён", en: "Active" },
  completed: { ru: "Завершён", tj: "Анҷомёфта", en: "Completed" },
  paused: { ru: "Приостановлен", tj: "Қатъшуда", en: "Paused" },
};

export const PROJECT_DIRECTION_LABELS: Record<ProjectDirection, Dict> = {
  education: {
    ru: "Образование",
    tj: "Таҳсилот",
    en: "Education",
  },
  debate: { ru: "Дебаты", tj: "Мунозира", en: "Debate" },
  international: {
    ru: "Международное сотрудничество",
    tj: "Ҳамкории байналмилалӣ",
    en: "International",
  },
  science: { ru: "Наука и мероприятия", tj: "Илм ва чорабиниҳо", en: "Science & events" },
  social: { ru: "Социальные инициативы", tj: "Ташаббусҳои иҷтимоӣ", en: "Social" },
  projects: { ru: "Проектная деятельность", tj: "Фаъолияти лоиҳавӣ", en: "Projects" },
  leadership: { ru: "Лидерство", tj: "Роҳбарӣ", en: "Leadership" },
};

export const MEMBER_ROLE_LABELS: Record<MemberRole, Dict> = {
  leadership: { ru: "Руководство", tj: "Роҳбарӣ", en: "Leadership" },
  coordination: { ru: "Координация", tj: "Ҳамоҳангсозӣ", en: "Coordination" },
  "direction-lead": {
    ru: "Руководитель направления",
    tj: "Роҳбари самт",
    en: "Direction lead",
  },
  "project-coordinator": {
    ru: "Координатор проекта",
    tj: "Ҳамоҳангсози лоиҳа",
    en: "Project coordinator",
  },
  member: { ru: "Участник", tj: "Иштирокчӣ", en: "Member" },
};

export const PARTNER_CATEGORY_LABELS: Record<PartnerCategory, Dict> = {
  university: { ru: "Вузы", tj: "Донишгоҳҳо", en: "Universities" },
  ngo: { ru: "НКО", tj: "ТҒН", en: "NGOs" },
  international: { ru: "Международные", tj: "Байналмилалӣ", en: "International" },
  government: { ru: "Государственные", tj: "Давлатӣ", en: "Government" },
  youth: { ru: "Молодёжные", tj: "Ҷавонон", en: "Youth" },
  media: { ru: "Медиа", tj: "Медиа", en: "Media" },
};

export const NEWS_FORMAT_LABELS: Record<"article" | "report" | "interview", Dict> = {
  article: { ru: "Статья", tj: "Мақола", en: "Article" },
  report: { ru: "Отчёт", tj: "Ҳисобот", en: "Report" },
  interview: { ru: "Интервью", tj: "Мусоҳиба", en: "Interview" },
};

export const APPLICATION_STATUS_LABELS: Record<
  "new" | "review" | "clarify" | "approved" | "rejected",
  Dict
> = {
  new: { ru: "Новая", tj: "Нав", en: "New" },
  review: { ru: "На рассмотрении", tj: "Дар баррасӣ", en: "In review" },
  clarify: { ru: "Уточнение", tj: "Такмил", en: "Clarify" },
  approved: { ru: "Одобрена", tj: "Тасдиқшуда", en: "Approved" },
  rejected: { ru: "Отклонена", tj: "Радшуда", en: "Rejected" },
};
