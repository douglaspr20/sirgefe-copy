/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const activateBusiness = /* GraphQL */ `mutation ActivateBusiness($activateBusinessInput: ActivateBusinessInput!) {
  activateBusiness(activateBusinessInput: $activateBusinessInput) {
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
` as GeneratedMutation<
  APITypes.ActivateBusinessMutationVariables,
  APITypes.ActivateBusinessMutation
>;
export const activateBusinessNew = /* GraphQL */ `mutation ActivateBusinessNew($activateBusinessInput: ActivateBusinessInput!) {
  activateBusinessNew(activateBusinessInput: $activateBusinessInput) {
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
` as GeneratedMutation<
  APITypes.ActivateBusinessNewMutationVariables,
  APITypes.ActivateBusinessNewMutation
>;
export const applyPromoCode = /* GraphQL */ `mutation ApplyPromoCode($applyPromoCodeInput: ApplyPromoCodeInput!) {
  applyPromoCode(applyPromoCodeInput: $applyPromoCodeInput) {
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
` as GeneratedMutation<
  APITypes.ApplyPromoCodeMutationVariables,
  APITypes.ApplyPromoCodeMutation
>;
export const authenticateTikTok = /* GraphQL */ `mutation AuthenticateTikTok(
  $authenticateTikTokInput: AuthenticateTikTokInput!
) {
  authenticateTikTok(authenticateTikTokInput: $authenticateTikTokInput) {
    error {
      code
      message
      __typename
    }
    message
    data
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AuthenticateTikTokMutationVariables,
  APITypes.AuthenticateTikTokMutation
>;
export const changePassword = /* GraphQL */ `mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ChangePasswordMutationVariables,
  APITypes.ChangePasswordMutation
