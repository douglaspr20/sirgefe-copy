'use client';
import React, { FC, useEffect, useState } from 'react';
import AnalyticsCard from '_components/home/AnalyticsCard';
import PerformingProducts from '_components/home/PerformingProducts';
import {
  TypesValues,
  formatMoneyWithDecimals,
  typeValues,
  getDateEnd,
} from '@utils/format';
import dayjs from 'dayjs';
import getPercentageChange from '@utils/getPercentageValue';
import SelectPeriod from '@components/SelectPeriod';
import { BusinessPrisma, SourcesBusiness } from 'API';
import { MarketingSources } from '@sirge-io/sirge-types';
import GroPlanLock from '@components/GroPlanLock';
import MonthlyChart from '_components/home/MonthlyChart';
import RoasGoalsChart from '_components/home/RoasGoalsChart';
import {
  IKeyMetricsMonthlyBudget,
  IKeyMetricsPerformingProduct,
  IKeyMetricsStatistics,
  IRoasTracker,
  RoasTiles,
} from '@interfaces/analytics';
import { MarketingPlatforms } from '@enums/marketingPlatforms';
import NewVsReturningVisitorChart from '@components/customer-journey/charts/NewVsReturningVisitors';
import ClickSourcesRatio from '@components/customer-journey/charts/ClickSourceRatio';
import ConversionBySource from '@components/customer-journey/charts/ConversionBySources';

interface Props {
  dataStatistics: IKeyMetricsStatistics | null;
  performingProducts: IKeyMetricsPerformingProduct[] | [];
  keyMetricsMonthlyBudget: IKeyMetricsMonthlyBudget[] | [];
  keyMetricsRoasTracker: IRoasTracker | null;
  statisticsPeriod: TypesValues;
  handleChangePeriod: (
    e: React.ChangeEvent<HTMLSelectElement>,
    widget: string,
  ) => Promise<void>;
  animationChart: boolean;
  business: BusinessPrisma | null;
  customerJourneyPeriod: TypesValues;
  sourcesGraphState: SourcesBusiness[];
  loadingGraph: boolean;
  loadingStatistics: boolean;
  loadingMonthtlyBudgetGraph: boolean;
  loadingRoasTrackerGraph: boolean;
  loadingPerformingProduct: boolean;
}

