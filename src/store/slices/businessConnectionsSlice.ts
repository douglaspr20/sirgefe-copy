import { StateCreator } from 'zustand';

export type PreviousConnectedProp = {
  facebook: boolean | null;
  tiktok: boolean | null;
  google: boolean | null;
};

interface State {
  facebookConnected: boolean;
  facebookIntegration: string;
  tiktokConnected: boolean;
  shopifyConnected: boolean;
  isLoadingConnection: boolean;
  googleConnected: boolean;
  allSocialMediaAccountsDisconnected: boolean;
  allAdsAccountsDisconnected: boolean;
  previousConnected: PreviousConnectedProp;
}

interface Actions {
  setFacebookConnected: (facebookConnected: boolean) => void;
  setFacebokIntegration: (facebookIntegration: string) => void;
  setTiktokConnected: (tiktokConnected: boolean) => void;
  setShopifyConnected: (shopifyConnected: boolean) => void;
  setIsLoadingConnection: (isLoadingConnection: boolean) => void;
  setGoogleConnected: (googleConnected: boolean) => void;
  setAllSocialMediaAccountsDisconnected: (
    allSocialMediaAccountsDisconnected: boolean,
  ) => void;
  setAllAdsAccountsDisconnected: (allAdsAccountsDisconnected: boolean) => void;
  setPreviousConnected: (previousConnected: PreviousConnectedProp) => void;
}

export interface BusinessConnectionsSlice extends State, Actions {}

export const initialBusinessConnectionSlice: State = {
  facebookConnected: false,
  facebookIntegration: '',
  tiktokConnected: false,
  shopifyConnected: false,
  isLoadingConnection: false,
  googleConnected: false,
  allSocialMediaAccountsDisconnected: false,
  allAdsAccountsDisconnected: false,
  previousConnected: {
    facebook: null,
    tiktok: null,
    google: null,
  },
};

export const createBusinessConectionSlice: StateCreator<
  BusinessConnectionsSlice,
  [],
  []
> = (set) => ({
  ...initialBusinessConnectionSlice,
  setFacebookConnected: (facebookConnected: boolean) =>
    set((state) => ({ ...state, facebookConnected })),
  setFacebokIntegration: (facebookIntegration: string) =>
    set((state) => ({ ...state, facebookIntegration })),
  setTiktokConnected: (tiktokConnected: boolean) =>
    set((state) => ({ ...state, tiktokConnected })),
  setShopifyConnected: (shopifyConnected: boolean) =>
    set((state) => ({ ...state, shopifyConnected })),
  setIsLoadingConnection: (isLoadingConnection: boolean) =>
    set((state) => ({ ...state, isLoadingConnection })),
  setGoogleConnected: (googleConnected: boolean) =>
    set((state) => ({ ...state, googleConnected })),
  setAllSocialMediaAccountsDisconnected: (
    allSocialMediaAccountsDisconnected: boolean,
  ) => set((state) => ({ ...state, allSocialMediaAccountsDisconnected })),
  setAllAdsAccountsDisconnected: (allAdsAccountsDisconnected: boolean) =>
    set((state) => ({ ...state, allAdsAccountsDisconnected })),
  setPreviousConnected: (previousConnected: PreviousConnectedProp) =>
    set((state) => ({ ...state, previousConnected })),
});
