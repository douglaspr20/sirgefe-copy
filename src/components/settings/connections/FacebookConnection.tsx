import { FC, useEffect, useRef, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as Sentry from '@sentry/nextjs';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import {
  removeFacebookAdAccount,
  removeFacebookUserAccess,
  setFacebookAdAccount,
  setFacebookUserAccess,
} from '@graphql/mutations';
import {
  getFacebookAdAccounts,
  getUserFacebookAccount,
} from '@graphql/queries';
import ConnectClip from '@assets/icons/ConnectClip';
import FacebookIcon from '@assets/icons/FacebookIcon';
import WarningIcon from '@assets/img/warning-icon.svg';
import DisconnectClip from '@assets/icons/DisconnectClip';
import TailwindModal from '@components/modals/TailwindModal';
import DisconnectIntegration from '@components/modals/tailwindTypes/DisconnectIntegration';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';
import { Message } from '@components/modals/tailwindTypes';
import AdAccountModal from './ad-account-modal';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { useAsyncDataFetchContext } from '@providers/asyncDatafetchProvider';
import { useBusinessConnectionsContext } from '@providers/businessConnectionsProvider';
import Image from 'next/image';
import { usePopper } from 'react-popper';
import Popover from '@components/Popover';
import SocialButton from '@components/Integrations/SocialButton';
import business from '@components/Business';

const FacebookConnection: FC = () => {
  const { selectedBusiness, updateProfileInApp, businessProfile } =
    useBusinessProfileContext();

  const { triggerFetch } = useAsyncDataFetchContext();

  const { setFacebookConnected } = useBusinessConnectionsContext();

  const disconnectModalRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );

  const [connectionStatus, setConnectionStatus] = useState(true);

  const [loadingAds, setLoadingAds] = useState<boolean>(false);

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: '',
  });

  const [isSending, setIsSending] = useState<boolean>(false);

  const [selectedAd, setSelectedAd] = useState<string>();

  const [facebookAccountState, setFacebookAccountState] = useState<
    | {
        accessToken: string;
        id: string;
        name: string;
      }
    | undefined
  >(undefined);

  const [facebookAds, setFacebookAds] = useState<
    {
      id: string;
      name: string;
      currency: string;
    }[]
  >([]);

  const [displayFbPopover, setDisplayFbPopover] = useState<boolean>(false);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {});

  const FB_HOST = process.env.NEXT_PUBLIC_FB_HOST as string;

  const getUserAds = async (type: string) => {
    setLoadingAds(true);
    if (type === 'fb') {
      const response: any = await API.graphql(
        graphqlOperation(getFacebookAdAccounts, {
          getFacebookAdAccountsInput: {
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      const facebookAdAccounts = response.data.getFacebookAdAccounts;

      if (facebookAdAccounts.error) {
        setDialogOptions({
          message: facebookAdAccounts.error.message,
          type: 'error',
        });
        responseModalButtonRef.current?.click();

        return;
      }

      if (facebookAdAccounts.data.length > 0) {
        setSelectedAd(facebookAdAccounts.data[0].id);
        setFacebookAds(facebookAdAccounts.data);
      }
    }

    setLoadingAds(false);
  };

  const getAccountInfo = async (facebook_accessToken: string) => {
    const fbAccountResponse: any = await API.graphql(
      graphqlOperation(getUserFacebookAccount, {
        getUserFacebookAccountInput: {
          facebook_accessToken: facebook_accessToken,
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const fbAccountData = fbAccountResponse.data.getUserFacebookAccount;

    if (fbAccountData.error) {
      return '';
    }

    return fbAccountData.data;
  };

  const facebookLoginCallback = async (facebookResponse: any) => {
    try {
      const accessToken = facebookResponse.token.accessToken;
      const userId = facebookResponse.profile.id;

      if (!accessToken) {
        throw new Error(facebookResponse.error ?? 'Facebook auth failed');
      }

      await API.graphql(
        graphqlOperation(setFacebookUserAccess, {
          facebookAccessInput: {
            facebook_userID: userId,
            facebook_accessToken: accessToken,
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      updateProfileInApp({ facebook_accessToken: accessToken });

      const { name: fbname } = await getAccountInfo(accessToken);

      setDialogOptions({
        message: 'Facebook connected',
        type: 'success',
      });

      setFacebookAccountState({
        accessToken: accessToken,
        id: userId,
        name: fbname,
      });
      setConnectionStatus(true);
      responseModalButtonRef.current?.click();
    } catch (error: any) {
      setConnectionStatus(false);
      disconnectModalRef?.current?.click();
      Sentry.captureException(new Error(error as any));
    }
  };

  const removeFacebookIntegration = async () => {
    try {
      if (facebookAccountState?.id) {
        await fetch(`${FB_HOST}/${facebookAccountState?.id}/permissions`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_token: facebookAccountState?.accessToken,
          }),
        });
      }
      await API.graphql(
        graphqlOperation(removeFacebookUserAccess, {
          businessIdInput: {
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      updateProfileInApp({ facebook_accessToken: null });

      setConnectionStatus(false);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const connectFacebookAdAccount = async () => {
    setIsSending(true);
    const fintAdAccount = facebookAds.find((item) => item.id === selectedAd);

    const response: any = await API.graphql(
      graphqlOperation(setFacebookAdAccount, {
        setFacebookAdAccountInput: {
          business_id: selectedBusiness?.business_id,
          facebook_ad_account_currency: fintAdAccount?.currency,
          facebook_ad_account_id: fintAdAccount?.id,
          facebook_ad_account_name: fintAdAccount?.name,
        },
      }),
    );

    const data = response.data.setFacebookAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Account Connected',
      });
      updateProfileInApp({
        facebook_ad_account_currency: fintAdAccount?.currency,
        facebook_ad_account_id: fintAdAccount?.id,
        facebook_ad_account_name: fintAdAccount?.name,
      });

      if (selectedBusiness) {
        triggerFetch(selectedBusiness.business_id);
      }
      setFacebookConnected(true);
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  const disconnectFacebookAdAccount = async () => {
    setIsSending(true);
    const response: any = await API.graphql(
      graphqlOperation(removeFacebookAdAccount, {
        removeFacebookAdAccountInput: {
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const data = response.data.removeFacebookAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Ad Account Disconnected',
      });

      updateProfileInApp({
        facebook_ad_account_currency: null,
        facebook_ad_account_id: null,
        facebook_ad_account_name: null,
      });
      setFacebookConnected(false);
    } else {
      setDialogOptions({
        type: 'error',
        message: data.error.message,
      });
    }

    responseModalButtonRef.current?.click();

    setIsSending(false);
  };

  useEffect(() => {
    if (businessProfile?.profile?.facebook_accessToken) {
      const getFacebookInfo = async () => {
        const facebookInfo = await getAccountInfo(
          businessProfile?.profile?.facebook_accessToken as string,
        );

        setFacebookAccountState({
          accessToken: businessProfile?.profile?.facebook_accessToken as string,
          id: facebookInfo.id,
          name: facebookInfo.name,
        });

        setConnectionStatus(true);
      };

      getFacebookInfo();
    } else {
      setConnectionStatus(false);
    }
  }, [businessProfile?.profile?.facebook_accessToken]);

  return (
    <>
      <div className="flex py-3 mb-3 items-center justify-between border-bottom-darkgrey">
        <div className="flex items-center">
          <FacebookIcon width={30} height={30} />
          <div className="ml-2">
            <h2 className="h5">Facebook Account</h2>
            {connectionStatus === true && (
              <span>{facebookAccountState?.name}</span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {connectionStatus === true ? (
            <button
              className="link inline-flex items-center font-medium"
              data-bs-toggle="modal"
              data-bs-target="#disconnectFacebookModal"
            >
              <DisconnectClip />
              Disconnect
            </button>
          ) : (
            <SocialButton
              className="link inline-flex items-center font-medium"
              provider="facebook"
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
              onLoginSuccess={facebookLoginCallback}
              onLoginFailure={(error) => console.log(error)}
              autoLoad={false}
              fields="name"
              scope="public_profile,ads_read,ads_management"
            >
              <ConnectClip />
              Connect
            </SocialButton>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-textSecondaryColor">Ad Account</p>
        <div className="flex items-center justify-between w-full px-2">
          <p className="inline-flex items-center font-medium text-darkGrade50">
            {' '}
            <i className="icon-facebook_b_w text-2xl mr-2" />{' '}
            <span>{businessProfile.profile?.facebook_ad_account_name}</span>
            {(!connectionStatus ||
              !businessProfile.profile?.facebook_ad_account_id) && (
              <div className="flex">
                <div className="relative mt-1">
                  {businessProfile.profile?.facebook_ad_account_name && (
                    <span
                      className="inline-flex shrink-0 w-[14px] h-[14px] ml-1"
                      onMouseEnter={() => setDisplayFbPopover(true)}
                      onMouseLeave={() => setDisplayFbPopover(false)}
                      ref={setReferenceElement}
                    >
                      <Image src={WarningIcon} alt="warning" />
                    </span>
                  )}

                  <div
                    ref={setPopperElement}
                    className={`${
                      displayFbPopover
                        ? 'popover visible'
                        : 'popover visually-hidden'
                    }`}
                    style={{
                      ...styles.popper,
                      width: '200px',
                      top: '-95px',
                    }}
                    {...attributes.popper}
                  >
                    <Popover
                      title={'Account Disconnected'}
                      content={`Please Connect It Again To Continue Tracking`}
                      customClassPopoverBody={{ padding: 0 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </p>

          {connectionStatus &&
          businessProfile.profile?.facebook_ad_account_id ? (
            <button
              className="inline-flex items-center font-medium text-darkGrade50"
              onClick={disconnectFacebookAdAccount}
            >
              <DisconnectClip width={17} height={14} fill="#A1B3C4" />
              Disconnect
            </button>
          ) : (
            <button
              className="inline-flex items-center font-medium text-darkGrade50"
              data-bs-toggle="modal"
              data-bs-target="#addListModal"
              disabled={connectionStatus === false}
              onClick={() => getUserAds('fb')}
            >
              <ConnectClip width={17} height={14} fill="#A1B3C4" />
              Connect
            </button>
          )}
        </div>
      </div>

      <TailwindModal id="disconnectFacebookModal">
        <DisconnectIntegration
          connectionStatus={connectionStatus}
          handler={removeFacebookIntegration}
          type={'facebook'}
        />
      </TailwindModal>

      <div
        ref={disconnectModalRef}
        data-bs-toggle="modal"
        data-bs-target="#failedFbIntegration"
      />
      <TailwindModal id="failedFbIntegration">
        <FailedIntegration type={'Facebook'} />
      </TailwindModal>

      <TailwindModal id="successFacebookModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <TailwindModal id="addListModal">
        <AdAccountModal
          title={'Facebook ad'}
          type={'fb'}
          facebookAds={facebookAds}
          selectedAd={selectedAd as string}
          isSending={isSending}
          loadingAds={loadingAds}
          setSelectedAd={setSelectedAd}
          connectFacebookAdAccount={connectFacebookAdAccount}
        />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successFacebookModal"
        ref={responseModalButtonRef}
      />
    </>
  );
};

export default FacebookConnection;
