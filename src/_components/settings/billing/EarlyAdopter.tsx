'use client'; // Uses useForm && useRef

import PlanCardsShopify from '_components/settings/billing/plans/PlanCardsShopify';
import React, { useRef } from 'react';
import TailwindModal from '_components/modals/TailwindModal';
import PromoCodeApplied from '_components/modals/tailwindTypes/PromoCodeApplied';
import CancelSubscriptionModal from './CancelSubscriptionModal';
import { useBoundStore } from '@store/index';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyPromoCodeSchemaValidation } from '@utils/schemaValidations';
import { applyPromoCodeSchema } from '@interfaces/formsSchema';
import { API } from 'aws-amplify';
import Spinner from '_components/Spinner';
import { getDiscountCodeStatusNew } from '@graphql/queries';
import { executeGraphqlOperation } from '_utils/executeGraphqlOperation';
import {
  GetDiscountCodeStatusNewQueryVariables,
  GetDiscountCodeStatusNewResponse,
} from 'API';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const EarlyAdopter = ({}: Props) => {
  const {
    businessProfile,
    dialogOptions,
    isLoading,
    setIsLoading,
    setShowDialog,
    setDialogOptions,
    promoCode,
    setPromoCode,
  } = useBoundStore((state) => state);

  const dismissCancelSubscriptionModal = useRef<HTMLButtonElement | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<applyPromoCodeSchema>({
    resolver: zodResolver(applyPromoCodeSchemaValidation),
  });

  const handleApplyPromoCode = async (data: applyPromoCodeSchema) => {
    setIsLoading(true);

    try {
      const response = await executeGraphqlOperation<
        GetDiscountCodeStatusNewQueryVariables,
        GetDiscountCodeStatusNewResponse
      >(API, getDiscountCodeStatusNew, {
        getDiscountCodeStatusInput: {
          discount_code: data.promoCode,
        },
      });

      if (response?.error) {
        throw new Error(response?.error?.message || '');
      }

      if (!response.data?.code || response.data?.status !== 'active') {
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
        setPromoCode(response.data);
      }
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
        messageTwo: '',
      });
    } finally {
      setShowDialog(true);
      setIsLoading(false);
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
            current_plan={
              businessProfile?.profilePrisma?.subscriptions[0]
                .subscription_plan_code || undefined
            }
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
                    disabled={isLoading || !!promoCode}
                    value={value || ''}
                    maxLength={15}
                  />
                )}
              />
            </div>
            <button
              className="btn flex items-center"
              disabled={isLoading || !!promoCode}
            >
              Apply
              {isLoading && <Spinner />}
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
              dismissCancelSubscriptionModal={dismissCancelSubscriptionModal}
            />
          </TailwindModal>
          <TailwindModal id="promoCode">
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
