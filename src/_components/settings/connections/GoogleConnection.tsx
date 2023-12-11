'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import TailwindModal from '_components/modals/TailwindModal';
import FailedIntegration from '_components/modals/tailwindTypes/FailedIntegration';
import ConnectClip from '@assets/icons/ConnectClip';
import Message from '_components/modals/tailwindTypes/Message';
import AdAccountModal from './ad-account-modal';
import Image from 'next/image';
import GoogleLoginButton from './googleLogin';
import { API, graphqlOperation } from 'aws-amplify';
import {
  getBusinessGoogleNewToken,
  getSocialAdAccounts,
} from '@graphql/queries';
import {
  removeSocialAdAccount,
  removeSocialUserAccess,
  setSocialAdAccount,
  setSocialUserAccess,
} from '@graphql/mutations';
import DisconnectClip from '@assets/icons/DisconnectClip';
import { getGoogleAccountInfo } from '@utils/google';
import * as Sentry from '@sentry/nextjs';
import DisconnectIntegration from '_components/modals/tailwindTypes/DisconnectIntegration';
import { GoogleCustomer } from '../../../API';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useBoundStore } from '@store/index';

export type GoogleAdAccount = {
  name: string;
  id: string;
};

const GoogleConnection = () => {
  const {
    selectedBusiness,
    socialConfig,
    // setSocialConfig,
    dialogOptions,
    setDialogOptions,
    triggerFetch,
    setGoogleConnected,
    userProfile,
  } = useBoundStore((state) => state);

  const disconnectModalRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const [selectedAdAccount, setSelectedAdAccount] = useState<string>();
  const [loadingAdAccounts, setLoadingAdAccounts] = useState<boolean>(false);
  const [googleAdAccounts, setGoogleAdAccounts] = useState<GoogleAdAccount[]>(
    [],
  );
  const [isSending, setIsSending] = useState<boolean>(false);
  const [googleAccountName, setGoogleAccountName] = useState<string>('');
  const [loadGoogleLogin, setLoadGoogleLogin] = useState<boolean>(false);

  const handleGoogleAccountInfo = useCallback(async () => {
    const newToken: any = await API.graphql(
      graphqlOperation(getBusinessGoogleNewToken, {
        getBusinessNewTokenInput: {
          business_id: selectedBusiness?.id,
        },
      }),
    );

    const googleAccountInfo = await getGoogleAccountInfo(
      newToken.data.getBusinessGoogleNewToken.data,
    );
    setGoogleAccountName(googleAccountInfo?.name || '');
  }, [selectedBusiness?.id]);

  useEffect(() => {
    if (socialConfig.google?.access_token) {
      handleGoogleAccountInfo();
    }
  }, [socialConfig?.google?.access_token, handleGoogleAccountInfo]);

  /**
   * list ads
   */
  const getUserAdAccounts = async () => {
    setLoadingAdAccounts(true);

    const response: any = await API.graphql(
      graphqlOperation(getSocialAdAccounts, {
        getSocialAdAccountsInput: {
          business_id: selectedBusiness?.id,
          platform: 'google',
        },
      }),
    );

    const googleAdsData = response.data.getBusinessGoogleAccounts;

    if (googleAdsData?.error) {
      setDialogOptions({
        message: googleAdsData.error?.message,
        type: 'error',
      });
      responseModalButtonRef.current?.click();

      setLoadingAdAccounts(false);

      return;
    }

    if (googleAdsData.data.error) {
      setDialogOptions({
        message: googleAdsData.data.error.message,
        type: 'error',
      });
      responseModalButtonRef.current?.click();

      return;
    }

    if (googleAdsData.data.length > 0) {
      const parseData = googleAdsData.data.map((item: GoogleCustomer) => {
        const ad = item.resourceName.split('/');
        return {
          name: item.descriptiveName,
          id: ad[1],
        };
      });

      setSelectedAdAccount(parseData[0].id);
      setGoogleAdAccounts(parseData);
    }

    setLoadingAdAccounts(false);
  };

  /**
   * connect ads
   */

  const connectGoogleAdAccount = async () => {
    setIsSending(true);
    const adAccount = googleAdAccounts.find(
      (item) => item.id === selectedAdAccount,
    );

    const response: any = await API.graphql(
      graphqlOperation(setSocialAdAccount, {
        setSocialAdAccountInput: {
          business_id: selectedBusiness?.id,
          platform: 'google',
          ad_account_id: adAccount?.id,
        },
      }),
    );

    const data = response.data.setBusinessGoogleAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Account Connected',
      });

      // setSocialConfig(MarketingSources.GOOGLE, {
      //   ...socialConfig.google,
      //   social_account_id: adAccount?.id,
      // } as AdAccountSettingsPrisma);

      if (selectedBusiness) {
        triggerFetch(selectedBusiness.id);
      }
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  /**
   * Connect Google
   */
  const googleLoginCallback = async (googleResponse: any) => {
    setLoadGoogleLogin(true);
    try {
      if (!googleResponse.code) {
        throw new Error('Google auth failed');
      }

      const response: any = await API.graphql(
        graphqlOperation(setSocialUserAccess, {
          socialAccessStoreInput: {
            user_id: userProfile?.id || '',
            business_id: selectedBusiness?.id,
            access_token: googleResponse.code,
            platform: 'google',
          },
        }),
      );

      const data = response.data.setBusinessGoogleAccessToken;

      if (data.error) {
        throw new Error(data.error.message);
      }

      // setSocialConfig(MarketingSources.GOOGLE, {
      //   ...socialConfig.google,
      //   access_token: businessData.data.google_ad_accessToken,
      // } as AdAccountSettingsPrisma);

      const googleAccountInfo = await getGoogleAccountInfo(
        socialConfig.google.access_token || '',
      );

      setGoogleAccountName(googleAccountInfo.name);

      setDialogOptions({
        type: 'success',
        message: 'Google connected',
      });

      responseModalButtonRef.current?.click();
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message,
      });
      disconnectModalRef?.current?.click();
      Sentry.captureException(new Error(error as any));
    }

    setLoadGoogleLogin(false);
  };

  /**
   * disconnect google
   */
  const handleDisconnectGoogleIntegration = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(removeSocialAdAccount, {
          removeSocialAdAccountInput: {
            business_id: selectedBusiness?.id,
            platform: 'facebook',
          },
        }),
      );

      const data = response.data.disconnectBusinessGoogle;

      if (data.error) {
        throw new Error(data.error.message);
      }

      setGoogleConnected(false);

      if (selectedBusiness) {
        // setSocialConfig(MarketingSources.GOOGLE, {
        //   ...socialConfig.google,
        //   access_token: '',
        // } as AdAccountSettingsPrisma);

        setDialogOptions({
          type: 'success',
          message: 'Google  Account Disconnected',
        });
      }
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message,
      });
      Sentry.captureException(error);
    } finally {
      responseModalButtonRef.current?.click();
    }
  };

  /** disconnect ad account */
  const handleDisconnectGoogleAdAccount = async () => {
    setIsSending(true);

    const response: any = await API.graphql(
      graphqlOperation(removeSocialUserAccess, {
        disconnectBusinessGoogleInput: {
          business_id: selectedBusiness?.id,
          platform: 'google',
        },
      }),
    );

    const data = response.data.disconnectBusinessGoogleAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Ad Account Disconnected',
      });

      setGoogleConnected(false);

      if (selectedBusiness?.id) {
        // setSocialConfig(MarketingSources.GOOGLE, {
        //   ...socialConfig.google,
        //   social_account_id: '',
        // } as AdAccountSettingsPrisma);
      }
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  return (
    <>
      <div className="flex py-3 mb-3 items-center justify-between border-bottom-darkgrey">
        <div className="flex items-center">
          <Image src="/images/google.svg" width={30} height={30} alt="google" />
          <div className="ml-2">
            <h2 className="h5 ">Google Account</h2>
            {socialConfig?.google?.access_token && (
              <span>{googleAccountName}</span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <GoogleLoginButton
              handleLogin={googleLoginCallback}
              google_ad_accessToken={!!socialConfig?.google?.access_token}
              loading={loadGoogleLogin}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-textSecondaryColor mb-1">Ad Account</p>

        <div className="flex items-center justify-between w-full px-2">
          <p className="inline-flex items-center font-medium text-darkGrade50">
            <Image
              src="/images/google-ad-icon.svg"
              width={25}
              height={25}
              alt="google-ad"
            />
            <span className="ml-1">
              {socialConfig?.google?.social_account_id || 'Not Connected'}
            </span>
          </p>
          {socialConfig?.google?.social_account_id &&
          socialConfig?.google?.access_token ? (
            <button
              className="inline-flex items-center font-medium text-darkGrade50"
              onClick={() => handleDisconnectGoogleAdAccount()}
            >
              <DisconnectClip width={17} height={14} fill="#A1B3C4" />
              Disconnect
            </button>
          ) : (
            <button
              className="inline-flex items-center font-medium text-darkGrade50"
              data-bs-toggle="modal"
              data-bs-target="#addListModalGoogle"
              onClick={() =>
                socialConfig?.google?.access_token && getUserAdAccounts()
              }
              disabled={!socialConfig?.google?.access_token}
            >
              <ConnectClip width={17} height={14} fill="#A1B3C4" />
              Connect
            </button>
          )}
        </div>
      </div>

      <TailwindModal id="disconnectGoogleModal">
        <DisconnectIntegration
          connectionStatus={!!socialConfig?.google?.access_token}
          type={'google'}
          handler={handleDisconnectGoogleIntegration}
        />
      </TailwindModal>

      <div
        ref={disconnectModalRef}
        data-bs-toggle="modal"
        data-bs-target="#failedGoogleIntegration"
      />

      <TailwindModal id="addListModalGoogle">
        <AdAccountModal
          title={'Google ads'}
          type={'google'}
          googleAds={googleAdAccounts}
          selectedAd={selectedAdAccount as string}
          isSending={isSending}
          loadingAds={loadingAdAccounts}
          setSelectedAd={setSelectedAdAccount}
          connectGoogleAdAccount={connectGoogleAdAccount}
        />
      </TailwindModal>

      <TailwindModal id="failedGoogleIntegration">
        <FailedIntegration type={'Google'} />
      </TailwindModal>

      <TailwindModal id="successGoogleModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successGoogleModal"
        ref={responseModalButtonRef}
      />
    </>
  );
};

export default GoogleConnection;
