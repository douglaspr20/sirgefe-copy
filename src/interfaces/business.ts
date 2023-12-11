import { Business } from '@sirge-io/sirge-types';
import { ErrorResponse } from './error';
import { BusinessPrisma } from '../API';

// TODO: Interface inception. This should be rethought
export interface BusinessProfile extends Partial<BusinessProfileInfo> {
  isLoading: boolean;
  profilePrisma: null | BusinessPrisma | undefined;
  /**
   * @deprecated
   */
  profile?: Partial<BusinessProfileInfo>;
  userRole: number;
  trackerStatus: boolean;
}

export interface BusinessesResponse {
  error: ErrorResponse;
  business_list: Business[] | BusinessPrisma[];
  business_active_count: number;
  business_count: number;
}

export interface BusinessesPrismaResponse {
  error: ErrorResponse;
  business_list: BusinessPrisma[];
  business_active_count: number;
  business_count: number;
}

export interface BusinessProfileInfoResponse {
  data: BusinessProfileInfo;
  error?: {
    code: number;
    message: string;
  };
  message: string;
}

export interface BusinessProfileInfo {
  status?: string;
  business_list: Business[];
  business_name: string;
  error: ErrorResponse;
  business_id: string;
  advertiser_id: string;
  advertiser_name: string;
  created_at: string;
  deleting_on: string | null;
  external_platform: string | null;
  facebook_ad_account_currency: string | null;
  facebook_ad_account_id: string | null;
  facebook_ad_account_name: string | null;
  facebook_ad_account_timezone: string | null;
  fb_pixel_id: string | null;
  logo: string | null;
  premium_page_views: number;
  shopify_script_tag_id: string | null;
  shopify_store_url: string | null;
  facebook_accessToken: string | null;
  shopify_store_domain: string | null;
  tik_tok_access_token: string | null;
  tik_tok_ad_account_id: string | null;
  tik_tok_ad_account_name: string | null;
  tik_tok_integration: boolean;
  updated_at: string;
  vanity_name: string;
  script_installed: boolean;
  google_ad_accessToken: string | null;
  google_ad_account_currency: string | null;
  google_ad_account_id: string | null;
}
