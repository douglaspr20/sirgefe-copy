import { PlanPrice } from '@sirge-io/sirge-types';
import React from 'react';

const PlanTiersModal = () => {
  return (
    <div className="modal-content px-4 pt-4 pb-5">
      <div className="modal-body">
        <div>
          <h3 className="h3">Tiers</h3>
          <p className="text-textSecondaryColor text-sm mt-3">
            Tailored Pricing Based on Your Shopify Shop Revenue: Our usage-based
            billing model allows you to pay according to your shop&apos;s
            revenue on Shopify. You will only pay for the value you receive.
          </p>
        </div>
        <div className="mt-4">
          <strong>Shop revenue / Monthly price</strong>
          <div className="flex items-center border border-extraLightColor justify-between">
            <div className="py-2 pl-2 pr-10 border-r border-r-extraLightColor w-full">
              <p className="text-textSecondaryColor">$0 - $10k</p>
              <p className="font-bold">${PlanPrice.tier_1}</p>
            </div>
            <div className="py-2 pl-2 pr-10 border-r border-r-extraLightColor w-full">
              <p className="text-textSecondaryColor">$10k - $30k</p>
              <p className="font-bold">${PlanPrice.tier_2}</p>
            </div>
            <div className="py-2 pl-2 pr-10 border-r border-r-extraLightColor w-full">
              <p className="text-textSecondaryColor">$30k - $70k</p>
              <p className="font-bold">${PlanPrice.tier_3}</p>
            </div>
            <div className="py-2 pl-2 pr-10 w-full">
              <p className="text-textSecondaryColor">$70k+</p>
              <p className="font-bold">${PlanPrice.tier_4}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 border-b border-b-extraLightColor">
          <strong>Features included</strong>
          <p className="text-textSecondaryColor text-sm pb-2">
            All new features and updates will be available for you without
            depending on what tier you have
          </p>
        </div>
        <div className="mt-3">
          <ul className="list-disc pl-3">
            <li className="text-textSecondaryColor text-sm pb-1">
              Unlimited Facebook & TikTok Ad Tracking
            </li>
            <li className="text-textSecondaryColor text-sm pb-1">
              Facebook Integration
            </li>
            <li className="text-textSecondaryColor text-sm pb-1">
              Tiktok Integration
            </li>
            <li className="text-textSecondaryColor text-sm pb-1">
              Shopify Store Analytics
            </li>
            <li className="text-textSecondaryColor text-sm pb-1">
              3 User Accounts
            </li>
            <li className="text-textSecondaryColor text-sm pb-1">
              ROAS Tracking
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanTiersModal;
