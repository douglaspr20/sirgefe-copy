export interface InvoiceInfo {
  account_country: string;
  account_name: string;
  account_tax_ids: null | string[];
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  application_fee_amount: null | number;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  automatic_tax: AutomaticTax;
  billing_reason: string;
  charge: null;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields: null;
  customer: string;
  customer_address: CustomerAddress;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  customer_shipping: string | null;
  customer_tax_exempt: string;
  customer_tax_ids: string[];
  default_payment_method: string | null;
  default_source: string | null;
  default_tax_rates: string[];
  description: string | null;
  discount: string | null;
  discounts: string[];
  due_date: string | null;
  ending_balance: number;
  footer: string | null;
  hosted_invoice_url: string;
  id: string;
  invoice_pdf: string;
  last_finalization_error: string | null;
  lines: Lines;
  livemode: boolean;
  metadata: string[];
  next_payment_attempt: string | null;
  number: string;
  object: string;
  on_behalf_of: null;
  paid: boolean;
  payment_intent: string;
  payment_settings: {
    payment_method_options: string | null;
    payment_method_types: string | null;
  };
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote: string | null;
  receipt_number: string | null;
  starting_balance: number;
  statement_descriptor: string | null;
  status: string;
  status_transitions: {
    finalized_at: number;
    marked_uncollectible_at: string | null;
    paid_at: number;
    voided_at: string | null;
  };
  subscription: string;
  subtotal: number;
  tax: number;
  total: number;
  total_discount_amounts: string[];
  total_tax_amounts: LineTaxAmounts[];
  transfer_data: string | null;
  webhooks_delivered_at: string | null;
}

type AutomaticTax = {
  enabled: boolean;
  status: string;
};

type CustomerAddress = {
  city: string;
  country: string;
  line1: string;
  line2: null | string;
  postal_code: string;
  state: string;
};

type Lines = {
  data: LineData[];
  has_more: boolean;
  object: string;
  total_count: number;
  url: string;
};

type LineData = {
  amount: number;
  currency: string;
  description: string;
  discount_amounts: number[];
  discountable: boolean;
  discounts: string[];
  id: string;
  livemode: boolean;
  metadata: string[];
  object: string;
  period: { end: number; start: number };
  plan: LineDataPlan;
  price: LinePricePlan;
  proration: boolean;
  quantity: number;
  subscription: string;
  subscription_item: string;
  tax_amounts: LineTaxAmounts[];
  tax_rates: any[];
  type: string;
};

type LineDataPlan = {
  active: boolean;
  aggregate_usage: string | null;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  id: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  metadata: string[];
  nickname: string | null;
  object: string;
  product: string;
  tiers_mode: string | null;
  transform_usage: string | null;
  trial_period_days: string | null;
  usage_type: string;
};

type LinePricePlan = {
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  id: string;
  livemode: boolean;
  lookup_key: string | null;
  metadata: string[];
  nickname: string | null;
  object: string;
  product: string;
  recurring: {
    aggregate_usage: string | null;
    interval: string;
    interval_count: number;
    trial_period_days: number | null;
    usage_type: string;
  };
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: string | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

type LineTaxAmounts = {
  amount: number;
  inclusive: boolean;
  tax_rate: string;
};
