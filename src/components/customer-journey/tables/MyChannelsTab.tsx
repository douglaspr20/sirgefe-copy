'use client';
import Calendar from '@components/Calendar';
import SirgeSpinner from '@components/loader/SirgeSpinner';
import TailwindModal from '@components/modals/TailwindModal';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import SourceTableDetailsModal from '@components/modals/tailwindTypes/SourceTableDetailsModal';
import Pagination from '@components/pagination';
import SourcesColumnHeader from '@components/sources/ColumnHeader';
import OrdersModal from '@components/sources/OrdersModal';
import { getBusinessSourcesById } from '@graphql/queries';
import useAsyncDataFetch from '@hooks/useAsyncDataFetch';
import { ValidTypeSort } from '@interfaces/sort';
import {
  FieldSourcesSortType,
  SourcesSortObjectType,
} from '@interfaces/source';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import * as Sentry from '@sentry/nextjs';
import { sourceColumns } from '@utils/adjustableColumns';
import { handleMouseDown } from '@utils/handeResizeColumns';
import { generateSourceName } from '@utils/source';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import Image from 'next/image';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { SourcesBusiness, TotalInfo } from '../../../API';

dayjs.extend(timezone);

const MyChannelsTab: FC = () => {
  const { selectedBusiness, userProfile } = useBusinessProfileContext();
  const { fetchComplete, setLoading } = useAsyncDataFetch();
  const numberPagesRef = useRef<number>(1);
  const activeSort = useRef<FieldSourcesSortType | null>('unique_visitor');
  const [sourcesState, setSourcesState] = useState<SourcesBusiness[]>([]);

  const [activePage, setActivePage] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: dayjs()
      .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
      .subtract(7, 'days')
      .format('YYYY-MM-DD'),
    endDate: dayjs()
      .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  });

  const [totalInfoState, setTotalInfoState] = useState<TotalInfo | null>(null);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'error',
    message: '',
  });

  const [typesSorts, setTypeSorts] = useState<
    Record<FieldSourcesSortType | string, string | ValidTypeSort>
  >({
    source: '',
    unique_visitor: 'desc',
    purchases_count: '',
    created: '',
    _id: '',
  });
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const [showDetailsSourceModal, setShowDetailsSourceModal] =
    useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<SourcesBusiness | null>(
    null,
  );

  const [showOrdersModal, setShowOrdersModal] = useState<boolean>(false);
  const [sourceName, setSourceName] = useState<string>('');
  const [selectedOrdersCount, setSelectedOrdersCount] = useState<number | null>(
    0,
  );

  const [currentChannelDetailsPage, setCurrentChannelDetailsPage] =
    useState<number>(0);

  useEffect(() => {
    setColumnWidths(() => sourceColumns.map((column) => column.width));
  }, []);

  const handleCalendarValueChange = async (newValue: DateValueType) => {
    setDateRange(newValue);
  };

  const handleSelectSource = (source: SourcesBusiness) => {
    const newSource = source;
    if (source.source === 'direct') {
      newSource.source = (selectedBusiness?.shopify_store_domain as string)
        .replace('www.', '')
        .split('.')[0];
    }
    return newSource;
  };

  const getSources = useCallback(
    async (filters: {
      date_from?: string;
      date_to?: string;
      sort?: SourcesSortObjectType;
      numberOfPage?: number;
    }) => {
      const responseGetSources: any = await API.graphql(
        graphqlOperation(getBusinessSourcesById, {
          getBusinessSourcesByIdInput: {
            business_id: selectedBusiness?.business_id,
            ...(filters.date_from && { date_from: filters.date_from }),
            ...(filters.date_to && { date_to: filters.date_to }),
            ...(filters.sort?.field && { sort: filters.sort }),
            ...(filters.numberOfPage && { numberOfPage: filters.numberOfPage }),
          },
        }),
      );

      return responseGetSources;
    },
    [selectedBusiness?.business_id],
  );

  const handleSort = async (
    key: FieldSourcesSortType,
    value: ValidTypeSort,
  ) => {
    try {
      activeSort.current = key;

      const updatedTypeSorts: Record<
        FieldSourcesSortType,
        string | ValidTypeSort
      > = {
        source: '',
        purchases_count: '',
        created: '',
        referer: '',
        clicks_count: '',
        unique_visitor: '',
      };

      // Set the key's value in the new object
      updatedTypeSorts[key] = value;

      setTypeSorts(updatedTypeSorts);
    } catch (error: any) {
      Sentry.captureException(error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    const getNewSources = async (
      date_from?: string | null,
      date_to?: string | null,
    ) => {
      setLoadingInfo(true);
      try {
        const fieldSort = activeSort?.current as FieldSourcesSortType;

        const response: any = await getSources({
          ...(date_from && { date_from }),
          ...(date_to && { date_to }),
          ...(fieldSort && {
            sort: {
              field: fieldSort,
              sort: typesSorts[fieldSort] as ValidTypeSort,
            },
          }),
          numberOfPage: currentPage + 1,
        });

        if (response.data?.getBusinessSourcesById?.error) {
          throw new Error(
            response.data?.getBusinessSourcesDetailsById.error?.message,
          );
        }
        setSourcesState(response.data?.getBusinessSourcesById?.data.sources);
        setTotalInfoState(
          response.data?.getBusinessSourcesById?.data.totalInfo,
        );
        numberPagesRef.current =
          response.data.getBusinessSourcesById.numberPages;
      } catch (error: any) {
        Sentry.captureException(error);
        setDialogOptions({
          type: 'error',
          message: error.message || 'Something went wrong',
        });
      } finally {
        setLoading(false);
        setLoadingInfo(false);
      }
    };

    const date_from =
      dateRange?.startDate && dayjs(dateRange?.startDate).format('YYYY-MM-DD');
    const date_to =
      dateRange?.endDate && dayjs(dateRange?.endDate).format('YYYY-MM-DD');

    getNewSources(date_from, date_to);
  }, [
    currentPage,
    typesSorts,
    dateRange,
    getSources,
    fetchComplete,
    setLoading,
    selectedBusiness?.shopify_store_domain,
  ]);

  const handleResize = (columnIndex: number, newWidth: number) => {
    const newColumnWidths = [...columnWidths];

    newColumnWidths[columnIndex] = newWidth;

    setColumnWidths(newColumnWidths);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h5 className="h5"></h5>
        <div className="relative calendar w-15\/6 w-15_6 w-17_2">
          <Calendar
            value={dateRange}
            onChange={handleCalendarValueChange}
            timezone={selectedBusiness?.timezone || 'America/Chicago'}
          />
        </div>
      </div>
      <div
        id="table-scroll"
        className="table-scroll border border-extraLightColor rounded-lg max-h-full"
        style={{ minHeight: loadingInfo ? 500 : 'auto' }}
      >
        <table id="main-table" className="main-table w-full">
          <thead>
            <tr>
              {sourceColumns.map((column, i) => (
                <>
                  <SourcesColumnHeader
                    key={`${column.name} ${i}`}
                    column={column}
                    colunmWidths={columnWidths}
                    handleMouseDown={handleMouseDown}
                    handleResize={handleResize}
                    handleSort={handleSort}
                    index={i}
                    loadingInfo={loadingInfo}
                    typesSorts={typesSorts}
                  />
                </>
              ))}
            </tr>
          </thead>

          {!loadingInfo && sourcesState.length > 0 && (
            <>
              <tbody>
                {sourcesState.map((source, i) => {
                  const sourceName = generateSourceName(
                    source.source,
                    selectedBusiness?.shopify_store_domain,
                  );
                  return (
                    <tr key={`${source.source} ${i}`}>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        <div className="flex">
                          {sourceName}
                          <button
                            onClick={() => {
                              setSelectedSource(handleSelectSource(source));
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#detailsModal"
                            className="inline-flex items-center ml-1.5 text-xl text-darkGrade50 hover:text-darkGrade75"
                          >
                            <i className="icon-eye" />
                          </button>
                        </div>
                      </td>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        {source.unique_visitor}
                      </td>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        <div className="flex items-center">
                          {source.purchases_count}

                          {(source?.purchases_count as number) > 0 && (
                            <button
                              onClick={() => {
                                setSourceName(
                                  (handleSelectSource(source)
                                    .source as string) || '',
                                );
                                setShowOrdersModal(true);
                                setSelectedOrdersCount(
                                  (source?.purchases_count as number) || 0,
                                );
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#sourcesOrdersModal"
                              className="inline-flex items-center ml-1.5 text-xl text-darkGrade50 hover:text-darkGrade75"
                            >
                              <i className="icon-eye" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className="text-darkGrade75">
                <tr>
                  <th
                    colSpan={1}
                    className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-t border-r border-extraLightColor last:border-r-transparent"
                  >
                    Summary For {totalInfoState?.totalrecords || 0} Sources
                  </th>
                  <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-t border-r border-extraLightColor last:border-r-transparent">
                    {totalInfoState?.total_visitors || 0}
                  </th>
                  <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-t border-r border-extraLightColor last:border-r-transparent">
                    {totalInfoState?.total_purchases || 0}
                  </th>
                </tr>
              </tfoot>
            </>
          )}
        </table>

        {!loadingInfo && sourcesState.length === 0 && (
          <div className="min-h-[400px] w-full flex flex-col justify-center items-center">
            <div className="mb-2">
              <Image
                src="/images/no-account.svg"
                alt="No data"
                width={150}
                height={150}
              />
            </div>
            <h5 className="h5 text-textSecondaryColor mb-3">Not enough data</h5>
          </div>
        )}

        {loadingInfo ? (
          <div className="min-h-[400px] w-full grid place-items-center">
            <SirgeSpinner />
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-center pt-4">
        <Pagination
          currentPage={currentPage}
          onChangeCurrentPage={setCurrentPage}
          numberPages={numberPagesRef.current}
        />
      </div>

      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <TailwindModal
        id="detailsModal"
        showDialog={showDetailsSourceModal}
        setShowDialog={setShowDetailsSourceModal}
        styleDialog={{ minWidth: '1000px' }}
        handleCloseUpdate={() => {
          setCurrentChannelDetailsPage(0);
          setSelectedSource(null);
        }}
      >
        <SourceTableDetailsModal
          shopify_store_domain={selectedBusiness?.shopify_store_domain || ''}
          business_id={selectedBusiness?.business_id as string}
          date_from={dateRange?.startDate?.toString() || ''}
          date_to={dateRange?.endDate?.toString() || ''}
          source={selectedSource}
          setCurrentPage={setCurrentChannelDetailsPage}
          currentPage={currentChannelDetailsPage}
        />
      </TailwindModal>

      <TailwindModal
        id="sourcesOrdersModal"
        showDialog={showOrdersModal}
        setShowDialog={setShowOrdersModal}
        handleCloseUpdate={() => {
          setSourceName('');
          setSelectedOrdersCount(0);
          setActivePage(0);
        }}
        styleDialog={{ minWidth: '808px' }}
      >
        <OrdersModal
          setOpenModal={setShowOrdersModal}
          selectedSource={sourceName}
          selectedDateValue={dateRange}
          selectedOrdersCount={selectedOrdersCount}
          setActivePage={setActivePage}
          activePage={activePage}
        />
      </TailwindModal>
    </>
  );
};

export default MyChannelsTab;
