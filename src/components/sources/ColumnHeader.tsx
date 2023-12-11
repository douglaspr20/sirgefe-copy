import Tooltip from '@components/Tooltip';
import { ValidTypeSort } from '@interfaces/sort';
import { FieldSourcesSortType } from '@interfaces/source';
import { AdjustableColumn } from '@utils/adjustableColumns';
import Image from 'next/image';
import toolTipIcon from '@images/tooltip.svg';

type Props = {
  column: AdjustableColumn;
  index: number;
  handleMouseDown: (
    event: any,
    index: number,
    columnWidths: number[],
    handleResize: (index: number, newWidth: number) => void,
  ) => void;
  typesSorts: Record<FieldSourcesSortType, string | ValidTypeSort>;
  colunmWidths: number[];
  loadingInfo: boolean;
  handleSort: (key: FieldSourcesSortType, value: ValidTypeSort) => void;
  handleResize: (columnIndex: number, newWidth: number) => void;
};

const SourcesColumnHeader: React.FunctionComponent<Props> = ({
  index,
  colunmWidths,
  column,
  handleMouseDown,
  handleResize,
  typesSorts,
  handleSort,
  loadingInfo,
}) => {
  return (
    <th
      key={index}
      className={`px-2 py-4 z-[150] text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left  select-none`}
      onMouseDown={(e) => handleMouseDown(e, index, colunmWidths, handleResize)}
    >
      <div
        className="flex items-center"
        style={{
          width:
            colunmWidths[index] > column.width
              ? colunmWidths[index]
              : column.width,
          zIndex: 'unset',
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
              />
            </span>

            <Tooltip title={column.tooltip} anchorId={column.tooltip} />
          </>
        )}

        {column.typeSort && (
          <button
            className={`sort-button duration-300 ${
              typesSorts[column.typeSort as FieldSourcesSortType] === 'desc'
                ? 'rotate-180'
                : ''
            }`}
            onClick={() =>
              handleSort(
                column.typeSort as FieldSourcesSortType,
                typesSorts[column.typeSort as FieldSourcesSortType] !== 'desc'
                  ? 'desc'
                  : 'asc',
              )
            }
            disabled={loadingInfo}
          >
            <i className="icon-arrow-sort"></i>
          </button>
        )}
      </div>
    </th>
  );
};

export default SourcesColumnHeader;
