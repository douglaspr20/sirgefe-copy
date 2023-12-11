import PlanCardsShopify from '@components/billing/plans/PlanCardsShopify';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { createShopifySubscription } from '@graphql/mutations';
import { getDiscountCodeStatus } from '@graphql/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyPromoCodeSchema } from '@interfaces/formsSchema';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { applyPromoCodeSchemaValidation } from '@utils/schemaValidations';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import Spinner from '@components/Spinner';
import TailwindModal from '@components/modals/TailwindModal';
import PromoCodeApplied from '@components/modals/tailwindTypes/PromoCodeApplied';
import CancelSubscriptionModal from './CancelSubscriptionModal';

interface Props {
  handleCancelSubscription: () => Promise<void>;
  cancelLoading: boolean;
}

export const EarlyAdopter = ({
  handleCancelSubscription,
  cancelLoading,
}: Props) => {
  const { selectedBusiness } = useBusinessProfileContext();
  const dismissCancelSubscriptionModal = useRef<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<{
    amount: number;
    code: string;
    duration: number | null;
    status: string;
    type: string;
  }>();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<applyPromoCodeSchema>({
    resolver: zodResolver(applyPromoCodeSchemaValidation),
  });

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
    messageTwo: string;
  }>();

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
      graphqlOperation(createShopifySubscription, {
        createShopifySubscriptionInput: {
          plan_name: plan,
          discount_code: promoCode?.code,
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

  return (
    <div className="grow px-6 py-8 overflow-y-auto">
      <h2 className="h4 flex items-center">Billing</h2>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-4 gap-2">
          {promoCode && (
            <div className="bg-primaryColor w-60 h-5 relative self-center rounded-lg text-left">
              <span className="font-semibold absolute text-sm text-white pl-3">
                {promoCode?.amount}
                {promoCode?.type === 'percentage' ? '%' : '$'} discount for next
                payment
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <PlanCardsShopify
            planType="monthly"
            handlePlanSelect={handlePlanSelect}
            current_plan={selectedBusiness?.business_plan?.plan_code}
            loading={loading}
            promoCode={promoCode}
          />
        </div>
        <div className="widget-container p-4 w-full border border-extraLightColor mt-3">
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
        <div className="w-full flex justify-center items-center my-8">
          <button
            className="inline-flex items-center justify-center text-white rounded-lg bg-warningColor px-3 py-3 leading-4 font-semibold transition-all hover:bg-warningHoverColor"
            data-bs-toggle="modal"
            data-bs-target="#cancelSubscriptionModal"
            ref={dismissCancelSubscriptionModal}
          >
            Cancel Subscription
          </button>

          <TailwindModal
            id="cancelSubscriptionModal"
            styleDialog={{ maxWidth: '650px' }}
          >
            <CancelSubscriptionModal
              loading={cancelLoading}
              handleCancelSubscription={handleCancelSubscription}
              dismissCancelSubscriptionModal={dismissCancelSubscriptionModal}
            />
          </TailwindModal>
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
      </div>
    </div>
  );
};
