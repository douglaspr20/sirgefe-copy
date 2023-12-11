export interface Analyctis {
  allPlatforms: AllPlatforms | null;
  facebook: Facebook | null;
  tiktok: Facebook | null;
}

export interface AllPlatforms {
  business_id?: string;
  daily?: AllPlatformsDaily;
  weekly?: AllPlatformsWeekly;
  monthly?: AllPlatformsMonthly;
}

export interface AllPlatformsDaily {
  performing_product?: PerformingProduct[];
  best_performing?: BestPerforming;
  performance?: PurplePerformance;
  chartData?: PurpleChartData;
}

export interface BestPerforming {
  ad_sets?: AdSet[];
  ads?: AdSet[];
  campaigns?: AdSet[];
}

export interface AdSet {
  name?: string;
  source?: Source;
  source_view?: Source | null;
  status?: Status;
  total_amount_spent?: number;
  total_conversion_value?: number;
  roas?: number;
  purchases?: number;
  ad_images?: any[] | null;
  impact?: number;
}

export enum Source {
  All = 'all',
  Facebook = 'facebook',
  Tiktok = 'tiktok',
}

export enum Status {
  Active = 'ACTIVE',
  StatusActive = 'Active',
}

export interface PurpleChartData {
  monthly_budget: MonthlyBudget;
  roas_goals: RoasGoals;
  labelsLastSevenDays: string[];
  customerActivities: CustomerActivities;
  spendAndSales: PurpleSpendAndSales;
}

export interface CustomerActivities {
  ad_clicks: AmountSpent[] | null;
  purchases: AmountSpent[] | null;
  visits: AmountSpent[] | null;
}

export interface AmountSpent {
  amount: number;
  date: string;
}

export interface MonthlyBudget {
  total: number;
  facebook: number;
  tiktok: number;
  amount_left: number;
}

export interface RoasGoals {
  campaigns: Ads;
  adsets: Ads;
  ads: Ads;
}

export interface Ads {
  goal: number;
  value: Value[];
}

export interface Value {
  source: Source;
  daily: MonthlyClass;
  weekly: MonthlyClass;
  monthly: MonthlyClass;
}

export interface MonthlyClass {
  over: Over;
  under: Over;
}

export interface Over {
  percentage: number;
  amount: number;
}

export interface PurpleSpendAndSales {
  amount_spent: AmountSpent[];
  total_sales: AmountSpent[];
}

export interface PurplePerformance {
  conversion_rate: PurpleAverageOrderValue;
  total_sales: PurpleAverageOrderValue;
  purchases: PurpleAverageOrderValue;
  visits: PurpleAverageOrderValue;
  blended_roas: PurpleAverageOrderValue;
  average_order_value: PurpleAverageOrderValue;
}

export interface PurpleAverageOrderValue {
  daily_amount: number;
  daily_percentage: number;
}

export interface PerformingProduct {
  product_id: string;
  name: string;
  totalPrice: number;
  ordersCount: number;
  percentage: number;
}

export interface AllPlatformsMonthly {
  performing_product: PerformingProduct[];
  best_performing: BestPerforming;
  performance: FluffyPerformance;
  chartData: PurpleChartData;
}

export interface FluffyPerformance {
  conversion_rate: FluffyAverageOrderValue;
  total_sales: FluffyAverageOrderValue;
  purchases: FluffyAverageOrderValue;
  visits: FluffyAverageOrderValue;
  blended_roas: FluffyAverageOrderValue;
  average_order_value: FluffyAverageOrderValue;
}

export interface FluffyAverageOrderValue {
  monthly_amount: number;
  monthly_percentage: number;
}

export interface AllPlatformsWeekly {
  performing_product: PerformingProduct[];
  best_performing: BestPerforming;
  performance: TentacledPerformance;
  chartData: PurpleChartData;
}

export interface TentacledPerformance {
  conversion_rate: TentacledAverageOrderValue;
  total_sales: TentacledAverageOrderValue;
  purchases: TentacledAverageOrderValue;
  visits: TentacledAverageOrderValue;
  blended_roas: TentacledAverageOrderValue;
  average_order_value: TentacledAverageOrderValue;
}

