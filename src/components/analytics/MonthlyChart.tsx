import React from 'react';
import NoMonthlyBudgetData from '@components/NoMonthlyBudget';
import { optionsDoughnutChart } from '@utils/optionsChart';
import { Business, MarketingSources } from '@sirge-io/sirge-types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';
import Tooltip from '@components/Tooltip';
import NoData from '@components/NoData';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
interface Props {
  spentPercentage: string | undefined;
  animationForChart: boolean;
  business: Business | null;
  amountLeft: number;
  monthlyBudgets: any[];
  tooltipAnchorId: string;
  currency?: string;
}
const colors = {
  monthlyBudget: {
    'facebook ad spent': '#7DE28D',
    'tiktok ad spent': '#68C7C0',
    'google ad spent': '#9EADFB',
    'ad budget': '#E689D0',
  },
};

const MonthlyChart: React.FC<Props> = ({
  monthlyBudgets,
  amountLeft,
  spentPercentage,
  animationForChart,
  business,
  tooltipAnchorId,
  currency,
}) => {
  return (
    <>
      {
      ((business as any)?.monthly_budget === null) ? (
        <NoMonthlyBudgetData />
      ) : (
        <>
          <div className="flex items-center justify-between mb-7">
            <div className="text-darkGrade100 font-semibold flex items-center">
              <span>Monthly Budget</span>
              <Image
                id={tooltipAnchorId}
                src={toolTipIcon}
                alt="tooltip-info"
                width={13}
                height={13}
                className="ml-1 cursor-pointer"
              />

              <Tooltip
                title="Use the gear icon to set and track your monthly ad spend goal to ensure that you stay on track with your ad budget."
                anchorId={tooltipAnchorId}
              />
            </div>

            <button
              data-bs-toggle="modal"
              data-bs-target="#monthlyBudgetModal"
              className="text-xl text-darkGrade50 hover:text-darkGrade75"
            >
              <i className="icon-settings-line"></i>
            </button>
          </div>
          
          {!spentPercentage ?
            (<NoData />) 
            :
            <div className="flex items-center" key={spentPercentage}>
            <Chart
              key={spentPercentage}
              options={{
                ...optionsDoughnutChart(
                  [
                    'Facebook Ad Spent',
                    'TikTok Ad Spent',
                    ...(process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION ===
                    'show'
                      ? ['Google Ad Spent']
                      : []),
                    'Ad Budget',
                  ],
                  'Ad Budget Spent',
                  animationForChart,
                  colors?.monthlyBudget,
                  spentPercentage,
                  currency,
                ),
                legend: {
                  show: false,
                },
              }}
              series={[
                monthlyBudgets?.find(
                  (item: any) =>
                    item?.source?.toLowerCase() === MarketingSources.FACEBOOK,
                )?.amount_spent ?? 0,
                monthlyBudgets?.find(
                  (item: any) =>
                    item?.source?.toLowerCase() === MarketingSources.TIKTOK,
                )?.amount_spent ?? 0,

                ...(process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION === 'show'
                  ? [
                      monthlyBudgets?.find(
                        (item: any) =>
                          item?.source?.toLowerCase() ===
                          MarketingSources.GOOGLE,
                      )?.amount_spent || 0,
                    ]
                  : []),
                amountLeft,
              ]}
              width={'240px'}
              height={240}
              type="donut"
            />
            {/* <div className="monthly-budget"></div> */}
            <div className="flex flex-col">
              <span className="text-xs text-textTeriraryColor">Ad Budget</span>
              <div className="text-darkGrade100 font-bold mb-4">
                {' '}
                {(business as any)?.monthly_budget?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: (currency as string) ?? 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </div>
              <ul className="mb-4 inline-flex flex-col">
                <li className="inline-flex items-center mb-2 last:mb-0">
                  <span className="w-2 h-2 rounded-full bg-[#7DE28D] shrink-0 mr-1"></span>
                  <span className="text-textSecondaryColor text-xs font-medium">
                    Facebook Ad Spent
                  </span>
                </li>
                <li className="inline-flex items-center mb-2 last:mb-0">
                  <span className="w-2 h-2 rounded-full bg-[#9EADFB] shrink-0 mr-1"></span>
                  <span className="text-textSecondaryColor text-xs font-medium">
                    TikTok Ad Spent
                  </span>
                </li>
                {process.env.NEXT_PUBLIC_SHOW_GOOGLE_INTEGRATION === 'show' && (
                  <li className="inline-flex items-center mb-2 last:mb-0">
                    <span className="w-2 h-2 rounded-full bg-[#9EADFB] shrink-0 mr-1"></span>
                    <span className="text-textSecondaryColor text-xs font-medium">
                      Google Ad Spent
                    </span>
                  </li>
                )}

                <li className="inline-flex items-center mb-2 last:mb-0">
                  <span className="w-2 h-2 rounded-full bg-[#E689D0] shrink-0 mr-1"></span>
                  <span className="text-textSecondaryColor text-xs font-medium">
                    Ad Budget
                  </span>
                </li>
              </ul>
            </div>
          </div>}
        </>
      )}
    </>
  );
};

export default MonthlyChart;
