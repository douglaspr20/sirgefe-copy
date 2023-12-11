'use client';
import {
  ActionRule,
  PropertyRule,
  Rule,
  PropertyNames,
  Operators,
} from '@utils/dynamic-query-builder-types';
import React, { useCallback, useState } from 'react';
import { useBoundStore } from '@store/index';

type BasicinfoProps = {
  cities: string[];
  countries: string[];
  states: string[];
};

const BasicInformation = ({ cities, countries, states }: BasicinfoProps) => {
  const { dynamicSegment, setDynamicSegment } = useBoundStore();

  const handleChange = useCallback(
    (e: any, location: string) => {
      let prevDynamicSegment = JSON.parse(JSON.stringify(dynamicSegment));

      if (
        !prevDynamicSegment.rules.some(
          (item: PropertyRule) => item.field === location,
        )
      ) {
        prevDynamicSegment.rules.push({
          type: PropertyNames.CUSTOMER_WHO_HAVE,
          field: location,
          operator: Operators.Equal,
          value: e.target.value,
          isRule: true,
        } as PropertyRule);
        setDynamicSegment(prevDynamicSegment);
        console.log(prevDynamicSegment);
      } else {
        prevDynamicSegment.rules.map((rule: PropertyRule) => {
          if (
            rule.type === PropertyNames.CUSTOMER_WHO_HAVE &&
            rule.field === location
          ) {
            rule.value = e.target.value;
          }
        });

        console.log(prevDynamicSegment);

        setDynamicSegment(prevDynamicSegment);
      }
    },
    [dynamicSegment],
  );

  function isPropertyRule(
    item: Rule | PropertyRule | ActionRule,
  ): item is PropertyRule {
    return (item as PropertyRule).field !== undefined;
  }

  return (
    <div className="widget-container mb-6 p-5 w-[25%] h-full mr-3">
      <div className="flex items-center pb-3">
        <h5 className="h5 text-textSecondaryColor">Basic information</h5>
      </div>
      <div>
        <ul role="list" className="">
          <li className="flex items-center border-b border-borderLightColor">
            <p className="text-sm font-medium leading-4 text-gray-900 mr-8    ">
              State
            </p>
            <select
              onChange={(e) => handleChange(e, 'state')}
              className="px-4 pr-9 max-w-[140px] border-none rounded-md text-sm text-textTeriraryColor focus:text-textSecondaryColor"
              value={
                (
                  dynamicSegment.rules.find(
                    (item) => isPropertyRule(item) && item.field === 'state',
                  ) as PropertyRule | undefined
                )?.value || ''
              }
            >
              <option key="column" value="" defaultChecked hidden>
                States
              </option>
              {states
                .filter((item) => item !== 'null')
                .map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </li>

          <li className="flex items-center border-b border-borderLightColor">
            <p className="text-sm font-medium leading-4 text-gray-900 mr-8    ">
              Country
            </p>
            <select
              onChange={(e) => handleChange(e, 'country')}
              className="px-4 pr-9 max-w-[140px] border-none rounded-md text-sm text-textTeriraryColor focus:text-textSecondaryColor"
              value={
                (
                  dynamicSegment.rules.find(
                    (item) => isPropertyRule(item) && item.field === 'country',
                  ) as PropertyRule | undefined
                )?.value || ''
              }
            >
              <option key="column" value="" defaultChecked hidden>
                Country
              </option>
              {countries
                .filter((item) => item !== 'null')
                .map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </li>

          <li className="flex items-center border-b border-borderLightColor">
            <p className="text-sm font-medium leading-4 text-gray-900 mr-8    ">
              City
            </p>
            <select
              onChange={(e) => handleChange(e, 'city')}
              className="px-4 pr-9 max-w-[140px] border-none rounded-md text-sm text-textTeriraryColor focus:text-textSecondaryColor"
              value={
                (
                  dynamicSegment.rules.find(
                    (item) => isPropertyRule(item) && item.field === 'city',
                  ) as PropertyRule | undefined
                )?.value || ''
              }
            >
              <option key="column" value="" defaultChecked hidden>
                City
              </option>
              {cities
                .filter((item) => item !== 'null')
                .map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasicInformation;
