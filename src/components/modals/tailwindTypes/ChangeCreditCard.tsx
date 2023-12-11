import React, { FC, useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changeCreditCardSchemaValidation,
  expirationCardDate,
  formatNumber,
} from 'utils';
import { getTypeCard } from '@utils/getTypeCard';
import Spinner from '@components/Spinner';
import { changeCreditCardSchema } from '@interfaces/formsSchema';

interface Props {
  onSubmit: (data: changeCreditCardSchema) => void;
  isSending?: boolean;
}

const ChangeCreditCard: FC<Props> = ({ onSubmit, isSending }) => {
  const [typeCard, setTypeCard] = useState<string>('');
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<changeCreditCardSchema>({
    resolver: zodResolver(changeCreditCardSchemaValidation),
  });

  const handleOnChangeCreditCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const creditNumber = formatNumber(e.target.value);

    const newTypeCard = getTypeCard(e.target.value);

    setTypeCard(newTypeCard ? newTypeCard : '');

    setValue('creditCardNumber', creditNumber);
  };

  const handleOnChangeExpirationDate = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const expireDate = expirationCardDate(e.target.value);

    setValue('expirationDate', expireDate);
  };

  return (
    <>
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-3">
        <h3 className="h3">Change card</h3>
        <button
          type="button"
          className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="icon-dismiss-circle"></i>
        </button>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e).finally(() => {
            reset();
            setTypeCard('');
          });
        }}
      >
        <div className="modal-body relative px-4">
          <div className="w-full mb-3">
            <div className="flex flex-col">
              <label className="form-label" htmlFor="creditCardNumber">
                Credit card number*
              </label>
              <div className="relative">
                <span
                  className={`w-5 h-5 absolute left-3 object-contain`}
                  style={{ top: typeCard.length > 0 ? '15px' : '12px' }}
                >
                  <Image
                    src={`/images/${
                      typeCard.length > 0 ? typeCard : 'credit-card-person'
                    }.svg`}
                    width={20}
                    height={15}
                    alt="visa-card"
                  />
                </span>
                <Controller
                  control={control}
                  name="creditCardNumber"
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <input
                      className={`input i-left ${
                        errors.creditCardNumber && 'error'
                      }`}
                      placeholder="Enter card number"
                      type="text"
                      id="creditCardNumber"
                      onChange={(e) => {
                        const reg = /^\d+$/;

                        if (
                          !reg.test(e.target.value.replace(/\s/g, '')) &&
                          e.target.value.length > 0
                        ) {
                          return;
                        }

                        handleOnChangeCreditCard(e);
                      }}
                      value={value}
                      maxLength={19}
                    />
                  )}
                  defaultValue={''}
                />

                {errors.creditCardNumber && (
                  <span className="text-warningColor text-xs">
                    {errors.creditCardNumber?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <label className="form-label" htmlFor="expirationDate">
                Expiration Date*
              </label>
              <div>
                <Controller
                  control={control}
                  name="expirationDate"
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <input
                      className={`input ${errors.expirationDate && 'error'}`}
                      placeholder="MM/YY"
                      type="text"
                      id="expirationDate"
                      onChange={(e) => {
                        const reg = /^\d+$/;

                        if (
                          !reg.test(
                            e.target.value.replace(/\s/g, '').replace('/', ''),
                          ) &&
                          e.target.value.length > 0
                        )
                          return;

                        handleOnChangeExpirationDate(e);
                      }}
                      value={value}
                      maxLength={5}
                    />
                  )}
                  defaultValue={''}
                />

                {errors.expirationDate && (
                  <span className="text-warningColor text-xs">
                    {errors.expirationDate?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="form-label" htmlFor="cvc">
                CVC*
              </label>
              <div>
                <Controller
                  control={control}
                  name="cvc"
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <input
                      className={`input ${errors.cvc && 'error'}`}
                      placeholder="Enter cvc"
                      type="text"
                      id="cvc"
                      onChange={(e) => {
                        const reg = /^\d+$/;

                        if (
                          !reg.test(e.target.value.replace(/\s/g, '')) &&
                          e.target.value.length > 0
                        )
                          return;

                        setValue('cvc', e.target.value);
                      }}
                      value={value}
                      maxLength={3}
                    />
                  )}
                  defaultValue={''}
                />
                {errors.cvc && (
                  <span className="text-warningColor text-xs">
                    {errors.cvc?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4">
          <button
            type="submit"
            className="btn flex items-center"
            disabled={isSending}
          >
            Save new card
            {isSending && <Spinner />}
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangeCreditCard;
