import { addSession, deleteSession, getSessions } from "@/lib/helpers";
import { Session, SessionInput } from "@/lib/types";
import { create } from "zustand";

interface SessionState {
  sessions: Session[];
  initialized: boolean;
  setSessions: (sessions: Session[]) => void;
  initializeSessions: () => void;
  addSession: (session: SessionInput) => void;
  deleteSession: (id: string) => void;
}

const useSessionStore = create<SessionState>()((set, get) => ({
  sessions: [],
  initialized: false,
  addSession: async (data: SessionInput) => {
    const newSession = await addSession(data);
    set((state) => ({ sessions: [...state.sessions, newSession] }));
  },
  deleteSession: (id) => {
    deleteSession(id);
    set((state) => ({ sessions: state.sessions.filter((s) => s.id !== id) }));
  },
  setSessions: (sessions) => set({ sessions }),
  initializeSessions: async () => {
    try {
      const sessions = await getSessions();
      set({ sessions, initialized: true });
    } catch (error) {
      console.error("Failed to initialize sessions:", error);
      set({ initialized: true }); // Still mark as initialized even if it fails
    }
  },
}));

useSessionStore.getState().initializeSessions();

export default useSessionStore;
