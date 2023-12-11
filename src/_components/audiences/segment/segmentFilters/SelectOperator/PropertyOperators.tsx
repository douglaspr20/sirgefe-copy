import React, { useEffect, useState } from 'react';

const PropertyOperators = ({ rules, setState, state }: any) => {
  const type = rules?.find((rule: any) => {
    return rule.name === state.field;
  });

  const [operators, setOperators] = useState<any>(type.operators);

  useEffect(() => {
    setOperators(type.operators);
  }, [state.field]);

  const handleOperator = (e: any) => {
    let name = e.target.value;
    let label = e.target[e.target.selectedIndex].label;
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

export default PropertyOperators;
