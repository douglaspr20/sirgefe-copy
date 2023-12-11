'use client';

import { UserDetailsPrisma } from '@interfaces/userDetails';
import { useBoundStore } from '@store/index';
import { useEffect, useRef } from 'react';

interface Props {
  user: UserDetailsPrisma;
}

// initialize the user details store on the client side
export default function CreateStoreClientSide({ user }: Props) {
  const ref = useRef({ initialize: false });

  useEffect(() => {
    if (!ref.current.initialize) {
      useBoundStore.setState({
        businessProfile: user.businessProfileData,
        businessList: user.businessListData,
        selectedBusiness: user.businessListData[0],
        businessCount: user.businessCountData,
        businessActiveCount: user.businessActiveCountData,
        userProfile: user.userProfileData,
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
        isSidebarOpen: JSON.parse(
          localStorage.getItem('openSidebar') || 'false',
        ),
      });
      ref.current.initialize = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
