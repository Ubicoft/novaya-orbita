import type { OrbitRankId } from "./types";
import { DEFAULT_SCORE_WEIGHTS } from "./catalog";

const STORAGE_KEY = "novaya-orbita.forum.ranks-admin.v1";

export type RankThresholdOverride = {
  minScore?: number;
  minUniqueThreads?: number;
};

export type ScoreWeightKey = keyof typeof DEFAULT_SCORE_WEIGHTS;

export type RanksAdminState = {
  thresholds: Partial<Record<OrbitRankId, RankThresholdOverride>>;
  weights: Partial<Record<ScoreWeightKey, number>>;
  /** Manual special rank by member id. */
  specialByMember: Record<string, OrbitRankId | null>;
  nameColorOverrides: Partial<Record<string, string>>;
};

const EMPTY: RanksAdminState = {
  thresholds: {},
  weights: {},
  specialByMember: {},
  nameColorOverrides: {},
};

function read(): RanksAdminState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) } as RanksAdminState;
  } catch {
    return EMPTY;
  }
}

function write(next: RanksAdminState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getRanksAdminState(): RanksAdminState {
  if (typeof window === "undefined") return EMPTY;
  return read();
}

export function saveRanksAdminState(next: RanksAdminState) {
  write(next);
}

export function getRankThresholdOverrides(): RanksAdminState["thresholds"] {
  return getRanksAdminState().thresholds;
}

export function getScoreWeightOverrides(): Partial<Record<ScoreWeightKey, number>> {
  return getRanksAdminState().weights;
}

export function getSpecialRankForMember(memberId: string): OrbitRankId | undefined {
  const v = getRanksAdminState().specialByMember[memberId];
  return v ?? undefined;
}

export function setSpecialRankForMember(memberId: string, rank: OrbitRankId | null) {
  const state = getRanksAdminState();
  const specialByMember = { ...state.specialByMember };
  if (rank == null) delete specialByMember[memberId];
  else specialByMember[memberId] = rank;
  write({ ...state, specialByMember });
}
