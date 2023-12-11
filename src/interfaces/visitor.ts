export interface Visitor {
  clicks_count: string;
  conversion_value: string;
  date: string;
  last_visited: string;
  purchases_count: string;
  referer: string;
  source: string;
  visitor_id: string;
  visitor_name: string;
}

export interface VisitorGraph {
  business_id?: string;
  category?: string;
  date: string;
  new_visitors: string;
  record_date?: string;
  returning_visitors: string;
}

export interface VisitorResponse {
  total_visitors: number;
  visitors: Visitor[];
  total_clicks: number;
  total_purchases: number;
}

export type FieldVisitorsSortType =
  | 'total_pageviews'
  | 'last_visit'
  | 'first_visit'
  | 'total_purchases'
  | 'visitor_name';

export interface TotalInfo {
  total_clicks: number;
  total_pageviews: number;
  total_purchases: number;
  totalrecords?: number;
}
