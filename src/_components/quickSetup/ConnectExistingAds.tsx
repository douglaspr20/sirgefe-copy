import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';

import { getAccountsCampaignsNew } from '@graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useIntercom } from 'react-use-intercom';

import TailwindModal from '_components/modals/TailwindModal';
import ConnectCampaignsModal from '_components/modals/tailwindTypes/ConnectCampaignsModal';

import ConnectedAcounts from './ConnectedAcounts';
import ConnectedAccountModal from '_components/modals/tailwindTypes/ConnectedAccountModal';
import ManualTab from '_components/settings/tracking/tab';
import { ItemSocialMediaIntegration } from 'API';
import { ValidTypeMessages } from '_components/modals/tailwindTypes/Message';
import { TextMainButtonType } from '@providers/quickSetupProvider';
import { useBoundStore } from '@store/index';
import { BusinessProfile } from '@interfaces/business';
import { setUtmValuesSocialCampaign } from '@graphql/mutations';
interface Props {
  isConnecting: boolean;
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>;
  isSettingsPage?: boolean;
  onboardingPath: string;
  displayInModal?: boolean;
  handleConnectUTMsModal?: () => void;
  setRefetchAds?: Dispatch<SetStateAction<boolean>>;
  refetchAds?: boolean;
  refreshData?: (id?: string, name?: string, adType?: string) => Promise<void>;
}

export type CurrentViewType =
  | 'Connect all ads'
  | 'Select ads'
  | 'response Request Message';

