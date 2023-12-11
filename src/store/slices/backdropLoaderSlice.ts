import { StateCreator } from 'zustand';

export interface BackdropLoaderSlice {
  displayBackDropLoader: boolean;
  setDisplayBackDropLoader: (displayBackDropLoader: boolean) => void;
}

export const createBackdropLoaderSlice: StateCreator<
  BackdropLoaderSlice,
  [],
  []
> = (set) => ({
  displayBackDropLoader: false,
  setDisplayBackDropLoader: (displayBackDropLoader: boolean) =>
    set((state) => ({ ...state, displayBackDropLoader })),
});
