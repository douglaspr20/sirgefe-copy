import React, { FC, useEffect, useMemo, useState } from 'react';
import PlusIcon from '@assets/icons/PlusIcon';
import DeleteIcon from '@assets/icons/DeleteIcon';
import Tooltip from '_components/Tooltip';
import CustomerDefinitionFilter from './CustomerDefinitionFilter';
import {
  ActionRule,
  DEFAULT_PROPERTY_OPERATOR,
  Filter,
  LogicalOperator,
  PropertyNames,
  PropertyRule,
  RuleTypes,
} from '@utils/dynamic-query-builder-types';
import CustomerTypeSegment from './segmentFilters/CustomerTypeSegment';
import SelectOption from './segmentFilters/SelectOptions/index';
import SelectOperators from './segmentFilters/SelectOperator';
import ActionSegment from './segmentFilters/Segment/ActionSegment';
import PropertySegment from './segmentFilters/Segment/PropertySegment';
import useUpdateEffect from '_utils/useUpdateEffect';
import InSegment from './segmentFilters/Segment/InSegment';
import { API, graphqlOperation } from 'aws-amplify';
import { getAllAudienceSegmentQueries } from '@graphql/queries';
import { useBoundStore } from '@store/index';

interface Props {
  section: RuleTypes;
  canDeleteSection?: boolean;
  addNewRule: (
    newLogicalOperatorValue: LogicalOperator,
    parentId: string,
  ) => void;
  removeRule: (id: string) => void;
  changeActions: (action: any, ruleId: string) => void;
  dynamicRules: any;
  isPredefineQuery?: any;
}

type StaticType = {
  name: string;
  id: string;
};

