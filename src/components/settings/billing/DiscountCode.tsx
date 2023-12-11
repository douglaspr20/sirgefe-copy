import Spinner from '@components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { applyPromoCodeSchemaValidation } from '@utils/schemaValidations';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface DiscountCodeProps {
  handleApplyPromoCode: (data: any) => void;
  handleRemovePromoCode: () => void;
  isSending: boolean;
}

const DiscountCode = ({
  handleApplyPromoCode,
  handleRemovePromoCode,
  isSending,
}: DiscountCodeProps) => {
  const { selectedBusiness } = useBusinessProfileContext();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(applyPromoCodeSchemaValidation),
  });

  useEffect(() => {
    setValue('promoCode', selectedBusiness?.subscription?.promo_code?.code);
  }, [selectedBusiness?.subscription?.promo_code?.code]);

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
                  !!selectedBusiness?.subscription?.promo_code?.code
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
              isSending || !!selectedBusiness?.subscription?.promo_code?.code
            }
          >
            Apply
            {isSending && <Spinner />}
          </button>
          {/* <button
            className="disabled:opacity-50 text-warningColor hover:text-warningHoverColor flex items-center disabled:cursor-not-allowed"
            disabled={isSending || !selectedBusiness?.subscription?.promo_code?.code}
            onClick={handleRemovePromoCode}
          >
            Remove
            {isSending && <Spinner />}
          </button> */}
        </div>

        {errors?.promoCode && errors?.promoCode?.message?.toString()}
      </form>
    </div>
  );
};

export default DiscountCode;
