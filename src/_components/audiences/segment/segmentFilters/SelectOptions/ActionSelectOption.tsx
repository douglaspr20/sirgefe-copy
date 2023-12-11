import React from 'react';
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager';

const ActionSelectionOption = ({ handleAction, rule, state }: any) => {
  return (
    <div className="pr-1 mr-4 relative after:content-[''] after:block after:absolute after:h-5 after:right-0 after:top-1/2 after:translate-y-[-50%] after:w-0.5 after:bg-darkGrade25">
      <select
        id="select1"
        name="select1"
        className="border-none"
        onChange={handleAction}
        value={state.action}
      >
        <option key="column" value="" defaultChecked hidden>
          Actions
        </option>

        {rule.map((item: any) => (
          <option key={item.name} value={item.name}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActionSelectionOption;
