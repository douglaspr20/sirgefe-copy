'use client';
import EmptyTableImg from '@assets/img/empty-fable-img.svg';
import Calendar from '@components/Calendar';
import SirgeSpinner from '@components/loader/SirgeSpinner';
import TailwindModal from '@components/modals/TailwindModal';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import Pagination from '@components/pagination';
import ColumnHeader from '@components/visitors/ColumnHeader';
import FilterColumn from '@components/visitors/FilterColumn';
import { getAllVisitors } from '@graphql/queries';
import useAsyncDataFetch from '@hooks/useAsyncDataFetch';
import { ValidTypeSort } from '@interfaces/sort';
import { FieldVisitorsSortType, TotalInfo } from '@interfaces/visitor';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import * as Sentry from '@sentry/nextjs';
import { visitorColumns } from '@utils/adjustableColumns';
import { capitalize, formatDate } from '@utils/format';
import { handleMouseDown } from '@utils/handeResizeColumns';
import { filterColumnSchemaValidation } from '@utils/schemaValidations';
import { API, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { z } from 'zod';
dayjs.extend(timezone);

type FilterSchema = z.infer<typeof filterColumnSchemaValidation>;

type Filter = {
  filterId: number;
  field: string;
  operator: string;
  columnValue?: string | undefined;
  logicalOperator?: string | undefined;
};

const MyCustomersTab: FC = () => {
  const { selectedBusiness, userProfile } = useBusinessProfileContext();
  const { fetchComplete, setLoading } = useAsyncDataFetch();

  const numberPagesRef = useRef<number>(1);
  const activeSort = useRef<FieldVisitorsSortType | null>('last_visit');

  const [visitorsState, setVisitorsState] = useState([]);
  const [totalInfoState, setTotalInfoState] = useState<TotalInfo | null>(null);

  const [filters, setFilters] = useState<FilterSchema>({ filters: [] });
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [daterange, setDaterange] = useState<DateValueType>({
    startDate: dayjs()
      .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
      .subtract(7, 'days')
      .format('YYYY-MM-DD'),
    endDate: dayjs()
      .tz(selectedBusiness?.timezone || 'America/Los_Angeles')
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  });
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'error',
    message: '',
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const [typesSorts, setTypeSorts] = useState<
    Record<FieldVisitorsSortType, string | ValidTypeSort>
  >({
    total_pageviews: '',
    last_visit: 'desc',
    first_visit: '',
    total_purchases: '',
    visitor_name: '',
  });

  const [tooltipIndex, setTooltipIndex] = useState<number | string | null>(
    null,
  );

  const handleCalendarValueChange = async (newValue: DateValueType) => {
    if (!activeSort?.current) {
      activeSort.current = 'last_visit';
    }
    setDaterange(newValue);
  };

  useEffect(() => {
    setColumnWidths(() => visitorColumns.map((column) => column.width));
  }, []);

  const getVisitors = useCallback(
    async (filters: {
      date_from?: string;
      date_to?: string;
      sort?: any;
      numberOfPage?: number;
      filters?: Filter[];
    }) => {
      const responseGetVisitors: any = await API.graphql(
        graphqlOperation(getAllVisitors, {
          getAllVisitorsInput: {
            business_id: selectedBusiness?.business_id,
            ...(filters.date_from && {
              date_from: filters.date_from,
            }),
            ...(filters.date_to && { date_to: filters.date_to }),
            ...(filters.sort && {
              sort: filters.sort,
            }),
            ...(filters.numberOfPage && { numberOfPage: filters.numberOfPage }),
            ...(filters.filters && { filters: filters.filters }),
          },
        }),
      );

      return responseGetVisitors;
    },
    [selectedBusiness?.business_id],
  );

  const handleSort = async (
    key: FieldVisitorsSortType,
    value: ValidTypeSort,
  ) => {
    try {
      activeSort.current = key;

      // setTypeSorts({
      //   ...typesSorts,
      //   [key]: value,
      // });

      // Create a new object with all keys set to empty strings
      const updatedTypeSorts: Record<
        FieldVisitorsSortType,
        string | ValidTypeSort
      > = {
        total_pageviews: '',
        last_visit: '',
        first_visit: '',
        total_purchases: '',
        visitor_name: '',
      };

      // Set the key's value in the new object
      updatedTypeSorts[key] = value;

      // Update the state with the new object
      setTypeSorts(updatedTypeSorts);
    } catch (error: any) {
      Sentry.captureException(error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setLoadingInfo(false);
    }
  };

  // const resetFilters = () => {
  //   setDaterange({
  //     startDate: null,
  //     endDate: null,
  //   });

  //   setFilters({ filters: [] });
  // };

  useEffect(() => {
    setLoadingInfo(true);
    const getNewVisitors = async (
      date_from?: string | null,
      date_to?: string | null,
    ) => {
      try {
        const fieldSort = activeSort?.current as FieldVisitorsSortType;

        const newFilters = filters;
        newFilters.filters.forEach((item: any) => {
          delete item.filterId;
          if (parseInt(item.value)) {
            item.value = parseInt(item.value);
          }
        });

        const response: any = await getVisitors({
          ...(date_from && { date_from }),
          ...(date_to && { date_to }),
          ...(fieldSort && {
            sort: {
              field: fieldSort,
              sort: typesSorts[fieldSort]
                ? (typesSorts[fieldSort] as ValidTypeSort)
                : 'desc',
            },
          }),
          numberOfPage: currentPage + 1,
          ...(newFilters?.filters &&
            newFilters?.filters.length > 0 && { filters: newFilters.filters }),
        });

        if (response.data.getAllVisitors?.error) {
          throw new Error(response.data.getAllVisitorsMongoNew.error?.message);
        }

        setVisitorsState(response.data.getAllVisitors.data.visitors);
        setTotalInfoState(response.data.getAllVisitors.data.totalInfo);

        numberPagesRef.current = response.data.getAllVisitors.numberPages;
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
      daterange?.startDate && dayjs(daterange?.startDate).format('YYYY-MM-DD');
    const date_to =
      daterange?.endDate && dayjs(daterange?.endDate).format('YYYY-MM-DD');

    getNewVisitors(date_from, date_to);
  }, [
    currentPage,
    typesSorts,
    filters,
    daterange,
    getVisitors,
    fetchComplete,
    setLoading,
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
        <div className="inline-flex items-center relative">
          <div className="pr-4 mr-4 relative first:pl-0 last:pr-0 after:content-[''] after:block after:absolute after:h-6 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
            <button
              className="inline-flex items-center font-medium text-darkGrade50 [&.show]:text-darkGrade100"
              data-bs-toggle="collapse"
              data-bs-target="#dropdownFilterTable"
              aria-expanded="false"
              aria-controls="dropdownFilterTable"
            >
              <div
                className={`${
                  filters.filters.length > 0 ? 'flex ' : 'hidden '
                }bg-[#32C4D4] shadow-md  absolute left-[-8px] top-[-8px] rounded-full items-center justify-center	w-[20px] h-[20px] p-2 text-white text-[10px]`}
              >
                {filters.filters.length}
              </div>
              <i className="icon-filter text-2xl mr-2"></i>Filter
            </button>
          </div>
          <div>
            <div className="relative">
              <Calendar
                value={daterange}
                onChange={handleCalendarValueChange}
                timezone={selectedBusiness?.timezone || 'America/Chicago'}
              />
            </div>
          </div>
          <FilterColumn
            columns={[
              { label: 'Visitor Name', value: 'visitor_name' },
              { label: 'Page Views', value: 'total_pageviews' },
              { label: 'Orders', value: 'total_purchases' },
            ]}
            setFilters={setFilters}
          />
        </div>
      </div>
      <div className="max-h-full relative">
        <div
          id="table-scroll"
          className="table-scroll border border-extraLightColor rounded-lg overflow-x-auto relative"
          style={{ minHeight: loadingInfo ? 500 : 'auto' }}
        >
          <table id="main-table" className="main-table w-full">
            <thead>
              <tr>
                {visitorColumns.map((column, i) => (
                  <>
                    <ColumnHeader
                      activeSort={activeSort}
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
            {!loadingInfo && visitorsState.length > 0 && (
              <>
                <tbody>
                  {visitorsState?.map((visitor: any, index: number) => (
                    <tr key={index}>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        <div
                          onMouseEnter={() => {
                            setShowTooltip(true);
                            setTooltipIndex(index);
                          }}
                          onMouseLeave={() => setShowTooltip(false)}
                          style={{
                            position: 'relative',
                          }}
                        >
                          <Link
                            key={index}
                            href={`/${selectedBusiness?.vanity_name}/customer-journey/${visitor?.visitor_id}/profile`}
                          >
                            <span className="inline-flex items-center">
                              {visitor.visitor_name &&
                              visitor.visitor_name !== '-'
                                ? capitalize(visitor.visitor_name)
                                : 'Anonymous User'}
                              <a
                                className="text-xl ml-1 text-darkGrade50 hover:text-darkGrade75 inline-flex items-center"
                                target="_blank"
                              >
                                <i className="icon-open"></i>
                              </a>
                            </span>
                          </Link>

                          {showTooltip && tooltipIndex === index ? (
                            <div
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                padding: '0.5rem',
                                backgroundColor: '#333',
                                color: '#fff',
                                borderRadius: '0.25rem',
                                zIndex: 100,
                              }}
                            >
                              {visitor.visitor_id}
                            </div>
                          ) : null}
                        </div>
                      </td>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        {visitor.total_pageviews}
                      </td>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        {visitor.total_purchases}
                      </td>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        {visitor.first_visit === '{}' || !visitor?.first_visit
                          ? '-'
                          : formatDate(visitor.first_visit)}
                      </td>
                      <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                        {visitor.last_visit === '{}' || !visitor?.last_visit
                          ? '-'
                          : formatDate(visitor.last_visit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-darkGrade75">
                  <tr>
                    <th
                      colSpan={1}
                      className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-t border-r border-extraLightColor last:border-r-transparent"
                    >
                      Summary For {totalInfoState?.totalrecords || 0} Customers
                    </th>
                    <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-t border-r border-extraLightColor last:border-r-transparent">
                      {totalInfoState?.total_pageviews || 0}
                    </th>
                    <th
                      colSpan={3}
                      className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-t border-r border-extraLightColor last:border-r-transparent"
                    >
                      {totalInfoState?.total_purchases || 0}
                    </th>
                  </tr>
                </tfoot>
              </>
            )}
          </table>
          {!loadingInfo &&
            visitorsState.length === 0 &&
            filters.filters.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center w-full">
                <div className="mb-2">
                  <Image
                    src="/images/no-account.svg"
                    alt="No data"
                    width={150}
                    height={150}
                  />
                </div>
                <h5 className="h5 text-textSecondaryColor mb-3">
                  Not enough data
                </h5>
              </div>
            )}

          {!loadingInfo &&
            visitorsState.length === 0 &&
            filters.filters.length > 0 && (
              <div className="flex flex-col justify-center items-center py-20 px-5">
                <div className="mb-2">
                  <Image width={100} height={100} src={EmptyTableImg} alt="" />
                </div>
                <h5 className="h5 mb-3 text-textSecondaryColor">
                  We can’t find results with the selected filters
                </h5>
                <p className="text-textTeriraryColor text-center mb-3">
                  Reset filters or change to try again
                </p>
                <button
                  className="btn"
                  onClick={() => setFilters({ filters: [] })}
                >
                  Reset filters
                </button>
              </div>
            )}

          {loadingInfo ? (
            <div className="min-h-[400px] w-full grid place-items-center">
              <SirgeSpinner />
            </div>
          ) : null}
        </div>
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
    </>
  );
};

export default MyCustomersTab;
