import type { Locale } from "../i18n/types";
import type {
  LocalizedString,
  MemberRecord,
  MembershipStatus,
  OfficePosition,
  OfficeTier,
  PositionHistoryEntry,
  ProjectDirection,
} from "./types";
import { emptyLocalized } from "./types";

type Dict = Record<Locale, string>;

/** Organizational office (должность) — separate from membership status. */
export const OFFICE_POSITIONS: OfficePosition[] = [
  "chair",
  "first-vice-chair",
  "vice-chair",
  "coord-council",
  "direction-head",
  "representation-head",
  "project-head",
  "secretariat-head",
  "direction-deputy",
  "representation-deputy",
  "project-deputy",
  "direction-coordinator",
  "project-coordinator",
  "representation-coordinator",
  "curator",
  "mentor",
  "organizer",
  "volunteer",
  "chair-advisor",
  "expert",
];

export const MEMBERSHIP_STATUSES: MembershipStatus[] = [
  "candidate",
  "member",
  "active",
  "honorary",
  "suspended",
];

export const OFFICE_TIER_ORDER: OfficeTier[] = [
  "executive",
  "coord-body",
  "leadership",
  "deputies",
  "coordination",
  "organizing",
  "honorary",
];

export const OFFICE_TIER_OF: Record<OfficePosition, OfficeTier> = {
  chair: "executive",
  "first-vice-chair": "executive",
  "vice-chair": "executive",
  "coord-council": "coord-body",
  "direction-head": "leadership",
  "representation-head": "leadership",
  "project-head": "leadership",
  "secretariat-head": "leadership",
  "direction-deputy": "deputies",
  "representation-deputy": "deputies",
  "project-deputy": "deputies",
  "direction-coordinator": "coordination",
  "project-coordinator": "coordination",
  "representation-coordinator": "coordination",
  curator: "coordination",
  mentor: "coordination",
  organizer: "organizing",
  volunteer: "organizing",
  "chair-advisor": "honorary",
  expert: "honorary",
};

/** Sort key within tier (lower = higher in hierarchy). */
export const OFFICE_RANK: Record<OfficePosition, number> = {
  chair: 1,
  "first-vice-chair": 2,
  "vice-chair": 3,
  "coord-council": 4,
  "direction-head": 5,
  "representation-head": 6,
  "project-head": 7,
  "secretariat-head": 8,
  "direction-deputy": 9,
  "representation-deputy": 10,
  "project-deputy": 11,
  "direction-coordinator": 12,
  "project-coordinator": 13,
  "representation-coordinator": 14,
  curator: 15,
  mentor: 16,
  organizer: 17,
  volunteer: 18,
  "chair-advisor": 19,
  expert: 20,
};

export const OFFICE_TIER_LABELS: Record<OfficeTier, Dict> = {
  executive: {
    ru: "Высшее руководство",
    tj: "Роҳбарияти олӣ",
    en: "Executive leadership",
  },
  "coord-body": {
    ru: "Координационный орган",
    tj: "Мақоми ҳамоҳангсозӣ",
    en: "Coordination body",
  },
  leadership: {
    ru: "Руководящий состав",
    tj: "Ҳайати роҳбарикунанда",
    en: "Leadership staff",
  },
  deputies: {
    ru: "Заместители и управленческий состав",
    tj: "Муовинон ва ҳайати идорӣ",
    en: "Deputies & management",
  },
  coordination: {
    ru: "Координационный и кураторский состав",
    tj: "Ҳамоҳангсозон ва кураторон",
    en: "Coordination & mentoring",
  },
  organizing: {
    ru: "Актив и организационный состав",
    tj: "Актив ва ҳайати ташкилӣ",
    en: "Organizing body",
  },
  membership: {
    ru: "Членство",
    tj: "Узвият",
    en: "Membership",
  },
  honorary: {
    ru: "Почётный статус",
    tj: "Мақоми фахрӣ",
    en: "Honorary status",
  },
};

