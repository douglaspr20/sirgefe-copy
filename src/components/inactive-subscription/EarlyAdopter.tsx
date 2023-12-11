import PlanCardsShopify from '@components/billing/plans/PlanCardsShopify';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyPromoCodeSchema } from '@interfaces/formsSchema';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { applyPromoCodeSchemaValidation } from '@utils/schemaValidations';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getDiscountCodeStatus } from '@graphql/queries';
import Spinner from '@components/Spinner';
import { createShopifySubscriptionEarly } from '@graphql/mutations';
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { posthog } from 'posthog-js';
import { userDetailsStore } from '@utils/zustand';

interface Props {
  setShowDialog: (showDialog: boolean) => void;
  setDialogOptions: (dialogOptions: {
    type: ValidTypeMessages;
    message: string;
    messageTwo: string;
  }) => void;
}

const EarlyAdopter = ({ setShowDialog, setDialogOptions }: Props) => {
  const router = useRouter();

  const [isSending, setIsSending] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<{
    amount: number;
    code: string;
    duration: number | null;
    status: string;
    type: string;
  }>();
  const [loading, setLoading] = useState(false);

  const { userProfile, selectedBusiness, setSelectedBusiness } =
    useBusinessProfileContext();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<applyPromoCodeSchema>({
    resolver: zodResolver(applyPromoCodeSchemaValidation),
  });

  const handleApplyPromoCode = async (data: applyPromoCodeSchema) => {
    setIsSending(true);

    try {
      const response: any = await API.graphql(
        graphqlOperation(getDiscountCodeStatus, {
          getDiscountCodeStatusInput: {
            discount_code: data.promoCode,
          },
        }),
      );

      if (response.data?.getDiscountCodeStatus.error) {
        throw new Error(response.data?.getDiscountCodeStatus.error.message);
      }

      if (
        !response.data?.getDiscountCodeStatus.data?.code ||
        response.data?.getDiscountCodeStatus.data?.status !== 'active'
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
        setPromoCode(response.data?.getDiscountCodeStatus.data);
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

  const handlePlanSelect = async (plan: string): Promise<void> => {
    setLoading(true);
    const createShopifyPlanResponse: any = await API.graphql(
      graphqlOperation(createShopifySubscriptionEarly, {
        createShopifySubscriptionInput: {
          plan_name: plan,
          discount_code: promoCode?.code,
          business_id: selectedBusiness?.business_id,
        },
      }),
    );
    console.log('createShopifyPlanResponse', createShopifyPlanResponse);
    if (
      createShopifyPlanResponse.data.createShopifySubscriptionEarly.data?.error
    ) {
      Sentry.captureException(
        new Error(
          createShopifyPlanResponse.data.createShopifySubscriptionEarly.data?.error,
        ),
      );
    }
    const { confirmationUrl } =
      createShopifyPlanResponse?.data?.createShopifySubscriptionEarly?.data;

    if (confirmationUrl) {
      router.push(confirmationUrl);
    } else {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setSelectedBusiness(null);
      userDetailsStore.setState({ userDetails: undefined });
      router.push('/login');
      posthog.reset();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white py-4 self-center px-72 rounded-lg drop-shadow-md border border-extraLightColor text-center mt-3 mb-20">
      <h1 className="font-bold ">Welcome {userProfile?.first_name}!</h1>
      <span className="font-medium text-textTeriraryColor text-sm">
        You don&apos;t have{' '}
        {selectedBusiness?.shopify_access_token
          ? 'an active subscription. Start your 14 day free trial now!'
          : 'our app installed'}
      </span>
      {promoCode && (
        <div className="bg-primaryColor w-60 h-5 relative self-center rounded-lg text-left mt-3">
          <span className="font-semibold absolute text-sm text-white pl-3">
            {promoCode?.amount}
            {promoCode?.type === 'percentage' ? '%' : '$'} discount for next
            payment
          </span>
        </div>
      )}
      <PlanCardsShopify
        planType="monthly"
        handlePlanSelect={handlePlanSelect}
        current_plan={selectedBusiness?.business_plan?.plan_code}
        loading={loading}
        promoCode={promoCode}
      />
      <div className="widget-container p-4 w-full border border-extraLightColor">
        <h6 className="h6 mb-1">Promo Code</h6>
        <p className="text-textSecondaryColor text-xs mb-2">
          Apply Your Promo Code And Get A Discount
        </p>
        <form onSubmit={handleSubmit(handleApplyPromoCode)}>
          <div className="mb-2">
            <Controller
              name="promoCode"
              control={control}
              render={({ field: { value } }) => (
                <input
                  className="input disabled:cursor-not-allowed"
                  type="text"
                  placeholder="Enter Your Promo Code"
                  onChange={(e) => {
                    setValue('promoCode', e.target.value.toUpperCase());
                  }}
                  disabled={isSending || !!promoCode}
                  value={value || ''}
                  maxLength={15}
                />
              )}
            />
          </div>
          <button
            className="btn flex items-center"
            disabled={isSending || !!promoCode}
          >
            Apply
            {isSending && <Spinner />}
          </button>

          {errors.promoCode && errors.promoCode.message}
        </form>
      </div>
      <button
        onClick={() => signOut()}
        className="px-3.5 py-2 mt-4 inline-flex items-center text-primaryColor"
      >
        <i className="icon-sign-out text-xl leading-5 mr-2 text-primaryColo"></i>
        Log out
      </button>
    </div>
  );
};

export default EarlyAdopter;
