'use client'; // Uses useForm

import Spinner from '_components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoundStore } from '@store/index';
import { applyPromoCodeSchemaValidation } from '@utils/schemaValidations';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addDiscountCodeNew, removeDiscountCodeNew } from '@graphql/mutations';
import { applyPromoCodeSchema } from '@interfaces/formsSchema';
import { executeGraphqlOperation } from '_utils/executeGraphqlOperation';
import {
  AddDiscountCodeMutationVariables,
  AddDiscountCodeResponse,
  RemoveDiscountCodeNewResponse,
  SubscriptionPrisma,
} from 'API';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DiscountCodeProps {}

const DiscountCode = ({}: DiscountCodeProps) => {
  const {
    businessProfile,
    userProfile,
    setUserProfile,
    selectedBusiness,
    setSelectedBusiness,
    setDialogOptions,
    setPromoCode,
    setShowDialog,
  } = useBoundStore.getState();

  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<applyPromoCodeSchema>({
    resolver: zodResolver(applyPromoCodeSchemaValidation),
  });

  useEffect(() => {
    setValue(
      'promoCode',
      businessProfile?.profilePrisma?.subscriptions[0].subscription_plan_code ||
        '',
    );
  }, [
    setValue,
    businessProfile?.profilePrisma?.subscriptions[0].subscription_plan_code,
  ]);

  const handleRemovePromoCode = async () => {
    setIsSending(true);

    try {
      const response = await executeGraphqlOperation<
        null,
        RemoveDiscountCodeNewResponse
      >(API, removeDiscountCodeNew, {});

      if (response.error) {
        throw new Error(response?.error?.message || '');
      }

      if (!response?.data) {
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

        // setSelectedBusiness({
        //   ...selectedBusiness,
        //   subscriptions: [
        //     ...(selectedBusiness?.subscriptions || []),
        //     response.data,
        //   ],
        // } as BusinessPrisma);

        // setUserProfile({
        //   ...userProfile,
        //   subscription: {
        //     ...userProfile?.subscription,
        //     promo_code: undefined,
        //   },
        // });
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

  const handleApplyPromoCode = async (data: applyPromoCodeSchema) => {
    setIsSending(true);

    try {
      const response = await executeGraphqlOperation<
        AddDiscountCodeMutationVariables,
        AddDiscountCodeResponse
      >(API, addDiscountCodeNew, {
        addDiscountCodeInput: {
          discount_code: data.promoCode,
        },
      });

      if (response?.error) {
        throw new Error(response.error.message || '');
      }

      if (!response.data?.code || response?.data?.status !== 'active') {
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
        // setUserProfile({
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

  return (
    <div className="w-full text-center">
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
                className="input disabled:cursor-not-allowed text-center"
                type="text"
                placeholder="Enter Your Promo Code"
                onChange={(e) => {
                  setValue('promoCode', e.target.value.toUpperCase());
                }}
                disabled={
                  isSending ||
                  !!selectedBusiness?.subscriptions.some(
                    (subscription) => subscription.promo_code_id,
                  )
                }
                value={value || ''}
                maxLength={15}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-3 justify-center">
          <button
            className="btn flex items-center disabled:cursor-not-allowed"
            disabled={
              isSending ||
              !!selectedBusiness?.subscriptions.some(
                (subscription) => subscription.promo_code_id,
              )
            }
          >
            Apply
            {isSending && <Spinner />}
          </button>
          <button
            className="disabled:opacity-50 text-warningColor hover:text-warningHoverColor flex items-center disabled:cursor-not-allowed"
            disabled={
              isSending ||
              !selectedBusiness?.subscriptions.some(
                (subscription) => subscription.promo_code_id,
              )
            }
            onClick={handleRemovePromoCode}
          >
            Remove
            {isSending && <Spinner />}
          </button>
        </div>

        {errors?.promoCode && errors?.promoCode?.message?.toString()}
      </form>
    </div>
  );
};

export default DiscountCode;
