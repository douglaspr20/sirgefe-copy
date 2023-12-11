import Tooltip from './Tooltip';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';

type Props = {
  title: string;
  value?: string;
  status?: string;
  tooltipTitle?: string;
  styleProps?: any;
  stars?: JSX.Element[];
  anchorId: string;
};

const AnalyticsComparisonTooltip: React.FunctionComponent<Props> = ({
  title,
  status,
  value,
  tooltipTitle,
  stars,
  anchorId,
}) => {
  return (
    <div className="flex flex-col items-center w-[90px] mb-1">
      <div className="flex items-center mb-1">
        <span className="w-full font-medium text-xs text-textTeriraryColor">
          {title}
        </span>

        {/* <Image
          src={toolTipIcon}
          alt="tooltip-info"
          id={anchorId}
          className="ml-1 cursor-pointer"
          width={13}
          height={13}
        /> */}
      </div>

      {status ? (
        <span className={`tag-small ${status ? 'green' : 'yellow'}`}>
          {status}
        </span>
      ) : value ? (
        <span className="font-semibold text-sm">{value}</span>
      ) : stars ? (
        <div className="last:mb-0 flex flex-col items-start">
          <ul className="rating green">
            {stars.map((star, index) => (
              <li key={index} className="rating__item active">
                {star}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="font-semibold">0</span>
      )}

      <Tooltip title={tooltipTitle} anchorId={anchorId} />
    </div>
  );
};

export default AnalyticsComparisonTooltip;
