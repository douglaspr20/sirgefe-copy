import { PropertyNames, RuleTypes } from '@utils/dynamic-query-builder-types';
import React, { Dispatch, SetStateAction } from 'react';
import ActionOperators from './ActionOperators';
import InOperators from './InOperators';
import PropertyOperators from './PropertyOperators';

type SelectOperatorsProps = {
  state: RuleTypes;
  setState: Dispatch<SetStateAction<RuleTypes>>;
  rules: any;
};

const SelectOperators = ({ state, setState, rules }: SelectOperatorsProps) => {
  return (
    <>
      {state.type === PropertyNames.CUSTOMER_WHO_HAVE && state?.field && (
        <PropertyOperators
          setState={setState}
          state={state}
          rules={rules[state.type]?.fields}
        />
      )}
      {state.type === PropertyNames.CUSTOMER_WHO_DID && state?.action && (
        <ActionOperators
          setState={setState}
          state={state}
          rules={rules[state.type]?.actions}
        />
      )}
      {state.type === PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN &&
        state?.field && (
          <InOperators
            setState={setState}
            state={state}
            operators={rules[state.type]?.fields.operators}
          />
        )}
    </>
  );
};

export default SelectOperators;
