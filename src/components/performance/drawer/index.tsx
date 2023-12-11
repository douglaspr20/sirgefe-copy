'use client';
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { API, graphqlOperation } from 'aws-amplify';
import type { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  getPerformanceDrawerBasicDetailsNew,
  getPerformanceDrawerStatsNew,
  getPerformanceNotesNew,
} from '@graphql/queries';
import {
  setPerformanceNotesNew,
  updateAdDailyBudgetNew,
  updateAdLevelStatusNew,
} from '@graphql/mutations';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import {
  ContentState,
  EditorState,
  // convertFromHTML,
  convertToRaw,
} from 'draft-js';
import { optionsLineChart } from '@utils/optionsChart';
import {
  BusinessPrisma,
  GetPerformanceNotesNewQuery,
  SetPerformanceNotesNewMutation,
  UpdateAdDailyBudgetNewMutation,
} from 'API';
import OptionsView from './OptionsView';
import ConfirmView from './ConfirmView';
import BudgetDetails from './DailyBudgetDetails';
import {
  getLabelsClass,
  getLabelsDate,
  generateLabels,
} from '@utils/generateChartLabel';
import {
  TypesValues,
  capitalizeFirstWord,
  formatMoneyWithDecimals,
  getPlatformCurrencyForSelectedPlatform,
  modifyAdLevelLabel,
} from '@utils/format';
import { groupByGraphData } from '@utils/grouped';
import { handleAccountType } from '@utils/utm-handler';
import {
  AdLevelTypes,
  AdStatusUpdate,
  MarketingSources,
} from '@sirge-io/sirge-types';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';

import Placeholder from '@assets/img/Image_Placeholder_Day.svg';
import { ExtendedEditorProps } from '@interfaces/trackableCopy';
import draftToHtml from 'draftjs-to-html';

const htmlToDraft =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  typeof window === 'object' && require('html-to-draftjs').default;

const Editor = dynamic(
  () =>
    import('react-draft-wysiwyg').then(
      (mod) => mod.Editor as React.ComponentType<ExtendedEditorProps>,
    ),
  { ssr: false },
);
import UpdateNotification from '@components/UpdateNotification';
import { useBoundStore } from '@store/index';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type ConfirmViewPropsType = {
  loading?: boolean;
  icon: 'error' | 'warning' | 'success';
  title: string;
  description?: string | ReactElement;
  isdescriptionIndicatorPresent?: boolean;
  action?: () => void;
  actionText?: string;
  haveDeclineOption?: boolean;
  type?: string;
  showConfirmation?: boolean;
};

export type DrawerBasicInfo = {
  ad_images: string[];
  ad_type: string | null;
  id: string;
  name: string;
  no_of_ads: number;
  no_of_adsets: number;
  source: string;
  source_delivery_status: string;
  source_secondary_status: string;
  utm_status: false;
  utm_status_active: number;
  utm_status_inactive: number;
  daily_budget: number | null;
  lifetime_budget: number | null;
  shared_budget_name: string | null;
};

export type DrawerStats = {
  graph: {
    created: string;
    total_amount_spent: number;
    total_conversion_value: number;
  }[];
  total_amount_spent: number;
  total_conversion: number;
  total_purchases: number;
  total_roas: number;
};

export type DrawerOptionProps = {
  isOpen: boolean;
  adId: string;
  sirge_adset_id?: string | null;
  adType: string;
  name: string;
  utm_status: boolean;
  are_all_ads_connected: boolean;
  source_delivery_status: string;
  is_editing_budget: boolean;
  titles?: {
    mainTitle: string;
    tooltipTitle: string;
  };
  daily_budget: number;
  lifetime_budget: number;
  shared_budget_name: string;
};

type Props = {
  drawerOptions: DrawerOptionProps;
  setDrawerOptions: React.Dispatch<React.SetStateAction<DrawerOptionProps>>;
  selectedBusiness: BusinessPrisma;
  setDialogOptions: React.Dispatch<
    React.SetStateAction<{
      type: ValidTypeMessages;
      message: string;
      description?: string;
    }>
  >;
  refreshData: (id?: string, name?: string, itemType?: string) => void;
};

