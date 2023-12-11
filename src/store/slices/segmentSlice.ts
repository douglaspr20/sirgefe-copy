import {
  DEFAULT_PROPERTY_OPERATOR,
  LogicalOperator,
  Operators,
  PropertyNames,
  PropertyRule,
  Rule,
} from '@utils/dynamic-query-builder-types';
import { Segments } from 'API';
import create, { StateCreator } from 'zustand';

export const initialRule: Segments = {
  __typename: 'Segments',
  id: '',
  business_id: '',
  no_of_customers: 0,
  added_revenue: 0,
  audience: '',
  type: '',
  status: '',
  query_details: '',
  created_at: '',
  updated_at: '',
  group_name: '',
  deleted_at: '',
  dynamic_query_params: '',
};

export const initialRuleSegment: Rule = {
  id: '0',
  logicalOperator: LogicalOperator.And,
  type: PropertyNames.GROUP,
  isRuleGroup: true,
  rules: [
    {
      id: '1',
      logicalOperator: LogicalOperator.And,
      isRuleGroup: true,
      type: PropertyNames.GROUP,
      rules: [
        {
          id: '1.1',
          type: PropertyNames.CUSTOMER_WHO_HAVE,
          field: DEFAULT_PROPERTY_OPERATOR,
          isRule: true,
          operator: Operators.Equal,
          value: '',
        } as PropertyRule,
      ],
    },
  ],
};

export interface DynamicSegmentStore {
  segment: Segments;
  dynamicSegment: Rule;
  isEdit: boolean;
  setSegment: (segment: Segments | undefined) => void;
  setDynamicSegment: (dynamicSegment: Rule) => void;
  setIsEdit: (isEdit: boolean) => void;
}

export const createDynamicSegmentStore: StateCreator<DynamicSegmentStore> = (
  set,
) => ({
  segment: JSON.parse(JSON.stringify(initialRule)),
  isEdit: false,
  dynamicSegment: JSON.parse(JSON.stringify(initialRuleSegment)),
  setSegment: (segment) => set({ segment }),
  setDynamicSegment: (dynamicSegment) => set({ dynamicSegment }),
  setIsEdit: (isEdit) => set({ isEdit }),
});
