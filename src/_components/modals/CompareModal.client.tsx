'use client';
import React, { FC, useState, useEffect } from 'react';
import Spinner from '@components/Spinner';
import Image from 'next/image';
import { API, graphqlOperation } from 'aws-amplify';
import { getAdcomparisonData } from '@graphql/queries';
import Pagination from '@components/pagination';
import TableLoading from '@components/loader/TableLoading';
import { useDebounce } from '@hooks/useDebounce';
import { formatMoneyWithDecimals } from '@utils/format';
type Compare = {
  setCompare: any;
  isSending: boolean;
  itemsCompare: object[];
  tabCompare: string;
  businessId: string;
  source: string;
  dateStart: string;
  dateEnd: string;
  showDialog?: boolean;
};
type Item = {
  ad_images: string[];
  id: string;
  ad_name: string;
  roas: number;
  ad_primary_status: string;
  total_amount_spent: number;
  source: string;
};

interface Sort {
  field: string;
  direction: 'asc' | 'desc';
}
const CompareModal: FC<Compare> = ({
  setCompare,
  isSending,
  source,
  itemsCompare,
  tabCompare,
  businessId,
  dateStart,
  dateEnd,
  showDialog,
}) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalNumberOfPage, setTotalNumberOfPage] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<Sort>({
    field: 'roas',
    direction: 'desc',
  });

  const debouncedInputValue = useDebounce<string>(query, 500);

  //Handling the input on our search bar
  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };
  const setItemsForCompare = (item: Item, e: boolean) => {
    if (e) {
      setItems([...items, item]);
    } else {
      setItems(items.filter((elem: Item) => elem.id !== item.id));
    }
  };
  const cancel = () => {
    setQuery('');
    itemsCompare.length === 0 && setItems([]);
    setCurrentPage(0);
  };
  const checkDisabledItem = (item: Item): boolean => {
    const itemChecked = items.findIndex((i) => i.id === item.id) > -1;

    if (
      !item.ad_primary_status ||
      item.ad_primary_status.toLowerCase() !== 'active'
    ) {
      return true;
    }
    if (items.length >= 4 && !itemChecked) {
      return true;
    }
    return false;
  };
  const fetchAds = async (page?: number) => {
    setLoading(true);

    const numberPage = page !== undefined ? page : currentPage;

    const response: any = await API.graphql(
      graphqlOperation(getAdcomparisonData, {
        getBusinessAnalyticsInput: {
          business_id: businessId,
          dateStart,
          dateEnd,
          limit: 10,
          numberPages: debouncedInputValue === '' ? numberPage + 1 : 1,
          sort: [sortOrder],
          source: source,
          level: tabCompare.toLowerCase().slice(0, -1),
          searchText: debouncedInputValue,
        },
      }),
    );

    const comparisionData = response?.data?.getAdcomparisonData?.data || [];

    setData(comparisionData);
    setTotalNumberOfPage(comparisionData?.numberPages || 0);

    if (!comparisionData?.numberPages) setCurrentPage(0);

    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, [
    businessId,
    source,
    sortOrder,
    tabCompare,
    debouncedInputValue,
    dateStart,
    dateEnd,
  ]);

  useEffect(() => {
    if (!showDialog) {
      setQuery('');
      setCurrentPage(0);

      if (currentPage > 0) fetchAds(0);
    }
  }, [showDialog]);

  useEffect(() => {
    itemsCompare.length === 0 && setItems([]);
  }, [itemsCompare]);

  const handleCurrentPage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      fetchAds(page);
    }
  };
  return (
    <>
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-1">
        <h3 className="h3 capitalize">
          Compare Your{' '}
          {tabCompare.replaceAll('_', ' ').replaceAll('adsets', 'Ad Sets')}
        </h3>
        <button
          type="button"
          className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
          onClick={() => cancel()}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="icon-dismiss-circle"></i>
        </button>
      </div>
      <div className="modal-body relative px-4 pb-4">
        <p className="text-xs text-textTeriraryColor mb-4 capitalize">
          {' '}
          Choose 2-4{' '}
          {tabCompare.replaceAll('_', ' ').replaceAll('adsets', 'Ad Sets')} To
          Compare.
        </p>
        <div className="w-72 mb-4">
          <label className="form-label mb-1 capitalize" htmlFor="camp-goal">
            Find{' '}
            {tabCompare.replaceAll('_', ' ').replaceAll('adsets', 'Ad Sets')}
          </label>
          <div>
            <input
              onChange={handleChange}
              className="input search-input white capitalize"
              placeholder={`Enter ${tabCompare
                .replaceAll('_', ' ')
                .replaceAll('adsets', 'Ad Sets')} Name`}
              type="text"
              value={query}
            />
          </div>
        </div>
        <div>
          <div className="max-h-full relative">
            {loading ? (
              <TableLoading />
            ) : (
              <>
                <div className="table-scroll border border-extraLightColor rounded-lg overflow-x-auto relative h-[420px]">
                  <table className="main-table w-full min-w-fit">
                    <thead>
                      <tr>
                        <th className="min-w-[40px] w-[40px] text-center px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor align-middle"></th>
                        <th className="px-2 py-4 cursor-pointer text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                          <div className="flex items-center">
                            <span className="capitalize">
                              {tabCompare
                                .replaceAll('_', ' ')
                                .replaceAll('adsets', 'Ad Sets')}{' '}
                              Name
                            </span>
                            <SortItems
                              sortKey={'ad_name'}
                              sort={sortOrder}
                              setSort={setSortOrder}
                            />
                          </div>
                        </th>
                        <th className="w-[100px] cursor-pointer px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                          <div className="flex items-center">
                            <span>Status</span>
                            <SortItems
                              sortKey={'ad_primary_status'}
                              sort={sortOrder}
                              setSort={setSortOrder}
                            />
                          </div>
                        </th>
                        <th className="px-2 cursor-pointer py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                          <div className="flex items-center">
                            <span>Platform</span>
                            <SortItems
                              sortKey={'source'}
                              sort={sortOrder}
                              setSort={setSortOrder}
                            />
                          </div>
                        </th>
                        <th className="px-2 py-4 cursor-pointer text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                          <div className="flex items-center">
                            <span>Amount Spent</span>
                            <SortItems
                              sortKey={'total_amount_spent'}
                              sort={sortOrder}
                              setSort={setSortOrder}
                            />
                          </div>
                        </th>
                        <th className="px-2 py-4 cursor-pointer text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                          <div className="flex items-center">
                            <i
                              data-bs-toggle="popover"
                              data-bs-placement="bottom"
                              data-bs-title="Some info Total Conversion Value"
                              data-bs-trigger="hover focus"
                              data-bs-content="Some info Total Conversion Value"
                              className="icon-spark text-primaryColor text-base mr-1"
                            ></i>
                            <span>ROAS</span>
                            <SortItems
                              sortKey={'roas'}
                              sort={sortOrder}
                              setSort={setSortOrder}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item: Item, index: number) => (
                        <tr
                          key={index}
                          className={checkDisabledItem(item) ? 'disabled' : ''}
                        >
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r align-middle border-extraLightColor last:border-r-0">
                            <span className="flex justify-center">
                              <input
                                checked={
                                  items.find(
                                    (element: Item) => element.id === item.id,
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  setItemsForCompare(
                                    { ...item },
                                    e.target.checked,
                                  )
                                }
                                type="checkbox"
                                disabled={checkDisabledItem(item) as boolean}
                              />
                            </span>
                          </td>
                          <td className="text-textSecondaryColor max-w-0 align-middle px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            <div className="flex items-center">
                              {tabCompare.replaceAll('_', ' ').toLowerCase() ===
                                'ads' &&
                              item?.ad_images &&
                              item?.ad_images.length !== 0 ? (
                                <Image
                                  src={
                                    item?.ad_images?.length
                                      ? item?.ad_images[0]
                                      : ''
                                  }
                                  width={32}
                                  height={32}
                                  alt=""
                                  className="mr-2"
                                />
                              ) : null}
                              <span className="ellipsis-text">
                                {item.ad_name}
                              </span>
                            </div>
                          </td>
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            <span
                              className={`tag ${
                                item.ad_primary_status?.toLowerCase() ===
                                'active'
                                  ? 'green'
                                  : 'yellow'
                              }`}
                            >
                              {item.ad_primary_status !== null &&
                                (item.ad_primary_status?.toLowerCase() ===
                                'active'
                                  ? 'Active'
                                  : 'Paused')}
                            </span>
                          </td>
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {' '}
                            {item.source}
                          </td>
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {' '}
                            {formatMoneyWithDecimals(
                              item.total_amount_spent,
                              'USD',
                            )}
                          </td>
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {`${
                              parseFloat(item.roas?.toString())?.toFixed(2) ||
                              '0.00'
                            }X`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-center pt-4">
                  <Pagination
                    currentPage={currentPage}
                    onChangeCurrentPage={(page) => handleCurrentPage(page)}
                    numberPages={totalNumberOfPage || 1}
                  />
                </div>
              </>
            )}

            <div className="hidden flex items-center justify-center bg-white absolute left-px right-px top-[58px] bottom-px z-50">
              <div className="inline-flex items-center justify-center flex-col">
                <div className="spinner"></div>
                <div className="font-semibold text-primaryColor mt-3">
                  {' '}
                  Updating Results{' '}
                </div>
              </div>
            </div>
            <div
              className={`${
                data.length > 0 ? 'hidden' : 'flex'
              } flex items-center justify-center bg-white absolute left-px right-px top-[58px] bottom-px z-50`}
            >
              <div className="inline-flex items-center justify-center flex-col">
                <div>
                  <img src="/src/img/no-account.svg" alt="" />
                </div>
                <div className="font-semibold text-textSecondaryColor mt-1 mb-3">
                  {' '}
                  We can&apos;t find any {tabCompare.replaceAll(
                    '_',
                    ' ',
                  )} with {query}{' '}
                </div>
                <div className="text-textTeriraryColor">Try to find again</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end py-4 mx-4 border-t border-extraLightColor">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => cancel()}
          className="btn light"
        >
          {' '}
          Cancel{' '}
        </button>
        <button
          onClick={() => setCompare(items)}
          data-bs-dismiss="modal"
          aria-label="Close"
          className="btn ml-3 flex items-center"
          disabled={isSending || items.length < 2}
        >
          {' '}
          Compare {isSending && <Spinner />}
        </button>
      </div>
    </>
  );
};

interface SortItemProps {
  sortKey: string;
  sort: Sort;

  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const SortItems: React.FC<SortItemProps> = ({ sortKey, sort, setSort }) => {
  const handleSortClick = () => {
    if (sortKey !== sort.field) {
      setSort({
        field: sortKey,
        direction: 'asc',
      });
      return;
    }
    setSort({
      field: sortKey,
      direction: sort.direction === 'asc' ? 'desc' : 'asc',
    });
  };
  if (sortKey !== sort.field) {
    return (
      <button className="sort-button" onClick={handleSortClick}>
        <i className="icon-arrow-sort"></i>
      </button>
    );
  }
  return (
    <button className="sort-button" onClick={handleSortClick}>
      <i
        className={`icon-arrow-sort ${
          sort.direction === 'asc' ? '' : 'rotate-180'
        }`}
      ></i>
    </button>
  );
};

export default CompareModal;
