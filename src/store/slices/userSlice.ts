import { User } from '@sirge-io/sirge-types';
import { UserSession } from '@sirge-io/sirge-types/dist/interfaces/session';
import { StateCreator } from 'zustand';

interface State {
  sessions: UserSession[];
  staff?: User;
  lastActivity: string;
}

export const initialUserSlice: State = {
  sessions: [],
  staff: undefined,
  lastActivity: '',
};

interface Actions {
  setSessions: (sessions: UserSession[]) => void;
  setStaff: (staff: User) => void;
  setLastActivity: (lastActivity: string) => void;
}

export interface UserSlice extends State, Actions {}

export const createUserSlice: StateCreator<UserSlice, [], []> = (set) => ({
  ...initialUserSlice,
  setSessions: (sessions) => set((state) => ({ ...state, sessions })),
  setStaff: (staff) => set((state) => ({ ...state, staff })),
  setLastActivity: (lastActivity) =>
    set((state) => ({ ...state, lastActivity })),
});
