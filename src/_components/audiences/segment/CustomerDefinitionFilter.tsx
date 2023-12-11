import React, { FC, useState } from 'react';
import DeleteIcon from '@assets/icons/DeleteIcon';
import Tooltip from '_components/Tooltip';
import { PropertyNames } from '@utils/dynamic-query-builder-types';

type FilterOption = {
  name: string;
  label: string;
  dataType: string;
  operators: { name: string; label: string }[];
};
interface Props {
  query: 'Where' | 'And';
  filtersOptions: FilterOption[];
  currentFilter: any;
  selectedCustomerDefinitionsFilters: any[];
  setSelectedCustomerDefinitionsFilters: React.Dispatch<
    React.SetStateAction<any[]>
  >;
  addFilter?: false | (() => void);
  removeFilter: () => void;
}
const CustomerDefinitionFilter: FC<Props> = ({
  query,
  filtersOptions,
  currentFilter,
  selectedCustomerDefinitionsFilters,
  setSelectedCustomerDefinitionsFilters,
  addFilter,
  removeFilter,
}) => {
  const [filter, setFilter] = useState(currentFilter);

  const handleChangeFilter = (key: string, value: string) => {
    const newFilter = {
      ...filter,
      [key]: value,
    };

    const newFilters = selectedCustomerDefinitionsFilters.map((filter) =>
      filter.id === newFilter.id ? newFilter : filter,
    );

    setFilter(newFilter);
    setSelectedCustomerDefinitionsFilters(newFilters);
  };

  return (
    <div className="flex items-center mx-5">
      <div className="tag-small grey w-[50px] text-center">
        <span>{query}</span>
      </div>

      <div className="pr-1 mr-4 relative after:content-[''] after:block after:absolute after:h-5 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
        <select
          id="select-property"
          name="select-property"
          className="border-none text-textTeriraryColor focus:text-textSecondaryColor"
          value={filter?.property}
          onChange={(e) =>
            handleChangeFilter(PropertyNames.CUSTOMER_WHO_HAVE, e.target.value)
          }
        >
          <option key="column" value="" defaultChecked hidden>
            Property
          </option>
          {filtersOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filter?.property && (
        <div className="pr-1 mr-4 relative after:content-[''] after:block after:absolute after:h-5 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
          <select
            id="select-operator"
            name="select-operator"
            className="border-none text-textTeriraryColor focus:text-textSecondaryColor"
            onChange={(e) => handleChangeFilter('operator', e.target.value)}
            value={filter?.operator}
          >
            <option key="column" value="" defaultChecked hidden>
              Pick Operation
            </option>

            {filtersOptions
              .find((option) => option.name === filter?.property)
              ?.operators.map((operator) => (
                <option key={operator.name} value={operator.name}>
                  {operator.label}
                </option>
              ))}
          </select>
        </div>
      )}

      {filter?.operator && (
        <div className="flex items-center">
          <span className="font-medium">Value:</span>
          <input
            className="focus-visible:outline-0 ml-3 max-w-[75px]"
            placeholder={`Add value`}
            type="text"
            onChange={(e) => handleChangeFilter('value', e.target.value)}
            value={filter?.value}
          />
        </div>
      )}

      {addFilter && (
        <button onClick={addFilter}>
          <i
            className="icon-filter text-2xl mr-2 text-darkGrade50"
            id="sub_filter"
          />
          <Tooltip
            title={'Add filter'}
            anchorId={'sub_filter' as string}
            place="top"
          />
        </button>
      )}

      <button className="ml-auto text-textWarning" onClick={removeFilter}>
        <DeleteIcon width={18} height={18} fill="#F67063" />
      </button>
    </div>
  );
};

export default CustomerDefinitionFilter;
