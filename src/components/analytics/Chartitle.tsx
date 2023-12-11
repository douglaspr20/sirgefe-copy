import React, { useState } from 'react';

import toolTipIcon from '@images/tooltip.svg';
import Image from 'next/image';
import Tooltip from '@components/Tooltip';

type Props = {
  title: string;
  tooltipTitle?: string;
  tooltipContent?: string;
  isBreakRoas?: boolean;
  isSourceChart?: boolean;
  styleProps?: any;
  anchorId: string;
};

const ChartTitle: React.FunctionComponent<Props> = ({
  title,
  tooltipTitle,
  tooltipContent,
  isBreakRoas,
  isSourceChart,
  anchorId,
}) => {
  return (
    <>
      {isBreakRoas ? (
        <>
          <div className="flex items-center">
            <div className="text-darkGrade100 font-semibold">ROAS Goals</div>

            <span className="ml-1 cursor-pointer" id={anchorId}>
              <Image
                src={toolTipIcon}
                alt="tooltip-info"
                width={13}
                height={13}
              />
            </span>
          </div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#roasGoalModal"
            className="text-xl text-darkGrade50 hover:text-darkGrade75"
          >
            <i className="icon-settings-line"></i>
          </button>
        </>
      ) : isSourceChart ? (
        <div className="flex items-center">
          <h5 className="h5 text-textSecondaryColor">{title}</h5>

          <span className="ml-1 cursor-pointer" id={anchorId}>
            <Image
              src={toolTipIcon}
              alt="tooltip-info"
              width={13}
              height={13}
            />
          </span>
        </div>
      ) : (
        <>
          <div className="inline-flex flex-col">
            <div className="flex items-center">
              <span className="text-textSecondaryColor font-semibold mb-0.5">
                {title}
              </span>

              <span className="ml-1 cursor-pointer" id={anchorId}>
                <Image
                  src={toolTipIcon}
                  alt="tooltip-info"
                  width={13}
                  height={13}
                />
              </span>
            </div>
          </div>
        </>
      )}

      <Tooltip
        title={tooltipTitle}
        content={tooltipContent}
        anchorId={anchorId}
      />
    </>
  );
};

export default ChartTitle;
