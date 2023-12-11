'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import ColumnHeader from './ColumnHeader';
import { linksColumns } from '@utils/adjustableColumns';
import { handleMouseDown } from '@utils/handeResizeColumns';
import Image from 'next/image';
import CheckIcon from '@assets/img/check-mark.svg';
import Pagination from '@components/pagination';
import ThreeDotsIcon from '@assets/icons/ThreeDotsIcon';
import ActionsPopover from './ActionsPopover';
import { formatDateTimezone, formatMoneyWithDecimals } from '@utils/format';
import { NumericFormat } from 'react-number-format';
import { FieldTrackabelCopySortType } from '@interfaces/trackableCopy';
import { ValidTypeSort } from '@interfaces/sort';
import { useBoundStore } from '@store/index';

interface Props {
  isLoading: boolean;
  activeSort: any;
  handleResize: (columnIndex: number, newWidth: number) => void;
  columnWidths: number[];
  trackableCopies: any;
  setDeleteCopyOptions: (value: any) => void;
  setDeleteModalActive: (value: boolean) => void;
  setEditLinkOptions: (value: any) => void;
  setLinkModalActive: (value: boolean) => void;
  setCurrentPage: (data: any) => void;
  currentPage: number;
  numberPages: number;
  typesSorts: Record<FieldTrackabelCopySortType, string | ValidTypeSort>;
  handleSort: (key: FieldTrackabelCopySortType, value: ValidTypeSort) => void;
  setShowOrdersModal: (value: boolean) => void;
  setSelectedSource: (value: string) => void;
  setSelectedOrdersCount: (value: number | null) => void;
  setSelectedOrdersName: (value: string) => void;
}