export const OFFICE_POSITION_LABELS: Record<OfficePosition, Dict> = {
  chair: {
    ru: "Председатель объединения",
    tj: "Раиси иттиҳодия",
    en: "Chair of the association",
  },
  "first-vice-chair": {
    ru: "Первый заместитель председателя",
    tj: "Муовини аввали раис",
    en: "First vice chair",
  },
  "vice-chair": {
    ru: "Заместитель председателя",
    tj: "Муовини раис",
    en: "Vice chair",
  },
  "coord-council": {
    ru: "Член координационного совета",
    tj: "Узви шӯрои ҳамоҳангсозӣ",
    en: "Coordination council member",
  },
  "direction-head": {
    ru: "Руководитель направления",
    tj: "Роҳбари самт",
    en: "Direction head",
  },
  "representation-head": {
    ru: "Руководитель представительства",
    tj: "Роҳбари намояндагӣ",
    en: "Representation head",
  },
  "project-head": {
    ru: "Руководитель проекта",
    tj: "Роҳбари лоиҳа",
    en: "Project head",
  },
  "secretariat-head": {
    ru: "Руководитель секретариата",
    tj: "Роҳбари котибот",
    en: "Secretariat head",
  },
  "direction-deputy": {
    ru: "Заместитель руководителя направления",
    tj: "Муовини роҳбари самт",
    en: "Deputy direction head",
  },
  "representation-deputy": {
    ru: "Заместитель руководителя представительства",
    tj: "Муовини роҳбари намояндагӣ",
    en: "Deputy representation head",
  },
  "project-deputy": {
    ru: "Заместитель руководителя проекта",
    tj: "Муовини роҳбари лоиҳа",
    en: "Deputy project head",
  },
  "direction-coordinator": {
    ru: "Координатор направления",
    tj: "Ҳамоҳангсози самт",
    en: "Direction coordinator",
  },
  "project-coordinator": {
    ru: "Координатор проекта",
    tj: "Ҳамоҳангсози лоиҳа",
    en: "Project coordinator",
  },
  "representation-coordinator": {
    ru: "Координатор представительства",
    tj: "Ҳамоҳангсози намояндагӣ",
    en: "Representation coordinator",
  },
  curator: { ru: "Куратор", tj: "Куратор", en: "Curator" },
  mentor: { ru: "Наставник", tj: "Мураббӣ", en: "Mentor" },
  organizer: { ru: "Организатор", tj: "Ташкилкунанда", en: "Organizer" },
  volunteer: {
    ru: "Волонтёр объединения",
    tj: "Волонтёри иттиҳодия",
    en: "Association volunteer",
  },
  "chair-advisor": {
    ru: "Советник председателя",
    tj: "Мушовири раис",
    en: "Chair advisor",
  },
  expert: {
    ru: "Эксперт объединения",
    tj: "Коршиноси иттиҳодия",
    en: "Association expert",
  },
};

