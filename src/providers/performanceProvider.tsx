'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MarketingPlatforms } from '@enums/marketingPlatforms';
import { useBusinessProfileContext } from './businessProfileProvider';
import dayjs from 'dayjs';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { Performance, PerformanceSummary } from '../API';
import {
  filterConditionType,
  MemberCount,
  RoasGoalOption,
} from '@interfaces/performance';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';

export const enum PerformancePageState {
  success,
  loading,
  noResults,
  noResultsWithFilters,
  adAccountsNotConnected,
}

dayjs.extend(utc);
dayjs.extend(timezone);

type PerformanceContextType = {
  currentPurchase: string | null;
  setCurrentPurchase: Dispatch<SetStateAction<string | null>>;
  currentPlatform: MarketingPlatforms;
  setCurrentPlatform: Dispatch<SetStateAction<MarketingPlatforms>>;
  currentSelectedDateValue: DateRangeType | null;
  setCurrentSelectedDateValue: Dispatch<SetStateAction<DateRangeType | null>>;

  campaignsSelected: any[];
  setCampaignsSelected: Dispatch<SetStateAction<any[]>>;
  adSetsSelected: any[];
  setAdSetsSelected: Dispatch<SetStateAction<any[]>>;
  adsSelected: any[];
  setAdsSelected: Dispatch<SetStateAction<any[]>>;
  faceBookToggle: boolean;
  setFaceBookToggle: Dispatch<SetStateAction<boolean>>;
  allPerformanceRows: Performance[];
  setAllPerformanceRows: Dispatch<SetStateAction<Performance[]>>;
  summaryPerformanceRows: PerformanceSummary | null;
  setSummaryPerformanceRows: Dispatch<SetStateAction<PerformanceSummary>>;
  memberCount: MemberCount | null;
  selectedAdGroupsExplore: {
    selected_campaign_ids: string[];
    selected_ad_set_ids: string[];
  };

  setselectedAdGroupsExplore: Dispatch<
    SetStateAction<{
      selected_campaign_ids: string[];
      selected_ad_set_ids: string[];
    }>
  >;
  setMemberCount: Dispatch<SetStateAction<MemberCount | null>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  filterProps: filterConditionType;
  setFilterProps: Dispatch<SetStateAction<filterConditionType>>;
  setLoading: Dispatch<SetStateAction<PerformancePageState>>;
  loading: PerformancePageState;
  activeFilterCount: number;
  setActiveFilterCount: Dispatch<SetStateAction<number>>;
};

const PerformanceContext = createContext<PerformanceContextType>(undefined!);

export const usePerformaceContext = () => useContext(PerformanceContext);

type PerformanceProviderProps = {
  children: ReactNode;
};

export const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  const router = useRouter();
  const { keyword } = router.query;

  const { businessProfile, userProfile, selectedBusiness } =
    useBusinessProfileContext();
  const [memberCount, setMemberCount] = useState<MemberCount | null>({
    adSetCount: 1,
    adsCount: 2,
  });

  const [selectedAdGroupsExplore, setselectedAdGroupsExplore] = useState({
    selected_campaign_ids: [] as string[],
    selected_ad_set_ids: [] as string[],
  });

  const [filterProps, setFilterProps] = useState<filterConditionType>({
    activeChecked: true,
    filterStatus: false,
    Condition: [],
  });

  const [loading, setLoading] = useState(PerformancePageState.loading);
  const [activeFilterCount, setActiveFilterCount] = useState<number>(1);

  useEffect(() => {
    if (keyword && keyword !== '') {
      setFilterProps({
        ...filterProps,
        ...{
          activeChecked: true,
          roas:
            keyword === 'Under' ? RoasGoalOption.UNDER : RoasGoalOption.ABOVE,
        },
      });
    }
  }, [keyword]);

  const initalfacebook = (): boolean => {
    return false;
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

  const initalPurchase = (): string | null => {
    const savedPurchase =
      localStorage.getItem('current_purchase') ?? 'Campaigns';
    return savedPurchase;
  };

  const initalPlatform = (): MarketingPlatforms => {
    const savedPlatform = localStorage.getItem('current_platform');
    let value;
    if (savedPlatform) {
      if (
        savedPlatform === MarketingPlatforms.FACEBOOK &&
        businessProfile.profile?.facebook_ad_account_id &&
        userProfile?.facebook_accessToken
      )
        value = MarketingPlatforms.FACEBOOK;
      if (
        savedPlatform === MarketingPlatforms.TIKTOK &&
        businessProfile.profile?.tik_tok_ad_account_id &&
        userProfile?.tik_tok_integration
      )
        value = MarketingPlatforms.TIKTOK;
    }

    if (!value) value = MarketingPlatforms.ALLPLATFORMS;
    return value;
  };
  const [currentPlatform, setCurrentPlatform] = useState(initalPlatform());
  const [currentPurchase, setCurrentPurchase] = useState(initalPurchase());
  const [currentPage, setCurrentPage] = useState(0);
  const [faceBookToggle, setFaceBookToggle] = useState(initalfacebook());
  //---------------------------------------------------------------------
  const [currentSelectedDateValue, setCurrentSelectedDateValue] =
    useState<DateRangeType | null>(null);

  const [allPerformanceRows, setAllPerformanceRows] = useState<Performance[]>(
    [],
  );
  const [summaryPerformanceRows, setSummaryPerformanceRows] = useState(
    initalSummary(),
  );

  const [campaignsSelected, setCampaignsSelected] = useState<any[]>([]);
  const [adSetsSelected, setAdSetsSelected] = useState<any[]>([]);
  const [adsSelected, setAdsSelected] = useState<any[]>([]);

  useEffect(() => {
    try {
      const onboardedSinceHours = dayjs().diff(
        dayjs(selectedBusiness?.created_at).format(),
        'hours',
      );

      if (onboardedSinceHours < 72) {
        setCurrentSelectedDateValue({
          startDate: dayjs()
            .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
            .format('YYYY-MM-DD'),
          endDate: dayjs()
            .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
            .format('YYYY-MM-DD'),
        });
      } else {
        setCurrentSelectedDateValue({
          startDate: dayjs()
            .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
            .subtract(7, 'days')
            .format('YYYY-MM-DD'),
          endDate: dayjs()
            .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
            .subtract(1, 'day')
            .format('YYYY-MM-DD'),
        });
      }
    } catch (error) {
      /** set default tz */
      setCurrentSelectedDateValue({
        startDate: dayjs()
          .tz('America/Los_Angeles')
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        endDate: dayjs()
          .tz('America/Los_Angeles')
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
      });
    }
  }, [selectedBusiness?.timezone, selectedBusiness?.created_at]);

  return (
    <PerformanceContext.Provider
      value={{
        currentPurchase,
        setCurrentPurchase,
        currentPlatform,
        setCurrentPlatform,
        currentSelectedDateValue,
        setCurrentSelectedDateValue,
        campaignsSelected,
        setCampaignsSelected,
        adSetsSelected,
        setAdSetsSelected,
        adsSelected,
        setAdsSelected,
        faceBookToggle,
        setFaceBookToggle,
        allPerformanceRows,
        setAllPerformanceRows,
        summaryPerformanceRows,
        setSummaryPerformanceRows,
        memberCount,
        selectedAdGroupsExplore,
        setselectedAdGroupsExplore,
        setMemberCount,
        currentPage,
        setCurrentPage,
        filterProps,
        setFilterProps,
        setLoading,
        loading,
        activeFilterCount,
        setActiveFilterCount,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};
