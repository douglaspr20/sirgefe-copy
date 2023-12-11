import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ConnectAccount from './ConnectAccount';
import * as Sentry from '@sentry/nextjs';
import { User } from '@sirge-io/sirge-types';
import TailwindModal from '@components/modals/TailwindModal';
import FailedIntegration from '@components/modals/tailwindTypes/FailedIntegration';
import ConnectedAccountModal from '@components/modals/tailwindTypes/ConnectedAccountModal';
import { useGoogleLogin } from '@react-oauth/google';
import { API, graphqlOperation } from 'aws-amplify';
import { setSocialAdAccount, setSocialUserAccess } from '@graphql/mutations';
import { getGoogleAccountInfo } from '@utils/google';
import {
  getBusinessByVanityName,
  getBusinessGoogleAccounts,
  getBusinessGoogleNewToken,
} from '@graphql/queries';
import DontHaveAdsAccounts from './DontHaveAdsAccounts';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { GoogleCustomer, UserPrisma } from 'API';
import SearchInput from '@components/SearchInput';
import { AccountType } from './IntegrationsAndAdAccounts';
import { LoadingButton } from '@components/LoadingButton';
import { useBoundStore } from '@store/index';

type Props = {
  userProfile: UserPrisma;
  setSelectedAccount: Dispatch<SetStateAction<AccountType>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setDialogOptions: Dispatch<
    SetStateAction<{
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

  const business = businessProfile;

  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [googleAccountEmail, setGoogleAccountEmail] = useState<string>('');
  const [googleAdsAccounts, setGoogleAdsAccount] = useState<GoogleCustomer[]>(
    [],
  );
  const [selectedGoogleAdAccount, setSelectedGoogleAdAccount] = useState<
    string | null
  >(null);

  const [loadingConnection, setLoadingConnection] = useState<boolean>(false);

  const disconnectModalRef = useRef<HTMLButtonElement | null>(null);
  const responseModalButtonRef = useRef<HTMLButtonElement | null>(null);

  /**
   * Connect Google
   */
  const googleLoginCallback = async (googleResponse: any) => {
    try {
      if (!googleResponse.code) {
        throw new Error('Google auth failed');
      }

      const responseSetToken: any = await API.graphql(
        graphqlOperation(setSocialUserAccess, {
          socialAccessStoreInput: {
            business_id: business?.business_id,
            access_token: googleResponse.code,
            platform: 'google',
          },
        }),
      );

      if (responseSetToken.data.setSocialUserAccess.error) {
        throw new Error(
          responseSetToken.data.setSocialUserAccess.error.message,
        );
      }

      const businessResponse: any = await API.graphql(
        graphqlOperation(getBusinessByVanityName, {
          getBusinessByVanityNameInput: {
            vanity_name: business?.vanity_name,
          },
        }),
      );

      const businessData = businessResponse.data.getBusinessByVanityName;

      if (businessData.error) {
        throw new Error('Something went wrong');
      }

      setBusinessProfile({
        google_ad_accessToken: businessData.data.google_ad_accessToken,
        isLoading: false,
        profilePrisma: business?.profilePrisma,
        userRole: business?.userRole as number,
        trackerStatus: business?.trackerStatus as boolean,
      });

      responseModalButtonRef.current?.click();

      setLoading(true);
      const responseGoogleAccounts: any = await API.graphql(
        graphqlOperation(getBusinessGoogleAccounts, {
          getBusinessGoogleAccountsInput: {
            business_id: business?.business_id,
          },
        }),
      );

      if (responseGoogleAccounts.data.getBusinessGoogleAccounts.error) {
        return setGoogleAdsAccount([]);
      }

      setGoogleAdsAccount(
        responseGoogleAccounts.data.getBusinessGoogleAccounts.data,
      );
    } catch (error: any) {
      disconnectModalRef?.current?.click();
      Sentry.captureException(new Error(error as any));
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleAdAccount = async () => {
    setLoadingConnection(true);

    try {
      const response: any = await API.graphql(
        graphqlOperation(setSocialAdAccount, {
          setSocialAdAccountInput: {
            business_id: business?.business_id,
            ad_account_id: selectedGoogleAdAccount?.replace('customers/', ''),
            platform: 'google',
          },
        }),
      );

      const data = response.data.setSocialAdAccount;

      if (data.error) {
        setDialogOptions({
          type: 'error',
          message: 'An error ocurred connecting your ad account',
        });

        setLoadingConnection(false);
        return setShowDialog(true);
      }
      setDialogOptions({
        type: 'success',
        message: 'Google Ads account connected',
        description: 'Google Ads is fully connected',
      });

      setShowDialog(true);

      setBusinessProfile({
        google_ad_account_id: selectedGoogleAdAccount,
        isLoading: false,
        profilePrisma: business?.profilePrisma,
        userRole: business?.userRole as number,
        trackerStatus: business?.trackerStatus as boolean,
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

  const googleLogin = useGoogleLogin({
    onSuccess: googleLoginCallback,
    onError: () => disconnectModalRef?.current?.click(),
    flow: 'auth-code',
  });

  useEffect(() => {
    const getGoogleInfoEmail = async () => {
      setLoading(true);
      const newToken: any = await API.graphql(
        graphqlOperation(getBusinessGoogleNewToken, {
          getBusinessNewTokenInput: {
            business_id: business?.business_id,
          },
        }),
      );

      const googleAccountInfo = await getGoogleAccountInfo(
        newToken.data.getBusinessGoogleNewToken.data || '',
      );

      if (googleAccountInfo.email) {
        setGoogleAccountEmail(googleAccountInfo.email);
      }

      const responseGoogleAccounts: any = await API.graphql(
        graphqlOperation(getBusinessGoogleAccounts, {
          getBusinessGoogleAccountsInput: {
            business_id: business?.business_id,
          },
        }),
      );

      if (responseGoogleAccounts.data.getBusinessGoogleAccounts.data) {
        setGoogleAdsAccount(
          responseGoogleAccounts.data.getBusinessGoogleAccounts.data,
        );
      }
      setLoading(false);
    };

    if (business?.google_ad_accessToken) {
      getGoogleInfoEmail();
    }
  }, [business?.google_ad_accessToken, business?.business_id]);

  return (
    <div className="widget-container !shadow-lg  bg-white rounded-xl rounded-xl px-5 py-2">
      {business?.google_ad_accessToken ? (
        <div className="">
          <h4 className="mb-1">Google account</h4>

          <div
            className={` 
            border border-extraLightColor  bg-white rounded-xl  p-4
          flex items-center
          ${googleAdsAccounts.length > 0 ? 'justify-between' : 'justify-center'}
          `}
          >
            <div className="flex items-center">
              <Image
                src={`/images/google.svg`}
                width={20}
                height={20}
                alt="clip"
              />

              <span className="ml-1.5">{googleAccountEmail}</span>

              <span className="tag-small green ml-1.5">Connected</span>
            </div>

            {googleAdsAccounts.length > 0 && (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => googleLogin()}
              >
                <Image
                  src="images/edit-icon.svg"
                  width={20}
                  height={20}
                  alt="edit"
                />
                <span className="link ml-2">Change</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="border border-extraLightColor  bg-white rounded-xl mt-4 p-5">
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
              {googleAdsAccounts.length > 0 ? (
                <>
                  <h4 className="mt-4 mb-2">Google Ad Account</h4>
                  <div className="border border-extraLightColor  bg-white rounded-xl p-4">
                    <h3>Select Google Ad Account</h3>

                    <SearchInput
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />

                    <div className="flex flex-col max-h-[160px] overflow-y-auto">
                      {googleAdsAccounts
                        .filter((adAccount) =>
                          adAccount.descriptiveName
                            ?.toLowerCase()
                            .includes(searchValue.toLowerCase()),
                        )
                        .map((adAccount) => (
                          <span
                            key={adAccount.resourceName}
                            className={`text-base mb-2 px-2 py-1 mr-2 pointer ${
                              selectedGoogleAdAccount ===
                                adAccount.resourceName &&
                              'bg-bodyColor border border-borderLightColor rounded'
                            }`}
                            onClick={() =>
                              setSelectedGoogleAdAccount(adAccount.resourceName)
                            }
                          >
                            {adAccount.descriptiveName.length > 0
                              ? adAccount.descriptiveName
                              : adAccount.resourceName}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex items-center mt-3 justify-end ">
                    <button
                      className="btn light mr-2"
                      onClick={() => setSelectedAccount(false)}
                    >
                      <span>Cancel</span>
                    </button>

                    {!loadingConnection ? (
                      <button
                        className="btn"
                        disabled={!selectedGoogleAdAccount}
                        onClick={() => connectGoogleAdAccount()}
                      >
                        Connect
                      </button>
                    ) : (
                      <>
                        <LoadingButton text="Loading" />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <DontHaveAdsAccounts
                  typeAccount="Google"
                  handleChangeAccount={googleLogin}
                  setSelectedAccount={setSelectedAccount}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <ConnectAccount
          handleConnect={() => googleLogin()}
          title={'Google'}
          icon={'google.svg'}
          setSelectedAccount={setSelectedAccount}
        />
      )}

      <button
        ref={disconnectModalRef}
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#failedIntegration"
      />
      <TailwindModal id="failedIntegration">
        <FailedIntegration type={'Google'} />
      </TailwindModal>

      <TailwindModal id="connectedAccount">
        <ConnectedAccountModal
          type="success"
          title="Google account connected"
          description="Now you can connect your Google Ads account"
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