export const OFFICE_POSITION_BLURBS: Record<OfficePosition, Dict> = {
  chair: {
    ru: "Стратегическое руководство объединением, представительство вовне, утверждение ключевых решений.",
    tj: "Роҳбарии стратегӣ, намояндагӣ берун аз иттиҳодия ва тасдиқи қарорҳои асосӣ.",
    en: "Strategic leadership, external representation, and approval of key decisions.",
  },
  "first-vice-chair": {
    ru: "Замещает председателя, курирует операционную координацию и исполнение решений.",
    tj: "Ҷойгузини раис, ҳамоҳангсозии амалиётӣ ва иҷрои қарорҳоро назорат мекунад.",
    en: "Stands in for the chair; oversees operations and execution of decisions.",
  },
  "vice-chair": {
    ru: "Поддерживает председателя по закреплённым направлениям и проектам.",
    tj: "Раисро дар самтҳо ва лоиҳаҳои таъйиншуда дастгирӣ мекунад.",
    en: "Supports the chair on assigned portfolios and projects.",
  },
  "coord-council": {
    ru: "Участвует в коллегиальных решениях координационного совета по развитию объединения.",
    tj: "Дар қарорҳои коллегии шӯрои ҳамоҳангсозӣ оид ба рушди иттиҳодия иштирок мекунад.",
    en: "Takes part in council decisions on the association’s development.",
  },
  "direction-head": {
    ru: "Возглавляет направление деятельности: цели, команда, отчётность.",
    tj: "Самти фаъолиятро роҳбарӣ мекунад: ҳадафҳо, даста, ҳисобот.",
    en: "Leads a work direction: goals, team, and reporting.",
  },
  "representation-head": {
    ru: "Руководит представительством вуза/региона/страны и связью с центром.",
    tj: "Намояндагии донишгоҳ/минтақа/кишвар ва робита бо марказро роҳбарӣ мекунад.",
    en: "Leads a university/region/country representation and liaison with the centre.",
  },
  "project-head": {
    ru: "Отвечает за запуск и результат конкретного проекта.",
    tj: "Барои оғоз ва натиҷаи лоиҳаи мушаххас масъул аст.",
    en: "Owns delivery and outcomes of a specific project.",
  },
  "secretariat-head": {
    ru: "Организует документооборот, протоколы и административную поддержку.",
    tj: "Коргузорӣ, протоколҳо ва дастгирии маъмуриро ташкил мекунад.",
    en: "Runs documentation, minutes, and administrative support.",
  },
  "direction-deputy": {
    ru: "Помогает руководителю направления и замещает его при необходимости.",
    tj: "Ба роҳбари самт ёрӣ медиҳад ва ҳангоми зарурат ӯро иваз мекунад.",
    en: "Assists the direction head and covers in their absence.",
  },
  "representation-deputy": {
    ru: "Поддерживает руководителя представительства в операционной работе.",
    tj: "Роҳбари намояндагиро дар кори амалиётӣ дастгирӣ мекунад.",
    en: "Supports the representation head in day-to-day work.",
  },
  "project-deputy": {
    ru: "Сопровождает проект вместе с руководителем и закрывает операционные задачи.",
    tj: "Лоиҳаро бо роҳбар ҳамроҳӣ карда, вазифаҳои амалиётиро иҷро мекунад.",
    en: "Supports the project head on operational delivery.",
  },
  "direction-coordinator": {
    ru: "Координирует активность внутри направления и связь между участниками.",
    tj: "Фаъолиятро дар дохили самт ва робитаи байни иштирокчиён ҳамоҳанг месозад.",
    en: "Coordinates activity within a direction and between participants.",
  },
  "project-coordinator": {
    ru: "Согласовывает сроки, роли и коммуникации по проекту.",
    tj: "Мӯҳлатҳо, нақшҳо ва муоширати лоиҳаро мувофиқа мекунад.",
    en: "Aligns timelines, roles, and communications for a project.",
  },
  "representation-coordinator": {
    ru: "Обеспечивает координацию локального представительства с центром.",
    tj: "Ҳамоҳангии намояндагии маҳаллӣ бо марказро таъмин мекунад.",
    en: "Coordinates the local representation with the centre.",
  },
  curator: {
    ru: "Сопровождает группы участников и качество программ.",
    tj: "Гурӯҳҳои иштирокчиён ва сифати барномаҳоро ҳамроҳӣ мекунад.",
    en: "Guides participant groups and programme quality.",
  },
  mentor: {
    ru: "Передаёт опыт, консультирует актив и проектные команды.",
    tj: "Таҷриба медиҳад, ба актив ва дастаҳои лоиҳавӣ машварат медиҳад.",
    en: "Shares experience and advises the active core and project teams.",
  },
  organizer: {
    ru: "Готовит и проводит мероприятия и рабочие процессы на местах.",
    tj: "Чорабиниҳо ва равандҳои кориро дар ҷойҳо омода ва баргузор мекунад.",
    en: "Prepares and runs events and on-the-ground workflows.",
  },
  volunteer: {
    ru: "Поддерживает мероприятия и инициативы на волонтёрской основе.",
    tj: "Чорабиниҳо ва ташаббусҳоро дар асоси волонтёрӣ дастгирӣ мекунад.",
    en: "Supports events and initiatives on a volunteer basis.",
  },
  "chair-advisor": {
    ru: "Консультирует председателя по стратегическим и экспертным вопросам.",
    tj: "Ба раис оид ба масъалаҳои стратегӣ ва коршиносӣ машварат медиҳад.",
    en: "Advises the chair on strategic and expert matters.",
  },
  expert: {
    ru: "Даёт экспертную оценку по профильным темам объединения.",
    tj: "Дар мавзӯъҳои профилии иттиҳодия баҳодиҳии коршиносӣ медиҳад.",
    en: "Provides expert input on the association’s subject areas.",
  },
};

export const MEMBERSHIP_STATUS_LABELS: Record<MembershipStatus, Dict> = {
  candidate: {
    ru: "Кандидат в объединение",
    tj: "Номзад ба иттиҳодия",
    en: "Candidate",
  },
  member: {
    ru: "Член объединения",
    tj: "Узви иттиҳодия",
    en: "Member",
  },
  active: {
    ru: "Активный член объединения",
    tj: "Узви фаъоли иттиҳодия",
    en: "Active member",
  },
  honorary: {
    ru: "Почётный член объединения",
    tj: "Узви фахрии иттиҳодия",
    en: "Honorary member",
  },
  suspended: {
    ru: "Членство приостановлено",
    tj: "Узвият боздошта шудааст",
    en: "Membership suspended",
  },
};

export function isOfficePosition(value: unknown): value is OfficePosition {
  return typeof value === "string" && (OFFICE_POSITIONS as string[]).includes(value);
}

export function isMembershipStatus(value: unknown): value is MembershipStatus {
  return typeof value === "string" && (MEMBERSHIP_STATUSES as string[]).includes(value);
}

