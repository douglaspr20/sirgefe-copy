import { ValidTypeSort } from './sort';

export interface Source {
  clicks_count: number;
  created: number;
  id: number;
  purchases_count: number;
  referer: string;
  source_name: string;
  source: string;
}

export type ValidSourceAnalytics =
  | 'all' // TODO: redundant. Choose one
  | 'facebook'
  | 'tiktok'
  | 'allPlatforms' // TODO: redundant. Choose one
  | 'google';
export type FieldSourcesSortType =
  | 'created'
  | 'purchases_count'
  | 'clicks_count'
  | 'source'
  | 'unique_visitor'
  | 'referer';

export type SourcesSortObjectType = {
  sort: ValidTypeSort;
  field: FieldSourcesSortType;
};
