import { StateCreator } from 'zustand';
import { BusinessProfile } from '@interfaces/business';
import { FacebookAdAccount } from '@interfaces/facebook';
import { AdAccountSettingsPrisma, BusinessPrisma, UserPrisma } from '../../API';
import { MarketingSources } from '@sirge-io/sirge-types';

type ConfiguredSources = Exclude<
  MarketingSources,
  MarketingSources.UNKNOWN | MarketingSources.ALL
>;

interface State {
  businessProfile: BusinessProfile | null;
  selectedFacebookAdAccount: Partial<FacebookAdAccount> | null;
  businessList: BusinessPrisma[];
  selectedBusiness: BusinessPrisma | null;
  businessCount: number | null;
  businessActiveCount: number | null;
  userProfile: UserPrisma | null;
  accountStatusData: boolean;
  platformMode: any;
  socialConfig: {
    [k in ConfiguredSources]: Partial<
      Omit<AdAccountSettingsPrisma, '__typename'>
    >;
  };
}

interface Actions {
  setBusinessProfile: (businessProfile: BusinessProfile) => void;
  setSelectedFacebookAdAccount: (
    selectedFacebookAdAccount: Partial<FacebookAdAccount> | null,
  ) => void;
  setBusinessList: (businessList: BusinessPrisma[]) => void;
  setSelectedBusiness: (selectedBusiness: BusinessPrisma | null) => void;
  setBusinessCount: (businessCount: number) => void;
  setBusinessActiveCount: (businessActiveCount: number) => void;
  setUserProfile: (userProfile: UserPrisma | null) => void;
  setIsloading: (isLoading: boolean) => void;
  updateBusinessAdAccount: (businessId: string, adData: BusinessPrisma) => void;
}

export interface BusinessProfileSlice extends State, Actions {}

export const initialBusinessProfileSlice: State = {
  businessProfile: null,
  selectedFacebookAdAccount: null,
  businessList: [],
  selectedBusiness: null,
  businessCount: null,
  businessActiveCount: null,
  userProfile: null,
  accountStatusData: false,
  platformMode: null,
  socialConfig: {
    [MarketingSources.FACEBOOK]: {},
    [MarketingSources.TIKTOK]: {},
    [MarketingSources.GOOGLE]: {},
  },
};

export const createBusinessProfileSlice: StateCreator<
  BusinessProfileSlice,
  [],
  []
> = (set) => ({
  ...initialBusinessProfileSlice,
  setBusinessProfile: (businessProfile: BusinessProfile) =>
    set((state) => ({ ...state, businessProfile })),
  setSelectedFacebookAdAccount: (
    selectedFacebookAdAccount: Partial<FacebookAdAccount> | null,
  ) => set((state) => ({ ...state, selectedFacebookAdAccount })),
  setBusinessList: (businessList: BusinessPrisma[]) =>
    set((state) => ({ ...state, businessList })),
  setSelectedBusiness: (selectedBusiness: BusinessPrisma | null) =>
    set((state) => ({ ...state, selectedBusiness })),
  setBusinessCount: (businessCount: number) =>
    set((state) => ({ ...state, businessCount })),
  setBusinessActiveCount: (businessActiveCount: number) =>
    set((state) => ({ ...state, businessActiveCount })),
  setUserProfile: (userProfile: UserPrisma | null) =>
    set((state) => ({ ...state, userProfile })),
  setIsloading: (isLoading: boolean) =>
    set((state) => ({ ...state, isLoading })),
  updateBusinessAdAccount: (businessId: string, adData: BusinessPrisma) => {
    return set((state) => {
      const list = state.businessList.map((business) => {
        if (business.id === businessId) {
          return {
            ...business,
            ...adData,
          };
        }

        return business;
      });
      const prevBusiness = state.selectedBusiness;
      const slBusiness = {
        ...prevBusiness,
        ...adData,
      };
      return { ...state, businessList: list, selectedBusiness: slBusiness };
    });
  },
});
