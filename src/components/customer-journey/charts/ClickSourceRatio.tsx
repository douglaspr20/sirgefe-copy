import SirgeSpinner from '@components/loader/SirgeSpinner';
import NoData from '@components/NoData';
import Tooltip from '@components/Tooltip';
import toolTipIcon from '@images/tooltip.svg';
import { optionsDoughnutChart } from '@utils/optionsChart';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useCallback, useMemo, useState } from 'react';
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

const colors = {
  facebook: '#7DE28D',
  google: '#9EADFB',
  direct: '#E689D0',
  tiktok: '#68C7C0',
  klaviyo: '#FAF333',
  other: '#A1B3C4',
};

interface Props {
  sourcesGraphState: SourcesBusiness[];
  loadingGraph: boolean;
}
const ClickSourcesRatio: FC<Props> = ({ sourcesGraphState, loadingGraph }) => {
  const [animationChart, setAnimationChart] = useState<boolean>(true);

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

  const radioChartValues: number[] = chartLabels.map(
    (label) => grouped[label]?.unique_visitor,
  );

  return (
    <>
      <div className="widget-container p-5 mb-6">
        <div className="flex items-center mb-7">
          <h5 className="h5 ">Where your clicks are coming from</h5>

          <span className="ml-1 cursor-pointer" id="store-traffic">
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
            'The ratio of the volume of traffic to your store by each channel.'
          }
          anchorId="store-traffic"
        />

        <div className={`grid place-items-center min-h-[330px]`}>
          {!loadingGraph ? (
            <>
              {sourcesGraphState.length > 0 ? (
                <div id="donutChart">
                  <Chart
                    options={optionsDoughnutChart(
                      chartLabels,
                      'Total Visits',
                      animationChart,
                      colors,
                    )}
                    series={radioChartValues}
                    width={'100%'}
                    height={'330px'}
                    type="donut"
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

export default ClickSourcesRatio;
