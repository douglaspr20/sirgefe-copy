import { useBoundStore } from '@store/index';
import { formatDateNoTime } from '@utils/format';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

const PlanDetailsTrial = () => {
  const {
    businessProfile,
    trialLeft,
    trialTotal,
    setTrialTotal,
    setTrialLeft,
  } = useBoundStore.getState();

  const subscription = businessProfile?.profilePrisma?.subscriptions[0];

  setTrialLeft(
    dayjs(subscription?.trial_end as string).diff(dayjs(), 'day') + 1,
  );
  setTrialTotal(
    dayjs(subscription?.trial_end as string).diff(
      dayjs(subscription?.current_billing_period_start as string),
      'day',
    ) + 1,
  );

  return (
    <div>
      <div className="flex py-3 mb-3 items-center justify-between border-bottom-darkgrey">
        <div className="flex items-center">
          <div className="ml-2">
            <h2 className="h5 ">Plan</h2>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="link inline-flex items-center font-medium"
            data-bs-toggle="modal"
            data-bs-target="#exploreTiers"
          >
            Explore tiers
          </button>
        </div>
      </div>
      <div className="py-3 mb-3 items-center justify-between border-bottom-darkgrey">
        <p className="text-primaryColor ml-1">
          {trialLeft < 0 ? 0 : trialLeft} / {trialTotal} days left in free trial
        </p>
        <div className="mt-1 flex w-full h-6 bg-darkGrade25 rounded-full overflow-hidden">
          <div
            className="flex flex-col justify-center overflow-hidden bg-primaryColor text-xs text-white text-center"
            role="progressbar"
            style={{
              width: `${(trialLeft / trialTotal) * 100}%`,
            }}
          ></div>
        </div>
        <div className="py-3 mb-3 items-center justify-between grid grid-cols-2 grid-rows-3 w-max gap-x-4 gap-y-1">
          <p className="text-textSecondaryColor">End of free trial</p>
          <p>{formatDateNoTime(subscription?.trial_end as string) || 'N/A'}</p>
          <p className="text-textSecondaryColor">Billing period starts</p>
          <p>
            {formatDateNoTime(
              subscription?.current_billing_period_start as string,
            ) || 'N/A'}
          </p>
          <p className="text-textSecondaryColor">Billing period ends</p>
          <p>
            {formatDateNoTime(
              subscription?.current_billing_period_end as string,
            ) || 'N/A'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/info-icon.svg"
            alt="info"
            width={20}
            height={18.5}
          />
          <p className="text-textSecondaryColor text-xs font-bold">
            Once the free trial ends, we&apos;ll start calculating your shop
            revenue along with current month price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsTrial;
