import { createEmptyStore } from "./empty";
import type { ContentStore } from "./types";

export const CONTENT_STORAGE_KEY = "novaya-orbita.content.v1";
export const ADMIN_SESSION_KEY = "novaya-orbita.admin";

/**
 * Local preview gate only. Real production admin must use server-side auth —
 * a client bundle cannot keep secrets. Override for local use via VITE_ADMIN_KEY.
 */
export const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "orbita-local";

export function loadContentStore(): ContentStore {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return createEmptyStore();
    const parsed = JSON.parse(raw) as Partial<ContentStore>;
    const base = createEmptyStore();
    return {
      ...base,
      ...parsed,
      version: 1,
      events: parsed.events ?? [],
      projects: parsed.projects ?? [],
      members: parsed.members ?? [],
      partners: parsed.partners ?? [],
      news: parsed.news ?? [],
      contacts: { ...base.contacts, ...(parsed.contacts ?? {}) },
      feedback: parsed.feedback ?? [],
      applications: parsed.applications ?? [],
    };
  } catch {
    return createEmptyStore();
  }
}

export function saveContentStore(store: ContentStore) {
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(store));
}

export function isAdminUnlocked(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlockAdmin(key: string): boolean {
  if (key.trim() !== ADMIN_KEY) return false;
  sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  return true;
}

export function lockAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[ё]/g, "e")
      .replace(/[^a-z0-9\u0400-\u04ff]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `item-${Date.now().toString(36)}`
  );
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
