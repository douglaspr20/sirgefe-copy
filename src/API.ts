/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ActivateBusinessInput = {
  business_id: string,
};

export type ActivateBusinessResponse = {
  __typename: "ActivateBusinessResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type ErrorResponse = {
  __typename: "ErrorResponse",
  code?: string | null,
  message?: string | null,
};

export type ApplyPromoCodeInput = {
  code: string,
};

export type ApplyPromoCodeResponse = {
  __typename: "ApplyPromoCodeResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AuthenticateTikTokInput = {
  auth_code: string,
  business_id: string,
};

export type AuthenticateTikTokResponse = {
  __typename: "AuthenticateTikTokResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  data?: string | null,
};

export type ChangePasswordInput = {
  password: string,
  two_factor_id: string,
};

export type ChangePasswordResponse = {
  __typename: "ChangePasswordResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type CreateBusinessInput = {
  business_name: string,
};

export type CreateBusinessResponse = {
  __typename: "CreateBusinessResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type Business = {
  __typename: "Business",
  business_id: string,
  business_name?: string | null,
  created_at?: string | null,
  external_platform?: string | null,
  facebook_ad_account_currency?: string | null,
  facebook_ad_account_id?: string | null,
  facebook_ad_account_name?: string | null,
  fb_pixel_id?: string | null,
  logo?: string | null,
  premium_page_views?: number | null,
  shopify_access_token?: string | null,
  shopify_script_tag_id?: string | null,
  shopify_store_url?: string | null,
  status?: string | null,
  tik_tok_access_token?: string | null,
  tik_tok_ad_account_currency?: string | null,
  tik_tok_ad_account_id?: string | null,
  tik_tok_ad_account_name?: string | null,
  tik_tok_ad_account_timezone?: string | null,
  facebook_accessToken?: string | null,
  facebook_userID?: string | null,
  updated_at?: string | null,
  user_id?: string | null,
  vanity_name?: string | null,
  script_installed?: boolean | null,
  campaign_count?: CampaignCount | null,
  fb_utm_count?: number | null,
  tiktok_utm_count?: number | null,
  shopify_store_domain?: string | null,
  timezone?: string | null,
  roas_goals?: BusinessRoasGoals | null,
  monthly_budget?: number | null,
  google_ad_account_id?: string | null,
  google_ad_accessToken?: string | null,
  google_ad_account_currency?: string | null,
  last_data_refreshed?: string | null,
  completed_onboarding_call?: boolean | null,
  reminder_status?: boolean | null,
  currency?: string | null,
  business_plan?: Plan | null,
  subscription?: Subscription | null,
};

export type CampaignCount = {
  __typename: "CampaignCount",
  active_count?: string | null,
  paused_count?: string | null,
};

export type BusinessRoasGoals = {
  __typename: "BusinessRoasGoals",
  campaign?: number | null,
  adset?: number | null,
  ad?: number | null,
};

export type Plan = {
  __typename: "Plan",
  business_limit?: number | null,
  page_view_limit?: number | null,
  plan_code?: string | null,
  plan_name?: string | null,
  plan_price_id?: string | null,
  plan_product_id?: string | null,
  staff_limit?: number | null,
};

export type Subscription = {
  __typename: "Subscription",
  created_at?: string | null,
  customer_id?: string | null,
  id?: string | null,
  status?: string | null,
  subscription_body?: string | null,
  updated_at?: string | null,
  trial_end?: string | null,
  trial_start?: string | null,
  trial_left?: number | null,
  promo_code?: DiscountCode | null,
  plan?: Plan | null,
  plan_changed?: boolean | null,
  plan_code?: string | null,
  current_revenue?: number | null,
  current_billing_period_start?: string | null,
  current_billing_period_end?: string | null,
};

export type DiscountCode = {
  __typename: "DiscountCode",
  code?: string | null,
  status?: string | null,
  duration?: number | null,
  amount?: number | null,
  type?: string | null,
};

export type CreateStaffAccountInput = {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  business_id: string,
};

export type CreateStaffAccountResponse = {
  __typename: "CreateStaffAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DeactivateBusinessInput = {
  business_id: string,
};

export type DeactivateBusinessResponse = {
  __typename: "DeactivateBusinessResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DeleteBusinessesInput = {
  business_id: string,
  two_factor_code?: string | null,
};

export type DeleteBusinessesInputResponse = {
  __typename: "DeleteBusinessesInputResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DeleteStaffAccountInput = {
  staff_id: string,
  business_id: string,
};

export type DeleteStaffAccountResponse = {
  __typename: "DeleteStaffAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DisconnectTikTokInput = {
  business_id: string,
};

export type DisconnectTikTokResponse = {
  __typename: "DisconnectTikTokResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type PasswordResetInput = {
  email: string,
};

export type PasswordResetResponse = {
  __typename: "PasswordResetResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type PayInvoiceInput = {
  invoice_id: string,
};

export type PayInvoiceResponse = {
  __typename: "PayInvoiceResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type RegisterUserInput = {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  shopify_store_url?: string | null,
};

export type RegisterUserResponse = {
  __typename: "RegisterUserResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  user?: User | null,
};

export type User = {
  __typename: "User",
  default_business_id?: string | null,
  account_state?: string | null,
  affiliate_auth_token?: string | null,
  auto_scaling_setting?: number | null,
  balance?: number | null,
  cancellation_reason?: string | null,
  card_expiry_date?: string | null,
  card_last_four_digits?: string | null,
  card_type?: string | null,
  city?: string | null,
  client_billing_account_id?: string | null,
  country_code?: string | null,
  country_name?: string | null,
  country_phone_prefix?: string | null,
  created_at?: string | null,
  currency?: string | null,
  current_billing_period_end?: number | null,
  current_billing_period_start?: number | null,
  data_deleting_on?: number | null,
  data_retention_period?: number | null,
  email?: string | null,
  end_trial_source?: string | null,
  facebook_accessToken?: string | null,
  facebook_userID?: string | null,
  first_name?: string | null,
  firstpromoter_auth_token?: string | null,
  full_address?: string | null,
  id?: string | null,
  invoices?:  Array<Invoice | null > | null,
  last_name?: string | null,
  line1?: string | null,
  manager_id?: string | null,
  marketing_status?: number | null,
  phone_number?: string | null,
  postal_code?: string | null,
  products?: Product | null,
  profile_photo?: string | null,
  state?: string | null,
  status?: string | null,
  stripe_connect_account_id?: string | null,
  subscription?: Subscription | null,
  subscription_status?: string | null,
  tik_tok_access_token?: string | null,
  tik_tok_integration?: boolean | null,
  timezone?: string | null,
  two_factor_deactivate_business?: number | null,
  two_factor_remove_staff_account?: number | null,
  updated_at?: string | null,
  user_id?: string | null,
  user_plan?: Plan | null,
  verification_method?: string | null,
  shopify_store_url?: string | null,
  business_access?:  Array<BusinessAccess | null > | null,
  sessions?:  Array<UserSession | null > | null,
  post_hog_user_id?: string | null,
};

export type Invoice = {
  __typename: "Invoice",
  created_at?: string | null,
  customer_id?: string | null,
  id?: string | null,
  invoice_body?: string | null,
  status?: string | null,
  updated_at?: string | null,
};

export type Product = {
  __typename: "Product",
  plan_product_id?: string | null,
  price_id?: string | null,
  product_code?: string | null,
  product_id?: string | null,
  product_name?: string | null,
};

export type BusinessAccess = {
  __typename: "BusinessAccess",
  vanity_name?: string | null,
};

export type UserSession = {
  __typename: "UserSession",
  browser_name?: string | null,
  browser_version?: string | null,
  created_at?: string | null,
  ip?: string | null,
  location?: string | null,
  os_name?: string | null,
  os_version?: string | null,
  user_id?: string | null,
};

export type RemoveFacebookAdAccountInput = {
  business_id: string,
};

export type RemoveFacebookAdAccountResponse = {
  __typename: "RemoveFacebookAdAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type BusinessIdInput = {
  business_id: string,
};

export type UpdateUserDefaultBusinessResponse = {
  __typename: "UpdateUserDefaultBusinessResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type BusinessIdWithPlatform = {
  business_id: string,
  platform?: string | null,
};

export type RemoveSocialAdAccountResponse = {
  __typename: "RemoveSocialAdAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type RemoveFacebookAccessResponse = {
  __typename: "RemoveFacebookAccessResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type RemoveSocialAccessResponse = {
  __typename: "RemoveSocialAccessResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetFacebookAdAccountInput = {
  business_id: string,
  facebook_ad_account_currency: string,
  facebook_ad_account_id: string,
  facebook_ad_account_name: string,
};

export type SetFacebookAdAccountResponse = {
  __typename: "SetFacebookAdAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type FacebookAccessInput = {
  facebook_accessToken?: string | null,
  facebook_userID?: string | null,
  business_id?: string | null,
};

export type SetFacebookAccessResponse = {
  __typename: "SetFacebookAccessResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetSocialAccessInput = {
  platform: string,
  user_id?: string | null,
  business_id: string,
  access_token?: string | null,
  refresh_token?: string | null,
};

