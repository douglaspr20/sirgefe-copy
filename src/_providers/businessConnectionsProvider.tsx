'use client';
import { BusinessConnections } from '@sirge-io/sirge-types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useBusinessProfileContext } from './businessProfileProvider';

type BusinessConnectionsContextType = {
  facebook_ad_account_id: string;
  facebook_ad_account_name: string;
  tik_tok_ad_account_id: string;
  tik_tok_ad_account_name: string;
  shopify_script_tag_id: string;
  facebookConnected: boolean;
  facebookIntegration: string;
  tiktokConnected: boolean;
  shopifyConnected: boolean;
  isLoadingConnection: boolean;
  googleConnected: boolean;
  allSocialMediaAccountsDisconnected: boolean;
  allAdsAccountsDisconnected: boolean;
  previousConnected: PreviousConnectedProp;
  setFacebookConnected: Dispatch<SetStateAction<boolean>>;
  setTiktokConnected: Dispatch<SetStateAction<boolean>>;
  setGoogleConnected: Dispatch<SetStateAction<boolean>>;
  setFacebookIntegration: Dispatch<SetStateAction<string>>;
};

type BusinessConnectionsProviderProps = {
  children: ReactNode;
  connectionDetails: BusinessConnections;
};

export type PreviousConnectedProp = {
  facebook: boolean | null;
  tiktok: boolean | null;
  google: boolean | null;
};

export const BusinessConnectionsContext = createContext(
  {} as BusinessConnectionsContextType,
);

export const useBusinessConnectionsContext = () =>
  useContext(BusinessConnectionsContext);

export const BusinessConnectionsProvider = ({
  children,
}: BusinessConnectionsProviderProps) => {
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [previousConnected, setPreviousConnected] =
    useState<PreviousConnectedProp>({
      facebook: null,
      tiktok: null,
      google: null,
    });
  const [facebookIntegration, setFacebookIntegration] = useState('');
  const [
    allSocialMediaAccountsDisconnected,
    setAllSocialMediaAccountsDisconnected,
  ] = useState(false);

  const [allAdsAccountsDisconnected, setAllAdsAccountsDisconnected] =
    useState(false);

  const [isLoadingConnection, setIsLoadingConnection] = useState(true);

  const { selectedBusiness, userProfile, businessProfile } =
    useBusinessProfileContext();

  useEffect(() => {
    setFacebookConnected(
      !!businessProfile?.profile?.facebook_ad_account_id &&
        !!businessProfile?.profile?.facebook_ad_account_name,
    );
    setTiktokConnected(
      !!selectedBusiness?.tik_tok_access_token &&
        !!businessProfile?.profile?.tik_tok_ad_account_id,
    );
    setShopifyConnected(!!businessProfile.profile?.shopify_script_tag_id);
    setFacebookIntegration(
      businessProfile?.profile?.facebook_accessToken ? 'true' : '',
    );
    setIsLoadingConnection(false);

    setGoogleConnected(
      !!businessProfile.profile?.google_ad_account_id &&
        !!businessProfile.profile?.google_ad_accessToken,
    );

    setAllSocialMediaAccountsDisconnected(
      businessProfile?.profile?.facebook_accessToken === null &&
        selectedBusiness?.tik_tok_access_token === null &&
        businessProfile.profile?.google_ad_accessToken === null,
    );

    setAllAdsAccountsDisconnected(
      businessProfile.profile?.facebook_ad_account_id === null &&
        businessProfile.profile?.facebook_ad_account_name === null &&
        businessProfile.profile?.tik_tok_ad_account_id === null &&
        businessProfile.profile?.google_ad_accessToken === null,
    );

    setPreviousConnected({
      facebook:
        businessProfile?.profile?.facebook_accessToken !== null ||
        businessProfile.profile?.facebook_ad_account_id !== null,
      tiktok:
        selectedBusiness?.tik_tok_access_token !== null ||
        businessProfile.profile?.tik_tok_ad_account_id !== null,
      google:
        businessProfile.profile?.google_ad_account_id !== null ||
        businessProfile.profile?.google_ad_accessToken !== null,
    });
  }, [
    businessProfile?.profile?.facebook_ad_account_id,
    businessProfile?.profile?.facebook_ad_account_name,
    businessProfile?.profile?.google_ad_accessToken,
    businessProfile?.profile?.google_ad_account_id,
    businessProfile?.profile?.shopify_script_tag_id,
    businessProfile?.profile?.tik_tok_ad_account_id,
    selectedBusiness?.tik_tok_access_token,
    userProfile?.facebook_accessToken,
  ]);

  return (
    <BusinessConnectionsContext.Provider
      value={{
        facebook_ad_account_id:
          businessProfile?.profile?.facebook_ad_account_id || '',
        facebook_ad_account_name:
          businessProfile?.profile?.facebook_ad_account_name || '',
        tik_tok_ad_account_id: selectedBusiness?.tik_tok_ad_account_id || '',
        tik_tok_ad_account_name:
          businessProfile?.profile?.tik_tok_ad_account_name || '',
        shopify_script_tag_id:
          businessProfile?.profile?.shopify_script_tag_id || '',
        facebookConnected,
        facebookIntegration,
        tiktokConnected,
        shopifyConnected,
        isLoadingConnection,
        setFacebookConnected,
        googleConnected,
        setTiktokConnected,
        setFacebookIntegration,
        setGoogleConnected,
        allAdsAccountsDisconnected,
        allSocialMediaAccountsDisconnected,
        previousConnected,
      }}
    >
      {children}
    </BusinessConnectionsContext.Provider>
  );
};
