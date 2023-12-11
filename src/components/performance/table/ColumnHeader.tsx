import { Column } from '@interfaces/performance';
import React from 'react';
import { SortDownIcon, SortUpIcon } from '@assets/icons/performance';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';
import Tooltip from '@components/Tooltip';
import { MarketingPlatforms } from '@enums/marketingPlatforms';

interface Props {
  column: Column;
  index: number;
  handleSelSortCheckChange: (sortfield: string) => void;
  handleMouseDown: (event: any) => void;
  sortChecked: boolean;
  faceBookToggle: boolean;
  currentPlatform: string;
  currentPurchase?: string | null;
  currentSortField?: string;
  colunmWidths: number[];
}

const ColumnHeader = ({
  column,
  index,
  sortChecked,
  currentSortField,
  faceBookToggle,
  currentPlatform,
  currentPurchase,
  handleSelSortCheckChange,
  handleMouseDown,
  colunmWidths,
}: Props) => {
  if (!faceBookToggle && column.hideable) return <></>;

  if (column.accessorKey === 'platform' && currentPlatform !== 'All Platforms')
    return <></>;

  return (
    <th
      key={column.accessorKey}
      className={`px-2 py-4 z-[150] text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left  select-none`}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute top-0 bottom-0 -right-2 w-4 cursor-move " />
      <div
        className="flex items-center sort-column"
        style={{
          width:
            colunmWidths[index] > column.width
              ? colunmWidths[index]
              : column.width,
        }}
      >
        {column.icon ? (
          column.generator === 'sirge' ? (
            <>
              <Tooltip
                title={column.tooltip}
                anchorId={column.tooltip as string}
                className="performance-column-tooltip"
              />

              <i
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-title="View user profile"
                data-bs-trigger="hover focus"
                data-bs-content="Some info description"
                className="icon-spark text-primaryColor text-base mr-[6px]"
                id={column.tooltip}
              ></i>
            </>
          ) : currentPlatform === 'facebook' ? (
            <>
              <Tooltip
                title={`Facebook's ${column.tooltip}`}
                anchorId={column.tooltip as string}
                className="performance-column-tooltip"
              />

              <Image
                className="mr-1 cursor-pointer"
                id={column.tooltip}
                src={'/images/facebook.svg'}
                alt={'facebook'}
                width={24}
                height={24}
              />
            </>
          ) : currentPlatform === 'tik_tok' ? (
            <>
              <Tooltip
                title={`TikTok's ${column.tooltip}`}
                anchorId={column.tooltip as string}
                className="performance-column-tooltip"
              />

              <Image
                className="mr-1 cursor-pointer"
                id={column.tooltip}
                src={'/images/tiktok.svg'}
                alt={'tiktok'}
                width={24}
                height={24}
              />
            </>
          ) : (
            <>
              <Tooltip
                title={`Google's ${column.tooltip}`}
                anchorId={column.tooltip as string}
                className="performance-column-tooltip"
              />

              <Image
                className="mr-1 cursor-pointer"
                id={column.tooltip}
                src={'/images/google.svg'}
                alt={'google'}
                width={24}
                height={24}
              />
            </>
          )
        ) : (
          <></>
        )}
        <span>{column.name}</span>

        {column.infoIcon && (
          <>
            <Tooltip
              title={column.tooltip}
              anchorId={column.tooltip as string}
              className="performance-column-tooltip"
            />

            <Image
              className="ml-1 cursor-pointer"
              id={column.tooltip}
              src={toolTipIcon}
              alt="tooltip-info"
              width={13}
              height={13}
            />
          </>
        )}

        {column?.accessorKey !== 'source_delivery_status' && (
          <>
            <span
              className="sort-button cursor-pointer"
              onClick={() => handleSelSortCheckChange(column.accessorKey)}
              style={{
                opacity:
                  currentSortField === column.accessorKey ? 100 : undefined,
              }}
            >
              {currentSortField !== column.accessorKey ? (
                <Image
                  src={'/images/sort-up-disabled.svg'}
                  alt={'sort'}
                  width={20}
                  height={20}
                />
              ) : sortChecked ? (
                <SortUpIcon />
              ) : (
                <SortDownIcon />
              )}
            </span>
            <span className="resize-handle cursor-resize"></span>
          </>
        )}
      </div>
    </th>
  );
};

export default ColumnHeader;
