export enum PropertyNames {
  CUSTOMER_WHO_HAVE = 'property',
  CUSTOMER_WHO_DID = 'action',
  CUSTOMER_WHO_ARE_IN_NOT_IN = 'in_not_in',
  GROUP = 'group',
}

export enum Operators {
  Equal = 'equal',
}

export enum LogicalOperator {
  And = 'and',
  Or = 'or',
}

export const DEFAULT_PROPERTY_OPERATOR = 'billing_zip';

export type Rule = {
  id: string;
  logicalOperator?: LogicalOperator;
  isRuleGroup: boolean;
  type: PropertyNames.GROUP;
  rules: Array<Rule | PropertyRule | ActionRule>; // Updated to include RuleGroup
};

export type RuleTypes = PropertyRule | ActionRule;

export type PropertyRule = {
  id: string;
  isRule: boolean;
  type:
    | PropertyNames.CUSTOMER_WHO_HAVE
    | PropertyNames.CUSTOMER_WHO_ARE_IN_NOT_IN;
  field: string;
  operator: string;
  value: any;
};

export type ActionRule = {
  id: string;
  isRule: boolean;
  type: PropertyNames.CUSTOMER_WHO_DID;
  action: string;
  frequency: { operator: string; value: number | string };
  timeFrame: TimeFrameType;
  filters?: Filter[]; // Assuming Filter is a defined type
};

export type TimeFrameType = {
  operator: string;
  xDimension?: number;
  dimension?: number;
  xDate?: Date | null;
  yDimension?: number;
  yDate?: Date | null;
};

export type Filter = {
  id: number;
  field?: string;
  operator?: string;
  value?: Array<number | string>;
};

export type CustomerDefinitionSelectionRule = {
  id: string;
  type: PropertyNames;
  logicalOperator: LogicalOperator;
  fields?: {
    name: string;
    label: string;
    operators: {
      name: string;
      label: string;
      deprecated: boolean;
    };
    suggestions: boolean;
    constraints?: {
      min: number;
      max: number;
    };
    dataType: string;
    operatorOptions?: {
      isInTheBest?: {
        name: number;
        label: string;
      };
      isInTheWorst?: {
        name: number;
        label: string;
      };
    };
  };
  actions?: {
    name: string;
    label: string;
    dataType: string;
    operators?: Record<string, string>;
    frequencyOperators?: {
      name: string;
      label: string;
      type: string;
      value: number;
    };
    timeFrameOperators?: {
      name: string;
      label: string;
      value: number;
    };
    timeFrameOperatorOptions?: {
      name: number;
      label: string;
    };
  };
  isRule: boolean;
  isRuleGroup: boolean;
  filters: Array<any[]>;
  rules?: Array<CustomerDefinitionSelectionRule>;
};

export const action = {
  actions: {
    name: 'Action',
    label: PropertyNames.CUSTOMER_WHO_DID,
    frequencyOperators: {
      name: Operators,
      label: '',
      type: '',
      value: 0,
    },
    timeFrameOperators: {
      name: '',
      label: '',
      value: 0,
    },
    timeFrameOperatorOptions: {
      name: 0,
      label: '',
    },
  },
};

export const fields = {
  fields: {
    name: 'Property',
    label: 'property',
    operators: {
      name: '',
      label: '',
      deprecated: false,
    },
    suggestions: false,
    constraints: {
      min: 0,
      max: 0,
    },
    dataType: '',
  },
};
export type PredefinedQueries = {
  bestBuyers: Rule;
  bigSpenders: Rule;
  loyalCustomers: Rule;
  newCustomers: Rule;
  abandonedCarts: Rule;
  discountBuyers: Rule;
  inActiveCustomers: Rule;
  reviewers: Rule;
  highAov: Rule;
};
