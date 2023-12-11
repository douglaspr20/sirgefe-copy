import { Role } from './role';
import { Usage } from './usage';
import { BoltPlans } from 'enums/plans';
import { Currencies } from './currency';
import { ErrorResponse } from 'API';

export interface UserProfile {
  status: 'active' | 'verification_required';
  account_state: 'frozen' | 'canceled';
  error: ErrorResponse;
  usage: Usage;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  roles: Role[];
  card_expiry_date: string;
  card_last_four_digits: string;
  city: string;
  full_address: string;
  affiliate_auth_token: string | null;
  client_billing_account_id: string | null;
  country_phone_prefix: string | null;
  facebook_accessToken: string | null;
  facebook_userID: string | null;
  phone: string | null;
  phone_number: string | null;
  profile_photo: string | null;
  verification_method: string | null;
  subscription_status: 'active' | 'trialing';
  account_currency: Currencies;
  account_timezone:
    | 'America/Toronto'
    | 'America/Los_Angeles'
    | 'America/Chicago';
  auto_scaling_setting: number;
  business_limit: number;
  data_retention_period: number;
  page_view_limit: number;
  staff_limit: number;
  two_factor_deactivate_business: number;
  two_factor_remove_staff_account: number;
  plan_code: BoltPlans;
  tik_tok_integration: boolean;
  card_type: 'visa' | 'mastercard';
  balance: '0'; // TODO: Is this actually a string?
  country_code: 'US';
  country_name: 'US';
  line1: string;
  postal_code: string;
  state: 'California';
  manager_id: string | null;
}
