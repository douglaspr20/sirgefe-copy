import React, { useEffect, useState } from 'react';

const ActionOperators = ({ setState, state, rules }: any) => {
  const type = rules?.find((rule: any) => {
    return rule.name === state.action;
  });

  const [operators, setOperators] = useState<any>(type.frequencyOperators);

  useEffect(() => {
    setOperators(type.frequencyOperators);
  }, [state.action]);

  const handleOperator = (e: any) => {
    let name = e.target.value;
    setState((pre: any) => {
      return {
        ...pre,
        frequency: {
          operator: name,
          value: '' || 0,
        },
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
        value={state?.frequency.operator}
      >
        <option value="" hidden={!state?.frequency.operator}>
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

export default ActionOperators;
