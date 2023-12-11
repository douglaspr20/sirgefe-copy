import React, { FC } from 'react';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';

import Tooltip from './Tooltip';
import TooltipVideo from './video-tooltip';

type RoasTiles = {
  value: string | number;
  source: string;
  active: boolean;
};

interface Props {
  title: string;
  subtitle: string;
  percentage?: number;
  value?: string | number;
  showTooltip?: boolean;
  tooltipTitle?: string;
  tooltipContent?: string;
  percentageId?: string;
  anchorId?: string;
  cardValueId?: string;
  roasTiles?: RoasTiles[] | any;
}

const getSourceIcon = (source: string) => {
  switch (source) {
    case 'facebook':
      return '/images/facebook.svg';
    case 'tiktok':
      return '/images/tiktok.svg';
    case 'google':
      return '/images/google.svg';
    default:
      return '/images/google.svg';
  }
};

const displayPercentage = (percentage?: number) => {
  if (percentage) {
    const percentValue =
      percentage > 0
        ? `+${percentage.toFixed(2)}`
        : percentage < 0
        ? percentage.toFixed(2)
        : 0;

    return `${percentValue}%`;
  }
};

const percentageStyle = (percentage?: number) => {
  if (percentage) {
    const style =
      percentage < 0
        ? 'red'
        : percentage === 0
        ? 'text-textSecondaryColor bg-greyLight'
        : 'green';

    return style;
  }
};

const AnalyticsCard: FC<Props> = ({
  title,
  subtitle,
  percentage,
  value,
  showTooltip = false,
  tooltipTitle,
  tooltipContent,
  percentageId,
  anchorId,
  cardValueId,
  roasTiles,
}) => {
  const style = percentageStyle(percentage);
  const percentageValue = displayPercentage(percentage);

  return (
    <div className="widget-container p-5 flex flex-col justify-between">
      <div
        className="flex justify-between items-start mb-7"
        style={{ marginBottom: '' }}
      >
        <div className="inline-flex flex-col">
          <div>
            <div className="text-textSecondaryColor font-semibold mb-0.5 flex gap-2 items-center">
              <span>{title}</span>
              {showTooltip && (
                <>
                  <div className="cursor-pointer" id={anchorId}>
                    <Image
                      src={toolTipIcon}
                      alt="tooltip-info"
                      width={13}
                      height={13}
                    />
                  </div>

                  <Tooltip
                    title={tooltipTitle}
                    content={tooltipContent}
                    anchorId={anchorId as string}
                  />
                </>
              )}
            </div>
          </div>

          <p className="text-textTeriraryColor text-xs">{subtitle}</p>
        </div>
        <span className={`tag ${style}`} id={percentageId}>
          {percentageValue}
        </span>

        {percentageValue && (
          <Tooltip
            title={'Compared to the previous selected period'}
            styleProps={{
              left: -70,
            }}
            anchorId={percentageId as string}
          />
        )}
      </div>
      <tr>
        <td className="float-left">
          <tr>
            <h2 className="h2" id={cardValueId}>
              {!value || value === '$null' || value === '$undefined'
                ? 0
                : value}
            </h2>
          </tr>
        </td>
        <td className="float-right">
          {roasTiles?.map((tile: RoasTiles | any, index: number) => {
            return (
              <tr key={index}>
                <span
                  className={`h6 float-right ${
                    !tile.active ? 'invalid-tile' : ''
                  }`}
                  key={index}
                >
                  {tile.value > 0 ? tile.value : '0.00'}X&nbsp;
                  <Image
                    className="mr-1 float-right"
                    id={tile.source}
                    src={getSourceIcon(tile.source)}
                    alt={tile.source}
                    width={20}
                    height={20}
                  />
                </span>
                {!tile.active ? (
                  <Tooltip
                    title={'No ad data available yet'}
                    content={tooltipContent}
                    anchorId={tile.source}
                  />
                ) : (
                  ''
                )}
              </tr>
            );
          })}
        </td>
      </tr>
    </div>
  );
};

export default AnalyticsCard;
