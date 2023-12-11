import Image from 'next/image';
import ConnectClip from '@assets/icons/ConnectClip';
import ConnectFacebookAccount from './ConnectFacebookAccount';
import ConnectTiktokAccount from '_components/quick-setup/ConnectTiktokAccount';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConnectGoogleAccount from '_components/quick-setup/ConnectGoogleAccount';
import {
  AdAccountSettings,
  QuickFlowStep,
} from '_components/quick-setup/app/QuickSetup';
import { useEffect, useState } from 'react';
import TailwindModal from '@components/modals/TailwindModal';
import { Message } from '@components/modals/tailwindTypes';
import { ValidTypeMessages } from '_components/organic-content/CreatedModal';
import { useBoundStore } from '@store/index';
import { UserPrisma } from 'API';

export type AccountType = 'Facebbok' | 'TikTok' | 'Google' | boolean;

type Props = {
  accounts: AdAccountSettings;
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType>>;
  selectedAccount: AccountType;
  setCurrentStep: (value: QuickFlowStep) => void;
};

const IntegrationsAndAdAccounts: React.FunctionComponent<Props> = ({
  accounts,
  selectedAccount,
  setSelectedAccount,
  setCurrentStep,
}) => {
  const { userProfile, setMainButtonAction, setShowButton } = useBoundStore(
    (state) => state,
  );

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
    description?: string;
  }>({
    type: 'success',
    message: '',
    description: ' ',
  });

  useEffect(() => {
    setMainButtonAction({
      callback: () => setCurrentStep('Connect your existing ads'),
    });

    setShowButton(selectedAccount ? false : true);
  }, [setCurrentStep, setMainButtonAction, selectedAccount, setShowButton]);

  return (
    <>
      {!selectedAccount ? (
        <div>
          <div className=" border border-extraLightColor  bg-white rounded-xl !shadow-xl mb-5 p-4">
            <div className={`flex items-center justify-between`}>
              <div>
                <div className="flex items-center">
                  <Image
                    src="images/facebook.svg"
                    width={26}
                    height={26}
                    alt="fb"
                  />
                  <span className="ml-2 text-base font-semibold">Facebook</span>
                </div>
              </div>

              {accounts?.facebook?.access_token &&
              accounts.facebook.social_account_name ? (
                <span className="tag green font-medium">Connected</span>
              ) : (
                <>
                  <button
                    className="inline-flex items-center link cursor-pointer"
                    onClick={() => setSelectedAccount('Facebbok')}
                  >
                    <ConnectClip width={22} height={19} />
                    <span className="ml-1 font-semibold">Connect</span>
                  </button>
                </>
              )}
            </div>

            {accounts?.facebook?.access_token &&
              accounts.facebook.social_account_name && (
                <div className="bg-greyLight  mt-2 rounded-md p-2">
                  <div className="w-full  flex items-center">
                    <Image
                      src="images/facebook-black.svg"
                      width={20}
                      height={20}
                      alt="fb"
                    />
                    <span className="text-sm font-normal ml-2">
                      {accounts.facebook.social_account_name}
                    </span>
                  </div>
                </div>
              )}
          </div>

          <div className=" border border-extraLightColor  bg-white rounded-xl !shadow-lg mb-5 p-4">
            <div className={`flex items-center justify-between`}>
              <div className="flex items-center">
                <Image
                  src={`images/tiktok.svg`}
                  width={30}
                  height={30}
                  alt="tiktok"
                />
                <span className="ml-2 text-base font-semibold">TikTok</span>
              </div>

              {accounts?.tiktok?.access_token &&
              accounts?.tiktok?.social_account_name ? (
                <span className="tag green font-medium">Connected</span>
              ) : (
                <>
                  <button
                    className="inline-flex items-center link"
                    onClick={() => setSelectedAccount('TikTok')}
                  >
                    <ConnectClip width={22} height={19} />
                    <span className="ml-1 font-semibold">Connect</span>
                  </button>
                </>
              )}
            </div>

            {accounts?.tiktok?.access_token &&
              accounts?.tiktok?.social_account_name && (
                <div className="bg-greyLight  mt-2 rounded-md p-2">
                  <div className="w-full  flex items-center">
                    <Image
                      src="images/tiktok-gray.svg"
                      width={20}
                      height={20}
                      alt="tiktok"
                    />
                    <span className="text-sm font-normal ml-2">
                      {accounts.tiktok.social_account_name}
                    </span>
                  </div>
                </div>
              )}
          </div>

          <div className=" border border-extraLightColor  bg-white rounded-xl !shadow-lg mb-5 p-4">
            <div className={`flex items-center justify-between`}>
              <div className="flex items-center">
                <Image
                  src={`/images/google.svg`}
                  width={30}
                  height={30}
                  alt="google"
                />
                <span className="ml-2 text-base font-semibold">Google</span>
              </div>

              {accounts?.google?.access_token &&
              accounts?.google?.social_account_id ? (
                <span className="tag green font-medium">Connected</span>
              ) : (
                <>
                  <button
                    className="inline-flex items-center link"
                    onClick={() => setSelectedAccount('Google')}
                  >
                    <ConnectClip width={22} height={19} />
                    <span className="ml-1 font-semibold">Connect</span>
                  </button>
                </>
              )}
            </div>

            {accounts?.google?.access_token &&
              accounts?.google?.social_account_id && (
                <div className="bg-greyLight  mt-2 rounded-md p-2">
                  <div className="w-full  flex items-center">
                    <Image
                      src={`/images/google.svg`}
                      width={20}
                      height={20}
                      alt="google"
                    />
                    <span className="text-sm font-normal ml-2">
                      {accounts.google.social_account_id}
                    </span>
                  </div>
                </div>
              )}
          </div>
        </div>
      ) : (
        <>
          {selectedAccount === 'Facebbok' && (
            <ConnectFacebookAccount
              access_token={accounts?.facebook?.access_token}
              name={accounts?.facebook?.social_account_name as string}
              setSelectedAccount={setSelectedAccount}
              setShowDialog={setShowDialog}
              setDialogOptions={setDialogOptions}
            />
          )}

          {selectedAccount === 'TikTok' && (
            <ConnectTiktokAccount
              access_token={accounts?.facebook?.access_token}
              name={accounts?.tiktok?.social_account_name as string}
              setSelectedAccount={setSelectedAccount}
              setShowDialog={setShowDialog}
              setDialogOptions={setDialogOptions}
            />
          )}

          {selectedAccount === 'Google' && (
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
            >
              <ConnectGoogleAccount
                userProfile={userProfile as UserPrisma}
                setSelectedAccount={setSelectedAccount}
                setShowDialog={setShowDialog}
                setDialogOptions={setDialogOptions}
              />
            </GoogleOAuthProvider>
          )}
        </>
      )}

      <TailwindModal
        id="successModal"
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      >
        <Message
          title={dialogOptions.message}
          type={dialogOptions.type}
          description={dialogOptions.description}
        />
      </TailwindModal>
    </>
  );
};

export default IntegrationsAndAdAccounts;
