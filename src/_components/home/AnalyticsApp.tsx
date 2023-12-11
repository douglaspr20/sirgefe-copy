'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import AllPlatforms from './allPlatform';
import { graphqlOperation, API } from 'aws-amplify';
import {
  getKeyMetricsAnalyticsStatistics,
  getKeyMetricsPerformingProducts,
  getKeyMetricsMonthlyBudget,
  getKeyMetricsRoasTracker,
  getCustomerJourneySourcesNew,
} from 'graphql/queries';
import {
  updateKeyMetricsMonthlyBudget,
  updateKeyMetricsRoasTracker,
} from '@graphql/mutations';
import TailwindModal from '@components/modals/TailwindModal';
import SetBudgetModal from '@components/modals/tailwindTypes/SetBudget';
import SetRoalsGoalsModal from '@components/modals/tailwindTypes/SetRoasGoals';
import { setBudgetSchema, setRoasGoalsSchema } from '@interfaces/formsSchema';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { Message } from '@components/modals/tailwindTypes';
import {
  ValidSourceAnalytics,
  SourcesSortObjectType,
} from '@interfaces/source';
import RefreshDataButton from '@components/RefreshDataButton';
import useAsyncDataFetch from '@hooks/useAsyncDataFetch';
import dayjs from 'dayjs';
import * as Sentry from '@sentry/nextjs';
import {
  SourcesBusiness,
  GetKeyMetricsAnalyticsStatisticsQuery,
  GetKeyMetricsPerformingProductsQuery,
  GetKeyMetricsMonthlyBudgetQuery,
  GetKeyMetricsRoasTrackerQuery,
  UpdateKeyMetricsMonthlyBudgetMutation,
  UpdateKeyMetricsRoasTrackerMutation,
} from 'API';
import type { GraphQLResult } from '@aws-amplify/api-graphql';
import { TypesValues, getDateEnd, typeValues } from '@utils/format';
import SelectPeriod from '@components/SelectPeriod';
import ComparisonWidget from '_components/home/ComparisonWidget';
import {
  IKeyMetricsMonthlyBudget,
  IKeyMetricsPerformingProduct,
  IKeyMetricsStatistics,
  IRoasTracker,
} from '@interfaces/analytics';

import { useBoundStore } from '@store/index';

