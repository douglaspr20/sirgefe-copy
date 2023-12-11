'use client';

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
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { getAccountsCampaignsNew } from '@graphql/queries';

import { API } from 'aws-amplify';
import { useIntercom } from 'react-use-intercom';
import TailwindModal from '_components/modals/TailwindModal';
import ConnectCampaignsModal from '_components/modals/tailwindTypes/ConnectCampaignsModal';
import ConnectedAcounts from './ConnectedAcounts';
import ConnectedAccountModal from '_components/modals/tailwindTypes/ConnectedAccountModal';
import ManualTab from '_components/settings/tracking/tab';
import {
  GetAccountsCampaignsNewQueryVariables,
  GetAccountsCampaignsResponse,
  ItemSocialMediaIntegration,
  SetUtmValuesSocialCampaignMutationVariables,
  SetUtmValuesSocialCampaignResponse,
} from 'API';
import { useBoundStore } from '@store/index';
import { executeGraphqlOperation } from '_utils/executeGraphqlOperation';
import { setUtmValuesSocialCampaign } from '@graphql/mutations';

interface Props {
  isSettingsPage?: boolean;
  onboardingPath: string;
  displayInModal?: boolean;
  handleConnectUTMsModal?: () => void;
  setRefetchAds?: Dispatch<SetStateAction<boolean>>;
  refetchAds?: boolean;
  refreshData?: (id?: string, name?: string, adType?: string) => Promise<void>;
}