export function blankMember(partial?: Partial<MemberRecord>): MemberRecord {
  const now = new Date().toISOString();
  return {
    id: partial?.id || "",
    slug: partial?.slug || "",
    published: partial?.published ?? false,
    position: partial?.position ?? "",
    membershipStatus: partial?.membershipStatus ?? "member",
    photoUrl: partial?.photoUrl ?? "",
    name: partial?.name ?? emptyLocalized(),
    university: partial?.university ?? emptyLocalized(),
    country: partial?.country ?? emptyLocalized(),
    city: partial?.city ?? emptyLocalized(),
    representation: partial?.representation ?? emptyLocalized(),
    direction: partial?.direction ?? "",
    bio: partial?.bio ?? emptyLocalized(),
    interests: partial?.interests ?? emptyLocalized(),
    publicProfiles: partial?.publicProfiles ?? "",
    joinedAt: partial?.joinedAt ?? "",
    appointedAt: partial?.appointedAt ?? "",
    positionHistory: partial?.positionHistory ?? [],
    updatedAt: partial?.updatedAt ?? now,
  };
}

/** Soft-migrate legacy MemberRecord (role-based) and incomplete shapes. */
export function normalizeMember(raw: unknown): MemberRecord {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const legacyRole = typeof r.role === "string" ? r.role : "";

  let position: OfficePosition | "" =
    isOfficePosition(r.position) ? r.position : "";
  let membershipStatus: MembershipStatus = isMembershipStatus(r.membershipStatus)
    ? r.membershipStatus
    : "member";

  if (!position && legacyRole) {
    const mapped = mapLegacyRole(legacyRole);
    position = mapped.position;
    membershipStatus = mapped.membershipStatus;
  }

  const history = Array.isArray(r.positionHistory)
    ? (r.positionHistory as PositionHistoryEntry[]).filter(
        (h) => h && typeof h === "object" && typeof h.at === "string",
      )
    : [];

  const direction =
    typeof r.direction === "string" && r.direction
      ? (r.direction as ProjectDirection | "")
      : "";

  return blankMember({
    id: String(r.id || ""),
    slug: String(r.slug || ""),
    published: Boolean(r.published),
    position,
    membershipStatus,
    photoUrl: String(r.photoUrl || ""),
    name: asLocalized(r.name),
    university: asLocalized(r.university),
    country: asLocalized(r.country),
    city: asLocalized(r.city),
    representation: asLocalized(r.representation),
    direction: direction === "" || isDirection(direction) ? direction : "",
    bio: asLocalized(r.bio),
    interests: asLocalized(r.interests),
    publicProfiles: String(r.publicProfiles || ""),
    joinedAt: String(r.joinedAt || ""),
    appointedAt: String(r.appointedAt || ""),
    positionHistory: history.map((h) => ({
      at: String(h.at || ""),
      position: isOfficePosition(h.position) || h.position === "" ? h.position : "",
      note: String(h.note || ""),
    })),
    updatedAt: String(r.updatedAt || new Date().toISOString()),
  });
}

function mapLegacyRole(role: string): {
  position: OfficePosition | "";
  membershipStatus: MembershipStatus;
} {
  switch (role) {
    case "leadership":
      return { position: "vice-chair", membershipStatus: "active" };
    case "coordination":
      return { position: "coord-council", membershipStatus: "active" };
    case "direction-lead":
      return { position: "direction-head", membershipStatus: "active" };
    case "project-coordinator":
      return { position: "project-coordinator", membershipStatus: "active" };
    case "member":
    default:
      return { position: "", membershipStatus: "member" };
  }
}

function asLocalized(value: unknown): LocalizedString {
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    return {
      ru: String(v.ru || ""),
      tj: String(v.tj || ""),
      en: String(v.en || ""),
    };
  }
  if (typeof value === "string") {
    return { ru: value, tj: value, en: value };
  }
  return emptyLocalized();
}

function isDirection(value: string): value is ProjectDirection {
  return (
    value === "education" ||
    value === "debate" ||
    value === "international" ||
    value === "science" ||
    value === "social" ||
    value === "projects" ||
    value === "leadership"
  );
}

export function appendPositionHistory(
  member: MemberRecord,
  nextPosition: OfficePosition | "",
  note = "",
): MemberRecord {
  if (member.position === nextPosition) return member;
  const entry: PositionHistoryEntry = {
    at: new Date().toISOString(),
    position: nextPosition,
    note:
      note ||
      (member.position
        ? `from:${member.position}`
        : nextPosition
          ? "appointed"
          : "cleared"),
  };
  return {
    ...member,
    position: nextPosition,
    appointedAt: nextPosition ? entry.at.slice(0, 10) : member.appointedAt,
    positionHistory: [entry, ...member.positionHistory].slice(0, 40),
  };
}

export function sortMembersByHierarchy(a: MemberRecord, b: MemberRecord): number {
  const ra = a.position ? OFFICE_RANK[a.position] : 100;
  const rb = b.position ? OFFICE_RANK[b.position] : 100;
  if (ra !== rb) return ra - rb;
  return (a.name.ru || a.slug).localeCompare(b.name.ru || b.slug, "ru");
}
