import React from 'react';

const InSegment = ({ segment, setState, state }: any) => {
  console.log(segment);

  const handleSelectSegment = (e: any) => {
    setState((pre: any) => {
      console.log(pre);

      return {
        ...pre,
        value: e.target.value,
      };
    });
  };
  return (
    <div className="pr-1 mr-4 relative after:content-[''] after:block after:absolute after:h-5 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
      <select
        id="select2"
        name="select2"
        className="border-none"
        onChange={handleSelectSegment}
        value={state?.value}
      >
        <option value="" hidden={!state?.value}>
          Select static segment
        </option>

        {segment?.map((operator: any) => (
          <option key={operator.id} value={operator.id}>
            {operator.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InSegment;
