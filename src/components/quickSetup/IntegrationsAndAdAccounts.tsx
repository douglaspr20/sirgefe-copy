import Image from 'next/image';
import ConnectClip from '@assets/icons/ConnectClip';
import ConnectFacebookAccount from './ConnectFacebookAccount';
import ConnectTiktokAccount from '@components/quickSetup/ConnectTiktokAccount';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConnectGoogleAccount from '@components/quickSetup/ConnectGoogleAccount';
import { QuickFlowStep } from '@components/quick-setup/app/QuickSetup';
import { useEffect, useState } from 'react';
import TailwindModal from '@components/modals/TailwindModal';
import { Message } from '@components/modals/tailwindTypes';
import { ValidTypeMessages } from '@components/organic-content/CreatedModal';
import { useBoundStore } from '@store/index';
import { UserPrisma } from 'API';

export type AccountType = 'Facebbok' | 'TikTok' | 'Google' | boolean;

type Props = {
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType>>;
  selectedAccount: AccountType;
  setCurrentStep: (value: QuickFlowStep) => void;
};

const IntegrationsAndAdAccounts: React.FunctionComponent<Props> = ({
  selectedAccount,
  setSelectedAccount,
  setCurrentStep,
}) => {
  const { businessProfile, userProfile, setMainButtonAction, setShowButton } =
    useBoundStore((state) => state);
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

              {businessProfile?.facebook_accessToken &&
              businessProfile?.facebook_ad_account_name ? (
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

            {businessProfile?.facebook_accessToken &&
              businessProfile?.facebook_ad_account_name && (
                <div className="bg-greyLight  mt-2 rounded-md p-2">
                  <div className="w-full  flex items-center">
                    <Image
                      src="images/facebook-black.svg"
                      width={20}
                      height={20}
                      alt="fb"
                    />
                    <span className="text-sm font-normal ml-2">
                      {businessProfile?.facebook_ad_account_name}
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

              {businessProfile?.tik_tok_access_token &&
              businessProfile?.tik_tok_ad_account_name ? (
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

            {businessProfile?.tik_tok_access_token &&
              businessProfile?.tik_tok_ad_account_name && (
                <div className="bg-greyLight  mt-2 rounded-md p-2">
                  <div className="w-full  flex items-center">
                    <Image
                      src="images/tiktok-gray.svg"
                      width={20}
                      height={20}
                      alt="tiktok"
                    />
                    <span className="text-sm font-normal ml-2">
                      {businessProfile?.tik_tok_ad_account_name}
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

              {businessProfile?.google_ad_accessToken &&
              businessProfile?.google_ad_account_id ? (
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

            {businessProfile?.google_ad_accessToken &&
              businessProfile?.google_ad_account_id && (
                <div className="bg-greyLight  mt-2 rounded-md p-2">
                  <div className="w-full  flex items-center">
                    <Image
                      src={`/images/google.svg`}
                      width={20}
                      height={20}
                      alt="google"
                    />
                    <span className="text-sm font-normal ml-2">
                      {businessProfile.profile?.google_ad_account_id}
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
              setSelectedAccount={setSelectedAccount}
              setShowDialog={setShowDialog}
              setDialogOptions={setDialogOptions}
            />
          )}

          {selectedAccount === 'TikTok' && (
            <ConnectTiktokAccount
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
