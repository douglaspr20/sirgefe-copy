import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import Tooltip from '@components/Tooltip';
import { getAllVisitorsGraph } from '@graphql/queries';
import toolTipIcon from '@images/tooltip.svg';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { useLayoutContext } from '@providers/layoutProvider';
import * as Sentry from '@sentry/nextjs';
import {
  getDateEnd,
  TypesValues as PeriodTypeValues,
  typeValues,
} from '@utils/format';
import {
  generateLabels,
  getLabelsClass,
  getLabelsDate,
} from '@utils/generateChartLabel';
import { groupByGraphData } from '@utils/grouped';
import { optionsLineChart } from '@utils/optionsChart';
import { AllBusinessVisitorGraph } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import NoData from '@components/NoData';
import SirgeSpinner from '@components/loader/SirgeSpinner';
dayjs.extend(timezone);

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  period: PeriodTypeValues;
}

const NewVsReturningVisitorChart: FC<Props> = ({ period }) => {
  const { isSidebarOpen } = useLayoutContext();
  const { selectedBusiness, userProfile } = useBusinessProfileContext();

  const [customWidthChart, setCustomWidthChart] = useState<string>('100%');
  const [visitorsGraphState, setVisitorsGraphState] = useState<
    AllBusinessVisitorGraph[]
  >([]);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'error',
    message: '',
  });

  const [periodLabels, setPeriodLabels] = useState<any[]>([]);
  const [newVisitors, setNewVisitors] = useState<any[]>([]);
  const [returningVisitors, setReturningVisitors] = useState<any[]>([]);
  const [loadingGraph, setLoadingGraph] = useState<boolean>(false);

  useEffect(() => {
    setPeriodLabels(
      generateLabels(
        period,
        false,
        selectedBusiness?.timezone || 'America/Chicago',
      ),
    );
  }, [period]);

  const date = dayjs()
    .tz(selectedBusiness?.timezone || 'America/Chicago')
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const getVisitorsGraph = useCallback(
    async (filters: {
      category?: string;
      date_from?: string;
      date_to?: string;
    }) => {
      const responseGetVisitorsGraph: any = await API.graphql(
        graphqlOperation(getAllVisitorsGraph, {
          getAllVisitorsGraphInput: {
            business_id: selectedBusiness?.business_id,
            ...(filters.category && { category: filters.category }),
            ...(filters.date_from && { date_from: filters.date_from }),
            ...(filters.date_to && { date_to: filters.date_to }),
          },
        }),
      );

      return responseGetVisitorsGraph;
    },
    [selectedBusiness?.business_id],
  );

  const visitorsLabelsDate = getLabelsDate(
    period,
    false,
    selectedBusiness?.timezone || 'America/Chicago',
  );

  useEffect(() => {
    const newVisitorsArray = visitorsGraphState.map((visitor) => {
      const visitorData = {
        created: visitor.date,
        amount: visitor.new_visitors,
      };
      return visitorData;
    });
    const newVisitorsData = groupByGraphData(
      newVisitorsArray as any,
      period,
      visitorsLabelsDate,
      selectedBusiness?.timezone || 'America/Chicago',
      true,
    );
    const newVisitorsDataArray = periodLabels?.map((label: string) => {
      const value = newVisitorsData[label];
      return value || 0;
    });
    setNewVisitors(newVisitorsDataArray);

    const returningVisitorsArray = visitorsGraphState.map((visitor) => {
      const visitorData = {
        created: visitor.date,
        amount: visitor.returning_visitors,
      };
      return visitorData;
    });
    const returningVisitorsData = groupByGraphData(
      returningVisitorsArray as any,
      period,
      visitorsLabelsDate,
      selectedBusiness?.timezone || 'America/Chicago',
      true,
    );
    const returningVisitorsDataArray = periodLabels?.map((label: string) => {
      const value = returningVisitorsData[label];

      return value || 0;
    });
    setReturningVisitors(returningVisitorsDataArray);
  }, [visitorsGraphState]);

  useEffect(() => {
    const updateVisitorsGraph = async () => {
      const date_from = typeValues(
        false,
        date,
        period as PeriodTypeValues,
        period === 'today' ? 'YYYY-MM-DD' : 'YYYY-MM-DD',
      ) as string;

      const date_to = getDateEnd(
        selectedBusiness?.timezone || 'America/Chicago',
        period,
      );

      try {
        setLoadingGraph(true);

        const response: any = await getVisitorsGraph({
          category: period === 'today' ? 'timewise' : 'datewise',
          date_from,
          date_to,
        });

        if (response.data?.getAllVisitorsGraph?.error) {
          throw new Error(response.data?.getAllVisitorsGraph.error.message);
        }

        if (period === 'last_30_days' || period === 'last_90_days') {
          return setVisitorsGraphState(response.data.getAllVisitorsGraph.data);
        }

        setVisitorsGraphState(response.data.getAllVisitorsGraph.data);
      } catch (error: any) {
        Sentry.captureException(error);
        setDialogOptions({
          type: 'error',
          message: error.message || 'Something went wrong',
        });
      } finally {
        setLoadingGraph(false);
        // do something like set loading to false
      }
    };

    updateVisitorsGraph();
  }, [period, getVisitorsGraph]);

  useEffect(() => {
    if (newVisitors.length > 0) {
      setCustomWidthChart('0%');
      setCustomWidthChart(isSidebarOpen ? '85%' : '100%');
    }
  }, [isSidebarOpen]);

  const emptyData = visitorsGraphState.length === 0;

  return (
    <>
      <div className="widget-container mb-6 relative pt-4">
        <div className="flex items-center justify-between p-5 pb-0 absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center">
            <h5 className="h5">New vs Returning Visitors</h5>

            <span className="ml-1 cursor-pointer" id="traffic-volume">
              <Image
                src={toolTipIcon}
                alt="tooltip-info"
                width={13}
                height={13}
              />
            </span>
          </div>

          <Tooltip
            title={
              'This graph helps illustrates customer behaviors on your store and compare the volume of new traffic vs old.'
            }
            anchorId="traffic-volume"
          />
        </div>

        <div
          id="lineChart"
          className="grid grid-cols-1 pr-4 pb-1 pl-1 min-h-[250px]"
        >
          {loadingGraph ? (
            <SirgeSpinner />
          ) : (
            <>
              {emptyData ? (
                <NoData />
              ) : (
                <Chart
                  options={{
                    ...optionsLineChart(
                      periodLabels,
                      true,
                      getLabelsClass(period, false),
                      0,
                      true
                    ),
                    legend: {
                      show: true,
                      horizontalAlign: 'right',
                      onItemClick: {
                        toggleDataSeries: false,
                      },

                      position: 'top',
                    },
                  }}
                  series={[
                    {
                      name: 'New Visitors',
                      data: newVisitors,
                    },
                    {
                      name: 'Returning Visitors',
                      data: returningVisitors,
                    },
                  ]}
                  width={customWidthChart}
                  height={250}
                  type="line"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewVsReturningVisitorChart;
