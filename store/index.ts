import { create } from 'zustand';

interface AppState {
  user: {
    name: string;
    email: string;
    onboardingStep: number;
  } | null;
  setUser: (user: any) => void;
  updateUser: (data: any) => void;
  
  memoriesCount: number;
  setMemoriesCount: (count: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) => set((state) => ({ 
    user: state.user ? { ...state.user, ...data } : null 
  })),
  
  memoriesCount: 0,
  setMemoriesCount: (count) => set({ memoriesCount: count }),
}));
