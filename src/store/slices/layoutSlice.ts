import { StateCreator } from 'zustand';

export interface LayoutSlice {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  openList: boolean;
  setOpenList: (openList: boolean) => void;
}

export const createLayoutslice: StateCreator<LayoutSlice> = (set) => ({
  isSidebarOpen: false,
  isLoading: false,
  openList: false,
  setIsSidebarOpen: (isSidebarOpen) =>
    set((state) => ({ ...state, isSidebarOpen })),
  setOpenList: (openList) => set((state) => ({ ...state, openList })),
  setIsLoading: (isLoading: boolean) =>
    set((state) => ({ ...state, isLoading })),
});
