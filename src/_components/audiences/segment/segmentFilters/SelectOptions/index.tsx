import React from 'react';
import PropertySelectionOption from './PropertySelectionOption';
import ActionSelectionOption from './ActionSelectOption';
import { PropertyNames, RuleTypes } from '@utils/dynamic-query-builder-types';

type SelectOptionProps = {
  state: RuleTypes;
  rules: any;
  handleAction: (e: any) => void;
};

const SelectOption = ({ state, rules, handleAction }: SelectOptionProps) => {
  switch (state.type) {
    case PropertyNames.CUSTOMER_WHO_HAVE:
      return (
        <PropertySelectionOption
          rule={rules[PropertyNames.CUSTOMER_WHO_HAVE]?.fields}
          handleAction={handleAction}
          state={state}
        />
      );
    case PropertyNames.CUSTOMER_WHO_DID:
      return (
        <ActionSelectionOption
          rule={rules[PropertyNames.CUSTOMER_WHO_DID]?.actions}
          handleAction={handleAction}
          state={state}
        />
      );
    default:
      return null;
  }
};

export default SelectOption;
