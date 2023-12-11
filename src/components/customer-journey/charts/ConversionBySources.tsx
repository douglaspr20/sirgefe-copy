import SirgeSpinner from '@components/loader/SirgeSpinner';
import NoData from '@components/NoData';
import Tooltip from '@components/Tooltip';
import toolTipIcon from '@images/tooltip.svg';
import { useLayoutContext } from '@providers/layoutProvider';
import { optionsBarChart } from '@utils/optionsChart';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SourcesBusiness } from '../../../API';

dayjs.extend(timezone);

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const validLabelsArray = [
  'Facebook',
  'Google',
  'Direct',
  'TikTok',
  'Klaviyo',
  'Other',
];

interface Props {
  sourcesGraphState: SourcesBusiness[];
  loadingGraph: boolean;
}

const ConversionBySource: FC<Props> = ({ sourcesGraphState, loadingGraph }) => {
  const { isSidebarOpen } = useLayoutContext();

  const [animationChart, setAnimationChart] = useState<boolean>(true);

  const [customWidthChart, setCustomWidthChart] = useState<string>('100%');

  const groupBy = useCallback(
    (objectArray: SourcesBusiness[], property: string) => {
      const fillAllSources = objectArray.map((item) => {
        const toLower = item?.source?.toLocaleLowerCase() || 'other';

        if (toLower === 'other') {
          return {
            ...item,
            source: 'other',
          };
        }

        return {
          ...item,
        };
      });

      return fillAllSources.reduce((acc: any, obj: any) => {
        let key: string = obj[property];

        key =
          validLabelsArray.find((label) =>
            key?.toLowerCase().includes(label?.toLowerCase() || ''),
          ) || 'Other';

        const curValue = acc[key] ?? {
          unique_visitor: 0,
          purchases_count: 0,
        };

        return {
          ...acc,
          [key]: {
            unique_visitor:
              Number(curValue.unique_visitor) + Number(obj.unique_visitor),
            purchases_count:
              Number(curValue.purchases_count) + Number(obj.purchases_count),
          },
        };
      }, {});
    },
    [],
  );

  const grouped = useMemo(() => {
    return { ...groupBy(sourcesGraphState.sort(), 'source') };
  }, [groupBy, sourcesGraphState]);

  const chartLabels = useMemo(() => {
    const labels = Object.keys(grouped).sort(
      (a, b) => validLabelsArray.indexOf(a) - validLabelsArray.indexOf(b),
    );

    return labels;
  }, [grouped]);

  const barChartValues: any[] = chartLabels.map(
    (label) =>
      Number(
        (
          (grouped[label]?.purchases_count / grouped[label]?.unique_visitor) *
          100
        ).toFixed(2),
      ) || 0,
  );

  useEffect(() => {
    if (sourcesGraphState.length > 0) {
      setCustomWidthChart('0%');
      setCustomWidthChart(isSidebarOpen ? '85%' : '108%');
    }
  }, [isSidebarOpen]);

  return (
    <>
      <div className="widget-container p-5 mb-6">
        <div className="flex items-center">
          <h5 className="h5">Conversion Rates By Source</h5>

          <span className="ml-1 cursor-pointer" id="orders-made-by-customer">
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
            'Overview of the number of orders made by customers coming from each source.'
          }
          anchorId="orders-made-by-customer"
        />

        <div className={`grid place-items-center mt-9 min-h-[330px]`}>
          {!loadingGraph ? (
            <>
              {sourcesGraphState.length > 0 ? (
                <div id="barHorizontalChart" className="w-full">
                  <Chart
                    options={optionsBarChart(
                      chartLabels,
                      animationChart,
                      'Direct',
                    )}
                    series={[
                      {
                        data: barChartValues,
                      },
                    ]}
                    type="bar"
                    width={customWidthChart}
                    height={'330px'}
                  />
                </div>
              ) : (
                <NoData />
              )}
            </>
          ) : (
            <SirgeSpinner />
          )}
        </div>
      </div>
    </>
  );
};

export default ConversionBySource;
