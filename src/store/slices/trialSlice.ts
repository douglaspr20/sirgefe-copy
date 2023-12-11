import { StateCreator } from 'zustand';

interface State {
  isTrial: boolean;
  trialLeft: number;
  trialTotal: number;
}

export const initialTrialSlice: State = {
  isTrial: false,
  trialLeft: 0,
  trialTotal: 0,
};

interface Actions {
  setIsTrial: (isTrial: boolean) => void;
  setTrialLeft: (trialLeft: number) => void;
  setTrialTotal: (trialTotal: number) => void;
}

export interface TrialSlice extends State, Actions {}

export const createTrialSlice: StateCreator<TrialSlice, [], []> = (set) => ({
  ...initialTrialSlice,
  setIsTrial: (isTrial: boolean) => set((state) => ({ ...state, isTrial })),
  setTrialLeft: (trialLeft: number) =>
    set((state) => ({ ...state, trialLeft })),
  setTrialTotal: (trialTotal: number) =>
    set((state) => ({ ...state, trialTotal })),
});
