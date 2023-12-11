/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const autoScalingSetting = /* GraphQL */ `query AutoScalingSetting {
  autoScalingSetting {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AutoScalingSettingQueryVariables,
  APITypes.AutoScalingSettingQuery
>;
export const autoScalingSettingNew = /* GraphQL */ `query AutoScalingSettingNew {
  autoScalingSettingNew {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AutoScalingSettingNewQueryVariables,
  APITypes.AutoScalingSettingNewQuery
>;
export const endTrial = /* GraphQL */ `query EndTrial {
  endTrial {
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.EndTrialQueryVariables, APITypes.EndTrialQuery>;
export const generateUploadUrl = /* GraphQL */ `query GenerateUploadUrl($generateUploadUrlInput: GenerateUploadUrlInput!) {
  generateUploadUrl(generateUploadUrlInput: $generateUploadUrlInput) {
    data {
      upload_url
      url
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateUploadUrlQueryVariables,
  APITypes.GenerateUploadUrlQuery
>;
export const generateUploadUrlNew = /* GraphQL */ `query GenerateUploadUrlNew($generateUploadUrlInput: GenerateUploadUrlInput!) {
  generateUploadUrlNew(generateUploadUrlInput: $generateUploadUrlInput) {
    data {
      upload_url
      url
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateUploadUrlNewQueryVariables,
  APITypes.GenerateUploadUrlNewQuery
>;
export const getMemberCountByAdGroupIDs = /* GraphQL */ `query GetMemberCountByAdGroupIDs(
  $getMemberCountByAdGroupIDsInput: GetMemberCountByAdGroupIDsInput!
) {
  getMemberCountByAdGroupIDs(
    getMemberCountByAdGroupIDsInput: $getMemberCountByAdGroupIDsInput
  ) {
    data {
      adSetCount
      adsCount
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMemberCountByAdGroupIDsQueryVariables,
  APITypes.GetMemberCountByAdGroupIDsQuery
>;
export const getMemberCountByAdGroupIDsNew = /* GraphQL */ `query GetMemberCountByAdGroupIDsNew(
  $getMemberCountByAdGroupIDsInput: GetMemberCountByAdGroupIDsInputNew!
) {
  getMemberCountByAdGroupIDsNew(
    getMemberCountByAdGroupIDsInput: $getMemberCountByAdGroupIDsInput
  ) {
    data {
      adSetCount
      adsCount
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMemberCountByAdGroupIDsNewQueryVariables,
  APITypes.GetMemberCountByAdGroupIDsNewQuery
>;
export const getAllStaffAccounts = /* GraphQL */ `query GetAllStaffAccounts($getAllStaffAccountsInput: GetAllStaffAccountsInput) {
  getAllStaffAccounts(getAllStaffAccountsInput: $getAllStaffAccountsInput) {
    data {
      default_business_id
      account_state
      affiliate_auth_token
      auto_scaling_setting
      balance
      cancellation_reason
      card_expiry_date
      card_last_four_digits
      card_type
      city
      client_billing_account_id
      country_code
      country_name
      country_phone_prefix
      created_at
      currency
      current_billing_period_end
      current_billing_period_start
      data_deleting_on
      data_retention_period
      email
      end_trial_source
      facebook_accessToken
      facebook_userID
      first_name
      firstpromoter_auth_token
      full_address
      id
      invoices {
        created_at
        customer_id
        id
        invoice_body
        status
        updated_at
        __typename
      }
      last_name
      line1
      manager_id
      marketing_status
      phone_number
      postal_code
      products {
        plan_product_id
        price_id
        product_code
        product_id
        product_name
        __typename
      }
      profile_photo
      state
      status
      stripe_connect_account_id
      subscription {
        created_at
        customer_id
        id
        status
        subscription_body
        updated_at
        trial_end
        trial_start
        trial_left
        promo_code {
          code
          status
          duration
          amount
          type
          __typename
        }
        plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        plan_changed
        plan_code
        current_revenue
        current_billing_period_start
        current_billing_period_end
        __typename
      }
      subscription_status
      tik_tok_access_token
      tik_tok_integration
      timezone
      two_factor_deactivate_business
      two_factor_remove_staff_account
      updated_at
      user_id
      user_plan {
        business_limit
        page_view_limit
        plan_code
        plan_name
        plan_price_id
        plan_product_id
        staff_limit
        __typename
      }
      verification_method
      shopify_store_url
      business_access {
        vanity_name
        __typename
      }
      sessions {
        browser_name
        browser_version
        created_at
        ip
        location
        os_name
        os_version
        user_id
        __typename
      }
      post_hog_user_id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAllStaffAccountsQueryVariables,
  APITypes.GetAllStaffAccountsQuery
>;
export const getAllStaffAccountsNew = /* GraphQL */ `query GetAllStaffAccountsNew(
  $getAllStaffAccountsInput: GetAllStaffAccountsInput
) {
  getAllStaffAccountsNew(getAllStaffAccountsInput: $getAllStaffAccountsInput) {
    data {
      id
      first_name
      last_name
      email
      password
      timezone
      currency
      created_at
      updated_at
      deleted_at
      businesses {
        user_id
        business_id
        business {
          id
          store_id
          name
          status
          logo
          vanity_name
          reminder_status
          show_budget_confirmation
          monthly_budget
          campaign_roas_goal
          adset_roas_goal
          ad_roas_goal
          created_at
          updated_at
          deleted_at
          ad_account_settings {
            id
            business_id
            ad_platform_id
            premium_page_views
            external_platform
            active_campaign_count
            paused_campaign_count
            social_account_id
            social_account_name
            social_account_currency
            social_account_timezone
            access_token
            utm_count
            social_integration
            conversion_api_enabled
            pixel_id
            social_refresh_token
            updateKey
            last_data_refreshed
            created_at
            updated_at
            deleted_at
            ad_platform {
              id
              name
              internal_source_name
              is_sirge_managed
              dark_theme_image_url
              light_theme_image_url
              status
              sqs_refresh_queue_url
              created_at
              updated_at
              deleted_at
              show_budget_confirmation
              __typename
            }
            __typename
          }
          subscriptions {
            id
            business_id
            subscription_plan_code
            status
            processor
            store_subscription_body
            store_subscription_id
            promo_code_id
            trial_start
            trial_end
            trial_left
            current_billing_period_start
            current_billing_period_end
            subscription_end_date
            business_limit
            staff_limit
            subscription_charges {
              id
              business_id
              subscription_id
              store_revenue
              amount_billed
              created_at
              updated_at
              deleted_at
              __typename
            }
            promo_codes {
              id
              code
              type
              status
              duration
              amount
              created_at
              updated_at
              deleted_at
              __typename
            }
            current_revenue
            created_at
            updated_at
            deleted_at
            __typename
          }
          store {
            id
            shop_name
            address1
            address2
            city
            state
            zip
            country
            store_url
            timezone
            currency
            created_at
            updated_at
            deleted_at
            __typename
          }
          completed_onboarding_call
          __typename
        }
        user_type
        is_default_business
        created_at
        updated_at
        deleted_at
        __typename
      }
      profile_photo
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAllStaffAccountsNewQueryVariables,
  APITypes.GetAllStaffAccountsNewQuery
>;
export const getBusinessByBusinessId = /* GraphQL */ `query GetBusinessByBusinessId($getBusinessesInput: GetBusinessesInput!) {
  getBusinessByBusinessId(getBusinessesInput: $getBusinessesInput) {
    data {
      business_id
      business_name
      created_at
      external_platform
      facebook_ad_account_currency
      facebook_ad_account_id
      facebook_ad_account_name
      fb_pixel_id
      logo
      premium_page_views
      shopify_access_token
      shopify_script_tag_id
      shopify_store_url
      status
      tik_tok_access_token
      tik_tok_ad_account_currency
      tik_tok_ad_account_id
      tik_tok_ad_account_name
      tik_tok_ad_account_timezone
      facebook_accessToken
      facebook_userID
      updated_at
      user_id
      vanity_name
      script_installed
      campaign_count {
        active_count
        paused_count
        __typename
      }
      fb_utm_count
      tiktok_utm_count
      shopify_store_domain
      timezone
      roas_goals {
        campaign
        adset
        ad
        __typename
      }
      monthly_budget
      google_ad_account_id
      google_ad_accessToken
      google_ad_account_currency
      last_data_refreshed
      completed_onboarding_call
      reminder_status
      currency
      business_plan {
        business_limit
        page_view_limit
        plan_code
        plan_name
        plan_price_id
        plan_product_id
        staff_limit
        __typename
      }
      subscription {
        created_at
        customer_id
        id
        status
        subscription_body
        updated_at
        trial_end
        trial_start
        trial_left
        promo_code {
          code
          status
          duration
          amount
          type
          __typename
        }
        plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        plan_changed
        plan_code
        current_revenue
        current_billing_period_start
        current_billing_period_end
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessByBusinessIdQueryVariables,
  APITypes.GetBusinessByBusinessIdQuery
>;
export const getBusinessByVanityName = /* GraphQL */ `query GetBusinessByVanityName(
  $getBusinessByVanityNameInput: GetBusinessByVanityNameInput!
) {
  getBusinessByVanityName(
    getBusinessByVanityNameInput: $getBusinessByVanityNameInput
  ) {
    data {
      business_id
      business_name
      created_at
      external_platform
      facebook_ad_account_currency
      facebook_ad_account_id
      facebook_ad_account_name
      fb_pixel_id
      logo
      premium_page_views
      shopify_access_token
      shopify_script_tag_id
      shopify_store_url
      status
      tik_tok_access_token
      tik_tok_ad_account_currency
      tik_tok_ad_account_id
      tik_tok_ad_account_name
      tik_tok_ad_account_timezone
      facebook_accessToken
      facebook_userID
      updated_at
      user_id
      vanity_name
      script_installed
      campaign_count {
        active_count
        paused_count
        __typename
      }
      fb_utm_count
      tiktok_utm_count
      shopify_store_domain
      timezone
      roas_goals {
        campaign
        adset
        ad
        __typename
      }
      monthly_budget
      google_ad_account_id
      google_ad_accessToken
      google_ad_account_currency
      last_data_refreshed
      completed_onboarding_call
      reminder_status
      currency
      business_plan {
        business_limit
        page_view_limit
        plan_code
        plan_name
        plan_price_id
        plan_product_id
        staff_limit
        __typename
      }
      subscription {
        created_at
        customer_id
        id
        status
        subscription_body
        updated_at
        trial_end
        trial_start
        trial_left
        promo_code {
          code
          status
          duration
          amount
          type
          __typename
        }
        plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        plan_changed
        plan_code
        current_revenue
        current_billing_period_start
        current_billing_period_end
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessByVanityNameQueryVariables,
  APITypes.GetBusinessByVanityNameQuery
>;
export const getAdGroupBudgetDetails = /* GraphQL */ `query GetAdGroupBudgetDetails(
  $getAdGroupBudgetDetailsInput: GetAdGroupBudgetDetailsInput!
) {
  getAdGroupBudgetDetails(
    getAdGroupBudgetDetailsInput: $getAdGroupBudgetDetailsInput
  ) {
    data {
      adGroup {
        daily_budget
        lifetime_budget
        name
        source_delivery_status
        source_secondary_status
        shared_budget_name
        __typename
      }
      relatedItems {
        id
        source
        business_id
        purchases_count
        clicks_count
        daily_budget
        lifetime_budget
        shared_budget_name
        campaign_name
        campaign_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_set_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_images
        itemType
        ad_image
        ad_set
        ad_set_name
        ad
        ad_name
        sirge_ad_id
        sirge_adset_id
        sirge_campaign_id
        total_title
        source_delivery_status
        source_secondary_status
        clicks
        purchases
        purchases_source
        roas
        cost_per_purchase
        amount_spent
        average_cpm
        conversion_value
        total_conversion_value
        roas_ltv
        sirge_clicks
        sirge_purchases
        sirge_roas
        sirge_cost_per_purchase
        sirge_total_conversion_value
        created
        updated_at
        ad_type
        utm_status
        are_all_ads_connected
        transform
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAdGroupBudgetDetailsQueryVariables,
  APITypes.GetAdGroupBudgetDetailsQuery
>;
export const getAdGroupBudgetDetailsNew = /* GraphQL */ `query GetAdGroupBudgetDetailsNew(
  $getAdGroupBudgetDetailsInput: GetAdGroupBudgetDetailsInput!
) {
  getAdGroupBudgetDetailsNew(
    getAdGroupBudgetDetailsInput: $getAdGroupBudgetDetailsInput
  ) {
    data {
      adGroup {
        daily_budget
        lifetime_budget
        name
        source_delivery_status
        source_secondary_status
        shared_budget_name
        __typename
      }
      relatedItems {
        id
        source
        business_id
        purchases_count
        clicks_count
        daily_budget
        lifetime_budget
        shared_budget_name
        campaign_name
        campaign_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_set_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_images
        itemType
        ad_image
        ad_set
        ad_set_name
        ad
        ad_name
        sirge_ad_id
        sirge_adset_id
        sirge_campaign_id
        total_title
        source_delivery_status
        source_secondary_status
        clicks
        purchases
        purchases_source
        roas
        cost_per_purchase
        amount_spent
        average_cpm
        conversion_value
        total_conversion_value
        roas_ltv
        sirge_clicks
        sirge_purchases
        sirge_roas
        sirge_cost_per_purchase
        sirge_total_conversion_value
        created
        updated_at
        ad_type
        utm_status
        are_all_ads_connected
        transform
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAdGroupBudgetDetailsNewQueryVariables,
  APITypes.GetAdGroupBudgetDetailsNewQuery
>;
export const getBusinessSourcesById = /* GraphQL */ `query GetBusinessSourcesById(
  $getBusinessSourcesByIdInput: GetBusinessSourcesByIdInput!
) {
  getBusinessSourcesById(
    getBusinessSourcesByIdInput: $getBusinessSourcesByIdInput
  ) {
    data {
      sources {
        source
        unique_visitor
        clicks_count
        purchases_count
        url
        created
        referer
        business_id
        __typename
      }
      totalInfo {
        total_clicks
        total_purchases
        totalrecords
        total_visitors
        total_pageviews
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessSourcesByIdQueryVariables,
  APITypes.GetBusinessSourcesByIdQuery
>;
export const getBusinessSourcesDetailsById = /* GraphQL */ `query GetBusinessSourcesDetailsById(
  $getBusinessSourcesDetailsByIdInput: GetBusinessSourcesDetailsByIdInput!
) {
  getBusinessSourcesDetailsById(
    getBusinessSourcesDetailsByIdInput: $getBusinessSourcesDetailsByIdInput
  ) {
    data {
      source
      unique_visitor
      clicks_count
      purchases_count
      url
      created
      referer
      business_id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessSourcesDetailsByIdQueryVariables,
  APITypes.GetBusinessSourcesDetailsByIdQuery
>;
export const getAllVisitors = /* GraphQL */ `query GetAllVisitors($getAllVisitorsInput: GetAllVisitorsInput!) {
  getAllVisitors(getAllVisitorsInput: $getAllVisitorsInput) {
    data {
      visitors {
        _id
        total_clicks
        total_purchase_value
        last_visit
        first_visit
        total_purchases
        total_pageviews
        visitor_id
        visitor_name
        visitor_email
        __typename
      }
      totalInfo {
        total_clicks
        total_purchases
        totalrecords
        total_visitors
        total_pageviews
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAllVisitorsQueryVariables,
  APITypes.GetAllVisitorsQuery
>;
export const getAllVisitorsGraph = /* GraphQL */ `query GetAllVisitorsGraph(
  $getAllVisitorsGraphInput: getAllVisitorsGraphInput!
) {
  getAllVisitorsGraph(getAllVisitorsGraphInput: $getAllVisitorsGraphInput) {
    data {
      date
      new_visitors
      returning_visitors
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAllVisitorsGraphQueryVariables,
  APITypes.GetAllVisitorsGraphQuery
>;
export const getVisitorDetail = /* GraphQL */ `query GetVisitorDetail($getVisitorDetailInput: getVisitorDetailInput!) {
  getVisitorDetail(getVisitorDetailInput: $getVisitorDetailInput) {
    data {
      visitor_email
      country
      state
      city
      total_pageviews
      first_visit
      total_purchases
      total_purchase_conversion_value
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailQueryVariables,
  APITypes.GetVisitorDetailQuery
>;
export const getVisitorDetailPageview = /* GraphQL */ `query GetVisitorDetailPageview(
  $getVisitorDetailPageViewInput: getVisitorDetailPageViewInput!
) {
  getVisitorDetailPageview(
    getVisitorDetailPageViewInput: $getVisitorDetailPageViewInput
  ) {
    data {
      ad
      ad_set
      business_id
      campaign
      checkout_platform
      conversion_value
      created
      currency
      expiry_date
      id
      ip
      order_id
      purchase_id
      referer
      sirge_ad_id
      sirge_adset_id
      sirge_campaign_id
      sirge_source_name
      source
      tracking_channel
      url
      clicks_count
      purchases_count
      visitor_addresscity
      visitor_addresscountry
      visitor_addressline1
      visitor_addressline2
      visitor_addresspostal_code
      visitor_addressprovince
      visitor_email
      visitor_id
      visitor_name
      visitor_phone
      __typename
    }
    total_records
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailPageviewQueryVariables,
  APITypes.GetVisitorDetailPageviewQuery
>;
export const getVisitorDetailSources = /* GraphQL */ `query GetVisitorDetailSources(
  $getVisitorDetailSourcesInput: getVisitorDetailSourcesInput!
) {
  getVisitorDetailSources(
    getVisitorDetailSourcesInput: $getVisitorDetailSourcesInput
  ) {
    data {
      sirge_source_name
      url
      __typename
    }
    total_records
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailSourcesQueryVariables,
  APITypes.GetVisitorDetailSourcesQuery
>;
export const getBusinessesByUserId = /* GraphQL */ `query GetBusinessesByUserId {
  getBusinessesByUserId {
    data {
      business_active_count
      business_count
      business_list {
        business_id
        business_name
        created_at
        external_platform
        facebook_ad_account_currency
        facebook_ad_account_id
        facebook_ad_account_name
        fb_pixel_id
        logo
        premium_page_views
        shopify_access_token
        shopify_script_tag_id
        shopify_store_url
        status
        tik_tok_access_token
        tik_tok_ad_account_currency
        tik_tok_ad_account_id
        tik_tok_ad_account_name
        tik_tok_ad_account_timezone
        facebook_accessToken
        facebook_userID
        updated_at
        user_id
        vanity_name
        script_installed
        campaign_count {
          active_count
          paused_count
          __typename
        }
        fb_utm_count
        tiktok_utm_count
        shopify_store_domain
        timezone
        roas_goals {
          campaign
          adset
          ad
          __typename
        }
        monthly_budget
        google_ad_account_id
        google_ad_accessToken
        google_ad_account_currency
        last_data_refreshed
        completed_onboarding_call
        reminder_status
        currency
        business_plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        subscription {
          created_at
          customer_id
          id
          status
          subscription_body
          updated_at
          trial_end
          trial_start
          trial_left
          promo_code {
            code
            status
            duration
            amount
            type
            __typename
          }
          plan {
            business_limit
            page_view_limit
            plan_code
            plan_name
            plan_price_id
            plan_product_id
            staff_limit
            __typename
          }
          plan_changed
          plan_code
          current_revenue
          current_billing_period_start
          current_billing_period_end
          __typename
        }
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessesByUserIdQueryVariables,
  APITypes.GetBusinessesByUserIdQuery
>;
export const getBusinessGoogleAccounts = /* GraphQL */ `query GetBusinessGoogleAccounts(
  $getBusinessGoogleAccountsInput: BusinessIdInput!
) {
  getBusinessGoogleAccounts(
    getBusinessGoogleAccountsInput: $getBusinessGoogleAccountsInput
  ) {
    data {
      resourceName
      descriptiveName
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessGoogleAccountsQueryVariables,
  APITypes.GetBusinessGoogleAccountsQuery
>;
export const getBusinessGoogleNewToken = /* GraphQL */ `query GetBusinessGoogleNewToken($getBusinessNewTokenInput: BusinessIdInput!) {
  getBusinessGoogleNewToken(
    getBusinessNewTokenInput: $getBusinessNewTokenInput
  ) {
    data
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessGoogleNewTokenQueryVariables,
  APITypes.GetBusinessGoogleNewTokenQuery
>;
export const getCreditTransactions = /* GraphQL */ `query GetCreditTransactions {
  getCreditTransactions {
    data {
      amount
      created
      ending_balance
      id
      type
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCreditTransactionsQueryVariables,
  APITypes.GetCreditTransactionsQuery
>;
export const getCurrentUserSessions = /* GraphQL */ `query GetCurrentUserSessions(
  $getCurrentUserSessionsInput: GetCurrentUserSessionsInput
) {
  getCurrentUserSessions(
    getCurrentUserSessionsInput: $getCurrentUserSessionsInput
  ) {
    data {
      browser_name
      browser_version
      created_at
      ip
      location
      os_name
      os_version
      user_id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCurrentUserSessionsQueryVariables,
  APITypes.GetCurrentUserSessionsQuery
>;
export const getCurrentUserSessionsNew = /* GraphQL */ `query GetCurrentUserSessionsNew(
  $getCurrentUserSessionsInput: GetCurrentUserSessionsInput
) {
  getCurrentUserSessionsNew(
    getCurrentUserSessionsInput: $getCurrentUserSessionsInput
  ) {
    data {
      browser_name
      browser_version
      created_at
      ip
      location
      os_name
      os_version
      user_id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCurrentUserSessionsNewQueryVariables,
  APITypes.GetCurrentUserSessionsNewQuery
>;
export const getFacebookAdAccounts = /* GraphQL */ `query GetFacebookAdAccounts($getFacebookAdAccountsInput: BusinessIdInput!) {
  getFacebookAdAccounts(
    getFacebookAdAccountsInput: $getFacebookAdAccountsInput
  ) {
    data {
      id
      currency
      name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFacebookAdAccountsQueryVariables,
  APITypes.GetFacebookAdAccountsQuery
>;
export const getSocialAdAccounts = /* GraphQL */ `query GetSocialAdAccounts($getSocialAdAccountsInput: BusinessIdWithPlatform!) {
  getSocialAdAccounts(getSocialAdAccountsInput: $getSocialAdAccountsInput) {
    data {
      id
      currency
      name
      timezone
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSocialAdAccountsQueryVariables,
  APITypes.GetSocialAdAccountsQuery
>;
export const getInvoices = /* GraphQL */ `query GetInvoices {
  getInvoices {
    data {
      created
      invoice_id
      invoice_number
      invoice_pdf
      status
      total
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetInvoicesQueryVariables,
  APITypes.GetInvoicesQuery
>;
export const getPlatformMode = /* GraphQL */ `query GetPlatformMode {
  getPlatformMode {
    data {
      closed_mode
      free_trial_page_view_limit
      maintenance_mode
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlatformModeQueryVariables,
  APITypes.GetPlatformModeQuery
>;
export const getPlatformModeNew = /* GraphQL */ `query GetPlatformModeNew {
  getPlatformModeNew {
    data {
      closed_mode
      free_trial_page_view_limit
      maintenance_mode
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlatformModeNewQueryVariables,
  APITypes.GetPlatformModeNewQuery
>;
export const getPurchaseByPageViewId = /* GraphQL */ `query GetPurchaseByPageViewId($getPageViewInput: GetPageViewInput!) {
  getPurchaseByPageViewId(getPageViewInput: $getPageViewInput) {
    data {
      purchase {
        first_touch_ad
        first_touch_ad_set
        first_touch_campaign
        last_touch_ad
        last_touch_ad_set
        last_touch_campaign
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPurchaseByPageViewIdQueryVariables,
  APITypes.GetPurchaseByPageViewIdQuery
>;
export const getStaffById = /* GraphQL */ `query GetStaffById($getStaffByIdInput: GetStaffByIdInput!) {
  getStaffById(getStaffByIdInput: $getStaffByIdInput) {
    data {
      default_business_id
      account_state
      affiliate_auth_token
      auto_scaling_setting
      balance
      cancellation_reason
      card_expiry_date
      card_last_four_digits
      card_type
      city
      client_billing_account_id
      country_code
      country_name
      country_phone_prefix
      created_at
      currency
      current_billing_period_end
      current_billing_period_start
      data_deleting_on
      data_retention_period
      email
      end_trial_source
      facebook_accessToken
      facebook_userID
      first_name
      firstpromoter_auth_token
      full_address
      id
      invoices {
        created_at
        customer_id
        id
        invoice_body
        status
        updated_at
        __typename
      }
      last_name
      line1
      manager_id
      marketing_status
      phone_number
      postal_code
      products {
        plan_product_id
        price_id
        product_code
        product_id
        product_name
        __typename
      }
      profile_photo
      state
      status
      stripe_connect_account_id
      subscription {
        created_at
        customer_id
        id
        status
        subscription_body
        updated_at
        trial_end
        trial_start
        trial_left
        promo_code {
          code
          status
          duration
          amount
          type
          __typename
        }
        plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        plan_changed
        plan_code
        current_revenue
        current_billing_period_start
        current_billing_period_end
        __typename
      }
      subscription_status
      tik_tok_access_token
      tik_tok_integration
      timezone
      two_factor_deactivate_business
      two_factor_remove_staff_account
      updated_at
      user_id
      user_plan {
        business_limit
        page_view_limit
        plan_code
        plan_name
        plan_price_id
        plan_product_id
        staff_limit
        __typename
      }
      verification_method
      shopify_store_url
      business_access {
        vanity_name
        __typename
      }
      sessions {
        browser_name
        browser_version
        created_at
        ip
        location
        os_name
        os_version
        user_id
        __typename
      }
      post_hog_user_id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetStaffByIdQueryVariables,
  APITypes.GetStaffByIdQuery
>;
export const getStaffByIdNew = /* GraphQL */ `query GetStaffByIdNew($getStaffByIdInput: GetStaffByIdInput!) {
  getStaffByIdNew(getStaffByIdInput: $getStaffByIdInput) {
    data {
      id
      first_name
      last_name
      email
      password
      timezone
      currency
      created_at
      updated_at
      deleted_at
      businesses {
        user_id
        business_id
        business {
          id
          store_id
          name
          status
          logo
          vanity_name
          reminder_status
          show_budget_confirmation
          monthly_budget
          campaign_roas_goal
          adset_roas_goal
          ad_roas_goal
          created_at
          updated_at
          deleted_at
          ad_account_settings {
            id
            business_id
            ad_platform_id
            premium_page_views
            external_platform
            active_campaign_count
            paused_campaign_count
            social_account_id
            social_account_name
            social_account_currency
            social_account_timezone
            access_token
            utm_count
            social_integration
            conversion_api_enabled
            pixel_id
            social_refresh_token
            updateKey
            last_data_refreshed
            created_at
            updated_at
            deleted_at
            ad_platform {
              id
              name
              internal_source_name
              is_sirge_managed
              dark_theme_image_url
              light_theme_image_url
              status
              sqs_refresh_queue_url
              created_at
              updated_at
              deleted_at
              show_budget_confirmation
              __typename
            }
            __typename
          }
          subscriptions {
            id
            business_id
            subscription_plan_code
            status
            processor
            store_subscription_body
            store_subscription_id
            promo_code_id
            trial_start
            trial_end
            trial_left
            current_billing_period_start
            current_billing_period_end
            subscription_end_date
            business_limit
            staff_limit
            subscription_charges {
              id
              business_id
              subscription_id
              store_revenue
              amount_billed
              created_at
              updated_at
              deleted_at
              __typename
            }
            promo_codes {
              id
              code
              type
              status
              duration
              amount
              created_at
              updated_at
              deleted_at
              __typename
            }
            current_revenue
            created_at
            updated_at
            deleted_at
            __typename
          }
          store {
            id
            shop_name
            address1
            address2
            city
            state
            zip
            country
            store_url
            timezone
            currency
            created_at
            updated_at
            deleted_at
            __typename
          }
          completed_onboarding_call
          __typename
        }
        user_type
        is_default_business
        created_at
        updated_at
        deleted_at
        __typename
      }
      profile_photo
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetStaffByIdNewQueryVariables,
  APITypes.GetStaffByIdNewQuery
>;
export const getSubscription = /* GraphQL */ `query GetSubscription($getSubscriptionInput: GetSubscriptionInput) {
  getSubscription(getSubscriptionInput: $getSubscriptionInput) {
    data {
      billing_cycle_anchor
      current_billing_period_end
      current_billing_period_start
      plan {
        billing_scheme
        details {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        price_id
        quantity
        unit_amount
        __typename
      }
      status
      subscription_id
      trial_end
      trial_start
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSubscriptionQueryVariables,
  APITypes.GetSubscriptionQuery
>;
export const getUsage = /* GraphQL */ `query GetUsage {
  getUsage {
    data {
      total_usage
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUsageQueryVariables, APITypes.GetUsageQuery>;
export const getUser = /* GraphQL */ `query GetUser($getUserInput: GetUserInput) {
  getUser(getUserInput: $getUserInput) {
    data {
      default_business_id
      account_state
      affiliate_auth_token
      auto_scaling_setting
      balance
      cancellation_reason
      card_expiry_date
      card_last_four_digits
      card_type
      city
      client_billing_account_id
      country_code
      country_name
      country_phone_prefix
      created_at
      currency
      current_billing_period_end
      current_billing_period_start
      data_deleting_on
      data_retention_period
      email
      end_trial_source
      facebook_accessToken
      facebook_userID
      first_name
      firstpromoter_auth_token
      full_address
      id
      invoices {
        created_at
        customer_id
        id
        invoice_body
        status
        updated_at
        __typename
      }
      last_name
      line1
      manager_id
      marketing_status
      phone_number
      postal_code
      products {
        plan_product_id
        price_id
        product_code
        product_id
        product_name
        __typename
      }
      profile_photo
      state
      status
      stripe_connect_account_id
      subscription {
        created_at
        customer_id
        id
        status
        subscription_body
        updated_at
        trial_end
        trial_start
        trial_left
        promo_code {
          code
          status
          duration
          amount
          type
          __typename
        }
        plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        plan_changed
        plan_code
        current_revenue
        current_billing_period_start
        current_billing_period_end
        __typename
      }
      subscription_status
      tik_tok_access_token
      tik_tok_integration
      timezone
      two_factor_deactivate_business
      two_factor_remove_staff_account
      updated_at
      user_id
      user_plan {
        business_limit
        page_view_limit
        plan_code
        plan_name
        plan_price_id
        plan_product_id
        staff_limit
        __typename
      }
      verification_method
      shopify_store_url
      business_access {
        vanity_name
        __typename
      }
      sessions {
        browser_name
        browser_version
        created_at
        ip
        location
        os_name
        os_version
        user_id
        __typename
      }
      post_hog_user_id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const getUserNew = /* GraphQL */ `query GetUserNew($getUserInput: GetUserInput) {
  getUserNew(getUserInput: $getUserInput) {
    data {
      id
      first_name
      last_name
      email
      password
      timezone
      currency
      created_at
      updated_at
      deleted_at
      businesses {
        user_id
        business_id
        business {
          id
          store_id
          name
          status
          logo
          vanity_name
          reminder_status
          show_budget_confirmation
          monthly_budget
          campaign_roas_goal
          adset_roas_goal
          ad_roas_goal
          created_at
          updated_at
          deleted_at
          ad_account_settings {
            id
            business_id
            ad_platform_id
            premium_page_views
            external_platform
            active_campaign_count
            paused_campaign_count
            social_account_id
            social_account_name
            social_account_currency
            social_account_timezone
            access_token
            utm_count
            social_integration
            conversion_api_enabled
            pixel_id
            social_refresh_token
            updateKey
            last_data_refreshed
            created_at
            updated_at
            deleted_at
            ad_platform {
              id
              name
              internal_source_name
              is_sirge_managed
              dark_theme_image_url
              light_theme_image_url
              status
              sqs_refresh_queue_url
              created_at
              updated_at
              deleted_at
              show_budget_confirmation
              __typename
            }
            __typename
          }
          subscriptions {
            id
            business_id
            subscription_plan_code
            status
            processor
            store_subscription_body
            store_subscription_id
            promo_code_id
            trial_start
            trial_end
            trial_left
            current_billing_period_start
            current_billing_period_end
            subscription_end_date
            business_limit
            staff_limit
            subscription_charges {
              id
              business_id
              subscription_id
              store_revenue
              amount_billed
              created_at
              updated_at
              deleted_at
              __typename
            }
            promo_codes {
              id
              code
              type
              status
              duration
              amount
              created_at
              updated_at
              deleted_at
              __typename
            }
            current_revenue
            created_at
            updated_at
            deleted_at
            __typename
          }
          store {
            id
            shop_name
            address1
            address2
            city
            state
            zip
            country
            store_url
            timezone
            currency
            created_at
            updated_at
            deleted_at
            __typename
          }
          completed_onboarding_call
          __typename
        }
        user_type
        is_default_business
        created_at
        updated_at
        deleted_at
        __typename
      }
      profile_photo
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserNewQueryVariables,
  APITypes.GetUserNewQuery
>;
export const getPerformanceDetails = /* GraphQL */ `query GetPerformanceDetails(
  $getPerformanceDetailsInput: GetPerformanceDetailsInput
) {
  getPerformanceDetails(
    getPerformanceDetailsInput: $getPerformanceDetailsInput
  ) {
    data {
      performance {
        id
        source
        business_id
        purchases_count
        clicks_count
        daily_budget
        lifetime_budget
        shared_budget_name
        campaign_name
        campaign_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_set_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_images
        itemType
        ad_image
        ad_set
        ad_set_name
        ad
        ad_name
        sirge_ad_id
        sirge_adset_id
        sirge_campaign_id
        total_title
        source_delivery_status
        source_secondary_status
        clicks
        purchases
        purchases_source
        roas
        cost_per_purchase
        amount_spent
        average_cpm
        conversion_value
        total_conversion_value
        roas_ltv
        sirge_clicks
        sirge_purchases
        sirge_roas
        sirge_cost_per_purchase
        sirge_total_conversion_value
        created
        updated_at
        ad_type
        utm_status
        are_all_ads_connected
        transform
        __typename
      }
      summary {
        amount_spent
        clicks
        purchases
        purchases_source
        cost_per_purchase
        total_conversion_value
        roas
        ft_clicks
        ft_purchases
        ft_cost_per_purchase
        ft_total_conversion_value
        ft_roas_ltv
        ft_roas
        ft_average_cpm
        number_of_records
        __typename
      }
      isRoasGoalsSet
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceDetailsQueryVariables,
  APITypes.GetPerformanceDetailsQuery
>;
export const getPerformanceDetailsNew = /* GraphQL */ `query GetPerformanceDetailsNew(
  $getPerformanceDetailsInput: GetPerformanceDetailsInput
) {
  getPerformanceDetailsNew(
    getPerformanceDetailsInput: $getPerformanceDetailsInput
  ) {
    data {
      performance {
        id
        source
        business_id
        purchases_count
        clicks_count
        daily_budget
        lifetime_budget
        shared_budget_name
        campaign_name
        campaign_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_set_budget {
          daily_budget
          lifetime_budget
          name
          source_delivery_status
          source_secondary_status
          shared_budget_name
          __typename
        }
        ad_images
        itemType
        ad_image
        ad_set
        ad_set_name
        ad
        ad_name
        sirge_ad_id
        sirge_adset_id
        sirge_campaign_id
        total_title
        source_delivery_status
        source_secondary_status
        clicks
        purchases
        purchases_source
        roas
        cost_per_purchase
        amount_spent
        average_cpm
        conversion_value
        total_conversion_value
        roas_ltv
        sirge_clicks
        sirge_purchases
        sirge_roas
        sirge_cost_per_purchase
        sirge_total_conversion_value
        created
        updated_at
        ad_type
        utm_status
        are_all_ads_connected
        transform
        __typename
      }
      summary {
        amount_spent
        clicks
        purchases
        purchases_source
        cost_per_purchase
        total_conversion_value
        roas
        ft_clicks
        ft_purchases
        ft_cost_per_purchase
        ft_total_conversion_value
        ft_roas_ltv
        ft_roas
        ft_average_cpm
        number_of_records
        __typename
      }
      isRoasGoalsSet
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceDetailsNewQueryVariables,
  APITypes.GetPerformanceDetailsNewQuery
>;
export const getBusinessConnections = /* GraphQL */ `query GetBusinessConnections(
  $getBusinessConnectionsInput: GetBusinessConnectionsInput!
) {
  getBusinessConnections(
    getBusinessConnectionsInput: $getBusinessConnectionsInput
  ) {
    data {
      facebook_ad_account_id
      facebook_ad_account_name
      script_installed
      shopify_store
      tik_tok_ad_account_id
      tik_tok_ad_account_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessConnectionsQueryVariables,
  APITypes.GetBusinessConnectionsQuery
>;
export const getBusinessAnalytics = /* GraphQL */ `query GetBusinessAnalytics(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getBusinessAnalytics(getBusinessAnalyticsInput: $getBusinessAnalyticsInput) {
    data {
      id
      business_id
      analytic_id
      performance {
        source
        amount_spent {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        total_sales {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        average_order_value {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        total_conversion_value {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        conversion_rate {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        cost_per_purchase {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        blended_roas {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        roas {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        visits {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        purchases {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        ad_clicks {
          all_amounts {
            amount
            date
            __typename
          }
          daily_amount
          weekly_amount
          monthly_amount
          daily_percentage
          weekly_percentage
          monthly_percentage
          __typename
        }
        __typename
      }
      performing_product {
        daily {
          product_id
          name
          totalPrice
          ordersCount
          percentage
          __typename
        }
        weekly {
          product_id
          name
          totalPrice
          ordersCount
          percentage
          __typename
        }
        monthly {
          product_id
          name
          totalPrice
          ordersCount
          percentage
          __typename
        }
        __typename
      }
      best_performing {
        campaigns {
          daily {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          weekly {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          monthly {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          __typename
        }
        adsets {
          daily {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          weekly {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          monthly {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          __typename
        }
        ads {
          daily {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          weekly {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          monthly {
            name
            source
            source_view
            status
            total_amount_spent
            total_conversion_value
            roas
            purchases
            ad_images
            impact
            __typename
          }
          __typename
        }
        __typename
      }
      monthly_budget {
        total
        facebook
        tiktok
        amount_left
        __typename
      }
      roas_goals {
        campaigns {
          goal
          value {
            source
            daily {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            weekly {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            monthly {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        adsets {
          goal
          value {
            source
            daily {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            weekly {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            monthly {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ads {
          goal
          value {
            source
            daily {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            weekly {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            monthly {
              over {
                percentage
                amount
                __typename
              }
              under {
                percentage
                amount
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      record_date
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessAnalyticsQueryVariables,
  APITypes.GetBusinessAnalyticsQuery
>;
export const getBusinessAnalyticsTopPerformingProducts = /* GraphQL */ `query GetBusinessAnalyticsTopPerformingProducts(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getBusinessAnalyticsTopPerformingProducts(
    getBusinessAnalyticsInput: $getBusinessAnalyticsInput
  ) {
    data {
      business_id
      created_day
      daily {
        product_id
        name
        totalPrice
        ordersCount
        percentage
        __typename
      }
      weekly {
        product_id
        name
        totalPrice
        ordersCount
        percentage
        __typename
      }
      monthly {
        product_id
        name
        totalPrice
        ordersCount
        percentage
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessAnalyticsTopPerformingProductsQueryVariables,
  APITypes.GetBusinessAnalyticsTopPerformingProductsQuery
>;
export const getPurchasesByBusiness = /* GraphQL */ `query GetPurchasesByBusiness(
  $getPurchaseByBusinessInput: GetPurchaseByBusinessInput!
) {
  getPurchasesByBusiness(
    getPurchaseByBusinessInput: $getPurchaseByBusinessInput
  ) {
    data {
      ad
      ad_set
      business_id
      campaign
      checkout_platform
      conversion_value
      created
      currency
      expiry_date
      id
      ip
      order_id
      purchase_id
      referer
      sirge_ad_id
      sirge_adset_id
      sirge_campaign_id
      sirge_source_name
      source
      tracking_channel
      url
      clicks_count
      purchases_count
      visitor_addresscity
      visitor_addresscountry
      visitor_addressline1
      visitor_addressline2
      visitor_addresspostal_code
      visitor_addressprovince
      visitor_email
      visitor_id
      visitor_name
      visitor_phone
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPurchasesByBusinessQueryVariables,
  APITypes.GetPurchasesByBusinessQuery
>;
export const getPurchasesByBusinessNew = /* GraphQL */ `query GetPurchasesByBusinessNew(
  $getPurchaseByBusinessInput: GetPurchaseByBusinessInput!
) {
  getPurchasesByBusinessNew(
    getPurchaseByBusinessInput: $getPurchaseByBusinessInput
  ) {
    data {
      visitor_name
      visitor_id
      created
      purchases_count
      conversion_value
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPurchasesByBusinessNewQueryVariables,
  APITypes.GetPurchasesByBusinessNewQuery
>;
export const getUserTiktokAds = /* GraphQL */ `query GetUserTiktokAds($getUserTiktokAdsInput: GetUserTiktokAdsInput!) {
  getUserTiktokAds(getUserTiktokAdsInput: $getUserTiktokAdsInput) {
    data {
      advertiser_id
      advertiser_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserTiktokAdsQueryVariables,
  APITypes.GetUserTiktokAdsQuery
>;
export const getCurrentUserBusinessDetails = /* GraphQL */ `query GetCurrentUserBusinessDetails(
  $getCurrentUserBusinessDetailsInput: GetCurrentUserBusinessDetailsInput!
) {
  getCurrentUserBusinessDetails(
    getCurrentUserBusinessDetailsInput: $getCurrentUserBusinessDetailsInput
  ) {
    data {
      business {
        business_id
        business_name
        created_at
        external_platform
        facebook_ad_account_currency
        facebook_ad_account_id
        facebook_ad_account_name
        fb_pixel_id
        logo
        premium_page_views
        shopify_access_token
        shopify_script_tag_id
        shopify_store_url
        status
        tik_tok_access_token
        tik_tok_ad_account_currency
        tik_tok_ad_account_id
        tik_tok_ad_account_name
        tik_tok_ad_account_timezone
        facebook_accessToken
        facebook_userID
        updated_at
        user_id
        vanity_name
        script_installed
        campaign_count {
          active_count
          paused_count
          __typename
        }
        fb_utm_count
        tiktok_utm_count
        shopify_store_domain
        timezone
        roas_goals {
          campaign
          adset
          ad
          __typename
        }
        monthly_budget
        google_ad_account_id
        google_ad_accessToken
        google_ad_account_currency
        last_data_refreshed
        completed_onboarding_call
        reminder_status
        currency
        business_plan {
          business_limit
          page_view_limit
          plan_code
          plan_name
          plan_price_id
          plan_product_id
          staff_limit
          __typename
        }
        subscription {
          created_at
          customer_id
          id
          status
          subscription_body
          updated_at
          trial_end
          trial_start
          trial_left
          promo_code {
            code
            status
            duration
            amount
            type
            __typename
          }
          plan {
            business_limit
            page_view_limit
            plan_code
            plan_name
            plan_price_id
            plan_product_id
            staff_limit
            __typename
          }
          plan_changed
          plan_code
          current_revenue
          current_billing_period_start
          current_billing_period_end
          __typename
        }
        __typename
      }
      businesses {
        business_active_count
        business_count
        business_list {
          business_id
          business_name
          created_at
          external_platform
          facebook_ad_account_currency
          facebook_ad_account_id
          facebook_ad_account_name
          fb_pixel_id
          logo
          premium_page_views
          shopify_access_token
          shopify_script_tag_id
          shopify_store_url
          status
          tik_tok_access_token
          tik_tok_ad_account_currency
          tik_tok_ad_account_id
          tik_tok_ad_account_name
          tik_tok_ad_account_timezone
          facebook_accessToken
          facebook_userID
          updated_at
          user_id
          vanity_name
          script_installed
          campaign_count {
            active_count
            paused_count
            __typename
          }
          fb_utm_count
          tiktok_utm_count
          shopify_store_domain
          timezone
          roas_goals {
            campaign
            adset
            ad
            __typename
          }
          monthly_budget
          google_ad_account_id
          google_ad_accessToken
          google_ad_account_currency
          last_data_refreshed
          completed_onboarding_call
          reminder_status
          currency
          business_plan {
            business_limit
            page_view_limit
            plan_code
            plan_name
            plan_price_id
            plan_product_id
            staff_limit
            __typename
          }
          subscription {
            created_at
            customer_id
            id
            status
            subscription_body
            updated_at
            trial_end
            trial_start
            trial_left
            promo_code {
              code
              status
              duration
              amount
              type
              __typename
            }
            plan {
              business_limit
              page_view_limit
              plan_code
              plan_name
              plan_price_id
              plan_product_id
              staff_limit
              __typename
            }
            plan_changed
            plan_code
            current_revenue
            current_billing_period_start
            current_billing_period_end
            __typename
          }
          __typename
        }
        __typename
      }
      status {
        active
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCurrentUserBusinessDetailsQueryVariables,
  APITypes.GetCurrentUserBusinessDetailsQuery
>;
export const getCurrentUserBusinessDetailsNew = /* GraphQL */ `query GetCurrentUserBusinessDetailsNew(
  $getCurrentUserBusinessDetailsInput: GetCurrentUserBusinessDetailsInput!
) {
  getCurrentUserBusinessDetailsNew(
    getCurrentUserBusinessDetailsInput: $getCurrentUserBusinessDetailsInput
  ) {
    data {
      business {
        id
        store_id
        name
        status
        logo
        vanity_name
        reminder_status
        show_budget_confirmation
        monthly_budget
        campaign_roas_goal
        adset_roas_goal
        ad_roas_goal
        created_at
        updated_at
        deleted_at
        ad_account_settings {
          id
          business_id
          ad_platform_id
          premium_page_views
          external_platform
          active_campaign_count
          paused_campaign_count
          social_account_id
          social_account_name
          social_account_currency
          social_account_timezone
          access_token
          utm_count
          social_integration
          conversion_api_enabled
          pixel_id
          social_refresh_token
          updateKey
          last_data_refreshed
          created_at
          updated_at
          deleted_at
          ad_platform {
            id
            name
            internal_source_name
            is_sirge_managed
            dark_theme_image_url
            light_theme_image_url
            status
            sqs_refresh_queue_url
            created_at
            updated_at
            deleted_at
            show_budget_confirmation
            __typename
          }
          __typename
        }
        subscriptions {
          id
          business_id
          subscription_plan_code
          status
          processor
          store_subscription_body
          store_subscription_id
          promo_code_id
          trial_start
          trial_end
          trial_left
          current_billing_period_start
          current_billing_period_end
          subscription_end_date
          business_limit
          staff_limit
          subscription_charges {
            id
            business_id
            subscription_id
            store_revenue
            amount_billed
            created_at
            updated_at
            deleted_at
            __typename
          }
          promo_codes {
            id
            code
            type
            status
            duration
            amount
            created_at
            updated_at
            deleted_at
            __typename
          }
          current_revenue
          created_at
          updated_at
          deleted_at
          __typename
        }
        store {
          id
          shop_name
          address1
          address2
          city
          state
          zip
          country
          store_url
          timezone
          currency
          created_at
          updated_at
          deleted_at
          __typename
        }
        completed_onboarding_call
        __typename
      }
      businesses {
        business_active_count
        business_count
        business_list {
          user_id
          business_id
          business {
            id
            store_id
            name
            status
            logo
            vanity_name
            reminder_status
            show_budget_confirmation
            monthly_budget
            campaign_roas_goal
            adset_roas_goal
            ad_roas_goal
            created_at
            updated_at
            deleted_at
            ad_account_settings {
              id
              business_id
              ad_platform_id
              premium_page_views
              external_platform
              active_campaign_count
              paused_campaign_count
              social_account_id
              social_account_name
              social_account_currency
              social_account_timezone
              access_token
              utm_count
              social_integration
              conversion_api_enabled
              pixel_id
              social_refresh_token
              updateKey
              last_data_refreshed
              created_at
              updated_at
              deleted_at
              ad_platform {
                id
                name
                internal_source_name
                is_sirge_managed
                dark_theme_image_url
                light_theme_image_url
                status
                sqs_refresh_queue_url
                created_at
                updated_at
                deleted_at
                show_budget_confirmation
                __typename
              }
              __typename
            }
            subscriptions {
              id
              business_id
              subscription_plan_code
              status
              processor
              store_subscription_body
              store_subscription_id
              promo_code_id
              trial_start
              trial_end
              trial_left
              current_billing_period_start
              current_billing_period_end
              subscription_end_date
              business_limit
              staff_limit
              subscription_charges {
                id
                business_id
                subscription_id
                store_revenue
                amount_billed
                created_at
                updated_at
                deleted_at
                __typename
              }
              promo_codes {
                id
                code
                type
                status
                duration
                amount
                created_at
                updated_at
                deleted_at
                __typename
              }
              current_revenue
              created_at
              updated_at
              deleted_at
              __typename
            }
            store {
              id
              shop_name
              address1
              address2
              city
              state
              zip
              country
              store_url
              timezone
              currency
              created_at
              updated_at
              deleted_at
              __typename
            }
            completed_onboarding_call
            __typename
          }
          user_type
          is_default_business
          created_at
          updated_at
          deleted_at
          __typename
        }
        __typename
      }
      status {
        active
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCurrentUserBusinessDetailsNewQueryVariables,
  APITypes.GetCurrentUserBusinessDetailsNewQuery
>;
export const getShopifyExtensionStatus = /* GraphQL */ `query GetShopifyExtensionStatus(
  $getShopifyExtensionStatusInput: GetShopifyExtensionStatusInput
) {
  getShopifyExtensionStatus(
    getShopifyExtensionStatusInput: $getShopifyExtensionStatusInput
  ) {
    data
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetShopifyExtensionStatusQueryVariables,
  APITypes.GetShopifyExtensionStatusQuery
>;
export const getUserFacebookAccount = /* GraphQL */ `query GetUserFacebookAccount(
  $getUserFacebookAccountInput: GetUserFacebookAccountInput!
) {
  getUserFacebookAccount(
    getUserFacebookAccountInput: $getUserFacebookAccountInput
  ) {
    data {
      id
      name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserFacebookAccountQueryVariables,
  APITypes.GetUserFacebookAccountQuery
>;
export const getDiscountCodeStatus = /* GraphQL */ `query GetDiscountCodeStatus(
  $getDiscountCodeStatusInput: GetDiscountCodeStatusInput!
) {
  getDiscountCodeStatus(
    getDiscountCodeStatusInput: $getDiscountCodeStatusInput
  ) {
    data {
      code
      status
      duration
      amount
      type
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDiscountCodeStatusQueryVariables,
  APITypes.GetDiscountCodeStatusQuery
>;
export const getDiscountCodeStatusNew = /* GraphQL */ `query GetDiscountCodeStatusNew(
  $getDiscountCodeStatusInput: GetDiscountCodeStatusInput!
) {
  getDiscountCodeStatusNew(
    getDiscountCodeStatusInput: $getDiscountCodeStatusInput
  ) {
    data {
      id
      code
      type
      status
      duration
      amount
      created_at
      updated_at
      deleted_at
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDiscountCodeStatusNewQueryVariables,
  APITypes.GetDiscountCodeStatusNewQuery
>;
export const getBusinessAdcomparisonData = /* GraphQL */ `query GetBusinessAdcomparisonData(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getBusinessAdcomparisonData(
    getBusinessAnalyticsInput: $getBusinessAnalyticsInput
  ) {
    data {
      name
      source
      status
      total_amount_spent
      roas
      purchases
      ad_images
      sirge_ad_id
      sirge_adset_id
      sirge_campaign_id
      impact
      total_conversion_value
      id
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessAdcomparisonDataQueryVariables,
  APITypes.GetBusinessAdcomparisonDataQuery
>;
export const getBusinessAnalyticsStatistics = /* GraphQL */ `query GetBusinessAnalyticsStatistics(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getBusinessAnalyticsStatistics(
    getBusinessAnalyticsInput: $getBusinessAnalyticsInput
  ) {
    data {
      business_id
      all {
        purchases {
          amount
          percentage
          __typename
        }
        total_sales {
          amount
          percentage
          __typename
        }
        average_order_value {
          amount
          percentage
          __typename
        }
        blended_roas {
          amount
          percentage
          __typename
        }
        visitors {
          amount
          percentage
          __typename
        }
        conversion_rate {
          amount
          percentage
          __typename
        }
        amount_spent {
          amount
          percentage
          __typename
        }
        total_conversion_value {
          amount
          percentage
          __typename
        }
        cost_per_purchase {
          amount
          percentage
          __typename
        }
        roas {
          amount
          percentage
          __typename
        }
        ad_clicks {
          amount
          percentage
          __typename
        }
        __typename
      }
      facebook {
        purchases {
          amount
          percentage
          __typename
        }
        total_sales {
          amount
          percentage
          __typename
        }
        average_order_value {
          amount
          percentage
          __typename
        }
        blended_roas {
          amount
          percentage
          __typename
        }
        visitors {
          amount
          percentage
          __typename
        }
        conversion_rate {
          amount
          percentage
          __typename
        }
        amount_spent {
          amount
          percentage
          __typename
        }
        total_conversion_value {
          amount
          percentage
          __typename
        }
        cost_per_purchase {
          amount
          percentage
          __typename
        }
        roas {
          amount
          percentage
          __typename
        }
        ad_clicks {
          amount
          percentage
          __typename
        }
        __typename
      }
      tiktok {
        purchases {
          amount
          percentage
          __typename
        }
        total_sales {
          amount
          percentage
          __typename
        }
        average_order_value {
          amount
          percentage
          __typename
        }
        blended_roas {
          amount
          percentage
          __typename
        }
        visitors {
          amount
          percentage
          __typename
        }
        conversion_rate {
          amount
          percentage
          __typename
        }
        amount_spent {
          amount
          percentage
          __typename
        }
        total_conversion_value {
          amount
          percentage
          __typename
        }
        cost_per_purchase {
          amount
          percentage
          __typename
        }
        roas {
          amount
          percentage
          __typename
        }
        ad_clicks {
          amount
          percentage
          __typename
        }
        __typename
      }
      google {
        purchases {
          amount
          percentage
          __typename
        }
        total_sales {
          amount
          percentage
          __typename
        }
        average_order_value {
          amount
          percentage
          __typename
        }
        blended_roas {
          amount
          percentage
          __typename
        }
        visitors {
          amount
          percentage
          __typename
        }
        conversion_rate {
          amount
          percentage
          __typename
        }
        amount_spent {
          amount
          percentage
          __typename
        }
        total_conversion_value {
          amount
          percentage
          __typename
        }
        cost_per_purchase {
          amount
          percentage
          __typename
        }
        roas {
          amount
          percentage
          __typename
        }
        ad_clicks {
          amount
          percentage
          __typename
        }
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessAnalyticsStatisticsQueryVariables,
  APITypes.GetBusinessAnalyticsStatisticsQuery
>;
export const getStatisticsGraph = /* GraphQL */ `query GetStatisticsGraph(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getStatisticsGraph(getBusinessAnalyticsInput: $getBusinessAnalyticsInput) {
    data {
      business_id
      all {
        purchases {
          created
          amount
          __typename
        }
        amount_spent {
          created
          amount
          __typename
        }
        visitors {
          created
          amount
          __typename
        }
        total_sales {
          created
          amount
          __typename
        }
        ad_clicks {
          created
          amount
          __typename
        }
        total_conversion_value {
          created
          amount
          __typename
        }
        __typename
      }
      facebook {
        purchases {
          created
          amount
          __typename
        }
        amount_spent {
          created
          amount
          __typename
        }
        visitors {
          created
          amount
          __typename
        }
        total_sales {
          created
          amount
          __typename
        }
        ad_clicks {
          created
          amount
          __typename
        }
        total_conversion_value {
          created
          amount
          __typename
        }
        __typename
      }
      tiktok {
        purchases {
          created
          amount
          __typename
        }
        amount_spent {
          created
          amount
          __typename
        }
        visitors {
          created
          amount
          __typename
        }
        total_sales {
          created
          amount
          __typename
        }
        ad_clicks {
          created
          amount
          __typename
        }
        total_conversion_value {
          created
          amount
          __typename
        }
        __typename
      }
      google {
        purchases {
          created
          amount
          __typename
        }
        amount_spent {
          created
          amount
          __typename
        }
        visitors {
          created
          amount
          __typename
        }
        total_sales {
          created
          amount
          __typename
        }
        ad_clicks {
          created
          amount
          __typename
        }
        total_conversion_value {
          created
          amount
          __typename
        }
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetStatisticsGraphQueryVariables,
  APITypes.GetStatisticsGraphQuery
>;
export const getBusinessMonthlyBudgetRoas = /* GraphQL */ `query GetBusinessMonthlyBudgetRoas(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getBusinessMonthlyBudgetRoas(
    getBusinessAnalyticsInput: $getBusinessAnalyticsInput
  ) {
    data {
      sources {
        id
        amount_spent
        source
        __typename
      }
      roas {
        campaignData {
          id
          source
          purchases
          roas
          cost_per_purchase
          amount_spent
          conversion_value
          total_conversion_value
          sirge_purchases
          sirge_roas
          sirge_cost_per_purchase
          sirge_total_conversion_value
          campaign {
            id
            name
            status
            source_secondary_status
            __typename
          }
          adset {
            id
            name
            status
            source_secondary_status
            __typename
          }
          source_delivery_status
          source_secondary_status
          __typename
        }
        adsetData {
          id
          source
          purchases
          roas
          cost_per_purchase
          amount_spent
          conversion_value
          total_conversion_value
          sirge_purchases
          sirge_roas
          sirge_cost_per_purchase
          sirge_total_conversion_value
          campaign {
            id
            name
            status
            source_secondary_status
            __typename
          }
          adset {
            id
            name
            status
            source_secondary_status
            __typename
          }
          source_delivery_status
          source_secondary_status
          __typename
        }
        adData {
          id
          source
          purchases
          roas
          cost_per_purchase
          amount_spent
          conversion_value
          total_conversion_value
          sirge_purchases
          sirge_roas
          sirge_cost_per_purchase
          sirge_total_conversion_value
          campaign {
            id
            name
            status
            source_secondary_status
            __typename
          }
          adset {
            id
            name
            status
            source_secondary_status
            __typename
          }
          source_delivery_status
          source_secondary_status
          __typename
        }
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessMonthlyBudgetRoasQueryVariables,
  APITypes.GetBusinessMonthlyBudgetRoasQuery
>;
export const getVisitorDetails = /* GraphQL */ `query GetVisitorDetails($getVisitorDetailsInput: GetVisitorDetailsInput!) {
  getVisitorDetails(getVisitorDetailsInput: $getVisitorDetailsInput) {
    data {
      visitor_email
      country
      state
      city
      total_pageviews
      first_visit
      total_purchases
      total_purchase_conversion_value
      visitor_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailsQueryVariables,
  APITypes.GetVisitorDetailsQuery
>;
export const getVisitorDetailsPageviews = /* GraphQL */ `query GetVisitorDetailsPageviews(
  $getVisitorDetailsPageViewsInput: getVisitorDetailsPageViewsInput!
) {
  getVisitorDetailsPageviews(
    getVisitorDetailsPageViewsInput: $getVisitorDetailsPageViewsInput
  ) {
    data {
      ad
      ad_set
      campaign
      business_id
      conversion_value
      created_day
      created
      pageview_id
      referer
      sirge_source_name
      url
      __typename
    }
    total_records
    numberPages
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailsPageviewsQueryVariables,
  APITypes.GetVisitorDetailsPageviewsQuery
>;
export const getVisitorDetailsSources = /* GraphQL */ `query GetVisitorDetailsSources(
  $getVisitorDetailsSourcesInput: GetVisitorDetailsSourcesInput!
) {
  getVisitorDetailsSources(
    getVisitorDetailsSourcesInput: $getVisitorDetailsSourcesInput
  ) {
    data {
      sirge_source_name
      url
      __typename
    }
    total_records
    numberPages
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailsSourcesQueryVariables,
  APITypes.GetVisitorDetailsSourcesQuery
>;
export const getShopifyScopesStatus = /* GraphQL */ `query GetShopifyScopesStatus {
  getShopifyScopesStatus {
    data
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetShopifyScopesStatusQueryVariables,
  APITypes.GetShopifyScopesStatusQuery
>;
export const getShopifyScopesStatusNew = /* GraphQL */ `query GetShopifyScopesStatusNew {
  getShopifyScopesStatusNew {
    data
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetShopifyScopesStatusNewQueryVariables,
  APITypes.GetShopifyScopesStatusNewQuery
>;
export const getAccountsCampaigns = /* GraphQL */ `query GetAccountsCampaigns(
  $getAccountsCampaignsInput: GetAccountsCampaignsInput
) {
  getAccountsCampaigns(getAccountsCampaignsInput: $getAccountsCampaignsInput) {
    data {
      facebook {
        id
        name
        status
        utm_status
        __typename
      }
      tiktok {
        id
        name
        status
        utm_status
        __typename
      }
      google {
        id
        name
        status
        utm_status
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAccountsCampaignsQueryVariables,
  APITypes.GetAccountsCampaignsQuery
>;
export const getAccountsCampaignsNew = /* GraphQL */ `query GetAccountsCampaignsNew(
  $getAccountsCampaignsInput: GetAccountsCampaignsInput
) {
  getAccountsCampaignsNew(
    getAccountsCampaignsInput: $getAccountsCampaignsInput
  ) {
    data {
      facebook {
        id
        name
        status
        utm_status
        __typename
      }
      tiktok {
        id
        name
        status
        utm_status
        __typename
      }
      google {
        id
        name
        status
        utm_status
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAccountsCampaignsNewQueryVariables,
  APITypes.GetAccountsCampaignsNewQuery
>;
export const getPerformanceDrawerBasicDetailsNew = /* GraphQL */ `query GetPerformanceDrawerBasicDetailsNew(
  $getPerformanceDrawerBasicDetailsInput: GetPerformanceDrawerBasicDetailsInput
) {
  getPerformanceDrawerBasicDetailsNew(
    getPerformanceDrawerBasicDetailsInput: $getPerformanceDrawerBasicDetailsInput
  ) {
    data {
      id
      name
      source
      source_delivery_status
      source_secondary_status
      no_of_ads
      no_of_adsets
      utm_status
      are_all_ads_connected
      daily_budget
      shared_budget_name
      lifetime_budget
      ad_images
      ad_type
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceDrawerBasicDetailsNewQueryVariables,
  APITypes.GetPerformanceDrawerBasicDetailsNewQuery
>;
export const getPerformanceDrawerBasicDetails = /* GraphQL */ `query GetPerformanceDrawerBasicDetails(
  $getPerformanceDrawerBasicDetailsInput: GetPerformanceDrawerBasicDetailsInput
) {
  getPerformanceDrawerBasicDetails(
    getPerformanceDrawerBasicDetailsInput: $getPerformanceDrawerBasicDetailsInput
  ) {
    data {
      id
      name
      source
      source_delivery_status
      source_secondary_status
      no_of_ads
      no_of_adsets
      utm_status
      are_all_ads_connected
      daily_budget
      shared_budget_name
      lifetime_budget
      ad_images
      ad_type
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceDrawerBasicDetailsQueryVariables,
  APITypes.GetPerformanceDrawerBasicDetailsQuery
>;
export const getPerformanceDrawerStats = /* GraphQL */ `query GetPerformanceDrawerStats(
  $getPerformanceDrawerStatsInput: GetPerformanceDrawerStatsInput
) {
  getPerformanceDrawerStats(
    getPerformanceDrawerStatsInput: $getPerformanceDrawerStatsInput
  ) {
    data {
      total_amount_spent
      total_roas
      total_conversion
      total_purchases
      graph {
        total_amount_spent
        total_conversion_value
        created
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceDrawerStatsQueryVariables,
  APITypes.GetPerformanceDrawerStatsQuery
>;
export const generateTrackableCopyPath = /* GraphQL */ `query GenerateTrackableCopyPath(
  $generateTrackableCopyPathInput: GenerateTrackableCopyPathInput
) {
  generateTrackableCopyPath(
    generateTrackableCopyPathInput: $generateTrackableCopyPathInput
  ) {
    data {
      path
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateTrackableCopyPathQueryVariables,
  APITypes.GenerateTrackableCopyPathQuery
>;
export const getPerformanceDrawerStatsNew = /* GraphQL */ `query GetPerformanceDrawerStatsNew(
  $getPerformanceDrawerStatsInput: GetPerformanceDrawerStatsInput
) {
  getPerformanceDrawerStatsNew(
    getPerformanceDrawerStatsInput: $getPerformanceDrawerStatsInput
  ) {
    data {
      total_amount_spent
      total_roas
      total_conversion
      total_purchases
      graph {
        total_amount_spent
        total_conversion_value
        created
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceDrawerStatsNewQueryVariables,
  APITypes.GetPerformanceDrawerStatsNewQuery
>;
export const generateTrackableCopyPathNew = /* GraphQL */ `query GenerateTrackableCopyPathNew(
  $generateTrackableCopyParams: BusinessIdInput!
) {
  generateTrackableCopyPathNew(
    generateTrackableCopyParams: $generateTrackableCopyParams
  ) {
    data {
      path
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateTrackableCopyPathNewQueryVariables,
  APITypes.GenerateTrackableCopyPathNewQuery
>;
export const getTrackableCopies = /* GraphQL */ `query GetTrackableCopies($getTrackableCopiesInput: GetTrackableCopiesInput!) {
  getTrackableCopies(getTrackableCopiesInput: $getTrackableCopiesInput) {
    data {
      id
      name
      description
      type
      short_code
      destination_url
      url_position
      business_id
      created
      stats {
        clicks
        purchases
        revenue
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrackableCopiesQueryVariables,
  APITypes.GetTrackableCopiesQuery
>;
export const getTrackableCopiesNew = /* GraphQL */ `query GetTrackableCopiesNew(
  $getTrackableCopiesInput: GetTrackableCopiesInput!
) {
  getTrackableCopiesNew(getTrackableCopiesInput: $getTrackableCopiesInput) {
    data {
      id
      name
      description
      type
      short_code
      destination_url
      url_position
      business_id
      created
      stats {
        clicks
        purchases
        revenue
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrackableCopiesNewQueryVariables,
  APITypes.GetTrackableCopiesNewQuery
>;
export const getTrackableCopyTypes = /* GraphQL */ `query GetTrackableCopyTypes(
  $getTrackableCopyTypesInput: GetTrackableCopyTypesInput!
) {
  getTrackableCopyTypes(
    getTrackableCopyTypesInput: $getTrackableCopyTypesInput
  ) {
    data
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrackableCopyTypesQueryVariables,
  APITypes.GetTrackableCopyTypesQuery
>;
export const getTrackableCopyTypesNew = /* GraphQL */ `query GetTrackableCopyTypesNew($getTrackableCopyTypesInput: BusinessIdInput!) {
  getTrackableCopyTypesNew(
    getTrackableCopyTypesInput: $getTrackableCopyTypesInput
  ) {
    data
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrackableCopyTypesNewQueryVariables,
  APITypes.GetTrackableCopyTypesNewQuery
>;
export const getTrackableCopyOrders = /* GraphQL */ `query GetTrackableCopyOrders(
  $getTrackableCopyOrdersInput: GetTrackableCopyOrdersInput!
) {
  getTrackableCopyOrders(
    getTrackableCopyOrdersInput: $getTrackableCopyOrdersInput
  ) {
    data {
      business_id
      conversion_value
      created
      order_id
      source
      visitor_id
      visitor_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrackableCopyOrdersQueryVariables,
  APITypes.GetTrackableCopyOrdersQuery
>;
export const getTrackableCopyOrdersNew = /* GraphQL */ `query GetTrackableCopyOrdersNew(
  $getTrackableCopyOrdersInput: GetTrackableCopyOrdersInput!
) {
  getTrackableCopyOrdersNew(
    getTrackableCopyOrdersInput: $getTrackableCopyOrdersInput
  ) {
    data {
      business_id
      conversion_value
      created
      order_id
      source
      visitor_id
      visitor_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrackableCopyOrdersNewQueryVariables,
  APITypes.GetTrackableCopyOrdersNewQuery
>;
export const getSourcesOrders = /* GraphQL */ `query GetSourcesOrders($getSourcesOrdersInput: GetSourcesOrdersInput!) {
  getSourcesOrders(getSourcesOrdersInput: $getSourcesOrdersInput) {
    data {
      business_id
      conversion_value
      created
      order_id
      source
      visitor_id
      visitor_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSourcesOrdersQueryVariables,
  APITypes.GetSourcesOrdersQuery
>;
export const getPerformanceNotes = /* GraphQL */ `query GetPerformanceNotes(
  $getPerformanceNotesInput: GetPerformanceNotesInput!
) {
  getPerformanceNotes(getPerformanceNotesInput: $getPerformanceNotesInput) {
    data {
      id
      ad_type
      business_id
      description
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceNotesQueryVariables,
  APITypes.GetPerformanceNotesQuery
>;
export const getKeyMetricsMonthlyBudget = /* GraphQL */ `query GetKeyMetricsMonthlyBudget(
  $getKeyMetricsMonthlyBudgetInput: GetKeyMetricsMonthlyBudgetInput!
) {
  getKeyMetricsMonthlyBudget(
    getKeyMetricsMonthlyBudgetInput: $getKeyMetricsMonthlyBudgetInput
  ) {
    data {
      business_id
      amount_spent
      source
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetKeyMetricsMonthlyBudgetQueryVariables,
  APITypes.GetKeyMetricsMonthlyBudgetQuery
>;
export const getKeyMetricsRoasTracker = /* GraphQL */ `query GetKeyMetricsRoasTracker(
  $getKeyMetricsRoasTrackerInput: GetKeyMetricsRoasTrackerInput!
) {
  getKeyMetricsRoasTracker(
    getKeyMetricsRoasTrackerInput: $getKeyMetricsRoasTrackerInput
  ) {
    data {
      campaign {
        over
        under
        __typename
      }
      adset {
        over
        under
        __typename
      }
      ad {
        over
        under
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetKeyMetricsRoasTrackerQueryVariables,
  APITypes.GetKeyMetricsRoasTrackerQuery
>;
export const getAdcomparisonData = /* GraphQL */ `query GetAdcomparisonData(
  $getBusinessAnalyticsInput: GetBusinessAnalyticsInput!
) {
  getAdcomparisonData(getBusinessAnalyticsInput: $getBusinessAnalyticsInput) {
    data {
      id
      ad_name
      ad_primary_status
      ad_secondary_status
      total_amount_spent
      roas
      total_orders
      total_conversion_value
      ad_images
      source
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAdcomparisonDataQueryVariables,
  APITypes.GetAdcomparisonDataQuery
>;
export const getPerformanceNotesNew = /* GraphQL */ `query GetPerformanceNotesNew(
  $getPerformanceNotesInput: GetPerformanceNotesInput!
) {
  getPerformanceNotesNew(getPerformanceNotesInput: $getPerformanceNotesInput) {
    data {
      id
      ad_type
      business_id
      description
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPerformanceNotesNewQueryVariables,
  APITypes.GetPerformanceNotesNewQuery
>;
export const getAllCustomersNew = /* GraphQL */ `query GetAllCustomersNew($getAllCustomersInput: GetAllCustomersInput!) {
  getAllCustomersNew(getAllCustomersInput: $getAllCustomersInput) {
    data {
      customers {
        last_visit
        first_visit
        total_purchases
        total_pageviews
        visitor_id
        visitor_name
        __typename
      }
      totalInfo {
        total_purchases
        totalrecords
        total_visitors
        total_pageviews
        total_clicks
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAllCustomersNewQueryVariables,
  APITypes.GetAllCustomersNewQuery
>;
export const getCustomerJourneyVisitorGraphNew = /* GraphQL */ `query GetCustomerJourneyVisitorGraphNew(
  $getCustomerJourneyVisitorGraphInput: GetCustomerJourneyVisitorGraphInput!
) {
  getCustomerJourneyVisitorGraphNew(
    getCustomerJourneyVisitorGraphInput: $getCustomerJourneyVisitorGraphInput
  ) {
    data {
      date
      new_visitors
      returning_visitors
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerJourneyVisitorGraphNewQueryVariables,
  APITypes.GetCustomerJourneyVisitorGraphNewQuery
>;
export const getDynamicQueryResults = /* GraphQL */ `query GetDynamicQueryResults(
  $getDynamicQueryResultInput: GetDynamicQueryResultInput!
) {
  getDynamicQueryResults(
    getDynamicQueryResultInput: $getDynamicQueryResultInput
  ) {
    data {
      average_conversion_value
      business_id
      city
      country
      customer_id
      customer_name
      email
      email_address
      first_order_date
      id
      insight_date
      ninety_day_order_count
      ninety_day_order_total
      price
      product_id
      quantity
      state
      thirty_day_order_count
      thirty_day_order_total
      title
      zip
      customer_order_id
      deleted_at
      updated_at
      created_at
      __typename
    }
    total_records
    message
    error {
      code
      message
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDynamicQueryResultsQueryVariables,
  APITypes.GetDynamicQueryResultsQuery
>;
export const getSegmentBuilderBasicDetails = /* GraphQL */ `query GetSegmentBuilderBasicDetails(
  $getSegmentBuilderBasicDetailsInput: GetSegmentBuilderBasicDetailsInput!
) {
  getSegmentBuilderBasicDetails(
    getSegmentBuilderBasicDetailsInput: $getSegmentBuilderBasicDetailsInput
  ) {
    data {
      cities
      states
      countries
      dynamicQueryRules
      predefinedQueries
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSegmentBuilderBasicDetailsQueryVariables,
  APITypes.GetSegmentBuilderBasicDetailsQuery
>;
export const getAllAudienceSegmentQueries = /* GraphQL */ `query GetAllAudienceSegmentQueries(
  $getAllAudienceSegmentQueryInput: GetAllAudienceSegmentQueryInput!
) {
  getAllAudienceSegmentQueries(
    getAllAudienceSegmentQueryInput: $getAllAudienceSegmentQueryInput
  ) {
    data {
      id
      business_id
      no_of_customers
      added_revenue
      audience
      type
      status
      query_details
      created_at
      updated_at
      group_name
      deleted_at
      dynamic_query_params
      __typename
    }
    total_records
    message
    error {
      code
      message
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAllAudienceSegmentQueriesQueryVariables,
  APITypes.GetAllAudienceSegmentQueriesQuery
>;
export const getAudienceSegmentQueryById = /* GraphQL */ `query GetAudienceSegmentQueryById(
  $getAudienceSegmentInput: GetAudienceSegmentInput!
) {
  getAudienceSegmentQueryById(
    getAudienceSegmentInput: $getAudienceSegmentInput
  ) {
    data {
      id
      business_id
      no_of_customers
      added_revenue
      audience
      type
      status
      query_details
      created_at
      updated_at
      group_name
      deleted_at
      dynamic_query_params
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAudienceSegmentQueryByIdQueryVariables,
  APITypes.GetAudienceSegmentQueryByIdQuery
>;
export const getCustomerJourneySourcesNew = /* GraphQL */ `query GetCustomerJourneySourcesNew(
  $getCustomerJourneySourcesInput: GetCustomerJourneySourcesInput!
) {
  getCustomerJourneySourcesNew(
    getCustomerJourneySourcesInput: $getCustomerJourneySourcesInput
  ) {
    data {
      sources {
        source
        unique_visitor
        clicks_count
        purchases_count
        __typename
      }
      totalInfo {
        total_purchases
        totalrecords
        total_visitors
        total_pageviews
        total_clicks
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerJourneySourcesNewQueryVariables,
  APITypes.GetCustomerJourneySourcesNewQuery
>;
export const getVisitorDetailsSourcesNew = /* GraphQL */ `query GetVisitorDetailsSourcesNew(
  $getVisitorDetailsSourcesInput: GetVisitorDetailsSourcesInput!
) {
  getVisitorDetailsSourcesNew(
    getVisitorDetailsSourcesInput: $getVisitorDetailsSourcesInput
  ) {
    data {
      sirge_source_name
      url
      __typename
    }
    total_records
    numberPages
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailsSourcesNewQueryVariables,
  APITypes.GetVisitorDetailsSourcesNewQuery
>;
export const getVisitorDetailsNew = /* GraphQL */ `query GetVisitorDetailsNew($getVisitorDetailsInput: GetVisitorDetailsInput!) {
  getVisitorDetailsNew(getVisitorDetailsInput: $getVisitorDetailsInput) {
    data {
      visitor_email
      country
      state
      city
      total_pageviews
      first_visit
      total_purchases
      total_purchase_conversion_value
      visitor_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailsNewQueryVariables,
  APITypes.GetVisitorDetailsNewQuery
>;
export const getVisitorDetailsPageViewsNew = /* GraphQL */ `query GetVisitorDetailsPageViewsNew(
  $getVisitorDetailsPageViewsInput: getVisitorDetailsPageViewsInput!
) {
  getVisitorDetailsPageViewsNew(
    getVisitorDetailsPageViewsInput: $getVisitorDetailsPageViewsInput
  ) {
    data {
      ad
      ad_set
      campaign
      business_id
      conversion_value
      created_day
      created
      pageview_id
      referer
      sirge_source_name
      url
      __typename
    }
    total_records
    numberPages
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVisitorDetailsPageViewsNewQueryVariables,
  APITypes.GetVisitorDetailsPageViewsNewQuery
>;
export const getKeyMetricsAnalyticsStatistics = /* GraphQL */ `query GetKeyMetricsAnalyticsStatistics(
  $getkeyMetricsAnalyticsStatisticsInput: GetKeyMetricsAnalyticsStatisticsInput!
) {
  getKeyMetricsAnalyticsStatistics(
    getkeyMetricsAnalyticsStatisticsInput: $getkeyMetricsAnalyticsStatisticsInput
  ) {
    data {
      total_order {
        amount
        percentage
        __typename
      }
      total_sales {
        amount
        percentage
        __typename
      }
      average_order_value {
        amount
        percentage
        __typename
      }
      blended_roas {
        amount
        percentage
        sources {
          facebook
          tiktok
          google
          __typename
        }
        __typename
      }
      visitors {
        amount
        percentage
        __typename
      }
      conversion_rate {
        amount
        percentage
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetKeyMetricsAnalyticsStatisticsQueryVariables,
  APITypes.GetKeyMetricsAnalyticsStatisticsQuery
>;
export const getCustomerChannelsNew = /* GraphQL */ `query GetCustomerChannelsNew(
  $getCustomerChannelsInput: GetCustomerChannelsInput!
) {
  getCustomerChannelsNew(getCustomerChannelsInput: $getCustomerChannelsInput) {
    data {
      channels {
        source
        referer
        unique_visitor
        purchases_count
        __typename
      }
      totalInfo {
        total_clicks
        total_purchases
        totalrecords
        total_visitors
        total_pageviews
        __typename
      }
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerChannelsNewQueryVariables,
  APITypes.GetCustomerChannelsNewQuery
>;
export const getCustomerChannelsDetailsNew = /* GraphQL */ `query GetCustomerChannelsDetailsNew(
  $getCustomerChannelsDetailsInput: GetCustomerChannelsDetailsInput!
) {
  getCustomerChannelsDetailsNew(
    getCustomerChannelsDetailsInput: $getCustomerChannelsDetailsInput
  ) {
    data {
      channels {
        source
        referer
        unique_visitor
        purchases_count
        __typename
      }
      nextCursor
      prevCursor
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerChannelsDetailsNewQueryVariables,
  APITypes.GetCustomerChannelsDetailsNewQuery
>;
export const getKeyMetricsPerformingProducts = /* GraphQL */ `query GetKeyMetricsPerformingProducts(
  $getKeyMetricsPerformingProductsInput: GetKeyMetricsPerformingProductsInput!
) {
  getKeyMetricsPerformingProducts(
    getKeyMetricsPerformingProductsInput: $getKeyMetricsPerformingProductsInput
  ) {
    data {
      product_id
      name
      totalPrice
      ordersCount
      percentage
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetKeyMetricsPerformingProductsQueryVariables,
  APITypes.GetKeyMetricsPerformingProductsQuery
>;
export const getSourcesOrdersNew = /* GraphQL */ `query GetSourcesOrdersNew($getSourcesOrdersInput: GetSourcesOrdersInput!) {
  getSourcesOrdersNew(getSourcesOrdersInput: $getSourcesOrdersInput) {
    data {
      business_id
      conversion_value
      created
      order_id
      source
      visitor_id
      visitor_name
      __typename
    }
    error {
      code
      message
      __typename
    }
    message
    nextToken
    numberPages
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSourcesOrdersNewQueryVariables,
  APITypes.GetSourcesOrdersNewQuery
>;
export const getSuggestedSegmentsStats = /* GraphQL */ `query GetSuggestedSegmentsStats(
  $getSuggestedSegmentsStatsInput: GetSuggestedSegmentsStatsInput!
) {
  getSuggestedSegmentsStats(
    getSuggestedSegmentsStatsInput: $getSuggestedSegmentsStatsInput
  ) {
    data {
      no_of_customers
      query_type
      __typename
    }
    total_records
    message
    error {
      code
      message
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSuggestedSegmentsStatsQueryVariables,
  APITypes.GetSuggestedSegmentsStatsQuery
>;
