import React from 'react';

const InOperators = ({ operators, setState, state }: any) => {
  const handleOperator = (e: any) => {
    let name = e.target.value;
    setState((pre: any) => {
      return {
        ...pre,
        operator: name,
      };
    });
  };
  return (
    <div className="pr-1 mr-4 relative after:content-[''] after:block after:absolute after:h-5 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
      <select
        id="select2"
        name="select2"
        className="border-none"
        onChange={handleOperator}
        value={state?.operator}
      >
        <option value="" hidden={!state?.operator}>
          Operator
        </option>

        {operators?.map((operator: any) => (
          <option key={operator.name} value={operator.name}>
            {operator.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InOperators;
