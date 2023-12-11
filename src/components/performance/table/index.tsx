'use client';
import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  campaignColumns,
  FieldPerformanceSortType,
  PerformanceSortObjectType,
} from '@interfaces/performance';
import Pagination from '@components/pagination';
import AdGroupCheckbox from '../AdGroupCheckbox';
import ColumnHeader from './ColumnHeader';
import { Performance } from 'API';
import { NumericFormat } from 'react-number-format';
import { handleMouseDown } from '@utils/handeResizeColumns';
import {
  formatMoneyWithDecimals,
  formatRoas,
  capitalizeWord,
} from '@utils/format';
import AdStatusToggle from '../AdStatusToggle';
import { MarketingPlatforms } from '@enums/marketingPlatforms';
import InactiveAdStatusToggle from '../InactiveAdStatusToggle';
import { checkSecondaryStatus } from '@utils/checkSecondaryStatus';
import AdGroupBudget from './AdGroupBudget';
import { getAdGroupBudgetTitles } from '@utils/budget';
import { DrawerOptionProps } from '../drawer';
import {
  AdLevelTypes,
  AdStatusUpdate,
  MarketingSources,
} from '@sirge-io/sirge-types';
import { useBoundStore } from '@store/index';

type PerformanceDataProps = {
  data: any;
  setShowDialog: (data: any) => void;
  setShowUnsupportedUTMDialog: (data: any) => void;
  setShowPurchasesDialog: (data: any) => void;
  setShowAdStatusDialog: (data: any) => void;
  tableIndex: (idx: any) => void;
  setSortChangeColumn: Dispatch<
    SetStateAction<PerformanceSortObjectType | undefined>
  >;
  setCurrentPage: (data: any) => void;
  currentPage: number;
  totalPage: number;
  setSelectedPurcahsesIds: Dispatch<SetStateAction<number[]>>;
  setSelectedPurcahsesCount: Dispatch<SetStateAction<number | null>>;
  setSortChecked: Dispatch<SetStateAction<boolean[]>>;
  sortChecked: boolean[];
  sortChangeColumn: PerformanceSortObjectType | undefined;
  isStatusUpdated: string | null;
  handleOpenDrawer: Dispatch<SetStateAction<DrawerOptionProps>>;
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  selectedItems: string[];
  reminderStatus: boolean;
  updateAdStatus: (
    id: string,
    adType: AdLevelTypes,
    status: AdStatusUpdate,
    source: MarketingSources,
    reminderStatus: boolean,
  ) => Promise<void>;
};

