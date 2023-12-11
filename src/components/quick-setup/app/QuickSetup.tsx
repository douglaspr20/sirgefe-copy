'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { NextPage } from 'next';
import { Business, User } from '@sirge-io/sirge-types';
import UpdateShopifyAccount from '@components/quickSetup/UpdateShopifyAccoun';
import ProgressStepper from '@components/quickSetup/ProgressStepper';
import IntegrationsAndAdAccounts, {
  AccountType,
} from '@components/quickSetup/IntegrationsAndAdAccounts';
import Spinner from '@components/Spinner';
import ConnectExistingAds from '@components/quickSetup/ConnectExistingAds';
import { useBoundStore } from '@store/index';
import { BusinessProfile } from '@interfaces/business';
import { UserPrisma } from 'API';

export type QuickFlowStep =
  | 'Shopify store'
  | 'Integrations and ad accounts'
  | 'Connect your existing ads';

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
  } = useBoundStore.getState();

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType>(false);

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

  return (
    <>
      <div className="grow px-6 py-8 mb-4 overflow-y-auto z-10 h-full">
        <div className="w-full px-10 mx-auto h-full relative">
          {/* <QuickSetupStepper
              currentStep={currentStep}
              stepNumber={stepNumber}
              setCurrentStep={setCurrentStep}
            /> */}

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
                selectedAccount={selectedAccount}
                setSelectedAccount={setSelectedAccount}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 'Connect your existing ads' && (
              <ConnectExistingAds
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
