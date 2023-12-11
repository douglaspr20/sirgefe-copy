export enum RoasGoalOption {
  ABOVE = 'above',
  UNDER = 'below',
}

export interface OperatorType {
  Contains: (data: Array<any>, condition: string, value: any) => unknown;
  Equals: (data: Array<any>, condition: string, value: any) => unknown;
  'Starts with': (data: Array<any>, condition: string, value: any) => unknown;
  'Ends with': (data: Array<any>, condition: string, value: any) => unknown;
  'Is empty': (data: Array<any>, condition: string, value: any) => unknown;
  'Is not empty': (data: Array<any>, condition: string, value: any) => unknown;
  'Is any of': (data: Array<any>, condition: string, value: any) => unknown;
}

export const conditionOperator: OperatorType = {
  Contains: (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter((item) => {
      return item[column].toString().includes(value.toString());
    });
  },
  Equals: (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter(
      (item) => item[column].toString() === value.toString(),
    );
  },
  'Starts with': (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter((item) =>
      item[column].toString().startsWith(value.toString()),
    );
  },
  'Ends with': (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter((item) =>
      item[column].toString().endsWith(value.toString()),
    );
  },
  'Is empty': (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter((item) => !item[column]);
  },
  'Is not empty': (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter((item) => item[column]);
  },
  'Is any of': (targetData: Array<any>, column: string, value: any) => {
    return targetData.filter((item) => item[column]);
  },
};

export interface filterConditionType {
  Condition: filterConditionArg[];
  filterStatus?: boolean;
  activeChecked?: boolean;
  roas?: 'above' | 'below' | null;
}

export interface filterConditionArg {
  column: string;
  operator: string;
  columnValue: string | number;
  logicalOperator: string;
  filterId: number;
}

export type MemberCount = {
  adSetCount: number | null;
  adsCount: number;
};

export type FieldPerformanceSortType =
  | 'source_delivery_status'
  | 'sirge_clicks'
  | 'source'
  | 'amount_spent'
  | 'sirge_purchases'
  | 'sirge_cost_per_purchase'
  | 'sirge_total_conversion_value'
  | 'sirge_roas'
  | 'campaign_name';

export type PerformanceSortObjectType = {
  sort: boolean;
  field: FieldPerformanceSortType;
};

export type Column = {
  [x: string]: any;
  name: string;
  accessorKey: string;
  width: number;
  generator: string;
  icon: boolean;
  hideable: boolean;
  customFilter: boolean;
  tooltip?: string;
  tooltipWidth?: number;
  infoIcon?: boolean;
};

export const campaignColumns = (
  currentPurchase: string | null = 'Campaigns',
): Column[] => {
  const columns = [
    {
      accessorKey: 'source_delivery_status',
      name: 'Status',
      generator: '',
      width: 110,
      icon: false,
      hideable: false,
      customFilter: false,
      infoIcon: true,
      tooltip: 'Indicator for whether the status is on or off.',
      tooltipWidth: 350,
    },
    {
      accessorKey:
        currentPurchase === 'Ads'
          ? 'ad_name'
          : currentPurchase === 'Ad sets'
            ? 'ad_set_name'
            : 'campaign_name',
      name:
        currentPurchase === 'Ads'
          ? 'Ad Name'
          : currentPurchase === 'Ad sets'
            ? 'Ad Set Name'
            : 'Campaign Name',
      generator: '',
      width: 180,
      icon: false,
      hideable: false,
      customFilter: false,
    },
    {
      accessorKey: 'platform',
      name: 'Platform',
      generator: '',
      width: 180,
      icon: false,
      hideable: false,
      customFilter: false,
    },
    {
      accessorKey: 'budget',
      name: 'Budget',
      generator: '',
      width: 180,
      icon: false,
      hideable: false,
      customFilter: false,
    },
    {
      accessorKey: 'amount_spent',
      name: 'Total Ad Spend',
      generator: '',
      width: 180,
      icon: false,
      hideable: false,
      customFilter: true,
      infoIcon: true,
      tooltip: 'Total amount spent on ads for the given period.',
      tooltipWidth: 400,
    },
    {
      accessorKey: 'clicks',
      name: 'Clicks',
      generator: '',
      width: 150,
      icon: true,
      hideable: true,
      customFilter: false,
      tooltip:
        'Metric for any click on the ad that drove traffic to another page whether that page was your store or not.',
      tooltipWidth: 500,
    },
    {
      accessorKey: 'sirge_clicks',
      name: 'Clicks',
      generator: 'sirge',
      width: 150,
      icon: true,
      hideable: false,
      customFilter: true,
      tooltip:
        'Total number of times a click on the ad has resulted in a customer coming to your store.',
      tooltipWidth: 500,
    },
    {
      accessorKey: 'purchases',
      name: 'Orders',
      generator: '',
      width: 146,
      icon: true,
      hideable: true,
      customFilter: false,
      tooltip:
        'Metric for all orders attributed to your ad, ad set, or campaign.',
      tooltipWidth: 420,
    },
    {
      accessorKey: 'sirge_purchases',
      name: 'Orders',
      generator: 'sirge',
      width: 146,
      icon: true,
      hideable: false,
      customFilter: true,
      tooltip:
        'Total number of orders that are attributed to the ad, ad set, or campaign.',
      tooltipWidth: 400,
    },
    {
      accessorKey: 'cost_per_purchase',
      name: 'Cost Per Orders',
      generator: '',
      icon: true,
      width: 220,
      hideable: true,
      customFilter: false,
      tooltip:
        'Metric for the cost per purchase of each ad, ad set, or campaign.',
      tooltipWidth: 350,
    },
    {
      accessorKey: 'sirge_cost_per_purchase',
      name: 'Cost Per Order',
      generator: 'sirge',
      width: 220,
      icon: true,
      hideable: false,
      customFilter: true,
      tooltip: 'Number of orders / Total Ad Spend',
      tooltipWidth: 320,
    },
    {
      accessorKey: 'total_conversion_value',
      name: 'Total Conversion Value',
      generator: '',
      icon: true,
      width: 250,
      hideable: true,
      customFilter: false,
      tooltip:
        'Metric for the total conversion value of each ad, ad set, or campaign.',
      tooltipWidth: 450,
    },
    {
      accessorKey: 'sirge_total_conversion_value',
      name: 'Total Conversion Value',
      generator: 'sirge',
      width: 250,
      icon: true,
      hideable: false,
      customFilter: true,
      tooltip:
        'Sum of all orders made from customers originating from the ad, ad set, or campaign.',
      tooltipWidth: 450,
    },
    {
      accessorKey: 'roas',
      name: 'ROAS',
      generator: '',
      icon: true,
      width: 210,
      hideable: true,
      customFilter: false,
      tooltip: 'Metric for the ROAS of each ad, ad set, or campaign.',
      tooltipWidth: 300,
    },

    {
      accessorKey: 'sirge_roas',
      name: 'ROAS',
      generator: 'sirge',
      width: 210,
      icon: true,
      hideable: false,
      customFilter: true,
      tooltip: 'Total conversion value / Total amount spent on ads.',
      tooltipWidth: 250,
    },
    {
      accessorKey: 'average_cpm',
      name: 'Average CPM',
      generator: '',
      icon: true,
      width: 350,
      hideable: true,
      customFilter: false,
      tooltip: 'Metric for the cpm value of each ad, ad set, or campaign.',
      tooltipWidth: 450,
    },
  ];

  return columns;
};