const AnalyticsPage = () => {
  const {
    selectedBusiness,
    setSelectedBusiness,
    userProfile,
    facebookConnected,
    tiktokConnected,
    isLoadingConnection,
  } = useBoundStore((state) => state);
  const { fetchComplete, setLoading } = useAsyncDataFetch();

  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [animationChart, setAnimationChart] = useState<boolean>(true);
  const [showDialogSetGoals, setShowDialogSetGoals] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: 'Business created',
  });

  const [keyMetricsStatistics, setKeyMetricsStatistics] =
    useState<IKeyMetricsStatistics | null>(null);
  const [keyMetricsPerformingProducts, setKeyMetricsPerformingProducts] =
    useState<IKeyMetricsPerformingProduct[]>([]);
  const [keyMetricsMonthlyBudget, setKeyMetricsMonthlyBudget] = useState<
    IKeyMetricsMonthlyBudget[]
  >([]);
  const [keyMetricsRoasTracker, setKeyMetricsRoasTracker] =
    useState<IRoasTracker | null>(null);

  const [source] = useState<ValidSourceAnalytics>('all');
  const [sourcesGraphState, setSourcesGraphState] = useState<SourcesBusiness[]>(
    [],
  );
  const [loadingGraph, setLoadingGraph] = useState<boolean>(false);
  const [loadingStatistics, setLoadingStatistics] = useState<boolean>(false);
  const [loadingMonthtlyBudgetGraph, setLoadingMonthtlyBudgetGraph] =
    useState<boolean>(false);
  const [loadingRoasTrackerGraph, setLoadingRoasTrackerGraph] =
    useState<boolean>(false);
  const [loadingPerformingProduct, setLoadingPerformingProduct] =
    useState<boolean>(false);

  const [statisticsPeriod, setStatisticsPeriod] =
    useState<TypesValues>('last_7_days');

  const [customerJourneyPeriod, setCustomerJourneyPeriod] =
    useState<TypesValues>('last_7_days');

  const date = dayjs()
    .tz(userProfile?.timezone || 'America/Chicago')
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const handleChangePeriod = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    widget: string = 'customer-journey',
  ) => {
    if (widget === 'statistics') {
      setStatisticsPeriod(e.target.value as TypesValues);
    }

    if (widget === 'customer-journey') {
      setCustomerJourneyPeriod(e.target.value as TypesValues);
    }
  };

  const updateBudget = async (budget: string) => {
    const response: any = await API.graphql(
      graphqlOperation(updateKeyMetricsMonthlyBudget, {
        updateMonthlyBudgetInput: {
          business_id: selectedBusiness?.id,
          amount: budget,
        },
      }),
    );

    return response;
  };

  const updateRoasGoal = async (form: setRoasGoalsSchema) => {
    const response: any = await API.graphql(
      graphqlOperation(updateKeyMetricsRoasTracker, {
        updateRoasGoalsInput: {
          business_id: selectedBusiness?.id,
          campaigns: form.campaigns,
          adsets: form.adsets,
          ads: form.ads,
        },
      }),
    );

    return response;
  };

  const handleSaveBudget = async (form: setBudgetSchema) => {
    setIsSending(true);
    try {
      const response: GraphQLResult<UpdateKeyMetricsMonthlyBudgetMutation> =
        await updateBudget(form.budget);

      const responseError =
        response?.errors ||
        response?.data?.updateKeyMetricsMonthlyBudget?.error;

      if (responseError) {
        setDialogOptions({
          type: 'error',
          message:
            response?.data?.updateKeyMetricsMonthlyBudget?.error?.message ||
            'Something went wrong',
        });
      } else {
        setDialogOptions({
          type: 'success',
          message: 'Budget set',
        });

        setShowDialog(false);
        if (selectedBusiness) {
          setSelectedBusiness({
            ...selectedBusiness,
            monthly_budget: parseFloat(form?.budget),
          });
          await getAnalyticsFetchComplete();
        }
      }
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });

      setShowDialog(false);
    } finally {
      setIsSending(false);
      dismissModalButtonRef.current?.click();
    }
  };

  const handleRoasGoals = async (form: setRoasGoalsSchema) => {
    setIsSending(true);
    try {
      const response: GraphQLResult<UpdateKeyMetricsRoasTrackerMutation> =
        await updateRoasGoal(form);

      const responseError =
        response?.errors || response?.data?.updateKeyMetricsRoasTracker?.error;

      if (responseError) {
        setDialogOptions({
          type: 'error',
          message:
            response?.data?.updateKeyMetricsRoasTracker?.error?.message ||
            'Something went wrong',
        });
      } else {
        setDialogOptions({
          type: 'success',
          message: 'Roas Goals set',
        });

        setShowDialog(false);
        if (selectedBusiness) {
          setSelectedBusiness({
            ...selectedBusiness,
            campaign_roas_goal: form.campaigns,
            adset_roas_goal: form.adsets,
            ad_roas_goal: form.ads,
          });
          await getAnalyticsFetchComplete();
        }
      }
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });

      setShowDialog(false);
    } finally {
      setIsSending(false);
      dismissModalButtonRef.current?.click();
    }
  };

  const getKeyMetricsStatistics = useCallback(
    async (filters: { dateStart: string; dateEnd: string }) => {
      const responseAnalyticsStatistics: any = await API.graphql(
        graphqlOperation(getKeyMetricsAnalyticsStatistics, {
          getkeyMetricsAnalyticsStatisticsInput: {
            business_id: selectedBusiness?.id,
            dateStart: filters.dateStart,
            dateEnd: filters.dateEnd,
          },
        }),
      );

      return responseAnalyticsStatistics;
    },
    [selectedBusiness?.id],
  );

  const getKeyMetricsTopPerformingProduct = useCallback(
    async (filters: { dateStart: string; dateEnd: string }) => {
      const responsePerformingProduct: any = await API.graphql(
        graphqlOperation(getKeyMetricsPerformingProducts, {
          getKeyMetricsPerformingProductsInput: {
            business_id: selectedBusiness?.id,
            dateStart: filters.dateStart,
            dateEnd: filters.dateEnd,
          },
        }),
      );

      return responsePerformingProduct;
    },
    [selectedBusiness?.id],
  );

  const getKeyMetricsMonthlyBudgetData = useCallback(async () => {
    const responseMonthlyBudget: any = await API.graphql(
      graphqlOperation(getKeyMetricsMonthlyBudget, {
        getKeyMetricsMonthlyBudgetInput: {
          business_id: selectedBusiness?.id,
        },
      }),
    );

    return responseMonthlyBudget;
  }, [selectedBusiness?.id]);

  const getKeyMetricsRoasTrackerData = useCallback(
    async (filters: { dateStart: string; dateEnd: string }) => {
      const responseRoasTracker: any = await API.graphql(
        graphqlOperation(getKeyMetricsRoasTracker, {
          getKeyMetricsRoasTrackerInput: {
            business_id: selectedBusiness?.id,
            dateStart: filters.dateStart,
            dateEnd: filters.dateEnd,
          },
        }),
      );

      return responseRoasTracker;
    },
    [selectedBusiness?.id],
  );

  const getCustomerJourney = useCallback(
    async (filters: {
      date_from?: string;
      date_to?: string;
      sort?: SourcesSortObjectType;
      numberOfPage?: number;
    }) => {
      const responseGetSources: any = await API.graphql(
        graphqlOperation(getCustomerJourneySourcesNew, {
          getCustomerJourneySourcesInput: {
            business_id: selectedBusiness?.id,
            ...(filters.date_from && { date_from: filters.date_from }),
            ...(filters.date_to && { date_to: filters.date_to }),
            ...(filters.sort?.field && { sort: filters.sort }),
            ...(filters.numberOfPage && { numberOfPage: filters.numberOfPage }),
          },
        }),
      );

      return responseGetSources;
    },
    [selectedBusiness?.id],
  );

  const updateStatisticData = async () => {
    try {
      setLoadingStatistics(true);

      const dateStart = typeValues(
        true,
        date,
        statisticsPeriod as TypesValues,
        'YYYY-MM-DD',
      ) as string;

      const dateEnd = getDateEnd(
        userProfile?.timezone || 'America/Chicago',
        statisticsPeriod,
      );

      const response: GraphQLResult<GetKeyMetricsAnalyticsStatisticsQuery> =
        await getKeyMetricsStatistics({
          dateStart,
          dateEnd,
        });

      const keyMetricsStatisticsGraphData =
        response?.data?.getKeyMetricsAnalyticsStatistics?.data || null;

      setKeyMetricsStatistics(
        keyMetricsStatisticsGraphData as IKeyMetricsStatistics,
      );
    } catch (error: any) {
      Sentry.captureException(error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setLoadingStatistics(false);
    }
  };

  const updateMonthlyBudget = async () => {
    try {
      setLoadingMonthtlyBudgetGraph(true);
      const response: GraphQLResult<GetKeyMetricsMonthlyBudgetQuery> =
        await getKeyMetricsMonthlyBudgetData();

      const keyMetricsMonthlyBudgetData =
        response?.data?.getKeyMetricsMonthlyBudget?.data || null;

      setKeyMetricsMonthlyBudget(
        keyMetricsMonthlyBudgetData as IKeyMetricsMonthlyBudget[],
      );
    } catch (error: any) {
      Sentry.captureException(error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setLoadingMonthtlyBudgetGraph(false);
    }
  };

  const updateRoasTracker = async () => {
    try {
      setLoadingRoasTrackerGraph(true);
      const dateStart = typeValues(
        true,
        date,
        statisticsPeriod as TypesValues,
        'YYYY-MM-DD',
      ) as string;

      const dateEnd = getDateEnd(
        userProfile?.timezone || 'America/Chicago',
        statisticsPeriod,
      );

      const response: GraphQLResult<GetKeyMetricsRoasTrackerQuery> =
        await getKeyMetricsRoasTrackerData({
          dateStart,
          dateEnd,
        });

      const keyMetricsRoasTrackerData =
        response?.data?.getKeyMetricsRoasTracker?.data || null;

      setKeyMetricsRoasTracker(keyMetricsRoasTrackerData as IRoasTracker);
    } catch (error: any) {
      Sentry.captureException(error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setLoadingRoasTrackerGraph(false);
    }
  };

  const updateTopPerformingData = async () => {
    const dateStart = typeValues(
      true,
      date,
      statisticsPeriod as TypesValues,
      'YYYY-MM-DD',
    ) as string;

    const dateEnd = getDateEnd(
      userProfile?.timezone || 'America/Chicago',
      statisticsPeriod,
    );

    try {
      setLoadingPerformingProduct(true);
      const response: GraphQLResult<GetKeyMetricsPerformingProductsQuery> =
        await getKeyMetricsTopPerformingProduct({
          dateStart,
          dateEnd,
        });

      const keyMetricsPerformingProductData =
        response?.data?.getKeyMetricsPerformingProducts?.data || [];

      setKeyMetricsPerformingProducts(
        keyMetricsPerformingProductData as IKeyMetricsPerformingProduct[],
      );
    } catch (error: any) {
      Sentry.captureException(error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setLoadingPerformingProduct(false);
    }
  };

  const updateCustomerJourneyGraphValues = async () => {
    setLoadingGraph(true);
    const date_from = typeValues(
      false,
      date,
      customerJourneyPeriod as TypesValues,
      'YYYY-MM-DD',
    ) as string;
    const date_to = getDateEnd(
      userProfile?.timezone || 'America/Chicago',
      customerJourneyPeriod,
    );
    try {
      const response: any = await getCustomerJourney({
        date_from,
        date_to,
      });

      if (response.data?.getCustomerJourneySourcesNew?.error) {
        throw new Error(
          response.data?.getCustomerJourneySourcesNew.error.message,
        );
      }
      const sources: SourcesBusiness[] =
        response.data?.getCustomerJourneySourcesNew?.data.sources || [];
      // sources.forEach((source) => {
      //   source.source = generateSourceName(
      //     source.source,
      //     // selectedBusiness?.shopify_store_domain,
      //   );
      // });
      setSourcesGraphState(sources);
    } catch (error: any) {
      Sentry.captureException(error);
    } finally {
      setLoadingGraph(false);
    }
  };

  const getAnalyticsFetchComplete = async () => {
    try {
      await Promise.all([
        updateRoasTracker(),
        updateStatisticData(),
        updateMonthlyBudget(),
        updateTopPerformingData(),
        updateCustomerJourneyGraphValues(),
      ]);
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  /** Long Data Async Fetching Call **/
  useEffect(() => {
    const onComplete = async () => {
      if (fetchComplete) {
        await getAnalyticsFetchComplete();
        setAnimationChart(false);
        setLoading(false);
      }
    };

    onComplete();
  }, [fetchComplete, selectedBusiness?.id]);

  /** Update Analytics data Call **/ /** === Feels like a duplicate call // Probably update to delete */
  useEffect(() => {
    if (!isLoadingConnection) {
      getAnalyticsFetchComplete();
    }
  }, [selectedBusiness, facebookConnected, tiktokConnected]);

  useEffect(() => {
    updateStatisticData();
  }, [statisticsPeriod, getKeyMetricsStatistics]);

  useEffect(() => {
    updateRoasTracker();
  }, [statisticsPeriod, getKeyMetricsRoasTrackerData]);

  useEffect(() => {
    updateTopPerformingData();
  }, [statisticsPeriod, getKeyMetricsTopPerformingProduct]);

  useEffect(() => {
    updateCustomerJourneyGraphValues();
  }, [
    customerJourneyPeriod,
    getCustomerJourney,
    // selectedBusiness?.shopify_store_domain,
  ]);

  return (
    <>
      <Head>
        <title>Sirge | {`${selectedBusiness?.name} - Analytics`}</title>
      </Head>
      {/* <AnalyticStateLoader load={analyticLoader} /> */}
      <div className="absolute right-4 top-40">
        <RefreshDataButton business_id={selectedBusiness?.id as string} />
      </div>

      <div className="flex flex-col overflow-x-hidden">
        <div className="px-8 py-8">
          <div className="mx-auto">
            <div className="flex justify-between mb-6 border-b border-extraLightColor">
              <h2 className="h2 mb-4 flex items-center">Analytics</h2>
            </div>

            {process.env.NEXT_PUBLIC_COMPARISON_WIDGET === 'show' && (
              <ComparisonWidget source={source} isSending={isSending} />
            )}

            <div className="tab-content flex-1">
              <div className="flex items-center justify-between my-5">
                <h4 className="h4">Key Metrics</h4>

                <div className="inline-flex items-center flex-shrink-0">
                  <span className="font-medium text-textTeriraryColor text-xs mr-2 whitespace-nowrap">
                    Display Data For
                  </span>
                  <SelectPeriod
                    onChange={(e) => handleChangePeriod(e, 'statistics')}
                    period={statisticsPeriod}
                    analytics={true}
                  />
                </div>
              </div>

              <AllPlatforms
                business={selectedBusiness}
                statisticsPeriod={statisticsPeriod}
                dataStatistics={keyMetricsStatistics}
                performingProducts={keyMetricsPerformingProducts}
                keyMetricsMonthlyBudget={keyMetricsMonthlyBudget}
                keyMetricsRoasTracker={keyMetricsRoasTracker}
                animationChart={animationChart}
                handleChangePeriod={handleChangePeriod}
                sourcesGraphState={sourcesGraphState}
                loadingGraph={loadingGraph}
                loadingStatistics={loadingStatistics}
                customerJourneyPeriod={customerJourneyPeriod}
                loadingMonthtlyBudgetGraph={loadingMonthtlyBudgetGraph}
                loadingRoasTrackerGraph={loadingRoasTrackerGraph}
                loadingPerformingProduct={loadingPerformingProduct}
              />
            </div>
          </div>

          <TailwindModal
            id="monthlyBudgetModal"
            showDialog={showDialog}
            setShowDialog={setShowDialog}
          >
            <SetBudgetModal onSubmit={handleSaveBudget} isSending={isSending} />
          </TailwindModal>
          <TailwindModal
            id="roasGoalModal"
            showDialog={showDialogSetGoals}
            setShowDialog={setShowDialogSetGoals}
          >
            <SetRoalsGoalsModal
              onSubmit={handleRoasGoals}
              isSending={isSending}
              roas_goals={(selectedBusiness as any)?.roas_goals}
            />
          </TailwindModal>
          <TailwindModal id="successModal">
            <Message title={dialogOptions.message} type={dialogOptions.type} />
          </TailwindModal>
        </div>
      </div>
      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={dismissModalButtonRef}
      />
    </>
  );
};

export default AnalyticsPage;
