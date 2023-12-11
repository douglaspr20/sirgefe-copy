export type AdjustableColumn = {
  name: string;
  typeSort: string;
  width: number;
  tooltip?: string;
  tooltipWidth?: number;
};

/**
 * sources
 */
export const sourceColumns: AdjustableColumn[] = [
  {
    name: 'Channel',
    typeSort: 'source',
    width: 200,
  },
  {
    name: 'Store Visits',
    typeSort: 'unique_visitor',
    width: 200,
    tooltip:
      'Total volume of traffic acquired from your store and attributed to each source.',
    tooltipWidth: 600,
  },
  {
    name: 'Orders',
    typeSort: 'purchases_count',
    width: 200,
    tooltip: 'Total number of orders that are attributed to each source.',
    tooltipWidth: 450,
  },
];

export const sourcDetailsColumns: AdjustableColumn[] = [
  {
    name: 'URL',
    typeSort: 'referer',
    width: 200,
  },
  {
    name: 'Visitors',
    typeSort: 'unique_visitor',
    width: 200,
  },
  {
    name: 'Orders',
    typeSort: 'purchases_count',
    width: 200,
  },
];

/**
 * visitors
 */
export const visitorColumns: AdjustableColumn[] = [
  {
    name: 'Visitor Name',
    typeSort: 'visitor_name',
    width: 200,
  },
  {
    name: 'Page Views',
    typeSort: 'total_pageviews',
    width: 115,
    tooltip: 'Total number of tracked page views for each visitor.',
    tooltipWidth: 450,
  },
  {
    name: 'Orders',
    typeSort: 'total_purchases',
    width: 115,
    tooltip: 'Total number of orders that are attributed to each visitor.',
    tooltipWidth: 450,
  },
  {
    name: 'First Visit',
    typeSort: 'first_visit',
    width: 200,
    tooltip: 'First page view recorded for this visitor.',
    tooltipWidth: 350,
  },
  {
    name: 'Last Visit',
    typeSort: 'last_visit',
    width: 200,
    tooltip: 'Last page view recorded for this visitor.',
    tooltipWidth: 350,
  },
];

export const visitorProfilePageViewsColumns: AdjustableColumn[] = [
  {
    name: 'Date',
    typeSort: 'date',
    width: 200,
  },
  {
    name: 'Page',
    typeSort: 'page',
    width: 200,
  },
  {
    name: 'URL',
    typeSort: 'url',
    width: 200,
  },
  {
    name: 'Source',
    typeSort: 'source',
    width: 200,
  },
  {
    name: 'UTM Campaign',
    typeSort: 'utm_campaign',
    width: 200,
  },

  {
    name: 'UTM Medium',
    typeSort: 'utm_medium',
    width: 200,
  },

  {
    name: 'UTM Content',
    typeSort: 'utm_content',
    width: 200,
  },

  {
    name: 'Value',
    typeSort: 'value',
    width: 200,
  },
];

export const visitorProfileSourcesColumns: AdjustableColumn[] = [
  {
    name: 'Channel',
    typeSort: 'channel',
    width: 80,
  },
  {
    name: 'URL',
    typeSort: 'url',
    width: 1000,
  },
];

// Organic Content

export const linksColumns: AdjustableColumn[] = [
  {
    name: 'Name',
    typeSort: 'name',
    width: 170,
  },
  {
    name: 'Generated',
    typeSort: 'created_at',
    width: 170,
    tooltip: 'Date when the link was created',
    tooltipWidth: 450,
  },
  {
    name: 'Clicks',
    typeSort: 'clicks',
    width: 115,
    tooltip: 'Total number of clicks attributed to this link',
    tooltipWidth: 450,
  },
  {
    name: 'Orders',
    typeSort: 'purchases',
    width: 115,
    tooltip: 'Total number of orders that are attributed to this link',
    tooltipWidth: 350,
  },
  {
    name: 'Revenue with Link',
    typeSort: 'revenue',
    width: 115,
    tooltip: 'Total revenue attributed to this link',
    tooltipWidth: 350,
  },
];
