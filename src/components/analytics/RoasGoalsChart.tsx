import React, { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NoRoasGoalData from '@components/NoRoasGoals';
import { optionsHalfDonusChart } from '@utils/optionsChart';
import { Business } from '@sirge-io/sirge-types';
import NoData from '@components/NoData';
import TooltipVideo from '@components/video-tooltip';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  business: Business | null;
  roasLabels: {
    ad: {
      over: number;
      under: number;
    };
    adset: {
      over: number;
      under: number;
    };
    campaign: {
      over: number;
      under: number;
    };
  };
  roasGoals: {
    ad: number;
    adset: number;
    campaign: number;
  };
  dateFilter: {
    dateStart: string;
    dateEnd: string;
  };
  platform: string;
  tooltipAnchorId: string;
}

const RoasGoalsChart: FC<Props> = ({
  business,
  roasLabels,
  roasGoals,
  dateFilter,
  platform,
  tooltipAnchorId,
}) => {
  return (
    <>
      {Object.keys(roasLabels).length === 0 ||
      Object.keys(roasGoals).length === 0 ? (
        <NoRoasGoalData />
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <TooltipVideo
              isBreakRoas
              title="Use the gear icon to set your break-even ROAS and Sirge will track which of your campaigns, ad sets, and ads are performing over or under it."
            />
          </div>
          <div className="grid grid-cols-3">
            <div className="flex flex-col border-r border-r-extraLightColor">
              <div className="mb-3 text-xs text-textSecondaryColor font-semibold">
                Campaigns
              </div>
              {roasLabels?.campaign?.over === 0 &&
              roasLabels?.campaign?.under === 0 ? (
                <NoData />
              ) : (
                <>
                  {roasLabels?.campaign && (
                    <>
                      <Chart
                        key={roasGoals?.campaign}
                        options={{
                          ...optionsHalfDonusChart(
                            ['Over', 'Under'],
                            `${roasGoals?.campaign}X`,
                          ),
                          legend: { show: false },
                        }}
                        series={[
                          roasLabels?.campaign?.over,
                          roasLabels?.campaign?.under,
                        ]}
                        width={'100%'}
                        type="donut"
                      />

                      <ul className="inline-flex flex-col">
                        <li className="inline-flex items-center mb-2 last:mb-0">
                          <span className="w-2 h-2 rounded-full bg-[#7DE28D] shrink-0 mr-1"></span>
                          <span className="text-textSecondaryColor text-xs font-medium">
                            Over
                          </span>
                          <Link
                            href={{
                              pathname: `/${business?.vanity_name}/performance/campaigns`,
                              query: {
                                keyword: 'Over',
                                tab: 'Campaigns',
                                platform,
                                dateStart: dateFilter?.dateStart ?? '',
                                dateEnd: dateFilter?.dateEnd ?? '',
                              },
                            }}
                            title="Home"
                          >
                            <i
                              style={{ color: '#A1B3C3' }}
                              className="icon-open ml-1 cursor-pointer"
                            ></i>
                          </Link>
                        </li>
                        <li className="inline-flex items-center mb-2 last:mb-0">
                          <span className="w-2 h-2 rounded-full bg-[#F67063] shrink-0 mr-1"></span>
                          <span className="text-textSecondaryColor text-xs font-medium">
                            Under
                          </span>
                          <Link
                            href={{
                              pathname: `/${business?.vanity_name}/performance/campaigns`,
                              query: {
                                keyword: 'Under',
                                tab: 'Campaigns',
                                platform,
                                dateStart: dateFilter?.dateStart ?? '',
                                dateEnd: dateFilter?.dateEnd ?? '',
                              },
                            }}
                            title="Home"
                          >
                            <i
                              style={{ color: '#A1B3C3' }}
                              className="icon-open ml-1 cursor-pointer"
                            ></i>
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col border-r border-r-extraLightColor">
              <div className="mb-3 text-xs text-textSecondaryColor font-semibold ml-4">
                Ad Sets
              </div>

              {roasLabels?.adset?.over === 0 &&
              roasLabels?.adset?.under === 0 ? (
                <NoData />
              ) : (
                <>
                  {roasLabels?.adset && (
                    <>
                      <Chart
                        key={roasGoals?.adset}
                        options={{
                          ...optionsHalfDonusChart(
                            ['Over', 'Under'],
                            `${roasGoals?.adset}X`,
                          ),
                          legend: { show: false },
                        }}
                        series={[
                          roasLabels?.adset?.over,
                          roasLabels?.adset?.under,
                        ]}
                        width={'100%'}
                        type="donut"
                      />

                      <ul className="inline-flex flex-col ml-4">
                        <li className="inline-flex items-center mb-2 last:mb-0">
                          <span className="w-2 h-2 rounded-full bg-[#7DE28D] shrink-0 mr-1"></span>
                          <span className="text-textSecondaryColor text-xs font-medium">
                            Over
                          </span>
                          <Link
                            href={{
                              pathname: `/${business?.vanity_name}/performance/campaigns`,
                              query: {
                                keyword: 'Over',
                                tab: 'Ad sets',
                                platform,
                                dateStart: dateFilter?.dateStart ?? '',
                                dateEnd: dateFilter?.dateEnd ?? '',
                              },
                            }}
                            title="Home"
                          >
                            <i
                              style={{ color: '#A1B3C3' }}
                              className="icon-open ml-1 cursor-pointer"
                            ></i>
                          </Link>
                        </li>
                        <li className="inline-flex items-center mb-2 last:mb-0">
                          <span className="w-2 h-2 rounded-full bg-[#F67063] shrink-0 mr-1"></span>
                          <span className="text-textSecondaryColor text-xs font-medium">
                            Under
                          </span>
                          <Link
                            href={{
                              pathname: `/${business?.vanity_name}/performance/campaigns`,
                              query: {
                                keyword: 'Under',
                                tab: 'Ad sets',
                                platform,
                                dateStart: dateFilter?.dateStart ?? '',
                                dateEnd: dateFilter?.dateEnd ?? '',
                              },
                            }}
                            title="Home"
                          >
                            <i
                              style={{ color: '#A1B3C3' }}
                              className="icon-open ml-1 cursor-pointer"
                            ></i>
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col border-r border-r-extraLightColor last:border-r-0">
              <div className="mb-3 text-xs text-textSecondaryColor font-semibold ml-4">
                Ads
              </div>

              {roasLabels?.ad?.over === 0 && roasLabels?.ad?.under === 0 ? (
                <NoData />
              ) : (
                <>
                  {roasLabels?.ad && (
                    <>
                      <Chart
                        key={roasGoals?.ad}
                        options={{
                          ...optionsHalfDonusChart(
                            ['Over', 'Under'],
                            `${roasGoals?.ad}X`,
                          ),
                          legend: { show: false },
                        }}
                        series={[roasLabels?.ad?.over, roasLabels?.ad?.under]}
                        width={'100%'}
                        type="donut"
                      />
                      <ul className="inline-flex flex-col ml-4">
                        <li className="inline-flex items-center mb-2 last:mb-0">
                          <span className="w-2 h-2 rounded-full bg-[#7DE28D] shrink-0 mr-1"></span>
                          <span className="text-textSecondaryColor text-xs font-medium">
                            Over
                          </span>
                          <Link
                            href={{
                              pathname: `/${business?.vanity_name}/performance/campaigns`,
                              query: {
                                keyword: 'Over',
                                tab: 'Ads',
                                platform,
                                dateStart: dateFilter?.dateStart ?? '',
                                dateEnd: dateFilter?.dateEnd ?? '',
                              },
                            }}
                          >
                            <i
                              style={{ color: '#A1B3C3' }}
                              className="icon-open ml-1 cursor-pointer"
                            ></i>
                          </Link>
                        </li>
                        <li className="inline-flex items-center mb-2 last:mb-0">
                          <span className="w-2 h-2 rounded-full bg-[#F67063] shrink-0 mr-1"></span>
                          <span className="text-textSecondaryColor text-xs font-medium">
                            Under
                          </span>
                          <Link
                            href={{
                              pathname: `/${business?.vanity_name}/performance/campaigns`,
                              query: {
                                keyword: 'Under',
                                tab: 'Ads',
                                platform,
                                dateStart: dateFilter?.dateStart ?? '',
                                dateEnd: dateFilter?.dateEnd ?? '',
                              },
                            }}
                          >
                            <i
                              style={{ color: '#A1B3C3' }}
                              className="icon-open ml-1 cursor-pointer"
                            ></i>
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RoasGoalsChart;
