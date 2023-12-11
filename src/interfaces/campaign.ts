export interface Campaign {
  id: number;
  title: string;
  total_title: number;
  campaign_name: string;
  amount_spent: number;
  clicks: number;
  cost_per_purchase: number;
  purchases: number;
  roas: string;
  sirge_campaign_id: string;
  sirge_clicks: number;
  sirge_cost_per_purchase: number;
  sirge_purchases: number;
  sirge_roas: string;
  sirge_total_conversion_value: number;
  source_delivery_status: string;
  total_conversion_value: number;
  source: string;
}
