import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setRoasGoals } from 'utils';
import Spinner from '@components/Spinner';
import { setRoasGoalsSchema } from '@interfaces/formsSchema';
import { string } from 'zod';

interface Props {
  onSubmit: (data: setRoasGoalsSchema) => void;
  isSending?: boolean;
  roas_goals?: object;
}

const SetRoalsGoalsModal: FC<Props> = ({ onSubmit, isSending, roas_goals }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<setRoasGoalsSchema>({
    resolver: zodResolver(setRoasGoals),
  });

  const [campaingsGoals, setCampaignGoals] = useState<string>('');
  const [adsetGoals, setAdsetGoals] = useState<string>('');
  const [adGoals, setAdGoals] = useState<string>('');

  const validateFormFill = function () {
    if (campaingsGoals !== '' && adsetGoals !== '' && adGoals !== '') {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setCampaignGoals((roas_goals as any)?.campaign?.toString() ?? '');
    setAdsetGoals((roas_goals as any)?.adset?.toString() ?? '');
    setAdGoals((roas_goals as any)?.ad?.toString() ?? '');
    setValue('campaigns', (roas_goals as any)?.campaign?.toString() ?? '');
    setValue('adsets', (roas_goals as any)?.adset?.toString() ?? '');
    setValue('ads', (roas_goals as any)?.ad?.toString() ?? '');
  }, [roas_goals, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-1">
          <h3 className="h3">Set Up Break-Even ROAS Goals</h3>
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
            Enter the preferable value of Break-Even ROAS for campaigns, ad
            sets, and ads. You will see how much of them are above or under that
            goals.
          </p>
          <div className="w-full mb-4">
            <label className="form-label" htmlFor="camp-goal">
              Campaigns Goal
            </label>
            <div>
              <Controller
                control={control}
                name="campaigns"
                render={() => (
                  <input
                    className={`input ${errors.campaigns && 'error'}`}
                    placeholder="Ex, 1.5"
                    type="text"
                    id="roas"
                    onChange={(e) => {
                      const reg = /^(\d*\.)?\d*$/g;
                      if (!reg.test(e.target.value)) {
                        return;
                      }
                      setCampaignGoals(e.target.value);
                      setValue('campaigns', e.target.value);
                    }}
                    value={campaingsGoals}
                  />
                )}
              />

              {errors.campaigns && (
                <span className="text-warningColor text-xs">
                  {errors.campaigns?.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="form-label" htmlFor="ad-sets-goal">
              Ad Sets Goal
            </label>
            <div>
              <Controller
                control={control}
                name="adsets"
                render={({ field: { value = adsetGoals } }) => (
                  <input
                    className={`input ${errors.adsets && 'error'}`}
                    placeholder="Ex, 1.5"
                    type="text"
                    id="budget"
                    onChange={(e) => {
                      const reg = /^(\d*\.)?\d*$/g;

                      if (!reg.test(e.target.value)) {
                        return;
                      }
                      setAdsetGoals(e.target.value);
                      setValue('adsets', e.target.value);
                    }}
                    value={value}
                  />
                )}
              />

              {errors.adsets && (
                <span className="text-warningColor text-xs">
                  {errors.adsets?.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="form-label" htmlFor="ads-goal">
              Ads Goal
            </label>
            <div>
              <Controller
                control={control}
                name="ads"
                render={({ field: { value = adGoals } }) => (
                  <input
                    className={`input ${errors.ads && 'error'}`}
                    placeholder="Ex, 1.5"
                    type="text"
                    id="budget"
                    onChange={(e) => {
                      const reg = /^(\d*\.)?\d*$/g;
                      if (!reg.test(e.target.value)) {
                        return;
                      }
                      setAdGoals(e.target.value);
                      setValue('ads', e.target.value);
                    }}
                    value={value}
                  />
                )}
              />

              {errors.ads && (
                <span className="text-warningColor text-xs">
                  {errors.ads?.message}
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
            onClick={() => {
              setValue('campaigns', '');
              setValue('adsets', '');
              setValue('ads', '');
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn ml-3 flex items-center"
            disabled={isSending || !validateFormFill()}
          >
            Set up
            {isSending && <Spinner />}
          </button>
        </div>
      </form>
    </>
  );
};

export default SetRoalsGoalsModal;
