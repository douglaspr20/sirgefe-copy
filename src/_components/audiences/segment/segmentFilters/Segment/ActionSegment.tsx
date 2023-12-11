import MinusIcon from '@assets/icons/MinusIcon';
import PlusIcon from '@assets/icons/PlusIcon';
import Calendar from '_components/Calendar';
import { useBoundStore } from '@store/index';
import { ActionRule, RuleTypes } from '@utils/dynamic-query-builder-types';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

type ActionSegmentProps = {
  state: ActionRule;
  setState: Dispatch<SetStateAction<RuleTypes>>;
  rules: any;
};

const ActionSegment = ({ state, setState, rules }: ActionSegmentProps) => {
  const { userProfile } = useBoundStore();
  const type = rules[state.type]?.actions.find((rule: any) => {
    return rule.name === state.action;
  });
  const [timeFrameOperators, setTimeFrameOperators] = useState<any>(
    type?.timeFrameOperators,
  );

  useEffect(() => {
    setTimeFrameOperators(type?.timeFrameOperators);
  }, [state.action]);

  const handleSelectTimeFrame = (e: any) => {
    let name = e.target.value;
    const defaultValue =
      name.includes('between') && !name?.includes('date')
        ? { start: 1, end: 0 }
        : 0;

    setState((pre: RuleTypes) => {
      return {
        ...pre,
        timeFrame: {
          operator: name,
        },
      };
    });
  };
  const handleSelectTimeFrameoption = (e: any) => {
    let name = e.target.value;

    setState((pre: any) => {
      return {
        ...pre,
        timeFrame: {
          ...pre.timeFrame,
          dimension: Number(name),
        },
      };
    });
  };

  const handleValueChange = (newValue: DateValueType) => {
    if (newValue?.startDate && newValue.endDate) {
      const date = {
        startDate: dayjs(newValue.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(newValue.endDate).format('YYYY-MM-DD'),
      };
      let newtimeFrame = {};
      if (date.startDate === date.endDate) {
        newtimeFrame = {
          ...state.timeFrame,
          xDate: date.startDate,
        };
      } else {
        newtimeFrame = {
          ...state.timeFrame,
          xDate: date.startDate,
          yDate: date.endDate,
        };
      }

      setState((pre: any) => {
        return {
          ...pre,
          timeFrame: newtimeFrame,
        };
      });
    }
  };

  const handleValue = (sign: string, between?: string) => {
    setState((pre: RuleTypes) => {
      const update = JSON.parse(JSON.stringify(pre));
      if (
        update.timeFrame.operator.includes('between') &&
        !update.timeFrame.operator.includes('date')
      ) {
        update.timeFrame = update.timeFrame || {
          ...update.timeFrame,
          xDimension: 1,
          yDimension: 0,
        };
        if (between === '1') {
          if (sign === '+') {
            update.timeFrame.xDimension =
              (update.timeFrame?.xDimension || 0) + 1;
            update.timeFrame.yDimension = Math.min(
              update.timeFrame?.xDimension - 1,
              update.timeFrame.yDimension,
            );
          } else if (sign === '-' && update.timeFrame.xDimension > 1) {
            update.timeFrame.xDimension =
              (update.timeFrame?.xDimension || 0) - 1;
          }
        } else if (between === '2') {
          if (sign === '+') {
            update.timeFrame.yDimension =
              (update.timeFrame?.yDimension || 0) + 1;
          } else if (sign === '-' && update.timeFrame?.yDimension !== 0) {
            update.timeFrame.yDimension =
              (update.timeFrame?.yDimension || 0) - 1;
          }
        }
      } else {
        if (sign === '+') {
          update.timeFrame.xDimension = (update.timeFrame.xDimension || 0) + 1;
        } else if (sign === '-' && update.timeFrame.xDimension !== 0) {
          update.timeFrame.xDimension = (update.timeFrame.xDimension || 0) - 1;
        }
      }
      return update;
    });
  };

  return (
    <>
      {timeFrameOperators && (
        <div className="pr-1">
          <select
            id="select-order-value"
            name="select-order-value"
            className="border-none"
            onChange={handleSelectTimeFrame}
            value={state?.timeFrame.operator}
          >
            {timeFrameOperators.map((operator: any) => (
              <option key={operator.name} value={operator.name}>
                {operator.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {state?.timeFrame.operator &&
        state?.timeFrame.operator !== 'over_all_time' && (
          <div className="ml-2 flex items-center">
            {state?.timeFrame.operator?.includes('date') ? (
              <Calendar
                timezone={userProfile?.timezone || 'America/Chicago'}
                value={{
                  startDate: state?.timeFrame.xDate || new Date(),
                  endDate: state?.timeFrame.xDate || new Date(),
                }}
                onChange={handleValueChange}
                cssClass="border-none !min-w-[110px] !w-[110px]"
                asSingle
              />
            ) : (
              <div className="flex items-center">
                <div className="flex items-center ">
                  <button
                    className="mx-2"
                    onClick={(e) => handleValue('-', '1')}
                  >
                    <MinusIcon width={18} height={18} fill="#A1B3C4" />
                  </button>
                  <span>{state.timeFrame?.xDimension || 0}</span>
                  <button
                    className="ml-1"
                    onClick={(e) => handleValue('+', '1')}
                  >
                    <PlusIcon width={18} height={18} fill="#A1B3C4" />
                  </button>
                </div>
              </div>
            )}

            {state?.timeFrame.operator?.includes('between') && (
              <span className="mx-1">And</span>
            )}

            {state?.timeFrame.operator?.includes('between') &&
            state?.timeFrame.operator?.includes('date') ? (
              <Calendar
                timezone={userProfile?.timezone || 'America/Chicago'}
                value={{
                  startDate: state?.timeFrame.yDate || new Date(),
                  endDate: state?.timeFrame.yDate || new Date(),
                }}
                onChange={handleValueChange}
                cssClass="border-none !min-w-[110px] !w-[110px]"
                asSingle
              />
            ) : state?.timeFrame.operator?.includes('between') &&
              !state?.timeFrame.operator?.includes('date') ? (
              <div className="flex items-center">
                <div className="flex items-center ">
                  <button
                    className="mx-2"
                    onClick={(e) => handleValue('-', '2')}
                  >
                    <MinusIcon width={18} height={18} fill="#A1B3C4" />
                  </button>
                  <span>{state.timeFrame?.yDimension || 0}</span>
                  <button
                    className="ml-2"
                    onClick={(e) => handleValue('+', '2')}
                  >
                    <PlusIcon width={18} height={18} fill="#A1B3C4" />
                  </button>
                </div>
              </div>
            ) : null}

            {!state?.timeFrame?.operator.includes('date') && (
              <select
                id="select-order"
                name="select-order"
                className="border-none"
                onChange={handleSelectTimeFrameoption}
                value={state.timeFrame.dimension}
              >
                {rules[state.type]?.actions
                  ?.find((action: any) => action.name === state?.action)
                  .timeFrameOperatorOptions?.map((operator: any) => (
                    <option key={operator.name} value={operator.name}>
                      {operator.label}
                    </option>
                  ))}
              </select>
            )}

            {state?.timeFrame.operator?.includes('between') &&
              !state?.timeFrame.operator.includes('dates') && (
                <span className="mx-1">Ago</span>
              )}
          </div>
        )}
    </>
  );
};

export default ActionSegment;
