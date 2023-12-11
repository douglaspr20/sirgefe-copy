export interface Ad {
  id: string;
  title: string;
  ad_image: string;
  sirge_ad_id: string;
  total_title: string;
  ad_name: string;
  amount_spent: number;
  clicks: number;
  cost_per_purchase: number;
  purchases: number;
  roas: string;
  sirge_clicks: number;
  sirge_cost_per_purchase: number;
  sirge_purchases: number;
  sirge_roas: string;
  sirge_total_conversion_value: number;
  source_delivery_status: string;
  total_conversion_value: number;
  source: string;
}

export interface ItemSocialMediaIntegration {
  id: string;
  name: string | null;
  status: string;
}
