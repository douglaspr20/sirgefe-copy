import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import React from 'react';
import { PlanCodes, PlanDisplayName, PlanPrice } from '@sirge-io/sirge-types';
import { formatDateNoTime } from '@utils/format';
import Image from 'next/image';

function getProgressWidth(revenue: number) {
  if (revenue <= 10000) {
    return `${(revenue / 10000) * 30}%`;
  } else if (revenue <= 30000) {
    return `${25 + ((revenue - 10000) / 20000) * 25}%`;
  } else if (revenue < 70000) {
    return `${50 + ((revenue - 30000) / 40000) * 25}%`;
  } else {
    return '100%';
  }
}

const PlanDetails = () => {
  const { selectedBusiness } = useBusinessProfileContext();
  return (
    <>
      <div className="flex py-3 mb-3 items-center justify-between border-bottom-darkgrey">
        <div className="flex items-center">
          <div className="ml-2">
            <h2 className="h5 ">
              {
                PlanDisplayName[
                  selectedBusiness?.subscription?.plan_code || 'tier_1'
                ]
              }
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="link inline-flex items-center font-medium"
            data-bs-toggle="modal"
            data-bs-target="#exploreTiers"
          >
            Explore Tiers
          </button>
        </div>
      </div>
      <div className="py-3 mb-3 items-center justify-between border-bottom-darkgrey">
        <p className="text-textSecondaryColor">
          Your payment will be based on the revenue earned in the current month.
        </p>
        <div className="mt-3 flex w-full h-6 bg-darkGrade25 rounded-full overflow-hidden">
          <div
            className="flex flex-col justify-center overflow-hidden bg-primaryColor text-xs text-white text-center"
            role="progressbar"
            style={{
              width: `
            ${getProgressWidth(
              selectedBusiness?.subscription?.current_revenue || 0,
            )}
              `,
            }}
          ></div>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <p className="font-bold">0-10k</p>
          <p className="font-bold">10k-30k</p>
          <p className="font-bold">30k-70k</p>
          <p className="font-bold">70k+</p>
        </div>
      </div>
      <span className="text-primaryColor font-medium inline-flex items-center">
        <Image
          src="/images/info-icon.svg"
          alt="info"
          width={20}
          height={18.5}
          className="mr-1"
        />
        The revenue is updated once a day
      </span>
      <div className="py-2 mb-3 items-center justify-between grid grid-cols-2 grid-rows-3 w-max gap-x-4 gap-y-1">
        <p className="text-textSecondaryColor">Current Revenue</p>
        <p>
          ${selectedBusiness?.subscription?.current_revenue?.toFixed(0) || 0}
        </p>
        <p className="text-textSecondaryColor">Billing Period Ends</p>
        <p>
          {formatDateNoTime(
            selectedBusiness?.subscription
              ?.current_billing_period_end as string,
          ) || 'N/A'}
        </p>
        <p className="text-textSecondaryColor">Next Billing Price</p>
        <p>
          ${PlanPrice[selectedBusiness?.subscription?.plan_code || 'tier_1']}
        </p>
      </div>
    </>
  );
};

export default PlanDetails;