>;
export const changePasswordNew = /* GraphQL */ `mutation ChangePasswordNew($changePasswordInput: ChangePasswordInput!) {
  changePasswordNew(changePasswordInput: $changePasswordInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ChangePasswordNewMutationVariables,
  APITypes.ChangePasswordNewMutation
>;
export const createBusiness = /* GraphQL */ `mutation CreateBusiness($createBusinessInput: CreateBusinessInput!) {
  createBusiness(createBusinessInput: $createBusinessInput) {
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
` as GeneratedMutation<
  APITypes.CreateBusinessMutationVariables,
  APITypes.CreateBusinessMutation
>;
export const createStaffAccount = /* GraphQL */ `mutation CreateStaffAccount(
  $createStaffAccountInput: CreateStaffAccountInput!
) {
  createStaffAccount(createStaffAccountInput: $createStaffAccountInput) {
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
` as GeneratedMutation<
  APITypes.CreateStaffAccountMutationVariables,
  APITypes.CreateStaffAccountMutation
>;
export const createStaffAccountNew = /* GraphQL */ `mutation CreateStaffAccountNew(
  $createStaffAccountInput: CreateStaffAccountInput!
) {
  createStaffAccountNew(createStaffAccountInput: $createStaffAccountInput) {
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
` as GeneratedMutation<
  APITypes.CreateStaffAccountNewMutationVariables,
  APITypes.CreateStaffAccountNewMutation
>;
export const deactivateBusiness = /* GraphQL */ `mutation DeactivateBusiness(
  $deactivateBusinessInput: DeactivateBusinessInput!
) {
  deactivateBusiness(deactivateBusinessInput: $deactivateBusinessInput) {
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
` as GeneratedMutation<
  APITypes.DeactivateBusinessMutationVariables,
  APITypes.DeactivateBusinessMutation
>;
export const deleteBusinessByBusinessId = /* GraphQL */ `mutation DeleteBusinessByBusinessId(
  $deleteBusinessesInput: DeleteBusinessesInput!
) {
  deleteBusinessByBusinessId(deleteBusinessesInput: $deleteBusinessesInput) {
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
` as GeneratedMutation<
  APITypes.DeleteBusinessByBusinessIdMutationVariables,
  APITypes.DeleteBusinessByBusinessIdMutation
>;
export const deleteStaffAccount = /* GraphQL */ `mutation DeleteStaffAccount(
  $deleteStaffAccountInput: DeleteStaffAccountInput!
) {
  deleteStaffAccount(deleteStaffAccountInput: $deleteStaffAccountInput) {
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
` as GeneratedMutation<
  APITypes.DeleteStaffAccountMutationVariables,
  APITypes.DeleteStaffAccountMutation
>;
export const deleteStaffAccountNew = /* GraphQL */ `mutation DeleteStaffAccountNew(
  $deleteStaffAccountInput: DeleteStaffAccountInput!
) {
  deleteStaffAccountNew(deleteStaffAccountInput: $deleteStaffAccountInput) {
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
` as GeneratedMutation<
  APITypes.DeleteStaffAccountNewMutationVariables,
  APITypes.DeleteStaffAccountNewMutation
>;
export const disconnectTikTok = /* GraphQL */ `mutation DisconnectTikTok($disconnectTikTokInput: DisconnectTikTokInput!) {
  disconnectTikTok(disconnectTikTokInput: $disconnectTikTokInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DisconnectTikTokMutationVariables,
  APITypes.DisconnectTikTokMutation
>;
export const passwordResetLink = /* GraphQL */ `mutation PasswordResetLink($passwordResetInput: PasswordResetInput!) {
  passwordResetLink(passwordResetInput: $passwordResetInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.PasswordResetLinkMutationVariables,
  APITypes.PasswordResetLinkMutation
>;
export const passwordResetLinkNew = /* GraphQL */ `mutation PasswordResetLinkNew($passwordResetInput: PasswordResetInput!) {
  passwordResetLinkNew(passwordResetInput: $passwordResetInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.PasswordResetLinkNewMutationVariables,
  APITypes.PasswordResetLinkNewMutation
>;
export const payInvoice = /* GraphQL */ `mutation PayInvoice($payInvoiceInput: PayInvoiceInput!) {
  payInvoice(payInvoiceInput: $payInvoiceInput) {
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
` as GeneratedMutation<
  APITypes.PayInvoiceMutationVariables,
  APITypes.PayInvoiceMutation
>;
export const registerUser = /* GraphQL */ `mutation RegisterUser($registerUserInput: RegisterUserInput!) {
  registerUser(registerUserInput: $registerUserInput) {
    error {
      code
      message
      __typename
    }
    message
    nextToken
    user {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RegisterUserMutationVariables,
  APITypes.RegisterUserMutation
>;
export const removeFacebookAdAccount = /* GraphQL */ `mutation RemoveFacebookAdAccount(
  $removeFacebookAdAccountInput: RemoveFacebookAdAccountInput!
) {
  removeFacebookAdAccount(
    removeFacebookAdAccountInput: $removeFacebookAdAccountInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveFacebookAdAccountMutationVariables,
  APITypes.RemoveFacebookAdAccountMutation
>;
export const updateUserDefaultBusiness = /* GraphQL */ `mutation UpdateUserDefaultBusiness(
  $updateUserDefaultBusinessInput: BusinessIdInput!
) {
  updateUserDefaultBusiness(
    updateUserDefaultBusinessInput: $updateUserDefaultBusinessInput
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
` as GeneratedMutation<
  APITypes.UpdateUserDefaultBusinessMutationVariables,
  APITypes.UpdateUserDefaultBusinessMutation
>;
export const removeSocialAdAccount = /* GraphQL */ `mutation RemoveSocialAdAccount(
  $removeSocialAdAccountInput: BusinessIdWithPlatform!
) {
  removeSocialAdAccount(
    removeSocialAdAccountInput: $removeSocialAdAccountInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveSocialAdAccountMutationVariables,
  APITypes.RemoveSocialAdAccountMutation
>;
export const removeFacebookUserAccess = /* GraphQL */ `mutation RemoveFacebookUserAccess($businessIdInput: BusinessIdInput!) {
  removeFacebookUserAccess(businessIdInput: $businessIdInput) {
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
` as GeneratedMutation<
  APITypes.RemoveFacebookUserAccessMutationVariables,
  APITypes.RemoveFacebookUserAccessMutation
>;
export const removeSocialUserAccess = /* GraphQL */ `mutation RemoveSocialUserAccess($businessIdInput: BusinessIdWithPlatform!) {
  removeSocialUserAccess(businessIdInput: $businessIdInput) {
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
` as GeneratedMutation<
  APITypes.RemoveSocialUserAccessMutationVariables,
  APITypes.RemoveSocialUserAccessMutation
>;
export const setFacebookAdAccount = /* GraphQL */ `mutation SetFacebookAdAccount(
  $setFacebookAdAccountInput: SetFacebookAdAccountInput!
) {
  setFacebookAdAccount(setFacebookAdAccountInput: $setFacebookAdAccountInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SetFacebookAdAccountMutationVariables,
  APITypes.SetFacebookAdAccountMutation
>;
export const setFacebookUserAccess = /* GraphQL */ `mutation SetFacebookUserAccess($facebookAccessInput: FacebookAccessInput!) {
  setFacebookUserAccess(facebookAccessInput: $facebookAccessInput) {
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
` as GeneratedMutation<
  APITypes.SetFacebookUserAccessMutationVariables,
  APITypes.SetFacebookUserAccessMutation
>;
export const setSocialUserAccess = /* GraphQL */ `mutation SetSocialUserAccess($socialAccessStoreInput: SetSocialAccessInput!) {
  setSocialUserAccess(socialAccessStoreInput: $socialAccessStoreInput) {
    data {
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
` as GeneratedMutation<
  APITypes.SetSocialUserAccessMutationVariables,
  APITypes.SetSocialUserAccessMutation
>;
export const setSocialAdAccount = /* GraphQL */ `mutation SetSocialAdAccount(
  $setSocialAdAccountInput: SetSocialAdAccountInput!
) {
  setSocialAdAccount(setSocialAdAccountInput: $setSocialAdAccountInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SetSocialAdAccountMutationVariables,
  APITypes.SetSocialAdAccountMutation
>;
export const setBusinessGoogleAccessToken = /* GraphQL */ `mutation SetBusinessGoogleAccessToken(
  $googleAccessInput: SetBusinessGoogleTokenInput!
) {
  setBusinessGoogleAccessToken(googleAccessInput: $googleAccessInput) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SetBusinessGoogleAccessTokenMutationVariables,
  APITypes.SetBusinessGoogleAccessTokenMutation
>;
export const setBusinessGoogleAdAccount = /* GraphQL */ `mutation SetBusinessGoogleAdAccount(
  $setGoogleAdAccountInput: SetBusinessGoogleAdAccountInput!
) {
  setBusinessGoogleAdAccount(
    setGoogleAdAccountInput: $setGoogleAdAccountInput
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SetBusinessGoogleAdAccountMutationVariables,
  APITypes.SetBusinessGoogleAdAccountMutation
>;
export const subscribe = /* GraphQL */ `mutation Subscribe($subscribeInput: SubscribeInput!) {
  subscribe(subscribeInput: $subscribeInput) {
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
` as GeneratedMutation<
  APITypes.SubscribeMutationVariables,
  APITypes.SubscribeMutation
>;
export const triggerBusinessDataLongFetch = /* GraphQL */ `mutation TriggerBusinessDataLongFetch(
  $triggerBusinessDataLongFetchInput: TriggerBusinessDataLongFetchInput
) {
  triggerBusinessDataLongFetch(
    triggerBusinessDataLongFetchInput: $triggerBusinessDataLongFetchInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.TriggerBusinessDataLongFetchMutationVariables,
  APITypes.TriggerBusinessDataLongFetchMutation
>;
export const triggerBusinessDataLongFetchNew = /* GraphQL */ `mutation TriggerBusinessDataLongFetchNew(
  $triggerBusinessDataLongFetchInput: BusinessIdInput
) {
  triggerBusinessDataLongFetchNew(
    triggerBusinessDataLongFetchInput: $triggerBusinessDataLongFetchInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.TriggerBusinessDataLongFetchNewMutationVariables,
  APITypes.TriggerBusinessDataLongFetchNewMutation
>;
export const updateBusinessByBusinessId = /* GraphQL */ `mutation UpdateBusinessByBusinessId($setBusinessesInput: SetBusinessesInput!) {
  updateBusinessByBusinessId(setBusinessesInput: $setBusinessesInput) {
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
` as GeneratedMutation<
  APITypes.UpdateBusinessByBusinessIdMutationVariables,
  APITypes.UpdateBusinessByBusinessIdMutation
>;
export const updateBusinessByBusinessIdNew = /* GraphQL */ `mutation UpdateBusinessByBusinessIdNew(
  $setBusinessesInput: SetBusinessesInput!
) {
  updateBusinessByBusinessIdNew(setBusinessesInput: $setBusinessesInput) {
    data {
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
` as GeneratedMutation<
  APITypes.UpdateBusinessByBusinessIdNewMutationVariables,
  APITypes.UpdateBusinessByBusinessIdNewMutation
>;
export const updateBusinessLogo = /* GraphQL */ `mutation UpdateBusinessLogo(
  $updateBusinessLogoInput: UpdateBusinessLogoInput!
) {
  updateBusinessLogo(updateBusinessLogoInput: $updateBusinessLogoInput) {
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
` as GeneratedMutation<
  APITypes.UpdateBusinessLogoMutationVariables,
  APITypes.UpdateBusinessLogoMutation
>;
export const updateBusinessLogoNew = /* GraphQL */ `mutation UpdateBusinessLogoNew(
  $updateBusinessLogoInput: UpdateBusinessLogoInput!
) {
  updateBusinessLogoNew(updateBusinessLogoInput: $updateBusinessLogoInput) {
    data {
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
` as GeneratedMutation<
  APITypes.UpdateBusinessLogoNewMutationVariables,
  APITypes.UpdateBusinessLogoNewMutation
>;
export const updateFacebookConnectionSettings = /* GraphQL */ `mutation UpdateFacebookConnectionSettings(
  $updateFacebookConnectionSettingsInput: UpdateFacebookConnectionSettingsInput!
) {
  updateFacebookConnectionSettings(
    updateFacebookConnectionSettingsInput: $updateFacebookConnectionSettingsInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFacebookConnectionSettingsMutationVariables,
  APITypes.UpdateFacebookConnectionSettingsMutation
>;
export const updateStaffAccountAccess = /* GraphQL */ `mutation UpdateStaffAccountAccess(
  $updateStaffAccountAccessInput: UpdateStaffAccountAccessInput!
) {
  updateStaffAccountAccess(
    updateStaffAccountAccessInput: $updateStaffAccountAccessInput
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateStaffAccountAccessMutationVariables,
  APITypes.UpdateStaffAccountAccessMutation
>;
export const updateStaffAccountAccessNew = /* GraphQL */ `mutation UpdateStaffAccountAccessNew(
  $updateStaffAccountAccessInput: UpdateStaffAccountAccessNewInput!
) {
  updateStaffAccountAccessNew(
    updateStaffAccountAccessInput: $updateStaffAccountAccessInput
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateStaffAccountAccessNewMutationVariables,
  APITypes.UpdateStaffAccountAccessNewMutation
>;
export const updateSubscriptionItemQuantity = /* GraphQL */ `mutation UpdateSubscriptionItemQuantity(
  $updateSubscriptionItemQuantityInput: UpdateSubscriptionItemQuantityInput!
) {
  updateSubscriptionItemQuantity(
    updateSubscriptionItemQuantityInput: $updateSubscriptionItemQuantityInput
  ) {
    data {
      limit
      quantity
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSubscriptionItemQuantityMutationVariables,
  APITypes.UpdateSubscriptionItemQuantityMutation
>;
export const updateSubscriptionPlan = /* GraphQL */ `mutation UpdateSubscriptionPlan(
  $updateSubscriptionPlanInput: UpdateSubscriptionPlanInput!
) {
  updateSubscriptionPlan(
    updateSubscriptionPlanInput: $updateSubscriptionPlanInput
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
` as GeneratedMutation<
  APITypes.UpdateSubscriptionPlanMutationVariables,
  APITypes.UpdateSubscriptionPlanMutation
>;
export const updateTimezoneCurrency = /* GraphQL */ `mutation UpdateTimezoneCurrency(
  $updateTimezoneCurrencyInput: UpdateTimezoneCurrencyInput!
) {
  updateTimezoneCurrency(
    updateTimezoneCurrencyInput: $updateTimezoneCurrencyInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTimezoneCurrencyMutationVariables,
  APITypes.UpdateTimezoneCurrencyMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const updateUserNew = /* GraphQL */ `mutation UpdateUserNew($updateUserInput: UpdateUserInput!) {
  updateUserNew(updateUserInput: $updateUserInput) {
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
` as GeneratedMutation<
  APITypes.UpdateUserNewMutationVariables,
  APITypes.UpdateUserNewMutation
>;
export const updateUserProfilePicture = /* GraphQL */ `mutation UpdateUserProfilePicture(
  $updateUserProfilePictureInput: UpdateUserProfilePictureInput!
) {
  updateUserProfilePicture(
    updateUserProfilePictureInput: $updateUserProfilePictureInput
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateUserProfilePictureMutationVariables,
  APITypes.UpdateUserProfilePictureMutation
>;
export const updateUserProfilePictureNew = /* GraphQL */ `mutation UpdateUserProfilePictureNew(
  $updateUserProfilePictureInput: UpdateUserProfilePictureInput!
) {
  updateUserProfilePictureNew(
    updateUserProfilePictureInput: $updateUserProfilePictureInput
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateUserProfilePictureNewMutationVariables,
  APITypes.UpdateUserProfilePictureNewMutation
>;
export const updateUserSubscriptionCard = /* GraphQL */ `mutation UpdateUserSubscriptionCard(
  $updateUserSubscriptionCardInput: UpdateSubscriptionCardInput!
) {
  updateUserSubscriptionCard(
    updateUserSubscriptionCardInput: $updateUserSubscriptionCardInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserSubscriptionCardMutationVariables,
  APITypes.UpdateUserSubscriptionCardMutation
>;
export const verifyTwoFactor = /* GraphQL */ `mutation VerifyTwoFactor($verifyTwoFactorInput: VerifyTwoFactorInput!) {
  verifyTwoFactor(verifyTwoFactorInput: $verifyTwoFactorInput) {
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
` as GeneratedMutation<
  APITypes.VerifyTwoFactorMutationVariables,
  APITypes.VerifyTwoFactorMutation
>;
export const verifyTwoFactorNew = /* GraphQL */ `mutation VerifyTwoFactorNew($verifyTwoFactorInput: VerifyTwoFactorInput!) {
  verifyTwoFactorNew(verifyTwoFactorInput: $verifyTwoFactorInput) {
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
` as GeneratedMutation<
  APITypes.VerifyTwoFactorNewMutationVariables,
  APITypes.VerifyTwoFactorNewMutation
>;
export const refreshDataForBusiness = /* GraphQL */ `mutation RefreshDataForBusiness(
  $refreshDataForBusinessInput: RefreshDataForBusiness!
) {
  refreshDataForBusiness(
    refreshDataForBusinessInput: $refreshDataForBusinessInput
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
` as GeneratedMutation<
  APITypes.RefreshDataForBusinessMutationVariables,
  APITypes.RefreshDataForBusinessMutation
>;
export const updateShopifyStoreUrl = /* GraphQL */ `mutation UpdateShopifyStoreUrl(
  $updateShopifyStoreUrlInput: UpdateShopifyStoreUrlInput!
) {
  updateShopifyStoreUrl(
    updateShopifyStoreUrlInput: $updateShopifyStoreUrlInput
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateShopifyStoreUrlMutationVariables,
  APITypes.UpdateShopifyStoreUrlMutation
>;
export const setTiktokAdAccount = /* GraphQL */ `mutation SetTiktokAdAccount(
  $setTiktokAdAccountInput: SetTiktokAdAccountInput!
) {
  setTiktokAdAccount(setTiktokAdAccountInput: $setTiktokAdAccountInput) {
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
` as GeneratedMutation<
  APITypes.SetTiktokAdAccountMutationVariables,
  APITypes.SetTiktokAdAccountMutation
>;
export const disconnectBusinessTiktok = /* GraphQL */ `mutation DisconnectBusinessTiktok(
  $disconnectBusinessTiktokInput: DisconnectBusinessTiktokInput!
) {
  disconnectBusinessTiktok(
    disconnectBusinessTiktokInput: $disconnectBusinessTiktokInput
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
` as GeneratedMutation<
  APITypes.DisconnectBusinessTiktokMutationVariables,
  APITypes.DisconnectBusinessTiktokMutation
>;
export const disconnectBusinessGoogle = /* GraphQL */ `mutation DisconnectBusinessGoogle(
  $disconnectBusinessGoogleInput: BusinessIdInput!
) {
  disconnectBusinessGoogle(
    disconnectBusinessGoogleInput: $disconnectBusinessGoogleInput
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
` as GeneratedMutation<
  APITypes.DisconnectBusinessGoogleMutationVariables,
  APITypes.DisconnectBusinessGoogleMutation
>;
export const disconnectBusinessGoogleAccount = /* GraphQL */ `mutation DisconnectBusinessGoogleAccount(
  $disconnectBusinessGoogleInput: BusinessIdInput!
) {
  disconnectBusinessGoogleAccount(
    disconnectBusinessGoogleInput: $disconnectBusinessGoogleInput
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
` as GeneratedMutation<
  APITypes.DisconnectBusinessGoogleAccountMutationVariables,
  APITypes.DisconnectBusinessGoogleAccountMutation
>;
export const updateMonthlyBudget = /* GraphQL */ `mutation UpdateMonthlyBudget(
  $updateMonthlyBudgetInput: UpdateMonthlyBudgetInput!
) {
  updateMonthlyBudget(updateMonthlyBudgetInput: $updateMonthlyBudgetInput) {
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
` as GeneratedMutation<
  APITypes.UpdateMonthlyBudgetMutationVariables,
  APITypes.UpdateMonthlyBudgetMutation
>;
export const updateRoasGoals = /* GraphQL */ `mutation UpdateRoasGoals($updateRoasGoalsInput: UpdateRoasGoalsInput!) {
  updateRoasGoals(updateRoasGoalsInput: $updateRoasGoalsInput) {
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
` as GeneratedMutation<
  APITypes.UpdateRoasGoalsMutationVariables,
  APITypes.UpdateRoasGoalsMutation
>;
export const setUserSession = /* GraphQL */ `mutation SetUserSession {
  setUserSession {
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
` as GeneratedMutation<
  APITypes.SetUserSessionMutationVariables,
  APITypes.SetUserSessionMutation
>;
export const setUserSessionNew = /* GraphQL */ `mutation SetUserSessionNew {
  setUserSessionNew {
    data {
      browser_name
      browser_version
      created_at
      ip
      location
      os_name
      os_version
      users {
        connect {
          id
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
` as GeneratedMutation<
  APITypes.SetUserSessionNewMutationVariables,
  APITypes.SetUserSessionNewMutation
>;
export const createShopifySubscription = /* GraphQL */ `mutation CreateShopifySubscription(
  $createShopifySubscriptionInput: CreateShopifySubscriptionInput!
) {
  createShopifySubscription(
    createShopifySubscriptionInput: $createShopifySubscriptionInput
  ) {
    data {
      confirmationUrl
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateShopifySubscriptionMutationVariables,
  APITypes.CreateShopifySubscriptionMutation
>;
export const createShopifySubscriptionNew = /* GraphQL */ `mutation CreateShopifySubscriptionNew(
  $createShopifySubscriptionInput: CreateShopifySubscriptionInput!
) {
  createShopifySubscriptionNew(
    createShopifySubscriptionInput: $createShopifySubscriptionInput
  ) {
    data {
      confirmationUrl
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateShopifySubscriptionNewMutationVariables,
  APITypes.CreateShopifySubscriptionNewMutation
>;
export const createShopifySubscriptionEarly = /* GraphQL */ `mutation CreateShopifySubscriptionEarly(
  $createShopifySubscriptionInput: CreateShopifySubscriptionEarlyInput!
) {
  createShopifySubscriptionEarly(
    createShopifySubscriptionInput: $createShopifySubscriptionInput
  ) {
    data {
      confirmationUrl
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateShopifySubscriptionEarlyMutationVariables,
  APITypes.CreateShopifySubscriptionEarlyMutation
>;
export const registerShopifyUser = /* GraphQL */ `mutation RegisterShopifyUser(
  $registerShopifyUserInput: RegisterShopifyUserInput!
) {
  registerShopifyUser(registerShopifyUserInput: $registerShopifyUserInput) {
    error {
      code
      message
      __typename
    }
    message
    nextToken
    user {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RegisterShopifyUserMutationVariables,
  APITypes.RegisterShopifyUserMutation
>;
export const registerShopifyUserNew = /* GraphQL */ `mutation RegisterShopifyUserNew(
  $registerShopifyUserInput: RegisterShopifyUserInput!
) {
  registerShopifyUserNew(registerShopifyUserInput: $registerShopifyUserInput) {
    error {
      code
      message
      __typename
    }
    message
    nextToken
    user {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RegisterShopifyUserNewMutationVariables,
  APITypes.RegisterShopifyUserNewMutation
>;
export const checkShopifyLogin = /* GraphQL */ `mutation CheckShopifyLogin($checkShopifyLoginInput: CheckShopifyLoginInput!) {
  checkShopifyLogin(checkShopifyLoginInput: $checkShopifyLoginInput) {
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
` as GeneratedMutation<
  APITypes.CheckShopifyLoginMutationVariables,
  APITypes.CheckShopifyLoginMutation
>;
export const checkShopifyLoginNew = /* GraphQL */ `mutation CheckShopifyLoginNew(
  $checkShopifyLoginInput: CheckShopifyLoginInput!
) {
  checkShopifyLoginNew(checkShopifyLoginInput: $checkShopifyLoginInput) {
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
` as GeneratedMutation<
  APITypes.CheckShopifyLoginNewMutationVariables,
  APITypes.CheckShopifyLoginNewMutation
>;
export const sendRegisterUserEmail = /* GraphQL */ `mutation SendRegisterUserEmail(
  $sendRegisterUserEmailInput: SendRegisterUserEmailInput!
) {
  sendRegisterUserEmail(
    sendRegisterUserEmailInput: $sendRegisterUserEmailInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    nextToken
    user {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendRegisterUserEmailMutationVariables,
  APITypes.SendRegisterUserEmailMutation
>;
export const sendRegisterUserEmailNew = /* GraphQL */ `mutation SendRegisterUserEmailNew(
  $sendRegisterUserEmailInput: SendRegisterUserEmailInput!
) {
  sendRegisterUserEmailNew(
    sendRegisterUserEmailInput: $sendRegisterUserEmailInput
  ) {
    error {
      code
      message
      __typename
    }
    message
    nextToken
    user {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendRegisterUserEmailNewMutationVariables,
  APITypes.SendRegisterUserEmailNewMutation
>;
export const cancelShopifySubscription = /* GraphQL */ `mutation CancelShopifySubscription(
  $cancelShopifySubscriptionInput: CancelShopifySubscriptionInput
) {
  cancelShopifySubscription(
    cancelShopifySubscriptionInput: $cancelShopifySubscriptionInput
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
` as GeneratedMutation<
  APITypes.CancelShopifySubscriptionMutationVariables,
  APITypes.CancelShopifySubscriptionMutation
>;
export const cancelShopifySubscriptionNew = /* GraphQL */ `mutation CancelShopifySubscriptionNew(
  $cancelShopifySubscriptionInput: CancelShopifySubscriptionInput
) {
  cancelShopifySubscriptionNew(
    cancelShopifySubscriptionInput: $cancelShopifySubscriptionInput
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
` as GeneratedMutation<
  APITypes.CancelShopifySubscriptionNewMutationVariables,
  APITypes.CancelShopifySubscriptionNewMutation
>;
export const cancelShopifySubscriptionEarly = /* GraphQL */ `mutation CancelShopifySubscriptionEarly(
  $cancelShopifySubscriptionEarlyInput: CancelShopifySubscriptionEarlyInput!
) {
  cancelShopifySubscriptionEarly(
    cancelShopifySubscriptionEarlyInput: $cancelShopifySubscriptionEarlyInput
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
` as GeneratedMutation<
  APITypes.CancelShopifySubscriptionEarlyMutationVariables,
  APITypes.CancelShopifySubscriptionEarlyMutation
>;
export const cancelShopifySubscriptionEarlyNew = /* GraphQL */ `mutation CancelShopifySubscriptionEarlyNew(
  $cancelShopifySubscriptionEarlyInput: CancelShopifySubscriptionEarlyInput!
) {
  cancelShopifySubscriptionEarlyNew(
    cancelShopifySubscriptionEarlyInput: $cancelShopifySubscriptionEarlyInput
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
` as GeneratedMutation<
  APITypes.CancelShopifySubscriptionEarlyNewMutationVariables,
  APITypes.CancelShopifySubscriptionEarlyNewMutation
>;
export const createShopifyScriptTag = /* GraphQL */ `mutation CreateShopifyScriptTag {
  createShopifyScriptTag {
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
` as GeneratedMutation<
  APITypes.CreateShopifyScriptTagMutationVariables,
  APITypes.CreateShopifyScriptTagMutation
>;
export const setUtmValuesGoogleCampaigns = /* GraphQL */ `mutation SetUtmValuesGoogleCampaigns(
  $setUtmValuesGoogleCampaignsInput: SetUtmValuesGoogleCampaignsInput!
) {
  setUtmValuesGoogleCampaigns(
    setUtmValuesGoogleCampaignsInput: $setUtmValuesGoogleCampaignsInput
  ) {
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
` as GeneratedMutation<
  APITypes.SetUtmValuesGoogleCampaignsMutationVariables,
  APITypes.SetUtmValuesGoogleCampaignsMutation
>;
export const setUtmValuesFbCampaign = /* GraphQL */ `mutation SetUtmValuesFbCampaign(
  $setUtmValuesFbCampaignInput: SetUtmValuesFbCampaignInput!
) {
  setUtmValuesFbCampaign(
    setUtmValuesFbCampaignInput: $setUtmValuesFbCampaignInput
  ) {
    error {
      code
      message
      __typename
    }
    data {
      totalAdsToConnect
      adsConnected
      adsFailed {
        ad
        error
        __typename
      }
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SetUtmValuesFbCampaignMutationVariables,
  APITypes.SetUtmValuesFbCampaignMutation
>;
export const setUtmValuesSocialCampaign = /* GraphQL */ `mutation SetUtmValuesSocialCampaign(
  $setUtmValuesSocialCampaignInput: SetUtmValuesSocialCampaignInput!
) {
  setUtmValuesSocialCampaign(
    setUtmValuesSocialCampaignInput: $setUtmValuesSocialCampaignInput
  ) {
    error {
      code
      message
      __typename
    }
    data {
      totalAdsToConnect
      adsConnected
      adsFailed {
        ad
        error
        __typename
      }
      __typename
    }
    message
    nextToken
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SetUtmValuesSocialCampaignMutationVariables,
  APITypes.SetUtmValuesSocialCampaignMutation
>;
export const setUtmValuesTiktokAd = /* GraphQL */ `mutation SetUtmValuesTiktokAd(
  $setUtmValuesTiktokAdInput: SetUtmValuesTiktokAdInput!
) {
  setUtmValuesTiktokAd(setUtmValuesTiktokAdInput: $setUtmValuesTiktokAdInput) {
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
` as GeneratedMutation<
  APITypes.SetUtmValuesTiktokAdMutationVariables,
  APITypes.SetUtmValuesTiktokAdMutation
>;
export const addDiscountCode = /* GraphQL */ `mutation AddDiscountCode($addDiscountCodeInput: AddDiscountCodeInput!) {
  addDiscountCode(addDiscountCodeInput: $addDiscountCodeInput) {
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
` as GeneratedMutation<
  APITypes.AddDiscountCodeMutationVariables,
  APITypes.AddDiscountCodeMutation
>;
export const addDiscountCodeNew = /* GraphQL */ `mutation AddDiscountCodeNew($addDiscountCodeInput: AddDiscountCodeInput!) {
  addDiscountCodeNew(addDiscountCodeInput: $addDiscountCodeInput) {
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
` as GeneratedMutation<
  APITypes.AddDiscountCodeNewMutationVariables,
  APITypes.AddDiscountCodeNewMutation
>;
export const removeDiscountCode = /* GraphQL */ `mutation RemoveDiscountCode {
  removeDiscountCode {
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
` as GeneratedMutation<
  APITypes.RemoveDiscountCodeMutationVariables,
  APITypes.RemoveDiscountCodeMutation
>;
export const removeDiscountCodeNew = /* GraphQL */ `mutation RemoveDiscountCodeNew($addDiscountCodeInput: AddDiscountCodeInput!) {
  removeDiscountCodeNew(addDiscountCodeInput: $addDiscountCodeInput) {
    data {
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
` as GeneratedMutation<
  APITypes.RemoveDiscountCodeNewMutationVariables,
  APITypes.RemoveDiscountCodeNewMutation
>;
export const updateAdLevelStatus = /* GraphQL */ `mutation UpdateAdLevelStatus(
  $updateAdLevelStatusInput: UpdateAdLevelStatusInput!
) {
  updateAdLevelStatus(updateAdLevelStatusInput: $updateAdLevelStatusInput) {
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
` as GeneratedMutation<
  APITypes.UpdateAdLevelStatusMutationVariables,
  APITypes.UpdateAdLevelStatusMutation
>;
export const updateAdLevelStatusNew = /* GraphQL */ `mutation UpdateAdLevelStatusNew(
  $updateAdLevelStatusInput: UpdateAdLevelStatusInput!
) {
  updateAdLevelStatusNew(updateAdLevelStatusInput: $updateAdLevelStatusInput) {
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
` as GeneratedMutation<
  APITypes.UpdateAdLevelStatusNewMutationVariables,
  APITypes.UpdateAdLevelStatusNewMutation
>;
export const updateAdDailyBudget = /* GraphQL */ `mutation UpdateAdDailyBudget(
  $updateAdDailyBudgetInput: updateAdDailyBudgetInput!
) {
  updateAdDailyBudget(updateAdDailyBudgetInput: $updateAdDailyBudgetInput) {
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
` as GeneratedMutation<
  APITypes.UpdateAdDailyBudgetMutationVariables,
  APITypes.UpdateAdDailyBudgetMutation
>;
export const updateAdDailyBudgetNew = /* GraphQL */ `mutation UpdateAdDailyBudgetNew(
  $updateAdDailyBudgetInput: updateAdDailyBudgetInput!
) {
  updateAdDailyBudgetNew(updateAdDailyBudgetInput: $updateAdDailyBudgetInput) {
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
` as GeneratedMutation<
  APITypes.UpdateAdDailyBudgetNewMutationVariables,
  APITypes.UpdateAdDailyBudgetNewMutation
>;
export const createTrackableCopy = /* GraphQL */ `mutation CreateTrackableCopy(
  $createTrackableCopyInput: CreateTrackableCopyInput!
) {
  createTrackableCopy(createTrackableCopyInput: $createTrackableCopyInput) {
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
` as GeneratedMutation<
  APITypes.CreateTrackableCopyMutationVariables,
  APITypes.CreateTrackableCopyMutation
>;
export const createTrackableCopyNew = /* GraphQL */ `mutation CreateTrackableCopyNew(
  $createTrackableCopyInput: CreateTrackableCopyInput!
) {
  createTrackableCopyNew(createTrackableCopyInput: $createTrackableCopyInput) {
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
` as GeneratedMutation<
  APITypes.CreateTrackableCopyNewMutationVariables,
  APITypes.CreateTrackableCopyNewMutation
>;
export const deleteTrackableCopy = /* GraphQL */ `mutation DeleteTrackableCopy(
  $deleteTrackableCopyInput: DeleteTrackableCopyInput!
) {
  deleteTrackableCopy(deleteTrackableCopyInput: $deleteTrackableCopyInput) {
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
` as GeneratedMutation<
  APITypes.DeleteTrackableCopyMutationVariables,
  APITypes.DeleteTrackableCopyMutation
>;
export const deleteTrackableCopyNew = /* GraphQL */ `mutation DeleteTrackableCopyNew(
  $deleteTrackableCopyInput: DeleteTrackableCopyInput!
) {
  deleteTrackableCopyNew(deleteTrackableCopyInput: $deleteTrackableCopyInput) {
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
` as GeneratedMutation<
  APITypes.DeleteTrackableCopyNewMutationVariables,
  APITypes.DeleteTrackableCopyNewMutation
>;
export const updateTrackableCopy = /* GraphQL */ `mutation UpdateTrackableCopy(
  $updateTrackableCopyInput: UpdateTrackableCopyInput!
) {
  updateTrackableCopy(updateTrackableCopyInput: $updateTrackableCopyInput) {
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
` as GeneratedMutation<
  APITypes.UpdateTrackableCopyMutationVariables,
  APITypes.UpdateTrackableCopyMutation
>;
export const updateTrackableCopyNew = /* GraphQL */ `mutation UpdateTrackableCopyNew(
  $updateTrackableCopyInput: UpdateTrackableCopyInput!
) {
  updateTrackableCopyNew(updateTrackableCopyInput: $updateTrackableCopyInput) {
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
` as GeneratedMutation<
  APITypes.UpdateTrackableCopyNewMutationVariables,
  APITypes.UpdateTrackableCopyNewMutation
>;
export const setPerformanceNotes = /* GraphQL */ `mutation SetPerformanceNotes(
  $setPerformanceNotesInput: SetPerformanceNotesInput!
) {
  setPerformanceNotes(setPerformanceNotesInput: $setPerformanceNotesInput) {
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
` as GeneratedMutation<
  APITypes.SetPerformanceNotesMutationVariables,
  APITypes.SetPerformanceNotesMutation
>;
export const updateKeyMetricsMonthlyBudget = /* GraphQL */ `mutation UpdateKeyMetricsMonthlyBudget(
  $updateMonthlyBudgetInput: UpdateMonthlyBudgetInput!
) {
  updateKeyMetricsMonthlyBudget(
    updateMonthlyBudgetInput: $updateMonthlyBudgetInput
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateKeyMetricsMonthlyBudgetMutationVariables,
  APITypes.UpdateKeyMetricsMonthlyBudgetMutation
>;
export const updateKeyMetricsRoasTracker = /* GraphQL */ `mutation UpdateKeyMetricsRoasTracker(
  $updateRoasGoalsInput: UpdateRoasGoalsInput!
) {
  updateKeyMetricsRoasTracker(updateRoasGoalsInput: $updateRoasGoalsInput) {
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
` as GeneratedMutation<
  APITypes.UpdateKeyMetricsRoasTrackerMutationVariables,
  APITypes.UpdateKeyMetricsRoasTrackerMutation
>;
export const setPerformanceNotesNew = /* GraphQL */ `mutation SetPerformanceNotesNew(
  $setPerformanceNotesInput: SetPerformanceNotesInput!
) {
  setPerformanceNotesNew(setPerformanceNotesInput: $setPerformanceNotesInput) {
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
` as GeneratedMutation<
  APITypes.SetPerformanceNotesNewMutationVariables,
  APITypes.SetPerformanceNotesNewMutation
>;
export const setAudienceSegmentQuery = /* GraphQL */ `mutation SetAudienceSegmentQuery(
  $setAudienceSegmentQueryInput: SetAudienceSegmentQueryInput!
) {
  setAudienceSegmentQuery(
    setAudienceSegmentQueryInput: $setAudienceSegmentQueryInput
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
` as GeneratedMutation<
  APITypes.SetAudienceSegmentQueryMutationVariables,
  APITypes.SetAudienceSegmentQueryMutation
>;
export const updateAudienceSegmentQueryById = /* GraphQL */ `mutation UpdateAudienceSegmentQueryById(
  $updateAudienceSegmentInput: UpdateAudienceSegmentQueryInput!
) {
  updateAudienceSegmentQueryById(
    updateAudienceSegmentInput: $updateAudienceSegmentInput
  ) {
    data {
      success
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
` as GeneratedMutation<
  APITypes.UpdateAudienceSegmentQueryByIdMutationVariables,
  APITypes.UpdateAudienceSegmentQueryByIdMutation
>;
export const deleteAudienceSegmentQueryById = /* GraphQL */ `mutation DeleteAudienceSegmentQueryById(
  $deleteAudienceSegmentInput: DeleteAudienceSegmentInput!
) {
  deleteAudienceSegmentQueryById(
    deleteAudienceSegmentInput: $deleteAudienceSegmentInput
  ) {
    data {
      success
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
` as GeneratedMutation<
  APITypes.DeleteAudienceSegmentQueryByIdMutationVariables,
  APITypes.DeleteAudienceSegmentQueryByIdMutation
>;
export const createSuggestedSegments = /* GraphQL */ `mutation CreateSuggestedSegments(
  $createSuggestedSegmentsInput: CreateSuggestedSegmentsInput!
) {
  createSuggestedSegments(
    createSuggestedSegmentsInput: $createSuggestedSegmentsInput
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
` as GeneratedMutation<
  APITypes.CreateSuggestedSegmentsMutationVariables,
  APITypes.CreateSuggestedSegmentsMutation
>;
