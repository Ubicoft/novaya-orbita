/** Orbit Ranks — forum activity titles, separate from org office / RBAC. */

export type OrbitRankId =
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
  | "special_guest";

export type AchievementId =
  | "first_step"
  | "active_talker"
  | "community_helper"
  | "initiator"
  | "researcher"
  | "organizer"
  | "international_voice";

/** Staff / display role for name color — not the same as Orbit Rank. */
export type NameRole =
  | "founder"
  | "chief_admin"
  | "admin"
  | "moderator"
  | "honorary"
  | "member"
  | "guest";

export type ActivityStats = {
  posts: number;
  helpfulAnswers: number;
  reactionsReceived: number;
  threadsStarted: number;
  materialsShared: number;
  eventParticipation: number;
  /** Distinct threads the user posted in — anti-spam signal. */
  uniqueThreads: number;
};

export type OrbitRankDef = {
  id: OrbitRankId;
  tier: "starter" | "mid" | "advanced" | "special";
  /** Auto ranks only. Special ranks ignore this. */
  auto: boolean;
  /** Minimum activity score for automatic grant. */
  minScore: number;
  /** Require at least this many unique threads (anti farm). */
  minUniqueThreads: number;
  badgeTone: string;
  icon: string;
};

export type AchievementDef = {
  id: AchievementId;
  icon: string;
};

export type ForumMember = {
  id: string;
  displayName: string;
  avatarInitials: string;
  avatarHue: number;
  officeTitle?: string;
  university?: string;
  country?: string;
  registeredAt: string;
  nameRole: NameRole;
  /** Manual special rank override (admin). */
  specialRankId?: OrbitRankId;
  achievements: AchievementId[];
  stats: ActivityStats;
};
