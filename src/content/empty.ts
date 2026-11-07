import { defaultContacts, type ContentStore } from "./types";

export function createEmptyStore(): ContentStore {
  return {
    version: 1,
    events: [],
    projects: [],
    members: [],
    partners: [],
    news: [],
    contacts: defaultContacts(),
    feedback: [],
    applications: [],
  };
}