const TrackingSetup: FC<Props> = ({
  isSettingsPage = false,
  onboardingPath,
  displayInModal = false,
  handleConnectUTMsModal,
  refetchAds,
  setRefetchAds,
  refreshData,
}) => {
  const {
    shopifyConnected,
    businessProfile,
    dialogOptions,
    isLoading,
    socialConfig,
    setIsLoading,
    setDialogOptions,
  } = useBoundStore();

  const router = useRouter();
  const { show } = useIntercom();

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const errorConnectionButtonRef = useRef<HTMLButtonElement | null>(null);

  const [settingsTab, setSettingsTab] = useState('automatic');
  const [facebookAds, setFacebookAds] = useState<ItemSocialMediaIntegration[]>(
    [],
  );
  const [tiktokAds, setTiktokAds] = useState<ItemSocialMediaIntegration[]>([]);
  const [googleAds, setGoogleAds] = useState<ItemSocialMediaIntegration[]>([]);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

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

  const getCampaigns = async () => {
    setIsLoading(true);
    try {
      const response = await executeGraphqlOperation<
        GetAccountsCampaignsNewQueryVariables,
        GetAccountsCampaignsResponse
      >(API, getAccountsCampaignsNew, {
        getAccountsCampaignsInput: {
          business_id: businessProfile?.profilePrisma?.id as string,
          itemType: 'ads',
          getfromRRSSApis: true,
        },
      });

      if (response?.error) {
        throw new Error(response?.error.message || '');
      }

      const data = response?.data;

      if (data) {
        const facebookItems: ItemSocialMediaIntegration[] =
          data?.facebook?.map((ad) => {
            const newAd = ad as ItemSocialMediaIntegration;
            return {
              ...newAd,
              name: newAd.name || '-',
            };
          }) || [];

        setFacebookAds(
          displayInModal
            ? facebookItems?.filter((item) => !item.utm_status)
            : facebookItems,
        );

        const tiktokItems: ItemSocialMediaIntegration[] =
          data?.tiktok?.map((ad) => {
            const newAd = ad as ItemSocialMediaIntegration;
            return {
              ...newAd,
              name: newAd.name || '-',
            };
          }) || [];

        setTiktokAds(
          displayInModal
            ? tiktokItems?.filter((item) => !item.utm_status)
            : tiktokItems,
        );

        const googleItems: ItemSocialMediaIntegration[] =
          data?.google?.map((ad) => {
            const newAd = ad as ItemSocialMediaIntegration;
            return {
              ...newAd,
              name: newAd.name || '-',
            };
          }) || [];

        setGoogleAds(
          displayInModal
            ? googleItems?.filter((item) => !item.utm_status)
            : googleItems,
        );
      }
    } catch (error) {
      debugger;
      errorConnectionButtonRef.current?.click();
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (displayInModal && refetchAds) getCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchAds]);

  useEffect(() => {
    if (!displayInModal) getCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnectAdsAccounts = (
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
  };

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
                executeGraphqlOperation<
                  SetUtmValuesSocialCampaignMutationVariables,
                  SetUtmValuesSocialCampaignResponse
                >(API, setUtmValuesSocialCampaign, {
                  setUtmValuesSocialCampaignInput: {
                    source: 'facebook',
                    itemType: 'ads',
                    adId: item.id,
                    businessId: businessProfile?.profilePrisma?.id as string,
                  },
                }),
              );
            }).then((res) => {
              count++;
              setNumberAccountConnectedGoogle(count);

              return res;
            });
          }),
        ];
      }
      if (googleAds) {
        promises = [
          ...promises,
          ...selectedGoogleAds?.map((item) => {
            return new Promise((resolve) => {
              resolve(
                executeGraphqlOperation<
                  SetUtmValuesSocialCampaignMutationVariables,
                  SetUtmValuesSocialCampaignResponse
                >(API, setUtmValuesSocialCampaign, {
                  setUtmValuesSocialCampaignInput: {
                    source: 'google',
                    itemType: 'ads',
                    adId: item.id,
                    businessId: businessProfile?.profilePrisma?.id as string,
                  },
                }),
              );
            }).then((res) => {
              count2++;
              setNumberAccountConnectedGoogle(count2);

              return res;
            });
          }),
        ];
      }
      if (tiktokAds) {
        promises = [
          ...promises,
          ...selectedTiktokAds?.map((item) => {
            return new Promise((resolve) => {
              resolve(
                executeGraphqlOperation<
                  SetUtmValuesSocialCampaignMutationVariables,
                  SetUtmValuesSocialCampaignResponse
                >(API, setUtmValuesSocialCampaign, {
                  setUtmValuesSocialCampaignInput: {
                    source: 'tiktok',
                    itemType: 'ads',
                    adId: item.id,
                    businessId: businessProfile?.profilePrisma?.id as string,
                  },
                }),
              );
            }).then((res) => {
              count3++;
              setNumberAccountConnectedTiktok(count3);

              return res;
            });
          }),
        ];
      }

      const resPromises = await Promise.allSettled(promises);

      if (
        resPromises.some((res) => res.status === 'rejected') ||
        resPromises.some(
          (res) =>
            res.status === 'fulfilled' &&
            res?.value?.data?.setUtmValuesFbCampaign?.data?.adsFailed?.length >
              0,
        )
      ) {
        const resPermissionsError = resPromises.find(
          (res) =>
            res.status === 'fulfilled' &&
            res?.value?.data?.setUtmValuesFbCampaign?.data?.adsFailed?.some(
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
          message: 'A few ads were not able to connect',
          description: descriptionError,
        });

        return responseModalButtonRef.current?.click();
      }
      if (refreshData) refreshData();
      setDialogOptions({
        type: 'success',
        message:
          facebookAds.length + tiktokAds.length + googleAds.length ===
          selectedFacebookAds.length +
            selectedTiktokAds.length +
            selectedGoogleAds.length
            ? 'All ads connected'
            : 'Selected ads connected',
        description:
          'All of the new and other ads, you can connect on the settings page',
      });

      responseModalButtonRef.current?.click();
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
    businessProfile?.profilePrisma?.id,
    setIsConnecting,
    setDialogOptions,
    refreshData,
  ]);

  useEffect(() => {
    if (isConnecting) {
      updateSelectedAdsAccounts();
    }
  }, [isConnecting, updateSelectedAdsAccounts]);

  const onCloseUTMModal = () => {
    setIsConnecting(false);
    if (setRefetchAds) setRefetchAds(false);
    setNumberAccountConnectedFacebook(0);
    setNumberAccountConnectedTiktok(0);
    setNumberAccountConnectedGoogle(0);
    setSelectedFacebookAds([]);
    setSelectedTiktokAds([]);
    setSelectedGoogleAds([]);
  };

  const innerContent = () => (
    <div className={`${displayInModal ? 'p-2 pb-4' : ''}`}>
      {isLoading ? (
        <div className=" flex items-center justify-center bg-white p-5">
          <div className="inline-flex items-center justify-center flex-col">
            <div className="spinner"></div>
            <div className="font-semibold text-primaryColor mt-3">Loading</div>
          </div>
        </div>
      ) : (
        <>
          {!isSettingsPage ? (
            <>
              <div className="flex flex-row justify-between items-center ">
                <h1 className="h4 text-textSecondaryColor mb-2 mt-2 ml-2">
                  Tracking setup
                </h1>
                {displayInModal ? (
                  <button
                    type="button"
                    className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={onCloseUTMModal}
                  >
                    <i className="icon-dismiss-circle"></i>
                  </button>
                ) : (
                  <></>
                )}
              </div>

              <p className="text-textTeriraryColor mb-4 mx-2">
                Sirge automatically tracks all visitors, campaigns and sources
                to your website as well as purchases. You can also do it in the
                settings page.
              </p>
              <h5 className="h5 text-textSecondaryColor mb-2 mt-2 ml-2">
                Connect Your Existing Ads
              </h5>
            </>
          ) : (
            <>
              <h1 className="h4 text-textSecondaryColor mb-2 mt-2 ml-2">
                Ad Tracking
              </h1>
              <p className="text-textTeriraryColor mb-4 mx-2">
                Sirge automatically tracks all visitors, campaigns and sources
                to your website as well as purchases. Currently only campaigns
                from Facebook will be displayed in the performance dashboard.
                More integrations coming soon.
              </p>

              <p className="text-textTeriraryColor mb-4 mx-2">
                We understand your need for accurate tracking and automated
                campaign matching, that is why we require you to follow a few
                steps to make sure we display all of your Facebook campaigns.
              </p>
            </>
          )}

          {isSettingsPage && <Tab setSettingsTab={setSettingsTab} />}

          {settingsTab === 'automatic' ? (
            <>
              <div className="mt-5 mx-2">
                {socialConfig.google?.social_account_id && (
                  <ConnectedAcounts
                    type="Google"
                    accountName={socialConfig.google?.social_account_id || ''}
                    numberOfCampaings={googleAds?.length || 0}
                    isConnecting={isConnecting}
                    accountsConnected={numberAccountConnectedGoogle}
                    accountsToConnect={selectedGoogleAds?.length || 0}
                    typeOfItems={'ads'}
                    displayInModal={displayInModal}
                  />
                )}

                {socialConfig?.facebook?.social_account_name && (
                  <ConnectedAcounts
                    type="Facebook"
                    accountName={socialConfig?.facebook?.social_account_name}
                    numberOfCampaings={facebookAds?.length || 0}
                    isConnecting={isConnecting}
                    accountsConnected={numberAccountConnectedFacebook}
                    accountsToConnect={selectedFacebookAds?.length || 0}
                    typeOfItems={'ads'}
                    displayInModal={displayInModal}
                  />
                )}

                {socialConfig.tiktok?.social_account_name && (
                  <ConnectedAcounts
                    type="TikTok"
                    accountName={socialConfig.tiktok?.social_account_name || ''}
                    numberOfCampaings={tiktokAds?.length || 0}
                    isConnecting={isConnecting}
                    accountsConnected={numberAccountConnectedTikTok}
                    accountsToConnect={selectedTiktokAds?.length || 0}
                    typeOfItems={'ads'}
                    displayInModal={displayInModal}
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
                  tiktokAds?.length === 0 ? (
                    <div className="flex flex-col mx-2">
                      <div className="inline-flex">
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
                          {displayInModal
                            ? 'We track all ads from your platforms'
                            : `  You don’t have any existing ads on your
                          ad accounts. ` +
                              (!isSettingsPage
                                ? 'But you will able to connect new campaigns later on the settings page'
                                : '')}
                        </p>
                      </div>

                      {displayInModal ? (
                        <button
                          className="btn w-[170px] mt-2 ml-auto"
                          onClick={() => {
                            if (handleConnectUTMsModal) {
                              handleConnectUTMsModal();
                              onCloseUTMModal();
                            }
                          }}
                        >
                          Close
                        </button>
                      ) : (
                        !isSettingsPage && (
                          <button
                            className="btn w-[170px] mt-2 ml-auto"
                            onClick={() =>
                              router.push('/selector?onboarding=true')
                            }
                          >
                            Skip
                          </button>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 inline-flex justify-end w-full">
                      <button
                        type="button"
                        className="btn light mr-3 w-[200px]"
                        data-bs-toggle="modal"
                        data-bs-target="#connectCampaignsSelectively"
                      >
                        Connect Selectively
                      </button>

                      <button
                        className="btn w-[170px] mr-2"
                        onClick={() => {
                          handleConnectAdsAccounts(
                            facebookAds || [],
                            googleAds || [],
                            tiktokAds || [],
                            true,
                          );
                        }}
                      >
                        Connect All
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <ManualTab
              businessProfile={businessProfile}
              shopifyConnected={false}
              isTrakingManualTab={true}
              quickSetup={!isSettingsPage}
            />
          )}

          {isSettingsPage && (
            <>
              <div className="my-6  border border-extraLightColor" />
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
    </div>
  );

  return (
    <>
      <div className="widget-container p-4">
        {process.env.NEXT_PUBLIC_SHOW_UTM_INJECTION === 'show' ? (
          displayInModal ? (
            <TailwindModal
              styleDialog={{ width: 900, minWidth: 800, padding: '20px' }}
              id="connectAllUTMsModal"
            >
              {innerContent()}
            </TailwindModal>
          ) : (
            innerContent()
          )
        ) : (
          <>
            <ManualTab
              shopifyConnected={shopifyConnected}
              businessProfile={businessProfile}
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
      </div>

      <TailwindModal id="connectCampaignsSelectively">
        <ConnectCampaignsModal
          facebookAds={
            socialConfig?.facebook?.social_account_name ? facebookAds : []
          }
          tiktokAds={socialConfig?.tiktok?.social_account_name ? tiktokAds : []}
          googleAds={socialConfig?.google?.social_account_id ? googleAds : []}
          handleConnectAdsAccounts={handleConnectAdsAccounts}
          isSettingsPage={isSettingsPage}
          displayInModal={displayInModal}
          onCloseUTMModal={onCloseUTMModal}
        />
      </TailwindModal>

      <TailwindModal id="connectedAccount">
        <ConnectedAccountModal
          type={dialogOptions.type}
          title={dialogOptions.message}
          description={dialogOptions.description || ''}
          actionButton={() => {
            if (displayInModal && handleConnectUTMsModal) {
              handleConnectUTMsModal();
            } else if (!isSettingsPage && !displayInModal) {
              router.push(onboardingPath);
            }
          }}
        />
      </TailwindModal>

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
                  className={`btn light  mt-4  mx-2 ${
                    !displayInModal ? 'w-[225px]' : 'w-32'
                  }`}
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (!displayInModal) {
                      router.push(onboardingPath);
                    } else {
                      onCloseUTMModal();
                    }
                  }}
                >
                  {displayInModal ? 'Close' : 'Connect later in settings'}
                </button>

                <button
                  className="btn  mt-4 mx-2  w-32"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (displayInModal && handleConnectUTMsModal)
                      handleConnectUTMsModal();
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
        data-bs-target="#connectedAccount"
        ref={responseModalButtonRef}
      />

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

type TabProps = {
  setSettingsTab: React.Dispatch<React.SetStateAction<string>>;
};

const Tab: React.FunctionComponent<TabProps> = ({ setSettingsTab }) => (
  <div className="flex items-center justify-between mb-6 border-b border-extraLightColor pl-0">
    <ul
      className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <a
          href="#tabs-automatic"
          className="inline-flex active items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100"
          id="tabs-automatic-tab"
          data-bs-toggle="pill"
          data-bs-target="#tabs-automatic"
          role="tab"
          aria-controls="tabs-automatic"
          aria-selected="true"
          onClick={() => setSettingsTab('automatic')}
        >
          Automatic
        </a>
      </li>

      <li className="nav-item" role="presentation">
        <a
          href="#tabs-manual"
          className="inline-flex items-center justify-center px-3 py-2.5 font-medium text-sm border-b-2 border-b-transparent text-darkGrade50 hover:text-darkGrade75 [&.active]:text-darkGrade100 [&.active]:border-b-darkGrade100"
          id="tabs-manual-tab"
          data-bs-toggle="pill"
          data-bs-target="#tabs-manual"
          role="tab"
          aria-controls="tabs-manual"
          aria-selected="false"
          onClick={() => setSettingsTab('manual')}
        >
          Manual
        </a>
      </li>
    </ul>
  </div>
);

export default TrackingSetup;
