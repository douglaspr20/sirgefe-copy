import { useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import { API, graphqlOperation } from 'aws-amplify';
import {
  authenticateTikTok,
  disconnectBusinessTiktok,
  disconnectTikTok,
  setTiktokAdAccount,
} from 'graphql/mutations';
import TailwindModal from '@components/modals/TailwindModal';
import DisconnectIntegration from '@components/modals/tailwindTypes/DisconnectIntegration';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';
import ConnectClip from '@assets/icons/ConnectClip';
import TikTokIcon2 from '@assets/icons/TikTokIcon2';
import WarningIcon from '@assets/img/warning-icon.svg';
import DisconnectClip from '@assets/icons/DisconnectClip';
import { getUserTiktokAds } from '@graphql/queries';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import { usePopper } from 'react-popper';
import Popover from '@components/Popover';
import AdAccountModal from './ad-account-modal';
import { useBusinessConnectionsContext } from '@providers/businessConnectionsProvider';
import { useAsyncDataFetchContext } from '@providers/asyncDatafetchProvider';

const TikTokConnection = () => {
  const {
    updateProfileInApp,
    selectedBusiness,
    updateBusinessAdAccount,
    businessProfile,
  } = useBusinessProfileContext();

  const { triggerFetch } = useAsyncDataFetchContext();

  const { setTiktokConnected } = useBusinessConnectionsContext();

  const [cookies, setCookie, removeCookie] = useCookies([
    'url_origin_tiktok_connection',
  ]);

  const disconnectModalRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const tikTokIntegrationStatus = !!selectedBusiness?.tik_tok_access_token;
  const [displayName, setDisplayName] = useState('');
  const [loadingAds, setLoadingAds] = useState<boolean>(false);
  const [selectedAd, setSelectedAd] = useState<string>();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [tiktokAds, setTiktokAds] = useState<
    {
      advertiser_id: string;
      advertiser_name: string;
    }[]
  >([]);

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: '',
  });

  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const [displayPopover, setDisplayPopover] = useState<boolean>(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {});

  const router = useRouter();

  useEffect(() => {
    const isTikTokIntegrationCalled =
      localStorage.getItem('is_tik_tok_integration_called') === 'true';
    const query = new URLSearchParams(window.location.search);

    const auth_code = query.get('auth_code');

    if (auth_code && !isTikTokIntegrationCalled) {
      localStorage.setItem('is_tik_tok_integration_called', 'true');
      connectTikTok(auth_code);
    } else if (tikTokIntegrationStatus) {
      fetchDisplayName(selectedBusiness?.tik_tok_access_token as string);
    }

    removeCookie('url_origin_tiktok_connection');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const fetchDisplayName = async (accessToken: string) => {
    try {
      const userProfileResponse = await fetch(
        `https://business-api.tiktok.com/open_api/v1.3/user/info/`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Token': accessToken,
          },
        },
      );

      const userProfile = await userProfileResponse.json();

      setDisplayName(userProfile?.data?.display_name ?? '');
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const connectTikTok = async (auth_code: string) => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(authenticateTikTok, {
          authenticateTikTokInput: {
            auth_code,
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      if (response.data.authenticateTikTok?.error) {
        throw new Error(response.data.authenticateTikTok?.error.message);
      }

      const accessToken = response.data.authenticateTikTok?.data;

      if (selectedBusiness) {
        updateBusinessAdAccount(selectedBusiness.business_id, {
          ...selectedBusiness,
          tik_tok_access_token: accessToken,
        });

        if (selectedBusiness) {
          setTimeout(() => {
            triggerFetch(selectedBusiness?.business_id);
          }, 1000);
        }
      }

      setDialogOptions({
        message: 'TikTok connected',
        type: 'success',
      });

      responseModalButtonRef.current?.click();
    } catch (error: any) {
      disconnectModalRef.current?.click();
      Sentry.captureException(error);
    }
  };

  const disconnectTikTokIntegration = async () => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(disconnectTikTok, {
          disconnectTikTokInput: {
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      if (response.data.disconnectTikTok.error) {
        setDialogOptions({
          type: 'error',
          message: 'Could not disconnect Tiktok account, something went wrong',
        });

        return responseModalButtonRef.current?.click();
      }

      if (selectedBusiness) {
        updateBusinessAdAccount(selectedBusiness.business_id, {
          ...selectedBusiness,
          tik_tok_access_token: null,
        });
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const tiktokConnectInit = () => {
    let url = '';
    url = `https://ads.tiktok.com/marketing_api/auth?app_id=${process.env.NEXT_PUBLIC_TIK_TOK_APP_ID}&state=${process.env.NEXT_PUBLIC_RELEASE_STAGE}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations&rid=${process.env.NEXT_PUBLIC_TIK_TOK_AUTH_RID}`;
    localStorage.removeItem('is_tik_tok_integration_called');
    setCookie(
      'url_origin_tiktok_connection',
      router.pathname.replace(
        '[businessVanityName]',
        selectedBusiness?.vanity_name as string,
      ),
    );
    window.open(url, '_self');
  };

  const getUserAds = async (type: string) => {
    setLoadingAds(true);
    if (type === 'tiktok') {
      const response: any = await API.graphql(
        graphqlOperation(getUserTiktokAds, {
          getUserTiktokAdsInput: {
            tik_tok_access_token: selectedBusiness?.tik_tok_access_token,
            business_id: selectedBusiness?.business_id,
          },
        }),
      );

      const tiktokAds = response.data.getUserTiktokAds;

      if (tiktokAds.error) {
        setDialogOptions({
          message: tiktokAds.error.message,
          type: 'error',
        });
        responseModalButtonRef.current?.click();

        return;
      }

      if (tiktokAds.data.length > 0) {
        setSelectedAd(tiktokAds.data[0].advertiser_id);
        setTiktokAds(tiktokAds.data);
      }
    }

    setLoadingAds(false);
  };

  const connectTiktokAdAccount = async () => {
    setIsSending(true);
    const fintAdAccount = tiktokAds.find(
      (item) => item.advertiser_id === selectedAd,
    );

    const response: any = await API.graphql(
      graphqlOperation(setTiktokAdAccount, {
        setTiktokAdAccountInput: {
          business_id: selectedBusiness?.business_id,
          tik_tok_ad_account_id: fintAdAccount?.advertiser_id,
          tik_tok_ad_account_name: fintAdAccount?.advertiser_name,
        },
      }),
    );

    const data = response.data.setTiktokAdAccount;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Account Connected',
      });

      updateProfileInApp({
        tik_tok_ad_account_id: fintAdAccount?.advertiser_id,
        tik_tok_ad_account_name: fintAdAccount?.advertiser_name,
      });
      if (selectedBusiness) {
        triggerFetch(selectedBusiness?.business_id);
      }

      setTiktokConnected(true);
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
   * Disconnect Tiktok
   */
  const disconnectTiktokAdAccount = async () => {
    setIsSending(true);

    const response: any = await API.graphql(
      graphqlOperation(disconnectBusinessTiktok, {
        disconnectBusinessTiktokInput: {
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const data = response.data.disconnectBusinessTiktok;

    if (!data.error) {
      setDialogOptions({
        type: 'success',
        message: 'Ad Account Disconnected',
      });

      if (selectedBusiness) {
        updateBusinessAdAccount(selectedBusiness.business_id, {
          ...selectedBusiness,
          tik_tok_ad_account_timezone: '',
        });
      }

      updateProfileInApp({
        tik_tok_ad_account_id: '',
        tik_tok_ad_account_name: '',
      });
      setTiktokConnected(false);
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
          <TikTokIcon2 />
          <div className="ml-2">
            <h2 className="h5 ">TikTok Business Account</h2>
            {tikTokIntegrationStatus === true && <span>{displayName}</span>}
          </div>
        </div>
        <div className="flex items-center">
          {tikTokIntegrationStatus ? (
            <button
              className="link inline-flex items-center font-medium"
              data-bs-toggle="modal"
              data-bs-target="#disconnectTikTokModal"
            >
              <DisconnectClip />
              Disconnect
            </button>
          ) : (
            <button
              className="link inline-flex items-center font-medium"
              onClick={tiktokConnectInit}
            >
              <ConnectClip />
              Connect
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-textSecondaryColor">Ad Account</p>
        <div className="flex items-center justify-between w-full px-2">
          <p className="inline-flex items-center font-medium text-darkGrade50">
            {' '}
            <i className="icon-tiktok text-2xl mr-1" />{' '}
            {businessProfile.profile?.tik_tok_ad_account_name}
            {!businessProfile.profile?.tik_tok_ad_account_id ||
            !tikTokIntegrationStatus ? (
              <div className="flex">
                <div className="relative mt-1">
                  <div>
                    <span
                      className="inline-flex shrink-0 w-[14px] h-[14px] ml-1"
                      onMouseEnter={() => setDisplayPopover(true)}
                      onMouseLeave={() => setDisplayPopover(false)}
                      ref={setReferenceElement}
                    >
                      <Image src={WarningIcon} alt="warning" />
                    </span>
                  </div>

                  <div
                    ref={setPopperElement}
                    className={`${
                      displayPopover
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
            ) : (
              <></>
            )}
          </p>

          {businessProfile.profile?.tik_tok_ad_account_id ? (
            <button
              className="inline-flex items-center font-medium text-darkGrade50"
              onClick={disconnectTiktokAdAccount}
            >
              <DisconnectClip width={17} height={14} fill="#A1B3C4" />
              Disconnect
            </button>
          ) : (
            <button
              className="inline-flex items-center font-medium text-darkGrade50 cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target="#addListModalTikTok"
              onClick={() => getUserAds('tiktok')}
            >
              <ConnectClip width={17} height={14} fill="#A1B3C4" />
              Connect
            </button>
          )}
        </div>
      </div>

      <TailwindModal id="disconnectTikTokModal">
        <DisconnectIntegration
          connectionStatus={!!tikTokIntegrationStatus}
          handler={disconnectTikTokIntegration}
          type={'tik_tok'}
        />
      </TailwindModal>

      <div
        ref={disconnectModalRef}
        data-bs-toggle="modal"
        data-bs-target="#failedTiktokIntegration"
      ></div>

      <TailwindModal id="addListModalTikTok">
        <AdAccountModal
          title={'TikTok ad'}
          type={'tiktok'}
          tiktokAds={tiktokAds}
          selectedAd={selectedAd as string}
          isSending={isSending}
          loadingAds={loadingAds}
          setSelectedAd={setSelectedAd}
          connectTiktokAdAccount={connectTiktokAdAccount}
        />
      </TailwindModal>

      <TailwindModal id="failedTiktokIntegration">
        <FailedIntegration type={'TikTok'} />
      </TailwindModal>

      <TailwindModal id="successTiktokModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successTiktokModal"
        ref={responseModalButtonRef}
      />
    </>
  );
};

export default TikTokConnection;
