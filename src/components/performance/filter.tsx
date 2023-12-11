'use client';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { RoasGoalOption } from '@interfaces/performance';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TailwindModal from '@components/modals/TailwindModal';
import SetRoalsGoalsModal from '@components/modals/tailwindTypes/SetRoasGoals';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRoasGoals } from '@graphql/mutations';
import { setRoasGoalsSchema } from '@interfaces/formsSchema';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import AddFilter from './AddFilter';
import { useBoundStore } from '@store/index';

type PerformanceProps = {
  FilterProps: (data: any) => void;
  isRoasGoalsSet: boolean;
  setIsRoasGoalsSet: Dispatch<SetStateAction<boolean>>;
  businessId: string;
  activeFilterCount: number;
  setActiveFilterCount: (activeFilterCount: number) => void;
  setCurrentPage: (data: any) => void;
};

const filterStatusDefault = {
  filterId: 0,
  column: '',
  operator: '',
  columnValue: '',
  logicalOperator: 'AND',
};
const DEFAULT_FILTER_ID = 'tabs-specific-filters-tab-all';
const Filter = (props: PerformanceProps) => {
  const [activeChecked, setActiveChecked] = useState(true);
  const [selStatus, setSelStatus] = useState(false);
  const [filterTab, setFilterTab] = useState(DEFAULT_FILTER_ID);
  const [roasFilter, setRoasFilter] = useState(true);
  const [roasFilterToggle, setRoasFilterToggle] = useState<RoasGoalOption>();
  const [logicalOperator, setLogicalOperator] = useState(true);
  const [filterId, setFilterId] = useState(0);
  const router = useRouter();
  const [showDialogSetGoals, setShowDialogSetGoals] = useState<boolean>(false);
  const [isSending, setIsSending] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: '',
  });
  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const { filterProps } = useBoundStore.getState();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const params = useSearchParams()!;
  // Get the query parameter from the URL
  const keyword = params.get('keyword');
  // const { keyword } = router.query;

  const [filterCondition, setFilterCondition] = useState<any[]>([
    filterStatusDefault,
  ]);

  // Reset custom filters and keep default
  useEffect(() => {
    if (filterProps.filterStatus === false) {
      //custom filters
      const defaultFilterStatus = Object.assign({}, filterStatusDefault);
      defaultFilterStatus.filterId = filterId + 1;
      setFilterCondition([defaultFilterStatus]);
      props.setActiveFilterCount(1);
      setFilterId(filterId + 1);
      setSelStatus(false);
      setFilterTab(DEFAULT_FILTER_ID);
      // default filters
      setActiveChecked(filterProps?.activeChecked as boolean);
      if (filterProps?.roas === 'above') {
        setRoasFilterToggle(RoasGoalOption.ABOVE);
      } else if (filterProps?.roas === 'below') {
        setRoasFilterToggle(RoasGoalOption.UNDER);
      } else {
        setRoasFilterToggle(undefined);
      }

      props.FilterProps({
        ...filterProps,
        Condition: defaultFilterStatus,
      });
    }
  }, [filterProps.filterStatus]);

  const RemoveFilterProps = (data: any) => {
    const temp = filterCondition.filter((item: any) => {
      return item.filterId !== data;
    });
    setFilterCondition(temp);
  };

  const handleColumnChange = (data: any) => {
    filterCondition?.map((item, index) => {
      if (item.filterId === data.filterId) {
        filterCondition[index] = {
          ...item,
          [data.e.target.name]:
            data.e.target.value === 'platform' ? 'source' : data.e.target.value,
        };
      }
    });
  };

  const handleRadioChange = (data: any) => {
    filterCondition?.map((item, index) => {
      if (item.filterId === data.filterId) {
        filterCondition[index] = {
          ...item,
          logicalOperator: data.logicalOperator ? 'AND' : 'OR',
        };
      }
    });
  };

  const handleStatusChange = (e: any) => {
    setSelStatus(e.target.id !== 'tabs-specific-filters-tab-all');
    setFilterTab(e.target.id);
  };

  const handleActiveStatusChange = (e: any) => {
    setActiveChecked(e.target.checked);
  };

  const handleAddConditionFilter = () => {
    const newFilterStatus = Object.assign({}, filterStatusDefault);
    newFilterStatus.filterId = filterId + 1;
    setFilterId(filterId + 1);
    setFilterCondition([...filterCondition, newFilterStatus]);
  };

  const handleResetFilter = () => {
    const defaultFilterStatus = Object.assign({}, filterStatusDefault);
    defaultFilterStatus.filterId = filterId + 1;
    setRoasFilterToggle(undefined);
    setFilterCondition([defaultFilterStatus]);
    props.setActiveFilterCount(1);
    setFilterId(filterId + 1);
    setSelStatus(false);
    setActiveChecked(true);
    setFilterTab(DEFAULT_FILTER_ID);
    props.FilterProps({
      Condition: defaultFilterStatus,
      filterStatus: false,
      activeChecked: true,
      roas: null,
    });
  };

  const handleSubmitApplyBtn = async () => {
    props.FilterProps({
      Condition: filterCondition,
      filterStatus: selStatus,
      activeChecked: activeChecked,
      roas: roasFilterToggle,
    });
    props.setCurrentPage(0);
    if (selStatus) {
      props.setActiveFilterCount(filterCondition.length);
    } else {
      let count = 0;

      if (activeChecked) {
        count++;
      }

      if (roasFilterToggle) {
        count++;
      }

      props.setActiveFilterCount(count);
    }
  };

  const onClickRoasFilter = () => {
    setRoasFilter(!roasFilter);
  };

  const handleTogglechange = (e: { target: any }) => {
    if (e.target.checked) {
      setRoasFilterToggle(e.target.value);
    } else {
      setRoasFilterToggle(undefined);
    }
  };

  useEffect(() => {
    if (filterProps) {
      setSelStatus(filterProps?.filterStatus ?? false);
      if (filterProps.filterStatus) {
        props.setActiveFilterCount(filterProps.Condition.length);
      } else {
        let count = 0;

        if (filterProps.activeChecked) {
          count++;
        }

        if (filterProps.roas) {
          count++;
        }

        props.setActiveFilterCount(count);
        setFilterId(count + 1);
      }
      setActiveChecked(filterProps.activeChecked ?? false);
    }

    if (keyword === 'Under' || keyword === 'Over') {
      setRoasFilter(false);
      setActiveChecked(true);

      if (keyword === 'Under') setRoasFilterToggle(RoasGoalOption.UNDER);
      if (keyword === 'Over') setRoasFilterToggle(RoasGoalOption.ABOVE);

      props.setActiveFilterCount(2);
    }
  }, []);

  const handleSaveGoals = async (form: setRoasGoalsSchema) => {
    setIsSending(true);
    try {
      await API.graphql(
        graphqlOperation(updateRoasGoals, {
          updateRoasGoalsInput: {
            ads: form.ads,
            adsets: form.adsets,
            campaigns: form.campaigns,
            business_id: props.businessId,
          },
        }),
      );
      setDialogOptions({
        type: 'success',
        message: 'Break-Even Roas Goals set',
      });
      props.setIsRoasGoalsSet(true);
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setIsSending(false);
      dismissModalButtonRef.current?.click();
    }
  };
  return (
    <>
      <div className="relative">
        <button
          className="inline-flex items-center font-medium text-darkGrade50 [&.show]:text-darkGrade100"
          data-bs-toggle="collapse"
          data-bs-target="#dropdownFilterTableAll"
          aria-expanded="false"
          aria-controls="dropdownFilterTableAll"
        >
          <i className="icon-filter text-2xl mr-2"></i>Filter
          {props.activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center absolute w-5 h-5 rounded-full bg-primaryColor -left-2 -top-1 text-[10px] text-white font-semibold shadow-sm shadow-primaryColor">
              {props.activeFilterCount}
            </span>
          )}
        </button>
      </div>
      <div
        className="p-3 dropdown-menu w-[475px] right-0 top-9 absolute hidden bg-white widget-container rounded-lg border border-extraLightColor"
        id="dropdownFilterTableAll"
      >
        <h4 className="h4 mb-3">Filters</h4>
        <div className="flex flex-col w-full">
          <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b border-extraLightColor pl-0 mb-4"
            role="tablist"
          >
            <li className="nav-item" role="presentation" key="Specific">
              <Link
                href="#tabs-specific-filters-all"
                className={`inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100
                    ${
                      filterTab === 'tabs-specific-filters-tab-all'
                        ? 'active'
                        : ''
                    }
                `}
                id="tabs-specific-filters-tab-all"
                role="tab"
                aria-controls="tabs-specific-filters-all"
                aria-selected={selStatus}
                onClick={handleStatusChange}
              >
                Default Filters
              </Link>
            </li>
            <li className="nav-item" role="presentation" key="Custom">
              <Link
                href="#tabs-custom-filters-all"
                className={`inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100
                   ${
                     filterTab === 'tabs-custom-filters-tab-all' ? 'active' : ''
                   }
                
                `}
                id="tabs-custom-filters-tab-all"
                role="tab"
                aria-controls="tabs-custom-filters-all"
                aria-selected={selStatus}
                onClick={handleStatusChange}
              >
                Custom Filters
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div
              // className="tab-pane fade show active"
              className={`tab-pane fade 
                  ${
                    filterTab === 'tabs-specific-filters-tab-all'
                      ? 'show active'
                      : ''
                  }
                `}
              id="tabs-specific-filters-all"
              role="tabpanel"
              aria-labelledby="tabs-specific-filters-tab"
            >
              <div className="p-3 rounded-md border border-extraLightColor mb-3">
                <div className="text-xs font-semibold text-textSecondaryColor mb-2.5">
                  Status Filter
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-darkGrade50">
                    Only Active Campaigns
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={activeChecked}
                      onChange={handleActiveStatusChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {props.isRoasGoalsSet ? (
                <div className="p-3 rounded-md border border-extraLightColor mb-3">
                  <div className="text-xs font-semibold text-textSecondaryColor">
                    <span
                      className="cursor-pointer toggle-btn-arrow toggleFilterBtn"
                      onClick={() => {
                        onClickRoasFilter();
                      }}
                    >
                      Break-Even ROAS Filter
                      <i
                        className={`icon-arrow-down mr-1 ${
                          roasFilter ? 'rotate-180' : ''
                        }`}
                      ></i>
                    </span>
                  </div>
                  <div
                    className={`${
                      roasFilter ? 'hidden' : 'pt-2.5 toggleFilterContainer'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-darkGrade50">
                        Under Break-Even ROAS Goal
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="under"
                          checked={roasFilterToggle === RoasGoalOption.UNDER}
                          onChange={handleTogglechange}
                          value={RoasGoalOption.UNDER}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-darkGrade50">
                        Above Break-Even ROAS Goal
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="above"
                          checked={roasFilterToggle === RoasGoalOption.ABOVE}
                          onChange={handleTogglechange}
                          value={RoasGoalOption.ABOVE}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 flex flex-row rounded-md border border-extraLightColor mb-3 gap-3">
                  <div className="flex flex-col flex-1">
                    <div className="text-xs font-semibold text-textSecondaryColor mb-1">
                      Set up your goal
                    </div>
                    <div className="font-medium text-darkGrade50">
                      Filter used to outline campaigns, ad sets and ads that are
                      preforming or below a specified Break-Even ROAS goal
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#roasGoalModal"
                  >
                    <Image
                      src={'/images/add-circle.svg'}
                      alt={'setup goal'}
                      width="32"
                      height="32"
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              id="tabs-custom-filters-all"
              role="tabpanel"
              aria-labelledby="tabs-custom-filters-tab"
              className={`tab-pane fade 
                  ${
                    filterTab === 'tabs-custom-filters-tab-all'
                      ? 'show active'
                      : ''
                  }
                `}
            >
              {filterCondition.length > 0 &&
                filterCondition?.map((item) => (
                  <AddFilter
                    key={item.filterId}
                    handleColumnChange={handleColumnChange}
                    handleRadioChange={handleRadioChange}
                    RemoveFilterProps={RemoveFilterProps}
                    logicalOperator={logicalOperator}
                    setLogicalOperator={setLogicalOperator}
                    filterId={item.filterId}
                    filters={item}
                  />
                ))}

              <div className="flex items-center mb-4">
                <button
                  className="text-darkGrade50 items-center inline-flex hover:text-darkGrade75"
                  onClick={handleAddConditionFilter}
                >
                  <i className="icon-add-circle-line text-xl mr-2.5 font-medium"></i>
                  Add Filter
                </button>
              </div>
            </div>
          </div>
          {/* ------------------- */}
          <div className="flex pt-4 justify-between items-center border-t border-extraLightColor">
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={handleResetFilter}
            >
              <Image
                src={'/images/arrow-clockwise.svg'}
                alt={'reset'}
                width="24"
                height="24"
              />
              <span className="ml-2 text-darkGrade50 font-medium text-sm">
                Reset Filters
              </span>
            </div>
            <div>
              <button
                data-bs-toggle="collapse"
                data-bs-target="#dropdownFilterTableAll"
                className="btn light"
              >
                Cancel
              </button>
              <button
                data-bs-toggle="collapse"
                data-bs-target="#dropdownFilterTableAll"
                className="btn ml-2"
                onClick={handleSubmitApplyBtn}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={dismissModalButtonRef}
      />
      <TailwindModal
        id="roasGoalModal"
        showDialog={showDialogSetGoals}
        setShowDialog={setShowDialogSetGoals}
      >
        <SetRoalsGoalsModal onSubmit={handleSaveGoals} isSending={isSending} />
      </TailwindModal>
      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>
    </>
  );
};
export default Filter;
