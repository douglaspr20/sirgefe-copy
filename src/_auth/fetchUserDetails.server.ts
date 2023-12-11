import { UserDetailsPrisma } from '@interfaces/userDetails';
import { useBoundStore } from '@store/index';
import { BusinessPrisma } from 'API';
import { headers } from 'next/headers';

export async function fetchUserDetails(
  businessVanityName: string,
): Promise<UserDetailsPrisma | null> {
  const cookie = headers().get('cookie');

  const savedUserDetails = useBoundStore.getState();

  if (!cookie) {
    return null;
  }

  if (
    !savedUserDetails.businessProfile ||
    (savedUserDetails?.selectedBusiness &&
      savedUserDetails?.selectedBusiness.vanity_name !== businessVanityName)
  ) {
    const original = headers().get('x-origin') as string;
    const endpoint = `${original}/api?businessVanityName=${businessVanityName}`;

    const res = await fetch(endpoint, {
      headers: {
        cookie: cookie as string,
      },
      cache: 'no-store',
    });
    const user = (await res.json()) as UserDetailsPrisma;
    if (user) {
      useBoundStore.setState({
        platformMode: user.platformMode,
        businessProfile: user.businessProfileData,
        businessList: user.businessListData as BusinessPrisma[],
        selectedBusiness: user.businessListData[0],
        businessCount: user.businessCountData,
        businessActiveCount: user.businessActiveCountData,
        userProfile: user.userProfileData,
        accountStatusData: user.accountStatusData,
        facebookConnected:
          !!user.businessProfileData.profile?.facebook_ad_account_id &&
          !!user.businessProfileData.profile?.facebook_ad_account_name,
        tiktokConnected:
          !!user.businessProfileData.profile?.tik_tok_ad_account_id &&
          !!user.businessProfileData.profile?.tik_tok_ad_account_name,
        googleConnected:
          !!user.businessProfileData.profile?.google_ad_account_id &&
          !!user.businessProfileData.profile?.google_ad_accessToken,
        shopifyConnected:
          !!user.businessProfileData.profile?.shopify_script_tag_id,
        allSocialMediaAccountsDisconnected:
          user.businessProfileData.profile?.facebook_accessToken === null &&
          user.businessProfileData.profile?.tik_tok_access_token === null &&
          user.businessProfileData.profile?.google_ad_accessToken === null,
        allAdsAccountsDisconnected:
          user.businessProfileData.profile?.facebook_ad_account_name === null &&
          user.businessProfileData.profile?.tik_tok_ad_account_name === null &&
          user.businessProfileData.profile?.google_ad_accessToken === null,
        previousConnected: {
          facebook:
            user.businessProfileData?.profile?.facebook_accessToken !== null ||
            user.businessProfileData.profile?.facebook_ad_account_id !== null,
          tiktok:
            user.businessProfileData?.tik_tok_access_token !== null ||
            user.businessProfileData.profile?.tik_tok_ad_account_id !== null,
          google:
            user.businessProfileData.profile?.google_ad_account_id !== null ||
            user.businessProfileData.profile?.google_ad_accessToken !== null,
        },
      });
    }

    return { ...user };
  }
  return {
    platformMode: savedUserDetails.platformMode,
    userProfileData: savedUserDetails.userProfile,
    accountStatusData: savedUserDetails.accountStatusData,
    businessListData: savedUserDetails.businessList,
    businessCountData: savedUserDetails.businessCount,
    businessActiveCountData: savedUserDetails.businessActiveCount,
    selectedBusinessData: savedUserDetails.selectedBusiness,
    businessProfileData: savedUserDetails.businessProfile,
    businessConnections: {
      facebook_ad_account_id:
        savedUserDetails.businessProfile.profile?.facebook_ad_account_id,
      facebook_ad_account_name:
        savedUserDetails.businessProfile.profile?.facebook_ad_account_name,
      tik_tok_ad_account_id:
        savedUserDetails.businessProfile.profile?.tik_tok_ad_account_id,
      tik_tok_ad_account_name:
        savedUserDetails.businessProfile.profile?.tik_tok_ad_account_name,
      script_installed:
        savedUserDetails.businessProfile.profile?.script_installed,
      shopify_script_tag_id:
        savedUserDetails.businessProfile.profile?.shopify_script_tag_id,
      shopify_store:
        savedUserDetails.businessProfile.profile?.shopify_store_url,
    },
  } as UserDetailsPrisma;
}
