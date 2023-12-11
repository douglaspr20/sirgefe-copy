import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { setBudget } from 'utils';
import Spinner from '@components/Spinner';
import { setBudgetSchema } from '@interfaces/formsSchema';

interface Props {
  onSubmit: (data: setBudgetSchema) => void;
  isSending?: boolean;
}

const SetBudgetModal: FC<Props> = ({ onSubmit, isSending }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<setBudgetSchema>({
    resolver: zodResolver(setBudget),
  });

  useEffect(() => {
    setValue('budget', '');
  }, [setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-1">
          <h3 className="h3">Set Up Monthly Budget</h3>
          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>

        <div className="modal-body relative px-4 pb-4">
          <p className="text-xs text-textTeriraryColor mb-4">
            Enter your monthly budget, and we will calculate how much you have
            spent on Facebook and TikTok, as well as how much is remaining.
          </p>
          <div className="w-full">
            <label className="form-label inline-flex" htmlFor="budget">
              Ad Budget
            </label>
            <div>
              <Controller
                control={control}
                name="budget"
                render={({ field: { value } }) => (
                  <>
                    <input
                      className={`input ${errors.budget && 'error'}`}
                      placeholder="$ Enter Your Budget."
                      type="text"
                      id="budget"
                      onChange={(e) => {
                        const reg = /^(\d*\.)?\d*$/g;
                        if (!reg.test(e.target.value)) {
                          return;
                        }
                        setValue('budget', e.target.value);
                      }}
                      value={value}
                    />
                  </>
                )}
              />

              {errors.budget && (
                <span className="text-warningColor text-xs">
                  {errors.budget?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end py-4 mx-4 border-t border-extraLightColor">
          <button
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            className="btn light"
            onClick={() => setValue('budget', '')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn ml-3 flex items-center"
            disabled={isSending}
          >
            Set up
            {isSending && <Spinner />}
          </button>
        </div>
      </form>
    </>
  );
};

export default SetBudgetModal;
