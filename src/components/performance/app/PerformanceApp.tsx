'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PerformanceComponent from '_components/performance';
import { API, graphqlOperation } from 'aws-amplify';
import * as Sentry from '@sentry/nextjs';
import DataTable from '@components/performance/table';
import TailwindModal from '@components/modals/TailwindModal';
import PurchasesDetailModal from '@components/performance/PurchasesDetailModal';
import {
  filterConditionArg,
  filterConditionType,
  PerformanceSortObjectType,
  RoasGoalOption,
} from '@interfaces/performance';
import dayjs from 'dayjs';
import { MarketingPlatforms } from '@enums/marketingPlatforms';
import {
  getMemberCountByAdGroupIDs,
  getPerformanceDetailsNew,
} from '@graphql/queries';

import { updateAdLevelStatusNew } from '@graphql/mutations';
import { Performance } from '../../../API';
import useAsyncDataFetch from '@hooks/useAsyncDataFetch';
import AdAccountNotConnected from '@components/performance/AdAccountNotConnected';
import { useRouter, useSearchParams } from 'next/navigation';
import UpdateAdStatusModal from '@components/modals/tailwindTypes/UpdateAdStatusModal';
import {
  AdLevelTypes,
  AdStatusUpdate,
  MarketingSources,
} from '@sirge-io/sirge-types';
import { modifyAdLevelLabel } from '@utils/format';
import Drawer, { DrawerOptionProps } from '@components/performance/drawer';
import MissingUtmModal from '@components/performance/MissingUtmModal';
import UnsupportedUtmModal from '@components/performance/UnsupportedUtmModal';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import UpdateNotification from '@components/UpdateNotification';
import { getAdGroupBudgetTitles } from '@utils/budget';
import { useBoundStore } from '@store/index';
import { PerformancePageState } from '@store/slices';