const PerformanceDrawer: React.FunctionComponent<Props> = ({
  drawerOptions,
  setDrawerOptions,
  selectedBusiness,
  setDialogOptions,
  refreshData,
}) => {
  const { currentPurchase } = useBoundStore.getState();

  const [basicData, setBasicData] = useState<DrawerBasicInfo>();
  const [statsData, setStatsData] = useState<DrawerStats>();
  const [performanceNote, setPerformanceNote] = useState<string>('');
  const [noteDescription, setNoteDescription] = useState<string>('');

  const [showConfirmView, setShowConfirmView] = useState(false);
  const [showBudgetDetailsView, setShowBudgetDetailsView] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [performanceFilter, setPerformanceFilter] =
    useState<TypesValues>('today');
  const [performanceDrawerTabs, setPerformanceDrawerTabs] =
    useState<string>('performance');
  const [loadingUtm, setLoadingUtm] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const dismissSuccessModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const [notificationState, setNotificationState] = useState<string | null>(
    null,
  );
  const [statusUpdate, setStatusUpdate] = useState<string | null>(null);
  const [dailyBudget, setDailyBudget] = useState<number | null>(
    basicData?.daily_budget ?? null,
  );
  const [errorText, setErrorText] = useState('');

  const [statusNotificationLoader, setStatusNotificationLoader] =
    useState<boolean>(false);

  const [dailyBudgetNotificationLoader, setDailyBudgetNotificationLoader] =
    useState<boolean>(false);

  const [performanceNoteLoader, setPerformanceNoteLoader] =
    useState<boolean>(false);

  const contentBlock = htmlToDraft('');
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
  );
  const editorStateInitial = EditorState.createWithContent(contentState);
  const [editorState, setEditorState] = useState(editorStateInitial);
  const [amountSpentArray, setAmountSpentArray] = useState<any>([]);
  const [totalConversionValueArray, setTotalConversionValueArray] =
    useState<any>([]);

  const [confirmViewProps, setConfirmViewProps] =
    useState<ConfirmViewPropsType>({
      icon: 'error',
      title: 'Are You Sure To Change Budget?',
      description: (
        <span className="text-textSecondaryColor">
          From <strong>$500</strong> to <strong>$200</strong> daily
        </span>
      ),
      action: () => {
        setShowConfirmView(false);
      },
      actionText: 'Change',
      haveDeclineOption: true,
      type: 'budget',
    });

  const [showBudgetConfirmation, setShowBudgetConfirmation] = useState<boolean>(
    selectedBusiness?.show_budget_confirmation || true,
  );

  useEffect(() => {
    if (selectedBusiness?.show_budget_confirmation) {
      setShowBudgetConfirmation(
        selectedBusiness.show_budget_confirmation || showBudgetConfirmation,
      );
    }
  }, [selectedBusiness?.show_budget_confirmation, showBudgetConfirmation]);

  useEffect(() => {
    if (drawerOptions?.isOpen) {
      setPerformanceFilter('today');
      setPerformanceDrawerTabs('performance');
    }

    setLoadingUtm(false);
  }, [drawerOptions.isOpen]);

  const getPerformanceDetailsBasic = useCallback(async () => {
    try {
      const today = dayjs().tz(
        selectedBusiness?.store?.timezone || 'America/Chicago',
      );
      const format = 'YYYY-MM-DD';

      const [
        basicDataResponse,
        statsResponse,
        getPerformanceNotesResponse,
      ]: any = await Promise.all([
        API.graphql(
          graphqlOperation(getPerformanceDrawerBasicDetailsNew, {
            getPerformanceDrawerBasicDetailsInput: {
              ad_type:
                currentPurchase === 'Ads'
                  ? 'ads'
                  : currentPurchase === 'Campaigns'
                  ? 'campaigns'
                  : 'adSets',
              id: drawerOptions.adId,
              business_id: selectedBusiness.id,
            },
          }),
        ),
        API.graphql(
          graphqlOperation(getPerformanceDrawerStatsNew, {
            getPerformanceDrawerStatsInput: {
              ad_type:
                currentPurchase === 'Ads'
                  ? 'ads'
                  : currentPurchase === 'Campaigns'
                  ? 'campaigns'
                  : 'adSets',
              id: drawerOptions.adId,
              dateStart: today.subtract(6, 'day').format(format),
              dateEnd: today.add(1, 'day').format(format),
              business_id: selectedBusiness.id,
            },
          }),
        ),
        API.graphql(
          graphqlOperation(getPerformanceNotesNew, {
            getPerformanceNotesInput: {
              id: drawerOptions?.adId,
              business_id: selectedBusiness.id,
              ad_type:
                currentPurchase === 'Ads'
                  ? 'ads'
                  : currentPurchase === 'Campaigns'
                  ? 'campaigns'
                  : 'adSets',
            },
          }),
        ),
      ]);

      const basicData =
        basicDataResponse.data.getPerformanceDrawerBasicDetailsNew;

      const statsData = statsResponse.data.getPerformanceDrawerStatsNew;

      const { data: responseGetPerformanceNotesData } =
        getPerformanceNotesResponse as GraphQLResult<GetPerformanceNotesNewQuery>;

      const responseGetPerformanceNotes =
        responseGetPerformanceNotesData?.getPerformanceNotesNew;

      if (basicData.error) {
        throw new Error(basicData.error?.message);
      }

      if (statsData.error) {
        throw new Error(statsData.error?.message);
      }

      if (responseGetPerformanceNotes?.error) {
        throw new Error(
          responseGetPerformanceNotes?.message ||
            'An unexpected error occurred in getPerformanceDetailsBasic',
        );
      }

      setBasicData(basicData.data);
      setStatsData(statsData.data);
      setPerformanceNote(responseGetPerformanceNotes?.data?.description ?? '');
      setNoteDescription(responseGetPerformanceNotes?.data?.description ?? '');

      const contentBlock = htmlToDraft(
        responseGetPerformanceNotes?.data?.description ?? '',
      );
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorStateInitial = EditorState.createWithContent(contentState);
      setEditorState(editorStateInitial);
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    } finally {
      setLoading(false);
    }
  }, [
    drawerOptions.adId,
    currentPurchase,
    selectedBusiness?.id,
    selectedBusiness?.store?.timezone,
  ]);

  useEffect(() => {
    setLoading(true);
    if (drawerOptions.isOpen) {
      getPerformanceDetailsBasic();
      setErrorText('');
    }
  }, [
    drawerOptions.isOpen,
    currentPurchase,
    drawerOptions.utm_status,
    getPerformanceDetailsBasic,
  ]);

  /**
   * get item type
   */
  const itemType = useMemo(() => {
    return currentPurchase === 'Ads'
      ? 'Ad'
      : currentPurchase === 'Campaigns'
      ? 'Campaign'
      : 'Ad Set';
  }, [currentPurchase]);

  /**
   * graph config
   */
  const labelsDate = getLabelsDate(
    performanceFilter,
    true,
    selectedBusiness?.store?.timezone || 'America/Chicago',
  );
  const chartLabels = generateLabels(
    performanceFilter,
    true,
    selectedBusiness?.store?.timezone || 'America/Chicago',
  );

  useEffect(() => {
    if ((statsData?.graph?.length as any) > 0) {
      const spentData = statsData?.graph.map((entry) => {
        const entryData = {
          created: entry.created,
          amount: entry.total_amount_spent,
        };
        return entryData;
      });
      const groupSpentData = groupByGraphData(
        spentData || [],
        performanceFilter,
        labelsDate,
        selectedBusiness?.store?.timezone || 'America/Chicago',
        false,
      );
      const spentArray = chartLabels?.map((label: string) => {
        const value = groupSpentData[label]?.toFixed(2);
        return value || 0;
      });
      setAmountSpentArray(spentArray);
    }

    const tcvData = statsData?.graph.map(
      (entry: { total_conversion_value: number; created: string }) => ({
        created: entry.created,
        amount: entry.total_conversion_value,
      }),
    );
    const groupTcvData = groupByGraphData(
      tcvData || [],
      performanceFilter,
      labelsDate,
      selectedBusiness?.store?.timezone || 'America/Chicago',
      false,
    );
    const tcvArray = chartLabels?.map((label: string) => {
      const value = Number(groupTcvData[label]?.toFixed(2));

      return value || 0;
    });
    setTotalConversionValueArray(tcvArray);
  }, [statsData?.graph]);

  /**
   * handle date filter
   * @param date
   * @returns
   */
  const handlePerformanceDateFilter = async (date: TypesValues) => {
    setPerformanceFilter(date);

    const today = dayjs().tz(
      selectedBusiness?.store?.timezone || 'America/Chicago',
    );
    const format = 'YYYY-MM-DD';

    if (date === 'today') {
      const dateEnd = today.add(1, 'day').format(format);

      return await handleDrawerPerformanceStats(
        today.subtract(6, 'day').format(format),
        dateEnd,
      );
    }

    /** previous days */
    const substrackDate = parseInt((date as any).match(/(\d+)_days/)[1], 10);

    const dateStart = today.subtract(substrackDate, 'day').format(format);
    const dateEnd = today.subtract(1, 'day').format(format);

    await handleDrawerPerformanceStats(dateStart, dateEnd);
  };

  /**
   * handle stats by date range
   * @param dateStart
   * @param dateEnd
   */
  const handleDrawerPerformanceStats = async (
    dateStart: string,
    dateEnd: string,
  ) => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(getPerformanceDrawerStatsNew, {
          getPerformanceDrawerStatsInput: {
            ad_type:
              currentPurchase === 'Ads'
                ? 'ads'
                : currentPurchase === 'Campaigns'
                ? 'campaigns'
                : 'adSets',
            id: drawerOptions.adId,
            dateStart,
            dateEnd,
            business_id: selectedBusiness.id,
          },
        }),
      );

      const statsData = response.data.getPerformanceDrawerStatsNew;

      if (statsData.error) {
        throw new Error(statsData.error?.message);
      }
      setStatsData(statsData.data);
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    }
  };

  /**
   * connect utm
   */
  const handleConnectUtm = async () => {
    setLoadingUtm(true);

    handleAccountType(basicData?.source as string, {
      currentPurchase: currentPurchase as string,
      id: drawerOptions.adId as string,
      business_id: selectedBusiness.id,
      refreshData: () =>
        refreshData(
          drawerOptions.adId,
          (basicData?.name as string) || drawerOptions.name,
          currentPurchase as string,
        ),
      dismissSuccessModalButtonRef,
      setDialogOptions: setDialogOptions,
      setLoading: setLoadingUtm,
    });
  };

  /** === handle functions === */

  /** === Status updated for campaign/ad/adset === */
  const handleStatus = async (isOn: boolean) => {
    const title = `Are You Sure To Turn ${isOn ? 'Off' : 'On'} ${itemType}`;
    const description = isOn
      ? 'Campaign might be back to learning when you turn it on again'
      : '';

    setConfirmViewProps({
      icon: 'warning',
      title,
      description,
      isdescriptionIndicatorPresent: isOn,
      // action: handleStatus,
      actionText: isOn ? 'Turn Off' : 'Turn On',
      haveDeclineOption: true,
      action: () =>
        updateAdStatus(
          drawerOptions.adId,
          modifyAdLevelLabel(currentPurchase?.toLowerCase() as string),
          isOn ? AdStatusUpdate?.DISABLE : AdStatusUpdate?.ENABLE,
          basicData?.source as string,
        ),
      type: 'status',
    });
  };

  const updateAdStatus = async (
    id: string,
    adType: AdLevelTypes,
    status: AdStatusUpdate,
    source: string,
  ) => {
    setLoadingStatus(true);

    const adLevelType = capitalizeFirstWord(
      modifyAdLevelLabel(currentPurchase?.toLowerCase() as string),
    );

    setConfirmViewProps({
      icon: 'warning',
      title: `${adLevelType} status is updating`,
      description: 'Please wait, we are updating the status',
      haveDeclineOption: true,
    });

    const business_id = selectedBusiness?.id;

    try {
      const response: any = await API.graphql(
        graphqlOperation(updateAdLevelStatusNew, {
          updateAdLevelStatusInput: {
            id: id,
            businessId: business_id,
            source: source,
            typeOfAd: adType,
            status: status,
          },
        }),
      );

      if (
        response?.data?.updateAdLevelStatusNew?.data?.error ||
        response?.data?.updateAdLevelStatusNew?.error ||
        !response?.data?.updateAdLevelStatusNew?.data
      ) {
        throw new Error(response?.updateAdLevelStatusNew?.message);
      }

      if (response?.data?.updateAdLevelStatusNew?.data) {
        setStatusUpdate(status === AdStatusUpdate.ENABLE ? 'on' : 'off');

        setBasicData({
          ...basicData,
          source_delivery_status:
            status === AdStatusUpdate.ENABLE ? 'Active' : 'Paused',
        } as DrawerBasicInfo);
        refreshData();

        setNotificationState('success');
      }
    } catch (error: any) {
      Sentry.captureException(new Error(error));
      setNotificationState('failure');
    } finally {
      setStatusNotificationLoader(true);
      setLoadingStatus(false);
      setShowConfirmView(false);

      setTimeout(() => {
        setStatusNotificationLoader(false);
      }, 3000);
    }
  };

  /** === Daily budget updated for campaign/adset === */
  const handleDailyBudget = async (amount: number | null) => {
    const title = `Are you sure to change budget from ${(
      basicData?.daily_budget ?? basicData?.lifetime_budget
    )?.toLocaleString('en-US', {
      style: 'currency',
      currency: getPlatformCurrencyForSelectedPlatform(
        basicData?.source as MarketingSources,
        selectedBusiness,
      ),
      maximumFractionDigits: 2,
    })} to ${amount?.toLocaleString('en-US', {
      style: 'currency',
      currency: getPlatformCurrencyForSelectedPlatform(
        basicData?.source as MarketingSources,
        selectedBusiness,
      ),
      maximumFractionDigits: 2,
    })}`;

    if (showBudgetConfirmation) {
      setConfirmViewProps({
        icon: 'warning',
        title,
        description: '',
        isdescriptionIndicatorPresent: false,
        actionText: 'Change budget',
        haveDeclineOption: true,
        type: 'budget',
        action: () => {
          updateDailyBudget(
            drawerOptions.adId,
            modifyAdLevelLabel(currentPurchase?.toLowerCase() as string),
            amount,
            basicData?.source as string,
          );
          setDrawerOptions({
            ...drawerOptions,
            is_editing_budget: false,
          });
        },
      });
    } else {
      updateDailyBudget(
        drawerOptions.adId,
        modifyAdLevelLabel(currentPurchase?.toLowerCase() as string),
        amount,
        basicData?.source as string,
      );
      setDrawerOptions({
        ...drawerOptions,
        is_editing_budget: false,
      });
    }
  };

  const updateDailyBudget = async (
    id: string,
    adType: AdLevelTypes,
    amount: number | null,
    source: string,
  ) => {
    setLoadingStatus(true);
    setConfirmViewProps({
      icon: 'warning',
      title: 'Budget is updating',
      description: 'Please wait, we are updating the budget',
      isdescriptionIndicatorPresent: false,
      haveDeclineOption: true,
      type: 'budget',
    });

    const business_id = selectedBusiness?.id;
    try {
      const responseUpdateAdDailyBudget = await API.graphql(
        graphqlOperation(updateAdDailyBudgetNew, {
          updateAdDailyBudgetInput: {
            id,
            source,
            amount,
            businessId: business_id,
            typeOfAd: adType,
            budget_type: basicData?.lifetime_budget
              ? 'lifetime_budget'
              : 'daily_budget',
            reminderStatus: showBudgetConfirmation,
          },
        }),
      );

      const { data: responseUpdateAdDailyBudgetData } =
        responseUpdateAdDailyBudget as GraphQLResult<UpdateAdDailyBudgetNewMutation>;

      const dailyBudgetUpdateResponse =
        responseUpdateAdDailyBudgetData?.updateAdDailyBudgetNew;

      if (
        dailyBudgetUpdateResponse?.error ||
        !dailyBudgetUpdateResponse?.data
      ) {
        if (dailyBudgetUpdateResponse?.error?.code === '216') {
          setErrorText(dailyBudgetUpdateResponse?.error?.message ?? '');
          setDrawerOptions({
            ...drawerOptions,
            is_editing_budget: true,
          });
        }

        throw new Error(dailyBudgetUpdateResponse?.message as string);
      }

      if (dailyBudgetUpdateResponse?.data) {
        setBasicData({
          ...basicData,
          daily_budget: amount,
        } as DrawerBasicInfo);

        refreshData();

        setNotificationState('success');
      }
    } catch (error: any) {
      Sentry.captureException(new Error(error));
      setNotificationState('failure');
    } finally {
      setDailyBudgetNotificationLoader(true);
      setLoadingStatus(false);
      setShowConfirmView(false);

      setTimeout(() => {
        setDailyBudgetNotificationLoader(false);
      }, 3000);
    }
  };

  const handleContentChange = (editorStateData: EditorState) => {
    setEditorState(editorStateData);
    const currentContent = editorStateData.getCurrentContent();
    const html = draftToHtml(convertToRaw(currentContent));
    setNoteDescription(html);
  };

  const handleSavePerformanceNote = async () => {
    setLoadingStatus(true);
    const business_id = selectedBusiness?.id;

    try {
      const responseSetPerformanceNotes = await API.graphql(
        graphqlOperation(setPerformanceNotesNew, {
          setPerformanceNotesInput: {
            id: drawerOptions?.adId,
            business_id,
            ad_type:
              currentPurchase === 'Ads'
                ? 'ads'
                : currentPurchase === 'Campaigns'
                ? 'campaigns'
                : 'adSets',
            description: noteDescription,
          },
        }),
      );

      const { data: responseSetPerformanceNotesData } =
        responseSetPerformanceNotes as GraphQLResult<SetPerformanceNotesNewMutation>;

      const setPerformanceNotesResponse =
        responseSetPerformanceNotesData?.setPerformanceNotesNew;

      if (
        setPerformanceNotesResponse?.error ||
        !setPerformanceNotesResponse?.data
      ) {
        setNotificationState('failure');
        throw new Error(
          setPerformanceNotesResponse?.message ||
            'An unexpected error occurred in handleSavePerformanceNote',
        );
      }

      if (setPerformanceNotesResponse?.data) {
        setPerformanceNote(performanceNote);
        refreshData();

        setNotificationState('success');
        setShowConfirmView(false);
      } else {
        setNotificationState('failure');
      }
    } catch (error: any) {
      Sentry.captureException(new Error(error));
      setNotificationState('failure');
    } finally {
      setPerformanceNoteLoader(true);
      setLoadingStatus(false);

      setTimeout(() => {
        setPerformanceNoteLoader(false);
      }, 3000);
    }
  };

  return (
    <>
      <div
        className={`fixed overflow-hidden custom-z-drawer bg-darkGrade100 bg-opacity-25 inset-0 transform ease-in-out ${
          drawerOptions.isOpen
            ? 'transition-opacity opacity-100 duration-500 translate-x-0 '
            : 'transition-all delay-500 opacity-0 translate-x-full'
        }`}
      >
        <section
          className={`w-screen max-w-[1000px]  overflow-y-auto  right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform p-4  ${
            drawerOptions.isOpen ? ' translate-x-0 ' : ' translate-x-full '
          }`}
        >
          {!loading ? (
            <>
              <div className="flex py-4 mb-3 items-center justify-between border-bottom-darkgrey">
                <div className="flex items-center">
                  <Image
                    src={`/images/${basicData?.source}.svg`}
                    width={30}
                    height={30}
                    alt="ad_image"
                  />
                  <div className="flex items-center ml-2">
                    <h2 className="h5 ">
                      {basicData?.name || drawerOptions.name}
                    </h2>
                    <span className="tag grey ml-2">{itemType}</span>
                  </div>
                </div>
                <Image
                  className="hover:fill-darkGrade100 pointer"
                  alt="close button"
                  src={'/images/close-icon.svg'}
                  width={20}
                  height={20}
                  onClick={() => {
                    setDrawerOptions({
                      ...drawerOptions,
                      is_editing_budget: false,
                      isOpen: false,
                    });
                    setLoading(false);
                    setShowBudgetDetailsView(false);
                    setShowConfirmView(false);
                  }}
                />
              </div>

              {!showBudgetDetailsView ? (
                <>
                  {process.env.NEXT_PUBLIC_SHOW_UTM_INJECTION === 'show' &&
                  ((itemType === 'Ad' &&
                    !drawerOptions.utm_status &&
                    !drawerOptions.is_editing_budget) ||
                    (itemType !== 'Ad' &&
                      !drawerOptions.are_all_ads_connected &&
                      !drawerOptions.is_editing_budget)) ? (
                    <div className="flex mt-2">
                      {!basicData?.ad_images?.length ||
                      basicData?.ad_images?.length === 0 ? (
                        <Image
                          src={Placeholder}
                          alt="ad_img"
                          width={172}
                          height={172}
                        />
                      ) : (
                        <div className="flex flex-wrap max-w-[180px]">
                          {basicData?.ad_images.slice(0, 4).map((image) => (
                            <Image
                              key={image}
                              src={image}
                              alt="ad_img"
                              width={
                                basicData?.ad_images.length === 1 ? 172 : 80
                              }
                              height={
                                basicData?.ad_images.length === 1 ? 172 : 80
                              }
                              className="m-1 rounded"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col ml-4 w-full">
                        <ConfirmView
                          icon="error"
                          title="UTM Is Missed"
                          description={`We can’t track that ${itemType}. Please reconnect your UTM`}
                          haveDeclineOption={false}
                          actionText="Connect UTM"
                          type="utm"
                          action={() => handleConnectUtm()}
                          loadingButton={loadingUtm}
                          setShowConfirmView={setShowConfirmView}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-4 mt-2">
                        <div className="w-[164px] h-[164px]">
                          {!basicData?.ad_images?.length ? (
                            <Image
                              src={Placeholder}
                              alt="ad_img"
                              width={172}
                              height={172}
                              className="w-full h-full object-fill"
                            />
                          ) : (
                            <Image
                              src={basicData.ad_images[0]}
                              alt="ad_img"
                              width={172}
                              height={172}
                              className="w-full h-full object-fill"
                            />
                          )}
                        </div>

                        <div className="flex flex-col flex-grow">
                          {showConfirmView ? (
                            <ConfirmView
                              {...confirmViewProps}
                              loading={loadingStatus}
                              setShowConfirmView={setShowConfirmView}
                              loadingButton={loadingStatus}
                              setShowBudgetConfirmation={
                                setShowBudgetConfirmation
                              }
                            />
                          ) : (
                            <>
                              {basicData && (
                                <OptionsView
                                  setShowConfirmView={setShowConfirmView}
                                  setShowBudgetDetailsView={
                                    setShowBudgetDetailsView
                                  }
                                  source_delivery_status={
                                    drawerOptions.source_delivery_status
                                  }
                                  is_editing_budget={
                                    drawerOptions.is_editing_budget
                                  }
                                  basicData={basicData as DrawerBasicInfo}
                                  itemType={currentPurchase as string}
                                  utm_status={drawerOptions.utm_status}
                                  are_all_ads_connected={
                                    drawerOptions.are_all_ads_connected
                                  }
                                  setConfirmViewProps={setConfirmViewProps}
                                  handleStatus={handleStatus}
                                  handleDailyBudget={handleDailyBudget}
                                  dailyBudget={dailyBudget}
                                  setDailyBudget={setDailyBudget}
                                  selectedBusiness={selectedBusiness}
                                  titles={drawerOptions.titles}
                                  showDetailsButton
                                  errorText={errorText}
                                  setErrorText={setErrorText}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="rounded-md inline-flex items-center w-full border-b border-extraLightColor mb-4">
                    <button
                      className={`${
                        performanceDrawerTabs === 'performance' && 'active'
                      } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                      onClick={() => setPerformanceDrawerTabs('performance')}
                    >
                      Performance Overview
                    </button>

                    <button
                      className={`${
                        performanceDrawerTabs === 'notes' && 'active'
                      } inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100`}
                      onClick={() => setPerformanceDrawerTabs('notes')}
                    >
                      Notes
                    </button>
                  </div>
                  {performanceDrawerTabs === 'performance' && (
                    <div>
                      <div className="flex items-center justify-center mb-2.5 relative">
                        <div className="bg-white relative z-10 w-full">
                          <div className="p-1.5 rounded-md inline-flex items-center justify-center bg-greyLight logic-switcher w-full">
                            <div className="logic-switcher__item mr-1 last:mr-0 text-center">
                              <input
                                type="radio"
                                id="today"
                                name="comparison-switcher"
                                checked={performanceFilter === 'today'}
                                onChange={() =>
                                  handlePerformanceDateFilter('today')
                                }
                              />
                              <label
                                htmlFor="today"
                                className="w-[230px] flex justify-center"
                              >
                                Today
                              </label>
                            </div>
                            <div className="logic-switcher__item mr-1 last:mr-0">
                              <input
                                type="radio"
                                id="last_7_days"
                                name="comparison-switcher"
                                checked={performanceFilter === 'last_7_days'}
                                onChange={() =>
                                  handlePerformanceDateFilter('last_7_days')
                                }
                              />
                              <label
                                htmlFor="last_7_days"
                                className="w-[230px] flex justify-center"
                              >
                                Last 7 Days
                              </label>
                            </div>

                            <div className="logic-switcher__item mr-1 last:mr-0">
                              <input
                                type="radio"
                                id="last_30_days"
                                name="comparison-switcher"
                                checked={performanceFilter === 'last_30_days'}
                                onChange={() =>
                                  handlePerformanceDateFilter('last_30_days')
                                }
                              />
                              <label
                                htmlFor="last_30_days"
                                className="w-[230px] flex justify-center"
                              >
                                Last 30 Days
                              </label>
                            </div>

                            <div className="logic-switcher__item mr-1 last:mr-0">
                              <input
                                type="radio"
                                id="last_90_days"
                                name="comparison-switcher"
                                checked={performanceFilter === 'last_90_days'}
                                onChange={() =>
                                  handlePerformanceDateFilter('last_90_days')
                                }
                              />
                              <label
                                htmlFor="last_90_days"
                                className="w-[230px] flex justify-center"
                              >
                                Last 90 Days
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex justify-between mt-3">
                        <div className="border rounded-xl border-extraLightColor p-3 flex flex-col w-[220px]">
                          <span className="text-textSecodnaryColor">
                            Amount Spent
                          </span>
                          <span className="font-semibold">
                            {formatMoneyWithDecimals(
                              performanceFilter === 'today'
                                ? (amountSpentArray.at(-1) as number)
                                : (statsData?.total_amount_spent as number),
                              selectedBusiness?.store?.currency as string,
                            )}
                          </span>
                        </div>

                        <div className="border rounded-xl border-extraLightColor p-3 flex flex-col w-[220px]">
                          <span className="text-textSecodnaryColor">ROAS</span>
                          <span className="font-semibold">
                            {Number.isInteger(statsData?.total_roas)
                              ? statsData?.total_roas
                              : statsData?.total_roas?.toFixed(2) || 0}
                            X
                          </span>
                        </div>

                        <div className="border rounded-xl border-extraLightColor p-3 flex flex-col w-[220px]">
                          <span className="text-textSecodnaryColor">TCV</span>
                          <span className="font-semibold">
                            {formatMoneyWithDecimals(
                              statsData?.total_conversion as number,
                              selectedBusiness?.store?.currency as string,
                            )}
                          </span>
                        </div>

                        <div className="border rounded-xl border-extraLightColor p-3 flex flex-col w-[220px]">
                          <span className="text-textSecodnaryColor">
                            Orders
                          </span>
                          <span className="font-semibold">
                            {Number.isInteger(statsData?.total_purchases)
                              ? statsData?.total_purchases
                              : statsData?.total_purchases?.toFixed(2) || 0}
                          </span>
                        </div>
                      </div>

                      <div
                        className="w-full mt-4 border rounded-xl border-extraLightColor relative"
                        id="lineChart"
                      >
                        <span className="font-semibold text-textSecondaryColor absolute left-3 top-1">
                          Cost-Effectiveness
                        </span>
                        <Chart
                          options={{
                            ...optionsLineChart(
                              chartLabels,
                              true,
                              getLabelsClass(performanceFilter, true),
                              performanceFilter === 'last_90_days' ? -45 : 0,
                            ),
                            legend: {
                              show: true,
                              horizontalAlign: 'right',
                              onItemClick: {
                                toggleDataSeries: false,
                              },
                              position: 'top',
                            },
                            yaxis: {
                              labels: {
                                formatter: (value) =>
                                  `${formatMoneyWithDecimals(
                                    value,
                                    selectedBusiness?.store?.currency as string,
                                    true,
                                  )}`,
                              },
                            },
                          }}
                          series={[
                            {
                              name: 'Amount Spent',
                              data: amountSpentArray,
                            },
                            {
                              name: 'Total Conversion Value',
                              data: totalConversionValueArray,
                            },
                          ]}
                          width={'100%'}
                          height={220}
                          type="line"
                        />
                      </div>
                    </div>
                  )}
                  {performanceDrawerTabs === 'notes' && (
                    <div>
                      <Editor
                        toolbarClassName="toolbarClassName toolbarClassName"
                        wrapperClassName="wrapperClassName flex flex-col-reverse"
                        editorClassName="editorClassName border-t border-x border-borderLightColor rounded-t px-4"
                        editorStyle={{
                          minHeight: '300px',
                          maxHeight: '350px',
                          overflowY: 'auto',
                        }}
                        stripPastedStyles={true}
                        editorState={editorState}
                        onEditorStateChange={handleContentChange}
                        toolbar={{
                          options: [
                            'history',
                            'blockType',
                            'textAlign',
                            'inline',
                            'list',
                            'link',
                            'emoji',
                          ],
                          blockType: {
                            options: [
                              'Normal',
                              'H1',
                              'H2',
                              'H3',
                              'H4',
                              'H5',
                              'H6',
                            ],
                          },
                          textAlign: {
                            inDropdown: true,
                          },
                          inline: {
                            options: [
                              'bold',
                              'italic',
                              'underline',
                              'strikethrough',
                            ],
                          },
                          list: {
                            options: ['unordered', 'ordered'],
                          },
                        }}
                      />
                      <div className="w-full flex gap-4 justify-end items-center mt-4">
                        <button
                          className="btn light"
                          onClick={() => {
                            setPerformanceNote('');
                            setNoteDescription('');
                            setDrawerOptions({
                              ...drawerOptions,
                              isOpen: false,
                            });
                          }}
                          style={{
                            padding: '0.7rem 1.5rem',
                            maxHeight: 'none',
                          }}
                        >
                          Cancel
                        </button>
                        {loadingStatus ? (
                          <Image
                            className="animate-spin"
                            src={'/images/spinner.png'}
                            width={20}
                            height={20}
                            alt="spinner"
                          />
                        ) : (
                          <button
                            disabled={loadingStatus}
                            className="btn"
                            onClick={handleSavePerformanceNote}
                            style={{
                              padding: '0.7rem 1.5rem',
                              maxHeight: 'none',
                            }}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <BudgetDetails
                    setShowBudgetDetailsView={setShowBudgetDetailsView}
                    basicData={basicData as DrawerBasicInfo}
                    itemType={itemType}
                    selectedBusiness={selectedBusiness}
                    handleOpenDrawer={setDrawerOptions}
                    drawerOptions={drawerOptions}
                    confirmViewProps={confirmViewProps}
                    loadingStatus={loadingStatus}
                    setShowConfirmView={setShowConfirmView}
                    showConfirmView={showConfirmView}
                    currentPurchase={currentPurchase}
                    setConfirmViewProps={setConfirmViewProps}
                    handleDailyBudget={handleDailyBudget}
                    handleStatus={handleStatus}
                    setDailyBudget={setDailyBudget}
                    dailyBudget={dailyBudget}
                    setErrorText={setErrorText}
                    errorText={errorText}
                    showBudgetConfirmation={showBudgetConfirmation}
                    setShowBudgetConfirmation={setShowBudgetConfirmation}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-screen py-10">
                <div className="inline-flex items-center justify-center flex-col">
                  <div className="spinner"></div>
                  <div className="font-semibold text-primaryColor mt-3">
                    Loading
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        <section
          className=" w-screen h-full cursor-pointer"
          onClick={() => {
            setDrawerOptions({
              ...drawerOptions,
              isOpen: false,
              is_editing_budget: false,
            });
            setLoading(false);
            setShowConfirmView(false);
          }}
        />

        {statusNotificationLoader && (
          <UpdateNotification
            successDescription={`${modifyAdLevelLabel(
              currentPurchase as string,
            )} turned ${statusUpdate}`}
            notificationState={notificationState}
          />
        )}

        {dailyBudgetNotificationLoader && (
          <UpdateNotification
            successDescription={`${modifyAdLevelLabel(
              currentPurchase as string,
            )} budget updated`}
            notificationState={notificationState}
          />
        )}

        {performanceNoteLoader && (
          <UpdateNotification
            successDescription={`Note saved successfully`}
            failureDescription={`Note failed to save`}
            notificationState={notificationState}
          />
        )}
      </div>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#utmModalResponse"
        ref={dismissSuccessModalButtonRef}
      />
    </>
  );
};

export default PerformanceDrawer;