const ConnectExistingAds: FC<Props> = ({
  isConnecting,
  setIsConnecting,
  isSettingsPage = false,
  onboardingPath,
  handleConnectUTMsModal,
  setRefetchAds,
  refreshData,
}) => {
  const {
    businessProfile,
    shopifyConnected,
    loadingSetup,
    setLoadingSetup,
    setShowButton,
    setUserHaveAds,
    setMainButtonAction,
    setSecondaryButtonAction,
    setTextMainbutton,
    setTextSecondaryButton,
  } = useBoundStore.getState();

  const router = useRouter();
  const { show } = useIntercom();

  const errorConnectionButtonRef = useRef<HTMLButtonElement | null>(null);

  const [facebookAds, setFacebookAds] = useState<ItemSocialMediaIntegration[]>(
    [],
  );
  const [tiktokAds, setTiktokAds] = useState<ItemSocialMediaIntegration[]>([]);
  const [googleAds, setGoogleAds] = useState<ItemSocialMediaIntegration[]>([]);

  const [currentView, setCurrentView] =
    useState<CurrentViewType>('Connect all ads');
  const [error, setError] = useState<string | null>(null);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    title: string;
    description: string;
  }>({
    type: 'success',
    title: '',
    description: '',
  });

  const [selectedFacebookAds, setSelectedFacebookAds] = useState<
    ItemSocialMediaIntegration[]
  >([]);

  const [selectedGoogleAds, setSelectedGoogleAds] = useState<
    ItemSocialMediaIntegration[]
  >([]);

  const [selectedTiktokAds, setSelectedTiktokAds] = useState<
    ItemSocialMediaIntegration[]
  >([]);

  const [numberAccountConnectedFacebook, setNumberAccountConnectedFacebook] =
    useState(0);
  const [numberAccountConnectedGoogle, setNumberAccountConnectedGoogle] =
    useState(0);
  const [numberAccountConnectedTikTok, setNumberAccountConnectedTiktok] =
    useState(0);

  const totalAccountsToConnect = useRef<number>(
    (facebookAds?.length || 0) +
      (tiktokAds?.length || 0) +
      (googleAds?.length || 0),
  );

  const handleConnectAdsAccounts = useCallback(
    (
      facebookAccounts: ItemSocialMediaIntegration[],
      googleAccounts: ItemSocialMediaIntegration[],
      tiktokAccounts: ItemSocialMediaIntegration[],
      connectAllUTMs?: boolean,
    ) => {
      setIsConnecting(true);
      setSelectedFacebookAds(facebookAccounts);
      setSelectedGoogleAds(googleAccounts);
      setSelectedTiktokAds(tiktokAccounts);

      totalAccountsToConnect.current =
        facebookAccounts.length + googleAccounts.length + tiktokAccounts.length;

      if (!connectAllUTMs && handleConnectUTMsModal) handleConnectUTMsModal();
    },
    [handleConnectUTMsModal, setIsConnecting],
  );

  const getCampaigns = useCallback(async () => {
    setLoadingSetup(true);
    try {
      const response: any = await API.graphql(
        graphqlOperation(getAccountsCampaignsNew, {
          getAccountsCampaignsInput: {
            business_id: businessProfile?.business_id,
            itemType: 'ads',
            getfromRRSSApis: true,
          },
        }),
      );

      debugger;

      if (response?.errors) {
        throw new Error(response?.errors);
      }

      const data = response.data?.getAccountsCampaignsNew?.data;

      const facebookItems: ItemSocialMediaIntegration[] =
        data?.facebook.map((ad: ItemSocialMediaIntegration) => ({
          ...ad,
          name: ad.name || '-',
        })) || [];

      setFacebookAds(facebookItems);

      const tiktokItems: ItemSocialMediaIntegration[] =
        data?.tiktok.map((ad: ItemSocialMediaIntegration) => ({
          ...ad,
          name: ad.name || '-',
        })) || [];

      setTiktokAds(tiktokItems);

      const googleItems: ItemSocialMediaIntegration[] =
        data?.google.map((ad: ItemSocialMediaIntegration) => ({
          ...ad,
          name: ad.name || '-',
        })) || [];

      setGoogleAds(googleItems);

      if (
        facebookItems.length > 0 ||
        tiktokItems.length > 0 ||
        googleItems.length > 0
      ) {
        setUserHaveAds(true);

        setMainButtonAction({
          callback: () => {
            setShowButton(false);

            handleConnectAdsAccounts(
              facebookItems || [],
              googleItems || [],
              tiktokItems || [],
              true,
            );
          },
        });
      } else {
        setUserHaveAds(false);
        setMainButtonAction({ callback: () => router.push(onboardingPath) });
      }
    } catch (error) {
      console.log(error);

      errorConnectionButtonRef.current?.click();
      Sentry.captureException(error);
    } finally {
      setLoadingSetup(false);
    }
  }, [
    businessProfile?.business_id,
    handleConnectAdsAccounts,
    setLoadingSetup,
    setMainButtonAction,
    setUserHaveAds,
    setShowButton,
    router,
    onboardingPath,
  ]);

  const updateSelectedAdsAccounts = useCallback(async () => {
    try {
      let count = 0;
      let count2 = 0;
      let count3 = 0;
      let promises: any = [];
      if (facebookAds) {
        promises = [
          ...promises,
          ...selectedFacebookAds?.map((item) => {
            return new Promise((resolve) => {
              resolve(
                API.graphql(
                  graphqlOperation(setUtmValuesSocialCampaign, {
                    setUtmValuesSocialCampaignInput: {
                      adId: item.id,
                      businessId: businessProfile?.business_id,
                      itemType: 'ads',
                      source: 'facebook',
                    },
                  }),
                ),
              );
            }).then((res) => {
              count++;
              setNumberAccountConnectedFacebook(count);

              return res;
            });
          }),
        ];

        debugger;
      }
      if (googleAds) {
        promises = [
          ...promises,
          ...selectedGoogleAds?.map((item) => {
            return new Promise((resolve) => {
              resolve(
                API.graphql(
                  graphqlOperation(setUtmValuesSocialCampaign, {
                    setUtmValuesSocialCampaignInput: {
                      adId: item.id,
                      businessId: businessProfile?.business_id,
                      itemType: 'ads',
                      source: 'google',
                    },
                  }),
                ),
              );
            }).then((res) => {
              count2++;
              setNumberAccountConnectedGoogle(count2);

              return res;
            });
          }),
        ];

        debugger;
      }
      if (tiktokAds) {
        promises = [
          ...promises,
          ...selectedTiktokAds?.map((item) => {
            return new Promise((resolve) => {
              resolve(
                API.graphql(
                  graphqlOperation(setUtmValuesSocialCampaign, {
                    setUtmValuesSocialCampaignInput: {
                      adId: item.id,
                      businessId: businessProfile?.business_id,
                      itemType: 'ads',
                      source: 'tiktok',
                    },
                  }),
                ),
              );
            }).then((res) => {
              count3++;
              setNumberAccountConnectedTiktok(count3);

              return res;
            });
          }),
        ];

        debugger;
      }

      const resPromises = await Promise.allSettled(promises);

      if (
        resPromises.some((res) => res.status === 'rejected') ||
        resPromises.some(
          (res) =>
            res.status === 'fulfilled' &&
            res?.value?.data?.setUtmValuesSocialCampaign?.data?.adsFailed
              ?.length > 0,
        )
      ) {
        const resPermissionsError = resPromises.find(
          (res) =>
            res.status === 'fulfilled' &&
            res?.value?.data?.setUtmValuesSocialCampaign?.data?.adsFailed?.some(
              (adFailed: { ad: string; error: string }) =>
                adFailed.error.includes('Permissions error'),
            ),
        );

        setIsConnecting(false);

        const descriptionError = resPermissionsError
          ? `Facebook has returned the following error when trying to update UTMs: \n <strong>"The user does not have the permission for this action"</strong> \n\nPlease update the permissions on the associated Facebook account, or link a different account to Sirge with higher permissions`
          : `We encountered an issue while connecting our tracker to a few of your ads.  Please retry the automatic connection.  If you continue to see this error, use the follow the instructions for manual connection in the Settings page.`;

        setDialogOptions({
          type: 'error',
          title: 'A few ads were not able to connect',
          description: descriptionError,
        });

        return setCurrentView('response Request Message');
      }
      if (refreshData) refreshData();
      setDialogOptions({
        type: 'success',
        title:
          facebookAds.length + tiktokAds.length + googleAds.length ===
          selectedFacebookAds.length +
            selectedTiktokAds.length +
            selectedGoogleAds.length
            ? 'All ads connected'
            : 'Selected ads connected',
        description:
          'All of the new and other ads, you can connect on the settings page',
      });

      setCurrentView('response Request Message');
    } catch (error: any) {
      Sentry.captureException(new Error(error as any));
    }
  }, [
    facebookAds,
    googleAds,
    tiktokAds,
    selectedFacebookAds,
    selectedGoogleAds,
    selectedTiktokAds,
    businessProfile?.business_id,
    setIsConnecting,
    refreshData,
  ]);

  const closeSelectAdsComponent = (textType = 'Connect All') => {
    setIsConnecting(false);
    setCurrentView('Connect all ads');
    setTextMainbutton(textType as TextMainButtonType);
    setTextSecondaryButton('Connect Selectively');

    if (textType === 'Continue') {
      setMainButtonAction({ callback: () => router.push(onboardingPath) });
    }

    setNumberAccountConnectedFacebook(0);
    setNumberAccountConnectedTiktok(0);
    setNumberAccountConnectedGoogle(0);
    setSelectedFacebookAds([]);
    setSelectedTiktokAds([]);
    setSelectedGoogleAds([]);

    if (setRefetchAds) setRefetchAds(false);
  };

  useEffect(() => {
    if (isConnecting) {
      updateSelectedAdsAccounts();
    }
  }, [isConnecting, updateSelectedAdsAccounts]);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  useEffect(() => {
    if (currentView === 'Select ads') {
      if (error) return;
      setSecondaryButtonAction({
        callback: () => {
          setCurrentView('Connect all ads');
        },
      });

      setTextMainbutton('Connect tracking script');
      setTextSecondaryButton('Decline');
    } else {
      if (
        facebookAds?.length === 0 &&
        googleAds?.length === 0 &&
        tiktokAds?.length === 0
      ) {
        setTextMainbutton('Continue');
      } else {
        setTextMainbutton('Connect All');
        setTextSecondaryButton('Connect Selectively');

        setMainButtonAction({
          callback: () => {
            setShowButton(false);

            handleConnectAdsAccounts(
              facebookAds || [],
              googleAds || [],
              tiktokAds || [],
              true,
            );
          },
        });

        setSecondaryButtonAction({
          callback: () => {
            setCurrentView('Select ads');
          },
        });
      }
    }
  }, [
    currentView,
    setSecondaryButtonAction,
    setTextMainbutton,
    setTextSecondaryButton,
    facebookAds,
    googleAds,
    tiktokAds,
    error,
  ]);

  const innerContent = () => (
    <div>
      {loadingSetup ? (
        <div className=" flex items-center justify-center p-5">
          <div className="inline-flex items-center justify-center flex-col">
            <div className="spinner"></div>
            <div className="font-semibold text-primaryColor mt-3">Loading</div>
          </div>
        </div>
      ) : (
        <>
          {currentView === 'Connect all ads' ? (
            <>
              <div className="mt-5">
                {businessProfile?.google_ad_account_id && (
                  <ConnectedAcounts
                    type="Google"
                    accountName={businessProfile?.google_ad_account_id}
                    numberOfCampaings={googleAds?.length || 0}
                    isConnecting={isConnecting}
                    accountsConnected={numberAccountConnectedGoogle}
                    accountsToConnect={selectedGoogleAds?.length || 0}
                    typeOfItems={'ads'}
                  />
                )}

                {businessProfile?.facebook_ad_account_name && (
                  <ConnectedAcounts
                    type="Facebook"
                    accountName={businessProfile?.facebook_ad_account_name}
                    numberOfCampaings={facebookAds?.length || 0}
                    isConnecting={isConnecting}
                    accountsConnected={numberAccountConnectedFacebook}
                    accountsToConnect={selectedFacebookAds?.length || 0}
                    typeOfItems={'ads'}
                  />
                )}

                {businessProfile?.tik_tok_ad_account_name && (
                  <ConnectedAcounts
                    type="TikTok"
                    accountName={businessProfile?.tik_tok_ad_account_name}
                    numberOfCampaings={tiktokAds?.length || 0}
                    isConnecting={isConnecting}
                    accountsConnected={numberAccountConnectedTikTok}
                    accountsToConnect={selectedTiktokAds?.length || 0}
                    typeOfItems={'ads'}
                  />
                )}
              </div>

              {isConnecting ? (
                <div className="flex items-center justify-center py-2">
                  <Image
                    className={`${
                      numberAccountConnectedFacebook +
                        numberAccountConnectedGoogle +
                        numberAccountConnectedTikTok <
                      totalAccountsToConnect.current
                        ? 'animate-spin '
                        : ''
                    }mr-2`}
                    src={
                      numberAccountConnectedFacebook +
                        numberAccountConnectedGoogle +
                        numberAccountConnectedTikTok <
                      totalAccountsToConnect.current
                        ? '/images/spinner-sm.svg'
                        : '/images/checkmark-circle-primary.svg'
                    }
                    alt="refresh"
                    width={17}
                    height={17}
                  />
                  <span className="text-primaryColor text-xs">
                    {numberAccountConnectedFacebook +
                      numberAccountConnectedGoogle +
                      numberAccountConnectedTikTok <
                    totalAccountsToConnect.current
                      ? 'Connecting'
                      : 'Connected'}
                  </span>
                </div>
              ) : (
                <>
                  {facebookAds?.length === 0 &&
                    googleAds?.length === 0 &&
                    tiktokAds?.length === 0 && (
                      <div className="flex flex-col mx-2">
                        <div className="inline-flex mt-5">
                          <div className="shrink-0 w-5 h-5 mr-2">
                            <Image
                              src="/images/exclamation.svg"
                              width={20}
                              height={21}
                              alt="note"
                              className="drop-shadow-blueShadow"
                            />
                          </div>
                          <p className="text-primaryColor">
                            You don’t have any existing ads on your ad accounts.
                            But you will able to connect new campaigns later on
                            the settings page
                          </p>
                        </div>
                      </div>
                    )}
                </>
              )}
            </>
          ) : currentView === 'Select ads' ? (
            <div className="widget-container p-5 py-2">
              <ConnectCampaignsModal
                facebookAds={
                  businessProfile?.facebook_ad_account_name ? facebookAds : null
                }
                tiktokAds={
                  businessProfile?.tik_tok_ad_account_name ? tiktokAds : null
                }
                googleAds={
                  businessProfile?.google_ad_account_id ? googleAds : null
                }
                handleConnectAdsAccounts={handleConnectAdsAccounts}
                isSettingsPage={isSettingsPage}
                onCloseUTMModal={closeSelectAdsComponent}
                displayInModal={false}
                isQuickSetupPage
                setCurrentView={setCurrentView}
                error={error}
                setError={setError}
              />
            </div>
          ) : (
            <div className="widget-container p-5">
              <ConnectedAccountModal
                type={dialogOptions.type}
                title={dialogOptions.title}
                description={dialogOptions.description}
                actionButton={() => {
                  router.push({
                    pathname: onboardingPath,
                  });
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      {process.env.NEXT_PUBLIC_SHOW_UTM_INJECTION === 'show' ? (
        innerContent()
      ) : (
        <>
          <ManualTab
            shopifyConnected={shopifyConnected}
            businessProfile={businessProfile as BusinessProfile}
            quickSetup={!isSettingsPage}
          />

          {!isSettingsPage ? (
            <div className="mx-2 inline-flex items-center mt-5">
              <div className="shrink-0 w-5 h-5 mr-2">
                <Image
                  src="/images/exclamation.svg"
                  width={20}
                  height={21}
                  alt="note"
                  className="drop-shadow-blueShadow"
                />
              </div>
              <p className="text-textSecondaryColor">
                This instruction also will be on the connection page in the
                settings
              </p>
            </div>
          ) : (
            <>
              <div className="my-6 border border-extraLightColor" />
              <div className="inline-flex items-center ">
                <div className="shrink-0 w-5 h-5 mr-2">
                  <Image
                    src="/images/chat.svg"
                    width={20}
                    height={21}
                    alt="chat-icon"
                    className="drop-shadow-blueShadow"
                  />
                </div>
                <p className="font-medium">
                  For Additional Help Please{' '}
                  <span onClick={() => show()} className="cursor-pointer">
                    Contact Us
                  </span>{' '}
                  Via The Live Chat.
                </p>
              </div>
            </>
          )}
        </>
      )}

      <TailwindModal id="connectionError" styleDialog={{ width: '600px' }}>
        <div className="px-2 py-8">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-1">
              <div className="mb-2 flex justify-center ">
                <Image
                  src={`/images/warning-icon.svg`}
                  width={25}
                  height={15}
                  alt="success"
                />
              </div>
              <h5 className="text-center">
                Something went wrong getting your ads
              </h5>

              <div className="flex justify-center">
                <button
                  className={`btn light  mt-4  mx-2 w-[216px]`}
                  data-bs-dismiss="modal"
                  onClick={() => {
                    closeSelectAdsComponent('Continue');
                  }}
                >
                  {'Connect later in settings'}
                </button>

                <button
                  className="btn  mt-4 mx-2  w-32"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    getCampaigns();
                  }}
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#connectionError"
        ref={errorConnectionButtonRef}
      />
    </>
  );
};

export default ConnectExistingAds;