const PerformanceCampaignsPage = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const searchParam = useSearchParams()!;

  const {
    selectedBusiness,
    setSummaryPerformanceRows,
    setAllPerformanceRows,
    allPerformanceRows,
    currentPlatform,
    currentPurchase,
    currentSelectedDateValue,
    setCurrentSelectedDateValue,
    filterProps,
    setFilterProps,
    selectedAdGroupsExplore,
    setSelectedBusiness,
    setMemberCount,
    currentPage,
    setCurrentPage,
    setCurrentPurchase,
    setCurrentPlatform,
    setLoading,
    loading,
    setActiveFilterCount,
  } = useBoundStore((state) => state);

  const [statusNotificationLoader, setStatusNotificationLoader] =
    useState<boolean>(false);

  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);
  //-----modal------------------
  const [showUTMDialog, setShowUTMDialog] = useState<boolean>(false);
  const [showUnsupportedUTMDialog, setShowUnsupportedUTMDialog] =
    useState<boolean>(false);
  const [showPurchasesDialog, setShowPurchasesDialog] =
    useState<boolean>(false);
  const [showAdStatusDialog, setShowAdStatusDialog] = useState<boolean>(false);
  const [tableIdx, setTableIdx] = useState<number>(0);
  const [selectedPurcahsesIds, setSelectedPurcahsesIds] = useState<number[]>(
    [],
  );

  const [selectedPurcahsesCount, setSelectedPurcahsesCount] = useState(
    null as number | null,
  );

  const [selectedAdStatusId, setSelectedAdStatusId] = useState<string | null>(
    null,
  );
  const [statusUpdate, setStatusUpdate] = useState<string | null>(null);
  const [notificationState, setNotificationState] = useState<string | null>(
    null,
  );
  const [statusToggleLoader, setStatusToggleLoader] = useState<boolean>(false);
  const [isRouterChecked, setIsRouterChecked] = useState<boolean>(false);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const tableIndex = (index: number) => {
    setTableIdx(index);
  };
  const [drawerOptions, setDrawerOptions] = useState<DrawerOptionProps>({
    isOpen: false,
    adId: '',
    sirge_adset_id: '',
    adType: '',
    name: '',
    utm_status: false,
    are_all_ads_connected: false,
    source_delivery_status: '',
    is_editing_budget: false,
    daily_budget: 0,
    lifetime_budget: 0,
    shared_budget_name: '',
  });

  const query = new URLSearchParams(searchParam);
  //-------------------------------

  const { fetchComplete, setLoading: setAsyncFetchLoading } =
    useAsyncDataFetch();

  const [sortChangeColumn, setSortChangeColumn] = useState<
    PerformanceSortObjectType | undefined
  >();
  const [sortChecked, setSortChecked] = useState<boolean[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  const [isRoasGoalsSet, setIsRoasGoalsSet] = useState(false);
  const [purchasesModalActivePage, setPurchasesModalActivePage] = useState(0);

  /** utm modal */
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
    description?: string;
  }>({
    type: 'success',
    message: '',
  });

  const {
    facebookConnected,
    tiktokConnected,
    googleConnected,
    isLoadingConnection,
  } = useBoundStore.getState();

  const anyPlatformConnected =
    facebookConnected || tiktokConnected || googleConnected;

  const platformConnection: Record<
    string,
    {
      connected: boolean;
      notConnectedTitle: string;
      sourcePlatform: string;
    }
  > = {
    [MarketingPlatforms.TIKTOK]: {
      connected: tiktokConnected,
      notConnectedTitle: 'TikTok',
      sourcePlatform: 'tiktok',
    },
    [MarketingPlatforms.FACEBOOK]: {
      notConnectedTitle: 'Facebook',
      connected: facebookConnected,
      sourcePlatform: 'facebook',
    },
    [MarketingPlatforms.GOOGLE]: {
      notConnectedTitle: 'Google',
      connected: googleConnected,
      sourcePlatform: 'google',
    },
    'all platforms': {
      notConnectedTitle: '',
      connected: anyPlatformConnected,
      sourcePlatform: '',
    },
  };

  const currentPlatformConnection =
    platformConnection[currentPlatform.toLowerCase()];
  //--------------------------------

  const FormatPerformance = (performances: Performance[]) => {
    return performances?.map((performance: Performance) => ({
      id:
        currentPurchase === 'Campaigns'
          ? performance.sirge_campaign_id
          : currentPurchase === 'Ad sets'
          ? performance.sirge_adset_id
          : performance.sirge_ad_id,
      campaign_name:
        currentPurchase === 'Campaigns'
          ? performance.campaign_name
          : currentPurchase === 'Ad sets'
          ? performance.ad_set_name
          : performance.ad_name,
      ad_images: performance.ad_images,
      sirge_campaign_id: performance.sirge_campaign_id,
      source_delivery_status: performance.source_delivery_status,
      source_secondary_status: performance.source_secondary_status,
      platform: performance.source,
      amount_spent: performance.amount_spent,
      daily_budget: performance.daily_budget,
      lifetime_budget: performance.lifetime_budget,
      shared_budget_name: performance.shared_budget_name,
      clicks: performance.sirge_clicks,
      cost_per_purchase: performance.sirge_cost_per_purchase,
      purchases: performance.sirge_purchases,
      total_conversion_value: performance.sirge_total_conversion_value,
      roas: performance.sirge_roas,
      campaign_budget: performance.campaign_budget,
      ad_set_budget: performance.ad_set_budget,
      // roasover: roas_goals.daily.performances.over,
      // roasunder: roas_goals.daily.performances.under,
      fclicks: performance.clicks,
      faverage_cpm: performance.average_cpm,
      fcost_per_purchase: performance.cost_per_purchase,
      fpurchases: performance.purchases_source || performance.purchases,
      ftotal_conversion_value: performance.total_conversion_value,
      froas: performance.roas,
      sirgo_clicks: performance.clicks,
      ...(currentPurchase === 'Ads' && {
        sirge_adset_id: performance.sirge_adset_id,
      }),
      ad_type: performance.ad_type,
      roas_ltv: performance.roas_ltv,
      are_all_ads_connected: performance.are_all_ads_connected,
      utm_status: performance.utm_status,
      transform: performance.transform || false,
    }));
  };

  const FormatFilterProps = (
    filterConditions: filterConditionArg[] | undefined,
  ) => {
    return filterConditions?.map((filterCondition: filterConditionArg) => ({
      column: filterCondition.column,
      operator: filterCondition.operator,
      columnValue: isNaN(Number(filterCondition.columnValue))
        ? String(filterCondition.columnValue)
        : Number(filterCondition.columnValue),
      logicalOperator: filterCondition.logicalOperator,
    }));
  };

  //--------------------------------
  const getPerformance = async (
    date_start?: string,
    date_end?: string,
    updateDrawerInfo?: boolean,
    nextCurrentPage?: number,
  ) => {
    setLoading(PerformancePageState.loading);

    const sourcePlatform = currentPlatformConnection.sourcePlatform;
    const business_id = selectedBusiness?.id;

    let itemType;
    if (currentPurchase === 'Campaigns') itemType = 'campaigns';
    if (currentPurchase === 'Ad sets') itemType = 'adSets';
    if (currentPurchase === 'Ads') itemType = 'ads';

    const filterCondition =
      filterProps && filterProps.Condition?.length > 0
        ? filterProps.Condition[0].column !== ''
          ? (FormatFilterProps(
              filterProps?.Condition,
            ) as unknown as filterConditionArg[])
          : null
        : null;

    const sendFilterProps = {
      Condition: filterCondition ? filterCondition : null,
      filterStatus: filterProps?.filterStatus,
      activeChecked: filterProps?.activeChecked,
      roas: filterProps?.roas,
    };

    if (!date_end || !date_start) {
      date_start = dayjs().subtract(30, 'days').format('YYYY-MM-DD');
      date_end = dayjs().format('YYYY-MM-DD');
    }

    const nextPage = nextCurrentPage ? nextCurrentPage + 1 : 1;

    try {
      const response: any = await API.graphql(
        graphqlOperation(getPerformanceDetailsNew, {
          getPerformanceDetailsInput: {
            business_id: business_id,
            dateStart: date_start,
            dateEnd: date_end,
            itemType: itemType,
            source: sourcePlatform,
            filterCondition: sendFilterProps,
            sort: sortChangeColumn,
            numberOfPage: nextCurrentPage
              ? nextPage
              : currentPage
              ? currentPage + 1
              : 1,
            ...(selectedAdGroupsExplore?.selected_campaign_ids?.length > 0 &&
              itemType !== 'campaigns' && {
                [`selected_campaigns`]:
                  selectedAdGroupsExplore.selected_campaign_ids,
              }),
            ...(selectedAdGroupsExplore?.selected_ad_set_ids.length > 0 &&
              itemType !== 'campaigns' &&
              itemType !== 'adSets' && {
                [`selected_ad_sets`]:
                  selectedAdGroupsExplore.selected_ad_set_ids,
              }),
          },
        }),
      );

      if (
        response.data.getPerformanceDetailsNew.data?.error ||
        response.data.getPerformanceDetailsNew.error
      ) {
        setLoading(PerformancePageState.noResults);
        throw new Error(response.data?.getPerformanceDetailsNew.error.message);
      }

      const performance = FormatPerformance(
        response.data?.getPerformanceDetailsNew?.data?.performance,
      ) as unknown as Performance[];

      setAllPerformanceRows(performance);

      setSummaryPerformanceRows(
        response?.data?.getPerformanceDetailsNew?.data?.summary,
      );
      setIsRoasGoalsSet(
        response?.data?.getPerformanceDetailsNew?.data?.isRoasGoalsSet ?? false,
      );

      if (query.has('id')) {
        const getPerformanceItem = performance?.find(
          (item) => item.id === query.get('id'),
        );

        if (
          !getPerformanceItem &&
          nextPage + 1 <= response?.data?.getPerformanceDetailsNew?.numberPages
        ) {
          await getPerformance(
            currentSelectedDateValue?.startDate as string,
            currentSelectedDateValue?.endDate as string,
            false,
            nextPage,
          );

          return;
        }

        if (getPerformanceItem)
          setDrawerOptions({
            isOpen: true,
            adId: query.get('id') || '',
            sirge_adset_id: getPerformanceItem?.sirge_adset_id,
            utm_status: getPerformanceItem?.utm_status as boolean,
            name: getPerformanceItem?.campaign_name as string,
            adType: query.get('type') || '',
            are_all_ads_connected: !!getPerformanceItem?.are_all_ads_connected,
            source_delivery_status:
              getPerformanceItem?.source_delivery_status as string,
            is_editing_budget: false,
            lifetime_budget: getPerformanceItem?.lifetime_budget as number,
            daily_budget: getPerformanceItem?.daily_budget as number,
            shared_budget_name:
              getPerformanceItem?.shared_budget_name as string,
            titles: getAdGroupBudgetTitles(getPerformanceItem),
          });
      }

      if (query.has('id')) {
        setCurrentPage(nextPage - 1);

        query.delete('id');
        query.delete('type');
      } else {
        !response?.data?.getPerformanceDetailsNew?.numberPages
          ? setCurrentPage(0)
          : response?.data?.getPerformanceDetailsNew?.numberPages < currentPage
          ? setCurrentPage(
              response?.data?.getPerformanceDetailsNew?.numberPages - 1,
            )
          : setCurrentPage(currentPage);
      }

      setTotalPage(response?.data?.getPerformanceDetailsNew?.numberPages);
      if (performance.length) {
        setLoading(PerformancePageState.success);
      } else {
        const isFilterActive =
          !!sendFilterProps.Condition ||
          !!sendFilterProps.activeChecked ||
          !!sendFilterProps.roas;

        const isConnected = currentPlatformConnection.connected;

        if (!isConnected)
          setLoading(PerformancePageState.adAccountsNotConnected);
        else if (isConnected && isFilterActive)
          setLoading(PerformancePageState.noResultsWithFilters);
        else if (isConnected && !isFilterActive)
          setLoading(PerformancePageState.noResults);
      }

      if (updateDrawerInfo) return performance;
    } catch (error: any) {
      setAllPerformanceRows([]);
      setLoading(PerformancePageState.noResults);
      Sentry.captureException(new Error(error));
    }
  };

  const updateAdStatus = async (
    id: string,
    adType: AdLevelTypes,
    status: AdStatusUpdate,
    source: MarketingSources,
    reminderStatus: boolean,
  ) => {
    setStatusToggleLoader(true);
    const business_id = selectedBusiness?.id;

    try {
      const response: any = await API.graphql(
        graphqlOperation(updateAdLevelStatusNew, {
          updateAdLevelStatusInput: {
            id:
              currentPurchase === 'Ads' && source === MarketingSources.GOOGLE
                ? `${allPerformanceRows[tableIdx]?.sirge_adset_id}~${id}`
                : id,
            businessId: business_id,
            source: source,
            typeOfAd: adType,
            status: status,
            reminderStatus: reminderStatus,
          },
        }),
      );

      if (
        response?.data?.updateAdLevelStatusNew?.error ||
        !response?.data?.updateAdLevelStatusNew?.data
      ) {
        setNotificationState('failure');
        throw new Error(response?.updateAdLevelStatusNew?.message);
      }
      const newBusiness = Object.assign({}, selectedBusiness);
      newBusiness.reminder_status = reminderStatus;
      setSelectedBusiness(newBusiness);

      setSelectedAdStatusId(id);
      setStatusUpdate(status === AdStatusUpdate.ENABLE ? 'on' : 'off');
      getPerformance(
        currentSelectedDateValue?.startDate as string,
        currentSelectedDateValue?.endDate as string,
      );

      setNotificationState('success');
    } catch (error: any) {
      Sentry.captureException(new Error(error));
    } finally {
      setStatusToggleLoader(false);
      dismissModalButtonRef.current?.click();
      setStatusNotificationLoader(true);
    }
  };

  //-------------------------------
  useEffect(() => {
    const keyword = query.get('keyword');

    if (!isLoadingConnection && (isRouterChecked || !keyword)) {
      getPerformance(
        currentSelectedDateValue?.startDate as string,
        currentSelectedDateValue?.endDate as string,
      );
    }
  }, [
    currentPage,
    sortChangeColumn,
    filterProps,
    currentPlatform,
    currentPurchase,
    currentSelectedDateValue,
    selectedBusiness,
    facebookConnected,
    tiktokConnected,
    googleConnected,
  ]);

  useEffect(() => {
    if (query.has('onboarding')) {
      const timezone = selectedBusiness?.store?.timezone as string;

      setTimeout(() => {
        setCurrentSelectedDateValue({
          startDate: dayjs().tz(timezone).format('YYYY-MM-DD'),
          endDate: dayjs().tz(timezone).format('YYYY-MM-DD'),
        });
      }, 1000);
    }

    if (query.has('id') && query.has('type')) {
      let itemType = 'Campaigns';
      const queryType = query.get('type');

      if (queryType === 'campaigns') itemType = 'Campaigns';
      if (queryType === 'adSets') itemType = 'Ad sets';
      if (queryType === 'ads') itemType = 'Ads';
      setCurrentPurchase(itemType);
    }
  }, []);

  useEffect(() => {
    const tab = query.get('tab');
    const platform = query.get('platform');
    const dateStart = query.get('dateStart');
    const dateEnd = query.get('dateEnd');
    const keyword = query.get('keyword');
    if (tab || platform) {
      const date =
        dateStart && dateEnd
          ? {
              startDate: dayjs(dateStart as string).format('YYYY-MM-DD'),
              endDate: dayjs(dateEnd as string).format('YYYY-MM-DD'),
            }
          : {
              startDate: dayjs()
                .tz(selectedBusiness?.store?.timezone || 'America/Los_Angeles')
                .subtract(7, 'days')
                .format('YYYY-MM-DD'),
              endDate: dayjs()
                .tz(selectedBusiness?.store?.timezone || 'America/Los_Angeles')
                .format('YYYY-MM-DD'),
            };
      setCurrentSelectedDateValue(date);
    }

    if (tab) setCurrentPurchase(tab as string);
    if (platform) setCurrentPlatform(platform as MarketingPlatforms);

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

    setIsRouterChecked(true);
  }, []);

  useEffect(() => {
    const onComplete = async () => {
      if (fetchComplete) {
        await getPerformance(
          currentSelectedDateValue?.startDate as string,
          currentSelectedDateValue?.endDate as string,
        );
        setAsyncFetchLoading(false);
      }
    };

    onComplete();
  }, [fetchComplete]);

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response: any = await API.graphql(
          graphqlOperation(getMemberCountByAdGroupIDs, {
            getMemberCountByAdGroupIDsInput: {
              business_id: selectedBusiness?.id,
              selected_ad_set_ids: selectedAdGroupsExplore.selected_ad_set_ids,
              selected_campaign_ids:
                selectedAdGroupsExplore.selected_campaign_ids,
              dateStart: currentSelectedDateValue?.startDate as string,
              dateEnd: currentSelectedDateValue?.endDate as string,
            },
          }),
        );
        if (!response.data.getMemberCountByAdGroupIDs.data?.error) {
          setMemberCount(response.data.getMemberCountByAdGroupIDs.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (
      selectedAdGroupsExplore.selected_ad_set_ids.length ||
      selectedAdGroupsExplore.selected_campaign_ids.length
    ) {
      fetchMemberCount();
    } else {
      setMemberCount(null);
    }
  }, [
    selectedAdGroupsExplore.selected_ad_set_ids,
    selectedAdGroupsExplore.selected_campaign_ids,
  ]);

  useEffect(() => {
    if (statusNotificationLoader) {
      setTimeout(() => {
        setStatusNotificationLoader(false);
      }, 3000);
    }
  }, [statusNotificationLoader]);
  //---------------------------------------------
  const filterStatusDefault = {
    filterId: 0,
    column: '',
    operator: '',
    columnValue: '',
    logicalOperator: 'AND',
  };

  const FilterProps = async (data: filterConditionType) => {
    setFilterProps(data);
  };
  const onClickResetFilter = () => {
    setLoading(PerformancePageState.loading);
    const defaultFilterStatus = [];
    defaultFilterStatus.push(filterStatusDefault);
    setActiveFilterCount(1);
    setFilterProps({
      Condition: defaultFilterStatus,
      filterStatus: false,
      activeChecked: true,
      roas: undefined,
    });
  };

  /**
   * refresh performance data after connect an UTM
   */
  const refreshData = async (id?: string, name?: string, adType?: string) => {
    const newPerformanceData = await getPerformance(
      currentSelectedDateValue?.startDate as string,
      currentSelectedDateValue?.endDate as string,
      true,
    );

    /**
     * updates utm_status on drawer component
     */
    if (id) {
      const getPerformanceItem = newPerformanceData?.find(
        (item) => item.id === id,
      );

      if (!!getPerformanceItem) {
        setDrawerOptions({
          isOpen: true,
          adId: id,
          sirge_adset_id: getPerformanceItem?.sirge_adset_id,
          utm_status: getPerformanceItem?.utm_status as boolean,
          name: name as string,
          adType: adType as string,
          are_all_ads_connected: !!getPerformanceItem?.are_all_ads_connected,
          source_delivery_status:
            getPerformanceItem?.source_delivery_status as string,
          is_editing_budget: false,
          daily_budget: 0,
          lifetime_budget: 0,
          shared_budget_name: '',
        });
      }
    }
  };

  return (
    <>
      <PerformanceComponent
        FilterProps={FilterProps}
        isRoasGoalsSet={isRoasGoalsSet}
        setIsRoasGoalsSet={setIsRoasGoalsSet}
        refreshData={refreshData}
      >
        <div className="tab-content">
          {statusNotificationLoader && (
            <UpdateNotification
              successDescription={`${modifyAdLevelLabel(
                currentPurchase as string,
              )} turned ${statusUpdate}`}
              notificationState={notificationState}
            />
          )}
          <div className="fade show active">
            <div className="max-h-full relative">
              <div className="table-scroll rounded-lg overflow-x-auto overflow-y-hidden relative max-h-full">
                {loading === PerformancePageState.noResultsWithFilters && (
                  <div className="flex flex-col items-center justify-center py-20 px-5">
                    <div className="mb-2">
                      <Image
                        width={100}
                        height={100}
                        src="/images/empty-fable-img.svg"
                        alt=""
                      />
                    </div>
                    <h5 className="h5 mb-3 text-textSecondaryColor">
                      We can’t find results with the selected filters
                    </h5>
                    <p className="text-textTeriraryColor text-center mb-3">
                      Reset filters or change to try again
                    </p>
                    <button className="btn" onClick={onClickResetFilter}>
                      Reset Filters
                    </button>
                  </div>
                )}
                {loading === PerformancePageState.noResults && (
                  <div className="flex flex-col items-center justify-center py-20 px-5">
                    <div className="">
                      <Image
                        width="161"
                        height="160"
                        src="/images/no-account-connected.svg"
                        alt="no-account-connected"
                      />
                    </div>
                    <h5 className="h5 mb-3 text-textSecondaryColor">
                      There Is No Data
                    </h5>
                    <span className="text-textTeriraryColor text-sm mb-3">
                      All Of {String(currentPurchase).toLowerCase()} Will Appear
                      Here After It Was Created
                    </span>
                  </div>
                )}
                {loading === PerformancePageState.loading && (
                  <div className="flex flex-col items-center justify-center py-72 px-5">
                    <div className="flex items-center justify-center bg-white absolute left-px right-px top-[55px] bottom-[47px] z-50">
                      <div className="inline-flex items-center justify-center flex-col">
                        <div className="relative w-[58px] h-[58px] flex justify-center items-center ">
                          <div className="absolute top-0 left-0 right-0 bottom-0">
                            <Image
                              className="animate-spin"
                              src={'/images/spinner.png'}
                              width={58}
                              height={58}
                              alt="spinner"
                            />
                          </div>
                          <Image
                            src={'/images/bolt-sm.svg'}
                            width={32}
                            height={32}
                            alt="spinner"
                          />
                        </div>
                        <div className="font-semibold text-primaryColor mt-3">
                          Updating Results
                        </div>
                      </div>
                    </div>
                  </div>
                )}{' '}
                {loading === PerformancePageState.success && (
                  <>
                    <DataTable
                      data={allPerformanceRows}
                      setShowDialog={setShowUTMDialog}
                      setShowUnsupportedUTMDialog={setShowUnsupportedUTMDialog}
                      setShowPurchasesDialog={setShowPurchasesDialog}
                      setShowAdStatusDialog={setShowAdStatusDialog}
                      tableIndex={tableIndex}
                      isStatusUpdated={selectedAdStatusId}
                      setSortChangeColumn={setSortChangeColumn}
                      setCurrentPage={setCurrentPage}
                      setSelectedPurcahsesIds={setSelectedPurcahsesIds}
                      setSelectedPurcahsesCount={setSelectedPurcahsesCount}
                      currentPage={currentPage}
                      totalPage={totalPage}
                      sortChecked={sortChecked}
                      setSortChecked={setSortChecked}
                      sortChangeColumn={sortChangeColumn}
                      handleOpenDrawer={setDrawerOptions}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      reminderStatus={
                        (selectedBusiness &&
                          selectedBusiness.reminder_status) ||
                        false
                      }
                      updateAdStatus={updateAdStatus}
                    />
                  </>
                )}
                {loading === PerformancePageState.adAccountsNotConnected && (
                  <>
                    {!currentPlatformConnection.connected && (
                      <AdAccountNotConnected
                        title={currentPlatformConnection.notConnectedTitle}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </PerformanceComponent>
      {allPerformanceRows && (
        <>
          <TailwindModal
            id="missingUtmModal"
            showDialog={showUTMDialog}
            setShowDialog={setShowUTMDialog}
            styleDialog={{
              width: 460,
            }}
          >
            <MissingUtmModal
              title={allPerformanceRows[tableIdx]?.campaign_name}
              selectedAd={allPerformanceRows[tableIdx]}
              selectedBusiness={selectedBusiness}
              setOpenModal={setShowUTMDialog}
              platform={
                (allPerformanceRows[tableIdx] as any)?.platform as string
              }
              setDialogOptions={setDialogOptions}
              refreshData={refreshData}
              currentPurchase={currentPurchase as string}
            />
          </TailwindModal>

          <TailwindModal
            id="unsupportedUtmModal"
            showDialog={showUnsupportedUTMDialog}
            setShowDialog={setShowUnsupportedUTMDialog}
            styleDialog={{
              width: 500,
            }}
          >
            <UnsupportedUtmModal
              title={allPerformanceRows[tableIdx]?.campaign_name}
              setOpenModal={setShowUnsupportedUTMDialog}
              source={(allPerformanceRows[tableIdx] as any)?.platform}
            />
          </TailwindModal>

          <TailwindModal
            id="purchasesModal"
            showDialog={showPurchasesDialog}
            setShowDialog={setShowPurchasesDialog}
            styleDialog={{ minWidth: '808px' }}
          >
            <PurchasesDetailModal
              activePage={purchasesModalActivePage}
              setActivePage={setPurchasesModalActivePage}
              data={allPerformanceRows[tableIdx]}
              setOpenModal={setShowPurchasesDialog}
              selectedPurcahsesIds={selectedPurcahsesIds}
              selectedPurcahsesCount={selectedPurcahsesCount}
            />
          </TailwindModal>

          <TailwindModal
            id="updateAdStatusModal"
            showDialog={showAdStatusDialog}
            setShowDialog={setShowAdStatusDialog}
          >
            <UpdateAdStatusModal
              data={allPerformanceRows[tableIdx]}
              loading={statusToggleLoader}
              handleStatusUpdate={updateAdStatus}
              currentReminderStatus={selectedBusiness?.reminder_status || false}
            />
          </TailwindModal>
        </>
      )}

      {selectedBusiness && !selectedBusiness.reminder_status && (
        <button
          className="btn"
          style={{ display: 'none' }}
          data-bs-toggle="modal"
          data-bs-target="#updateAdStatusModal"
          ref={dismissModalButtonRef}
        />
      )}

      {selectedBusiness && (
        <Drawer
          drawerOptions={drawerOptions}
          setDrawerOptions={setDrawerOptions}
          selectedBusiness={selectedBusiness}
          setDialogOptions={setDialogOptions}
          refreshData={refreshData}
        />
      )}

      <TailwindModal id="utmModalResponse">
        <Message
          type={dialogOptions.type}
          title={dialogOptions.message}
          description={dialogOptions.description}
          buttonAction={
            dialogOptions.type === 'error' &&
            dialogOptions.description?.includes(
              'disconnected or not working correctly',
            ) ? (
              <button
                className="btn mt-4 w-1/2 capitalize"
                data-bs-dismiss="modal"
                onClick={() =>
                  router.push(
                    `/${selectedBusiness?.vanity_name}/settings/connections`,
                  )
                }
              >
                Go To Connections Page
              </button>
            ) : undefined
          }
        />
      </TailwindModal>
    </>
  );
};

export default PerformanceCampaignsPage;
