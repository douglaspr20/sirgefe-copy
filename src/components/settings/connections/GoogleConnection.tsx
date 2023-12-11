import { useCallback, useEffect, useRef, useState } from 'react';

import { useBusinessProfileContext } from '@providers/businessProfileProvider';

import TailwindModal from '@components/modals/TailwindModal';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';
import ConnectClip from '@assets/icons/ConnectClip';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import AdAccountModal from './ad-account-modal';
import Image from 'next/image';
import GoogleLoginButton from './googleLogin';
import { API, graphqlOperation } from 'aws-amplify';
import {
  getBusinessByVanityName,
  getBusinessGoogleAccounts,
  getBusinessGoogleNewToken,
} from '@graphql/queries';
import {
  disconnectBusinessGoogle,
  disconnectBusinessGoogleAccount,
  setBusinessGoogleAccessToken,
  setBusinessGoogleAdAccount,
} from '@graphql/mutations';
import { useAsyncDataFetchContext } from '@providers/asyncDatafetchProvider';
import DisconnectClip from '@assets/icons/DisconnectClip';
import { getGoogleAccountInfo } from '@utils/google';
import * as Sentry from '@sentry/nextjs';
import DisconnectIntegration from '@components/modals/tailwindTypes/DisconnectIntegration';
import { GoogleCustomer } from '../../../API';
import { useBusinessConnectionsContext } from '@providers/businessConnectionsProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

export type GoogleAdAccount = {
  name: string;
  id: string;
};

const GoogleConnection = () => {
  const { selectedBusiness, updateProfileInApp, businessProfile } =
    useBusinessProfileContext();

  const { triggerFetch } = useAsyncDataFetchContext();

  const { setGoogleConnected } = useBusinessConnectionsContext();

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

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: '',
  });

  const handleGoogleAccountInfo = useCallback(async () => {
    const newToken: any = await API.graphql(
      graphqlOperation(getBusinessGoogleNewToken, {
        getBusinessNewTokenInput: {
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const googleAccountInfo = await getGoogleAccountInfo(
      newToken.data.getBusinessGoogleNewToken.data,
    );
    setGoogleAccountName(googleAccountInfo?.name || '');
  }, [selectedBusiness?.business_id]);

  useEffect(() => {
    if (businessProfile.profile?.google_ad_accessToken) {
      handleGoogleAccountInfo();
    }
  }, [businessProfile.profile?.google_ad_accessToken, handleGoogleAccountInfo]);

  /**
   * list ads
   */
  const getUserAdAccounts = async () => {
    setLoadingAdAccounts(true);

    const response: any = await API.graphql(
      graphqlOperation(getBusinessGoogleAccounts, {
        getBusinessGoogleAccountsInput: {
          business_id: selectedBusiness?.business_id,
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
      graphqlOperation(setBusinessGoogleAdAccount, {
        setGoogleAdAccountInput: {
          business_id: selectedBusiness?.business_id,
          google_ad_account_id: adAccount?.id,
        },
      }),
    );

    const data = response.data.setBusinessGoogleAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Account Connected',
      });

      updateProfileInApp({
        google_ad_account_id: adAccount?.id,
      });

      if (selectedBusiness) {
        triggerFetch(selectedBusiness.business_id);
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
        graphqlOperation(setBusinessGoogleAccessToken, {
          googleAccessInput: {
            business_id: selectedBusiness?.business_id,
            google_authCode: googleResponse.code,
          },
        }),
      );

      const data = response.data.setBusinessGoogleAccessToken;

      if (data.error) {
        throw new Error(data.error.message);
      }

      const businessResponse: any = await API.graphql(
        graphqlOperation(getBusinessByVanityName, {
          getBusinessByVanityNameInput: {
            vanity_name: selectedBusiness?.vanity_name,
          },
        }),
      );

      const businessData = businessResponse.data.getBusinessByVanityName;

      if (businessData.error) {
        throw new Error('Something went wrong');
      }

      updateProfileInApp({
        google_ad_accessToken: businessData.data.google_ad_accessToken,
      });

      const googleAccountInfo = await getGoogleAccountInfo(
        businessData.data.google_ad_accessToken,
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
        graphqlOperation(disconnectBusinessGoogle, {
          disconnectBusinessGoogleInput: {
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      const data = response.data.disconnectBusinessGoogle;

      if (data.error) {
        throw new Error(data.error.message);
      }

      setGoogleConnected(false);

      if (selectedBusiness) {
        updateProfileInApp({
          google_ad_accessToken: '',
        });

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
      graphqlOperation(disconnectBusinessGoogleAccount, {
        disconnectBusinessGoogleInput: {
          business_id: selectedBusiness?.business_id,
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

      if (selectedBusiness?.business_id) {
        updateProfileInApp({
          google_ad_account_id: '',
        });
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
            {businessProfile.profile?.google_ad_accessToken && (
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
              google_ad_accessToken={
                !!businessProfile.profile?.google_ad_accessToken
              }
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
              {businessProfile.profile?.google_ad_account_id}
            </span>
          </p>
          {businessProfile.profile?.google_ad_account_id &&
          businessProfile.profile?.google_ad_accessToken ? (
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
                businessProfile.profile?.google_ad_accessToken &&
                getUserAdAccounts()
              }
              disabled={!businessProfile.profile?.google_ad_accessToken}
            >
              <ConnectClip width={17} height={14} fill="#A1B3C4" />
              Connect
            </button>
          )}
        </div>
      </div>

      <TailwindModal id="disconnectGoogleModal">
        <DisconnectIntegration
          connectionStatus={!!businessProfile.profile?.google_ad_accessToken}
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
