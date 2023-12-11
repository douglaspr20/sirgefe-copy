import { StateCreator } from 'zustand';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { User } from '@sirge-io/sirge-types';
import { MarketingPlatforms } from '@enums/marketingPlatforms';
import {
  PerformanceSummary,
  Performance,
  UserPrisma,
  BusinessPrisma,
} from 'API';
import { filterConditionType, MemberCount } from '@interfaces/performance';
import { BusinessProfile } from '@interfaces/business';
import { BusinessProfileSlice } from './businessProfileSlice';
export const enum PerformancePageState {
  success,
  loading,
  noResults,
  noResultsWithFilters,
  adAccountsNotConnected,
}

enum Platforms {
  FACEBOOK = 'Facebook',
  TIKTOK = 'Tiktok',
  GOOGLE = 'Google',
}

interface State {
  currentPurchase: string | null;
  currentPlatform: MarketingPlatforms;
  currentSelectedDateValue: DateRangeType | null;
  campaignsSelected: any[];
  adSetsSelected: any[];
  adsSelected: any[];
  faceBookToggle: boolean;
  allPerformanceRows: Performance[];
  summaryPerformanceRows: PerformanceSummary | null;
  memberCount: MemberCount | null;
  selectedAdGroupsExplore: {
    selected_campaign_ids: string[];
    selected_ad_set_ids: string[];
  };
  currentPage: number;
  filterProps: filterConditionType;
  loading: PerformancePageState;
  activeFilterCount: number;
}

interface Actions {
  setCurrentPurchase: (currentPurchase: string) => void;
  setCurrentPlatform: (currentPlatform: MarketingPlatforms) => void;
  setCurrentSelectedDateValue: (
    currentSelectedDateValue: DateRangeType | null,
  ) => void;
  setCampaignsSelected: (campaignsSelected: any[]) => void;
  setAdSetsSelected: (adSetsSelected: any[]) => void;
  setAdsSelected: (adsSelected: any[]) => void;
  setFaceBookToggle: (faceBookToggle: boolean) => void;
  setAllPerformanceRows: (allPerformanceRows: Performance[]) => void;
  setSummaryPerformanceRows: (
    summaryPerformanceRows: PerformanceSummary,
  ) => void;
  setMemberCount: (memberCount: MemberCount | null) => void;
  setselectedAdGroupsExplore: (selectedAdGroupsExplore: {
    selected_campaign_ids: string[];
    selected_ad_set_ids: string[];
  }) => void;
  setCurrentPage: (currentPage: number) => void;
  setFilterProps: (filterProps: filterConditionType) => void;
  setLoading: (loading: PerformancePageState) => void;
  setActiveFilterCount: (activeFilterCount: number) => void;
}

export interface PerformanceSlice extends State, Actions {}

const initalPurchase = (): string | null => {
  const savedPurchase: string | null = 'Campaigns';
  if (typeof window !== 'undefined') {
    const localSavedPurchase = localStorage.getItem('current_purchase');
    if (localSavedPurchase) {
      return localSavedPurchase;
    }
  }
  return savedPurchase;
};

const initialPlatform = (
  businessProfile: BusinessProfile | null | undefined,
  selectedBusiness: BusinessPrisma | null | undefined,
): MarketingPlatforms => {
  let savedPlatform: string | null = null;

  if (typeof window !== 'undefined') {
    const localPlatform = localStorage.getItem('current_platform');
    if (localPlatform !== null) {
      savedPlatform = localPlatform;
    }
  }
  let value;

  if (savedPlatform) {
    const fbPlatform = selectedBusiness?.ad_account_settings.find(
      (accountSetting) => {
        accountSetting.ad_platform.name === Platforms.FACEBOOK;
      },
    );
    const tiktokPlatform = selectedBusiness?.ad_account_settings.find(
      (accountSetting) => {
        accountSetting.ad_platform.name === Platforms.TIKTOK;
      },
    );
    if (
      savedPlatform === MarketingPlatforms.FACEBOOK &&
      businessProfile?.profile?.facebook_ad_account_id &&
      fbPlatform?.access_token
    )
      value = MarketingPlatforms.FACEBOOK;
    if (
      savedPlatform === MarketingPlatforms.TIKTOK &&
      businessProfile?.profile?.tik_tok_ad_account_id &&
      tiktokPlatform?.social_integration
    )
      value = MarketingPlatforms.TIKTOK;
  }

  if (!value) value = MarketingPlatforms.ALLPLATFORMS;
  return value as MarketingPlatforms;
};

