import DeleteIcon from '@assets/icons/DeleteIcon';
import { subtractDaysFromCurrentDate } from '_layout/SegmentLayout.client';
import { useBoundStore } from '@store/index';
import {
  ActionRule,
  DEFAULT_PROPERTY_OPERATOR,
  LogicalOperator,
  Operators,
  PredefinedQueries,
  PropertyNames,
  PropertyRule,
  Rule,
  RuleTypes,
} from '@utils/dynamic-query-builder-types';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomersDefinition from './CustomersDefinition';

const customersType = [
  'Best buyers',
  'Big Spenders',
  'Loyal Customers',
  'New Customers',
  'Abandoned Carts',
  'Discount Buyers',
  'Inactive Customers',
  'Reviewers',
  'High AOV',
];

type CustomersDefinitionsProp = {
  dynamicRules: any;
  predefinedQueries?: PredefinedQueries;
};

const CustomersDefinitions = ({
  dynamicRules,
  predefinedQueries,
}: CustomersDefinitionsProp) => {
  const params = useSearchParams();

  const segmentType = params?.get('segmentType') || 'Dynamic';
  const { dynamicSegment, setDynamicSegment } = useBoundStore();
  const [customerDefinitionSection, setCustomerDefinitionSection] =
    useState<Rule>(dynamicSegment.rules[0] as Rule);
  const [isPredefineQuery, setIsPredefineQuery] = useState<any>({});

  useEffect(() => {
    const updatedRule: Rule = JSON.parse(JSON.stringify(dynamicSegment));
    updatedRule.rules[0] = customerDefinitionSection;
    setDynamicSegment(updatedRule);
  }, [customerDefinitionSection]);

  useEffect(() => {
    // Check if 'created_at' is not already present in the rules
    const isTrue = dynamicSegment.rules
      .filter((x) => x.type === PropertyNames.CUSTOMER_WHO_HAVE)
      .some((item) => (item as PropertyRule).field === 'created_at');

    if (segmentType === 'Static' && !isTrue) {
      const currentDynamicSegment = dynamicSegment;
      const updateRule: Rule = {
        ...currentDynamicSegment,
        rules: [
          ...currentDynamicSegment.rules,
          {
            id: '0.1',
            type: PropertyNames.CUSTOMER_WHO_HAVE,
            field: 'created_at',
            isRule: true,
            operator: 'greaterThanEqual',
            value: subtractDaysFromCurrentDate(30),
          },
          {
            id: '0.2',
            type: PropertyNames.CUSTOMER_WHO_HAVE,
            field: 'created_at',
            isRule: true,
            operator: 'lessThanEqual',
            value: subtractDaysFromCurrentDate(),
          },
        ],
      };
      setDynamicSegment(updateRule);
    }
  }, []);

  function addRuleToParentById(
    rootRule: Rule,
    parentId: string,
    logicalOperator: LogicalOperator,
  ): Rule {
    const newRule = {
      isRule: true,
      type: PropertyNames.CUSTOMER_WHO_HAVE,
      field: DEFAULT_PROPERTY_OPERATOR,
      operator: Operators.Equal,
      value: '',
    };

    function addRuleToRuleGroup(
      rule: Rule | RuleTypes,
      parentRule: Rule | undefined,
    ): (Rule | RuleTypes)[] {
      if (rule.type === PropertyNames.GROUP) {
        rule.rules.push({
          id: `${rule.id}.${rule.rules.length + 1}`,
          ...newRule,
        } as PropertyRule);
      } else {
        // If the operator is the same, add the new rule to the parentRule rules array,
        // otherwise, create a new group
        if (parentRule?.logicalOperator === logicalOperator) {
          return [
            rule,
            {
              id: `${parentRule.id}.${parentRule.rules.length + 1}`,
              ...newRule,
            } as PropertyRule,
          ];
        } else {
          // Create a new rule group with the parentRule and the new rule
          const newRuleGroup: Rule = {
            id: rule.id,
            logicalOperator: logicalOperator,
            isRuleGroup: true,
            type: PropertyNames.GROUP,
            rules: [
              { ...rule, id: `${rule.id}.1` },
              {
                id: `${rule.id}.2`,
                ...newRule,
              } as PropertyRule,
            ],
          };
          return [newRuleGroup as Rule];
        }
      }
      return [rule];
    }

    function recursivelyAddRule(
      rule: Rule | PropertyRule | ActionRule,
      parentId: string,
      parentRule: Rule | undefined,
    ): (Rule | PropertyRule | ActionRule)[] {
      if (rule.id === parentId) {
        return addRuleToRuleGroup(rule, parentRule) as Rule[];
      } else if (rule.type === PropertyNames.GROUP && rule.rules) {
        // Recursively search for the parent rule inside rule groups
        rule.rules = rule.rules
          .map((childRule) => recursivelyAddRule(childRule, parentId, rule))
          .flatMap((x) => x);
      }
      return [rule];
    }

    return recursivelyAddRule(rootRule, parentId, undefined)[0] as Rule;
  }

  const addNewRule = (
    newLogicalOperatorValue: LogicalOperator,
    parentId: string,
  ) => {
    const updatedSection = JSON.parse(
      JSON.stringify(customerDefinitionSection),
    );

    addRuleToParentById(updatedSection, parentId, newLogicalOperatorValue);

    setCustomerDefinitionSection(updatedSection);
  };

  const removeRule = (parentId: string) => {
    const updatedSection = JSON.parse(
      JSON.stringify(customerDefinitionSection),
    );
    const newSection = removeRuleByParentId(updatedSection, parentId) as Rule;
    setCustomerDefinitionSection(newSection);
  };

  const removeRuleByParentId = (rootRule: Rule, parentId: string): Rule => {
    const removeRuleFromRuleGroup = (rule: Rule): Rule => {
      if (rule.rules) {
        rule.rules = rule.rules.filter((childRule) => {
          if (childRule.id === parentId) {
            // Rule found, remove it
            return false;
          } else if (childRule.type === PropertyNames.GROUP) {
            // Recursively search for the rule inside rule groups
            removeRuleFromRuleGroup(childRule);
          }
          return true;
        });

        // Check if there's only one child left in the parent group
        if (rule.rules.length === 1 && rule.type === PropertyNames.GROUP) {
          // If so, make the remaining child the new parent
          const remainingChild = rule.rules[0];
          if (
            remainingChild.type === PropertyNames.GROUP &&
            remainingChild.rules
          ) {
            // Assign the remaining child's rules to the parent
            rule.rules = remainingChild.rules;
            // Remove the unnecessary level of nesting
            rule.type = remainingChild.type;
          }
        }
      }
      return rule;
    };

    return removeRuleFromRuleGroup(rootRule);
  };

  const deleteSection = (sectionId: string, parentSection: Rule): Rule => {
    const updatedSection = { ...parentSection };

    updatedSection.rules = updatedSection.rules?.filter((childSection) => {
      if (childSection.id === sectionId) {
        return false;
      } else if (childSection.type === PropertyNames.GROUP) {
        // Recursively remove the section from child sections
        childSection = deleteSection(sectionId, childSection);
      }
      return true;
    });

    return updatedSection;
  };

  // Usage: Call this function to delete a section and its children
  const handleDeleteSection = (sectionId: string) => {
    setCustomerDefinitionSection((prevSection: Rule) => {
      return deleteSection(sectionId, prevSection);
    });
  };

  // const changeLogicalOperator = (
  //   logicalOperator: LogicalOperator,
  //   ruleId: string,
  // ) => {
  //   // Create a deep copy of the current state
  //   const updatedSection = JSON.parse(
  //     JSON.stringify(customerDefinitionSection),
  //   );

  //   // Function to update the logical operator in the section
  //   const updateLogicalOperatorInSection = (section: Rule) => {
  //     if (section.id === ruleId) {
  //       section.logicalOperator = logicalOperator;
  //     } else {
  //       (
  //         section.rules?.filter((x) => x.type === PropertyNames.GROUP) as Rule[]
  //       ).forEach(updateLogicalOperatorInSection);
  //     }
  //   };

  //   // Update the logical operator in the copied state
  //   updateLogicalOperatorInSection(updatedSection);

  //   // Set the state with the updated section
  //   setCustomerDefinitionSection(updatedSection);
  // };

  const changeLogicalOperator = (
    logicalOperator: LogicalOperator,
    ruleId: string,
  ) => {
    const updatedSection = JSON.parse(
      JSON.stringify(customerDefinitionSection),
    );

    const updateLogicalOperatorInSection = (section: Rule | undefined) => {
      if (section) {
        if (section.id === ruleId) {
          section.logicalOperator = logicalOperator;
        } else if (section.rules) {
          section.rules.forEach((rule) => {
            updateLogicalOperatorInSection(rule as Rule);
          });
        }
      }
    };

    updateLogicalOperatorInSection(updatedSection);

    setCustomerDefinitionSection(updatedSection);
  };

  const handleChange = (actions: Rule, ruleId: string) => {
    const updateLogicalOperatorInSection = (section: Rule): Rule => {
      if (section.id === ruleId) {
        // Update the logical operator for the matching section
        return { ...actions };
      } else {
        // Recursively update child sections
        const updatedRules = section.rules?.map((i) =>
          updateLogicalOperatorInSection(i as Rule),
        );
        return { ...section, rules: updatedRules };
      }
    };

    setCustomerDefinitionSection((prevSection) => {
      const updatedSection = updateLogicalOperatorInSection({ ...prevSection });

      return updatedSection;
    });
  };

  const handleChangeDate = (e: any) => {
    const updatedDynamicSegment = JSON.parse(JSON.stringify(dynamicSegment));

    updatedDynamicSegment.rules.forEach((item: PropertyRule) => {
      if (
        item.field === 'created_at' &&
        item.operator === 'greaterThanOrEqual'
      ) {
        item.value = subtractDaysFromCurrentDate(Number(e.target.value));
      }
    });

    setDynamicSegment(updatedDynamicSegment);
  };

  function toCamelCase(str: string): string {
    return str
      .toLowerCase() // Convert to lowercase
      .split(' ') // Split into words
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join('');
  }
  const handlePredefineQuery = (customerType: string) => {
    const camelCaseKey = toCamelCase(customerType);

    let query;
    if (predefinedQueries) {
      query = predefinedQueries[camelCaseKey as keyof PredefinedQueries];
    }

    if (query && Object.keys(query).length > 0) {
      console.log(`Found query for ${camelCaseKey}:`, query);
      setDynamicSegment(query);
      setCustomerDefinitionSection(query.rules[0] as Rule);
      setIsPredefineQuery(query);
    } else {
      console.log(`No query found for ${camelCaseKey}, or the query is empty`);
    }
  };

  return (
    <div className="widget-container min-h-[75vh] p-5 w-full mb-6">
      <div className="flex pb-4 border-b border-extraLightColor cursor-pointer">
        {customersType.map((customerType) => (
          <span
            key={customerType}
            className="tag grey text-textSecondaryColor mr-2"
            onClick={() => handlePredefineQuery(customerType)}
          >
            {customerType}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="h6 font-semibold ">Custom definitions</span>
        {segmentType === 'Static' && (
          <div className="flex items-center w-[30%]">
            <p className="color-[#A0A8AF] text-[12px] w-[40%]">
              Segment based on{' '}
            </p>
            <select
              defaultValue={30}
              className="w-[60%]"
              onChange={handleChangeDate}
            >
              <option value={30}>Last 30 Days</option>
              <option value={60}>Last 60 Days</option>
              <option value={90}>Last 90 Days</option>
            </select>
          </div>
        )}
      </div>
      <RenderSectionsAndRules
        section={customerDefinitionSection}
        addNewRule={addNewRule}
        removeRule={removeRule}
        changeLogicalOperator={changeLogicalOperator}
        handleDeleteSection={handleDeleteSection}
        handleChange={handleChange}
        dynamicRules={dynamicRules}
        isPredefineQuery={isPredefineQuery}
      />
    </div>
  );
};

export default CustomersDefinitions;

interface RenderSectionsAndRulesProps {
  section: Rule;
  addNewRule: (
    newLogicalOperatorValue: LogicalOperator,
    parentId: string,
  ) => void;
  removeRule: (id: string) => void;
  handleDeleteSection: (sectionId: string) => void;
  changeLogicalOperator: (
    logicalOperator: LogicalOperator,
    ruleId: string,
  ) => void;
  handleChange: (fields: Rule, ruleId: string) => void;
  dynamicRules: any;
  isPredefineQuery?: any;
}

const RenderSectionsAndRules = ({
  section,
  addNewRule,
  removeRule,
  changeLogicalOperator,
  handleDeleteSection,
  handleChange,
  dynamicRules,
  isPredefineQuery,
}: RenderSectionsAndRulesProps) => {
  return (
    <>
      <div key={section.id}>
        <div
          className={`mt-2 ${
            section.rules?.length
              ? 'p-3 border border-extraLightColor rounded-lg'
              : ''
          }`}
        >
          {section.id !== '1' && (
            <button
              className="flex item-center ml-auto p-2 text-textWarning"
              onClick={() => {
                handleDeleteSection(section.id);
              }}
            >
              <DeleteIcon width={18} height={18} fill="#F67063" />
              <p className="ml-1 text-[#F67063]">Delete section</p>
            </button>
          )}

          {section.rules &&
            section.rules.length > 0 &&
            section.rules.map((rule) => {
              if (rule.type === PropertyNames.GROUP) {
                return (
                  <>
                    <RenderSectionsAndRules
                      section={rule}
                      addNewRule={addNewRule}
                      removeRule={removeRule}
                      handleDeleteSection={handleDeleteSection}
                      changeLogicalOperator={changeLogicalOperator}
                      handleChange={handleChange}
                      dynamicRules={dynamicRules}
                    />
                    {/* <LogicalOperatorComponent
                      section={section}
                      changeLogicalOperator={changeLogicalOperator}
                    ></LogicalOperatorComponent> */}
                  </>
                );
              } else {
                return (
                  <>
                    <div
                      key={section.id}
                      className="flex flex-col mt-3 w-full justify-between"
                    >
                      <div className="flex items-end mt-3 w-full justify-between">
                        <CustomersDefinition
                          section={rule}
                          canDeleteSection={section.id !== '1'}
                          addNewRule={addNewRule}
                          removeRule={removeRule}
                          changeActions={handleChange}
                          dynamicRules={dynamicRules}
                          isPredefineQuery={isPredefineQuery}
                        />
                      </div>
                    </div>
                    {section.id + '.1' == section.rules[0].id && (
                      <LogicalOperatorComponent
                        section={section}
                        changeLogicalOperator={changeLogicalOperator}
                      ></LogicalOperatorComponent>
                    )}
                  </>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

const LogicalOperatorComponent = ({
  section,
  changeLogicalOperator,
}: {
  section: Rule;
  changeLogicalOperator: (operator: LogicalOperator, id: string) => void;
}) => {
  return (
    <div className="mt-3 bg-white relative">
      <div className="p-1.5 rounded-md inline-flex items-center justify-center bg-greyLight logic-switcher">
        <div className="logic-switcher__item mr-1 last:mr-0">
          <input
            type="radio"
            id={`and-${section.id}`}
            checked={section.logicalOperator === LogicalOperator.And}
            readOnly
            onChange={() =>
              changeLogicalOperator(LogicalOperator.And, section.id)
            }
          />
          <label htmlFor={`and-${section.id}`}>And</label>
        </div>
        <div className="logic-switcher__item mr-1 last:mr-0">
          <input
            id={`or-${section.id}`}
            type="radio"
            checked={section.logicalOperator === LogicalOperator.Or}
            readOnly
            onChange={() =>
              changeLogicalOperator(LogicalOperator.Or, section.id)
            }
          />
          <label htmlFor={`or-${section.id}`}>Or</label>
        </div>
      </div>
    </div>
  );
};
