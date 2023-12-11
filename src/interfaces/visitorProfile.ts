import { PageView } from './pageView';
import { Source } from './source';

export interface VisitorProfile {
  sources: Source[];
  page_views: PageView[];
  visitor_name: string;
  geolocation: {
    lat: number;
    long: number;
    city: string;
    province: string;
    country: string;
  };
  visitor_email: string;
  visitor_phone: string;
  visitor_address: {
    line1: string;
    city: string;
    province: string;
    country: string;
  };
  total_page_views: string;
  first_visit: number;
  account_timezone: string;
  total_purchases: string;
  total_spent: string;
}