export interface TentacledAverageOrderValue {
  weekly_amount: number;
  weekly_percentage: number;
}

export interface Facebook {
  daily: FacebookDaily;
  weekly: FacebookWeekly;
  monthly: FacebookMonthly;
}

export interface FacebookDaily {
  chartData: FluffyChartData;
  best_performing: BestPerforming;
  performance: StickyPerformance;
}

export interface FluffyChartData {
  monthly_budget: MonthlyBudget;
  roas_goals: RoasGoals;
  labelsLastSevenDays: string[];
  customerActivities: CustomerActivities;
  spendAndSales: FluffySpendAndSales;
}

export interface FluffySpendAndSales {
  amount_spent: AmountSpent[] | null;
  total_conversion_value: AmountSpent[] | null;
}

export interface StickyPerformance {
  amount_spent: PurpleAverageOrderValue;
  ad_clicks: PurpleAverageOrderValue;
  total_conversion_value: PurpleAverageOrderValue;
  roas: PurpleAverageOrderValue;
  cost_per_purchase: PurpleAverageOrderValue;
  purchases: PurpleAverageOrderValue;
  visits: PurpleAverageOrderValue;
}

export interface FacebookMonthly {
  chartData: FluffyChartData;
  performance: IndigoPerformance;
  best_performing: BestPerforming;
}

export interface IndigoPerformance {
  amount_spent: FluffyAverageOrderValue;
  ad_clicks: FluffyAverageOrderValue;
  total_conversion_value: FluffyAverageOrderValue;
  roas: FluffyAverageOrderValue;
  cost_per_purchase: FluffyAverageOrderValue;
  purchases: FluffyAverageOrderValue;
  visits: FluffyAverageOrderValue;
}

export interface FacebookWeekly {
  chartData: FluffyChartData;
  performance: IndecentPerformance;
  best_performing: BestPerforming;
}

export interface IndecentPerformance {
  amount_spent: TentacledAverageOrderValue;
  ad_clicks: TentacledAverageOrderValue;
  total_conversion_value: TentacledAverageOrderValue;
  roas: TentacledAverageOrderValue;
  cost_per_purchase: TentacledAverageOrderValue;
  purchases: TentacledAverageOrderValue;
  visits: TentacledAverageOrderValue;
}

export interface IWidgetValue {
  amount: number;
  percentage: number;
}

export interface ISocialWidget {
  purchases: IWidgetValue;
  total_sales?: IWidgetValue;
  average_order_value?: IWidgetValue;
  blended_roas?: IWidgetValue;
  visitors?: IWidgetValue;
  conversion_rate?: IWidgetValue;
  amount_spent?: IWidgetValue;
  total_conversion_value?: IWidgetValue;
  cost_per_purchase?: IWidgetValue;
  roas?: IWidgetValue;
  ad_clicks?: IWidgetValue;
}

export interface DataStatistics {
  business_id: string;
  all: ISocialWidget;
  facebook: ISocialWidget;
  tiktok: ISocialWidget;
  google: ISocialWidget;
}

export interface RoasTiles {
  value: string | number;
  source: string;
  active: boolean;
}

type IStatistics = {
  amount: number;
  percentage: number;
  sources?: {
    facebook?: number;
    tiktok?: number;
    google?: number;
  };
};
export interface IKeyMetricsStatistics {
  total_order: IStatistics;
  total_sales: IStatistics;
  average_order_value: IStatistics;
  blended_roas: IStatistics;
  visitors: IStatistics;
  conversion_rate: IStatistics;
}

export interface IKeyMetricsPerformingProduct {
  name: string;
  product_id: string;
  totalPrice: number;
  ordersCount: number;
  percentage?: number;
}

export interface IKeyMetricsMonthlyBudget {
  amount_spent: number;
  source: string;
  business_id: string;
}

export interface RoasTracker {
  over: number;
  under: number;
}

export interface IRoasTracker {
  campaign: RoasTracker;
  adset: RoasTracker;
  ad: RoasTracker;
}
