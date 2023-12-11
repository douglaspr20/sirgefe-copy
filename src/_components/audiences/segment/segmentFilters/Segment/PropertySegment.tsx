import Calendar from '_components/Calendar';
import { useBoundStore } from '@store/index';
import { PropertyNames, RuleTypes } from '@utils/dynamic-query-builder-types';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

const PropertySegment = ({
  rules,
  state,
  setState,
}: {
  rules: any;
  state: RuleTypes;
  setState: Dispatch<SetStateAction<RuleTypes>>;
}) => {
  const { userProfile } = useBoundStore();

  const handleValueChange = (newValue: DateValueType) => {
    if (newValue?.startDate && newValue.endDate) {
      setState((pre: RuleTypes) => {
        const newState = JSON.parse(JSON.stringify(pre));
        newState.value = {
          startDate: dayjs(newValue.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(newValue.endDate).format('YYYY-MM-DD'),
        };
        return newState;
      });
    }
  };

  const handleValue = (e: any, type = 'string') => {
    setState((pre: RuleTypes) => {
      const newState = JSON.parse(JSON.stringify(pre));
      if (type === 'number') {
        newState.value = Number(e.target.value);
      } else {
        newState.value = e.target.value;
      }
      return newState;
    });
  };

  return (
    <>
      {state.type === PropertyNames.CUSTOMER_WHO_HAVE &&
        state.field !== '' &&
        state.operator !== '' && (
          <div className="pr-1 mr-4">
            {rules[state.type]?.fields?.find(
              (field: any) => field.name === state.field,
            )?.operatorOptions &&
            rules[state.type]?.fields?.find(
              (field: any) => field.name === state.field,
            )?.operatorOptions[state.operator] ? (
              <select
                id="select2"
                name="select2"
                className="border-none"
                onChange={(e) => handleValue(e, 'number')}
                value={state.value}
              >
                <option value="" hidden>
                  Value
                </option>

                {rules[state.type]?.fields
                  ?.find((field: any) => field.name === state.field)
                  ?.operatorOptions[state.operator].map((option: any) => (
                    <option key={option.name} value={option.name}>
                      {option.label}{' '}
                    </option>
                  ))}
              </select>
            ) : (rules[state.type]?.fields?.find(
                (field: any) => field.name === state.field,
              )?.operatorDataTypes &&
                state.operator !== 'inTheNextXDays') ||
              rules[state.type]?.fields?.find(
                (field: any) => field.name === state.field,
              )?.dataType === 'date' ? (
              <Calendar
                timezone={userProfile?.timezone || 'America/Chicago'}
                value={state.value}
                onChange={handleValueChange}
                cssClass="border-none"
                maxDate={false}
                asSingle
              />
            ) : (
              <input
                className="focus-visible:outline-0 ml-3 max-w-[75px]"
                placeholder={`Value`}
                value={state.value || ''}
                min={0}
                type={
                  state.operator === 'inTheNextXDays'
                    ? rules[state.type]?.fields?.find(
                        (field: any) => field.name === state.field,
                      )?.operatorDataTypes.inTheNextXDays
                    : rules[state.type]?.fields?.find(
                        (field: any) => field.name === state.field,
                      )?.dataType || 'text'
                }
                onChange={(e) =>
                  handleValue(
                    e,
                    rules[state.type]?.fields?.find(
                      (field: any) => field.name === state.field,
                    )?.dataType || 'text',
                  )
                }
              />
            )}
          </div>
        )}
    </>
  );
};

export default PropertySegment;
