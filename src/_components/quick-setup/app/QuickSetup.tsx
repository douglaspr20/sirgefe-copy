'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import UpdateShopifyAccount from '_components/quick-setup/UpdateShopifyAccount';
import ProgressStepper from '_components/quick-setup/ProgressStepper';
import IntegrationsAndAdAccounts, {
  AccountType,
} from '_components/quick-setup/IntegrationsAndAdAccounts';
import Spinner from '_components/Spinner';
import ConnectExistingAds from '_components/quick-setup/ConnectExistingAds';
import { useBoundStore } from '@store/index';
import { BusinessProfile } from '@interfaces/business';
import { AdAccountSettingsPrisma, UserPrisma } from 'API';

export type QuickFlowStep =
  | 'Shopify store'
  | 'Integrations and ad accounts'
  | 'Connect your existing ads';

export type AdAccountSettings = {
  facebook: AdAccountSettingsPrisma | undefined;
  tiktok: AdAccountSettingsPrisma | undefined;
  google: AdAccountSettingsPrisma | undefined;
};

const QuickSetup: NextPage = () => {
  const router = useRouter();

  const {
    showButton,
    isUpdating,
    loadingSetup,
    userHaveAds,
    textMainButton,
    textSecondaryButton,
    executeMainButtonAction,
    executeSecondaryButtonAction,
    currentStep,
    setCurrentStep,
    businessProfile,
    userProfile,
  } = useBoundStore((state) => state);

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType>(false);
  const [accounts, setAccounts] = useState<AdAccountSettings>();

  const stepNumber = useMemo(() => {
    if (currentStep === 'Integrations and ad accounts') return 2;

    if (currentStep === 'Connect your existing ads') return 3;

    return 1;
  }, [currentStep]);

  const onboardingPath = useMemo(() => '/selector', []);

  useEffect(() => localStorage.setItem('onboarding-completed', 'false'), []);

  useEffect(() => {
    const step = localStorage.getItem('quick-setup-step');
    if (step === 'tiktok-account-integration') {
      setCurrentStep('Integrations and ad accounts');

      setSelectedAccount('TikTok');

      localStorage.removeItem('quick-setup-step');
    }
  }, []);

  useEffect(() => {
    const getAccount = (name: 'facebook' | 'tiktok' | 'google') => {
      const accounts = businessProfile?.profilePrisma?.ad_account_settings;

      return accounts?.find(
        (account) => account.ad_platform.internal_source_name === name,
      );
    };

    setAccounts({
      facebook: getAccount('facebook'),
      tiktok: getAccount('tiktok'),
      google: getAccount('google'),
    });
  }, [businessProfile, businessProfile?.profilePrisma?.ad_account_settings]);

  return (
    <>
      <div className="grow px-6 py-8 mb-4 overflow-y-auto z-10 h-full">
        <div className="w-full px-10 mx-auto h-full relative">
          <ProgressStepper stepNumber={stepNumber} />
          <div className={`mt-4 pb-6`}>
            {currentStep === 'Shopify store' && (
              <UpdateShopifyAccount
                setCurrentStep={setCurrentStep}
                businessProfile={businessProfile as BusinessProfile}
                userProfile={userProfile as UserPrisma}
              />
            )}

            {currentStep === 'Integrations and ad accounts' && (
              <IntegrationsAndAdAccounts
                accounts={accounts as AdAccountSettings}
                selectedAccount={selectedAccount}
                setSelectedAccount={setSelectedAccount}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 'Connect your existing ads' && (
              <ConnectExistingAds
                accounts={accounts as AdAccountSettings}
                isConnecting={isConnecting}
                setIsConnecting={setIsConnecting}
                onboardingPath={onboardingPath}
              />
            )}
          </div>

          {showButton && !loadingSetup && (
            <div className="flex items-center absolute bottom-[110px] right-5 w-full">
              {currentStep === 'Connect your existing ads' && userHaveAds && (
                <>
                  <span
                    className="cursor-pointer text-darkGrade50 ml-[35px]"
                    onClick={() => router.push(onboardingPath)}
                  >
                    I will do it later in settings
                  </span>

                  <button
                    className="btn light-black !rounded-full !py-5 !px-8 ml-auto mr-3"
                    onClick={() => executeSecondaryButtonAction()}
                  >
                    {textSecondaryButton}
                  </button>
                </>
              )}
              <button
                className={`flex items-center bg-black font-semibold text-white rounded-full py-5 px-10 ${
                  currentStep !== 'Connect your existing ads' || !userHaveAds
                    ? 'ml-auto'
                    : ''
                }`}
                onClick={() => executeMainButtonAction()}
              >
                {textMainButton}{' '}
                {textMainButton === 'Continue' && (
                  <i className="icon-chevron-right" />
                )}
                {isUpdating && <Spinner />}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickSetup;