export type SetSocialAccessResponse = {
  __typename: "SetSocialAccessResponse",
  data?: AdAccountSettingsPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AdAccountSettingsPrisma = {
  __typename: "AdAccountSettingsPrisma",
  id: string,
  business_id: string,
  ad_platform_id: string,
  premium_page_views: number,
  external_platform?: string | null,
  active_campaign_count: number,
  paused_campaign_count: number,
  social_account_id?: string | null,
  social_account_name?: string | null,
  social_account_currency?: string | null,
  social_account_timezone?: string | null,
  access_token: string,
  utm_count: number,
  social_integration?: string | null,
  conversion_api_enabled?: string | null,
  pixel_id?: string | null,
  social_refresh_token?: string | null,
  updateKey?: string | null,
  last_data_refreshed?: string | null,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
  ad_platform: AdPlatformPrisma,
};

export type AdPlatformPrisma = {
  __typename: "AdPlatformPrisma",
  id: string,
  name: string,
  internal_source_name: string,
  is_sirge_managed: boolean,
  dark_theme_image_url?: string | null,
  light_theme_image_url: string,
  status: string,
  sqs_refresh_queue_url?: string | null,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
  show_budget_confirmation?: boolean | null,
};

export type SetSocialAdAccountInput = {
  platform: string,
  ad_account_id: string,
  business_id: string,
  timezone?: string | null,
  currency?: string | null,
};

export type SetSocialAdAccountResponse = {
  __typename: "SetSocialAdAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type SetBusinessGoogleTokenInput = {
  business_id: string,
  google_authCode: string,
};

export type SetBusinessGoogleTokenResponse = {
  __typename: "SetBusinessGoogleTokenResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type SetBusinessGoogleAdAccountInput = {
  business_id: string,
  google_ad_account_id: string,
};

export type SetBusinessGoogleAdAccountResponse = {
  __typename: "SetBusinessGoogleAdAccountResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type SubscribeInput = {
  plan_code: string,
};

export type SubscribeResponse = {
  __typename: "SubscribeResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type TriggerBusinessDataLongFetchInput = {
  business_id: string,
  is_onboarding?: boolean | null,
};

export type TriggerBusinessDataLongFetchResponse = {
  __typename: "TriggerBusinessDataLongFetchResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type SetBusinessesInput = {
  business_id: string,
  business_name?: string | null,
};

export type SetBusinessesInputResponse = {
  __typename: "SetBusinessesInputResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetBusinessesPrismaInputResponse = {
  __typename: "SetBusinessesPrismaInputResponse",
  data?: BusinessPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type BusinessPrisma = {
  __typename: "BusinessPrisma",
  id: string,
  store_id: string,
  name: string,
  status: string,
  logo: string,
  vanity_name: string,
  reminder_status?: boolean | null,
  show_budget_confirmation?: boolean | null,
  monthly_budget: number,
  campaign_roas_goal: string,
  adset_roas_goal: string,
  ad_roas_goal: string,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
  ad_account_settings:  Array<AdAccountSettingsPrisma >,
  subscriptions:  Array<SubscriptionPrisma >,
  store?: StorePrisma | null,
  completed_onboarding_call?: boolean | null,
};

export type SubscriptionPrisma = {
  __typename: "SubscriptionPrisma",
  id: string,
  business_id: string,
  subscription_plan_code?: string | null,
  status: string,
  processor?: string | null,
  store_subscription_body?: string | null,
  store_subscription_id?: string | null,
  promo_code_id?: string | null,
  trial_start?: string | null,
  trial_end?: string | null,
  trial_left?: number | null,
  current_billing_period_start?: string | null,
  current_billing_period_end?: string | null,
  subscription_end_date?: string | null,
  business_limit?: number | null,
  staff_limit?: number | null,
  subscription_charges?:  Array<SubscriptionChargesPrisma | null > | null,
  promo_codes?: PromoCodePrisma | null,
  current_revenue?: number | null,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
};

export type SubscriptionChargesPrisma = {
  __typename: "SubscriptionChargesPrisma",
  id: string,
  business_id: string,
  subscription_id?: string | null,
  store_revenue: number,
  amount_billed: number,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
};

export type PromoCodePrisma = {
  __typename: "PromoCodePrisma",
  id?: string | null,
  code?: string | null,
  type?: string | null,
  status?: string | null,
  duration?: number | null,
  amount?: number | null,
  created_at?: string | null,
  updated_at?: string | null,
  deleted_at?: string | null,
};

export type StorePrisma = {
  __typename: "StorePrisma",
  id?: string | null,
  shop_name?: string | null,
  address1?: string | null,
  address2?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  country?: string | null,
  store_url?: string | null,
  timezone?: string | null,
  currency?: string | null,
  created_at?: string | null,
  updated_at?: string | null,
  deleted_at?: string | null,
};

export type UpdateBusinessLogoInput = {
  business_id: string,
  file_url: string,
};

export type UpdateBusinessLogoResponse = {
  __typename: "UpdateBusinessLogoResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateBusinessLogoNewResponse = {
  __typename: "UpdateBusinessLogoNewResponse",
  data?: BusinessPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateFacebookConnectionSettingsInput = {
  business_id: string,
  fb_pixel_id: number,
};

export type UpdateFacebookConnectionSettingsResponse = {
  __typename: "UpdateFacebookConnectionSettingsResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type UpdateStaffAccountAccessInput = {
  staff_id: string,
  vanity_name: string,
  business_id: string,
};

export type UpdateStaffAccountAccessResponse = {
  __typename: "UpdateStaffAccountAccessResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateStaffAccountAccessNewInput = {
  staff_id: string,
  business_id: string,
};

export type UpdateSubscriptionItemQuantityInput = {
  option?: number | null,
  subscription_id: string,
  subscription_item_id: string,
};

export type UpdateSubscriptionItemQuantityResponse = {
  __typename: "UpdateSubscriptionItemQuantityResponse",
  data?: ItemQuantityObject | null,
};

export type ItemQuantityObject = {
  __typename: "ItemQuantityObject",
  limit?: number | null,
  quantity?: number | null,
};

export type UpdateSubscriptionPlanInput = {
  to_plan_code: string,
  business_id: string,
};

export type UpdateSubscriptionPlanResponse = {
  __typename: "UpdateSubscriptionPlanResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateTimezoneCurrencyInput = {
  currency: string,
  timezone: string,
  business_id: string,
};

export type UpdateTimezoneCurrencyResponse = {
  __typename: "UpdateTimezoneCurrencyResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type UpdateUserInput = {
  first_name?: string | null,
  full_address?: string | null,
  last_name?: string | null,
  postal_code?: string | null,
  street_name?: string | null,
  street_number?: string | null,
  business_id: string,
};

export type UpdateUserResponse = {
  __typename: "UpdateUserResponse",
  data?: User | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateUserProfilePictureInput = {
  file_url: string,
  business_id: string,
};

export type UpdateUserProfilePictureResponse = {
  __typename: "UpdateUserProfilePictureResponse",
  data?: User | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateSubscriptionCardInput = {
  card_cvc: string,
  card_expiry_date: string,
  card_last_four_digits: string,
  card_number: string,
  card_type: string,
  payment_method?: string | null,
  business_id: string,
};

export type UpdateUserSubscriptionCardResponse = {
  __typename: "UpdateUserSubscriptionCardResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type VerifyTwoFactorInput = {
  two_factor_id?: string | null,
  email_confirm?: boolean | null,
};

export type VerifyTwoFactorResponse = {
  __typename: "VerifyTwoFactorResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type RefreshDataForBusiness = {
  business_id?: string | null,
};

export type RefreshDataForResponse = {
  __typename: "RefreshDataForResponse",
  data?: string | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateShopifyStoreUrlInput = {
  business_id: string,
  shopify_url: string,
};

export type UpdateShopifyStoreUrlResponse = {
  __typename: "UpdateShopifyStoreUrlResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetTiktokAdAccountInput = {
  business_id?: string | null,
  tik_tok_ad_account_id?: string | null,
  tik_tok_ad_account_name?: string | null,
};

export type SetTiktokAdAccountResponse = {
  __typename: "SetTiktokAdAccountResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DisconnectBusinessTiktokInput = {
  business_id: string,
};

export type DisconnectBusinessTiktokResponse = {
  __typename: "DisconnectBusinessTiktokResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DisconnectBusinessGoogleResponse = {
  __typename: "DisconnectBusinessGoogleResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateMonthlyBudgetInput = {
  business_id: string,
  amount: number,
};

export type UpdateMonthlyBudgetResponse = {
  __typename: "UpdateMonthlyBudgetResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateRoasGoalsInput = {
  business_id: string,
  campaigns: number,
  ads: number,
  adsets: number,
};

export type UpdateRoasGoalsResponse = {
  __typename: "UpdateRoasGoalsResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetUserSessionResponse = {
  __typename: "SetUserSessionResponse",
  data?: UserSession | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetUserSessionResponsePrisma = {
  __typename: "SetUserSessionResponsePrisma",
  data?: UserSessionPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UserSessionPrisma = {
  __typename: "UserSessionPrisma",
  browser_name?: string | null,
  browser_version?: string | null,
  created_at?: string | null,
  ip?: string | null,
  location?: string | null,
  os_name?: string | null,
  os_version?: string | null,
  users: UserConnectionPrisma,
};

export type UserConnectionPrisma = {
  __typename: "UserConnectionPrisma",
  connect: UserIDPrisma,
};

export type UserIDPrisma = {
  __typename: "UserIDPrisma",
  id: string,
};

export type CreateShopifySubscriptionInput = {
  plan_name: string,
  business_id: string,
};

export type CreateShopifySubscriptionResponse = {
  __typename: "CreateShopifySubscriptionResponse",
  data?: ShopifySubscription | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type ShopifySubscription = {
  __typename: "ShopifySubscription",
  confirmationUrl?: string | null,
  id?: string | null,
};

export type CreateShopifySubscriptionEarlyInput = {
  plan_name: string,
  discount_code?: string | null,
  business_id: string,
};

export type RegisterShopifyUserInput = {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  shopify_store_url?: string | null,
  post_hog_user_id?: string | null,
};

export type RegisterShopifyUserResponse = {
  __typename: "RegisterShopifyUserResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  user?: User | null,
};

export type CheckShopifyLoginInput = {
  shopify_store_url?: string | null,
};

export type CheckShopifyLoginResponse = {
  __typename: "CheckShopifyLoginResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SendRegisterUserEmailInput = {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
};

export type SendRegisterUserEmailResponse = {
  __typename: "SendRegisterUserEmailResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  user?: User | null,
};

export type SendRegisterUserEmailPrismaResponse = {
  __typename: "SendRegisterUserEmailPrismaResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  user?: UserPrisma | null,
};

export type UserPrisma = {
  __typename: "UserPrisma",
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  password?: string | null,
  timezone: string,
  currency: string,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
  businesses?:  Array<UserXBusinessPrisma > | null,
  profile_photo?: string | null,
};

export type UserXBusinessPrisma = {
  __typename: "UserXBusinessPrisma",
  user_id: string,
  business_id: string,
  business: BusinessPrisma,
  user_type: string,
  is_default_business: boolean,
  created_at: string,
  updated_at: string,
  deleted_at?: string | null,
};

export type CancelShopifySubscriptionInput = {
  businessId: string,
};

export type CancelShopifySubscriptionResponse = {
  __typename: "CancelShopifySubscriptionResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type CancelShopifySubscriptionEarlyInput = {
  businessId: string,
};

export type CreateShopifyScriptTagResponse = {
  __typename: "CreateShopifyScriptTagResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetUtmValuesGoogleCampaignsInput = {
  businessId: string,
  campaignId?: string | null,
  adsetId?: string | null,
  adId?: string | null,
  itemType: string,
};

export type SetUtmValuesGoogleCampaignsResponse = {
  __typename: "SetUtmValuesGoogleCampaignsResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetUtmValuesFbCampaignInput = {
  businessId: string,
  campaignId?: string | null,
  adsetId?: string | null,
  adId?: string | null,
  itemType: string,
};

export type SetUtmValuesFbCampaignResponse = {
  __typename: "SetUtmValuesFbCampaignResponse",
  error?: ErrorResponse | null,
  data?: SetUtmValuesFbCampaignResponseData | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetUtmValuesFbCampaignResponseData = {
  __typename: "SetUtmValuesFbCampaignResponseData",
  totalAdsToConnect?: number | null,
  adsConnected?: Array< string | null > | null,
  adsFailed?:  Array<SetUtmValuesFbCampaignErrorAd | null > | null,
};

export type SetUtmValuesFbCampaignErrorAd = {
  __typename: "SetUtmValuesFbCampaignErrorAd",
  ad?: string | null,
  error?: string | null,
};

export type SetUtmValuesSocialCampaignInput = {
  businessId: string,
  campaignId?: string | null,
  adsetId?: string | null,
  adId?: string | null,
  itemType: string,
  source: string,
};

export type SetUtmValuesSocialCampaignResponse = {
  __typename: "SetUtmValuesSocialCampaignResponse",
  error?: ErrorResponse | null,
  data?: SetUtmValuesFbCampaignResponseData | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetUtmValuesTiktokAdInput = {
  businessId: string,
  campaignId?: string | null,
  adsetId?: string | null,
  adId?: string | null,
  itemType: string,
};

export type SetUtmValuesTiktokAdResponse = {
  __typename: "SetUtmValuesTiktokAdResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AddDiscountCodeInput = {
  discount_code: string,
};

export type AddDiscountCodeResponse = {
  __typename: "AddDiscountCodeResponse",
  data?: DiscountCode | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AddDiscountCodeResponsePrisma = {
  __typename: "AddDiscountCodeResponsePrisma",
  data?: PromoCode | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type PromoCode = {
  __typename: "PromoCode",
  id?: string | null,
  code?: string | null,
  type?: string | null,
  status?: string | null,
  duration?: number | null,
  amount?: number | null,
  created_at?: string | null,
  updated_at?: string | null,
  deleted_at?: string | null,
};

export type RemoveDiscountCodeResponse = {
  __typename: "RemoveDiscountCodeResponse",
  data?: User | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type RemoveDiscountCodeNewResponse = {
  __typename: "RemoveDiscountCodeNewResponse",
  data?: SubscriptionPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateAdLevelStatusInput = {
  id: string,
  businessId: string,
  source: string,
  typeOfAd: string,
  status: string,
  reminderStatus: boolean,
};

export type UpdateAdLevelStatusResponse = {
  __typename: "UpdateAdLevelStatusResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type updateAdDailyBudgetInput = {
  id: string,
  businessId: string,
  source: string,
  typeOfAd: string,
  amount: number,
  budget_type: string,
  reminderStatus: boolean,
};

export type UpdateAdDailyBudgetResponse = {
  __typename: "UpdateAdDailyBudgetResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type CreateTrackableCopyInput = {
  name?: string | null,
  description?: string | null,
  type?: string | null,
  short_code?: string | null,
  destination_url?: string | null,
  url_position?: string | null,
  business_id?: string | null,
};

export type CreateTrackableCopyResponse = {
  __typename: "CreateTrackableCopyResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type DeleteTrackableCopyInput = {
  id?: string | null,
  short_code?: string | null,
  business_id?: string | null,
};

export type DeleteTrackableCopyResponse = {
  __typename: "DeleteTrackableCopyResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UpdateTrackableCopyInput = {
  id?: string | null,
  business_id?: string | null,
  short_code?: string | null,
  name?: string | null,
  description?: string | null,
  destination_url?: string | null,
  url_position?: string | null,
};

export type UpdateTrackableCopyResponse = {
  __typename: "UpdateTrackableCopyResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SetPerformanceNotesInput = {
  id: string,
  ad_type: string,
  business_id: string,
  description: string,
};

export type SetPerformanceNotesResponse = {
  __typename: "SetPerformanceNotesResponse",
  data?: PerformanceNotesResponseData | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type PerformanceNotesResponseData = {
  __typename: "PerformanceNotesResponseData",
  id?: string | null,
  ad_type?: string | null,
  business_id?: string | null,
  description?: string | null,
};

export type SetAudienceSegmentQueryInput = {
  business_id: string,
  group_name: string,
  dynamic_query_params: string,
  query_type: string,
  audience?: string | null,
};

export type AudienceSegmentQueryResponse = {
  __typename: "AudienceSegmentQueryResponse",
  data?: Segments | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type Segments = {
  __typename: "Segments",
  id: string,
  business_id: string,
  no_of_customers?: number | null,
  added_revenue?: number | null,
  audience?: string | null,
  type: string,
  status: string,
  query_details?: string | null,
  created_at?: string | null,
  updated_at?: string | null,
  group_name: string,
  deleted_at?: string | null,
  dynamic_query_params: string,
};

export type UpdateAudienceSegmentQueryInput = {
  id: string,
  business_id: string,
  fields?: UpdateAudienceFields | null,
};

export type UpdateAudienceFields = {
  group_name?: string | null,
  dynamic_query_params?: string | null,
  audience?: string | null,
  query_type?: string | null,
  status?: string | null,
};

export type UpdateAudienceSegmentResponse = {
  __typename: "UpdateAudienceSegmentResponse",
  data?: AudienceSuccessResponse | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AudienceSuccessResponse = {
  __typename: "AudienceSuccessResponse",
  success?: boolean | null,
};

export type DeleteAudienceSegmentInput = {
  id: string,
  business_id: string,
};

export type DeleteAudienceSegmentResponse = {
  __typename: "DeleteAudienceSegmentResponse",
  data?: AudienceSuccessResponse | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type CreateSuggestedSegmentsInput = {
  business_id: string,
  query_type: string,
};

export type CreateSuggestedSegmentsResponse = {
  __typename: "CreateSuggestedSegmentsResponse",
  data?: Segments | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AutoScalingSettingResponse = {
  __typename: "AutoScalingSettingResponse",
  error?: ErrorResponse | null,
  message?: string | null,
};

export type EndTrialResponse = {
  __typename: "EndTrialResponse",
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GenerateUploadUrlInput = {
  business_id: string,
  content_type: string,
  extension_type: string,
};

export type GenerateUploadUrlResponse = {
  __typename: "GenerateUploadUrlResponse",
  data?: UploadUrlResponse | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type UploadUrlResponse = {
  __typename: "UploadUrlResponse",
  upload_url?: string | null,
  url?: string | null,
};

export type GetMemberCountByAdGroupIDsInput = {
  selected_campaign_ids?: Array< string | null > | null,
  selected_ad_set_ids?: Array< string | null > | null,
  business_id?: string | null,
  dateStart?: string | null,
  dateEnd?: string | null,
};

export type GetMemberCountByAdGroupIDsResponse = {
  __typename: "GetMemberCountByAdGroupIDsResponse",
  data?: MemberCount | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type MemberCount = {
  __typename: "MemberCount",
  adSetCount?: number | null,
  adsCount?: number | null,
};

export type GetMemberCountByAdGroupIDsInputNew = {
  selected_campaign_ids?: Array< string | null > | null,
  selected_ad_set_ids?: Array< string | null > | null,
  business_id?: string | null,
};

export type GetAllStaffAccountsInput = {
  business_id?: string | null,
};

export type GetAllStaffAccountsResponse = {
  __typename: "GetAllStaffAccountsResponse",
  data?:  Array<User | null > | null,
  // may need to be data: [User]
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetAllStaffAccountsResponsePrisma = {
  __typename: "GetAllStaffAccountsResponsePrisma",
  data?:  Array<UserPrisma | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetBusinessesInput = {
  business_id: string,
  nextToken?: string | null,
};

export type GetBusinessesInputResponse = {
  __typename: "GetBusinessesInputResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetBusinessByVanityNameInput = {
  vanity_name: string,
};

export type GetBusinessByVanityNameResponse = {
  __typename: "GetBusinessByVanityNameResponse",
  data?: Business | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetAdGroupBudgetDetailsInput = {
  business_id?: string | null,
  itemType?: string | null,
  id?: string | null,
  dateStart?: string | null,
  dateEnd?: string | null,
};

export type GetAdGroupBudgetDetailsResponse = {
  __typename: "GetAdGroupBudgetDetailsResponse",
  data?: AdGroupBudgetDetailsObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type AdGroupBudgetDetailsObject = {
  __typename: "AdGroupBudgetDetailsObject",
  adGroup?: AdGroupBudgetDetails | null,
  relatedItems?:  Array<Performance | null > | null,
};

export type AdGroupBudgetDetails = {
  __typename: "AdGroupBudgetDetails",
  daily_budget?: number | null,
  lifetime_budget?: number | null,
  name?: string | null,
  source_delivery_status?: string | null,
  source_secondary_status?: string | null,
  shared_budget_name?: string | null,
};

export type Performance = {
  __typename: "Performance",
  id?: string | null,
  source?: string | null,
  business_id?: string | null,
  purchases_count?: number | null,
  clicks_count?: number | null,
  daily_budget?: number | null,
  lifetime_budget?: number | null,
  shared_budget_name?: string | null,
  campaign_name?: string | null,
  campaign_budget?: AdGroupBudgetDetails | null,
  ad_set_budget?: AdGroupBudgetDetails | null,
  ad_images?: Array< string | null > | null,
  itemType?: string | null,
  ad_image?: string | null,
  ad_set?: string | null,
  ad_set_name?: string | null,
  ad?: string | null,
  ad_name?: string | null,
  sirge_ad_id?: string | null,
  sirge_adset_id?: string | null,
  sirge_campaign_id?: string | null,
  total_title?: string | null,
  source_delivery_status?: string | null,
  source_secondary_status?: string | null,
  clicks?: number | null,
  purchases?: number | null,
  purchases_source?: number | null,
  roas?: string | null,
  cost_per_purchase?: number | null,
  amount_spent?: number | null,
  average_cpm?: number | null,
  conversion_value?: number | null,
  total_conversion_value?: number | null,
  roas_ltv?: number | null,
  sirge_clicks?: number | null,
  sirge_purchases?: number | null,
  sirge_roas?: string | null,
  sirge_cost_per_purchase?: number | null,
  sirge_total_conversion_value?: number | null,
  created?: string | null,
  updated_at?: string | null,
  ad_type?: string | null,
  utm_status?: boolean | null,
  are_all_ads_connected?: boolean | null,
  transform?: boolean | null,
};

export type GetBusinessSourcesByIdInput = {
  business_id: string,
  date_from?: string | null,
  date_to?: string | null,
  sort?: SourcesSortObjectType | null,
  numberOfPage?: number | null,
};

export type SourcesSortObjectType = {
  sort?: string | null,
  field?: string | null,
};

export type GetBusinessSourcesByIdResponse = {
  __typename: "GetBusinessSourcesByIdResponse",
  data?: GetBusinessSourcesObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
  numberPages?: number | null,
};

export type GetBusinessSourcesObject = {
  __typename: "GetBusinessSourcesObject",
  sources?:  Array<SourcesBusiness | null > | null,
  totalInfo?: TotalInfo | null,
};

export type SourcesBusiness = {
  __typename: "SourcesBusiness",
  source?: string | null,
  unique_visitor?: number | null,
  clicks_count?: number | null,
  purchases_count?: number | null,
  url?: string | null,
  created?: string | null,
  referer?: string | null,
  business_id?: string | null,
};

export type TotalInfo = {
  __typename: "TotalInfo",
  total_clicks?: number | null,
  total_purchases?: number | null,
  totalrecords?: number | null,
  total_visitors?: number | null,
  total_pageviews?: number | null,
};

export type GetBusinessSourcesDetailsByIdInput = {
  business_id: string,
  date_from: string,
  date_to: string,
  source_name: string,
  sort?: SourcesSortObjectType | null,
  numberOfPage?: number | null,
};

export type GetBusinessSourcesDetailsByIdResponse = {
  __typename: "GetBusinessSourcesDetailsByIdResponse",
  data?:  Array<SourcesBusiness | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  numberPages?: number | null,
};

export type GetAllVisitorsInput = {
  business_id: string,
  date_from: string,
  date_to: string,
  sort?: SourcesSortObjectType | null,
  filters?: Array< FilterObjectType | null > | null,
  numberOfPage?: number | null,
};

export type FilterObjectType = {
  field: string,
  operator: string,
  value?: string | null,
  logicalOperator?: string | null,
};

export type GetAllVisitorResponse = {
  __typename: "GetAllVisitorResponse",
  data?: GetAllVisitorObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
  numberPages?: number | null,
};

export type GetAllVisitorObject = {
  __typename: "GetAllVisitorObject",
  visitors?:  Array<AllBusinessVisitor | null > | null,
  totalInfo?: TotalInfo | null,
};

export type AllBusinessVisitor = {
  __typename: "AllBusinessVisitor",
  _id?: string | null,
  total_clicks?: string | null,
  total_purchase_value?: string | null,
  last_visit?: string | null,
  first_visit?: string | null,
  total_purchases?: string | null,
  total_pageviews?: string | null,
  visitor_id?: string | null,
  visitor_name?: string | null,
  visitor_email?: string | null,
};

export type getAllVisitorsGraphInput = {
  business_id: string,
  category?: string | null,
  date_from?: string | null,
  date_to?: string | null,
};

export type GetAllVisitorGraphResponse = {
  __typename: "GetAllVisitorGraphResponse",
  data?:  Array<AllBusinessVisitorGraph | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AllBusinessVisitorGraph = {
  __typename: "AllBusinessVisitorGraph",
  date?: string | null,
  new_visitors?: string | null,
  returning_visitors?: string | null,
};

export type getVisitorDetailInput = {
  business_id: string,
  visitor_id: string,
};

export type GetVisitorDetailResponse = {
  __typename: "GetVisitorDetailResponse",
  data?: VisitorDetail | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type VisitorDetail = {
  __typename: "VisitorDetail",
  visitor_email?: string | null,
  country?: string | null,
  state?: string | null,
  city?: string | null,
  total_pageviews?: string | null,
  first_visit?: string | null,
  total_purchases?: string | null,
  total_purchase_conversion_value?: string | null,
};

export type getVisitorDetailPageViewInput = {
  business_id: string,
  visitor_id: string,
  page: number,
  sort?: SortObject | null,
};

export type SortObject = {
  column: string,
  order: string,
};

export type GetVisitorDetailPageviewResponse = {
  __typename: "GetVisitorDetailPageviewResponse",
  data?:  Array<PageView | null > | null,
  total_records?: number | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type PageView = {
  __typename: "PageView",
  ad?: string | null,
  ad_set?: string | null,
  business_id?: string | null,
  campaign?: string | null,
  checkout_platform?: string | null,
  conversion_value?: string | null,
  created?: string | null,
  currency?: string | null,
  expiry_date?: string | null,
  id?: string | null,
  ip?: string | null,
  order_id?: string | null,
  purchase_id?: string | null,
  referer?: string | null,
  sirge_ad_id?: string | null,
  sirge_adset_id?: string | null,
  sirge_campaign_id?: string | null,
  sirge_source_name?: string | null,
  source?: string | null,
  tracking_channel?: string | null,
  url?: string | null,
  clicks_count?: number | null,
  purchases_count?: number | null,
  visitor_addresscity?: string | null,
  visitor_addresscountry?: string | null,
  visitor_addressline1?: string | null,
  visitor_addressline2?: string | null,
  visitor_addresspostal_code?: string | null,
  visitor_addressprovince?: string | null,
  visitor_email?: string | null,
  visitor_id?: string | null,
  visitor_name?: string | null,
  visitor_phone?: string | null,
};

export type getVisitorDetailSourcesInput = {
  business_id: string,
  visitor_id: string,
  page: number,
  sort?: SortObject | null,
};

export type GetVisitorDetailSourcesResponse = {
  __typename: "GetVisitorDetailSourcesResponse",
  data?:  Array<VisitorDetailSource | null > | null,
  total_records?: number | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type VisitorDetailSource = {
  __typename: "VisitorDetailSource",
  sirge_source_name?: string | null,
  url?: string | null,
};

export type GetBusinessesResponse = {
  __typename: "GetBusinessesResponse",
  data?: Businesses | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type Businesses = {
  __typename: "Businesses",
  business_active_count?: number | null,
  business_count?: number | null,
  business_list?:  Array<Business | null > | null,
};

export type GetBusinessGoogleAccountsResponse = {
  __typename: "GetBusinessGoogleAccountsResponse",
  data?:  Array<GoogleCustomer | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type GoogleCustomer = {
  __typename: "GoogleCustomer",
  resourceName: string,
  descriptiveName: string,
};

export type GetBusinessGoogleTokenResponse = {
  __typename: "GetBusinessGoogleTokenResponse",
  data?: string | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type GetCreditTransactionReponse = {
  __typename: "GetCreditTransactionReponse",
  data?:  Array<TransactionObjectResponse | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type TransactionObjectResponse = {
  __typename: "TransactionObjectResponse",
  amount?: number | null,
  created?: number | null,
  ending_balance?: number | null,
  id?: string | null,
  type?: string | null,
};

export type GetCurrentUserSessionsInput = {
  business_id: string,
};

export type GetCurrentUserSessionsResponse = {
  __typename: "GetCurrentUserSessionsResponse",
  data?:  Array<UserSession | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type FacebookAdAccountsResponse = {
  __typename: "FacebookAdAccountsResponse",
  data?:  Array<FacebookAdAccount | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type FacebookAdAccount = {
  __typename: "FacebookAdAccount",
  id?: string | null,
  currency?: string | null,
  name?: string | null,
};

export type SocialAdAccountsResponse = {
  __typename: "SocialAdAccountsResponse",
  data?:  Array<SocialAdAccount | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type SocialAdAccount = {
  __typename: "SocialAdAccount",
  id?: string | null,
  currency?: string | null,
  name?: string | null,
  timezone?: string | null,
};

export type GetInvoicesResponse = {
  __typename: "GetInvoicesResponse",
  data?:  Array<InvoiceObject | null > | null,
};

export type InvoiceObject = {
  __typename: "InvoiceObject",
  created?: string | null,
  invoice_id?: string | null,
  invoice_number?: number | null,
  invoice_pdf?: string | null,
  status?: string | null,
  total?: string | null,
};

export type GetPlatformModeResponse = {
  __typename: "GetPlatformModeResponse",
  data?: PlatformSettings | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type PlatformSettings = {
  __typename: "PlatformSettings",
  closed_mode?: number | null,
  free_trial_page_view_limit?: number | null,
  maintenance_mode?: number | null,
};

export type GetPageViewInput = {
  business_id: string,
  nextToken?: string | null,
  pageview_id: string,
};

export type GetPageViewInputResponse = {
  __typename: "GetPageViewInputResponse",
  data?: BusinessPageViewPurchase | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type BusinessPageViewPurchase = {
  __typename: "BusinessPageViewPurchase",
  purchase?: PurchaseView | null,
};

export type PurchaseView = {
  __typename: "PurchaseView",
  first_touch_ad?: string | null,
  first_touch_ad_set?: string | null,
  first_touch_campaign?: string | null,
  last_touch_ad?: string | null,
  last_touch_ad_set?: string | null,
  last_touch_campaign?: string | null,
};

export type GetStaffByIdInput = {
  staff_id: string,
  business_id: string,
};

export type GetUserResponse = {
  __typename: "GetUserResponse",
  data?: User | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetUserResponsePrisma = {
  __typename: "GetUserResponsePrisma",
  data?: UserPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetSubscriptionInput = {
  business_id: string,
};

export type GetSubscriptionResponse = {
  __typename: "GetSubscriptionResponse",
  data?: SubscriptionObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type SubscriptionObject = {
  __typename: "SubscriptionObject",
  billing_cycle_anchor?: string | null,
  current_billing_period_end?: string | null,
  current_billing_period_start?: string | null,
  plan?: PlanInfo | null,
  status?: string | null,
  subscription_id?: string | null,
  trial_end?: string | null,
  trial_start?: string | null,
};

export type PlanInfo = {
  __typename: "PlanInfo",
  billing_scheme?: string | null,
  details?: Plan | null,
  price_id?: string | null,
  quantity?: string | null,
  unit_amount?: string | null,
};

export type GetUsageResponse = {
  __typename: "GetUsageResponse",
  data?: Usage | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type Usage = {
  __typename: "Usage",
  total_usage?: number | null,
};

export type GetUserInput = {
  post_hog_user_id?: string | null,
};

export type GetPerformanceDetailsInput = {
  business_id: string,
  itemType?: string | null,
  source?: string | null,
  selected_campaigns?: Array< string | null > | null,
  selected_ad_sets?: Array< string | null > | null,
  sort?: PerformanceSortObjectType | null,
  filterCondition?: FilterConditionType | null,
  numberOfPage?: number | null,
  dateStart?: string | null,
  dateEnd?: string | null,
};

export type PerformanceSortObjectType = {
  sort?: boolean | null,
  field?: string | null,
};

export type FilterConditionType = {
  Condition?: Array< filterConditionArg | null > | null,
  filterStatus?: boolean | null,
  activeChecked?: boolean | null,
  roas?: string | null,
};

export type filterConditionArg = {
  column?: string | null,
  operator?: string | null,
  columnValue?: string | null,
  logicalOperator?: string | null,
};

export type GetPerformanceDetailsResponse = {
  __typename: "GetPerformanceDetailsResponse",
  data?: GetBusinessPerformanceDetails | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type GetBusinessPerformanceDetails = {
  __typename: "GetBusinessPerformanceDetails",
  performance?:  Array<Performance | null > | null,
  summary?: PerformanceSummary | null,
  isRoasGoalsSet?: boolean | null,
};

export type PerformanceSummary = {
  __typename: "PerformanceSummary",
  amount_spent?: number | null,
  clicks?: number | null,
  purchases?: number | null,
  purchases_source?: number | null,
  cost_per_purchase?: number | null,
  total_conversion_value?: number | null,
  roas?: string | null,
  ft_clicks?: number | null,
  ft_purchases?: number | null,
  ft_cost_per_purchase?: number | null,
  ft_total_conversion_value?: number | null,
  ft_roas_ltv?: number | null,
  ft_roas?: string | null,
  ft_average_cpm?: number | null,
  number_of_records?: number | null,
};

export type GetBusinessConnectionsInput = {
  business_id?: string | null,
};

export type GetBusinessConnectionsResponse = {
  __typename: "GetBusinessConnectionsResponse",
  data?: BusinessConnection | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type BusinessConnection = {
  __typename: "BusinessConnection",
  facebook_ad_account_id?: string | null,
  facebook_ad_account_name?: string | null,
  script_installed?: boolean | null,
  shopify_store?: string | null,
  tik_tok_ad_account_id?: string | null,
  tik_tok_ad_account_name?: string | null,
};

export type GetBusinessAnalyticsInput = {
  business_id: string,
  dateStart?: string | null,
  dateEnd?: string | null,
  isAdComparison?: boolean | null,
  fetchOnlyActive?: boolean | null,
  limit?: number | null,
  numberPages?: number | null,
  level?: string | null,
  source?: string | null,
  searchText?: string | null,
  sort?: Array< AnalyticsSortObjectType | null > | null,
};

export type AnalyticsSortObjectType = {
  direction?: string | null,
  field?: string | null,
};

export type GetBusinessAnalyticsResponse = {
  __typename: "GetBusinessAnalyticsResponse",
  data?: Analytics | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type Analytics = {
  __typename: "Analytics",
  id?: string | null,
  business_id?: string | null,
  analytic_id?: string | null,
  performance?:  Array<PerformanceData | null > | null,
  performing_product?: PerformingProducts | null,
  best_performing?: BestPerforming | null,
  monthly_budget?: MonthlyBudget | null,
  roas_goals?: RoasGoals | null,
  record_date?: string | null,
};

export type PerformanceData = {
  __typename: "PerformanceData",
  source?: string | null,
  amount_spent?: PerformanceDetail | null,
  total_sales?: PerformanceDetail | null,
  average_order_value?: PerformanceDetail | null,
  total_conversion_value?: PerformanceDetail | null,
  conversion_rate?: PerformanceDetail | null,
  cost_per_purchase?: PerformanceDetail | null,
  blended_roas?: PerformanceDetail | null,
  roas?: PerformanceDetail | null,
  visits?: PerformanceDetail | null,
  purchases?: PerformanceDetail | null,
  ad_clicks?: PerformanceDetail | null,
};

export type PerformanceDetail = {
  __typename: "PerformanceDetail",
  all_amounts?:  Array<AllAmount | null > | null,
  daily_amount?: number | null,
  weekly_amount?: number | null,
  monthly_amount?: number | null,
  daily_percentage?: number | null,
  weekly_percentage?: number | null,
  monthly_percentage?: number | null,
};

export type AllAmount = {
  __typename: "AllAmount",
  amount?: number | null,
  date?: string | null,
};

export type PerformingProducts = {
  __typename: "PerformingProducts",
  daily?:  Array<PerformingProductsObject | null > | null,
  weekly?:  Array<PerformingProductsObject | null > | null,
  monthly?:  Array<PerformingProductsObject | null > | null,
};

export type PerformingProductsObject = {
  __typename: "PerformingProductsObject",
  product_id?: string | null,
  name?: string | null,
  totalPrice?: number | null,
  ordersCount?: number | null,
  percentage?: number | null,
};

export type BestPerforming = {
  __typename: "BestPerforming",
  campaigns?: BestPerformingObject | null,
  adsets?: BestPerformingObject | null,
  ads?: BestPerformingObject | null,
};

export type BestPerformingObject = {
  __typename: "BestPerformingObject",
  daily?:  Array<BestPerformingDetail | null > | null,
  weekly?:  Array<BestPerformingDetail | null > | null,
  monthly?:  Array<BestPerformingDetail | null > | null,
};

export type BestPerformingDetail = {
  __typename: "BestPerformingDetail",
  name?: string | null,
  source?: string | null,
  source_view?: string | null,
  status?: string | null,
  total_amount_spent?: number | null,
  total_conversion_value?: number | null,
  roas?: number | null,
  purchases?: number | null,
  ad_images?: Array< string | null > | null,
  impact?: number | null,
};

export type MonthlyBudget = {
  __typename: "MonthlyBudget",
  total?: number | null,
  facebook?: number | null,
  tiktok?: number | null,
  amount_left?: number | null,
};

export type RoasGoals = {
  __typename: "RoasGoals",
  campaigns?: RoasGoalObject | null,
  adsets?: RoasGoalObject | null,
  ads?: RoasGoalObject | null,
};

export type RoasGoalObject = {
  __typename: "RoasGoalObject",
  goal?: number | null,
  value?:  Array<RoasGoalObjectDetail | null > | null,
};

export type RoasGoalObjectDetail = {
  __typename: "RoasGoalObjectDetail",
  source?: string | null,
  daily?: RoasGoalInnerDetail | null,
  weekly?: RoasGoalInnerDetail | null,
  monthly?: RoasGoalInnerDetail | null,
};

export type RoasGoalInnerDetail = {
  __typename: "RoasGoalInnerDetail",
  over?: RoasGoalsInnerDetailCompare | null,
  under?: RoasGoalsInnerDetailCompare | null,
};

export type RoasGoalsInnerDetailCompare = {
  __typename: "RoasGoalsInnerDetailCompare",
  percentage?: number | null,
  amount?: number | null,
};

export type GetBusinessAnalyticsTopPerformingProductsResponse = {
  __typename: "GetBusinessAnalyticsTopPerformingProductsResponse",
  data?: TopPerformingProduct | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type TopPerformingProduct = {
  __typename: "TopPerformingProduct",
  business_id?: string | null,
  created_day?: string | null,
  daily?:  Array<PerformingProductsObject | null > | null,
  weekly?:  Array<PerformingProductsObject | null > | null,
  monthly?:  Array<PerformingProductsObject | null > | null,
};

export type GetPurchaseByBusinessInput = {
  business_id: string,
  date_from: string,
  date_to: string,
  typePurchases: string,
  source?: string | null,
  selected_ids: Array< string | null >,
  page_no?: number | null,
  per_page?: number | null,
};

export type GetPurchasesByBusinessResponse = {
  __typename: "GetPurchasesByBusinessResponse",
  data?:  Array<PageView | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type GetPurchasesByBusinessResponseNew = {
  __typename: "GetPurchasesByBusinessResponseNew",
  data?:  Array<PurchaseByBusiness | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type PurchaseByBusiness = {
  __typename: "PurchaseByBusiness",
  visitor_name?: string | null,
  visitor_id?: string | null,
  created?: string | null,
  purchases_count?: number | null,
  conversion_value?: number | null,
};

export type GetUserTiktokAdsInput = {
  tik_tok_access_token: string,
  business_id: string,
};

export type GetUserTiktokAdsResponse = {
  __typename: "GetUserTiktokAdsResponse",
  data?:  Array<TiktokAds | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type TiktokAds = {
  __typename: "TiktokAds",
  advertiser_id?: string | null,
  advertiser_name?: string | null,
};

export type GetCurrentUserBusinessDetailsInput = {
  vanity_name?: string | null,
};

export type GetCurrentUserBusinessDetailsResponse = {
  __typename: "GetCurrentUserBusinessDetailsResponse",
  data?: CurrentUserBusinessDetails | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type CurrentUserBusinessDetails = {
  __typename: "CurrentUserBusinessDetails",
  business?: Business | null,
  businesses?: Businesses | null,
  status?: BusinessActiveStatus | null,
};

export type BusinessActiveStatus = {
  __typename: "BusinessActiveStatus",
  active?: boolean | null,
};

export type GetCurrentUserBusinessDetailsResponsePrisma = {
  __typename: "GetCurrentUserBusinessDetailsResponsePrisma",
  data?: CurrentUserBusinessDetailsPrisma | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type CurrentUserBusinessDetailsPrisma = {
  __typename: "CurrentUserBusinessDetailsPrisma",
  business?: BusinessPrisma | null,
  businesses?: BusinessesPrisma | null,
  status?: BusinessActiveStatus | null,
};

export type BusinessesPrisma = {
  __typename: "BusinessesPrisma",
  business_active_count?: number | null,
  business_count?: number | null,
  business_list?:  Array<UserXBusinessPrisma | null > | null,
};

export type GetShopifyExtensionStatusInput = {
  business_id: string,
};

export type GetShopifyExtensionStatusResponse = {
  __typename: "GetShopifyExtensionStatusResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetUserFacebookAccountInput = {
  facebook_accessToken: string,
  business_id: string,
};

export type GetUserFacebookAccountResponse = {
  __typename: "GetUserFacebookAccountResponse",
  data?: FacebookAccount | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type FacebookAccount = {
  __typename: "FacebookAccount",
  id?: string | null,
  name?: string | null,
};

export type GetDiscountCodeStatusInput = {
  discount_code: string,
};

export type GetDiscountCodeStatusResponse = {
  __typename: "GetDiscountCodeStatusResponse",
  data?: DiscountCode | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetDiscountCodeStatusNewResponse = {
  __typename: "GetDiscountCodeStatusNewResponse",
  data?: PromoCode | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetBusinessAdcomparisonDataResponse = {
  __typename: "GetBusinessAdcomparisonDataResponse",
  data?:  Array<AnalyticsPerformance | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type AnalyticsPerformance = {
  __typename: "AnalyticsPerformance",
  name?: string | null,
  source?: string | null,
  status?: string | null,
  total_amount_spent?: number | null,
  roas?: number | null,
  purchases?: number | null,
  ad_images?: Array< string | null > | null,
  sirge_ad_id?: string | null,
  sirge_adset_id?: string | null,
  sirge_campaign_id?: string | null,
  impact?: number | null,
  total_conversion_value?: number | null,
  id?: string | null,
};

export type GetBusinessAnalyticsStatisticsResponse = {
  __typename: "GetBusinessAnalyticsStatisticsResponse",
  data?: AnalyticsStatisticsData | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type AnalyticsStatisticsData = {
  __typename: "AnalyticsStatisticsData",
  business_id?: string | null,
  all?: SocialWidget | null,
  facebook?: SocialWidget | null,
  tiktok?: SocialWidget | null,
  google?: SocialWidget | null,
};

export type SocialWidget = {
  __typename: "SocialWidget",
  purchases?: WidgetValue | null,
  total_sales?: WidgetValue | null,
  average_order_value?: WidgetValue | null,
  blended_roas?: WidgetValue | null,
  visitors?: WidgetValue | null,
  conversion_rate?: WidgetValue | null,
  amount_spent?: WidgetValue | null,
  total_conversion_value?: WidgetValue | null,
  cost_per_purchase?: WidgetValue | null,
  roas?: WidgetValue | null,
  ad_clicks?: WidgetValue | null,
};

export type WidgetValue = {
  __typename: "WidgetValue",
  amount?: number | null,
  percentage?: number | null,
};

export type GetStatisticsGraphResponse = {
  __typename: "GetStatisticsGraphResponse",
  data?: StatisticData | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type StatisticData = {
  __typename: "StatisticData",
  business_id?: string | null,
  all?: StatisticGraph | null,
  facebook?: StatisticGraph | null,
  tiktok?: StatisticGraph | null,
  google?: StatisticGraph | null,
};

export type StatisticGraph = {
  __typename: "StatisticGraph",
  purchases?:  Array<StatisticGraphDataDetail | null > | null,
  amount_spent?:  Array<StatisticGraphDataDetail | null > | null,
  visitors?:  Array<StatisticGraphDataDetail | null > | null,
  total_sales?:  Array<StatisticGraphDataDetail | null > | null,
  ad_clicks?:  Array<StatisticGraphDataDetail | null > | null,
  total_conversion_value?:  Array<StatisticGraphDataDetail | null > | null,
};

export type StatisticGraphDataDetail = {
  __typename: "StatisticGraphDataDetail",
  created?: string | null,
  amount?: number | null,
};

export type GetBusinessMonthlyBudgetRoasResponse = {
  __typename: "GetBusinessMonthlyBudgetRoasResponse",
  data?: MonthlyBudgetSources | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type MonthlyBudgetSources = {
  __typename: "MonthlyBudgetSources",
  sources?:  Array<MonthlyBudgetObject | null > | null,
  roas?: BusinessAnalyticsRoas | null,
};

export type MonthlyBudgetObject = {
  __typename: "MonthlyBudgetObject",
  id?: string | null,
  amount_spent?: number | null,
  source?: string | null,
};

export type BusinessAnalyticsRoas = {
  __typename: "BusinessAnalyticsRoas",
  campaignData?:  Array<AnalyticsRoas | null > | null,
  adsetData?:  Array<AnalyticsRoas | null > | null,
  adData?:  Array<AnalyticsRoas | null > | null,
};

export type AnalyticsRoas = {
  __typename: "AnalyticsRoas",
  id?: string | null,
  source?: string | null,
  purchases?: number | null,
  roas?: string | null,
  cost_per_purchase?: number | null,
  amount_spent?: number | null,
  conversion_value?: number | null,
  total_conversion_value?: number | null,
  sirge_purchases?: number | null,
  sirge_roas?: string | null,
  sirge_cost_per_purchase?: number | null,
  sirge_total_conversion_value?: number | null,
  campaign?: ParentAdDetail | null,
  adset?: ParentAdDetail | null,
  source_delivery_status?: string | null,
  source_secondary_status?: string | null,
};

export type ParentAdDetail = {
  __typename: "ParentAdDetail",
  id?: string | null,
  name?: string | null,
  status?: string | null,
  source_secondary_status?: string | null,
};

export type GetVisitorDetailsInput = {
  business_id: string,
  visitor_id: string,
};

export type GetVisitorDetailsResponse = {
  __typename: "GetVisitorDetailsResponse",
  data?: VisitorDetails | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type VisitorDetails = {
  __typename: "VisitorDetails",
  visitor_email?: string | null,
  country?: string | null,
  state?: string | null,
  city?: string | null,
  total_pageviews?: number | null,
  first_visit?: string | null,
  total_purchases?: number | null,
  total_purchase_conversion_value?: number | null,
  visitor_name?: string | null,
};

export type getVisitorDetailsPageViewsInput = {
  business_id: string,
  visitor_id: string,
  page: number,
};

export type GetVisitorDetailsPageviewsResponse = {
  __typename: "GetVisitorDetailsPageviewsResponse",
  data?:  Array<VisitorDetailsPageView | null > | null,
  total_records?: number | null,
  numberPages?: number | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type VisitorDetailsPageView = {
  __typename: "VisitorDetailsPageView",
  ad?: string | null,
  ad_set?: string | null,
  campaign?: string | null,
  business_id?: string | null,
  conversion_value?: number | null,
  created_day?: string | null,
  created?: string | null,
  pageview_id?: string | null,
  referer?: string | null,
  sirge_source_name?: string | null,
  url?: string | null,
};

export type GetVisitorDetailsSourcesInput = {
  business_id: string,
  visitor_id: string,
  page: number,
};

export type GetVisitorDetailsSourcesResponse = {
  __typename: "GetVisitorDetailsSourcesResponse",
  data?:  Array<VisitorDetailsSource | null > | null,
  total_records?: number | null,
  numberPages?: number | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type VisitorDetailsSource = {
  __typename: "VisitorDetailsSource",
  sirge_source_name?: string | null,
  url?: string | null,
};

export type GetShopifyScopesStatusResponse = {
  __typename: "GetShopifyScopesStatusResponse",
  data?: boolean | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetAccountsCampaignsInput = {
  business_id: string,
  itemType: string,
  getfromRRSSApis?: boolean | null,
};

export type GetAccountsCampaignsResponse = {
  __typename: "GetAccountsCampaignsResponse",
  data?: GetBusinessAccountsCampaigns | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetBusinessAccountsCampaigns = {
  __typename: "GetBusinessAccountsCampaigns",
  facebook?:  Array<ItemSocialMediaIntegration | null > | null,
  tiktok?:  Array<ItemSocialMediaIntegration | null > | null,
  google?:  Array<ItemSocialMediaIntegration | null > | null,
};

export type ItemSocialMediaIntegration = {
  __typename: "ItemSocialMediaIntegration",
  id?: string | null,
  name?: string | null,
  status?: string | null,
  utm_status?: boolean | null,
};

export type GetPerformanceDrawerBasicDetailsInput = {
  id: string,
  ad_type: string,
  business_id: string,
};

export type PerformanceDrawerBasicDetailsResponse = {
  __typename: "PerformanceDrawerBasicDetailsResponse",
  data?: PerformanceDrawerBasicDetails | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type PerformanceDrawerBasicDetails = {
  __typename: "PerformanceDrawerBasicDetails",
  id?: string | null,
  name?: string | null,
  source?: string | null,
  source_delivery_status?: string | null,
  source_secondary_status?: string | null,
  no_of_ads?: number | null,
  no_of_adsets?: number | null,
  utm_status?: boolean | null,
  are_all_ads_connected?: boolean | null,
  daily_budget?: number | null,
  shared_budget_name?: string | null,
  lifetime_budget?: number | null,
  ad_images?: Array< string | null > | null,
  ad_type?: string | null,
};

export type GetPerformanceDrawerStatsInput = {
  id: string,
  ad_type: string,
  dateStart: string,
  dateEnd: string,
  business_id: string,
};

export type PerformanceDrawerStatsResponse = {
  __typename: "PerformanceDrawerStatsResponse",
  data?: PerformanceDrawerStats | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type PerformanceDrawerStats = {
  __typename: "PerformanceDrawerStats",
  total_amount_spent?: number | null,
  total_roas?: number | null,
  total_conversion?: number | null,
  total_purchases?: number | null,
  graph?:  Array<PerformanceDrawerStatsGraph | null > | null,
};

export type PerformanceDrawerStatsGraph = {
  __typename: "PerformanceDrawerStatsGraph",
  total_amount_spent?: number | null,
  total_conversion_value?: number | null,
  created?: string | null,
};

export type GenerateTrackableCopyPathInput = {
  business_id: string,
};

export type GenerateTrackableCopyPathResponse = {
  __typename: "GenerateTrackableCopyPathResponse",
  data?: GeneratedPath | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GeneratedPath = {
  __typename: "GeneratedPath",
  path?: string | null,
};

export type GetTrackableCopiesInput = {
  business_id?: string | null,
  page?: number | null,
  date_from?: string | null,
  date_to?: string | null,
  sortField?: string | null,
  sortOrder?: string | null,
};

export type GetTrackableCopiesResponse = {
  __typename: "GetTrackableCopiesResponse",
  data?:  Array<TrackableCopy | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type TrackableCopy = {
  __typename: "TrackableCopy",
  id?: string | null,
  name?: string | null,
  description?: string | null,
  type?: string | null,
  short_code?: string | null,
  destination_url?: string | null,
  url_position?: string | null,
  business_id?: string | null,
  created?: string | null,
  stats?: TrackableCopyStats | null,
};

export type TrackableCopyStats = {
  __typename: "TrackableCopyStats",
  clicks?: number | null,
  purchases?: number | null,
  revenue?: number | null,
};

export type GetTrackableCopyTypesInput = {
  business_id?: string | null,
};

export type GetTrackableCopyTypesResponse = {
  __typename: "GetTrackableCopyTypesResponse",
  data?: Array< string | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type GetTrackableCopyOrdersInput = {
  business_id?: string | null,
  source?: string | null,
  page?: number | null,
  date_from?: string | null,
  date_to?: string | null,
};

export type GetTrackableCopyOrdersResponse = {
  __typename: "GetTrackableCopyOrdersResponse",
  data?:  Array<TrackableCopyOrder | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type TrackableCopyOrder = {
  __typename: "TrackableCopyOrder",
  business_id?: string | null,
  conversion_value?: number | null,
  created?: string | null,
  order_id?: string | null,
  source?: string | null,
  visitor_id?: string | null,
  visitor_name?: string | null,
};

export type GetSourcesOrdersInput = {
  business_id?: string | null,
  source?: string | null,
  page?: number | null,
  date_from?: string | null,
  date_to?: string | null,
};

export type GetSourcesOrdersResponse = {
  __typename: "GetSourcesOrdersResponse",
  data?:  Array<SourceOrder | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type SourceOrder = {
  __typename: "SourceOrder",
  business_id?: string | null,
  conversion_value?: number | null,
  created?: string | null,
  order_id?: string | null,
  source?: string | null,
  visitor_id?: string | null,
  visitor_name?: string | null,
};

export type GetPerformanceNotesInput = {
  id: string,
  ad_type: string,
  business_id: string,
};

export type GetPerformanceNotesResponse = {
  __typename: "GetPerformanceNotesResponse",
  data?: PerformanceNotesResponseData | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetKeyMetricsMonthlyBudgetInput = {
  business_id: string,
};

export type GetKeyMetricsMonthlyBudgetResponse = {
  __typename: "GetKeyMetricsMonthlyBudgetResponse",
  data?:  Array<MonthlyBudgetResponse | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type MonthlyBudgetResponse = {
  __typename: "MonthlyBudgetResponse",
  business_id?: string | null,
  amount_spent?: number | null,
  source?: string | null,
};

export type GetKeyMetricsRoasTrackerInput = {
  business_id: string,
  dateStart: string,
  dateEnd: string,
};

export type GetKeyMetricsRoasTrackerResponse = {
  __typename: "GetKeyMetricsRoasTrackerResponse",
  data?: RoasTrackerResponse | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type RoasTrackerResponse = {
  __typename: "RoasTrackerResponse",
  campaign?: RoasTrackerResponseDetails | null,
  adset?: RoasTrackerResponseDetails | null,
  ad?: RoasTrackerResponseDetails | null,
};

export type RoasTrackerResponseDetails = {
  __typename: "RoasTrackerResponseDetails",
  over?: number | null,
  under?: number | null,
};

export type GetAdcomparisonDataResponse = {
  __typename: "GetAdcomparisonDataResponse",
  data?:  Array<AnalyticsPerformanceData | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
  numberPages?: number | null,
};

export type AnalyticsPerformanceData = {
  __typename: "AnalyticsPerformanceData",
  id?: string | null,
  ad_name?: string | null,
  ad_primary_status?: string | null,
  ad_secondary_status?: string | null,
  total_amount_spent?: number | null,
  roas?: number | null,
  total_orders?: number | null,
  total_conversion_value?: number | null,
  ad_images?: Array< string | null > | null,
  source?: string | null,
};

export type GetAllCustomersInput = {
  business_id: string,
  date_from: string,
  date_to: string,
  sort?: SourcesSortObjectType | null,
  filters?: Array< FilterObjectType | null > | null,
  numberOfPage?: number | null,
};

export type GetAllCustomersResponse = {
  __typename: "GetAllCustomersResponse",
  data?: GetAllCustomersObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
  numberPages?: number | null,
};

export type GetAllCustomersObject = {
  __typename: "GetAllCustomersObject",
  customers?:  Array<AllBusinessCustomers | null > | null,
  totalInfo?: TotalInfoCustomers | null,
};

export type AllBusinessCustomers = {
  __typename: "AllBusinessCustomers",
  last_visit?: string | null,
  first_visit?: string | null,
  total_purchases?: string | null,
  total_pageviews?: string | null,
  visitor_id?: string | null,
  visitor_name?: string | null,
};

export type TotalInfoCustomers = {
  __typename: "TotalInfoCustomers",
  total_purchases?: number | null,
  totalrecords?: number | null,
  total_visitors?: number | null,
  total_pageviews?: number | null,
  total_clicks?: number | null,
};

export type GetCustomerJourneyVisitorGraphInput = {
  business_id: string,
  category?: string | null,
  date_from?: string | null,
  date_to?: string | null,
};

export type GetCustomerJourneyVisitorGraphResponse = {
  __typename: "GetCustomerJourneyVisitorGraphResponse",
  data?:  Array<CustomerJourneyVisitorGraph | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type CustomerJourneyVisitorGraph = {
  __typename: "CustomerJourneyVisitorGraph",
  date?: string | null,
  new_visitors?: string | null,
  returning_visitors?: string | null,
};

export type GetDynamicQueryResultInput = {
  segment_id: string,
  business_id: string,
  page?: number | null,
  limit?: number | null,
};

export type GetDynamicQueryResultResponse = {
  __typename: "GetDynamicQueryResultResponse",
  data?:  Array<DynamicQueryResult | null > | null,
  total_records?: number | null,
  message?: string | null,
  error?: ErrorResponse | null,
  nextToken?: string | null,
};

export type DynamicQueryResult = {
  __typename: "DynamicQueryResult",
  average_conversion_value?: number | null,
  business_id?: string | null,
  city?: string | null,
  country?: string | null,
  customer_id?: string | null,
  customer_name?: string | null,
  email?: string | null,
  email_address?: string | null,
  first_order_date?: string | null,
  id?: string | null,
  insight_date?: string | null,
  ninety_day_order_count?: number | null,
  ninety_day_order_total?: number | null,
  price?: number | null,
  product_id?: string | null,
  quantity?: number | null,
  state?: string | null,
  thirty_day_order_count?: number | null,
  thirty_day_order_total?: number | null,
  title?: string | null,
  zip?: string | null,
  customer_order_id?: string | null,
  deleted_at?: string | null,
  updated_at?: string | null,
  created_at?: string | null,
};

export type GetSegmentBuilderBasicDetailsInput = {
  business_id: string,
};

export type GetSegmentBuilderBasicDetailsResponse = {
  __typename: "GetSegmentBuilderBasicDetailsResponse",
  data?: GetSegmentBuilderBasicDetails | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetSegmentBuilderBasicDetails = {
  __typename: "GetSegmentBuilderBasicDetails",
  cities: Array< string >,
  states: Array< string >,
  countries: Array< string >,
  dynamicQueryRules?: string | null,
  predefinedQueries?: string | null,
};

export type GetAllAudienceSegmentQueryInput = {
  sort?: AudienceSortObjectType | null,
  page?: number | null,
  limit?: number | null,
  business_id: string,
};

export type AudienceSortObjectType = {
  column?: string | null,
  order?: string | null,
};

export type GetAllAudienceSegmentSourcesResponse = {
  __typename: "GetAllAudienceSegmentSourcesResponse",
  data?:  Array<Segments | null > | null,
  total_records?: number | null,
  message?: string | null,
  error?: ErrorResponse | null,
  nextToken?: string | null,
};

export type GetAudienceSegmentInput = {
  id: string,
  business_id: string,
};

export type GetAudienceSegmentResponse = {
  __typename: "GetAudienceSegmentResponse",
  data?: Segments | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type GetCustomerJourneySourcesInput = {
  business_id: string,
  date_from?: string | null,
  date_to?: string | null,
};

export type GetCustomerJourneySourcesResponse = {
  __typename: "GetCustomerJourneySourcesResponse",
  data?: GetCustomerJourneySourcesObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
  numberPages?: number | null,
};

export type GetCustomerJourneySourcesObject = {
  __typename: "GetCustomerJourneySourcesObject",
  sources?:  Array<CustomerJourneySource | null > | null,
  totalInfo?: TotalInfoCustomers | null,
};

export type CustomerJourneySource = {
  __typename: "CustomerJourneySource",
  source?: string | null,
  unique_visitor?: number | null,
  clicks_count?: number | null,
  purchases_count?: number | null,
};

export type GetKeyMetricsAnalyticsStatisticsInput = {
  business_id?: string | null,
  dateStart?: string | null,
  dateEnd?: string | null,
};

export type GetKeyMetricsAnalyticsStatisticsResponse = {
  __typename: "GetKeyMetricsAnalyticsStatisticsResponse",
  data?: KeyMetricsAnalyticsStatistics | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type KeyMetricsAnalyticsStatistics = {
  __typename: "KeyMetricsAnalyticsStatistics",
  total_order?: KeyMetricsStatistics | null,
  total_sales?: KeyMetricsStatistics | null,
  average_order_value?: KeyMetricsStatistics | null,
  blended_roas?: BlendedRoasStatistics | null,
  visitors?: KeyMetricsStatistics | null,
  conversion_rate?: KeyMetricsStatistics | null,
};

export type KeyMetricsStatistics = {
  __typename: "KeyMetricsStatistics",
  amount?: number | null,
  percentage?: number | null,
};

export type BlendedRoasStatistics = {
  __typename: "BlendedRoasStatistics",
  amount?: number | null,
  percentage?: number | null,
  sources?: RoasBySources | null,
};

export type RoasBySources = {
  __typename: "RoasBySources",
  facebook?: number | null,
  tiktok?: number | null,
  google?: number | null,
};

export type GetCustomerChannelsInput = {
  business_id: string,
  date_from?: string | null,
  date_to?: string | null,
  sort?: SourcesSortObjectType | null,
  numberOfPage?: number | null,
};

export type GetCustomerChannelsResponse = {
  __typename: "GetCustomerChannelsResponse",
  data?: GetCustomerChannelObject | null,
  error?: ErrorResponse | null,
  message?: string | null,
  numberPages?: number | null,
};

export type GetCustomerChannelObject = {
  __typename: "GetCustomerChannelObject",
  channels?:  Array<CustomerChannel | null > | null,
  totalInfo?: TotalInfo | null,
};

export type CustomerChannel = {
  __typename: "CustomerChannel",
  source?: string | null,
  referer?: string | null,
  unique_visitor?: number | null,
  purchases_count?: number | null,
};

export type GetCustomerChannelsDetailsInput = {
  business_id: string,
  date_from: string,
  date_to: string,
  source_name: string,
  sourceReferer: string,
  sort?: SourcesSortObjectType | null,
  cursor?: string | null,
};

export type GetCustomerChannelsDetailsResponse = {
  __typename: "GetCustomerChannelsDetailsResponse",
  data?: GetCustomerChannelsDetailsResponseData | null,
  error?: ErrorResponse | null,
  message?: string | null,
};

export type GetCustomerChannelsDetailsResponseData = {
  __typename: "GetCustomerChannelsDetailsResponseData",
  channels?:  Array<CustomerChannel | null > | null,
  nextCursor?: string | null,
  prevCursor?: string | null,
};

export type GetKeyMetricsPerformingProductsInput = {
  business_id: string,
  dateStart: string,
  dateEnd: string,
};

export type GetKeyMetricsPerformingProductsResponse = {
  __typename: "GetKeyMetricsPerformingProductsResponse",
  data?:  Array<PerformingProductsData | null > | null,
  error?: ErrorResponse | null,
  message?: string | null,
  nextToken?: string | null,
};

export type PerformingProductsData = {
  __typename: "PerformingProductsData",
  product_id?: string | null,
  name?: string | null,
  totalPrice?: number | null,
  ordersCount?: number | null,
  percentage?: number | null,
};

export type GetSuggestedSegmentsStatsInput = {
  business_id?: string | null,
};

export type GetSuggestedSegmentsStatsResponse = {
  __typename: "GetSuggestedSegmentsStatsResponse",
  data?:  Array<GetSuggestedSegmentsStatsResult | null > | null,
  total_records?: number | null,
  message?: string | null,
  error?: ErrorResponse | null,
  nextToken?: string | null,
};

export type GetSuggestedSegmentsStatsResult = {
  __typename: "GetSuggestedSegmentsStatsResult",
  no_of_customers?: number | null,
  query_type?: string | null,
};

export type ActivateBusinessMutationVariables = {
  activateBusinessInput: ActivateBusinessInput,
};

export type ActivateBusinessMutation = {
  activateBusiness?:  {
    __typename: "ActivateBusinessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type ActivateBusinessNewMutationVariables = {
  activateBusinessInput: ActivateBusinessInput,
};

export type ActivateBusinessNewMutation = {
  activateBusinessNew?:  {
    __typename: "ActivateBusinessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type ApplyPromoCodeMutationVariables = {
  applyPromoCodeInput: ApplyPromoCodeInput,
};

export type ApplyPromoCodeMutation = {
  applyPromoCode?:  {
    __typename: "ApplyPromoCodeResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type AuthenticateTikTokMutationVariables = {
  authenticateTikTokInput: AuthenticateTikTokInput,
};

export type AuthenticateTikTokMutation = {
  authenticateTikTok?:  {
    __typename: "AuthenticateTikTokResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    data?: string | null,
  } | null,
};

export type ChangePasswordMutationVariables = {
  changePasswordInput: ChangePasswordInput,
};

export type ChangePasswordMutation = {
  changePassword?:  {
    __typename: "ChangePasswordResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type ChangePasswordNewMutationVariables = {
  changePasswordInput: ChangePasswordInput,
};

export type ChangePasswordNewMutation = {
  changePasswordNew?:  {
    __typename: "ChangePasswordResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type CreateBusinessMutationVariables = {
  createBusinessInput: CreateBusinessInput,
};

export type CreateBusinessMutation = {
  createBusiness?:  {
    __typename: "CreateBusinessResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateStaffAccountMutationVariables = {
  createStaffAccountInput: CreateStaffAccountInput,
};

export type CreateStaffAccountMutation = {
  createStaffAccount?:  {
    __typename: "CreateStaffAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateStaffAccountNewMutationVariables = {
  createStaffAccountInput: CreateStaffAccountInput,
};

export type CreateStaffAccountNewMutation = {
  createStaffAccountNew?:  {
    __typename: "CreateStaffAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeactivateBusinessMutationVariables = {
  deactivateBusinessInput: DeactivateBusinessInput,
};

export type DeactivateBusinessMutation = {
  deactivateBusiness?:  {
    __typename: "DeactivateBusinessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeleteBusinessByBusinessIdMutationVariables = {
  deleteBusinessesInput: DeleteBusinessesInput,
};

export type DeleteBusinessByBusinessIdMutation = {
  deleteBusinessByBusinessId?:  {
    __typename: "DeleteBusinessesInputResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeleteStaffAccountMutationVariables = {
  deleteStaffAccountInput: DeleteStaffAccountInput,
};

export type DeleteStaffAccountMutation = {
  deleteStaffAccount?:  {
    __typename: "DeleteStaffAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeleteStaffAccountNewMutationVariables = {
  deleteStaffAccountInput: DeleteStaffAccountInput,
};

export type DeleteStaffAccountNewMutation = {
  deleteStaffAccountNew?:  {
    __typename: "DeleteStaffAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DisconnectTikTokMutationVariables = {
  disconnectTikTokInput: DisconnectTikTokInput,
};

export type DisconnectTikTokMutation = {
  disconnectTikTok?:  {
    __typename: "DisconnectTikTokResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type PasswordResetLinkMutationVariables = {
  passwordResetInput: PasswordResetInput,
};

export type PasswordResetLinkMutation = {
  passwordResetLink?:  {
    __typename: "PasswordResetResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type PasswordResetLinkNewMutationVariables = {
  passwordResetInput: PasswordResetInput,
};

export type PasswordResetLinkNewMutation = {
  passwordResetLinkNew?:  {
    __typename: "PasswordResetResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type PayInvoiceMutationVariables = {
  payInvoiceInput: PayInvoiceInput,
};

export type PayInvoiceMutation = {
  payInvoice?:  {
    __typename: "PayInvoiceResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RegisterUserMutationVariables = {
  registerUserInput: RegisterUserInput,
};

export type RegisterUserMutation = {
  registerUser?:  {
    __typename: "RegisterUserResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    user?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
  } | null,
};

export type RemoveFacebookAdAccountMutationVariables = {
  removeFacebookAdAccountInput: RemoveFacebookAdAccountInput,
};

export type RemoveFacebookAdAccountMutation = {
  removeFacebookAdAccount?:  {
    __typename: "RemoveFacebookAdAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type UpdateUserDefaultBusinessMutationVariables = {
  updateUserDefaultBusinessInput: BusinessIdInput,
};

export type UpdateUserDefaultBusinessMutation = {
  updateUserDefaultBusiness?:  {
    __typename: "UpdateUserDefaultBusinessResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RemoveSocialAdAccountMutationVariables = {
  removeSocialAdAccountInput: BusinessIdWithPlatform,
};

export type RemoveSocialAdAccountMutation = {
  removeSocialAdAccount?:  {
    __typename: "RemoveSocialAdAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type RemoveFacebookUserAccessMutationVariables = {
  businessIdInput: BusinessIdInput,
};

export type RemoveFacebookUserAccessMutation = {
  removeFacebookUserAccess?:  {
    __typename: "RemoveFacebookAccessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RemoveSocialUserAccessMutationVariables = {
  businessIdInput: BusinessIdWithPlatform,
};

export type RemoveSocialUserAccessMutation = {
  removeSocialUserAccess?:  {
    __typename: "RemoveSocialAccessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetFacebookAdAccountMutationVariables = {
  setFacebookAdAccountInput: SetFacebookAdAccountInput,
};

export type SetFacebookAdAccountMutation = {
  setFacebookAdAccount?:  {
    __typename: "SetFacebookAdAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type SetFacebookUserAccessMutationVariables = {
  facebookAccessInput: FacebookAccessInput,
};

export type SetFacebookUserAccessMutation = {
  setFacebookUserAccess?:  {
    __typename: "SetFacebookAccessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetSocialUserAccessMutationVariables = {
  socialAccessStoreInput: SetSocialAccessInput,
};

export type SetSocialUserAccessMutation = {
  setSocialUserAccess?:  {
    __typename: "SetSocialAccessResponse",
    data?:  {
      __typename: "AdAccountSettingsPrisma",
      id: string,
      business_id: string,
      ad_platform_id: string,
      premium_page_views: number,
      external_platform?: string | null,
      active_campaign_count: number,
      paused_campaign_count: number,
      social_account_id?: string | null,
      social_account_name?: string | null,
      social_account_currency?: string | null,
      social_account_timezone?: string | null,
      access_token: string,
      utm_count: number,
      social_integration?: string | null,
      conversion_api_enabled?: string | null,
      pixel_id?: string | null,
      social_refresh_token?: string | null,
      updateKey?: string | null,
      last_data_refreshed?: string | null,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      ad_platform:  {
        __typename: "AdPlatformPrisma",
        id: string,
        name: string,
        internal_source_name: string,
        is_sirge_managed: boolean,
        dark_theme_image_url?: string | null,
        light_theme_image_url: string,
        status: string,
        sqs_refresh_queue_url?: string | null,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
        show_budget_confirmation?: boolean | null,
      },
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetSocialAdAccountMutationVariables = {
  setSocialAdAccountInput: SetSocialAdAccountInput,
};

export type SetSocialAdAccountMutation = {
  setSocialAdAccount?:  {
    __typename: "SetSocialAdAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type SetBusinessGoogleAccessTokenMutationVariables = {
  googleAccessInput: SetBusinessGoogleTokenInput,
};

export type SetBusinessGoogleAccessTokenMutation = {
  setBusinessGoogleAccessToken?:  {
    __typename: "SetBusinessGoogleTokenResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type SetBusinessGoogleAdAccountMutationVariables = {
  setGoogleAdAccountInput: SetBusinessGoogleAdAccountInput,
};

export type SetBusinessGoogleAdAccountMutation = {
  setBusinessGoogleAdAccount?:  {
    __typename: "SetBusinessGoogleAdAccountResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type SubscribeMutationVariables = {
  subscribeInput: SubscribeInput,
};

export type SubscribeMutation = {
  subscribe?:  {
    __typename: "SubscribeResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type TriggerBusinessDataLongFetchMutationVariables = {
  triggerBusinessDataLongFetchInput?: TriggerBusinessDataLongFetchInput | null,
};

export type TriggerBusinessDataLongFetchMutation = {
  triggerBusinessDataLongFetch?:  {
    __typename: "TriggerBusinessDataLongFetchResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type TriggerBusinessDataLongFetchNewMutationVariables = {
  triggerBusinessDataLongFetchInput?: BusinessIdInput | null,
};

export type TriggerBusinessDataLongFetchNewMutation = {
  triggerBusinessDataLongFetchNew?:  {
    __typename: "TriggerBusinessDataLongFetchResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type UpdateBusinessByBusinessIdMutationVariables = {
  setBusinessesInput: SetBusinessesInput,
};

export type UpdateBusinessByBusinessIdMutation = {
  updateBusinessByBusinessId?:  {
    __typename: "SetBusinessesInputResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateBusinessByBusinessIdNewMutationVariables = {
  setBusinessesInput: SetBusinessesInput,
};

export type UpdateBusinessByBusinessIdNewMutation = {
  updateBusinessByBusinessIdNew?:  {
    __typename: "SetBusinessesPrismaInputResponse",
    data?:  {
      __typename: "BusinessPrisma",
      id: string,
      store_id: string,
      name: string,
      status: string,
      logo: string,
      vanity_name: string,
      reminder_status?: boolean | null,
      show_budget_confirmation?: boolean | null,
      monthly_budget: number,
      campaign_roas_goal: string,
      adset_roas_goal: string,
      ad_roas_goal: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      ad_account_settings:  Array< {
        __typename: "AdAccountSettingsPrisma",
        id: string,
        business_id: string,
        ad_platform_id: string,
        premium_page_views: number,
        external_platform?: string | null,
        active_campaign_count: number,
        paused_campaign_count: number,
        social_account_id?: string | null,
        social_account_name?: string | null,
        social_account_currency?: string | null,
        social_account_timezone?: string | null,
        access_token: string,
        utm_count: number,
        social_integration?: string | null,
        conversion_api_enabled?: string | null,
        pixel_id?: string | null,
        social_refresh_token?: string | null,
        updateKey?: string | null,
        last_data_refreshed?: string | null,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
        ad_platform:  {
          __typename: "AdPlatformPrisma",
          id: string,
          name: string,
          internal_source_name: string,
          is_sirge_managed: boolean,
          dark_theme_image_url?: string | null,
          light_theme_image_url: string,
          status: string,
          sqs_refresh_queue_url?: string | null,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          show_budget_confirmation?: boolean | null,
        },
      } >,
      subscriptions:  Array< {
        __typename: "SubscriptionPrisma",
        id: string,
        business_id: string,
        subscription_plan_code?: string | null,
        status: string,
        processor?: string | null,
        store_subscription_body?: string | null,
        store_subscription_id?: string | null,
        promo_code_id?: string | null,
        trial_start?: string | null,
        trial_end?: string | null,
        trial_left?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
        subscription_end_date?: string | null,
        business_limit?: number | null,
        staff_limit?: number | null,
        subscription_charges?:  Array< {
          __typename: "SubscriptionChargesPrisma",
          id: string,
          business_id: string,
          subscription_id?: string | null,
          store_revenue: number,
          amount_billed: number,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
        } | null > | null,
        promo_codes?:  {
          __typename: "PromoCodePrisma",
          id?: string | null,
          code?: string | null,
          type?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          created_at?: string | null,
          updated_at?: string | null,
          deleted_at?: string | null,
        } | null,
        current_revenue?: number | null,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } >,
      store?:  {
        __typename: "StorePrisma",
        id?: string | null,
        shop_name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        state?: string | null,
        zip?: string | null,
        country?: string | null,
        store_url?: string | null,
        timezone?: string | null,
        currency?: string | null,
        created_at?: string | null,
        updated_at?: string | null,
        deleted_at?: string | null,
      } | null,
      completed_onboarding_call?: boolean | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateBusinessLogoMutationVariables = {
  updateBusinessLogoInput: UpdateBusinessLogoInput,
};

export type UpdateBusinessLogoMutation = {
  updateBusinessLogo?:  {
    __typename: "UpdateBusinessLogoResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateBusinessLogoNewMutationVariables = {
  updateBusinessLogoInput: UpdateBusinessLogoInput,
};

export type UpdateBusinessLogoNewMutation = {
  updateBusinessLogoNew?:  {
    __typename: "UpdateBusinessLogoNewResponse",
    data?:  {
      __typename: "BusinessPrisma",
      id: string,
      store_id: string,
      name: string,
      status: string,
      logo: string,
      vanity_name: string,
      reminder_status?: boolean | null,
      show_budget_confirmation?: boolean | null,
      monthly_budget: number,
      campaign_roas_goal: string,
      adset_roas_goal: string,
      ad_roas_goal: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      ad_account_settings:  Array< {
        __typename: "AdAccountSettingsPrisma",
        id: string,
        business_id: string,
        ad_platform_id: string,
        premium_page_views: number,
        external_platform?: string | null,
        active_campaign_count: number,
        paused_campaign_count: number,
        social_account_id?: string | null,
        social_account_name?: string | null,
        social_account_currency?: string | null,
        social_account_timezone?: string | null,
        access_token: string,
        utm_count: number,
        social_integration?: string | null,
        conversion_api_enabled?: string | null,
        pixel_id?: string | null,
        social_refresh_token?: string | null,
        updateKey?: string | null,
        last_data_refreshed?: string | null,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
        ad_platform:  {
          __typename: "AdPlatformPrisma",
          id: string,
          name: string,
          internal_source_name: string,
          is_sirge_managed: boolean,
          dark_theme_image_url?: string | null,
          light_theme_image_url: string,
          status: string,
          sqs_refresh_queue_url?: string | null,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          show_budget_confirmation?: boolean | null,
        },
      } >,
      subscriptions:  Array< {
        __typename: "SubscriptionPrisma",
        id: string,
        business_id: string,
        subscription_plan_code?: string | null,
        status: string,
        processor?: string | null,
        store_subscription_body?: string | null,
        store_subscription_id?: string | null,
        promo_code_id?: string | null,
        trial_start?: string | null,
        trial_end?: string | null,
        trial_left?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
        subscription_end_date?: string | null,
        business_limit?: number | null,
        staff_limit?: number | null,
        subscription_charges?:  Array< {
          __typename: "SubscriptionChargesPrisma",
          id: string,
          business_id: string,
          subscription_id?: string | null,
          store_revenue: number,
          amount_billed: number,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
        } | null > | null,
        promo_codes?:  {
          __typename: "PromoCodePrisma",
          id?: string | null,
          code?: string | null,
          type?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          created_at?: string | null,
          updated_at?: string | null,
          deleted_at?: string | null,
        } | null,
        current_revenue?: number | null,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } >,
      store?:  {
        __typename: "StorePrisma",
        id?: string | null,
        shop_name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        state?: string | null,
        zip?: string | null,
        country?: string | null,
        store_url?: string | null,
        timezone?: string | null,
        currency?: string | null,
        created_at?: string | null,
        updated_at?: string | null,
        deleted_at?: string | null,
      } | null,
      completed_onboarding_call?: boolean | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateFacebookConnectionSettingsMutationVariables = {
  updateFacebookConnectionSettingsInput: UpdateFacebookConnectionSettingsInput,
};

export type UpdateFacebookConnectionSettingsMutation = {
  updateFacebookConnectionSettings?:  {
    __typename: "UpdateFacebookConnectionSettingsResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type UpdateStaffAccountAccessMutationVariables = {
  updateStaffAccountAccessInput: UpdateStaffAccountAccessInput,
};

export type UpdateStaffAccountAccessMutation = {
  updateStaffAccountAccess?:  {
    __typename: "UpdateStaffAccountAccessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateStaffAccountAccessNewMutationVariables = {
  updateStaffAccountAccessInput: UpdateStaffAccountAccessNewInput,
};

export type UpdateStaffAccountAccessNewMutation = {
  updateStaffAccountAccessNew?:  {
    __typename: "UpdateStaffAccountAccessResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateSubscriptionItemQuantityMutationVariables = {
  updateSubscriptionItemQuantityInput: UpdateSubscriptionItemQuantityInput,
};

export type UpdateSubscriptionItemQuantityMutation = {
  updateSubscriptionItemQuantity?:  {
    __typename: "UpdateSubscriptionItemQuantityResponse",
    data?:  {
      __typename: "ItemQuantityObject",
      limit?: number | null,
      quantity?: number | null,
    } | null,
  } | null,
};

export type UpdateSubscriptionPlanMutationVariables = {
  updateSubscriptionPlanInput: UpdateSubscriptionPlanInput,
};

export type UpdateSubscriptionPlanMutation = {
  updateSubscriptionPlan?:  {
    __typename: "UpdateSubscriptionPlanResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateTimezoneCurrencyMutationVariables = {
  updateTimezoneCurrencyInput: UpdateTimezoneCurrencyInput,
};

export type UpdateTimezoneCurrencyMutation = {
  updateTimezoneCurrency?:  {
    __typename: "UpdateTimezoneCurrencyResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  updateUserInput: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "UpdateUserResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateUserNewMutationVariables = {
  updateUserInput: UpdateUserInput,
};

export type UpdateUserNewMutation = {
  updateUserNew?:  {
    __typename: "UpdateUserResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateUserProfilePictureMutationVariables = {
  updateUserProfilePictureInput: UpdateUserProfilePictureInput,
};

export type UpdateUserProfilePictureMutation = {
  updateUserProfilePicture?:  {
    __typename: "UpdateUserProfilePictureResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateUserProfilePictureNewMutationVariables = {
  updateUserProfilePictureInput: UpdateUserProfilePictureInput,
};

export type UpdateUserProfilePictureNewMutation = {
  updateUserProfilePictureNew?:  {
    __typename: "UpdateUserProfilePictureResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateUserSubscriptionCardMutationVariables = {
  updateUserSubscriptionCardInput: UpdateSubscriptionCardInput,
};

export type UpdateUserSubscriptionCardMutation = {
  updateUserSubscriptionCard?:  {
    __typename: "UpdateUserSubscriptionCardResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type VerifyTwoFactorMutationVariables = {
  verifyTwoFactorInput: VerifyTwoFactorInput,
};

export type VerifyTwoFactorMutation = {
  verifyTwoFactor?:  {
    __typename: "VerifyTwoFactorResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type VerifyTwoFactorNewMutationVariables = {
  verifyTwoFactorInput: VerifyTwoFactorInput,
};

export type VerifyTwoFactorNewMutation = {
  verifyTwoFactorNew?:  {
    __typename: "VerifyTwoFactorResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RefreshDataForBusinessMutationVariables = {
  refreshDataForBusinessInput: RefreshDataForBusiness,
};

export type RefreshDataForBusinessMutation = {
  refreshDataForBusiness?:  {
    __typename: "RefreshDataForResponse",
    data?: string | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateShopifyStoreUrlMutationVariables = {
  updateShopifyStoreUrlInput: UpdateShopifyStoreUrlInput,
};

export type UpdateShopifyStoreUrlMutation = {
  updateShopifyStoreUrl?:  {
    __typename: "UpdateShopifyStoreUrlResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetTiktokAdAccountMutationVariables = {
  setTiktokAdAccountInput: SetTiktokAdAccountInput,
};

export type SetTiktokAdAccountMutation = {
  setTiktokAdAccount?:  {
    __typename: "SetTiktokAdAccountResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DisconnectBusinessTiktokMutationVariables = {
  disconnectBusinessTiktokInput: DisconnectBusinessTiktokInput,
};

export type DisconnectBusinessTiktokMutation = {
  disconnectBusinessTiktok?:  {
    __typename: "DisconnectBusinessTiktokResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DisconnectBusinessGoogleMutationVariables = {
  disconnectBusinessGoogleInput: BusinessIdInput,
};

export type DisconnectBusinessGoogleMutation = {
  disconnectBusinessGoogle?:  {
    __typename: "DisconnectBusinessGoogleResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DisconnectBusinessGoogleAccountMutationVariables = {
  disconnectBusinessGoogleInput: BusinessIdInput,
};

export type DisconnectBusinessGoogleAccountMutation = {
  disconnectBusinessGoogleAccount?:  {
    __typename: "DisconnectBusinessGoogleResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateMonthlyBudgetMutationVariables = {
  updateMonthlyBudgetInput: UpdateMonthlyBudgetInput,
};

export type UpdateMonthlyBudgetMutation = {
  updateMonthlyBudget?:  {
    __typename: "UpdateMonthlyBudgetResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateRoasGoalsMutationVariables = {
  updateRoasGoalsInput: UpdateRoasGoalsInput,
};

export type UpdateRoasGoalsMutation = {
  updateRoasGoals?:  {
    __typename: "UpdateRoasGoalsResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetUserSessionMutationVariables = {
};

export type SetUserSessionMutation = {
  setUserSession?:  {
    __typename: "SetUserSessionResponse",
    data?:  {
      __typename: "UserSession",
      browser_name?: string | null,
      browser_version?: string | null,
      created_at?: string | null,
      ip?: string | null,
      location?: string | null,
      os_name?: string | null,
      os_version?: string | null,
      user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetUserSessionNewMutationVariables = {
};

export type SetUserSessionNewMutation = {
  setUserSessionNew?:  {
    __typename: "SetUserSessionResponsePrisma",
    data?:  {
      __typename: "UserSessionPrisma",
      browser_name?: string | null,
      browser_version?: string | null,
      created_at?: string | null,
      ip?: string | null,
      location?: string | null,
      os_name?: string | null,
      os_version?: string | null,
      users:  {
        __typename: "UserConnectionPrisma",
        connect:  {
          __typename: "UserIDPrisma",
          id: string,
        },
      },
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateShopifySubscriptionMutationVariables = {
  createShopifySubscriptionInput: CreateShopifySubscriptionInput,
};

export type CreateShopifySubscriptionMutation = {
  createShopifySubscription?:  {
    __typename: "CreateShopifySubscriptionResponse",
    data?:  {
      __typename: "ShopifySubscription",
      confirmationUrl?: string | null,
      id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateShopifySubscriptionNewMutationVariables = {
  createShopifySubscriptionInput: CreateShopifySubscriptionInput,
};

export type CreateShopifySubscriptionNewMutation = {
  createShopifySubscriptionNew?:  {
    __typename: "CreateShopifySubscriptionResponse",
    data?:  {
      __typename: "ShopifySubscription",
      confirmationUrl?: string | null,
      id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateShopifySubscriptionEarlyMutationVariables = {
  createShopifySubscriptionInput: CreateShopifySubscriptionEarlyInput,
};

export type CreateShopifySubscriptionEarlyMutation = {
  createShopifySubscriptionEarly?:  {
    __typename: "CreateShopifySubscriptionResponse",
    data?:  {
      __typename: "ShopifySubscription",
      confirmationUrl?: string | null,
      id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RegisterShopifyUserMutationVariables = {
  registerShopifyUserInput: RegisterShopifyUserInput,
};

export type RegisterShopifyUserMutation = {
  registerShopifyUser?:  {
    __typename: "RegisterShopifyUserResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    user?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
  } | null,
};

export type RegisterShopifyUserNewMutationVariables = {
  registerShopifyUserInput: RegisterShopifyUserInput,
};

export type RegisterShopifyUserNewMutation = {
  registerShopifyUserNew?:  {
    __typename: "RegisterShopifyUserResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    user?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
  } | null,
};

export type CheckShopifyLoginMutationVariables = {
  checkShopifyLoginInput: CheckShopifyLoginInput,
};

export type CheckShopifyLoginMutation = {
  checkShopifyLogin?:  {
    __typename: "CheckShopifyLoginResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CheckShopifyLoginNewMutationVariables = {
  checkShopifyLoginInput: CheckShopifyLoginInput,
};

export type CheckShopifyLoginNewMutation = {
  checkShopifyLoginNew?:  {
    __typename: "CheckShopifyLoginResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SendRegisterUserEmailMutationVariables = {
  sendRegisterUserEmailInput: SendRegisterUserEmailInput,
};

export type SendRegisterUserEmailMutation = {
  sendRegisterUserEmail?:  {
    __typename: "SendRegisterUserEmailResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    user?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
  } | null,
};

export type SendRegisterUserEmailNewMutationVariables = {
  sendRegisterUserEmailInput: SendRegisterUserEmailInput,
};

export type SendRegisterUserEmailNewMutation = {
  sendRegisterUserEmailNew?:  {
    __typename: "SendRegisterUserEmailPrismaResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    user?:  {
      __typename: "UserPrisma",
      id: string,
      first_name: string,
      last_name: string,
      email: string,
      password?: string | null,
      timezone: string,
      currency: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      businesses?:  Array< {
        __typename: "UserXBusinessPrisma",
        user_id: string,
        business_id: string,
        business:  {
          __typename: "BusinessPrisma",
          id: string,
          store_id: string,
          name: string,
          status: string,
          logo: string,
          vanity_name: string,
          reminder_status?: boolean | null,
          show_budget_confirmation?: boolean | null,
          monthly_budget: number,
          campaign_roas_goal: string,
          adset_roas_goal: string,
          ad_roas_goal: string,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          ad_account_settings:  Array< {
            __typename: "AdAccountSettingsPrisma",
            id: string,
            business_id: string,
            ad_platform_id: string,
            premium_page_views: number,
            external_platform?: string | null,
            active_campaign_count: number,
            paused_campaign_count: number,
            social_account_id?: string | null,
            social_account_name?: string | null,
            social_account_currency?: string | null,
            social_account_timezone?: string | null,
            access_token: string,
            utm_count: number,
            social_integration?: string | null,
            conversion_api_enabled?: string | null,
            pixel_id?: string | null,
            social_refresh_token?: string | null,
            updateKey?: string | null,
            last_data_refreshed?: string | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
            ad_platform:  {
              __typename: "AdPlatformPrisma",
              id: string,
              name: string,
              internal_source_name: string,
              is_sirge_managed: boolean,
              dark_theme_image_url?: string | null,
              light_theme_image_url: string,
              status: string,
              sqs_refresh_queue_url?: string | null,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
              show_budget_confirmation?: boolean | null,
            },
          } >,
          subscriptions:  Array< {
            __typename: "SubscriptionPrisma",
            id: string,
            business_id: string,
            subscription_plan_code?: string | null,
            status: string,
            processor?: string | null,
            store_subscription_body?: string | null,
            store_subscription_id?: string | null,
            promo_code_id?: string | null,
            trial_start?: string | null,
            trial_end?: string | null,
            trial_left?: number | null,
            current_billing_period_start?: string | null,
            current_billing_period_end?: string | null,
            subscription_end_date?: string | null,
            business_limit?: number | null,
            staff_limit?: number | null,
            subscription_charges?:  Array< {
              __typename: "SubscriptionChargesPrisma",
              id: string,
              business_id: string,
              subscription_id?: string | null,
              store_revenue: number,
              amount_billed: number,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
            } | null > | null,
            promo_codes?:  {
              __typename: "PromoCodePrisma",
              id?: string | null,
              code?: string | null,
              type?: string | null,
              status?: string | null,
              duration?: number | null,
              amount?: number | null,
              created_at?: string | null,
              updated_at?: string | null,
              deleted_at?: string | null,
            } | null,
            current_revenue?: number | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
          } >,
          store?:  {
            __typename: "StorePrisma",
            id?: string | null,
            shop_name?: string | null,
            address1?: string | null,
            address2?: string | null,
            city?: string | null,
            state?: string | null,
            zip?: string | null,
            country?: string | null,
            store_url?: string | null,
            timezone?: string | null,
            currency?: string | null,
            created_at?: string | null,
            updated_at?: string | null,
            deleted_at?: string | null,
          } | null,
          completed_onboarding_call?: boolean | null,
        },
        user_type: string,
        is_default_business: boolean,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } > | null,
      profile_photo?: string | null,
    } | null,
  } | null,
};

export type CancelShopifySubscriptionMutationVariables = {
  cancelShopifySubscriptionInput?: CancelShopifySubscriptionInput | null,
};

export type CancelShopifySubscriptionMutation = {
  cancelShopifySubscription?:  {
    __typename: "CancelShopifySubscriptionResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CancelShopifySubscriptionNewMutationVariables = {
  cancelShopifySubscriptionInput?: CancelShopifySubscriptionInput | null,
};

export type CancelShopifySubscriptionNewMutation = {
  cancelShopifySubscriptionNew?:  {
    __typename: "CancelShopifySubscriptionResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CancelShopifySubscriptionEarlyMutationVariables = {
  cancelShopifySubscriptionEarlyInput: CancelShopifySubscriptionEarlyInput,
};

export type CancelShopifySubscriptionEarlyMutation = {
  cancelShopifySubscriptionEarly?:  {
    __typename: "CancelShopifySubscriptionResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CancelShopifySubscriptionEarlyNewMutationVariables = {
  cancelShopifySubscriptionEarlyInput: CancelShopifySubscriptionEarlyInput,
};

export type CancelShopifySubscriptionEarlyNewMutation = {
  cancelShopifySubscriptionEarlyNew?:  {
    __typename: "CancelShopifySubscriptionResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateShopifyScriptTagMutationVariables = {
};

export type CreateShopifyScriptTagMutation = {
  createShopifyScriptTag?:  {
    __typename: "CreateShopifyScriptTagResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetUtmValuesGoogleCampaignsMutationVariables = {
  setUtmValuesGoogleCampaignsInput: SetUtmValuesGoogleCampaignsInput,
};

export type SetUtmValuesGoogleCampaignsMutation = {
  setUtmValuesGoogleCampaigns?:  {
    __typename: "SetUtmValuesGoogleCampaignsResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetUtmValuesFbCampaignMutationVariables = {
  setUtmValuesFbCampaignInput: SetUtmValuesFbCampaignInput,
};

export type SetUtmValuesFbCampaignMutation = {
  setUtmValuesFbCampaign?:  {
    __typename: "SetUtmValuesFbCampaignResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    data?:  {
      __typename: "SetUtmValuesFbCampaignResponseData",
      totalAdsToConnect?: number | null,
      adsConnected?: Array< string | null > | null,
      adsFailed?:  Array< {
        __typename: "SetUtmValuesFbCampaignErrorAd",
        ad?: string | null,
        error?: string | null,
      } | null > | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetUtmValuesSocialCampaignMutationVariables = {
  setUtmValuesSocialCampaignInput: SetUtmValuesSocialCampaignInput,
};

export type SetUtmValuesSocialCampaignMutation = {
  setUtmValuesSocialCampaign?:  {
    __typename: "SetUtmValuesSocialCampaignResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    data?:  {
      __typename: "SetUtmValuesFbCampaignResponseData",
      totalAdsToConnect?: number | null,
      adsConnected?: Array< string | null > | null,
      adsFailed?:  Array< {
        __typename: "SetUtmValuesFbCampaignErrorAd",
        ad?: string | null,
        error?: string | null,
      } | null > | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetUtmValuesTiktokAdMutationVariables = {
  setUtmValuesTiktokAdInput: SetUtmValuesTiktokAdInput,
};

export type SetUtmValuesTiktokAdMutation = {
  setUtmValuesTiktokAd?:  {
    __typename: "SetUtmValuesTiktokAdResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type AddDiscountCodeMutationVariables = {
  addDiscountCodeInput: AddDiscountCodeInput,
};

export type AddDiscountCodeMutation = {
  addDiscountCode?:  {
    __typename: "AddDiscountCodeResponse",
    data?:  {
      __typename: "DiscountCode",
      code?: string | null,
      status?: string | null,
      duration?: number | null,
      amount?: number | null,
      type?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type AddDiscountCodeNewMutationVariables = {
  addDiscountCodeInput: AddDiscountCodeInput,
};

export type AddDiscountCodeNewMutation = {
  addDiscountCodeNew?:  {
    __typename: "AddDiscountCodeResponsePrisma",
    data?:  {
      __typename: "PromoCode",
      id?: string | null,
      code?: string | null,
      type?: string | null,
      status?: string | null,
      duration?: number | null,
      amount?: number | null,
      created_at?: string | null,
      updated_at?: string | null,
      deleted_at?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RemoveDiscountCodeMutationVariables = {
};

export type RemoveDiscountCodeMutation = {
  removeDiscountCode?:  {
    __typename: "RemoveDiscountCodeResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type RemoveDiscountCodeNewMutationVariables = {
  addDiscountCodeInput: AddDiscountCodeInput,
};

export type RemoveDiscountCodeNewMutation = {
  removeDiscountCodeNew?:  {
    __typename: "RemoveDiscountCodeNewResponse",
    data?:  {
      __typename: "SubscriptionPrisma",
      id: string,
      business_id: string,
      subscription_plan_code?: string | null,
      status: string,
      processor?: string | null,
      store_subscription_body?: string | null,
      store_subscription_id?: string | null,
      promo_code_id?: string | null,
      trial_start?: string | null,
      trial_end?: string | null,
      trial_left?: number | null,
      current_billing_period_start?: string | null,
      current_billing_period_end?: string | null,
      subscription_end_date?: string | null,
      business_limit?: number | null,
      staff_limit?: number | null,
      subscription_charges?:  Array< {
        __typename: "SubscriptionChargesPrisma",
        id: string,
        business_id: string,
        subscription_id?: string | null,
        store_revenue: number,
        amount_billed: number,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } | null > | null,
      promo_codes?:  {
        __typename: "PromoCodePrisma",
        id?: string | null,
        code?: string | null,
        type?: string | null,
        status?: string | null,
        duration?: number | null,
        amount?: number | null,
        created_at?: string | null,
        updated_at?: string | null,
        deleted_at?: string | null,
      } | null,
      current_revenue?: number | null,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateAdLevelStatusMutationVariables = {
  updateAdLevelStatusInput: UpdateAdLevelStatusInput,
};

export type UpdateAdLevelStatusMutation = {
  updateAdLevelStatus?:  {
    __typename: "UpdateAdLevelStatusResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateAdLevelStatusNewMutationVariables = {
  updateAdLevelStatusInput: UpdateAdLevelStatusInput,
};

export type UpdateAdLevelStatusNewMutation = {
  updateAdLevelStatusNew?:  {
    __typename: "UpdateAdLevelStatusResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateAdDailyBudgetMutationVariables = {
  updateAdDailyBudgetInput: updateAdDailyBudgetInput,
};

export type UpdateAdDailyBudgetMutation = {
  updateAdDailyBudget?:  {
    __typename: "UpdateAdDailyBudgetResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateAdDailyBudgetNewMutationVariables = {
  updateAdDailyBudgetInput: updateAdDailyBudgetInput,
};

export type UpdateAdDailyBudgetNewMutation = {
  updateAdDailyBudgetNew?:  {
    __typename: "UpdateAdDailyBudgetResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateTrackableCopyMutationVariables = {
  createTrackableCopyInput: CreateTrackableCopyInput,
};

export type CreateTrackableCopyMutation = {
  createTrackableCopy?:  {
    __typename: "CreateTrackableCopyResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateTrackableCopyNewMutationVariables = {
  createTrackableCopyInput: CreateTrackableCopyInput,
};

export type CreateTrackableCopyNewMutation = {
  createTrackableCopyNew?:  {
    __typename: "CreateTrackableCopyResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeleteTrackableCopyMutationVariables = {
  deleteTrackableCopyInput: DeleteTrackableCopyInput,
};

export type DeleteTrackableCopyMutation = {
  deleteTrackableCopy?:  {
    __typename: "DeleteTrackableCopyResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeleteTrackableCopyNewMutationVariables = {
  deleteTrackableCopyInput: DeleteTrackableCopyInput,
};

export type DeleteTrackableCopyNewMutation = {
  deleteTrackableCopyNew?:  {
    __typename: "DeleteTrackableCopyResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateTrackableCopyMutationVariables = {
  updateTrackableCopyInput: UpdateTrackableCopyInput,
};

export type UpdateTrackableCopyMutation = {
  updateTrackableCopy?:  {
    __typename: "UpdateTrackableCopyResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateTrackableCopyNewMutationVariables = {
  updateTrackableCopyInput: UpdateTrackableCopyInput,
};

export type UpdateTrackableCopyNewMutation = {
  updateTrackableCopyNew?:  {
    __typename: "UpdateTrackableCopyResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetPerformanceNotesMutationVariables = {
  setPerformanceNotesInput: SetPerformanceNotesInput,
};

export type SetPerformanceNotesMutation = {
  setPerformanceNotes?:  {
    __typename: "SetPerformanceNotesResponse",
    data?:  {
      __typename: "PerformanceNotesResponseData",
      id?: string | null,
      ad_type?: string | null,
      business_id?: string | null,
      description?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateKeyMetricsMonthlyBudgetMutationVariables = {
  updateMonthlyBudgetInput: UpdateMonthlyBudgetInput,
};

export type UpdateKeyMetricsMonthlyBudgetMutation = {
  updateKeyMetricsMonthlyBudget?:  {
    __typename: "UpdateMonthlyBudgetResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateKeyMetricsRoasTrackerMutationVariables = {
  updateRoasGoalsInput: UpdateRoasGoalsInput,
};

export type UpdateKeyMetricsRoasTrackerMutation = {
  updateKeyMetricsRoasTracker?:  {
    __typename: "UpdateRoasGoalsResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetPerformanceNotesNewMutationVariables = {
  setPerformanceNotesInput: SetPerformanceNotesInput,
};

export type SetPerformanceNotesNewMutation = {
  setPerformanceNotesNew?:  {
    __typename: "SetPerformanceNotesResponse",
    data?:  {
      __typename: "PerformanceNotesResponseData",
      id?: string | null,
      ad_type?: string | null,
      business_id?: string | null,
      description?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type SetAudienceSegmentQueryMutationVariables = {
  setAudienceSegmentQueryInput: SetAudienceSegmentQueryInput,
};

export type SetAudienceSegmentQueryMutation = {
  setAudienceSegmentQuery?:  {
    __typename: "AudienceSegmentQueryResponse",
    data?:  {
      __typename: "Segments",
      id: string,
      business_id: string,
      no_of_customers?: number | null,
      added_revenue?: number | null,
      audience?: string | null,
      type: string,
      status: string,
      query_details?: string | null,
      created_at?: string | null,
      updated_at?: string | null,
      group_name: string,
      deleted_at?: string | null,
      dynamic_query_params: string,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type UpdateAudienceSegmentQueryByIdMutationVariables = {
  updateAudienceSegmentInput: UpdateAudienceSegmentQueryInput,
};

export type UpdateAudienceSegmentQueryByIdMutation = {
  updateAudienceSegmentQueryById?:  {
    __typename: "UpdateAudienceSegmentResponse",
    data?:  {
      __typename: "AudienceSuccessResponse",
      success?: boolean | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type DeleteAudienceSegmentQueryByIdMutationVariables = {
  deleteAudienceSegmentInput: DeleteAudienceSegmentInput,
};

export type DeleteAudienceSegmentQueryByIdMutation = {
  deleteAudienceSegmentQueryById?:  {
    __typename: "DeleteAudienceSegmentResponse",
    data?:  {
      __typename: "AudienceSuccessResponse",
      success?: boolean | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type CreateSuggestedSegmentsMutationVariables = {
  createSuggestedSegmentsInput: CreateSuggestedSegmentsInput,
};

export type CreateSuggestedSegmentsMutation = {
  createSuggestedSegments?:  {
    __typename: "CreateSuggestedSegmentsResponse",
    data?:  {
      __typename: "Segments",
      id: string,
      business_id: string,
      no_of_customers?: number | null,
      added_revenue?: number | null,
      audience?: string | null,
      type: string,
      status: string,
      query_details?: string | null,
      created_at?: string | null,
      updated_at?: string | null,
      group_name: string,
      deleted_at?: string | null,
      dynamic_query_params: string,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type AutoScalingSettingQueryVariables = {
};

export type AutoScalingSettingQuery = {
  autoScalingSetting?:  {
    __typename: "AutoScalingSettingResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type AutoScalingSettingNewQueryVariables = {
};

export type AutoScalingSettingNewQuery = {
  autoScalingSettingNew?:  {
    __typename: "AutoScalingSettingResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type EndTrialQueryVariables = {
};

export type EndTrialQuery = {
  endTrial?:  {
    __typename: "EndTrialResponse",
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GenerateUploadUrlQueryVariables = {
  generateUploadUrlInput: GenerateUploadUrlInput,
};

export type GenerateUploadUrlQuery = {
  generateUploadUrl?:  {
    __typename: "GenerateUploadUrlResponse",
    data?:  {
      __typename: "UploadUrlResponse",
      upload_url?: string | null,
      url?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GenerateUploadUrlNewQueryVariables = {
  generateUploadUrlInput: GenerateUploadUrlInput,
};

export type GenerateUploadUrlNewQuery = {
  generateUploadUrlNew?:  {
    __typename: "GenerateUploadUrlResponse",
    data?:  {
      __typename: "UploadUrlResponse",
      upload_url?: string | null,
      url?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetMemberCountByAdGroupIDsQueryVariables = {
  getMemberCountByAdGroupIDsInput: GetMemberCountByAdGroupIDsInput,
};

export type GetMemberCountByAdGroupIDsQuery = {
  getMemberCountByAdGroupIDs?:  {
    __typename: "GetMemberCountByAdGroupIDsResponse",
    data?:  {
      __typename: "MemberCount",
      adSetCount?: number | null,
      adsCount?: number | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetMemberCountByAdGroupIDsNewQueryVariables = {
  getMemberCountByAdGroupIDsInput: GetMemberCountByAdGroupIDsInputNew,
};

export type GetMemberCountByAdGroupIDsNewQuery = {
  getMemberCountByAdGroupIDsNew?:  {
    __typename: "GetMemberCountByAdGroupIDsResponse",
    data?:  {
      __typename: "MemberCount",
      adSetCount?: number | null,
      adsCount?: number | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetAllStaffAccountsQueryVariables = {
  getAllStaffAccountsInput?: GetAllStaffAccountsInput | null,
};

export type GetAllStaffAccountsQuery = {
  getAllStaffAccounts?:  {
    __typename: "GetAllStaffAccountsResponse",
    data?:  Array< {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null > | null,
    // may need to be data: [User]
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAllStaffAccountsNewQueryVariables = {
  getAllStaffAccountsInput?: GetAllStaffAccountsInput | null,
};

export type GetAllStaffAccountsNewQuery = {
  getAllStaffAccountsNew?:  {
    __typename: "GetAllStaffAccountsResponsePrisma",
    data?:  Array< {
      __typename: "UserPrisma",
      id: string,
      first_name: string,
      last_name: string,
      email: string,
      password?: string | null,
      timezone: string,
      currency: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      businesses?:  Array< {
        __typename: "UserXBusinessPrisma",
        user_id: string,
        business_id: string,
        business:  {
          __typename: "BusinessPrisma",
          id: string,
          store_id: string,
          name: string,
          status: string,
          logo: string,
          vanity_name: string,
          reminder_status?: boolean | null,
          show_budget_confirmation?: boolean | null,
          monthly_budget: number,
          campaign_roas_goal: string,
          adset_roas_goal: string,
          ad_roas_goal: string,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          ad_account_settings:  Array< {
            __typename: "AdAccountSettingsPrisma",
            id: string,
            business_id: string,
            ad_platform_id: string,
            premium_page_views: number,
            external_platform?: string | null,
            active_campaign_count: number,
            paused_campaign_count: number,
            social_account_id?: string | null,
            social_account_name?: string | null,
            social_account_currency?: string | null,
            social_account_timezone?: string | null,
            access_token: string,
            utm_count: number,
            social_integration?: string | null,
            conversion_api_enabled?: string | null,
            pixel_id?: string | null,
            social_refresh_token?: string | null,
            updateKey?: string | null,
            last_data_refreshed?: string | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
            ad_platform:  {
              __typename: "AdPlatformPrisma",
              id: string,
              name: string,
              internal_source_name: string,
              is_sirge_managed: boolean,
              dark_theme_image_url?: string | null,
              light_theme_image_url: string,
              status: string,
              sqs_refresh_queue_url?: string | null,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
              show_budget_confirmation?: boolean | null,
            },
          } >,
          subscriptions:  Array< {
            __typename: "SubscriptionPrisma",
            id: string,
            business_id: string,
            subscription_plan_code?: string | null,
            status: string,
            processor?: string | null,
            store_subscription_body?: string | null,
            store_subscription_id?: string | null,
            promo_code_id?: string | null,
            trial_start?: string | null,
            trial_end?: string | null,
            trial_left?: number | null,
            current_billing_period_start?: string | null,
            current_billing_period_end?: string | null,
            subscription_end_date?: string | null,
            business_limit?: number | null,
            staff_limit?: number | null,
            subscription_charges?:  Array< {
              __typename: "SubscriptionChargesPrisma",
              id: string,
              business_id: string,
              subscription_id?: string | null,
              store_revenue: number,
              amount_billed: number,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
            } | null > | null,
            promo_codes?:  {
              __typename: "PromoCodePrisma",
              id?: string | null,
              code?: string | null,
              type?: string | null,
              status?: string | null,
              duration?: number | null,
              amount?: number | null,
              created_at?: string | null,
              updated_at?: string | null,
              deleted_at?: string | null,
            } | null,
            current_revenue?: number | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
          } >,
          store?:  {
            __typename: "StorePrisma",
            id?: string | null,
            shop_name?: string | null,
            address1?: string | null,
            address2?: string | null,
            city?: string | null,
            state?: string | null,
            zip?: string | null,
            country?: string | null,
            store_url?: string | null,
            timezone?: string | null,
            currency?: string | null,
            created_at?: string | null,
            updated_at?: string | null,
            deleted_at?: string | null,
          } | null,
          completed_onboarding_call?: boolean | null,
        },
        user_type: string,
        is_default_business: boolean,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } > | null,
      profile_photo?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessByBusinessIdQueryVariables = {
  getBusinessesInput: GetBusinessesInput,
};

export type GetBusinessByBusinessIdQuery = {
  getBusinessByBusinessId?:  {
    __typename: "GetBusinessesInputResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessByVanityNameQueryVariables = {
  getBusinessByVanityNameInput: GetBusinessByVanityNameInput,
};

export type GetBusinessByVanityNameQuery = {
  getBusinessByVanityName?:  {
    __typename: "GetBusinessByVanityNameResponse",
    data?:  {
      __typename: "Business",
      business_id: string,
      business_name?: string | null,
      created_at?: string | null,
      external_platform?: string | null,
      facebook_ad_account_currency?: string | null,
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      fb_pixel_id?: string | null,
      logo?: string | null,
      premium_page_views?: number | null,
      shopify_access_token?: string | null,
      shopify_script_tag_id?: string | null,
      shopify_store_url?: string | null,
      status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_ad_account_currency?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
      tik_tok_ad_account_timezone?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      updated_at?: string | null,
      user_id?: string | null,
      vanity_name?: string | null,
      script_installed?: boolean | null,
      campaign_count?:  {
        __typename: "CampaignCount",
        active_count?: string | null,
        paused_count?: string | null,
      } | null,
      fb_utm_count?: number | null,
      tiktok_utm_count?: number | null,
      shopify_store_domain?: string | null,
      timezone?: string | null,
      roas_goals?:  {
        __typename: "BusinessRoasGoals",
        campaign?: number | null,
        adset?: number | null,
        ad?: number | null,
      } | null,
      monthly_budget?: number | null,
      google_ad_account_id?: string | null,
      google_ad_accessToken?: string | null,
      google_ad_account_currency?: string | null,
      last_data_refreshed?: string | null,
      completed_onboarding_call?: boolean | null,
      reminder_status?: boolean | null,
      currency?: string | null,
      business_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAdGroupBudgetDetailsQueryVariables = {
  getAdGroupBudgetDetailsInput: GetAdGroupBudgetDetailsInput,
};

export type GetAdGroupBudgetDetailsQuery = {
  getAdGroupBudgetDetails?:  {
    __typename: "GetAdGroupBudgetDetailsResponse",
    data?:  {
      __typename: "AdGroupBudgetDetailsObject",
      adGroup?:  {
        __typename: "AdGroupBudgetDetails",
        daily_budget?: number | null,
        lifetime_budget?: number | null,
        name?: string | null,
        source_delivery_status?: string | null,
        source_secondary_status?: string | null,
        shared_budget_name?: string | null,
      } | null,
      relatedItems?:  Array< {
        __typename: "Performance",
        id?: string | null,
        source?: string | null,
        business_id?: string | null,
        purchases_count?: number | null,
        clicks_count?: number | null,
        daily_budget?: number | null,
        lifetime_budget?: number | null,
        shared_budget_name?: string | null,
        campaign_name?: string | null,
        campaign_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_set_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_images?: Array< string | null > | null,
        itemType?: string | null,
        ad_image?: string | null,
        ad_set?: string | null,
        ad_set_name?: string | null,
        ad?: string | null,
        ad_name?: string | null,
        sirge_ad_id?: string | null,
        sirge_adset_id?: string | null,
        sirge_campaign_id?: string | null,
        total_title?: string | null,
        source_delivery_status?: string | null,
        source_secondary_status?: string | null,
        clicks?: number | null,
        purchases?: number | null,
        purchases_source?: number | null,
        roas?: string | null,
        cost_per_purchase?: number | null,
        amount_spent?: number | null,
        average_cpm?: number | null,
        conversion_value?: number | null,
        total_conversion_value?: number | null,
        roas_ltv?: number | null,
        sirge_clicks?: number | null,
        sirge_purchases?: number | null,
        sirge_roas?: string | null,
        sirge_cost_per_purchase?: number | null,
        sirge_total_conversion_value?: number | null,
        created?: string | null,
        updated_at?: string | null,
        ad_type?: string | null,
        utm_status?: boolean | null,
        are_all_ads_connected?: boolean | null,
        transform?: boolean | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetAdGroupBudgetDetailsNewQueryVariables = {
  getAdGroupBudgetDetailsInput: GetAdGroupBudgetDetailsInput,
};

export type GetAdGroupBudgetDetailsNewQuery = {
  getAdGroupBudgetDetailsNew?:  {
    __typename: "GetAdGroupBudgetDetailsResponse",
    data?:  {
      __typename: "AdGroupBudgetDetailsObject",
      adGroup?:  {
        __typename: "AdGroupBudgetDetails",
        daily_budget?: number | null,
        lifetime_budget?: number | null,
        name?: string | null,
        source_delivery_status?: string | null,
        source_secondary_status?: string | null,
        shared_budget_name?: string | null,
      } | null,
      relatedItems?:  Array< {
        __typename: "Performance",
        id?: string | null,
        source?: string | null,
        business_id?: string | null,
        purchases_count?: number | null,
        clicks_count?: number | null,
        daily_budget?: number | null,
        lifetime_budget?: number | null,
        shared_budget_name?: string | null,
        campaign_name?: string | null,
        campaign_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_set_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_images?: Array< string | null > | null,
        itemType?: string | null,
        ad_image?: string | null,
        ad_set?: string | null,
        ad_set_name?: string | null,
        ad?: string | null,
        ad_name?: string | null,
        sirge_ad_id?: string | null,
        sirge_adset_id?: string | null,
        sirge_campaign_id?: string | null,
        total_title?: string | null,
        source_delivery_status?: string | null,
        source_secondary_status?: string | null,
        clicks?: number | null,
        purchases?: number | null,
        purchases_source?: number | null,
        roas?: string | null,
        cost_per_purchase?: number | null,
        amount_spent?: number | null,
        average_cpm?: number | null,
        conversion_value?: number | null,
        total_conversion_value?: number | null,
        roas_ltv?: number | null,
        sirge_clicks?: number | null,
        sirge_purchases?: number | null,
        sirge_roas?: string | null,
        sirge_cost_per_purchase?: number | null,
        sirge_total_conversion_value?: number | null,
        created?: string | null,
        updated_at?: string | null,
        ad_type?: string | null,
        utm_status?: boolean | null,
        are_all_ads_connected?: boolean | null,
        transform?: boolean | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetBusinessSourcesByIdQueryVariables = {
  getBusinessSourcesByIdInput: GetBusinessSourcesByIdInput,
};

export type GetBusinessSourcesByIdQuery = {
  getBusinessSourcesById?:  {
    __typename: "GetBusinessSourcesByIdResponse",
    data?:  {
      __typename: "GetBusinessSourcesObject",
      sources?:  Array< {
        __typename: "SourcesBusiness",
        source?: string | null,
        unique_visitor?: number | null,
        clicks_count?: number | null,
        purchases_count?: number | null,
        url?: string | null,
        created?: string | null,
        referer?: string | null,
        business_id?: string | null,
      } | null > | null,
      totalInfo?:  {
        __typename: "TotalInfo",
        total_clicks?: number | null,
        total_purchases?: number | null,
        totalrecords?: number | null,
        total_visitors?: number | null,
        total_pageviews?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetBusinessSourcesDetailsByIdQueryVariables = {
  getBusinessSourcesDetailsByIdInput: GetBusinessSourcesDetailsByIdInput,
};

export type GetBusinessSourcesDetailsByIdQuery = {
  getBusinessSourcesDetailsById?:  {
    __typename: "GetBusinessSourcesDetailsByIdResponse",
    data?:  Array< {
      __typename: "SourcesBusiness",
      source?: string | null,
      unique_visitor?: number | null,
      clicks_count?: number | null,
      purchases_count?: number | null,
      url?: string | null,
      created?: string | null,
      referer?: string | null,
      business_id?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetAllVisitorsQueryVariables = {
  getAllVisitorsInput: GetAllVisitorsInput,
};

export type GetAllVisitorsQuery = {
  getAllVisitors?:  {
    __typename: "GetAllVisitorResponse",
    data?:  {
      __typename: "GetAllVisitorObject",
      visitors?:  Array< {
        __typename: "AllBusinessVisitor",
        _id?: string | null,
        total_clicks?: string | null,
        total_purchase_value?: string | null,
        last_visit?: string | null,
        first_visit?: string | null,
        total_purchases?: string | null,
        total_pageviews?: string | null,
        visitor_id?: string | null,
        visitor_name?: string | null,
        visitor_email?: string | null,
      } | null > | null,
      totalInfo?:  {
        __typename: "TotalInfo",
        total_clicks?: number | null,
        total_purchases?: number | null,
        totalrecords?: number | null,
        total_visitors?: number | null,
        total_pageviews?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetAllVisitorsGraphQueryVariables = {
  getAllVisitorsGraphInput: getAllVisitorsGraphInput,
};

export type GetAllVisitorsGraphQuery = {
  getAllVisitorsGraph?:  {
    __typename: "GetAllVisitorGraphResponse",
    data?:  Array< {
      __typename: "AllBusinessVisitorGraph",
      date?: string | null,
      new_visitors?: string | null,
      returning_visitors?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailQueryVariables = {
  getVisitorDetailInput: getVisitorDetailInput,
};

export type GetVisitorDetailQuery = {
  getVisitorDetail?:  {
    __typename: "GetVisitorDetailResponse",
    data?:  {
      __typename: "VisitorDetail",
      visitor_email?: string | null,
      country?: string | null,
      state?: string | null,
      city?: string | null,
      total_pageviews?: string | null,
      first_visit?: string | null,
      total_purchases?: string | null,
      total_purchase_conversion_value?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailPageviewQueryVariables = {
  getVisitorDetailPageViewInput: getVisitorDetailPageViewInput,
};

export type GetVisitorDetailPageviewQuery = {
  getVisitorDetailPageview?:  {
    __typename: "GetVisitorDetailPageviewResponse",
    data?:  Array< {
      __typename: "PageView",
      ad?: string | null,
      ad_set?: string | null,
      business_id?: string | null,
      campaign?: string | null,
      checkout_platform?: string | null,
      conversion_value?: string | null,
      created?: string | null,
      currency?: string | null,
      expiry_date?: string | null,
      id?: string | null,
      ip?: string | null,
      order_id?: string | null,
      purchase_id?: string | null,
      referer?: string | null,
      sirge_ad_id?: string | null,
      sirge_adset_id?: string | null,
      sirge_campaign_id?: string | null,
      sirge_source_name?: string | null,
      source?: string | null,
      tracking_channel?: string | null,
      url?: string | null,
      clicks_count?: number | null,
      purchases_count?: number | null,
      visitor_addresscity?: string | null,
      visitor_addresscountry?: string | null,
      visitor_addressline1?: string | null,
      visitor_addressline2?: string | null,
      visitor_addresspostal_code?: string | null,
      visitor_addressprovince?: string | null,
      visitor_email?: string | null,
      visitor_id?: string | null,
      visitor_name?: string | null,
      visitor_phone?: string | null,
    } | null > | null,
    total_records?: number | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailSourcesQueryVariables = {
  getVisitorDetailSourcesInput: getVisitorDetailSourcesInput,
};

export type GetVisitorDetailSourcesQuery = {
  getVisitorDetailSources?:  {
    __typename: "GetVisitorDetailSourcesResponse",
    data?:  Array< {
      __typename: "VisitorDetailSource",
      sirge_source_name?: string | null,
      url?: string | null,
    } | null > | null,
    total_records?: number | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessesByUserIdQueryVariables = {
};

export type GetBusinessesByUserIdQuery = {
  getBusinessesByUserId?:  {
    __typename: "GetBusinessesResponse",
    data?:  {
      __typename: "Businesses",
      business_active_count?: number | null,
      business_count?: number | null,
      business_list?:  Array< {
        __typename: "Business",
        business_id: string,
        business_name?: string | null,
        created_at?: string | null,
        external_platform?: string | null,
        facebook_ad_account_currency?: string | null,
        facebook_ad_account_id?: string | null,
        facebook_ad_account_name?: string | null,
        fb_pixel_id?: string | null,
        logo?: string | null,
        premium_page_views?: number | null,
        shopify_access_token?: string | null,
        shopify_script_tag_id?: string | null,
        shopify_store_url?: string | null,
        status?: string | null,
        tik_tok_access_token?: string | null,
        tik_tok_ad_account_currency?: string | null,
        tik_tok_ad_account_id?: string | null,
        tik_tok_ad_account_name?: string | null,
        tik_tok_ad_account_timezone?: string | null,
        facebook_accessToken?: string | null,
        facebook_userID?: string | null,
        updated_at?: string | null,
        user_id?: string | null,
        vanity_name?: string | null,
        script_installed?: boolean | null,
        campaign_count?:  {
          __typename: "CampaignCount",
          active_count?: string | null,
          paused_count?: string | null,
        } | null,
        fb_utm_count?: number | null,
        tiktok_utm_count?: number | null,
        shopify_store_domain?: string | null,
        timezone?: string | null,
        roas_goals?:  {
          __typename: "BusinessRoasGoals",
          campaign?: number | null,
          adset?: number | null,
          ad?: number | null,
        } | null,
        monthly_budget?: number | null,
        google_ad_account_id?: string | null,
        google_ad_accessToken?: string | null,
        google_ad_account_currency?: string | null,
        last_data_refreshed?: string | null,
        completed_onboarding_call?: boolean | null,
        reminder_status?: boolean | null,
        currency?: string | null,
        business_plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        subscription?:  {
          __typename: "Subscription",
          created_at?: string | null,
          customer_id?: string | null,
          id?: string | null,
          status?: string | null,
          subscription_body?: string | null,
          updated_at?: string | null,
          trial_end?: string | null,
          trial_start?: string | null,
          trial_left?: number | null,
          promo_code?:  {
            __typename: "DiscountCode",
            code?: string | null,
            status?: string | null,
            duration?: number | null,
            amount?: number | null,
            type?: string | null,
          } | null,
          plan?:  {
            __typename: "Plan",
            business_limit?: number | null,
            page_view_limit?: number | null,
            plan_code?: string | null,
            plan_name?: string | null,
            plan_price_id?: string | null,
            plan_product_id?: string | null,
            staff_limit?: number | null,
          } | null,
          plan_changed?: boolean | null,
          plan_code?: string | null,
          current_revenue?: number | null,
          current_billing_period_start?: string | null,
          current_billing_period_end?: string | null,
        } | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetBusinessGoogleAccountsQueryVariables = {
  getBusinessGoogleAccountsInput: BusinessIdInput,
};

export type GetBusinessGoogleAccountsQuery = {
  getBusinessGoogleAccounts?:  {
    __typename: "GetBusinessGoogleAccountsResponse",
    data?:  Array< {
      __typename: "GoogleCustomer",
      resourceName: string,
      descriptiveName: string,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetBusinessGoogleNewTokenQueryVariables = {
  getBusinessNewTokenInput: BusinessIdInput,
};

export type GetBusinessGoogleNewTokenQuery = {
  getBusinessGoogleNewToken?:  {
    __typename: "GetBusinessGoogleTokenResponse",
    data?: string | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetCreditTransactionsQueryVariables = {
};

export type GetCreditTransactionsQuery = {
  getCreditTransactions?:  {
    __typename: "GetCreditTransactionReponse",
    data?:  Array< {
      __typename: "TransactionObjectResponse",
      amount?: number | null,
      created?: number | null,
      ending_balance?: number | null,
      id?: string | null,
      type?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetCurrentUserSessionsQueryVariables = {
  getCurrentUserSessionsInput?: GetCurrentUserSessionsInput | null,
};

export type GetCurrentUserSessionsQuery = {
  getCurrentUserSessions?:  {
    __typename: "GetCurrentUserSessionsResponse",
    data?:  Array< {
      __typename: "UserSession",
      browser_name?: string | null,
      browser_version?: string | null,
      created_at?: string | null,
      ip?: string | null,
      location?: string | null,
      os_name?: string | null,
      os_version?: string | null,
      user_id?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetCurrentUserSessionsNewQueryVariables = {
  getCurrentUserSessionsInput?: GetCurrentUserSessionsInput | null,
};

export type GetCurrentUserSessionsNewQuery = {
  getCurrentUserSessionsNew?:  {
    __typename: "GetCurrentUserSessionsResponse",
    data?:  Array< {
      __typename: "UserSession",
      browser_name?: string | null,
      browser_version?: string | null,
      created_at?: string | null,
      ip?: string | null,
      location?: string | null,
      os_name?: string | null,
      os_version?: string | null,
      user_id?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetFacebookAdAccountsQueryVariables = {
  getFacebookAdAccountsInput: BusinessIdInput,
};

export type GetFacebookAdAccountsQuery = {
  getFacebookAdAccounts?:  {
    __typename: "FacebookAdAccountsResponse",
    data?:  Array< {
      __typename: "FacebookAdAccount",
      id?: string | null,
      currency?: string | null,
      name?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetSocialAdAccountsQueryVariables = {
  getSocialAdAccountsInput: BusinessIdWithPlatform,
};

export type GetSocialAdAccountsQuery = {
  getSocialAdAccounts?:  {
    __typename: "SocialAdAccountsResponse",
    data?:  Array< {
      __typename: "SocialAdAccount",
      id?: string | null,
      currency?: string | null,
      name?: string | null,
      timezone?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetInvoicesQueryVariables = {
};

export type GetInvoicesQuery = {
  getInvoices?:  {
    __typename: "GetInvoicesResponse",
    data?:  Array< {
      __typename: "InvoiceObject",
      created?: string | null,
      invoice_id?: string | null,
      invoice_number?: number | null,
      invoice_pdf?: string | null,
      status?: string | null,
      total?: string | null,
    } | null > | null,
  } | null,
};

export type GetPlatformModeQueryVariables = {
};

export type GetPlatformModeQuery = {
  getPlatformMode?:  {
    __typename: "GetPlatformModeResponse",
    data?:  {
      __typename: "PlatformSettings",
      closed_mode?: number | null,
      free_trial_page_view_limit?: number | null,
      maintenance_mode?: number | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetPlatformModeNewQueryVariables = {
};

export type GetPlatformModeNewQuery = {
  getPlatformModeNew?:  {
    __typename: "GetPlatformModeResponse",
    data?:  {
      __typename: "PlatformSettings",
      closed_mode?: number | null,
      free_trial_page_view_limit?: number | null,
      maintenance_mode?: number | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetPurchaseByPageViewIdQueryVariables = {
  getPageViewInput: GetPageViewInput,
};

export type GetPurchaseByPageViewIdQuery = {
  getPurchaseByPageViewId?:  {
    __typename: "GetPageViewInputResponse",
    data?:  {
      __typename: "BusinessPageViewPurchase",
      purchase?:  {
        __typename: "PurchaseView",
        first_touch_ad?: string | null,
        first_touch_ad_set?: string | null,
        first_touch_campaign?: string | null,
        last_touch_ad?: string | null,
        last_touch_ad_set?: string | null,
        last_touch_campaign?: string | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetStaffByIdQueryVariables = {
  getStaffByIdInput: GetStaffByIdInput,
};

export type GetStaffByIdQuery = {
  getStaffById?:  {
    __typename: "GetUserResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetStaffByIdNewQueryVariables = {
  getStaffByIdInput: GetStaffByIdInput,
};

export type GetStaffByIdNewQuery = {
  getStaffByIdNew?:  {
    __typename: "GetUserResponsePrisma",
    data?:  {
      __typename: "UserPrisma",
      id: string,
      first_name: string,
      last_name: string,
      email: string,
      password?: string | null,
      timezone: string,
      currency: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      businesses?:  Array< {
        __typename: "UserXBusinessPrisma",
        user_id: string,
        business_id: string,
        business:  {
          __typename: "BusinessPrisma",
          id: string,
          store_id: string,
          name: string,
          status: string,
          logo: string,
          vanity_name: string,
          reminder_status?: boolean | null,
          show_budget_confirmation?: boolean | null,
          monthly_budget: number,
          campaign_roas_goal: string,
          adset_roas_goal: string,
          ad_roas_goal: string,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          ad_account_settings:  Array< {
            __typename: "AdAccountSettingsPrisma",
            id: string,
            business_id: string,
            ad_platform_id: string,
            premium_page_views: number,
            external_platform?: string | null,
            active_campaign_count: number,
            paused_campaign_count: number,
            social_account_id?: string | null,
            social_account_name?: string | null,
            social_account_currency?: string | null,
            social_account_timezone?: string | null,
            access_token: string,
            utm_count: number,
            social_integration?: string | null,
            conversion_api_enabled?: string | null,
            pixel_id?: string | null,
            social_refresh_token?: string | null,
            updateKey?: string | null,
            last_data_refreshed?: string | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
            ad_platform:  {
              __typename: "AdPlatformPrisma",
              id: string,
              name: string,
              internal_source_name: string,
              is_sirge_managed: boolean,
              dark_theme_image_url?: string | null,
              light_theme_image_url: string,
              status: string,
              sqs_refresh_queue_url?: string | null,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
              show_budget_confirmation?: boolean | null,
            },
          } >,
          subscriptions:  Array< {
            __typename: "SubscriptionPrisma",
            id: string,
            business_id: string,
            subscription_plan_code?: string | null,
            status: string,
            processor?: string | null,
            store_subscription_body?: string | null,
            store_subscription_id?: string | null,
            promo_code_id?: string | null,
            trial_start?: string | null,
            trial_end?: string | null,
            trial_left?: number | null,
            current_billing_period_start?: string | null,
            current_billing_period_end?: string | null,
            subscription_end_date?: string | null,
            business_limit?: number | null,
            staff_limit?: number | null,
            subscription_charges?:  Array< {
              __typename: "SubscriptionChargesPrisma",
              id: string,
              business_id: string,
              subscription_id?: string | null,
              store_revenue: number,
              amount_billed: number,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
            } | null > | null,
            promo_codes?:  {
              __typename: "PromoCodePrisma",
              id?: string | null,
              code?: string | null,
              type?: string | null,
              status?: string | null,
              duration?: number | null,
              amount?: number | null,
              created_at?: string | null,
              updated_at?: string | null,
              deleted_at?: string | null,
            } | null,
            current_revenue?: number | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
          } >,
          store?:  {
            __typename: "StorePrisma",
            id?: string | null,
            shop_name?: string | null,
            address1?: string | null,
            address2?: string | null,
            city?: string | null,
            state?: string | null,
            zip?: string | null,
            country?: string | null,
            store_url?: string | null,
            timezone?: string | null,
            currency?: string | null,
            created_at?: string | null,
            updated_at?: string | null,
            deleted_at?: string | null,
          } | null,
          completed_onboarding_call?: boolean | null,
        },
        user_type: string,
        is_default_business: boolean,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } > | null,
      profile_photo?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetSubscriptionQueryVariables = {
  getSubscriptionInput?: GetSubscriptionInput | null,
};

export type GetSubscriptionQuery = {
  getSubscription?:  {
    __typename: "GetSubscriptionResponse",
    data?:  {
      __typename: "SubscriptionObject",
      billing_cycle_anchor?: string | null,
      current_billing_period_end?: string | null,
      current_billing_period_start?: string | null,
      plan?:  {
        __typename: "PlanInfo",
        billing_scheme?: string | null,
        details?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        price_id?: string | null,
        quantity?: string | null,
        unit_amount?: string | null,
      } | null,
      status?: string | null,
      subscription_id?: string | null,
      trial_end?: string | null,
      trial_start?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetUsageQueryVariables = {
};

export type GetUsageQuery = {
  getUsage?:  {
    __typename: "GetUsageResponse",
    data?:  {
      __typename: "Usage",
      total_usage?: number | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  getUserInput?: GetUserInput | null,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "GetUserResponse",
    data?:  {
      __typename: "User",
      default_business_id?: string | null,
      account_state?: string | null,
      affiliate_auth_token?: string | null,
      auto_scaling_setting?: number | null,
      balance?: number | null,
      cancellation_reason?: string | null,
      card_expiry_date?: string | null,
      card_last_four_digits?: string | null,
      card_type?: string | null,
      city?: string | null,
      client_billing_account_id?: string | null,
      country_code?: string | null,
      country_name?: string | null,
      country_phone_prefix?: string | null,
      created_at?: string | null,
      currency?: string | null,
      current_billing_period_end?: number | null,
      current_billing_period_start?: number | null,
      data_deleting_on?: number | null,
      data_retention_period?: number | null,
      email?: string | null,
      end_trial_source?: string | null,
      facebook_accessToken?: string | null,
      facebook_userID?: string | null,
      first_name?: string | null,
      firstpromoter_auth_token?: string | null,
      full_address?: string | null,
      id?: string | null,
      invoices?:  Array< {
        __typename: "Invoice",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        invoice_body?: string | null,
        status?: string | null,
        updated_at?: string | null,
      } | null > | null,
      last_name?: string | null,
      line1?: string | null,
      manager_id?: string | null,
      marketing_status?: number | null,
      phone_number?: string | null,
      postal_code?: string | null,
      products?:  {
        __typename: "Product",
        plan_product_id?: string | null,
        price_id?: string | null,
        product_code?: string | null,
        product_id?: string | null,
        product_name?: string | null,
      } | null,
      profile_photo?: string | null,
      state?: string | null,
      status?: string | null,
      stripe_connect_account_id?: string | null,
      subscription?:  {
        __typename: "Subscription",
        created_at?: string | null,
        customer_id?: string | null,
        id?: string | null,
        status?: string | null,
        subscription_body?: string | null,
        updated_at?: string | null,
        trial_end?: string | null,
        trial_start?: string | null,
        trial_left?: number | null,
        promo_code?:  {
          __typename: "DiscountCode",
          code?: string | null,
          status?: string | null,
          duration?: number | null,
          amount?: number | null,
          type?: string | null,
        } | null,
        plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        plan_changed?: boolean | null,
        plan_code?: string | null,
        current_revenue?: number | null,
        current_billing_period_start?: string | null,
        current_billing_period_end?: string | null,
      } | null,
      subscription_status?: string | null,
      tik_tok_access_token?: string | null,
      tik_tok_integration?: boolean | null,
      timezone?: string | null,
      two_factor_deactivate_business?: number | null,
      two_factor_remove_staff_account?: number | null,
      updated_at?: string | null,
      user_id?: string | null,
      user_plan?:  {
        __typename: "Plan",
        business_limit?: number | null,
        page_view_limit?: number | null,
        plan_code?: string | null,
        plan_name?: string | null,
        plan_price_id?: string | null,
        plan_product_id?: string | null,
        staff_limit?: number | null,
      } | null,
      verification_method?: string | null,
      shopify_store_url?: string | null,
      business_access?:  Array< {
        __typename: "BusinessAccess",
        vanity_name?: string | null,
      } | null > | null,
      sessions?:  Array< {
        __typename: "UserSession",
        browser_name?: string | null,
        browser_version?: string | null,
        created_at?: string | null,
        ip?: string | null,
        location?: string | null,
        os_name?: string | null,
        os_version?: string | null,
        user_id?: string | null,
      } | null > | null,
      post_hog_user_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserNewQueryVariables = {
  getUserInput?: GetUserInput | null,
};

export type GetUserNewQuery = {
  getUserNew?:  {
    __typename: "GetUserResponsePrisma",
    data?:  {
      __typename: "UserPrisma",
      id: string,
      first_name: string,
      last_name: string,
      email: string,
      password?: string | null,
      timezone: string,
      currency: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string | null,
      businesses?:  Array< {
        __typename: "UserXBusinessPrisma",
        user_id: string,
        business_id: string,
        business:  {
          __typename: "BusinessPrisma",
          id: string,
          store_id: string,
          name: string,
          status: string,
          logo: string,
          vanity_name: string,
          reminder_status?: boolean | null,
          show_budget_confirmation?: boolean | null,
          monthly_budget: number,
          campaign_roas_goal: string,
          adset_roas_goal: string,
          ad_roas_goal: string,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          ad_account_settings:  Array< {
            __typename: "AdAccountSettingsPrisma",
            id: string,
            business_id: string,
            ad_platform_id: string,
            premium_page_views: number,
            external_platform?: string | null,
            active_campaign_count: number,
            paused_campaign_count: number,
            social_account_id?: string | null,
            social_account_name?: string | null,
            social_account_currency?: string | null,
            social_account_timezone?: string | null,
            access_token: string,
            utm_count: number,
            social_integration?: string | null,
            conversion_api_enabled?: string | null,
            pixel_id?: string | null,
            social_refresh_token?: string | null,
            updateKey?: string | null,
            last_data_refreshed?: string | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
            ad_platform:  {
              __typename: "AdPlatformPrisma",
              id: string,
              name: string,
              internal_source_name: string,
              is_sirge_managed: boolean,
              dark_theme_image_url?: string | null,
              light_theme_image_url: string,
              status: string,
              sqs_refresh_queue_url?: string | null,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
              show_budget_confirmation?: boolean | null,
            },
          } >,
          subscriptions:  Array< {
            __typename: "SubscriptionPrisma",
            id: string,
            business_id: string,
            subscription_plan_code?: string | null,
            status: string,
            processor?: string | null,
            store_subscription_body?: string | null,
            store_subscription_id?: string | null,
            promo_code_id?: string | null,
            trial_start?: string | null,
            trial_end?: string | null,
            trial_left?: number | null,
            current_billing_period_start?: string | null,
            current_billing_period_end?: string | null,
            subscription_end_date?: string | null,
            business_limit?: number | null,
            staff_limit?: number | null,
            subscription_charges?:  Array< {
              __typename: "SubscriptionChargesPrisma",
              id: string,
              business_id: string,
              subscription_id?: string | null,
              store_revenue: number,
              amount_billed: number,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
            } | null > | null,
            promo_codes?:  {
              __typename: "PromoCodePrisma",
              id?: string | null,
              code?: string | null,
              type?: string | null,
              status?: string | null,
              duration?: number | null,
              amount?: number | null,
              created_at?: string | null,
              updated_at?: string | null,
              deleted_at?: string | null,
            } | null,
            current_revenue?: number | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
          } >,
          store?:  {
            __typename: "StorePrisma",
            id?: string | null,
            shop_name?: string | null,
            address1?: string | null,
            address2?: string | null,
            city?: string | null,
            state?: string | null,
            zip?: string | null,
            country?: string | null,
            store_url?: string | null,
            timezone?: string | null,
            currency?: string | null,
            created_at?: string | null,
            updated_at?: string | null,
            deleted_at?: string | null,
          } | null,
          completed_onboarding_call?: boolean | null,
        },
        user_type: string,
        is_default_business: boolean,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
      } > | null,
      profile_photo?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetPerformanceDetailsQueryVariables = {
  getPerformanceDetailsInput?: GetPerformanceDetailsInput | null,
};

export type GetPerformanceDetailsQuery = {
  getPerformanceDetails?:  {
    __typename: "GetPerformanceDetailsResponse",
    data?:  {
      __typename: "GetBusinessPerformanceDetails",
      performance?:  Array< {
        __typename: "Performance",
        id?: string | null,
        source?: string | null,
        business_id?: string | null,
        purchases_count?: number | null,
        clicks_count?: number | null,
        daily_budget?: number | null,
        lifetime_budget?: number | null,
        shared_budget_name?: string | null,
        campaign_name?: string | null,
        campaign_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_set_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_images?: Array< string | null > | null,
        itemType?: string | null,
        ad_image?: string | null,
        ad_set?: string | null,
        ad_set_name?: string | null,
        ad?: string | null,
        ad_name?: string | null,
        sirge_ad_id?: string | null,
        sirge_adset_id?: string | null,
        sirge_campaign_id?: string | null,
        total_title?: string | null,
        source_delivery_status?: string | null,
        source_secondary_status?: string | null,
        clicks?: number | null,
        purchases?: number | null,
        purchases_source?: number | null,
        roas?: string | null,
        cost_per_purchase?: number | null,
        amount_spent?: number | null,
        average_cpm?: number | null,
        conversion_value?: number | null,
        total_conversion_value?: number | null,
        roas_ltv?: number | null,
        sirge_clicks?: number | null,
        sirge_purchases?: number | null,
        sirge_roas?: string | null,
        sirge_cost_per_purchase?: number | null,
        sirge_total_conversion_value?: number | null,
        created?: string | null,
        updated_at?: string | null,
        ad_type?: string | null,
        utm_status?: boolean | null,
        are_all_ads_connected?: boolean | null,
        transform?: boolean | null,
      } | null > | null,
      summary?:  {
        __typename: "PerformanceSummary",
        amount_spent?: number | null,
        clicks?: number | null,
        purchases?: number | null,
        purchases_source?: number | null,
        cost_per_purchase?: number | null,
        total_conversion_value?: number | null,
        roas?: string | null,
        ft_clicks?: number | null,
        ft_purchases?: number | null,
        ft_cost_per_purchase?: number | null,
        ft_total_conversion_value?: number | null,
        ft_roas_ltv?: number | null,
        ft_roas?: string | null,
        ft_average_cpm?: number | null,
        number_of_records?: number | null,
      } | null,
      isRoasGoalsSet?: boolean | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetPerformanceDetailsNewQueryVariables = {
  getPerformanceDetailsInput?: GetPerformanceDetailsInput | null,
};

export type GetPerformanceDetailsNewQuery = {
  getPerformanceDetailsNew?:  {
    __typename: "GetPerformanceDetailsResponse",
    data?:  {
      __typename: "GetBusinessPerformanceDetails",
      performance?:  Array< {
        __typename: "Performance",
        id?: string | null,
        source?: string | null,
        business_id?: string | null,
        purchases_count?: number | null,
        clicks_count?: number | null,
        daily_budget?: number | null,
        lifetime_budget?: number | null,
        shared_budget_name?: string | null,
        campaign_name?: string | null,
        campaign_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_set_budget?:  {
          __typename: "AdGroupBudgetDetails",
          daily_budget?: number | null,
          lifetime_budget?: number | null,
          name?: string | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
          shared_budget_name?: string | null,
        } | null,
        ad_images?: Array< string | null > | null,
        itemType?: string | null,
        ad_image?: string | null,
        ad_set?: string | null,
        ad_set_name?: string | null,
        ad?: string | null,
        ad_name?: string | null,
        sirge_ad_id?: string | null,
        sirge_adset_id?: string | null,
        sirge_campaign_id?: string | null,
        total_title?: string | null,
        source_delivery_status?: string | null,
        source_secondary_status?: string | null,
        clicks?: number | null,
        purchases?: number | null,
        purchases_source?: number | null,
        roas?: string | null,
        cost_per_purchase?: number | null,
        amount_spent?: number | null,
        average_cpm?: number | null,
        conversion_value?: number | null,
        total_conversion_value?: number | null,
        roas_ltv?: number | null,
        sirge_clicks?: number | null,
        sirge_purchases?: number | null,
        sirge_roas?: string | null,
        sirge_cost_per_purchase?: number | null,
        sirge_total_conversion_value?: number | null,
        created?: string | null,
        updated_at?: string | null,
        ad_type?: string | null,
        utm_status?: boolean | null,
        are_all_ads_connected?: boolean | null,
        transform?: boolean | null,
      } | null > | null,
      summary?:  {
        __typename: "PerformanceSummary",
        amount_spent?: number | null,
        clicks?: number | null,
        purchases?: number | null,
        purchases_source?: number | null,
        cost_per_purchase?: number | null,
        total_conversion_value?: number | null,
        roas?: string | null,
        ft_clicks?: number | null,
        ft_purchases?: number | null,
        ft_cost_per_purchase?: number | null,
        ft_total_conversion_value?: number | null,
        ft_roas_ltv?: number | null,
        ft_roas?: string | null,
        ft_average_cpm?: number | null,
        number_of_records?: number | null,
      } | null,
      isRoasGoalsSet?: boolean | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetBusinessConnectionsQueryVariables = {
  getBusinessConnectionsInput: GetBusinessConnectionsInput,
};

export type GetBusinessConnectionsQuery = {
  getBusinessConnections?:  {
    __typename: "GetBusinessConnectionsResponse",
    data?:  {
      __typename: "BusinessConnection",
      facebook_ad_account_id?: string | null,
      facebook_ad_account_name?: string | null,
      script_installed?: boolean | null,
      shopify_store?: string | null,
      tik_tok_ad_account_id?: string | null,
      tik_tok_ad_account_name?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessAnalyticsQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetBusinessAnalyticsQuery = {
  getBusinessAnalytics?:  {
    __typename: "GetBusinessAnalyticsResponse",
    data?:  {
      __typename: "Analytics",
      id?: string | null,
      business_id?: string | null,
      analytic_id?: string | null,
      performance?:  Array< {
        __typename: "PerformanceData",
        source?: string | null,
        amount_spent?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        total_sales?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        average_order_value?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        total_conversion_value?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        conversion_rate?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        cost_per_purchase?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        blended_roas?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        roas?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        visits?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        purchases?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
        ad_clicks?:  {
          __typename: "PerformanceDetail",
          all_amounts?:  Array< {
            __typename: "AllAmount",
            amount?: number | null,
            date?: string | null,
          } | null > | null,
          daily_amount?: number | null,
          weekly_amount?: number | null,
          monthly_amount?: number | null,
          daily_percentage?: number | null,
          weekly_percentage?: number | null,
          monthly_percentage?: number | null,
        } | null,
      } | null > | null,
      performing_product?:  {
        __typename: "PerformingProducts",
        daily?:  Array< {
          __typename: "PerformingProductsObject",
          product_id?: string | null,
          name?: string | null,
          totalPrice?: number | null,
          ordersCount?: number | null,
          percentage?: number | null,
        } | null > | null,
        weekly?:  Array< {
          __typename: "PerformingProductsObject",
          product_id?: string | null,
          name?: string | null,
          totalPrice?: number | null,
          ordersCount?: number | null,
          percentage?: number | null,
        } | null > | null,
        monthly?:  Array< {
          __typename: "PerformingProductsObject",
          product_id?: string | null,
          name?: string | null,
          totalPrice?: number | null,
          ordersCount?: number | null,
          percentage?: number | null,
        } | null > | null,
      } | null,
      best_performing?:  {
        __typename: "BestPerforming",
        campaigns?:  {
          __typename: "BestPerformingObject",
          daily?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
          weekly?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
          monthly?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
        } | null,
        adsets?:  {
          __typename: "BestPerformingObject",
          daily?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
          weekly?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
          monthly?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
        } | null,
        ads?:  {
          __typename: "BestPerformingObject",
          daily?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
          weekly?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
          monthly?:  Array< {
            __typename: "BestPerformingDetail",
            name?: string | null,
            source?: string | null,
            source_view?: string | null,
            status?: string | null,
            total_amount_spent?: number | null,
            total_conversion_value?: number | null,
            roas?: number | null,
            purchases?: number | null,
            ad_images?: Array< string | null > | null,
            impact?: number | null,
          } | null > | null,
        } | null,
      } | null,
      monthly_budget?:  {
        __typename: "MonthlyBudget",
        total?: number | null,
        facebook?: number | null,
        tiktok?: number | null,
        amount_left?: number | null,
      } | null,
      roas_goals?:  {
        __typename: "RoasGoals",
        campaigns?:  {
          __typename: "RoasGoalObject",
          goal?: number | null,
          value?:  Array< {
            __typename: "RoasGoalObjectDetail",
            source?: string | null,
            daily?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
            weekly?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
            monthly?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
          } | null > | null,
        } | null,
        adsets?:  {
          __typename: "RoasGoalObject",
          goal?: number | null,
          value?:  Array< {
            __typename: "RoasGoalObjectDetail",
            source?: string | null,
            daily?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
            weekly?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
            monthly?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
          } | null > | null,
        } | null,
        ads?:  {
          __typename: "RoasGoalObject",
          goal?: number | null,
          value?:  Array< {
            __typename: "RoasGoalObjectDetail",
            source?: string | null,
            daily?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
            weekly?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
            monthly?:  {
              __typename: "RoasGoalInnerDetail",
              over?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
              under?:  {
                __typename: "RoasGoalsInnerDetailCompare",
                percentage?: number | null,
                amount?: number | null,
              } | null,
            } | null,
          } | null > | null,
        } | null,
      } | null,
      record_date?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessAnalyticsTopPerformingProductsQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetBusinessAnalyticsTopPerformingProductsQuery = {
  getBusinessAnalyticsTopPerformingProducts?:  {
    __typename: "GetBusinessAnalyticsTopPerformingProductsResponse",
    data?:  {
      __typename: "TopPerformingProduct",
      business_id?: string | null,
      created_day?: string | null,
      daily?:  Array< {
        __typename: "PerformingProductsObject",
        product_id?: string | null,
        name?: string | null,
        totalPrice?: number | null,
        ordersCount?: number | null,
        percentage?: number | null,
      } | null > | null,
      weekly?:  Array< {
        __typename: "PerformingProductsObject",
        product_id?: string | null,
        name?: string | null,
        totalPrice?: number | null,
        ordersCount?: number | null,
        percentage?: number | null,
      } | null > | null,
      monthly?:  Array< {
        __typename: "PerformingProductsObject",
        product_id?: string | null,
        name?: string | null,
        totalPrice?: number | null,
        ordersCount?: number | null,
        percentage?: number | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetPurchasesByBusinessQueryVariables = {
  getPurchaseByBusinessInput: GetPurchaseByBusinessInput,
};

export type GetPurchasesByBusinessQuery = {
  getPurchasesByBusiness?:  {
    __typename: "GetPurchasesByBusinessResponse",
    data?:  Array< {
      __typename: "PageView",
      ad?: string | null,
      ad_set?: string | null,
      business_id?: string | null,
      campaign?: string | null,
      checkout_platform?: string | null,
      conversion_value?: string | null,
      created?: string | null,
      currency?: string | null,
      expiry_date?: string | null,
      id?: string | null,
      ip?: string | null,
      order_id?: string | null,
      purchase_id?: string | null,
      referer?: string | null,
      sirge_ad_id?: string | null,
      sirge_adset_id?: string | null,
      sirge_campaign_id?: string | null,
      sirge_source_name?: string | null,
      source?: string | null,
      tracking_channel?: string | null,
      url?: string | null,
      clicks_count?: number | null,
      purchases_count?: number | null,
      visitor_addresscity?: string | null,
      visitor_addresscountry?: string | null,
      visitor_addressline1?: string | null,
      visitor_addressline2?: string | null,
      visitor_addresspostal_code?: string | null,
      visitor_addressprovince?: string | null,
      visitor_email?: string | null,
      visitor_id?: string | null,
      visitor_name?: string | null,
      visitor_phone?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetPurchasesByBusinessNewQueryVariables = {
  getPurchaseByBusinessInput: GetPurchaseByBusinessInput,
};

export type GetPurchasesByBusinessNewQuery = {
  getPurchasesByBusinessNew?:  {
    __typename: "GetPurchasesByBusinessResponseNew",
    data?:  Array< {
      __typename: "PurchaseByBusiness",
      visitor_name?: string | null,
      visitor_id?: string | null,
      created?: string | null,
      purchases_count?: number | null,
      conversion_value?: number | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetUserTiktokAdsQueryVariables = {
  getUserTiktokAdsInput: GetUserTiktokAdsInput,
};

export type GetUserTiktokAdsQuery = {
  getUserTiktokAds?:  {
    __typename: "GetUserTiktokAdsResponse",
    data?:  Array< {
      __typename: "TiktokAds",
      advertiser_id?: string | null,
      advertiser_name?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetCurrentUserBusinessDetailsQueryVariables = {
  getCurrentUserBusinessDetailsInput: GetCurrentUserBusinessDetailsInput,
};

export type GetCurrentUserBusinessDetailsQuery = {
  getCurrentUserBusinessDetails?:  {
    __typename: "GetCurrentUserBusinessDetailsResponse",
    data?:  {
      __typename: "CurrentUserBusinessDetails",
      business?:  {
        __typename: "Business",
        business_id: string,
        business_name?: string | null,
        created_at?: string | null,
        external_platform?: string | null,
        facebook_ad_account_currency?: string | null,
        facebook_ad_account_id?: string | null,
        facebook_ad_account_name?: string | null,
        fb_pixel_id?: string | null,
        logo?: string | null,
        premium_page_views?: number | null,
        shopify_access_token?: string | null,
        shopify_script_tag_id?: string | null,
        shopify_store_url?: string | null,
        status?: string | null,
        tik_tok_access_token?: string | null,
        tik_tok_ad_account_currency?: string | null,
        tik_tok_ad_account_id?: string | null,
        tik_tok_ad_account_name?: string | null,
        tik_tok_ad_account_timezone?: string | null,
        facebook_accessToken?: string | null,
        facebook_userID?: string | null,
        updated_at?: string | null,
        user_id?: string | null,
        vanity_name?: string | null,
        script_installed?: boolean | null,
        campaign_count?:  {
          __typename: "CampaignCount",
          active_count?: string | null,
          paused_count?: string | null,
        } | null,
        fb_utm_count?: number | null,
        tiktok_utm_count?: number | null,
        shopify_store_domain?: string | null,
        timezone?: string | null,
        roas_goals?:  {
          __typename: "BusinessRoasGoals",
          campaign?: number | null,
          adset?: number | null,
          ad?: number | null,
        } | null,
        monthly_budget?: number | null,
        google_ad_account_id?: string | null,
        google_ad_accessToken?: string | null,
        google_ad_account_currency?: string | null,
        last_data_refreshed?: string | null,
        completed_onboarding_call?: boolean | null,
        reminder_status?: boolean | null,
        currency?: string | null,
        business_plan?:  {
          __typename: "Plan",
          business_limit?: number | null,
          page_view_limit?: number | null,
          plan_code?: string | null,
          plan_name?: string | null,
          plan_price_id?: string | null,
          plan_product_id?: string | null,
          staff_limit?: number | null,
        } | null,
        subscription?:  {
          __typename: "Subscription",
          created_at?: string | null,
          customer_id?: string | null,
          id?: string | null,
          status?: string | null,
          subscription_body?: string | null,
          updated_at?: string | null,
          trial_end?: string | null,
          trial_start?: string | null,
          trial_left?: number | null,
          promo_code?:  {
            __typename: "DiscountCode",
            code?: string | null,
            status?: string | null,
            duration?: number | null,
            amount?: number | null,
            type?: string | null,
          } | null,
          plan?:  {
            __typename: "Plan",
            business_limit?: number | null,
            page_view_limit?: number | null,
            plan_code?: string | null,
            plan_name?: string | null,
            plan_price_id?: string | null,
            plan_product_id?: string | null,
            staff_limit?: number | null,
          } | null,
          plan_changed?: boolean | null,
          plan_code?: string | null,
          current_revenue?: number | null,
          current_billing_period_start?: string | null,
          current_billing_period_end?: string | null,
        } | null,
      } | null,
      businesses?:  {
        __typename: "Businesses",
        business_active_count?: number | null,
        business_count?: number | null,
        business_list?:  Array< {
          __typename: "Business",
          business_id: string,
          business_name?: string | null,
          created_at?: string | null,
          external_platform?: string | null,
          facebook_ad_account_currency?: string | null,
          facebook_ad_account_id?: string | null,
          facebook_ad_account_name?: string | null,
          fb_pixel_id?: string | null,
          logo?: string | null,
          premium_page_views?: number | null,
          shopify_access_token?: string | null,
          shopify_script_tag_id?: string | null,
          shopify_store_url?: string | null,
          status?: string | null,
          tik_tok_access_token?: string | null,
          tik_tok_ad_account_currency?: string | null,
          tik_tok_ad_account_id?: string | null,
          tik_tok_ad_account_name?: string | null,
          tik_tok_ad_account_timezone?: string | null,
          facebook_accessToken?: string | null,
          facebook_userID?: string | null,
          updated_at?: string | null,
          user_id?: string | null,
          vanity_name?: string | null,
          script_installed?: boolean | null,
          campaign_count?:  {
            __typename: "CampaignCount",
            active_count?: string | null,
            paused_count?: string | null,
          } | null,
          fb_utm_count?: number | null,
          tiktok_utm_count?: number | null,
          shopify_store_domain?: string | null,
          timezone?: string | null,
          roas_goals?:  {
            __typename: "BusinessRoasGoals",
            campaign?: number | null,
            adset?: number | null,
            ad?: number | null,
          } | null,
          monthly_budget?: number | null,
          google_ad_account_id?: string | null,
          google_ad_accessToken?: string | null,
          google_ad_account_currency?: string | null,
          last_data_refreshed?: string | null,
          completed_onboarding_call?: boolean | null,
          reminder_status?: boolean | null,
          currency?: string | null,
          business_plan?:  {
            __typename: "Plan",
            business_limit?: number | null,
            page_view_limit?: number | null,
            plan_code?: string | null,
            plan_name?: string | null,
            plan_price_id?: string | null,
            plan_product_id?: string | null,
            staff_limit?: number | null,
          } | null,
          subscription?:  {
            __typename: "Subscription",
            created_at?: string | null,
            customer_id?: string | null,
            id?: string | null,
            status?: string | null,
            subscription_body?: string | null,
            updated_at?: string | null,
            trial_end?: string | null,
            trial_start?: string | null,
            trial_left?: number | null,
            promo_code?:  {
              __typename: "DiscountCode",
              code?: string | null,
              status?: string | null,
              duration?: number | null,
              amount?: number | null,
              type?: string | null,
            } | null,
            plan?:  {
              __typename: "Plan",
              business_limit?: number | null,
              page_view_limit?: number | null,
              plan_code?: string | null,
              plan_name?: string | null,
              plan_price_id?: string | null,
              plan_product_id?: string | null,
              staff_limit?: number | null,
            } | null,
            plan_changed?: boolean | null,
            plan_code?: string | null,
            current_revenue?: number | null,
            current_billing_period_start?: string | null,
            current_billing_period_end?: string | null,
          } | null,
        } | null > | null,
      } | null,
      status?:  {
        __typename: "BusinessActiveStatus",
        active?: boolean | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetCurrentUserBusinessDetailsNewQueryVariables = {
  getCurrentUserBusinessDetailsInput: GetCurrentUserBusinessDetailsInput,
};

export type GetCurrentUserBusinessDetailsNewQuery = {
  getCurrentUserBusinessDetailsNew?:  {
    __typename: "GetCurrentUserBusinessDetailsResponsePrisma",
    data?:  {
      __typename: "CurrentUserBusinessDetailsPrisma",
      business?:  {
        __typename: "BusinessPrisma",
        id: string,
        store_id: string,
        name: string,
        status: string,
        logo: string,
        vanity_name: string,
        reminder_status?: boolean | null,
        show_budget_confirmation?: boolean | null,
        monthly_budget: number,
        campaign_roas_goal: string,
        adset_roas_goal: string,
        ad_roas_goal: string,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
        ad_account_settings:  Array< {
          __typename: "AdAccountSettingsPrisma",
          id: string,
          business_id: string,
          ad_platform_id: string,
          premium_page_views: number,
          external_platform?: string | null,
          active_campaign_count: number,
          paused_campaign_count: number,
          social_account_id?: string | null,
          social_account_name?: string | null,
          social_account_currency?: string | null,
          social_account_timezone?: string | null,
          access_token: string,
          utm_count: number,
          social_integration?: string | null,
          conversion_api_enabled?: string | null,
          pixel_id?: string | null,
          social_refresh_token?: string | null,
          updateKey?: string | null,
          last_data_refreshed?: string | null,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
          ad_platform:  {
            __typename: "AdPlatformPrisma",
            id: string,
            name: string,
            internal_source_name: string,
            is_sirge_managed: boolean,
            dark_theme_image_url?: string | null,
            light_theme_image_url: string,
            status: string,
            sqs_refresh_queue_url?: string | null,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
            show_budget_confirmation?: boolean | null,
          },
        } >,
        subscriptions:  Array< {
          __typename: "SubscriptionPrisma",
          id: string,
          business_id: string,
          subscription_plan_code?: string | null,
          status: string,
          processor?: string | null,
          store_subscription_body?: string | null,
          store_subscription_id?: string | null,
          promo_code_id?: string | null,
          trial_start?: string | null,
          trial_end?: string | null,
          trial_left?: number | null,
          current_billing_period_start?: string | null,
          current_billing_period_end?: string | null,
          subscription_end_date?: string | null,
          business_limit?: number | null,
          staff_limit?: number | null,
          subscription_charges?:  Array< {
            __typename: "SubscriptionChargesPrisma",
            id: string,
            business_id: string,
            subscription_id?: string | null,
            store_revenue: number,
            amount_billed: number,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
          } | null > | null,
          promo_codes?:  {
            __typename: "PromoCodePrisma",
            id?: string | null,
            code?: string | null,
            type?: string | null,
            status?: string | null,
            duration?: number | null,
            amount?: number | null,
            created_at?: string | null,
            updated_at?: string | null,
            deleted_at?: string | null,
          } | null,
          current_revenue?: number | null,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
        } >,
        store?:  {
          __typename: "StorePrisma",
          id?: string | null,
          shop_name?: string | null,
          address1?: string | null,
          address2?: string | null,
          city?: string | null,
          state?: string | null,
          zip?: string | null,
          country?: string | null,
          store_url?: string | null,
          timezone?: string | null,
          currency?: string | null,
          created_at?: string | null,
          updated_at?: string | null,
          deleted_at?: string | null,
        } | null,
        completed_onboarding_call?: boolean | null,
      } | null,
      businesses?:  {
        __typename: "BusinessesPrisma",
        business_active_count?: number | null,
        business_count?: number | null,
        business_list?:  Array< {
          __typename: "UserXBusinessPrisma",
          user_id: string,
          business_id: string,
          business:  {
            __typename: "BusinessPrisma",
            id: string,
            store_id: string,
            name: string,
            status: string,
            logo: string,
            vanity_name: string,
            reminder_status?: boolean | null,
            show_budget_confirmation?: boolean | null,
            monthly_budget: number,
            campaign_roas_goal: string,
            adset_roas_goal: string,
            ad_roas_goal: string,
            created_at: string,
            updated_at: string,
            deleted_at?: string | null,
            ad_account_settings:  Array< {
              __typename: "AdAccountSettingsPrisma",
              id: string,
              business_id: string,
              ad_platform_id: string,
              premium_page_views: number,
              external_platform?: string | null,
              active_campaign_count: number,
              paused_campaign_count: number,
              social_account_id?: string | null,
              social_account_name?: string | null,
              social_account_currency?: string | null,
              social_account_timezone?: string | null,
              access_token: string,
              utm_count: number,
              social_integration?: string | null,
              conversion_api_enabled?: string | null,
              pixel_id?: string | null,
              social_refresh_token?: string | null,
              updateKey?: string | null,
              last_data_refreshed?: string | null,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
              ad_platform:  {
                __typename: "AdPlatformPrisma",
                id: string,
                name: string,
                internal_source_name: string,
                is_sirge_managed: boolean,
                dark_theme_image_url?: string | null,
                light_theme_image_url: string,
                status: string,
                sqs_refresh_queue_url?: string | null,
                created_at: string,
                updated_at: string,
                deleted_at?: string | null,
                show_budget_confirmation?: boolean | null,
              },
            } >,
            subscriptions:  Array< {
              __typename: "SubscriptionPrisma",
              id: string,
              business_id: string,
              subscription_plan_code?: string | null,
              status: string,
              processor?: string | null,
              store_subscription_body?: string | null,
              store_subscription_id?: string | null,
              promo_code_id?: string | null,
              trial_start?: string | null,
              trial_end?: string | null,
              trial_left?: number | null,
              current_billing_period_start?: string | null,
              current_billing_period_end?: string | null,
              subscription_end_date?: string | null,
              business_limit?: number | null,
              staff_limit?: number | null,
              subscription_charges?:  Array< {
                __typename: "SubscriptionChargesPrisma",
                id: string,
                business_id: string,
                subscription_id?: string | null,
                store_revenue: number,
                amount_billed: number,
                created_at: string,
                updated_at: string,
                deleted_at?: string | null,
              } | null > | null,
              promo_codes?:  {
                __typename: "PromoCodePrisma",
                id?: string | null,
                code?: string | null,
                type?: string | null,
                status?: string | null,
                duration?: number | null,
                amount?: number | null,
                created_at?: string | null,
                updated_at?: string | null,
                deleted_at?: string | null,
              } | null,
              current_revenue?: number | null,
              created_at: string,
              updated_at: string,
              deleted_at?: string | null,
            } >,
            store?:  {
              __typename: "StorePrisma",
              id?: string | null,
              shop_name?: string | null,
              address1?: string | null,
              address2?: string | null,
              city?: string | null,
              state?: string | null,
              zip?: string | null,
              country?: string | null,
              store_url?: string | null,
              timezone?: string | null,
              currency?: string | null,
              created_at?: string | null,
              updated_at?: string | null,
              deleted_at?: string | null,
            } | null,
            completed_onboarding_call?: boolean | null,
          },
          user_type: string,
          is_default_business: boolean,
          created_at: string,
          updated_at: string,
          deleted_at?: string | null,
        } | null > | null,
      } | null,
      status?:  {
        __typename: "BusinessActiveStatus",
        active?: boolean | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetShopifyExtensionStatusQueryVariables = {
  getShopifyExtensionStatusInput?: GetShopifyExtensionStatusInput | null,
};

export type GetShopifyExtensionStatusQuery = {
  getShopifyExtensionStatus?:  {
    __typename: "GetShopifyExtensionStatusResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserFacebookAccountQueryVariables = {
  getUserFacebookAccountInput: GetUserFacebookAccountInput,
};

export type GetUserFacebookAccountQuery = {
  getUserFacebookAccount?:  {
    __typename: "GetUserFacebookAccountResponse",
    data?:  {
      __typename: "FacebookAccount",
      id?: string | null,
      name?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetDiscountCodeStatusQueryVariables = {
  getDiscountCodeStatusInput: GetDiscountCodeStatusInput,
};

export type GetDiscountCodeStatusQuery = {
  getDiscountCodeStatus?:  {
    __typename: "GetDiscountCodeStatusResponse",
    data?:  {
      __typename: "DiscountCode",
      code?: string | null,
      status?: string | null,
      duration?: number | null,
      amount?: number | null,
      type?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetDiscountCodeStatusNewQueryVariables = {
  getDiscountCodeStatusInput: GetDiscountCodeStatusInput,
};

export type GetDiscountCodeStatusNewQuery = {
  getDiscountCodeStatusNew?:  {
    __typename: "GetDiscountCodeStatusNewResponse",
    data?:  {
      __typename: "PromoCode",
      id?: string | null,
      code?: string | null,
      type?: string | null,
      status?: string | null,
      duration?: number | null,
      amount?: number | null,
      created_at?: string | null,
      updated_at?: string | null,
      deleted_at?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessAdcomparisonDataQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetBusinessAdcomparisonDataQuery = {
  getBusinessAdcomparisonData?:  {
    __typename: "GetBusinessAdcomparisonDataResponse",
    data?:  Array< {
      __typename: "AnalyticsPerformance",
      name?: string | null,
      source?: string | null,
      status?: string | null,
      total_amount_spent?: number | null,
      roas?: number | null,
      purchases?: number | null,
      ad_images?: Array< string | null > | null,
      sirge_ad_id?: string | null,
      sirge_adset_id?: string | null,
      sirge_campaign_id?: string | null,
      impact?: number | null,
      total_conversion_value?: number | null,
      id?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetBusinessAnalyticsStatisticsQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetBusinessAnalyticsStatisticsQuery = {
  getBusinessAnalyticsStatistics?:  {
    __typename: "GetBusinessAnalyticsStatisticsResponse",
    data?:  {
      __typename: "AnalyticsStatisticsData",
      business_id?: string | null,
      all?:  {
        __typename: "SocialWidget",
        purchases?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_sales?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        average_order_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        blended_roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        visitors?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        conversion_rate?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        amount_spent?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_conversion_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        cost_per_purchase?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        ad_clicks?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
      } | null,
      facebook?:  {
        __typename: "SocialWidget",
        purchases?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_sales?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        average_order_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        blended_roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        visitors?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        conversion_rate?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        amount_spent?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_conversion_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        cost_per_purchase?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        ad_clicks?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
      } | null,
      tiktok?:  {
        __typename: "SocialWidget",
        purchases?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_sales?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        average_order_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        blended_roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        visitors?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        conversion_rate?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        amount_spent?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_conversion_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        cost_per_purchase?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        ad_clicks?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
      } | null,
      google?:  {
        __typename: "SocialWidget",
        purchases?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_sales?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        average_order_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        blended_roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        visitors?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        conversion_rate?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        amount_spent?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        total_conversion_value?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        cost_per_purchase?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        roas?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
        ad_clicks?:  {
          __typename: "WidgetValue",
          amount?: number | null,
          percentage?: number | null,
        } | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetStatisticsGraphQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetStatisticsGraphQuery = {
  getStatisticsGraph?:  {
    __typename: "GetStatisticsGraphResponse",
    data?:  {
      __typename: "StatisticData",
      business_id?: string | null,
      all?:  {
        __typename: "StatisticGraph",
        purchases?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        amount_spent?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        visitors?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_sales?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        ad_clicks?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_conversion_value?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
      } | null,
      facebook?:  {
        __typename: "StatisticGraph",
        purchases?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        amount_spent?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        visitors?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_sales?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        ad_clicks?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_conversion_value?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
      } | null,
      tiktok?:  {
        __typename: "StatisticGraph",
        purchases?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        amount_spent?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        visitors?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_sales?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        ad_clicks?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_conversion_value?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
      } | null,
      google?:  {
        __typename: "StatisticGraph",
        purchases?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        amount_spent?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        visitors?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_sales?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        ad_clicks?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
        total_conversion_value?:  Array< {
          __typename: "StatisticGraphDataDetail",
          created?: string | null,
          amount?: number | null,
        } | null > | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessMonthlyBudgetRoasQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetBusinessMonthlyBudgetRoasQuery = {
  getBusinessMonthlyBudgetRoas?:  {
    __typename: "GetBusinessMonthlyBudgetRoasResponse",
    data?:  {
      __typename: "MonthlyBudgetSources",
      sources?:  Array< {
        __typename: "MonthlyBudgetObject",
        id?: string | null,
        amount_spent?: number | null,
        source?: string | null,
      } | null > | null,
      roas?:  {
        __typename: "BusinessAnalyticsRoas",
        campaignData?:  Array< {
          __typename: "AnalyticsRoas",
          id?: string | null,
          source?: string | null,
          purchases?: number | null,
          roas?: string | null,
          cost_per_purchase?: number | null,
          amount_spent?: number | null,
          conversion_value?: number | null,
          total_conversion_value?: number | null,
          sirge_purchases?: number | null,
          sirge_roas?: string | null,
          sirge_cost_per_purchase?: number | null,
          sirge_total_conversion_value?: number | null,
          campaign?:  {
            __typename: "ParentAdDetail",
            id?: string | null,
            name?: string | null,
            status?: string | null,
            source_secondary_status?: string | null,
          } | null,
          adset?:  {
            __typename: "ParentAdDetail",
            id?: string | null,
            name?: string | null,
            status?: string | null,
            source_secondary_status?: string | null,
          } | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
        } | null > | null,
        adsetData?:  Array< {
          __typename: "AnalyticsRoas",
          id?: string | null,
          source?: string | null,
          purchases?: number | null,
          roas?: string | null,
          cost_per_purchase?: number | null,
          amount_spent?: number | null,
          conversion_value?: number | null,
          total_conversion_value?: number | null,
          sirge_purchases?: number | null,
          sirge_roas?: string | null,
          sirge_cost_per_purchase?: number | null,
          sirge_total_conversion_value?: number | null,
          campaign?:  {
            __typename: "ParentAdDetail",
            id?: string | null,
            name?: string | null,
            status?: string | null,
            source_secondary_status?: string | null,
          } | null,
          adset?:  {
            __typename: "ParentAdDetail",
            id?: string | null,
            name?: string | null,
            status?: string | null,
            source_secondary_status?: string | null,
          } | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
        } | null > | null,
        adData?:  Array< {
          __typename: "AnalyticsRoas",
          id?: string | null,
          source?: string | null,
          purchases?: number | null,
          roas?: string | null,
          cost_per_purchase?: number | null,
          amount_spent?: number | null,
          conversion_value?: number | null,
          total_conversion_value?: number | null,
          sirge_purchases?: number | null,
          sirge_roas?: string | null,
          sirge_cost_per_purchase?: number | null,
          sirge_total_conversion_value?: number | null,
          campaign?:  {
            __typename: "ParentAdDetail",
            id?: string | null,
            name?: string | null,
            status?: string | null,
            source_secondary_status?: string | null,
          } | null,
          adset?:  {
            __typename: "ParentAdDetail",
            id?: string | null,
            name?: string | null,
            status?: string | null,
            source_secondary_status?: string | null,
          } | null,
          source_delivery_status?: string | null,
          source_secondary_status?: string | null,
        } | null > | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailsQueryVariables = {
  getVisitorDetailsInput: GetVisitorDetailsInput,
};

export type GetVisitorDetailsQuery = {
  getVisitorDetails?:  {
    __typename: "GetVisitorDetailsResponse",
    data?:  {
      __typename: "VisitorDetails",
      visitor_email?: string | null,
      country?: string | null,
      state?: string | null,
      city?: string | null,
      total_pageviews?: number | null,
      first_visit?: string | null,
      total_purchases?: number | null,
      total_purchase_conversion_value?: number | null,
      visitor_name?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailsPageviewsQueryVariables = {
  getVisitorDetailsPageViewsInput: getVisitorDetailsPageViewsInput,
};

export type GetVisitorDetailsPageviewsQuery = {
  getVisitorDetailsPageviews?:  {
    __typename: "GetVisitorDetailsPageviewsResponse",
    data?:  Array< {
      __typename: "VisitorDetailsPageView",
      ad?: string | null,
      ad_set?: string | null,
      campaign?: string | null,
      business_id?: string | null,
      conversion_value?: number | null,
      created_day?: string | null,
      created?: string | null,
      pageview_id?: string | null,
      referer?: string | null,
      sirge_source_name?: string | null,
      url?: string | null,
    } | null > | null,
    total_records?: number | null,
    numberPages?: number | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailsSourcesQueryVariables = {
  getVisitorDetailsSourcesInput: GetVisitorDetailsSourcesInput,
};

export type GetVisitorDetailsSourcesQuery = {
  getVisitorDetailsSources?:  {
    __typename: "GetVisitorDetailsSourcesResponse",
    data?:  Array< {
      __typename: "VisitorDetailsSource",
      sirge_source_name?: string | null,
      url?: string | null,
    } | null > | null,
    total_records?: number | null,
    numberPages?: number | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetShopifyScopesStatusQueryVariables = {
};

export type GetShopifyScopesStatusQuery = {
  getShopifyScopesStatus?:  {
    __typename: "GetShopifyScopesStatusResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetShopifyScopesStatusNewQueryVariables = {
};

export type GetShopifyScopesStatusNewQuery = {
  getShopifyScopesStatusNew?:  {
    __typename: "GetShopifyScopesStatusResponse",
    data?: boolean | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAccountsCampaignsQueryVariables = {
  getAccountsCampaignsInput?: GetAccountsCampaignsInput | null,
};

export type GetAccountsCampaignsQuery = {
  getAccountsCampaigns?:  {
    __typename: "GetAccountsCampaignsResponse",
    data?:  {
      __typename: "GetBusinessAccountsCampaigns",
      facebook?:  Array< {
        __typename: "ItemSocialMediaIntegration",
        id?: string | null,
        name?: string | null,
        status?: string | null,
        utm_status?: boolean | null,
      } | null > | null,
      tiktok?:  Array< {
        __typename: "ItemSocialMediaIntegration",
        id?: string | null,
        name?: string | null,
        status?: string | null,
        utm_status?: boolean | null,
      } | null > | null,
      google?:  Array< {
        __typename: "ItemSocialMediaIntegration",
        id?: string | null,
        name?: string | null,
        status?: string | null,
        utm_status?: boolean | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAccountsCampaignsNewQueryVariables = {
  getAccountsCampaignsInput?: GetAccountsCampaignsInput | null,
};

export type GetAccountsCampaignsNewQuery = {
  getAccountsCampaignsNew?:  {
    __typename: "GetAccountsCampaignsResponse",
    data?:  {
      __typename: "GetBusinessAccountsCampaigns",
      facebook?:  Array< {
        __typename: "ItemSocialMediaIntegration",
        id?: string | null,
        name?: string | null,
        status?: string | null,
        utm_status?: boolean | null,
      } | null > | null,
      tiktok?:  Array< {
        __typename: "ItemSocialMediaIntegration",
        id?: string | null,
        name?: string | null,
        status?: string | null,
        utm_status?: boolean | null,
      } | null > | null,
      google?:  Array< {
        __typename: "ItemSocialMediaIntegration",
        id?: string | null,
        name?: string | null,
        status?: string | null,
        utm_status?: boolean | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetPerformanceDrawerBasicDetailsNewQueryVariables = {
  getPerformanceDrawerBasicDetailsInput?: GetPerformanceDrawerBasicDetailsInput | null,
};

export type GetPerformanceDrawerBasicDetailsNewQuery = {
  getPerformanceDrawerBasicDetailsNew?:  {
    __typename: "PerformanceDrawerBasicDetailsResponse",
    data?:  {
      __typename: "PerformanceDrawerBasicDetails",
      id?: string | null,
      name?: string | null,
      source?: string | null,
      source_delivery_status?: string | null,
      source_secondary_status?: string | null,
      no_of_ads?: number | null,
      no_of_adsets?: number | null,
      utm_status?: boolean | null,
      are_all_ads_connected?: boolean | null,
      daily_budget?: number | null,
      shared_budget_name?: string | null,
      lifetime_budget?: number | null,
      ad_images?: Array< string | null > | null,
      ad_type?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetPerformanceDrawerBasicDetailsQueryVariables = {
  getPerformanceDrawerBasicDetailsInput?: GetPerformanceDrawerBasicDetailsInput | null,
};

export type GetPerformanceDrawerBasicDetailsQuery = {
  getPerformanceDrawerBasicDetails?:  {
    __typename: "PerformanceDrawerBasicDetailsResponse",
    data?:  {
      __typename: "PerformanceDrawerBasicDetails",
      id?: string | null,
      name?: string | null,
      source?: string | null,
      source_delivery_status?: string | null,
      source_secondary_status?: string | null,
      no_of_ads?: number | null,
      no_of_adsets?: number | null,
      utm_status?: boolean | null,
      are_all_ads_connected?: boolean | null,
      daily_budget?: number | null,
      shared_budget_name?: string | null,
      lifetime_budget?: number | null,
      ad_images?: Array< string | null > | null,
      ad_type?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetPerformanceDrawerStatsQueryVariables = {
  getPerformanceDrawerStatsInput?: GetPerformanceDrawerStatsInput | null,
};

export type GetPerformanceDrawerStatsQuery = {
  getPerformanceDrawerStats?:  {
    __typename: "PerformanceDrawerStatsResponse",
    data?:  {
      __typename: "PerformanceDrawerStats",
      total_amount_spent?: number | null,
      total_roas?: number | null,
      total_conversion?: number | null,
      total_purchases?: number | null,
      graph?:  Array< {
        __typename: "PerformanceDrawerStatsGraph",
        total_amount_spent?: number | null,
        total_conversion_value?: number | null,
        created?: string | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GenerateTrackableCopyPathQueryVariables = {
  generateTrackableCopyPathInput?: GenerateTrackableCopyPathInput | null,
};

export type GenerateTrackableCopyPathQuery = {
  generateTrackableCopyPath?:  {
    __typename: "GenerateTrackableCopyPathResponse",
    data?:  {
      __typename: "GeneratedPath",
      path?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetPerformanceDrawerStatsNewQueryVariables = {
  getPerformanceDrawerStatsInput?: GetPerformanceDrawerStatsInput | null,
};

export type GetPerformanceDrawerStatsNewQuery = {
  getPerformanceDrawerStatsNew?:  {
    __typename: "PerformanceDrawerStatsResponse",
    data?:  {
      __typename: "PerformanceDrawerStats",
      total_amount_spent?: number | null,
      total_roas?: number | null,
      total_conversion?: number | null,
      total_purchases?: number | null,
      graph?:  Array< {
        __typename: "PerformanceDrawerStatsGraph",
        total_amount_spent?: number | null,
        total_conversion_value?: number | null,
        created?: string | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GenerateTrackableCopyPathNewQueryVariables = {
  generateTrackableCopyParams: BusinessIdInput,
};

export type GenerateTrackableCopyPathNewQuery = {
  generateTrackableCopyPathNew?:  {
    __typename: "GenerateTrackableCopyPathResponse",
    data?:  {
      __typename: "GeneratedPath",
      path?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetTrackableCopiesQueryVariables = {
  getTrackableCopiesInput: GetTrackableCopiesInput,
};

export type GetTrackableCopiesQuery = {
  getTrackableCopies?:  {
    __typename: "GetTrackableCopiesResponse",
    data?:  Array< {
      __typename: "TrackableCopy",
      id?: string | null,
      name?: string | null,
      description?: string | null,
      type?: string | null,
      short_code?: string | null,
      destination_url?: string | null,
      url_position?: string | null,
      business_id?: string | null,
      created?: string | null,
      stats?:  {
        __typename: "TrackableCopyStats",
        clicks?: number | null,
        purchases?: number | null,
        revenue?: number | null,
      } | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetTrackableCopiesNewQueryVariables = {
  getTrackableCopiesInput: GetTrackableCopiesInput,
};

export type GetTrackableCopiesNewQuery = {
  getTrackableCopiesNew?:  {
    __typename: "GetTrackableCopiesResponse",
    data?:  Array< {
      __typename: "TrackableCopy",
      id?: string | null,
      name?: string | null,
      description?: string | null,
      type?: string | null,
      short_code?: string | null,
      destination_url?: string | null,
      url_position?: string | null,
      business_id?: string | null,
      created?: string | null,
      stats?:  {
        __typename: "TrackableCopyStats",
        clicks?: number | null,
        purchases?: number | null,
        revenue?: number | null,
      } | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetTrackableCopyTypesQueryVariables = {
  getTrackableCopyTypesInput: GetTrackableCopyTypesInput,
};

export type GetTrackableCopyTypesQuery = {
  getTrackableCopyTypes?:  {
    __typename: "GetTrackableCopyTypesResponse",
    data?: Array< string | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetTrackableCopyTypesNewQueryVariables = {
  getTrackableCopyTypesInput: BusinessIdInput,
};

export type GetTrackableCopyTypesNewQuery = {
  getTrackableCopyTypesNew?:  {
    __typename: "GetTrackableCopyTypesResponse",
    data?: Array< string | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetTrackableCopyOrdersQueryVariables = {
  getTrackableCopyOrdersInput: GetTrackableCopyOrdersInput,
};

export type GetTrackableCopyOrdersQuery = {
  getTrackableCopyOrders?:  {
    __typename: "GetTrackableCopyOrdersResponse",
    data?:  Array< {
      __typename: "TrackableCopyOrder",
      business_id?: string | null,
      conversion_value?: number | null,
      created?: string | null,
      order_id?: string | null,
      source?: string | null,
      visitor_id?: string | null,
      visitor_name?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetTrackableCopyOrdersNewQueryVariables = {
  getTrackableCopyOrdersInput: GetTrackableCopyOrdersInput,
};

export type GetTrackableCopyOrdersNewQuery = {
  getTrackableCopyOrdersNew?:  {
    __typename: "GetTrackableCopyOrdersResponse",
    data?:  Array< {
      __typename: "TrackableCopyOrder",
      business_id?: string | null,
      conversion_value?: number | null,
      created?: string | null,
      order_id?: string | null,
      source?: string | null,
      visitor_id?: string | null,
      visitor_name?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetSourcesOrdersQueryVariables = {
  getSourcesOrdersInput: GetSourcesOrdersInput,
};

export type GetSourcesOrdersQuery = {
  getSourcesOrders?:  {
    __typename: "GetSourcesOrdersResponse",
    data?:  Array< {
      __typename: "SourceOrder",
      business_id?: string | null,
      conversion_value?: number | null,
      created?: string | null,
      order_id?: string | null,
      source?: string | null,
      visitor_id?: string | null,
      visitor_name?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetPerformanceNotesQueryVariables = {
  getPerformanceNotesInput: GetPerformanceNotesInput,
};

export type GetPerformanceNotesQuery = {
  getPerformanceNotes?:  {
    __typename: "GetPerformanceNotesResponse",
    data?:  {
      __typename: "PerformanceNotesResponseData",
      id?: string | null,
      ad_type?: string | null,
      business_id?: string | null,
      description?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetKeyMetricsMonthlyBudgetQueryVariables = {
  getKeyMetricsMonthlyBudgetInput: GetKeyMetricsMonthlyBudgetInput,
};

export type GetKeyMetricsMonthlyBudgetQuery = {
  getKeyMetricsMonthlyBudget?:  {
    __typename: "GetKeyMetricsMonthlyBudgetResponse",
    data?:  Array< {
      __typename: "MonthlyBudgetResponse",
      business_id?: string | null,
      amount_spent?: number | null,
      source?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetKeyMetricsRoasTrackerQueryVariables = {
  getKeyMetricsRoasTrackerInput: GetKeyMetricsRoasTrackerInput,
};

export type GetKeyMetricsRoasTrackerQuery = {
  getKeyMetricsRoasTracker?:  {
    __typename: "GetKeyMetricsRoasTrackerResponse",
    data?:  {
      __typename: "RoasTrackerResponse",
      campaign?:  {
        __typename: "RoasTrackerResponseDetails",
        over?: number | null,
        under?: number | null,
      } | null,
      adset?:  {
        __typename: "RoasTrackerResponseDetails",
        over?: number | null,
        under?: number | null,
      } | null,
      ad?:  {
        __typename: "RoasTrackerResponseDetails",
        over?: number | null,
        under?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAdcomparisonDataQueryVariables = {
  getBusinessAnalyticsInput: GetBusinessAnalyticsInput,
};

export type GetAdcomparisonDataQuery = {
  getAdcomparisonData?:  {
    __typename: "GetAdcomparisonDataResponse",
    data?:  Array< {
      __typename: "AnalyticsPerformanceData",
      id?: string | null,
      ad_name?: string | null,
      ad_primary_status?: string | null,
      ad_secondary_status?: string | null,
      total_amount_spent?: number | null,
      roas?: number | null,
      total_orders?: number | null,
      total_conversion_value?: number | null,
      ad_images?: Array< string | null > | null,
      source?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetPerformanceNotesNewQueryVariables = {
  getPerformanceNotesInput: GetPerformanceNotesInput,
};

export type GetPerformanceNotesNewQuery = {
  getPerformanceNotesNew?:  {
    __typename: "GetPerformanceNotesResponse",
    data?:  {
      __typename: "PerformanceNotesResponseData",
      id?: string | null,
      ad_type?: string | null,
      business_id?: string | null,
      description?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAllCustomersNewQueryVariables = {
  getAllCustomersInput: GetAllCustomersInput,
};

export type GetAllCustomersNewQuery = {
  getAllCustomersNew?:  {
    __typename: "GetAllCustomersResponse",
    data?:  {
      __typename: "GetAllCustomersObject",
      customers?:  Array< {
        __typename: "AllBusinessCustomers",
        last_visit?: string | null,
        first_visit?: string | null,
        total_purchases?: string | null,
        total_pageviews?: string | null,
        visitor_id?: string | null,
        visitor_name?: string | null,
      } | null > | null,
      totalInfo?:  {
        __typename: "TotalInfoCustomers",
        total_purchases?: number | null,
        totalrecords?: number | null,
        total_visitors?: number | null,
        total_pageviews?: number | null,
        total_clicks?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetCustomerJourneyVisitorGraphNewQueryVariables = {
  getCustomerJourneyVisitorGraphInput: GetCustomerJourneyVisitorGraphInput,
};

export type GetCustomerJourneyVisitorGraphNewQuery = {
  getCustomerJourneyVisitorGraphNew?:  {
    __typename: "GetCustomerJourneyVisitorGraphResponse",
    data?:  Array< {
      __typename: "CustomerJourneyVisitorGraph",
      date?: string | null,
      new_visitors?: string | null,
      returning_visitors?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetDynamicQueryResultsQueryVariables = {
  getDynamicQueryResultInput: GetDynamicQueryResultInput,
};

export type GetDynamicQueryResultsQuery = {
  getDynamicQueryResults?:  {
    __typename: "GetDynamicQueryResultResponse",
    data?:  Array< {
      __typename: "DynamicQueryResult",
      average_conversion_value?: number | null,
      business_id?: string | null,
      city?: string | null,
      country?: string | null,
      customer_id?: string | null,
      customer_name?: string | null,
      email?: string | null,
      email_address?: string | null,
      first_order_date?: string | null,
      id?: string | null,
      insight_date?: string | null,
      ninety_day_order_count?: number | null,
      ninety_day_order_total?: number | null,
      price?: number | null,
      product_id?: string | null,
      quantity?: number | null,
      state?: string | null,
      thirty_day_order_count?: number | null,
      thirty_day_order_total?: number | null,
      title?: string | null,
      zip?: string | null,
      customer_order_id?: string | null,
      deleted_at?: string | null,
      updated_at?: string | null,
      created_at?: string | null,
    } | null > | null,
    total_records?: number | null,
    message?: string | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    nextToken?: string | null,
  } | null,
};

export type GetSegmentBuilderBasicDetailsQueryVariables = {
  getSegmentBuilderBasicDetailsInput: GetSegmentBuilderBasicDetailsInput,
};

export type GetSegmentBuilderBasicDetailsQuery = {
  getSegmentBuilderBasicDetails?:  {
    __typename: "GetSegmentBuilderBasicDetailsResponse",
    data?:  {
      __typename: "GetSegmentBuilderBasicDetails",
      cities: Array< string >,
      states: Array< string >,
      countries: Array< string >,
      dynamicQueryRules?: string | null,
      predefinedQueries?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetAllAudienceSegmentQueriesQueryVariables = {
  getAllAudienceSegmentQueryInput: GetAllAudienceSegmentQueryInput,
};

export type GetAllAudienceSegmentQueriesQuery = {
  getAllAudienceSegmentQueries?:  {
    __typename: "GetAllAudienceSegmentSourcesResponse",
    data?:  Array< {
      __typename: "Segments",
      id: string,
      business_id: string,
      no_of_customers?: number | null,
      added_revenue?: number | null,
      audience?: string | null,
      type: string,
      status: string,
      query_details?: string | null,
      created_at?: string | null,
      updated_at?: string | null,
      group_name: string,
      deleted_at?: string | null,
      dynamic_query_params: string,
    } | null > | null,
    total_records?: number | null,
    message?: string | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    nextToken?: string | null,
  } | null,
};

export type GetAudienceSegmentQueryByIdQueryVariables = {
  getAudienceSegmentInput: GetAudienceSegmentInput,
};

export type GetAudienceSegmentQueryByIdQuery = {
  getAudienceSegmentQueryById?:  {
    __typename: "GetAudienceSegmentResponse",
    data?:  {
      __typename: "Segments",
      id: string,
      business_id: string,
      no_of_customers?: number | null,
      added_revenue?: number | null,
      audience?: string | null,
      type: string,
      status: string,
      query_details?: string | null,
      created_at?: string | null,
      updated_at?: string | null,
      group_name: string,
      deleted_at?: string | null,
      dynamic_query_params: string,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetCustomerJourneySourcesNewQueryVariables = {
  getCustomerJourneySourcesInput: GetCustomerJourneySourcesInput,
};

export type GetCustomerJourneySourcesNewQuery = {
  getCustomerJourneySourcesNew?:  {
    __typename: "GetCustomerJourneySourcesResponse",
    data?:  {
      __typename: "GetCustomerJourneySourcesObject",
      sources?:  Array< {
        __typename: "CustomerJourneySource",
        source?: string | null,
        unique_visitor?: number | null,
        clicks_count?: number | null,
        purchases_count?: number | null,
      } | null > | null,
      totalInfo?:  {
        __typename: "TotalInfoCustomers",
        total_purchases?: number | null,
        totalrecords?: number | null,
        total_visitors?: number | null,
        total_pageviews?: number | null,
        total_clicks?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetVisitorDetailsSourcesNewQueryVariables = {
  getVisitorDetailsSourcesInput: GetVisitorDetailsSourcesInput,
};

export type GetVisitorDetailsSourcesNewQuery = {
  getVisitorDetailsSourcesNew?:  {
    __typename: "GetVisitorDetailsSourcesResponse",
    data?:  Array< {
      __typename: "VisitorDetailsSource",
      sirge_source_name?: string | null,
      url?: string | null,
    } | null > | null,
    total_records?: number | null,
    numberPages?: number | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailsNewQueryVariables = {
  getVisitorDetailsInput: GetVisitorDetailsInput,
};

export type GetVisitorDetailsNewQuery = {
  getVisitorDetailsNew?:  {
    __typename: "GetVisitorDetailsResponse",
    data?:  {
      __typename: "VisitorDetails",
      visitor_email?: string | null,
      country?: string | null,
      state?: string | null,
      city?: string | null,
      total_pageviews?: number | null,
      first_visit?: string | null,
      total_purchases?: number | null,
      total_purchase_conversion_value?: number | null,
      visitor_name?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisitorDetailsPageViewsNewQueryVariables = {
  getVisitorDetailsPageViewsInput: getVisitorDetailsPageViewsInput,
};

export type GetVisitorDetailsPageViewsNewQuery = {
  getVisitorDetailsPageViewsNew?:  {
    __typename: "GetVisitorDetailsPageviewsResponse",
    data?:  Array< {
      __typename: "VisitorDetailsPageView",
      ad?: string | null,
      ad_set?: string | null,
      campaign?: string | null,
      business_id?: string | null,
      conversion_value?: number | null,
      created_day?: string | null,
      created?: string | null,
      pageview_id?: string | null,
      referer?: string | null,
      sirge_source_name?: string | null,
      url?: string | null,
    } | null > | null,
    total_records?: number | null,
    numberPages?: number | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetKeyMetricsAnalyticsStatisticsQueryVariables = {
  getkeyMetricsAnalyticsStatisticsInput: GetKeyMetricsAnalyticsStatisticsInput,
};

export type GetKeyMetricsAnalyticsStatisticsQuery = {
  getKeyMetricsAnalyticsStatistics?:  {
    __typename: "GetKeyMetricsAnalyticsStatisticsResponse",
    data?:  {
      __typename: "KeyMetricsAnalyticsStatistics",
      total_order?:  {
        __typename: "KeyMetricsStatistics",
        amount?: number | null,
        percentage?: number | null,
      } | null,
      total_sales?:  {
        __typename: "KeyMetricsStatistics",
        amount?: number | null,
        percentage?: number | null,
      } | null,
      average_order_value?:  {
        __typename: "KeyMetricsStatistics",
        amount?: number | null,
        percentage?: number | null,
      } | null,
      blended_roas?:  {
        __typename: "BlendedRoasStatistics",
        amount?: number | null,
        percentage?: number | null,
        sources?:  {
          __typename: "RoasBySources",
          facebook?: number | null,
          tiktok?: number | null,
          google?: number | null,
        } | null,
      } | null,
      visitors?:  {
        __typename: "KeyMetricsStatistics",
        amount?: number | null,
        percentage?: number | null,
      } | null,
      conversion_rate?:  {
        __typename: "KeyMetricsStatistics",
        amount?: number | null,
        percentage?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetCustomerChannelsNewQueryVariables = {
  getCustomerChannelsInput: GetCustomerChannelsInput,
};

export type GetCustomerChannelsNewQuery = {
  getCustomerChannelsNew?:  {
    __typename: "GetCustomerChannelsResponse",
    data?:  {
      __typename: "GetCustomerChannelObject",
      channels?:  Array< {
        __typename: "CustomerChannel",
        source?: string | null,
        referer?: string | null,
        unique_visitor?: number | null,
        purchases_count?: number | null,
      } | null > | null,
      totalInfo?:  {
        __typename: "TotalInfo",
        total_clicks?: number | null,
        total_purchases?: number | null,
        totalrecords?: number | null,
        total_visitors?: number | null,
        total_pageviews?: number | null,
      } | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetCustomerChannelsDetailsNewQueryVariables = {
  getCustomerChannelsDetailsInput: GetCustomerChannelsDetailsInput,
};

export type GetCustomerChannelsDetailsNewQuery = {
  getCustomerChannelsDetailsNew?:  {
    __typename: "GetCustomerChannelsDetailsResponse",
    data?:  {
      __typename: "GetCustomerChannelsDetailsResponseData",
      channels?:  Array< {
        __typename: "CustomerChannel",
        source?: string | null,
        referer?: string | null,
        unique_visitor?: number | null,
        purchases_count?: number | null,
      } | null > | null,
      nextCursor?: string | null,
      prevCursor?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
  } | null,
};

export type GetKeyMetricsPerformingProductsQueryVariables = {
  getKeyMetricsPerformingProductsInput: GetKeyMetricsPerformingProductsInput,
};

export type GetKeyMetricsPerformingProductsQuery = {
  getKeyMetricsPerformingProducts?:  {
    __typename: "GetKeyMetricsPerformingProductsResponse",
    data?:  Array< {
      __typename: "PerformingProductsData",
      product_id?: string | null,
      name?: string | null,
      totalPrice?: number | null,
      ordersCount?: number | null,
      percentage?: number | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};

export type GetSourcesOrdersNewQueryVariables = {
  getSourcesOrdersInput: GetSourcesOrdersInput,
};

export type GetSourcesOrdersNewQuery = {
  getSourcesOrdersNew?:  {
    __typename: "GetSourcesOrdersResponse",
    data?:  Array< {
      __typename: "SourceOrder",
      business_id?: string | null,
      conversion_value?: number | null,
      created?: string | null,
      order_id?: string | null,
      source?: string | null,
      visitor_id?: string | null,
      visitor_name?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
    numberPages?: number | null,
  } | null,
};

export type GetSuggestedSegmentsStatsQueryVariables = {
  getSuggestedSegmentsStatsInput: GetSuggestedSegmentsStatsInput,
};

export type GetSuggestedSegmentsStatsQuery = {
  getSuggestedSegmentsStats?:  {
    __typename: "GetSuggestedSegmentsStatsResponse",
    data?:  Array< {
      __typename: "GetSuggestedSegmentsStatsResult",
      no_of_customers?: number | null,
      query_type?: string | null,
    } | null > | null,
    total_records?: number | null,
    message?: string | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    nextToken?: string | null,
  } | null,
};

export type OnDataRefreshedForBusinessSubscriptionVariables = {
  data: string,
};

export type OnDataRefreshedForBusinessSubscription = {
  onDataRefreshedForBusiness?:  {
    __typename: "RefreshDataForResponse",
    data?: string | null,
    error?:  {
      __typename: "ErrorResponse",
      code?: string | null,
      message?: string | null,
    } | null,
    message?: string | null,
    nextToken?: string | null,
  } | null,
};