const initalSummary = (): PerformanceSummary => {
  const summary = {
    amount_spent: 0,
    clicks: 0,
    purchases: 0,
    cost_per_purchase: 0,
    total_conversion_value: 0,
    roas: '',
    ft_clicks: 0,
    ft_purchases: 0,
    ft_cost_per_purchase: 0,
    ft_total_conversion_value: 0,
    ft_roas: '',
  } as PerformanceSummary;
  return summary;
};

export const createPerformanceSlice: StateCreator<
  PerformanceSlice & Partial<BusinessProfileSlice>,
  [],
  []
> = (set, get) => ({
  currentPurchase: initalPurchase(),
  setCurrentPurchase: (currentPurchase: string) =>
    set((state) => ({ ...state, currentPurchase })),
  currentPlatform: initialPlatform(
    get()?.businessProfile,
    get()?.selectedBusiness,
  ),
  setCurrentPlatform: (currentPlatform: MarketingPlatforms) =>
    set((state) => ({ ...state, currentPlatform })),
  currentSelectedDateValue: null,
  setCurrentSelectedDateValue: (
    currentSelectedDateValue: DateRangeType | null,
  ) => set((state) => ({ ...state, currentSelectedDateValue })),
  campaignsSelected: [],
  setCampaignsSelected: (campaignsSelected: any[]) =>
    set((state) => ({ ...state, campaignsSelected })),
  adSetsSelected: [],
  setAdSetsSelected: (adSetsSelected: any[]) =>
    set((state) => ({ ...state, adSetsSelected })),
  adsSelected: [],
  setAdsSelected: (adsSelected: any[]) =>
    set((state) => ({ ...state, adsSelected })),
  faceBookToggle: false,
  setFaceBookToggle: (faceBookToggle: boolean) =>
    set((state) => ({ ...state, faceBookToggle })),
  allPerformanceRows: [],
  setAllPerformanceRows: (allPerformanceRows: Performance[]) =>
    set((state) => ({ ...state, allPerformanceRows })),
  summaryPerformanceRows: initalSummary(),
  setSummaryPerformanceRows: (summaryPerformanceRows: PerformanceSummary) =>
    set((state) => ({ ...state, summaryPerformanceRows })),
  memberCount: {
    adSetCount: 1,
    adsCount: 2,
  },
  setMemberCount: (memberCount: MemberCount | null) =>
    set((state) => ({ ...state, memberCount })),
  selectedAdGroupsExplore: {
    selected_campaign_ids: [] as string[],
    selected_ad_set_ids: [] as string[],
  },
  setselectedAdGroupsExplore: (selectedAdGroupsExplore: {
    selected_campaign_ids: string[];
    selected_ad_set_ids: string[];
  }) => set((state) => ({ ...state, selectedAdGroupsExplore })),
  currentPage: 0,
  setCurrentPage: (currentPage: number) =>
    set((state) => ({ ...state, currentPage })),
  filterProps: {
    activeChecked: true,
    filterStatus: false,
    Condition: [],
  },
  setFilterProps: (filterProps: filterConditionType) =>
    set((state) => ({ ...state, filterProps })),
  loading: PerformancePageState.loading,
  setLoading: (loading: PerformancePageState) =>
    set((state) => ({ ...state, loading: loading })),
  activeFilterCount: 1,
  setActiveFilterCount: (activeFilterCount: number) =>
    set((state) => ({ ...state, activeFilterCount })),
});
