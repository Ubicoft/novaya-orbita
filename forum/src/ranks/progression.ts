import {
  AUTO_RANK_ORDER,
  DEFAULT_SCORE_WEIGHTS,
  ORBIT_RANKS,
  SPECIAL_RANKS,
} from "./catalog";
import type { ActivityStats, ForumMember, OrbitRankId } from "./types";
import { getRankThresholdOverrides, getScoreWeightOverrides } from "./adminStore";

export type ScoreBreakdown = {
  total: number;
  parts: Record<string, number>;
};

/** Weighted activity score with soft-cap on raw posts (anti-spam). */
export function computeActivityScore(stats: ActivityStats): ScoreBreakdown {
  const w = { ...DEFAULT_SCORE_WEIGHTS, ...getScoreWeightOverrides() };
  const postEffective =
    Math.min(stats.posts, w.postSoftCap) * w.posts +
    Math.max(0, stats.posts - w.postSoftCap) * w.posts * 0.5;

  const parts = {
    posts: postEffective,
    helpfulAnswers: stats.helpfulAnswers * w.helpfulAnswers,
    reactionsReceived: stats.reactionsReceived * w.reactionsReceived,
    threadsStarted: stats.threadsStarted * w.threadsStarted,
    materialsShared: stats.materialsShared * w.materialsShared,
    eventParticipation: stats.eventParticipation * w.eventParticipation,
  };

  const total = Object.values(parts).reduce((a, b) => a + b, 0);
  return { total, parts };
}

export function resolveAutoRank(stats: ActivityStats): OrbitRankId {
  const overrides = getRankThresholdOverrides();
  const { total } = computeActivityScore(stats);
  let current: OrbitRankId = "cosmic_novice";

  for (const id of AUTO_RANK_ORDER) {
    const def = ORBIT_RANKS[id];
    const minScore = overrides[id]?.minScore ?? def.minScore;
    const minUnique = overrides[id]?.minUniqueThreads ?? def.minUniqueThreads;
    if (total >= minScore && stats.uniqueThreads >= minUnique) {
      current = id;
    }
  }
  return current;
}

/**
 * Effective display ranks: special (manual) takes badge primacy;
 * auto ladder still computed for progress UI.
 */
export function resolveMemberRanks(member: ForumMember): {
  primary: OrbitRankId;
  auto: OrbitRankId;
  badges: OrbitRankId[];
} {
  const auto = resolveAutoRank(member.stats);
  const special =
    member.specialRankId && SPECIAL_RANKS.includes(member.specialRankId)
      ? member.specialRankId
      : undefined;
  const primary = special ?? auto;
  const badges: OrbitRankId[] = special && special !== auto ? [special, auto] : [primary];
  return { primary, auto, badges };
}

export function reputationPoints(stats: ActivityStats): number {
  const { total } = computeActivityScore(stats);
  return Math.round(total);
}
