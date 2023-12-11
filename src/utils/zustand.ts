import { create } from 'zustand';
import { UserDetails, UserDetailsPrisma } from '@interfaces/userDetails';

export const userDetailsStore = create<{
  userDetails?: UserDetailsPrisma;
  businessVanityName?: string | undefined;
}>((set) => ({
  userDetails: undefined,
  businessVanityName: undefined,
}));

export const appUserDetailsStore = create<{
  userDetails?: UserDetails;
  businessVanityName?: string | undefined;
}>((set) => ({
  userDetails: undefined,
  businessVanityName: undefined,
}));
