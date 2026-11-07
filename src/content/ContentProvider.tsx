import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createEmptyStore } from "./empty";
import {
  isAdminUnlocked,
  loadContentStore,
  lockAdmin,
  saveContentStore,
  unlockAdmin,
} from "./store";
import type {
  ContactSettings,
  ContentStore,
  EventRecord,
  FeedbackMessage,
  JoinApplication,
  MemberRecord,
  NewsRecord,
  PartnerRecord,
  ProjectRecord,
} from "./types";

type ContentContextValue = {
  store: ContentStore;
  admin: boolean;
  tryUnlock: (key: string) => boolean;
  logoutAdmin: () => void;
  upsertEvent: (item: EventRecord) => void;
  removeEvent: (id: string) => void;
  upsertProject: (item: ProjectRecord) => void;
  removeProject: (id: string) => void;
  upsertMember: (item: MemberRecord) => void;
  removeMember: (id: string) => void;
  upsertPartner: (item: PartnerRecord) => void;
  removePartner: (id: string) => void;
  upsertNews: (item: NewsRecord) => void;
  removeNews: (id: string) => void;
  saveContacts: (contacts: ContactSettings) => void;
  addFeedback: (item: FeedbackMessage) => void;
  markFeedbackRead: (id: string) => void;
  removeFeedback: (id: string) => void;
  addApplication: (item: JoinApplication) => void;
  updateApplication: (item: JoinApplication) => void;
  removeApplication: (id: string) => void;
  replaceStore: (next: ContentStore) => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<ContentStore>(() => createEmptyStore());
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setStore(loadContentStore());
    setAdmin(isAdminUnlocked());
  }, []);

  const persist = useCallback((next: ContentStore) => {
    setStore(next);
    saveContentStore(next);
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({
      store,
      admin,
      tryUnlock: (key) => {
        const ok = unlockAdmin(key);
        if (ok) setAdmin(true);
        return ok;
      },
      logoutAdmin: () => {
        lockAdmin();
        setAdmin(false);
      },
      upsertEvent: (item) => persist({ ...store, events: upsertById(store.events, item) }),
      removeEvent: (id) => persist({ ...store, events: store.events.filter((e) => e.id !== id) }),
      upsertProject: (item) => persist({ ...store, projects: upsertById(store.projects, item) }),
      removeProject: (id) =>
        persist({ ...store, projects: store.projects.filter((e) => e.id !== id) }),
      upsertMember: (item) => persist({ ...store, members: upsertById(store.members, item) }),
      removeMember: (id) => persist({ ...store, members: store.members.filter((e) => e.id !== id) }),
      upsertPartner: (item) => persist({ ...store, partners: upsertById(store.partners, item) }),
      removePartner: (id) =>
        persist({ ...store, partners: store.partners.filter((e) => e.id !== id) }),
      upsertNews: (item) => persist({ ...store, news: upsertById(store.news, item) }),
      removeNews: (id) => persist({ ...store, news: store.news.filter((e) => e.id !== id) }),
      saveContacts: (contacts) => persist({ ...store, contacts }),
      addFeedback: (item) => persist({ ...store, feedback: [item, ...store.feedback] }),
      markFeedbackRead: (id) =>
        persist({
          ...store,
          feedback: store.feedback.map((f) => (f.id === id ? { ...f, read: true } : f)),
        }),
      removeFeedback: (id) =>
        persist({ ...store, feedback: store.feedback.filter((f) => f.id !== id) }),
      addApplication: (item) =>
        persist({ ...store, applications: [item, ...store.applications] }),
      updateApplication: (item) =>
        persist({ ...store, applications: upsertById(store.applications, item) }),
      removeApplication: (id) =>
        persist({ ...store, applications: store.applications.filter((a) => a.id !== id) }),
      replaceStore: persist,
    }),
    [admin, persist, store],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}

function upsertById<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx === -1) return [...list, item];
  const next = [...list];
  next[idx] = item;
  return next;
}
