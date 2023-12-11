export interface Comparation {
  ad_images: string[];
  id: string;
  name: string;
  purchases: number;
  roas: number;
  status: string;
  total_amount_spent: number;
  source: string;
  impact?: number;
  total_conversion_value: number;
}

export interface ComparationPrisma {
  ad_images: string[];
  id: string;
  ad_name: string;
  total_orders: number;
  roas: number;
  ad_primary_status: string;
  total_amount_spent: number;
  source: string;
  impact?: number;
  total_conversion_value: number;
}