const AllPlatforms: FC<Props> = ({
  business,
  animationChart,
  dataStatistics,
  sourcesGraphState,
  performingProducts,
  statisticsPeriod,
  handleChangePeriod,
  customerJourneyPeriod,
  keyMetricsRoasTracker,
  keyMetricsMonthlyBudget,
  loadingGraph,
  loadingStatistics,
  loadingMonthtlyBudgetGraph,
  loadingRoasTrackerGraph,
  loadingPerformingProduct,
}) => {
  // const { isSidebarOpen } = useLayoutContext();
  // const [dateRangeGraph, setDateRangeGraph] = useState(statisticsPeriod);
  // const [customWidthChart, setCustomWidthChart] = useState<string>('100%');
  const [adBudget, setAdBudget] = useState<number>(0);
  const [amountSpent, setAmountSpent] = useState<number>(0);
  const [amountLeft, setAmountLeft] = useState<number>(0);
  const [spentPercentage, setSpentPercentage] = useState<string>('');
  const [roasGoals, setRoasGoals] = useState<any>({});
  const [dateFilterValues, setDateFilterValues] = useState({
    dateStart: '' as string,
    dateEnd: '' as string,
  });
  const [businessCurrency, setBusinessCurrency] = useState(
    (business?.store?.currency as string) || 'USD',
  );

  const validSources = Object.values(MarketingSources);

  // const colors = {
  //   monthlyBudget: {
  //     facebook: '#7DE28D',
  //     tiktok: '#9EADFB',
  //     'amount left': '#E689D0',
  //   },
  //   sources: {
  //     facebook: '#7DE28D',
  //     google: '#9EADFB',
  //     direct: '#E689D0',
  //     tiktok: '#68C7C0',
  //     klaviyo: '#FAF333',
  //     other: '#A1B3C4',
  //   },
  // };

  /** Graph Data Section */
  useEffect(() => {
    setDateFilterValues(getRoasGoalsDateFilterValues());
  }, [statisticsPeriod]);

  /** Roas_Goals section */
  const getRoasGoalsDateFilterValues = function () {
    const date = dayjs()
      .tz(business?.store?.timezone || 'America/Chicago')
      .subtract(1, 'day')
      .format('YYYY-MM-DD');

    const dateFilterValues = {
      dateStart: typeValues(
        true,
        date,
        statisticsPeriod as TypesValues,
        'YYYY-MM-DD',
      ) as string,
      dateEnd: getDateEnd(
        business?.store?.timezone || 'America/Chicago',
        statisticsPeriod,
      ) as string,
    };

    return dateFilterValues;
  };

  const getRoasGoals = async function () {
    const goals: any = {
      campaign: business?.campaign_roas_goal,
      adset: business?.adset_roas_goal,
      ad: business?.ad_roas_goal,
    };
    setRoasGoals(goals);
    return goals;
  };

  const resetGoals = async function () {
    if (
      roasGoals?.campaign !== business?.campaign_roas_goal ||
      roasGoals?.adset !== business?.adset_roas_goal ||
      roasGoals?.ad !== business?.ad_roas_goal
    ) {
      setRoasGoals({});
    }
  };

  useEffect(() => {
    if (
      business?.campaign_roas_goal ||
      business?.adset_roas_goal ||
      business?.ad_roas_goal
    ) {
      resetGoals().then(() => {
        getRoasGoals();
      });
    }
  }, [business]);

  /** Monthly Budget section */
  useEffect(() => {
    calculateAmountSpent(keyMetricsMonthlyBudget);
  }, [keyMetricsMonthlyBudget]);

  useEffect(() => {
    if (typeof amountSpent === 'number' && amountSpent > 0) {
      resetBudgetPercentages().then(() => {
        getAdBudget().then(() => {
          getPercentages(amountSpent);
        });
      });
    }
  }, [amountSpent, business]);

  const getPercentages = async function (amountSpent: number) {
    const percentage = getPercentageChange(
      business?.monthly_budget as number,
      amountSpent,
    );
    setSpentPercentage(percentage);
  };

  const resetBudgetPercentages = async function () {
    if (adBudget !== business?.monthly_budget) {
      setAdBudget(0);
      setSpentPercentage('');
    }
  };

  const getAdBudget = async function () {
    if (business?.monthly_budget) {
      setAdBudget(business?.monthly_budget);
    }
  };

  const calculateAmountSpent = async function (
    budgetArray: IKeyMetricsMonthlyBudget[],
  ) {
    const spent: number = budgetArray?.reduce(
      (acc: any, item: { amount_spent: any }) => acc + item.amount_spent ?? 0,
      0,
    );
    const left =
      business && (business as any)?.monthly_budget
        ? (business as any)?.monthly_budget - spent
        : 0;
    setAmountLeft(left);
    setAmountSpent(spent);
    return spent;
  };

  const getRoasTiles = () => {
    if (dataStatistics) {
      const RoasTiles: RoasTiles[] = [];

      if (dataStatistics?.blended_roas?.sources) {
        const roasTileKeys = Object.keys(dataStatistics?.blended_roas?.sources);
        const roasTileValues = Object.values(
          dataStatistics?.blended_roas?.sources,
        );

        roasTileKeys.forEach((item, index) => {
          validSources.forEach((source) => {
            if (item === source) {
              RoasTiles.push({
                value: roasTileValues[index]?.toFixed(2),
                source: source,
                active: dataStatistics?.blended_roas?.sources ? true : false,
              });
            }
          });
        });
      }
      return RoasTiles;
    }
  };

  useEffect(() => {
    setBusinessCurrency((business?.store?.currency as string) ?? 'USD');
  }, [business?.store?.currency]);

  return (
    <>
      <div className="grid w-full grid-cols-4 gap-x-6">
        <div className="grid grid-rows-2 gap-y-6">
          <AnalyticsCard
            title="Total Sales"
            subtitle="Shopify"
            percentage={dataStatistics?.total_sales?.percentage || 0}
            value={formatMoneyWithDecimals(
              dataStatistics?.total_sales?.amount || 0,
              businessCurrency,
            )}
            showTooltip={true}
            tooltipTitle="Total value of sales made through your shopify store."
            anchorId="total-shopify-sales"
            percentageId="percentage-total-shopify-sales"
            cardValueId="num-total-shopify-sales"
            isCardLoading={loadingStatistics}
          />

          <AnalyticsCard
            title="Blended ROAS"
            subtitle="  All Platforms & Sources"
            percentage={dataStatistics?.blended_roas?.percentage || 0}
            value={`${dataStatistics?.blended_roas?.amount?.toFixed(2) || 0}X`}
            showTooltip={true}
            tooltipTitle="The average of your return on ad spend from all sources on the platform."
            anchorId="sources-average"
            percentageId="percentage-sources-average"
            cardValueId="num-sources-average"
            roasTiles={getRoasTiles()}
            isCardLoading={loadingStatistics}
          />
        </div>
        <div className="grid grid-rows-2 gap-y-6">
          <AnalyticsCard
            title="Avg Order Value"
            subtitle="Total Sales / Orders"
            percentage={dataStatistics?.average_order_value?.percentage || 0}
            value={formatMoneyWithDecimals(
              dataStatistics?.average_order_value?.amount || 0,
              businessCurrency,
            )}
            showTooltip={true}
            tooltipTitle="Total sales divided by the number of orders to give you the average value of your order."
            anchorId="total-order-sales"
            percentageId="percentage-total-order-sales"
            cardValueId="num-avg-order-value"
            isCardLoading={loadingStatistics}
          />
          <AnalyticsCard
            title="Visits"
            subtitle="All Platforms & Sources"
            percentage={dataStatistics?.visitors?.percentage || 0}
            value={dataStatistics?.visitors?.amount?.toLocaleString() || 0}
            showTooltip={true}
            tooltipTitle="Total of unique visitors on your store based on tracked IP addresses."
            anchorId="total-unique-visitors"
            percentageId="percentage-total-unique-visitors"
            cardValueId="num-total-unique-visitors"
            isCardLoading={loadingStatistics}
          />
        </div>
        <div className="grid grid-rows-2 gap-y-6">
          <AnalyticsCard
            title="Conversion Rate"
            subtitle="All Platforms & Sources"
            percentage={dataStatistics?.conversion_rate?.percentage || 0}
            value={`${
              dataStatistics?.conversion_rate?.amount?.toFixed(2) || 0
            }%`}
            showTooltip={true}
            tooltipTitle="The percentage of your store visits that resulted in a purchase."
            tooltipContent="(Orders / Visits ) * 100"
            anchorId="visits"
            percentageId="percentage-visits"
            cardValueId="num-conversion-rate"
            isCardLoading={loadingStatistics}
          />

          <AnalyticsCard
            title="Orders"
            subtitle="Shopify"
            percentage={dataStatistics?.total_order?.percentage || 0}
            value={dataStatistics?.total_order?.amount?.toLocaleString() || 0}
            showTooltip={true}
            tooltipTitle="Total number of orders made through your Shopify Store."
            anchorId="total-number-of-orders"
            percentageId="percentage-total-number-of-orders"
            cardValueId="total-num-of-orders"
            isCardLoading={loadingStatistics}
          />
        </div>
        <PerformingProducts
          animation={animationChart}
          productList={performingProducts}
          currency={businessCurrency}
          loadingGraph={loadingPerformingProduct}
        />
      </div>
      <div className="flex-col-1250 flex justify-between mt-4">
        <div className="widget-container p-5 w-[65%] mb-6">
          <RoasGoalsChart
            business={business}
            roasGoals={roasGoals}
            roasLabels={keyMetricsRoasTracker}
            dateFilter={dateFilterValues}
            platform={MarketingPlatforms.ALLPLATFORMS}
            tooltipAnchorId="all-break-even-roas-goals"
            loadingGraph={loadingRoasTrackerGraph}
          />
        </div>
        <div className="widget-container mb-6 p-5 w-[32%]">
          <MonthlyChart
            spentPercentage={spentPercentage}
            animationForChart={animationChart}
            business={business}
            amountLeft={amountLeft}
            keyMetricsMonthlyBudget={keyMetricsMonthlyBudget}
            tooltipAnchorId="all-monthly-ad-spend-goal"
            currency={businessCurrency}
            loadingGraph={loadingMonthtlyBudgetGraph}
          />
        </div>
      </div>
      {/* Update when customer journey graph is merged in */}
      <div className="relative">
        {/* {userProfile?.user_plan?.plan_code?.includes('gro') && <GroPlanLock />} */}
        <div className="mt-3 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="h4">Customer Journey Analytics</h4>
            <div className="inline-flex items-center flex-shrink-0">
              <span className="font-medium text-textTeriraryColor text-xs mr-2 whitespace-nowrap">
                Display Data For
              </span>
              <SelectPeriod
                onChange={(e) => handleChangePeriod(e, 'customer-journey')}
                period={customerJourneyPeriod}
                analytics={true}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <NewVsReturningVisitorChart period={customerJourneyPeriod} />
            </div>

            <div className="grid grid-cols-2 gap-x-4 relative">
              <ClickSourcesRatio
                sourcesGraphState={sourcesGraphState}
                loadingGraph={loadingGraph}
              />
              <ConversionBySource
                sourcesGraphState={sourcesGraphState}
                loadingGraph={loadingGraph}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(AllPlatforms);
