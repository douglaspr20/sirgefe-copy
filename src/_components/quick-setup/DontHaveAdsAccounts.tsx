import React, { FC, SetStateAction } from 'react';
import Image from 'next/image';
import SocialButton from '_components/integrations/SocialButton';
import { AccountType } from './IntegrationsAndAdAccounts';

interface Props {
  typeAccount: 'Facebook' | 'TikTok' | 'Google';
  handleChangeAccount: (facebookResponse?: any) => void | Promise<void>;
  setSelectedAccount: React.Dispatch<SetStateAction<AccountType>>;
}

const DontHaveAdsAccounts: FC<Props> = ({
  typeAccount,
  handleChangeAccount,
  setSelectedAccount,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-18 mt-5">
      <div className="text-center">
        <Image src="images/no-ad-icon.svg" width={30} height={30} alt="edit" />
      </div>

      <div className="text-center mt-3">
        <h5 className="mb-1 text-lg">
          You don’t have any Ads accounts connected in your {typeAccount}{' '}
          account{' '}
        </h5>

        <span className="font-normal text-base text-textTeriraryColor">
          You can change your {typeAccount} account or connect it later
        </span>

        <div className="flex flex-row items-center justify-center mt-[20px]">
          {typeAccount === 'Facebook' ? (
            <SocialButton
              className="btn w-[160px] mx-4 p-2"
              provider="facebook"
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
              onLoginSuccess={handleChangeAccount}
              autoLoad={false}
              fields="name"
              scope="public_profile,ads_read,ads_management"
            >
              <span className="font-semibold">Change account</span>
            </SocialButton>
          ) : (
            <button
              className="btn w-[147px] mx-4 p-2"
              onClick={() => handleChangeAccount()}
            >
              <span>Change account</span>
            </button>
          )}

          <button
            type="button"
            className="btn light ml-3"
            style={{ width: 150 }}
            onClick={() => {
              setSelectedAccount(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DontHaveAdsAccounts;
