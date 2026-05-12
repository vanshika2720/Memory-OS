import { create } from 'zustand';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface IngestionStatus {
  processed: number;
  extracted: number;
  people: number;
  status: string;
}

interface Filters {
  personIds: string[];
  emotions: string[];
  sources: string[];
}

interface MemoryOSStore {
  // Auth
  user: {
    id: string;
    name: string;
    email: string;
    planTier: string;
    onboardingDone: boolean;
  } | null;
  setUser: (user: any) => void;
  updateUser: (data: any) => void;

  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (v: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
  
  // Selected day on timeline
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  
  // Ingestion status
  ingestionStatus: IngestionStatus | null;
  setIngestionStatus: (s: IngestionStatus | null) => void;
  
  // Chat messages (persisted per session)
  messages: Message[];
  addMessage: (m: Message) => void;
  clearMessages: () => void;
  
  // Active filters on timeline
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;

  // Global counts
  memoriesCount: number;
  setMemoriesCount: (count: number) => void;
}

export const useStore = create<MemoryOSStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) => set((state) => ({ 
    user: state.user ? { ...state.user, ...data } : null 
  })),

  authModalOpen: false,
  setAuthModalOpen: (v) => set({ authModalOpen: v }),
  commandPaletteOpen: false,
  setCommandPaletteOpen: (v) => set({ commandPaletteOpen: v }),
  
  selectedDate: null,
  setSelectedDate: (d) => set({ selectedDate: d }),
  
  ingestionStatus: null,
  setIngestionStatus: (s) => set({ ingestionStatus: s }),
  
  messages: [],
  addMessage: (m) => set((state) => ({ messages: [...state.messages, m] })),
  clearMessages: () => set({ messages: [] }),
  
  filters: { personIds: [], emotions: [], sources: [] },
  setFilters: (f) => set((state) => ({ filters: { ...state.filters, ...f } })),

  memoriesCount: 0,
  setMemoriesCount: (count) => set({ memoriesCount: count }),
}));
