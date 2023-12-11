import { AdjustableColumn } from '@utils/adjustableColumns';
import Image from 'next/image';
import { RefObject, useState } from 'react';
import toolTipIcon from '@images/tooltip.svg';
import { ValidTypeSort } from '@interfaces/sort';
import { FieldVisitorsSortType } from '@interfaces/visitor';
import Tooltip from '@components/Tooltip';

type Props = {
  column: AdjustableColumn;
  index: number;
  handleMouseDown: (
    event: any,
    index: number,
    columnWidths: number[],
    handleResize: (index: number, newWidth: number) => void,
  ) => void;
  typesSorts?: Record<FieldVisitorsSortType, string | ValidTypeSort>;
  colunmWidths: number[];
  activeSort?: RefObject<FieldVisitorsSortType | null>;
  loadingInfo: boolean;
  handleSort?: (key: FieldVisitorsSortType, value: ValidTypeSort) => void;
  handleResize: (columnIndex: number, newWidth: number) => void;
};

const ColumnHeader: React.FunctionComponent<Props> = ({
  colunmWidths,
  index,
  column,
  handleMouseDown,
  activeSort,
  typesSorts,
  loadingInfo,
  handleResize,
  handleSort,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);

  return (
    <>
      <th
        key={index}
        className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left select-none"
        onMouseDown={(e) =>
          handleMouseDown(e, index, colunmWidths, handleResize)
        }
      >
        <div
          className="flex items-center"
          style={{
            width:
              colunmWidths[index] > column.width
                ? colunmWidths[index]
                : column.width,
          }}
        >
          <span> {column.name}</span>

          {column.tooltip && (
            <>
              <span className="ml-2 cursor-pointer" id={column.tooltip}>
                <Image
                  src={toolTipIcon}
                  alt="tooltip-info"
                  width={13}
                  height={13}
                  onMouseEnter={() => setDisplayPopover(true)}
                  onMouseLeave={() => setDisplayPopover(false)}
                  ref={setReferenceElement}
                />
              </span>

              <Tooltip title={column.tooltip} anchorId={column.tooltip} />
            </>
          )}

          <button
            className={`duration-300 ${
              typesSorts
                ? `${
                    typesSorts[column.typeSort as FieldVisitorsSortType] ===
                    'desc'
                      ? 'rotate-180'
                      : ''
                  } `
                : ''
            }
           ${
             activeSort
               ? ` ${
                   activeSort.current === column.typeSort ? '' : 'sort-button'
                 }`
               : ''
           }`}
            onClick={() => {
              if (handleSort && typesSorts) {
                handleSort(
                  column.typeSort as FieldVisitorsSortType,
                  typesSorts[column.typeSort as FieldVisitorsSortType] !==
                    'desc'
                    ? 'desc'
                    : 'asc',
                );
              }
            }}
            disabled={loadingInfo}
          >
            {typesSorts && <i className="icon-arrow-sort"></i>}
          </button>
        </div>
      </th>
    </>
  );
};

export default ColumnHeader;
