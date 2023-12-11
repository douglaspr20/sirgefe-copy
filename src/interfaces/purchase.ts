export interface Purchase {
  first_touch_campaign: string;
  first_touch_ad_set: string;
  first_touch_ad: string;
  last_touch_campaign: string;
  last_touch_ad_set: string;
  last_touch_ad: string;
  visitor_name: string;
  purchases_count: number;
  conversion_value: string | number;
  date: number;
  visitor_id: string;
  id: number;
}
