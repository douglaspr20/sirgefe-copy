import { AdjustableColumn } from '@utils/adjustableColumns';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';
import { ValidTypeSort } from '@interfaces/sort';
import { FieldVisitorsSortType } from '@interfaces/visitor';
import Tooltip from '@components/Tooltip';
import { FieldTrackabelCopySortType } from '@interfaces/trackableCopy';

type Props = {
  column: AdjustableColumn;
  index: number;
  handleMouseDown: (
    event: any,
    index: number,
    columnWidths: number[],
    handleResize: (index: number, newWidth: number) => void,
  ) => void;
  colunmWidths: number[];
  loadingInfo: boolean;
  handleResize: (columnIndex: number, newWidth: number) => void;
  typesSorts: Record<FieldTrackabelCopySortType, string | ValidTypeSort>;
  handleSort: (key: FieldTrackabelCopySortType, value: ValidTypeSort) => void;
};

const ColumnHeader: React.FunctionComponent<Props> = ({
  colunmWidths,
  index,
  column,
  handleMouseDown,
  handleResize,
  typesSorts,
  handleSort,
}) => {
  return (
    <th
      key={index}
      style={{
        width:
          colunmWidths[index] > column.width
            ? colunmWidths[index]
            : column.width,
      }}
      className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left select-none"
      onMouseDown={(e) => handleMouseDown(e, index, colunmWidths, handleResize)}
    >
      <div className="flex items-center">
        <span>{column.name}</span>

        {column.tooltip && (
          <>
            <span className="ml-2 cursor-pointer" id={column.tooltip}>
              <Image
                src={toolTipIcon}
                alt="tooltip-info"
                width={13}
                height={13}
              />
            </span>

            <Tooltip title={column.tooltip} anchorId={column.tooltip} />
          </>
        )}

        {column.typeSort && (
          <button
            className={`sort-button duration-300 ${
              typesSorts[column.typeSort as FieldTrackabelCopySortType] ===
              'desc'
                ? 'rotate-180'
                : ''
            }`}
            onClick={() =>
              handleSort(
                column.typeSort as FieldTrackabelCopySortType,
                typesSorts[column.typeSort as FieldTrackabelCopySortType] !==
                  'desc'
                  ? 'desc'
                  : 'asc',
              )
            }
          >
            <i className="icon-arrow-sort"></i>
          </button>
        )}
      </div>
    </th>
  );
};

export default ColumnHeader;
