import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as Sentry from '@sentry/nextjs';
import { API, graphqlOperation } from 'aws-amplify';
import { setSocialAdAccount, setSocialUserAccess } from '@graphql/mutations';
import {
  getFacebookAdAccounts,
  getUserFacebookAccount,
} from '@graphql/queries';
import TailwindModal from '@components/modals/TailwindModal';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';
import ConnectedAccountModal from '@components/modals/tailwindTypes/ConnectedAccountModal';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import ConnectAccount from './ConnectAccount';
import DontHaveAdsAccounts from './DontHaveAdsAccounts';
import SocialButton from '@components/Integrations/SocialButton';
import SearchInput from '@components/SearchInput';
import { AccountType } from './IntegrationsAndAdAccounts';
import { LoadingButton } from '@components/LoadingButton';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { useBoundStore } from '@store/index';

interface Props {
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType>>;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogOptions: React.Dispatch<
    React.SetStateAction<{
      type: ValidTypeMessages;
      message: string;
      description?: string;
    }>
  >;
}

const ConnectFacebookAccount: React.FunctionComponent<Props> = ({
  setSelectedAccount,
  setDialogOptions,
  setShowDialog,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { businessProfile, setBusinessProfile } = useBoundStore.getState();

  const [fbAccountName, setFbAccountName] = useState<string>('');

  const [facebookAds, setFacebookAds] = useState<
    {
      id: string;
      name: string;
      currency: string;
    }[]
  >([]);

  useEffect(() => {
    if (businessProfile?.facebook_accessToken)
      getAccountInfo(businessProfile?.facebook_accessToken);
  }, [businessProfile]);

  const getAccountInfo = async (facebook_accessToken: string) => {
    const fbAccountResponse: any = await API.graphql(
      graphqlOperation(getUserFacebookAccount, {
        getUserFacebookAccountInput: {
          facebook_accessToken: facebook_accessToken,
          business_id: businessProfile?.business_id,
        },
      }),
    );

    const fbAccountData = fbAccountResponse.data.getUserFacebookAccount;

    if (fbAccountData.error) {
      return '';
    }

    setFbAccountName(fbAccountData.data?.name);
  };

  const [selectedFacebookAdAccount, setSelectedFacebookAdAccount] = useState<
    string | null
  >(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const [loadingConnection, setLoadingConnection] = useState<boolean>(false);

  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const disconnectModalRef = useRef<HTMLButtonElement | null>(null);

  const facebookLoginCallback = async (facebookResponse: any) => {
    try {
      const accessToken = facebookResponse.token.accessToken;
      const userId = facebookResponse.profile.id;

      if (!accessToken) {
        throw new Error(facebookResponse.error ?? 'Facebook auth failed');
      }

      await API.graphql(
        graphqlOperation(setSocialUserAccess, {
          socialAccessStoreInput: {
            business_id: businessProfile?.business_id,
            user_id: userId,
            access_token: accessToken,
            platform: 'facebook',
          },
        }),
      );

      setBusinessProfile({
        facebook_accessToken: accessToken,
        isLoading: false,
        profilePrisma: businessProfile?.profilePrisma,
        userRole: businessProfile?.userRole as number,
        trackerStatus: businessProfile?.trackerStatus as boolean,
      });

      responseModalButtonRef.current?.click();
    } catch (error: any) {
      disconnectModalRef?.current?.click();
      Sentry.captureException(new Error(error as any));
    }
  };

  const getUserAdAccounts = async (type: string) => {
    setLoading(true);

    try {
      if (type === 'fb') {
        const response: any = await API.graphql(
          graphqlOperation(getFacebookAdAccounts, {
            getFacebookAdAccountsInput: {
              business_id: businessProfile?.business_id,
            },
          }),
        );

        const facebookAdAccounts = response.data.getFacebookAdAccounts;

        if (facebookAdAccounts.error) {
          throw new Error(facebookAdAccounts.error);
        }

        if (facebookAdAccounts.data.length > 0) {
          setFacebookAds(facebookAdAccounts.data);
        }
      }
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    } finally {
      setLoading(false);
    }
  };

  const connectFacebookAdAccount = async () => {
    setLoadingConnection(true);

    try {
      const fintAdAccount = facebookAds.find(
        (item) => item.id === selectedFacebookAdAccount,
      );

      const response: any = await API.graphql(
        graphqlOperation(setSocialAdAccount, {
          setSocialAdAccountInput: {
            business_id: businessProfile?.business_id,
            ad_account_id: fintAdAccount?.id,
            currency: fintAdAccount?.currency,
            platform: 'facebook',
          },
        }),
      );

      const data = response.data.setSocialAdAccount;

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (businessProfile) {
        setBusinessProfile({
          facebook_ad_account_currency: fintAdAccount?.currency,
          facebook_ad_account_id: fintAdAccount?.id,
          facebook_ad_account_name: fintAdAccount?.name,
          isLoading: false,
          profilePrisma: businessProfile?.profilePrisma,
          userRole: businessProfile?.userRole as number,
          trackerStatus: businessProfile?.trackerStatus as boolean,
        });
      }

      setDialogOptions({
        type: 'success',
        message: 'Facebook Ad Account Connected',
        description: 'Facebook Is Fully Connected',
      });

      setShowDialog(true);

      setTimeout(() => {
        setSelectedAccount(false);
      }, 2000);
    } catch (error: any) {
      setShowDialog(true);
      setDialogOptions({
        type: 'error',
        message: 'An error occurred while connecting your ad account',
      });
    } finally {
      setLoadingConnection(false);
    }
  };

  useEffect(() => {
    if (businessProfile?.facebook_accessToken) {
      getUserAdAccounts('fb');
    }
  }, [businessProfile?.facebook_accessToken]);

  return (
    <div className="widget-container !shadow-lg  bg-white">
      {!businessProfile?.facebook_accessToken ? (
        <ConnectAccount
          handleConnect={facebookLoginCallback}
          title={'Facebook'}
          icon={'facebook.svg'}
          setSelectedAccount={setSelectedAccount}
        />
      ) : (
        <div className="rounded-xl px-5 py-2">
          <div>
            <h6 className="mb-2 flex items-center">Facebook account</h6>

            <div className=" border border-extraLightColor  bg-white rounded-xl mb-5 p-4">
              <div
                className={`flex items-center ${facebookAds.length > 0 ? 'justify-between' : 'justify-center'
                  }`}
              >
                <div className="flex items-center">
                  <Image
                    src="images/facebook.svg"
                    width={30}
                    height={30}
                    alt="fb"
                  />
                  <span className="ml-1 text-base font-semibold">
                    {fbAccountName}
                  </span>

                  <span className="tag green ml-1.5">Connected</span>
                </div>

                {facebookAds.length > 0 && (
                  <SocialButton
                    className="flex items-center cursor-pointer"
                    provider="facebook"
                    appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
                    onLoginSuccess={facebookLoginCallback}
                    onLoginFailure={() => disconnectModalRef?.current?.click()}
                    autoLoad={false}
                    fields="name"
                    scope="public_profile,ads_read,ads_management"
                  >
                    <Image
                      src="images/edit-icon.svg"
                      width={20}
                      height={20}
                      alt="edit"
                    />
                    <span className="link ml-1">Change</span>
                  </SocialButton>
                )}
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <div className=" border border-extraLightColor  bg-white rounded-xl mt-4 p-5">
                <div className=" flex items-center justify-center bg-white p-5">
                  <div className="inline-flex items-center justify-center flex-col">
                    <div className="spinner"></div>
                    <div className="font-semibold text-primaryColor mt-3">
                      Loading
                    </div>
                  </div>
                </div>
              </div>
            ) : facebookAds.length > 0 ? (
              <>
                <div className=" border border-extraLightColor  bg-white rounded-xl mb-6 p-4">
                  <h3 className="text-xl flex items-center ">
                    Connect Facebook Ad Account
                  </h3>

                  <SearchInput
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />

                  <div className="flex flex-col max-h-[160px] overflow-y-auto">
                    {facebookAds
                      .filter((ad) =>
                        ad.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()),
                      )
                      .map((ad) => (
                        <span
                          key={ad.id}
                          className={`text-base mb-2 px-2 py-1 mr-2 pointer ${selectedFacebookAdAccount === ad.id &&
                            'bg-bodyColor border border-borderLightColor rounded'
                            }`}
                          onClick={() =>
                            setSelectedFacebookAdAccount(
                              selectedFacebookAdAccount !== ad.id
                                ? ad.id
                                : null,
                            )
                          }
                        >
                          {ad.name} - {ad.id}
                        </span>
                      ))}
                  </div>
                </div>

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
                      disabled={!selectedFacebookAdAccount}
                      onClick={connectFacebookAdAccount}
                    >
                      <span className="ml-1">Connect</span>
                    </button>
                  ) : (
                    <LoadingButton text="Loading" />
                  )}
                </div>
              </>
            ) : (
              <DontHaveAdsAccounts
                typeAccount="Facebook"
                handleChangeAccount={facebookLoginCallback}
                setSelectedAccount={setSelectedAccount}
              />
            )}
          </div>
        </div>
      )}

      <button
        ref={disconnectModalRef}
        data-bs-toggle="modal"
        data-bs-target="#failedIntegration"
      />
      <TailwindModal id="failedIntegration">
        <FailedIntegration type={'Facebook'} />
      </TailwindModal>

      <TailwindModal id="connectedAccount">
        <ConnectedAccountModal
          type="success"
          title="Facebook account connected"
          description="Now you can connect your Facebook Ads account"
          actionButton={() => {
            setSelectedAccount(false);
          }}
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

export default ConnectFacebookAccount;
