import React, { useEffect, useState } from 'react';
import { campaignColumns } from '@interfaces/performance';
import { useBoundStore } from '@store/index';

type PerformanceFilterProps = {
  RemoveFilterProps: (data: any) => void;
  handleColumnChange: (data: any) => void;
  handleRadioChange: (data: any) => void;
  setLogicalOperator: (data: any) => void;
  logicalOperator: any;
  filterId: any;
  filters: {
    column: string;
    columnValue: string;
    filterId: number;
    logicalOperator: string;
    operator: string;
  };
};
const AddFilter = (props: PerformanceFilterProps) => {
  const { currentPurchase, currentPlatform, faceBookToggle } =
    useBoundStore.getState();

  const [insertColumns, setInsertColumns] = useState<any>([]);
  const [currentColumn, setCurrentColumn] = useState<string | undefined>();
  const [currentColumnValue, setCurrentColumnValue] = useState<
    string | undefined
  >();
  const [currentOperator, setCurrentOperator] = useState<string | undefined>();

  useEffect(() => {
    const temp = campaignColumns(currentPurchase).filter(
      (item) => item.customFilter,
    );
    setInsertColumns(temp);
  }, [currentPurchase, currentPlatform, faceBookToggle]);

  const handleColumnChange = (e: any) => {
    const data = {
      e: e,
      filterId: props.filterId,
    };
    props.handleColumnChange(data);
  };

  const handleRadioChange = (e: any) => {
    props.setLogicalOperator(!props.logicalOperator);
    const data = {
      logicalOperator: !props.logicalOperator,
      filterId: props.filterId,
    };
    props.handleRadioChange(data);
  };

  const RemoveFilter = () => {
    props.RemoveFilterProps(props.filterId);
  };

  useEffect(() => {
    setCurrentColumn(props.filters.column);
    setCurrentColumnValue(props.filters.columnValue);
    setCurrentOperator(props.filters.operator);
  }, [props.filters]);

  return (
    <>
      <div className="inline-flex items-end mb-3">
        <div className="flex flex-col mr-2">
          <label className="form-label read-only" htmlFor="column">
            Column
          </label>
          <div>
            <select
              className="select"
              name="column"
              value={currentColumn}
              onChange={(e) => {
                setCurrentColumn(e.target.value);
                handleColumnChange(e);
              }}
            >
              <option key="column" value="" defaultChecked hidden>
                Pick Column
              </option>

              {insertColumns.map((item: any, index: any) => (
                <option key={index} value={item.accessorKey}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col mr-2">
          <label className="form-label read-only" htmlFor="operator">
            Operator
          </label>
          <div>
            <select
              className="select"
              name="operator"
              value={currentOperator}
              onChange={(e) => {
                setCurrentOperator(e.target.value);
                handleColumnChange(e);
              }}
            >
              <option key="operator" value="" defaultChecked hidden>
                Pick Operator
              </option>
              <option key="Greater than" value="Greater than">
                Greater Than
              </option>
              <option key="Equals" value="Equals">
                Equals
              </option>
              <option key="Less than" value="Less than">
                Less Than
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mr-2 max-w-[120px]">
          <label className="form-label read-only" htmlFor="val">
            {' '}
            Value{' '}
          </label>
          <div>
            <input
              className="input"
              placeholder="Input Value"
              type="text"
              name="columnValue"
              value={currentColumnValue}
              onChange={(e) => {
                setCurrentColumnValue(e.target.value);
                handleColumnChange(e);
              }}
            />
          </div>
        </div>
        <div className="flex items-end pb-1 remove-filter">
          <button
            className="text-xl text-darkGrade50 hover:text-darkGrade75 transition-all"
            onClick={() => {
              RemoveFilter();
            }}
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mb-2.5 relative logic-switcher__container">
        <div className="bg-white pl-3 pr-3 relative z-10">
          <div className="p-1.5 rounded-md inline-flex items-center justify-center bg-greyLight logic-switcher">
            <div className="logic-switcher__item mr-1 last:mr-0">
              <input
                type="radio"
                id={`AND${props.filterId}`}
                checked={props.logicalOperator}
                readOnly
              />
              <label htmlFor="and" onClick={handleRadioChange}>
                And
              </label>
            </div>
            <div className="logic-switcher__item mr-1 last:mr-0">
              <input
                id={`OR${props.filterId}`}
                type="radio"
                checked={!props.logicalOperator}
                readOnly
              />
              <label htmlFor="or" onClick={handleRadioChange}>
                Or
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilter;
