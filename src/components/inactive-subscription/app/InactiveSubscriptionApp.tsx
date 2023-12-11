'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useRouter, useParams } from 'next/navigation';
import {
  addDiscountCode,
  createShopifySubscription,
  removeDiscountCode,
} from '@graphql/mutations';
import * as Sentry from '@sentry/nextjs';
import fetchCurrentUserDetails from 'api/fetchCurrentUserDetails';
import BoltLoader from '@components/loader/BoltLoader';
import { applyPromoCodeSchema } from '@interfaces/formsSchema';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import TailwindModal from '@components/modals/TailwindModal';
import PromoCodeApplied from '@components/modals/tailwindTypes/PromoCodeApplied';
import DiscountCode from '@components/settings/billing/DiscountCode';
import TiersDetails from '@components/inactive-subscription/TiersDetails';
import EarlyAdopter from '@components/inactive-subscription/EarlyAdopter';
import { useBoundStore } from '@store/index';

function InactiveSubscriptionApp() {
  const router = useRouter();
  const params = useParams();

  const { userProfile, selectedBusiness, setSelectedBusiness, setUserProfile } =
    useBoundStore((state) => state);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [subscriptionUpdating, setSubscriptionUpdating] = useState(true);

  const [promoCode, setPromoCode] = useState<{
    amount: number;
    code: string;
    duration: number | null;
    status: string;
    type: string;
  }>();

  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('charge_id')) {
      setSubscriptionUpdating(true);
    } else {
      setSubscriptionUpdating(false);
    }
  }, []);

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
    messageTwo: string;
  }>();

  const redirect = () => {
    window.open(`https://apps.shopify.com/sirge-3`, '_self');
  };

  // useEffect(() => {
  //   if (userProfile?.account_state === 'active') {
  //     if (params?.redirect?.includes('quick-setup')) {
  //       router.push('/quick-setup');
  //     } else {
  //       router.push('/selector');
  //     }
  //   }
  // }, [userProfile]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchCurrentUserDetails({
          Auth,
          API,
        });

        setUserProfile(userDetails.userProfileData);
        // if (userDetails?.userProfileData?.account_state === 'active') {
        //   if (params?.redirect?.includes('quick-setup')) {
        //     router.push('/quick-setup');
        //   } else {
        //     router.push('/selector');
        //   }
        // }

        router.push('/selector');
      } catch (error) {
        console.log('error', error);
      }
    };

    const currentUrl = window.location.href;
    if (currentUrl.includes('charge_id')) {
      const interval = setInterval(() => {
        getUserDetails();
      }, 2200);
      return () => clearInterval(interval);
    }
  }, []);

  const handlePlanSelect = async (plan: string): Promise<void> => {
    setLoading(true);
    const createShopifyPlanResponse: any = await API.graphql(
      graphqlOperation(createShopifySubscription, {
        createShopifySubscriptionInput: {
          plan_name: plan,
          business_id: selectedBusiness?.id,
        },
      }),
    );

    if (createShopifyPlanResponse.data.createShopifySubscription.data?.error) {
      Sentry.captureException(
        new Error(
          createShopifyPlanResponse.data.createShopifySubscription.data?.error,
        ),
      );
    }
    const { confirmationUrl } =
      createShopifyPlanResponse?.data?.createShopifySubscription?.data;

    if (confirmationUrl) {
      router.push(confirmationUrl);
    } else {
      setLoading(false);
    }
  };

  const handleApplyPromoCode = async (data: applyPromoCodeSchema) => {
    setIsSending(true);

    try {
      const response: any = await API.graphql(
        graphqlOperation(addDiscountCode, {
          addDiscountCodeInput: {
            discount_code: data.promoCode,
          },
        }),
      );
      if (response.data?.addDiscountCode.error) {
        throw new Error(response.data?.addDiscountCode.error.message);
      }

      if (
        !response.data?.addDiscountCode.data?.code ||
        response.data?.addDiscountCode.data?.status !== 'active'
      ) {
        setDialogOptions({
          type: 'error',
          message: 'Not Valid',
          messageTwo: 'This promo code is not valid',
        });
      } else {
        setDialogOptions({
          type: 'success',
          message: 'Promo code applied',
          messageTwo: 'Next payment will be with discount',
        });
        setPromoCode(response.data?.addDiscountCode.data);
        // updateUserProfileInApp({
        //   subscription: {
        //     ...userProfile?.subscription,
        //     promo_code: response.data?.addDiscountCode.data,
        //   },
        // });
      }
    } catch (error: any) {
      console.log('error', error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
        messageTwo: '',
      });
    } finally {
      setShowDialog(true);
      setIsSending(false);
    }
  };

  const handleRemovePromoCode = async () => {
    setIsSending(true);

    try {
      const response: any = await API.graphql(
        graphqlOperation(removeDiscountCode),
      );
      if (response.data?.removeDiscountCode.error) {
        throw new Error(response.data?.removeDiscountCode.error.message);
      }

      if (!response.data?.removeDiscountCode?.data) {
        setDialogOptions({
          type: 'error',
          message: 'Not Valid',
          messageTwo: 'This promo code is not valid',
        });
      } else {
        setDialogOptions({
          type: 'success',
          message: 'Promo code removed',
          messageTwo: 'Successfully removed promo code',
        });
        // updateUserProfileInApp({
        //   subscription: {
        //     ...userProfile?.subscription,
        //     promo_code: undefined,
        //   },
        // });
      }
    } catch (error: any) {
      console.log('error', error);
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
        messageTwo: '',
      });
    } finally {
      setShowDialog(true);
      setIsSending(false);
    }
  };

  // if (
  //   selectedBusiness?.business_plan &&
  //   selectedBusiness?.subscription?.status === 'active'
  // ) {
  //   return <div></div>;
  // }

  if (!selectedBusiness?.store?.store_url) {
    return (
      <div className="hero">
        <div className="grow px-6 py-4 overflow-y-auto mb-6">
          <div className="max-w-2xl mx-auto">
            <div className="widget-container mb-8 p-4">
              <div className="text-center flex flex-col items-center gap-4 pb-4">
                <h3>Welcome {userProfile?.first_name}</h3>
                <p className="text-textSecondaryColor">
                  You don’t have our app installed. Please install it to start
                  using Sirge.
                </p>
                <Image
                  src="/images/missing-plan.svg"
                  width={116}
                  height={116}
                  alt="missing-plan"
                />
                <button className="btn" onClick={redirect}>
                  Install our app
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <div className="overflow-y-auto flex flex-col h-screen pb-4">
        {subscriptionUpdating ? (
          <>
            <div className="text-center">
              <h3>Checking Subscription</h3>
            </div>
            <BoltLoader />
          </>
        ) : (
          <>
            {process.env.NEXT_PUBLIC_METERED_BILLING_STATUS === 'active' ? (
              <div className="grow px-6 py-4 overflow-y-auto mb-6">
                <div className="max-w-2xl mx-auto">
                  <div className="widget-container mb-8 p-4">
                    <div className="flex flex-col items-center gap-4 pb-4 ">
                      <h3 className="mt-4">
                        Welcome {userProfile?.first_name}
                      </h3>
                      <p className="text-textSecondaryColor">
                        You don’t have active subscription. Start your free 21
                        days trial now
                      </p>

                      <button
                        className="btn flex items-center"
                        onClick={() => handlePlanSelect('tier_1')}
                        disabled={loading}
                      >
                        {loading ? 'Please wait...' : 'Start Free Trial'}
                      </button>

                      <TiersDetails />
                    </div>
                  </div>
                  <div className="widget-container mb-8 p-4">
                    <DiscountCode
                      handleApplyPromoCode={handleApplyPromoCode}
                      handleRemovePromoCode={handleRemovePromoCode}
                      isSending={isSending}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <EarlyAdopter
                setShowDialog={setShowDialog}
                setDialogOptions={setDialogOptions}
              />
            )}
          </>
        )}
      </div>
      <TailwindModal
        id="promoCode"
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      >
        <PromoCodeApplied
          title={dialogOptions?.message || ''}
          type={dialogOptions?.type || 'success'}
          description={dialogOptions?.messageTwo || ''}
          id="promoCode"
        />
      </TailwindModal>
    </div>
  );
}

export default InactiveSubscriptionApp;