const DataTable: FC<PerformanceDataProps> = ({
  data,
  setShowDialog,
  setShowUnsupportedUTMDialog,
  setShowPurchasesDialog,
  setShowAdStatusDialog,
  tableIndex,
  isStatusUpdated,
  setSortChangeColumn,
  setCurrentPage,
  setSelectedPurcahsesIds,
  setSelectedPurcahsesCount,
  currentPage,
  totalPage,
  sortChecked,
  setSortChecked,
  sortChangeColumn,
  handleOpenDrawer,
  setSelectedItems,
  selectedItems,
  reminderStatus,
  updateAdStatus,
}) => {
  const {
    currentPurchase,
    currentPlatform,
    faceBookToggle,
    campaignsSelected,
    adSetsSelected,
    summaryPerformanceRows,
    setselectedAdGroupsExplore,
    selectedAdGroupsExplore,
  } = useBoundStore((state) => state);

  const { selectedBusiness } = useBoundStore.getState();

  const [activeChecked, setActiveChecked] = useState<string[]>([]);

  const [showCount] = useState(15);

  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  const [parentElement, setParentElement] = useState<Element | null>(null);

  //-----------------------------------------

  useEffect(() => {
    const temp = [...activeChecked];
    data?.forEach((item: any, index: any) => {
      temp[index] = '';
      if (currentPurchase === 'Campaigns') {
        if (campaignsSelected.length > 0) {
          for (let i = 0; i < campaignsSelected.length; i++) {
            if (item.id === campaignsSelected[i]) {
              temp[index] = item.id;
              break;
            }
          }
        }
      }
      if (currentPurchase === 'Ad sets') {
        if (adSetsSelected.length > 0) {
          for (let i = 0; i < adSetsSelected.length; i++) {
            if (item.id === adSetsSelected[i]) {
              temp[index] = item.id;
              break;
            }
          }
        }
      }
    });

    setActiveChecked(temp);
  }, [data]);

  useEffect(() => {
    setColumnWidths(() =>
      campaignColumns(currentPurchase).map((column) => column.width),
    );
  }, []);

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedItems = e.target.checked
      ? data.map((item: Performance) => item.id)
      : [];
    if (currentPurchase === 'Ad sets') {
      setselectedAdGroupsExplore({
        ...selectedAdGroupsExplore,
        selected_ad_set_ids: selectedItems,
      });
    } else if (currentPurchase === 'Campaigns') {
      setselectedAdGroupsExplore({
        ...selectedAdGroupsExplore,
        selected_campaign_ids: selectedItems,
      });
    }
  };

  const checkTextColumn = (sortfield: string) => {
    const textColumns: string[] = [
      'platform',
      'source',
      'campaign_name',
      'ad_set_name',
      'ad_name',
    ];
    return textColumns.includes(sortfield);
  };

  const setInitialSortDirection = (sortItem: any, sortfield: string) => {
    if (sortItem === null || sortItem === undefined) {
      return checkTextColumn(sortfield);
    }
    return !sortItem;
  };

  const handleSelSortCheckChange = (sortfield: string) => {
    const temp = [...sortChecked];
    let resetSort = false;
    const index = campaignColumns(currentPurchase).findIndex(
      (value) => value.accessorKey === sortfield,
    );

    if (sortfield === 'platform') sortfield = 'source';

    if (
      sortChangeColumn?.field === sortfield &&
      ((checkTextColumn(sortfield) && !temp[index]) ||
        (!checkTextColumn(sortfield) && temp[index]))
    ) {
      resetSort = true;
    } else {
      temp[index] = setInitialSortDirection(temp[index], sortfield);
    }

    const sortChange: PerformanceSortObjectType = {
      sort: setInitialSortDirection(sortChecked[index], sortfield),
      field: sortfield as FieldPerformanceSortType,
    };

    setSortChangeColumn(resetSort ? undefined : sortChange);
    setSortChecked(temp);
    // -------------------------------
    const subtemp = [...activeChecked];
    data?.map((item: any, index: any) => {
      subtemp[index] = '';
      for (let i = 0; i < activeChecked.length; i++) {
        if (item.id === activeChecked[i]) {
          subtemp[index] = item.id;
          break;
        }
      }
    });
    setActiveChecked(subtemp);
  };
  //---------------------------------------------------------

  const handleResize = (columnIndex: number, newWidth: number) => {
    const newColumnWidths = [...columnWidths];

    newColumnWidths[columnIndex] = newWidth;

    setColumnWidths(newColumnWidths);
  };

  // Given the currentPlatform and currentPurchase,
  // this function returns the corresponding number of columns
  const getNumberOfCols = () => {
    // Mapping of platform-purchase combinations to column counts.
    const columnMapping: { [key: string]: number } = {
      'All Platforms-Ads': 4,
      'facebook-Campaigns': 4,
      'facebook-Ad sets': 4,
      'facebook-Ads': 3,
      'tik_tok-Campaigns': 4,
      'tik_tok-Ad sets': 4,
      'tik_tok-Ads': 3,
      'google-Campaigns': 4,
      'google-Ad sets': 4,
      'google-Ads': 3,
    };

    // Generate the key for the currentPlatform and currentPurchase
    const key = `${currentPlatform}-${currentPurchase}`;

    // Look up the number of columns in the columnMapping,
    // and default to 5 if the combination isn't found.
    const cols = columnMapping[key] || 5;

    return cols;
  };
  const currency = selectedBusiness?.store?.currency;

  return (
    <>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="tabs-campaings-all"
          role="tabpanel"
          aria-labelledby="campaings-all"
        >
          {data?.length > 0 ? (
            <div className="max-h-full border-extraLightColor relative">
              <div className="table-scroll   border border-extraLightColor rounded-lg overflow-x-auto relative  ">
                <table
                  className={`main-table w-full ${
                    faceBookToggle ? 'table-lg-resizable' : 'table-resizable'
                  }`}
                >
                  <thead>
                    <tr>
                      {currentPurchase !== 'Ads' && (
                        <th className="w-[40px] text-center px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor align-middle">
                          <span className="flex justify-center">
                            <label className="checkbox-default">
                              <input
                                className="black"
                                type="checkbox"
                                name="colcheck"
                                onChange={handleCheckAll}
                              />
                            </label>
                          </span>
                        </th>
                      )}

                      {campaignColumns(currentPurchase).map((item, index) => (
                        <ColumnHeader
                          key={index}
                          index={index}
                          currentPlatform={currentPlatform}
                          currentPurchase={currentPurchase}
                          faceBookToggle={faceBookToggle}
                          sortChecked={sortChecked[index]}
                          column={item}
                          colunmWidths={columnWidths}
                          handleSelSortCheckChange={handleSelSortCheckChange}
                          handleMouseDown={(e) =>
                            handleMouseDown(
                              e,
                              index,
                              columnWidths,
                              handleResize,
                            )
                          }
                          currentSortField={
                            sortChangeColumn?.field === 'source'
                              ? 'platform'
                              : sortChangeColumn?.field
                          }
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody ref={setParentElement}>
                    {data?.map((item: any, index: any) => (
                      <tr key={index + (currentPage - 1) * showCount}>
                        {currentPurchase !== 'Ads' && (
                          <AdGroupCheckbox
                            item={item}
                            key={index + (currentPage - 1) * showCount}
                          />
                        )}

                        {item?.source_delivery_status.toLowerCase() ===
                        'unknown' ? (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0 text-center">
                            <span className="tag red">
                              {item.source_delivery_status === null
                                ? 'Error'
                                : item.source_delivery_status}
                            </span>
                          </td>
                        ) : checkSecondaryStatus(
                            item,
                            currentPurchase,
                            item?.ad_type,
                          ) ? (
                          <>
                            <AdStatusToggle
                              key={index}
                              index={index}
                              item={item}
                              isStatusUpdated={isStatusUpdated as string}
                              setOpenModal={setShowAdStatusDialog}
                              setTableDataindex={tableIndex}
                              reminderStatus={reminderStatus}
                              updateAdStatus={updateAdStatus}
                            />
                          </>
                        ) : (
                          <>
                            <InactiveAdStatusToggle
                              key={index}
                              item={item}
                              adType={currentPurchase}
                              source={item?.platform}
                            />
                          </>
                        )}

                        <td className="text-textSecondaryColor max-w-0 align-middle px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          <div className="flex items-center">
                            {process.env.NEXT_PUBLIC_SHOW_UTM_INJECTION ===
                              'show' &&
                            ((currentPurchase === 'Ads' &&
                              !item?.utm_status &&
                              item?.source_delivery_status.toLowerCase() ===
                                'active' &&
                              item?.source_secondary_status.toLowerCase() ===
                                'active') ||
                              (currentPurchase !== 'Ads' &&
                                !item?.are_all_ads_connected)) ? (
                              <span
                                className="mr-1 w-5 h-5 flex-shrink-0 rounded inline-flex items-center justify-center hover:bg-warningBgColor p-0.5 cursor-pointer"
                                onClick={() => {
                                  if (item.transform) {
                                    setShowUnsupportedUTMDialog(true);
                                  } else {
                                    setShowDialog(true);
                                  }

                                  tableIndex(index);
                                }}
                                data-bs-toggle="modal"
                                data-bs-target={
                                  item.transform
                                    ? '#unsupportedUtmModal'
                                    : '#missingUtmModal'
                                }
                              >
                                <Image
                                  src="/images/warning-icon.svg"
                                  width="28"
                                  height="25"
                                  alt="Missing UTM"
                                />
                              </span>
                            ) : null}

                            {currentPurchase === 'Ads' ? (
                              item.ad_image && (
                                <Image
                                  src={
                                    item.ad_image || '/images/warning-icon.svg'
                                  }
                                  width="16"
                                  height="16"
                                  alt=""
                                  className="mr-2"
                                />
                              )
                            ) : (
                              <></>
                            )}

                            {currentPurchase === 'Ads' &&
                            item?.ad_images?.[0] ? (
                              <Image
                                className="mr-1 rounded object-cover"
                                src={item?.ad_images?.[0]}
                                width="32"
                                height="32"
                                alt=""
                              />
                            ) : (
                              <></>
                            )}

                            <a
                              className={`ellipsis-text mr-3 select-none text-blue underline cursor-pointer ${
                                selectedItems.find((id) => item.id === id) &&
                                'selected-performance-name'
                              }`}
                              onClick={() => {
                                handleOpenDrawer({
                                  isOpen: true,
                                  adType: item.ad_type as string,
                                  adId: item.id,
                                  sirge_adset_id: item.sirge_adset_id,
                                  name: item.campaign_name,
                                  utm_status: item.utm_status,
                                  are_all_ads_connected:
                                    item.are_all_ads_connected,
                                  source_delivery_status:
                                    item.source_delivery_status,
                                  is_editing_budget: false,
                                  titles: getAdGroupBudgetTitles(item),
                                  daily_budget: 0,
                                  lifetime_budget: 0,
                                  shared_budget_name: '',
                                });

                                setSelectedItems((prev) => [...prev, item.id]);
                              }}
                            >
                              {item.campaign_name ? item.campaign_name : '-'}
                            </a>
                          </div>
                        </td>
                        {currentPlatform === 'All Platforms' && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {capitalizeWord(item.platform)}
                          </td>
                        )}
                        <td className="text-textSecondaryColor px-2 pt-3 pb-1 border-b border-r border-extraLightColor last:border-r-0">
                          <AdGroupBudget
                            item={item}
                            key={index}
                            itemType={currentPurchase as string}
                            handleOpenDrawer={handleOpenDrawer}
                          />
                        </td>
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          {formatMoneyWithDecimals(
                            item.amount_spent ?? 0,
                            selectedBusiness?.store?.currency as string,
                          )}
                        </td>
                        {faceBookToggle && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            <NumericFormat
                              displayType="text"
                              value={item.fclicks}
                              allowLeadingZeros={false}
                              thousandSeparator=","
                            />
                          </td>
                        )}
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          <NumericFormat
                            displayType="text"
                            value={item.clicks}
                            allowLeadingZeros={false}
                            thousandSeparator=","
                          />
                        </td>
                        {faceBookToggle && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            <NumericFormat
                              displayType="text"
                              value={
                                currentPlatform === MarketingPlatforms.GOOGLE &&
                                item.fpurchases > 0
                                  ? item.fpurchases?.toFixed(2)
                                  : item.fpurchases?.toFixed(0)
                              }
                              allowLeadingZeros={false}
                              thousandSeparator=","
                            />
                          </td>
                        )}
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          <div className="inline-flex items-center">
                            <NumericFormat
                              displayType="text"
                              value={item.purchases}
                              allowLeadingZeros={false}
                              thousandSeparator=","
                            />

                            {item.purchases ? (
                              <>
                                {/* <span className="tag blue ml-1.5">New</span> */}
                                <button
                                  onClick={() => {
                                    setSelectedPurcahsesIds([item.id]);
                                    setSelectedPurcahsesCount(item.purchases);
                                    tableIndex(index);
                                    setShowPurchasesDialog(true);
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#purchasesModal"
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
                        {faceBookToggle && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {formatMoneyWithDecimals(
                              item.fcost_per_purchase ?? 0,
                              currency as string,
                            )}
                          </td>
                        )}
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          {formatMoneyWithDecimals(
                            item.cost_per_purchase ?? 0,
                            currency as string,
                          )}
                        </td>
                        {faceBookToggle && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {formatMoneyWithDecimals(
                              item.ftotal_conversion_value ?? 0,
                              currency as string,
                            )}
                          </td>
                        )}
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          {formatMoneyWithDecimals(
                            item.total_conversion_value ?? 0,
                            currency as string,
                          )}
                        </td>
                        {faceBookToggle && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {formatRoas(item.froas || 0)}
                          </td>
                        )}
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          {formatRoas(item.roas || 0)}
                        </td>
                        {faceBookToggle && (
                          <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                            {formatMoneyWithDecimals(
                              item.faverage_cpm,
                              currency as string,
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="text-darkGrade75">
                    <tr>
                      <th
                        colSpan={getNumberOfCols()}
                        className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent"
                      >
                        Summary Of {summaryPerformanceRows?.number_of_records}{' '}
                        {data?.length > 0
                          ? currentPurchase
                          : currentPurchase?.slice(0, -1)}
                      </th>

                      <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                        {formatMoneyWithDecimals(
                          summaryPerformanceRows?.amount_spent ?? 0,
                          currency as string,
                        )}
                      </th>

                      {faceBookToggle && (
                        <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                          <NumericFormat
                            displayType="text"
                            value={Number(
                              summaryPerformanceRows?.ft_clicks ?? 0,
                            ).toFixed(0)}
                            allowLeadingZeros={false}
                            thousandSeparator=","
                          />
                        </th>
                      )}

                      <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                        <NumericFormat
                          displayType="text"
                          value={Number(
                            summaryPerformanceRows?.clicks ?? 0,
                          ).toFixed(0)}
                          allowLeadingZeros={false}
                          thousandSeparator=","
                        />
                      </th>

                      {faceBookToggle && (
                        <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                          <NumericFormat
                            displayType="text"
                            value={
                              currentPlatform === MarketingPlatforms.GOOGLE &&
                              (summaryPerformanceRows?.ft_purchases as number) >
                                0
                                ? summaryPerformanceRows?.ft_purchases?.toFixed(
                                    2,
                                  )
                                : summaryPerformanceRows?.ft_purchases?.toFixed(
                                    0,
                                  )
                            }
                            allowLeadingZeros={false}
                            thousandSeparator=","
                          />
                        </th>
                      )}

                      <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                        <div className="inline-flex items-center">
                          <NumericFormat
                            displayType="text"
                            value={Number(
                              summaryPerformanceRows?.purchases ?? 0,
                            ).toFixed(0)}
                            allowLeadingZeros={false}
                            thousandSeparator=","
                          />
                          {summaryPerformanceRows?.purchases ? (
                            <>
                              {/* <span className="tag blue ml-1.5">New</span> */}
                              <button
                                onClick={() => {
                                  setSelectedPurcahsesIds(
                                    data.map((item: any) => item.id),
                                  );
                                  setSelectedPurcahsesCount(
                                    summaryPerformanceRows?.purchases as number,
                                  );
                                  // tableIndex(index);
                                  setShowPurchasesDialog(true);
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#purchasesModal"
                                className="inline-flex items-center ml-1.5 text-xl text-darkGrade50 hover:text-darkGrade75"
                              >
                                <i className="icon-eye"></i>
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </th>

                      {faceBookToggle && (
                        <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                          {formatMoneyWithDecimals(
                            summaryPerformanceRows?.ft_cost_per_purchase ?? 0,
                            currency as string,
                          )}
                        </th>
                      )}

                      <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                        {formatMoneyWithDecimals(
                          summaryPerformanceRows?.cost_per_purchase ?? 0,
                          currency as string,
                        )}
                      </th>

                      {faceBookToggle && (
                        <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                          {formatMoneyWithDecimals(
                            summaryPerformanceRows?.ft_total_conversion_value ??
                              0,
                            currency as string,
                          )}
                        </th>
                      )}

                      <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                        {formatMoneyWithDecimals(
                          summaryPerformanceRows?.total_conversion_value ?? 0,
                          currency as string,
                        )}
                      </th>

                      {faceBookToggle && (
                        <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                          {formatRoas(
                            Number(summaryPerformanceRows?.ft_roas ?? 0),
                          )}
                        </th>
                      )}

                      <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                        {formatRoas(Number(summaryPerformanceRows?.roas ?? 0))}
                      </th>

                      {faceBookToggle && (
                        <th className="bg-layoutQuarteryColor px-2 py-3 text-left font-semibold text-textSecondaryColor border-r border-extraLightColor last:border-r-transparent">
                          {formatMoneyWithDecimals(
                            Number(summaryPerformanceRows?.ft_average_cpm ?? 0),
                            currency as string,
                          )}
                        </th>
                      )}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <></>
          )}

          {
            // data.length > 0 &&
            <div className="flex items-center justify-center pt-4 pb-4">
              <Pagination
                currentPage={currentPage}
                onChangeCurrentPage={setCurrentPage}
                numberPages={totalPage}
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default DataTable;
