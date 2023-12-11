'use client';
import { UserDetailsPrisma } from '@interfaces/userDetails';
// import { fetchUserDetails } from '_auth/fetchUserDetails.server';
import AppWrapper from '_components/AppWrapper';
import ValidateUser from '_auth/ValidateUser.client';
import { useEffect, useState } from 'react';
import fetchCurrentUserDetails from 'api/fetchCurrentUserDetails';
import { API } from 'aws-amplify';
import { useBoundStore } from '@store/index';
import { BusinessPrisma } from 'API';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { businessVanityName: string };
}) {
  const [userDetails, setUserDetails] = useState<UserDetailsPrisma>();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const businessVanityName = queryParams.get('businessVanityName');
    const fetch = async () => {
      const user = await fetchCurrentUserDetails(
        { API },
        businessVanityName as string,
      );
      const userDetail = {
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
      };
      useBoundStore.setState(userDetail);
      setUserDetails(user as UserDetailsPrisma);
    };

    fetch();
  }, []);

  return (
    <div>
      {/* MAIN APP */}
      {userDetails && (
        <AppWrapper userDetails={userDetails as UserDetailsPrisma}>
          {children}
        </AppWrapper>
      )}

      <ValidateUser />
    </div>
  );
}
