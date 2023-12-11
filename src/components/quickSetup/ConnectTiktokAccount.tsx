import { getUserTiktokAds } from '@graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import ConnectAccount from './ConnectAccount';
import TailwindModal from '@components/modals/TailwindModal';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import {
  authenticateTikTok,
  setSocialAdAccount,
  setSocialUserAccess,
  setTiktokAdAccount,
} from '@graphql/mutations';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import DontHaveAdsAccounts from './DontHaveAdsAccounts';
import ConnectedAccountModal from '@components/modals/tailwindTypes/ConnectedAccountModal';
import SearchInput from '@components/SearchInput';
import { useRouter } from 'next/router';
import { AccountType } from './IntegrationsAndAdAccounts';
import { LoadingButton } from '@components/LoadingButton';
import { useBoundStore } from '@store/index';

type Props = {
  setSelectedAccount: Dispatch<SetStateAction<AccountType>>;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogOptions: React.Dispatch<
    React.SetStateAction<{
      type: ValidTypeMessages;
      message: string;
      description?: string;
    }>
  >;
};

const AccountStep: React.FunctionComponent<Props> = ({
  setSelectedAccount,
  setDialogOptions,
  setShowDialog,
}) => {
  const { businessProfile, setBusinessProfile } = useBoundStore.getState();

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    'url_origin_tiktok_connection',
  ]);

  const business = businessProfile;

  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [loadingConnection, setLoadingConnection] = useState<boolean>(false);

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const [tiktokAds, setTiktokAds] = useState<
    {
      advertiser_id: string;
      advertiser_name: string;
    }[]
  >([]);
  const [selectedTiktokAdAccount, setSelectedtiktokAdAccount] =
    useState<string>('');

  const getTiktokAds = useCallback(async () => {
    setLoading(true);

    try {
      if (businessProfile?.tik_tok_access_token) {
        const response: any = await API.graphql(
          graphqlOperation(getUserTiktokAds, {
            getUserTiktokAdsInput: {
              tik_tok_access_token: businessProfile?.tik_tok_access_token,
              business_id: businessProfile?.business_id,
            },
          }),
        );

        const tiktokAds = response.data.getUserTiktokAds;

        if (tiktokAds.error) {
          setDialogOptions({
            message: tiktokAds.error.message,
            type: 'error',
          });
          setShowDialog(true);
        }

        if (tiktokAds?.data?.length > 0) {
          setTiktokAds(tiktokAds.data);
        }
      }
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    } finally {
      setLoading(false);
    }
  }, [businessProfile?.tik_tok_access_token]);

  /**
   * Connect Tiktok
   */
  const connectTiktokAdAccount = async () => {
    setLoadingConnection(true);

    try {
      const fintAdAccount = tiktokAds.find(
        (item) => item.advertiser_id === selectedTiktokAdAccount,
      );

      const response: any = await API.graphql(
        graphqlOperation(setSocialAdAccount, {
          setSocialAdAccountInput: {
            business_id: business?.business_id,
            ad_account_id: fintAdAccount?.advertiser_id,
            platform: 'tiktok',
          },
        }),
      );

      const data = response.data.setSocialAdAccount;

      if (data.error) {
        setLoadingConnection(false);
        return setDialogOptions({
          type: 'error',
          message: data.error.message,
        });
      }

      setBusinessProfile({
        tik_tok_ad_account_id: fintAdAccount?.advertiser_id,
        tik_tok_ad_account_name: fintAdAccount?.advertiser_name,
        isLoading: false,
        profilePrisma: businessProfile?.profilePrisma,
        userRole: businessProfile?.userRole as number,
        trackerStatus: businessProfile?.trackerStatus as boolean,
      });

      setShowDialog(true);

      setDialogOptions({
        type: 'success',
        message: 'TikTok Ad Account Connected',
        description: 'TikTok Is Fully Connected',
      });

      setTimeout(() => {
        setSelectedAccount(false);
      }, 2000);
    } catch (error: any) {
      if (error?.errors?.length > 0) {
        setShowDialog(true);

        return setDialogOptions({
          type: 'error',
          message: 'An error occurred while connecting your ad account',
        });
      }
    } finally {
      setLoadingConnection(false);
    }
  };

  const tiktokConnectInit = () => {
    let url = '';
    url = `https://ads.tiktok.com/marketing_api/auth?app_id=${process.env.NEXT_PUBLIC_TIK_TOK_APP_ID}&state=${process.env.NEXT_PUBLIC_RELEASE_STAGE}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations&rid=${process.env.NEXT_PUBLIC_TIK_TOK_AUTH_RID}`;
    localStorage.removeItem('is_tik_tok_integration_called');
    localStorage.setItem('quick-setup-step', 'tiktok-account-integration');
    setCookie('url_origin_tiktok_connection', router.pathname);
    window.open(url, '_self');
  };

  const connectTikTok = async (auth_code: string) => {
    try {
      const response: any = await API.graphql(
        graphqlOperation(setSocialUserAccess, {
          socialAccessStoreInput: {
            business_id: businessProfile?.business_id,
            access_token: auth_code,
            platform: 'tiktok',
          },
        }),
      );

      if (response.data.setSocialUserAccess?.error) {
        throw new Error(response.data.setSocialUserAccess?.error.message);
      }

      const accessToken = response.data.setSocialUserAccess?.data;

      setBusinessProfile({
        tik_tok_access_token: accessToken,
        isLoading: false,
        profilePrisma: businessProfile?.profilePrisma,
        userRole: businessProfile?.userRole as number,
        trackerStatus: businessProfile?.trackerStatus as boolean,
      });

      responseModalButtonRef.current?.click();
    } catch (error: any) {
      setDialogOptions({
        message: error.message,
        type: 'error',
      });
      setShowDialog(true);
      Sentry.captureException(error);
    }
  };

  useEffect(() => {
    const isTikTokIntegrationCalled =
      localStorage.getItem('is_tik_tok_integration_called') === 'true';

    const query = new URLSearchParams(window.location.search);

    const auth_code = query.get('auth_code');

    if (auth_code && !isTikTokIntegrationCalled) {
      localStorage.setItem('is_tik_tok_integration_called', 'true');
      connectTikTok(auth_code);
    }

    removeCookie('url_origin_tiktok_connection');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    getTiktokAds();
  }, [getTiktokAds]);

  return (
    <div className="widget-container !shadow-lg rounded-xl px-5 py-2 bg-white ">
      {businessProfile?.tik_tok_access_token ? (
        <div className="rounded-xl ">
          <h6 className="mb-2 flex items-center">TikTok business account</h6>

          <div className=" border border-extraLightColor  bg-white rounded-xl mb-5 p-4 flex justify-between items-center  ">
            <div className="flex items-center">
              <Image
                src={`images/tiktok.svg`}
                width={20}
                height={20}
                alt="clip"
              />

              <span className="ml-1.5">
                {businessProfile?.tik_tok_ad_account_name}
              </span>

              <span className="tag-small green ml-1.5">Connected</span>
            </div>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => tiktokConnectInit()}
            >
              <Image
                src="images/edit-icon.svg"
                width={20}
                height={20}
                alt="edit"
              />
              <span className="link ml-2">Change</span>
            </div>
          </div>

          {loading ? (
            <div className="widget-container mt-4 p-5">
              <div className=" flex items-center justify-center bg-white p-5">
                <div className="inline-flex items-center justify-center flex-col">
                  <div className="spinner"></div>
                  <div className="font-semibold text-primaryColor mt-3">
                    Loading
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {tiktokAds?.length > 0 ? (
                <>
                  <div className="border border-extraLightColor  bg-white rounded-xl mb-6 p-4">
                    <h2 className="text-xl flex items-center">
                      Select TikTok Ad Account
                    </h2>

                    <SearchInput
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />

                    <div className="flex flex-col max-h-[160px] overflow-y-auto">
                      {tiktokAds
                        .filter((ad) =>
                          ad.advertiser_name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()),
                        )
                        .map((ad) => (
                          <span
                            key={ad.advertiser_id}
                            className={`text-base mb-2 px-2 py-1 mr-2 pointer ${
                              selectedTiktokAdAccount === ad.advertiser_id &&
                              'bg-bodyColor border border-borderLightColor rounded'
                            }`}
                            onClick={() =>
                              setSelectedtiktokAdAccount(ad.advertiser_id)
                            }
                          >
                            {ad.advertiser_name}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-end">
                      <button
                        className="btn light mr-2"
                        onClick={() => setSelectedAccount(false)}
                      >
                        <span>Cancel</span>
                      </button>

                      {!loadingConnection ? (
                        <button
                          className="btn"
                          disabled={!selectedTiktokAdAccount}
                          onClick={() => connectTiktokAdAccount()}
                        >
                          Connect
                        </button>
                      ) : (
                        <>
                          <LoadingButton text="Loading" />
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <DontHaveAdsAccounts
                  typeAccount="TikTok"
                  handleChangeAccount={tiktokConnectInit}
                  setSelectedAccount={setSelectedAccount}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <ConnectAccount
          handleConnect={() => tiktokConnectInit()}
          title={'TikTok business'}
          icon={'tiktok.svg'}
          setSelectedAccount={setSelectedAccount}
        />
      )}

      <TailwindModal id="connectedAccount">
        <ConnectedAccountModal
          type="success"
          title="TikTok Business account connected"
          description="Now you can connect your Tiktok Ads account"
        />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#connectedAccount"
        ref={responseModalButtonRef}
      />
    </div>
  );
};

export default AccountStep;