const CustomersDefinition: FC<Props> = ({
  section,
  canDeleteSection = false,
  addNewRule,
  removeRule,
  changeActions,
  dynamicRules,
  isPredefineQuery,
}) => {
  const { selectedBusiness } = useBoundStore();
  const [state, setState] = useState<RuleTypes>(section);
  const [staticSegments, setStaticSegments] = useState<Array<StaticType>>([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const [customerDefinitionsFilters, setCustomerDefinitionsFilters] = useState<
    any[]
  >([]);

  const [
    selectedCustomerDefinitionsFilters,
    setSelectedCustomerDefinitionsFilters,
  ] = useState<Filter[]>([]);

  const [selectedOperator, setSelectedOperator] = useState<
    string | undefined
  >();

  const properties = useMemo(
    () => dynamicRules?.map((option: any) => option.property_name),
    [dynamicRules],
  );

  const rules: Record<string, any> = {};

  if (properties) {
    for (const property of properties) {
      const query = dynamicRules.find(
        (rule: any) => rule.property_name === property,
      );

      if (query) {
        if (property === 'Customers who have') {
          rules[PropertyNames.CUSTOMER_WHO_HAVE] = query?.rules;
        } else if (property === 'Customers who did') {
          rules[PropertyNames.CUSTOMER_WHO_DID] = query?.rules;
        } else if (property === 'Customers who are in/not in') {
          rules[PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN] = query?.rules;
        }
      }
    }
  }

  useEffect(() => {
    const fetchGetAllAudience = async () => {
      await fetchAudiences();
    };

    fetchGetAllAudience();
  }, []);

  useUpdateEffect(() => {
    changeActions(state, section.id);
  }, [state]);

  useUpdateEffect(() => {
    setState((pre) => {
      const update = JSON.parse(JSON.stringify(pre));
      update.filters = selectedCustomerDefinitionsFilters;
      return update;
    });
  }, [selectedCustomerDefinitionsFilters]);

  useEffect(() => {
    setState(section);
  }, [isPredefineQuery]);

  const addNewFilter = () => {
    const lastIndex =
      selectedCustomerDefinitionsFilters[
        selectedCustomerDefinitionsFilters.length - 1
      ]?.id || 0;
    setSelectedCustomerDefinitionsFilters([
      ...selectedCustomerDefinitionsFilters,
      { id: lastIndex + 1 },
    ]);
  };

  const removeFilter = (id: number) => {
    const newFilters = selectedCustomerDefinitionsFilters.filter(
      (filter) => filter.id !== id,
    );
    setSelectedCustomerDefinitionsFilters(newFilters);
  };

  const handleCustomer = (e: any) => {
    setState((pre) => {
      return { ...pre, type: e.target.value };
    });
  };

  const handleAction = (e: any) => {
    if (
      state.type === PropertyNames.CUSTOMER_WHO_HAVE &&
      rules[state.type].fields
    ) {
      setState((pre: RuleTypes) => {
        return {
          field: e.target.value,
          id: pre.id,
          isRule: true,
          operator: DEFAULT_PROPERTY_OPERATOR,
          type: PropertyNames.CUSTOMER_WHO_HAVE,
          value: '',
        } as PropertyRule;
      });
    } else if (state.type === PropertyNames.CUSTOMER_WHO_DID) {
      const type = rules[state.type].actions.find((rule: any) => {
        return rule.name === e.target.value;
      });
      setState((pre: RuleTypes) => {
        return {
          isRule: true,
          id: pre.id,
          frequency: { operator: '', value: '' },
          timeFrame: {
            operator: 'over_all_time',
          },
          type: PropertyNames.CUSTOMER_WHO_DID,
          filters: [],
          action: e.target.value,
        } as ActionRule;
      });

      setCustomerDefinitionsFilters(type.filterFields);
      setSelectedOperator(type.frequencyOperators[0].name);
    } else {
      setState((pre: RuleTypes) => {
        return {
          field: e.target.value,
          id: pre.id,
          isRule: true,
          operator: 'in',
          type: PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN,
          value: '',
        } as PropertyRule;
      });
    }
  };

  const handleChange = (e: any) => {
    setState((pre) => {
      const newPre = JSON.parse(JSON.stringify(pre));
      newPre.frequency.value = e.target.value;
      return newPre;
    });
  };

  const fetchAudiences = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(getAllAudienceSegmentQueries, {
          getAllAudienceSegmentQueryInput: {
            limit: 20,
            business_id: selectedBusiness?.id,
          },
        }),
      );
      if (
        response.data &&
        response.data.getAllAudienceSegmentQueries &&
        response.data.getAllAudienceSegmentQueries.data &&
        response.data.getAllAudienceSegmentQueries.data.length > 0
      ) {
        const allAudienceSegment =
          response.data.getAllAudienceSegmentQueries.data;
        const staticAudienceSegments: {
          name: string;
          id: string;
        }[] = [];
        allAudienceSegment.forEach((element: any) => {
          if (element.type === 'static') {
            staticAudienceSegments.push({
              name: element.group_name,
              id: element.id,
            });
          }
        });
        console.log(staticAudienceSegments);

        setStaticSegments(staticAudienceSegments);
      }
    } catch (error) {
      console.log('error in fetching audeiences', error);
    }
  };

  return (
    <>
      <div className="border border-borderLightColor rounded-lg p-1 w-[92%] relative ">
        <div
          className={`inline-flex items-center relative ${
            selectedCustomerDefinitionsFilters.length > 0
              ? 'border-b border-borderLightColor'
              : ''
          } mx-3 w-[97%]`}
        >
          {properties && properties.length ? (
            <>
              <CustomerTypeSegment
                handleChange={handleCustomer}
                properties={properties}
              />
              <SelectOption
                state={state}
                rules={rules}
                handleAction={handleAction}
              />
              <SelectOperators
                setState={setState}
                state={state}
                rules={rules}
              />
              {state.type === PropertyNames.CUSTOMER_WHO_DID &&
                state?.action && (
                  <input
                    className="focus-visible:outline-0 ml-3 max-w-[75px]"
                    placeholder={`Value`}
                    value={state.frequency.value || ''}
                    min={0}
                    type={'text'}
                    onChange={handleChange}
                  />
                )}

              {state.type === PropertyNames.CUSTOMER_WHO_DID &&
              state?.action ? (
                <ActionSegment
                  state={state}
                  setState={setState}
                  rules={rules}
                />
              ) : state.type === PropertyNames.CUSTOMER_WHO_HAVE ? (
                <PropertySegment
                  state={state}
                  rules={rules}
                  setState={setState}
                />
              ) : state.type === PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN ? (
                <InSegment
                  state={state}
                  segment={staticSegments}
                  setState={setState}
                />
              ) : (
                <></>
              )}
              {state.type === PropertyNames.CUSTOMER_WHO_DID &&
                selectedOperator &&
                customerDefinitionsFilters.length > 0 && (
                  <button className="ml-2" onClick={addNewFilter}>
                    <i
                      className="icon-filter text-2xl mr-2 text-darkGrade75"
                      id="filter"
                    />
                    <Tooltip
                      title={'Add filter'}
                      anchorId={'filter' as string}
                      place="top"
                    />
                  </button>
                )}
            </>
          ) : (
            <></>
          )}
        </div>
        {selectedCustomerDefinitionsFilters.length > 0 && (
          <div className="mt-3">
            {selectedCustomerDefinitionsFilters.map((filter, index) => (
              <CustomerDefinitionFilter
                filtersOptions={customerDefinitionsFilters}
                currentFilter={selectedCustomerDefinitionsFilters[index]}
                selectedCustomerDefinitionsFilters={
                  selectedCustomerDefinitionsFilters
                }
                setSelectedCustomerDefinitionsFilters={
                  setSelectedCustomerDefinitionsFilters
                }
                key={index}
                query={index === 0 ? 'Where' : 'And'}
                addFilter={
                  index === selectedCustomerDefinitionsFilters.length - 1 &&
                  addNewFilter
                }
                removeFilter={() => removeFilter(filter.id)}
              />
            ))}
          </div>
        )}

        {canDeleteSection && (
          <button
            className="absolute top-2 right-[-20px] bg-white border border-borderLightColor rounded-full p-2 text-textWarning"
            onClick={() => removeRule(section.id)}
          >
            <DeleteIcon width={18} height={18} fill="#F67063" />
          </button>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button className="border border-borderLightColor rounded-lg p-3 mr-2">
          <PlusIcon width={24} height={24} fill="#32C4D5" />
        </button>

        <div
          className={`z-10 absolute left-[-120px] mt-2 w-[180px] max-h-[200px] overflow-y-auto rounded-lg shadow-lg bg-white border border-borderLightColor ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          } transition-opacity  duration-300`}
          role="menu"
          aria-orientation="vertical"
        >
          <span
            className="text-textSecondaryColor block px-4 py-2 text-sm hover:bg-greyLight"
            role="menuitem"
            onClick={() => {
              addNewRule(LogicalOperator.And, section.id);
            }}
          >
            And
          </span>
          <span
            className="text-textSecondaryColor block px-4 py-2 text-sm hover:bg-greyLight"
            role="menuitem"
            onClick={() => {
              addNewRule(LogicalOperator.Or, section.id);
            }}
          >
            Or
          </span>
        </div>
      </div>
    </>
  );
};

export default CustomersDefinition;