const LinksTable: FC<Props> = ({
  isLoading,
  activeSort,
  handleResize,
  columnWidths,
  trackableCopies,
  setDeleteCopyOptions,
  setDeleteModalActive,
  setEditLinkOptions,
  setLinkModalActive,
  currentPage,
  setCurrentPage,
  numberPages,
  typesSorts,
  handleSort,
  setShowOrdersModal,
  setSelectedSource,
  setSelectedOrdersCount,
  setSelectedOrdersName,
}) => {
  const { selectedBusiness } = useBoundStore();
  const [copyclipBoard, setCopyclipBoard] = useState<number | null>(null);
  const [activeActions, setActiveActions] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dotsRefs = trackableCopies.map(() => React.createRef());
  const tableRef = useRef<HTMLTableElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      if (
        dotsRefs?.current &&
        dotsRefs?.current.contains(event.target as Node)
      ) {
        return;
      }
      setActiveActions(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleCopy = async (
    index: number,
    text: string,
    short_code: string,
    position: string,
  ) => {
    try {
      if (!navigator.clipboard) {
        console.log("Browser don't have support for native clipboard.");
      }
      let copyHtml = '';
      let copyText = '';
      const regex = /(<([^>]+)>)/gi;
      const updatedText = text.replace(regex, '');
      if (position === 'top') {
        copyHtml = `https://${process.env.NEXT_PUBLIC_SHORT_URL}/${short_code}\n${text}`;
        copyText = `https://${
          process.env.NEXT_PUBLIC_SHORT_URL
        }/${short_code} ${' '} ${text.replace(regex, '')}`;
      } else {
        copyHtml = `${text}\nhttps://${process.env.NEXT_PUBLIC_SHORT_URL}/${short_code}`;
        copyText = `${updatedText} ${' '} https://${
          process.env.NEXT_PUBLIC_SHORT_URL
        }/${short_code}`;
      }
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([copyHtml], { type: 'text/html' }),
          'text/plain': new Blob([copyText], { type: 'text/plain' }),
        }),
      ]);
      setCopyclipBoard(index);

      setTimeout(() => {
        setCopyclipBoard(null);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        id="table-scroll"
        className="table-scroll border border-extraLightColor rounded-lg overflow-x-auto relative"
        style={{ height: 480 }}
        ref={tableRef}
      >
        <table id="main-table" className="main-table w-full">
          <thead>
            <tr>
              {linksColumns.map((column, i) => (
                <ColumnHeader
                  key={i}
                  column={column}
                  colunmWidths={columnWidths}
                  handleMouseDown={handleMouseDown}
                  handleResize={handleResize}
                  index={i}
                  loadingInfo={isLoading}
                  handleSort={handleSort}
                  typesSorts={typesSorts}
                />
              ))}
            </tr>
          </thead>
          {!isLoading && trackableCopies?.length > 0 && (
            <>
              <tbody>
                {trackableCopies?.map((trackableCopy: any, index: number) => (
                  <tr
                    key={trackableCopy?.id}
                    className="border border-extraLightColor"
                  >
                    <td
                      className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0"
                      style={{
                        zIndex: 101,
                      }}
                    >
                      <div className="inline-flex items-center gap-2">
                        <div className="relative">
                          <button
                            onClick={() => {
                              if (activeActions === index) {
                                setActiveActions(null);
                              } else {
                                setActiveActions(index);
                              }
                            }}
                            ref={dotsRefs[index]}
                            className="popoverButton"
                          >
                            <span>
                              <ThreeDotsIcon />
                            </span>
                          </button>
                          {activeActions === index && (
                            <ActionsPopover
                              tableRef={tableRef}
                              triggerRef={dotsRefs[index]}
                              ref={popoverRef}
                              trackableCopy={trackableCopy}
                              setDeleteModalActive={setDeleteModalActive}
                              setDeleteCopyOptions={setDeleteCopyOptions}
                              setActiveActions={setActiveActions}
                              setEditLinkOptions={setEditLinkOptions}
                              setLinkModalActive={setLinkModalActive}
                            />
                          )}
                        </div>
                        <span>{trackableCopy.name}</span>
                        <button
                          className="flex items-center font-medium text-gray-200 hover:text-primaryColorHover cursor-pointer disabled:opacity-50 relative"
                          onClick={() =>
                            handleCopy(
                              index,
                              trackableCopy?.description || '',
                              trackableCopy?.short_code || '',
                              trackableCopy?.url_position || 'top',
                            )
                          }
                        >
                          <i className="icon-copy-line text-textTeriraryColor ml-1 text-xl cursor-pointer"></i>
                          <div
                            className={`${
                              copyclipBoard !== index && 'hidden'
                            } inline-flex items-center bg-white border rounded-md border-extraLightColor px-4 py-2 shadow-lg whitespace-nowrap absolute min-w-[225px] -top-1.5 z-40 left-[10rem] -translate-x-[50%] `}
                          >
                            <span className="inline-flex items-center justify-center mr-1.5 flex-shrink-0">
                              <Image src={CheckIcon} alt="check-icon" />
                            </span>
                            <span className="text-textSecondaryColor font-semibold">
                              Copied to clipboard
                            </span>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                      {formatDateTimezone(
                        trackableCopy.created,
                        selectedBusiness?.store?.timezone || 'america/chicago',
                      )}
                    </td>
                    <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                      {(
                        <NumericFormat
                          value={trackableCopy?.stats?.clicks}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      ) || 0}
                    </td>
                    <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                      <div className="inline-flex items-center">
                        {(
                          <NumericFormat
                            value={trackableCopy?.stats?.purchases}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        ) || 0}
                        {trackableCopy?.stats?.purchases ? (
                          <>
                            <button
                              onClick={() => {
                                setShowOrdersModal(true);
                                setSelectedSource(trackableCopy?.short_code);
                                setSelectedOrdersCount(
                                  trackableCopy?.stats?.purchases,
                                );
                                setSelectedOrdersName(trackableCopy?.name);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#ordersModal"
                              className="inline-flex items-center ml-1.5 text-xl text-darkGrade50 hover:text-darkGrade75"
                            >
                              <i className="icon-eye"></i>
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                    <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                      {formatMoneyWithDecimals(
                        trackableCopy?.stats?.revenue ?? 0,
                        selectedBusiness?.store?.currency as string,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        {!isLoading && trackableCopies.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center w-full">
            <div className="mb-2">
              <Image
                src="/images/no-account.svg"
                alt="No data"
                width={150}
                height={150}
              />
            </div>
            <h5 className="h5 font-semibold text-textSecondaryColor mb-1">
              There is no data
            </h5>
            <span className="font-light text-textSecondaryColor">
              Here will be your links
            </span>
          </div>
        )}

        {isLoading && (
          <div className=" flex items-center justify-center bg-white absolute left-px right-px top-[0px] bottom-[0px] z-50">
            <div className="inline-flex items-center justify-center flex-col">
              <div className="spinner"></div>
              <div className="font-semibold text-primaryColor mt-3">
                Updating Results
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center pt-4">
        <Pagination
          currentPage={currentPage}
          onChangeCurrentPage={setCurrentPage}
          numberPages={numberPages}
        />
      </div>
    </>
  );
};

export default LinksTable;
